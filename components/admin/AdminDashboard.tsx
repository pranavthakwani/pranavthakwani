'use client';

import dynamic from 'next/dynamic';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { BarChart3, Eye, MessageSquare, MousePointerClick, Users } from 'lucide-react';

import { AnalyticsSummary } from '@/lib/types';

const AnalyticsCharts = dynamic(
  () => import('@/components/admin/AnalyticsCharts').then((module) => module.AnalyticsCharts),
  { ssr: false }
);

interface AdminDashboardProps {
  initialData: AnalyticsSummary;
}

function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: typeof Eye;
}) {
  return (
    <div className="rounded-xl border border-[#2f2f2f] bg-[#1b1b1b] p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-[var(--vscode-muted)]">{label}</p>
          <p className="mt-2 text-3xl font-semibold text-white">{value}</p>
        </div>
        <div className="rounded-lg bg-[#111111] p-3 text-[var(--vscode-accent)]">
          <Icon size={20} />
        </div>
      </div>
    </div>
  );
}

export function AdminDashboard({ initialData }: AdminDashboardProps) {
  const router = useRouter();
  const [data, setData] = useState(initialData);
  const [isPending, startTransition] = useTransition();

  const refreshAnalytics = async () => {
    const response = await fetch('/api/admin/analytics', { cache: 'no-store' });
    if (response.ok) {
      const payload = (await response.json()) as AnalyticsSummary;
      setData(payload);
    }
  };

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    startTransition(() => {
      router.refresh();
    });
  };

  const totalFileClicks = data.fileClicks.reduce((sum, entry) => sum + entry.clicks, 0);
  const totalChatQueries = data.commonQueries.reduce((sum, entry) => sum + entry.count, 0);

  return (
    <div className="min-h-screen bg-[#111111] px-6 py-8 text-[var(--vscode-text)]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <header className="flex flex-col gap-4 rounded-2xl border border-[#2f2f2f] bg-[#171717] p-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-[var(--vscode-muted)]">
              <BarChart3 size={16} />
              Admin Analytics
            </div>
            <h1 className="text-3xl font-semibold text-white">Portfolio control room</h1>
            <p className="mt-2 max-w-2xl text-sm text-[var(--vscode-muted)]">
              Monitoring page views, file interactions, tab behavior, chat activity, and click heatmap clusters.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={refreshAnalytics}
              className="rounded-md border border-[#2f2f2f] bg-[#1f1f1f] px-4 py-2 text-sm text-white transition hover:border-[var(--vscode-accent)]"
            >
              Refresh
            </button>
            <button
              type="button"
              onClick={logout}
              disabled={isPending}
              className="rounded-md bg-[var(--vscode-accent)] px-4 py-2 text-sm font-medium text-white transition hover:brightness-110 disabled:opacity-60"
            >
              Sign out
            </button>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Total visits" value={data.totalVisits.toString()} icon={Eye} />
          <StatCard label="Active users" value={data.activeUsers.toString()} icon={Users} />
          <StatCard label="File clicks" value={totalFileClicks.toString()} icon={MousePointerClick} />
          <StatCard label="Chat queries" value={totalChatQueries.toString()} icon={MessageSquare} />
        </section>

        <AnalyticsCharts data={data} />

        <section className="grid gap-6 xl:grid-cols-2">
          <div className="rounded-xl border border-[#2f2f2f] bg-[#1b1b1b] p-5">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-white">
              Tab usage
            </h2>
            <div className="space-y-3">
              {data.tabUsage.length === 0 && (
                <p className="text-sm text-[var(--vscode-muted)]">No tab events captured yet.</p>
              )}
              {data.tabUsage.map((tab) => (
                <div
                  key={tab.name}
                  className="flex items-center justify-between rounded-lg border border-[#2a2a2a] bg-[#121212] px-4 py-3"
                >
                  <span className="text-sm text-white">{tab.name}</span>
                  <div className="flex gap-3 text-xs text-[var(--vscode-muted)]">
                    <span>opened {tab.opens}</span>
                    <span>focused {tab.focuses}</span>
                    <span>closed {tab.closes}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-[#2f2f2f] bg-[#1b1b1b] p-5">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-white">
              Common chat queries
            </h2>
            <div className="space-y-3">
              {data.commonQueries.length === 0 && (
                <p className="text-sm text-[var(--vscode-muted)]">No chat queries captured yet.</p>
              )}
              {data.commonQueries.map((query) => (
                <div
                  key={query.query}
                  className="flex items-center justify-between rounded-lg border border-[#2a2a2a] bg-[#121212] px-4 py-3"
                >
                  <span className="max-w-[80%] text-sm text-white">{query.query}</span>
                  <span className="text-xs text-[var(--vscode-muted)]">{query.count} uses</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
