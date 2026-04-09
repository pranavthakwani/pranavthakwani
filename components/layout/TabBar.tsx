'use client';

import { X } from 'lucide-react';

import { Tab } from '@/lib/types';

interface TabBarProps {
  tabs: Tab[];
  activeTabId: string;
  onTabSelect: (tabId: string, event?: React.MouseEvent<HTMLButtonElement>) => void;
  onTabClose: (tabId: string, event?: React.MouseEvent<HTMLButtonElement>) => void;
}

export function TabBar({ tabs, activeTabId, onTabSelect, onTabClose }: TabBarProps) {
  return (
    <div className="flex h-9 items-stretch overflow-x-auto border-b border-[var(--vscode-border)] bg-[var(--vscode-tab)]">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTabId;

        return (
          <div
            key={tab.id}
            className={`group relative flex min-w-[9.5rem] max-w-[14rem] items-center border-r border-[var(--vscode-border)] ${
              isActive ? 'bg-[var(--vscode-tab-active)] text-white' : 'bg-[var(--vscode-tab)] text-[var(--vscode-muted)]'
            }`}
          >
            <button
              type="button"
              onClick={(event) => onTabSelect(tab.id, event)}
              className="flex min-w-0 flex-1 items-center gap-2 px-3 py-2 text-left text-[12px]"
            >
              <img src={tab.file.icon} alt="" className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">{tab.file.name}</span>
            </button>

            <button
              type="button"
              onClick={(event) => onTabClose(tab.id, event)}
              className="mr-2 rounded p-0.5 text-[var(--vscode-muted)] opacity-0 transition hover:bg-[#3b3b3b] hover:text-white group-hover:opacity-100"
              aria-label={`Close ${tab.file.name}`}
            >
              <X size={13} />
            </button>

            {isActive && <span className="absolute inset-x-0 top-0 h-[1px] bg-[var(--vscode-accent)]" />}
          </div>
        );
      })}
    </div>
  );
}
