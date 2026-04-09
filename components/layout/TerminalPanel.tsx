'use client';

import { useMemo, useState } from 'react';
import { ChevronDown, Minus, Plus, TerminalSquare, X } from 'lucide-react';

interface TerminalPanelProps {
  isOpen: boolean;
  onToggle: (event?: React.MouseEvent<HTMLButtonElement>) => void;
}

interface TerminalEntry {
  id: string;
  type: 'command' | 'output';
  content: string;
}

const INITIAL_ENTRIES: TerminalEntry[] = [
  {
    id: 'boot-1',
    type: 'output',
    content: 'Portfolio workspace initialized.',
  },
  {
    id: 'boot-2',
    type: 'command',
    content: 'pnpm portfolio:summary',
  },
  {
    id: 'boot-3',
    type: 'output',
    content: 'Backend Engineer | AI Automation Developer | KORE Mobile',
  },
];

function createResponse(command: string) {
  const normalized = command.trim().toLowerCase();

  if (!normalized) {
    return 'Type a command to explore the portfolio workspace.';
  }

  if (normalized.includes('help')) {
    return 'Try: about, projects, skills, contact, clear';
  }

  if (normalized.includes('about')) {
    return 'Pranav builds backend systems, AI workflows, and developer-facing product experiences.';
  }

  if (normalized.includes('projects')) {
    return 'Featured: OrgMind, Safe Yatra, Little Angel Foundation, and Gita-GPT.';
  }

  if (normalized.includes('skills')) {
    return 'Core stack: TypeScript, Next.js, Python, FastAPI, LangChain, PostgreSQL, Supabase.';
  }

  if (normalized.includes('contact')) {
    return 'Email: pranavthakwani@gmail.com | LinkedIn: linkedin.com/in/pranavthakwani';
  }

  if (normalized === 'clear') {
    return '__CLEAR__';
  }

  return `'${command}' is not a known workspace command. Try 'help'.`;
}

export function TerminalPanel({ isOpen, onToggle }: TerminalPanelProps) {
  const [entries, setEntries] = useState<TerminalEntry[]>(INITIAL_ENTRIES);
  const [input, setInput] = useState('');

  const visibleEntries = useMemo(() => entries.slice(-12), [entries]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const command = input.trim();
    if (!command) {
      return;
    }

    const response = createResponse(command);

    if (response === '__CLEAR__') {
      setEntries([]);
      setInput('');
      return;
    }

    setEntries((previous) => [
      ...previous,
      {
        id: `${Date.now()}-command`,
        type: 'command',
        content: command,
      },
      {
        id: `${Date.now()}-output`,
        type: 'output',
        content: response,
      },
    ]);
    setInput('');
  };

  return (
    <section className="border-t border-[var(--vscode-border)] bg-[#181818]">
      <div className="flex h-9 items-center justify-between border-b border-[var(--vscode-border)] bg-[#1f1f1f] px-3 text-[12px]">
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="flex items-center gap-2 text-white"
            onClick={onToggle}
          >
            <TerminalSquare size={14} className="text-[var(--vscode-accent)]" />
            <span>TERMINAL</span>
            <ChevronDown
              size={14}
              className={`transition-transform ${isOpen ? '' : '-rotate-90'}`}
            />
          </button>
          <span className="text-[var(--vscode-muted)]">PROBLEMS</span>
          <span className="text-[var(--vscode-muted)]">OUTPUT</span>
        </div>

        <div className="flex items-center gap-1 text-[var(--vscode-muted)]">
          <button type="button" className="rounded p-1 hover:bg-[#2a2a2a]" aria-label="New terminal">
            <Plus size={13} />
          </button>
          <button type="button" className="rounded p-1 hover:bg-[#2a2a2a]" aria-label="Split terminal">
            <Minus size={13} />
          </button>
          <button
            type="button"
            onClick={onToggle}
            className="rounded p-1 hover:bg-[#2a2a2a]"
            aria-label="Close terminal"
          >
            <X size={13} />
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="h-56 overflow-hidden">
          <div className="flex h-full flex-col bg-[#111111] font-mono text-[12px] text-[var(--vscode-text)]">
            <div className="flex-1 overflow-y-auto px-4 py-3">
              <div className="mb-3 text-[11px] uppercase tracking-[0.18em] text-[var(--vscode-muted)]">
                zsh - portfolio workspace
              </div>

              <div className="space-y-2">
                {visibleEntries.map((entry) => (
                  <div key={entry.id} className="leading-6">
                    {entry.type === 'command' ? (
                      <div className="flex gap-2 text-white">
                        <span className="text-[#4ec9b0]">pranav@portfolio</span>
                        <span className="text-[var(--vscode-accent)]">~</span>
                        <span>$</span>
                        <span>{entry.content}</span>
                      </div>
                    ) : (
                      <div className="pl-2 text-[#b9b9b9]">{entry.content}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="border-t border-[var(--vscode-border)] px-4 py-3"
            >
              <label className="flex items-center gap-2">
                <span className="text-[#4ec9b0]">pranav@portfolio</span>
                <span className="text-[var(--vscode-accent)]">~</span>
                <span>$</span>
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  className="w-full bg-transparent outline-none placeholder:text-[#6f6f6f]"
                  placeholder="Try help, projects, skills, contact, clear"
                />
              </label>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
