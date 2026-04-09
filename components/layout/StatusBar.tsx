'use client';

import { useEffect, useState } from 'react';
import { Bell, Check, GitBranch, Sparkles, TerminalSquare } from 'lucide-react';

import { FileItem } from '@/lib/types';

interface StatusBarProps {
  currentFile: FileItem;
  isChatOpen: boolean;
  isTerminalOpen: boolean;
  onToggleChat: (event?: React.MouseEvent<HTMLButtonElement>) => void;
  onToggleTerminal: (event?: React.MouseEvent<HTMLButtonElement>) => void;
}

const languageLabel: Record<FileItem['type'], string> = {
  tsx: 'TypeScript React',
  html: 'HTML',
  js: 'JavaScript',
  json: 'JSON',
  ts: 'TypeScript',
  css: 'CSS',
  md: 'Markdown',
};

export function StatusBar({
  currentFile,
  isChatOpen,
  isTerminalOpen,
  onToggleChat,
  onToggleTerminal,
}: StatusBarProps) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const tick = () => {
      setTime(
        new Date().toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
        })
      );
    };

    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <footer className="flex h-6 items-center justify-between bg-[var(--vscode-status)] px-3 text-[11px] text-white">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <GitBranch size={12} />
          <span>main</span>
        </div>
        <div className="flex items-center gap-1">
          <Check size={12} />
          <span>0 issues</span>
        </div>
        <span>{currentFile.workspacePath}</span>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onToggleTerminal}
          className="flex items-center gap-1 rounded px-1.5 py-0.5 hover:bg-[#1a8cff]/30"
        >
          <TerminalSquare size={12} />
          <span>{isTerminalOpen ? 'Terminal open' : 'Terminal hidden'}</span>
        </button>
        <button
          type="button"
          onClick={onToggleChat}
          className="flex items-center gap-1 rounded px-1.5 py-0.5 hover:bg-[#1a8cff]/30"
        >
          <Sparkles size={12} />
          <span>{isChatOpen ? 'Assistant ready' : 'Assistant hidden'}</span>
        </button>
        <span>{languageLabel[currentFile.type]}</span>
        <span>UTF-8</span>
        <div className="flex items-center gap-1">
          <Bell size={12} />
          <span>{time}</span>
        </div>
      </div>
    </footer>
  );
}
