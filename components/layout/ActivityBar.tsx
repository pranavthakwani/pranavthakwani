'use client';

import { Sparkles } from 'lucide-react';
import {
  VscExtensions,
  VscFiles,
  VscSearch,
  VscSourceControl,
} from 'react-icons/vsc';

import { ActivityPanelId } from '@/lib/types';

interface ActivityBarProps {
  activePanel: ActivityPanelId;
  isChatOpen: boolean;
  onPanelChange: (panel: ActivityPanelId, event?: React.MouseEvent<HTMLButtonElement>) => void;
  onToggleChat: (event?: React.MouseEvent<HTMLButtonElement>) => void;
}

const panelItems: Array<{
  id: ActivityPanelId;
  label: string;
  icon: typeof VscFiles;
}> = [
  { id: 'explorer', label: 'Explorer', icon: VscFiles },
  { id: 'search', label: 'Search', icon: VscSearch },
  { id: 'source-control', label: 'Source Control', icon: VscSourceControl },
  { id: 'extensions', label: 'Extensions', icon: VscExtensions },
];

export default function ActivityBar({
  activePanel,
  isChatOpen,
  onPanelChange,
  onToggleChat,
}: ActivityBarProps) {
  return (
    <aside className="flex w-12 flex-col items-center justify-between border-r border-[var(--vscode-border)] bg-[var(--vscode-activity)] py-3">
      <div className="flex flex-col items-center gap-1">
        {panelItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePanel === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={(event) => onPanelChange(item.id, event)}
              className="group relative flex h-11 w-full items-center justify-center pl-2 text-[var(--vscode-muted)] transition hover:text-white"
              aria-label={item.label}
            >
              {isActive && <span className="absolute left-0 top-1 bottom-1 w-[2px] bg-[var(--vscode-accent)]" />}
              <Icon size={22} className={isActive ? 'text-white' : ''} />
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={onToggleChat}
        className="group relative flex h-11 w-full items-center justify-center pl-2 text-[var(--vscode-muted)] transition hover:text-white"
        aria-label="Toggle assistant"
      >
        {isChatOpen && <span className="absolute left-0 top-1 bottom-1 w-[2px] bg-[var(--vscode-accent)]" />}
        <Sparkles size={18} className={isChatOpen ? 'text-white' : ''} />
      </button>
    </aside>
  );
}
