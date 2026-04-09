'use client';

import { Search } from 'lucide-react';

interface MacBarProps {
  activeTitle: string;
}

export default function MacBar({ activeTitle }: MacBarProps) {
  return (
    <div className="window-noise flex h-9 items-center border-b border-[var(--vscode-border)] bg-[#181818] px-3 text-[11px] text-[var(--vscode-muted)]">
      <div className="flex items-center gap-2">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
      </div>

      <div className="flex flex-1 justify-center px-6">
        <div className="flex h-6 w-full max-w-[28rem] items-center gap-2 rounded-md border border-[#2f2f2f] bg-[#222222] px-3 text-[11px]">
          <Search size={12} />
          <span className="truncate">{activeTitle} - portfolio.workspace</span>
        </div>
      </div>

      <div className="w-16 text-right">VS Code</div>
    </div>
  );
}
