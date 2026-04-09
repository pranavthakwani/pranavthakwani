'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { AnalyticsSummary } from '@/lib/types';

interface AnalyticsChartsProps {
  data: AnalyticsSummary;
}

const chartStyle = {
  backgroundColor: '#1b1b1b',
  border: '1px solid #2f2f2f',
};

function Heatmap({ data }: { data: AnalyticsSummary['heatmapPoints'] }) {
  return (
    <div className="relative h-72 overflow-hidden rounded-xl border border-[#2f2f2f] bg-[#111111]">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:2.5rem_2.5rem]" />
      {data.map((point, index) => (
        <div
          key={`${point.page}-${point.x}-${point.y}-${index}`}
          className="absolute h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,120,212,0.5),rgba(0,120,212,0.06)_70%,transparent_75%)]"
          style={{
            left: `${point.x * 100}%`,
            top: `${point.y * 100}%`,
            opacity: Math.min(1, point.value / 4),
          }}
        />
      ))}
      <div className="absolute bottom-3 right-3 rounded bg-black/40 px-2 py-1 text-[11px] text-[var(--vscode-muted)]">
        {data.length} clustered points
      </div>
    </div>
  );
}

export function AnalyticsCharts({ data }: AnalyticsChartsProps) {
  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <section className="rounded-xl p-5" style={chartStyle}>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-white">
          Route Views
        </h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.pageViews}>
              <CartesianGrid stroke="#272727" vertical={false} />
              <XAxis dataKey="page" stroke="#8c8c8c" tick={{ fill: '#8c8c8c', fontSize: 12 }} />
              <YAxis stroke="#8c8c8c" tick={{ fill: '#8c8c8c', fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#111111',
                  border: '1px solid #2f2f2f',
                  borderRadius: '10px',
                  color: '#d4d4d4',
                }}
              />
              <Bar dataKey="views" fill="#0078d4" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="rounded-xl p-5" style={chartStyle}>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-white">
          File Clicks
        </h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.fileClicks}>
              <CartesianGrid stroke="#272727" vertical={false} />
              <XAxis dataKey="name" stroke="#8c8c8c" tick={{ fill: '#8c8c8c', fontSize: 12 }} />
              <YAxis stroke="#8c8c8c" tick={{ fill: '#8c8c8c', fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#111111',
                  border: '1px solid #2f2f2f',
                  borderRadius: '10px',
                  color: '#d4d4d4',
                }}
              />
              <Bar dataKey="clicks" fill="#4ec9b0" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="rounded-xl p-5 xl:col-span-2" style={chartStyle}>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-white">
          Interaction Heatmap
        </h2>
        <Heatmap data={data.heatmapPoints} />
      </section>
    </div>
  );
}
