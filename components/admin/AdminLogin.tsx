'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';

export function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    const response = await fetch('/api/admin/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password }),
    });

    if (!response.ok) {
      setError('Invalid password.');
      return;
    }

    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#111111] p-6 text-[var(--vscode-text)]">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-xl border border-[#2f2f2f] bg-[#1b1b1b] p-8 shadow-2xl"
      >
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-lg bg-[var(--vscode-accent)] p-3 text-white">
            <Lock size={20} />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-white">Admin Dashboard</h1>
            <p className="text-sm text-[var(--vscode-muted)]">Protected analytics workspace</p>
          </div>
        </div>

        <label className="mb-2 block text-sm text-[var(--vscode-muted)]">Password</label>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full rounded-md border border-[#343434] bg-[#111111] px-3 py-3 outline-none transition focus:border-[var(--vscode-accent)]"
          placeholder="Enter admin password"
        />

        {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={isPending}
          className="mt-5 w-full rounded-md bg-[var(--vscode-accent)] px-4 py-3 text-sm font-medium text-white transition hover:brightness-110 disabled:opacity-60"
        >
          {isPending ? 'Opening dashboard...' : 'Access dashboard'}
        </button>
      </form>
    </div>
  );
}
