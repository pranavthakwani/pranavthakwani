'use client';

import { useMemo, useState } from 'react';
import {
  ChevronDown,
  ChevronRight,
  FileSearch,
  Folder,
  FolderOpen,
  GitBranch,
  PackagePlus,
  Search,
} from 'lucide-react';

import { ActivityPanelId, FileItem } from '@/lib/types';

interface SidebarProps {
  activeFileId: string;
  activePanel: ActivityPanelId;
  files: FileItem[];
  openTabIds: string[];
  onFileSelect: (file: FileItem, event?: React.MouseEvent<HTMLButtonElement>) => void;
}

function FileRow({
  file,
  active,
  onSelect,
}: {
  file: FileItem;
  active: boolean;
  onSelect: (file: FileItem, event?: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <button
      type="button"
      onClick={(event) => onSelect(file, event)}
      className={`flex w-full items-center gap-2 rounded px-2 py-1 text-left text-[12px] ${
        active ? 'bg-[#37373d] text-white' : 'text-[var(--vscode-text)] hover:bg-[#2a2d2e]'
      }`}
    >
      <img src={file.icon} alt="" className="h-4 w-4" />
      <span className="truncate">{file.name}</span>
    </button>
  );
}

export function Sidebar({
  activeFileId,
  activePanel,
  files,
  openTabIds,
  onFileSelect,
}: SidebarProps) {
  const [explorerOpen, setExplorerOpen] = useState(true);
  const [contentOpen, setContentOpen] = useState(true);
  const [searchValue, setSearchValue] = useState('');

  const openEditors = useMemo(
    () => openTabIds.map((id) => files.find((file) => file.id === id)).filter(Boolean) as FileItem[],
    [files, openTabIds]
  );

  const filteredFiles = useMemo(() => {
    if (!searchValue.trim()) {
      return files;
    }

    const query = searchValue.toLowerCase();
    return files.filter((file) =>
      [file.name, file.title, file.description, ...file.keywords].join(' ').toLowerCase().includes(query)
    );
  }, [files, searchValue]);

  if (activePanel === 'search') {
    return (
      <aside className="flex h-full w-[17.5rem] flex-col border-r border-[var(--vscode-border)] bg-[var(--vscode-sidebar)]">
        <div className="px-4 py-3 text-[11px] uppercase tracking-[0.15em] text-[var(--vscode-muted)]">
          Search
        </div>
        <div className="px-3 pb-3">
          <label className="flex items-center gap-2 rounded border border-[#3a3a3a] bg-[#1f1f1f] px-3 py-2 text-[12px]">
            <Search size={14} className="text-[var(--vscode-muted)]" />
            <input
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              placeholder="Search portfolio files"
              className="w-full bg-transparent text-[var(--vscode-text)] outline-none placeholder:text-[var(--vscode-muted)]"
            />
          </label>
        </div>
        <div className="flex-1 overflow-y-auto px-2 pb-3">
          {filteredFiles.map((file) => (
            <div key={file.id} className="rounded px-2 py-2 hover:bg-[#2a2d2e]">
              <button
                type="button"
                onClick={(event) => onFileSelect(file, event)}
                className="flex w-full items-start gap-3 text-left"
              >
                <FileSearch size={15} className="mt-0.5 text-[var(--vscode-accent)]" />
                <div>
                  <div className="text-[12px] text-white">{file.title}</div>
                  <div className="text-[11px] text-[var(--vscode-muted)]">{file.description}</div>
                </div>
              </button>
            </div>
          ))}
        </div>
      </aside>
    );
  }

  if (activePanel === 'source-control') {
    return (
      <aside className="flex h-full w-[17.5rem] flex-col border-r border-[var(--vscode-border)] bg-[var(--vscode-sidebar)]">
        <div className="px-4 py-3 text-[11px] uppercase tracking-[0.15em] text-[var(--vscode-muted)]">
          Source Control
        </div>
        <div className="space-y-4 p-4 text-[12px]">
          <div className="rounded border border-[#3a3a3a] bg-[#202020] p-3">
            <div className="mb-2 flex items-center gap-2 text-white">
              <GitBranch size={14} className="text-[var(--vscode-accent)]" />
              <span>main</span>
            </div>
            <p className="text-[var(--vscode-muted)]">
              Workspace is clean. The portfolio shell, chat route, and analytics layer are synced.
            </p>
          </div>
          <div className="rounded border border-[#3a3a3a] bg-[#202020] p-3">
            <div className="mb-2 text-white">Latest commit theme</div>
            <p className="text-[var(--vscode-muted)]">
              Pixel-accurate VS Code chrome, stateful tabs, and protected analytics dashboard.
            </p>
          </div>
        </div>
      </aside>
    );
  }

  if (activePanel === 'extensions') {
    return (
      <aside className="flex h-full w-[17.5rem] flex-col border-r border-[var(--vscode-border)] bg-[var(--vscode-sidebar)]">
        <div className="px-4 py-3 text-[11px] uppercase tracking-[0.15em] text-[var(--vscode-muted)]">
          Extensions
        </div>
        <div className="space-y-3 p-4 text-[12px]">
          {[
            'Copilot Chat Surface',
            'Shiki Syntax Highlighter',
            'Portfolio Analytics Explorer',
            'Admin Insights Dashboard',
          ].map((extension) => (
            <div key={extension} className="rounded border border-[#3a3a3a] bg-[#202020] p-3">
              <div className="flex items-center gap-2 text-white">
                <PackagePlus size={14} className="text-[var(--vscode-accent)]" />
                <span>{extension}</span>
              </div>
              <p className="mt-1 text-[var(--vscode-muted)]">Installed and ready in this workspace.</p>
            </div>
          ))}
        </div>
      </aside>
    );
  }

  return (
    <aside className="flex h-full w-[17.5rem] flex-col border-r border-[var(--vscode-border)] bg-[var(--vscode-sidebar)]">
      <div className="px-4 py-3 text-[11px] uppercase tracking-[0.15em] text-[var(--vscode-muted)]">
        Explorer
      </div>

      <div className="flex-1 overflow-y-auto px-2 pb-3">
        <button
          type="button"
          onClick={() => setExplorerOpen((value) => !value)}
          className="flex w-full items-center gap-1 px-2 py-1 text-[11px] uppercase tracking-[0.12em] text-[var(--vscode-muted)]"
        >
          {explorerOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          Open Editors
        </button>

        {explorerOpen && (
          <div className="space-y-1 px-2 pb-4">
            {openEditors.map((file) => (
              <FileRow
                key={file.id}
                file={file}
                active={file.id === activeFileId}
                onSelect={onFileSelect}
              />
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={() => setContentOpen((value) => !value)}
          className="flex w-full items-center gap-1 px-2 py-1 text-[11px] uppercase tracking-[0.12em] text-[var(--vscode-muted)]"
        >
          {contentOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          Portfolio Workspace
        </button>

        {contentOpen && (
          <div className="space-y-1 px-2">
            <div className="flex items-center gap-2 px-2 py-1 text-[12px] text-[var(--vscode-text)]">
              <FolderOpen size={15} className="text-[#c5c5c5]" />
              <span>src</span>
            </div>
            <div className="ml-3">
              <div className="flex items-center gap-2 px-2 py-1 text-[12px] text-[var(--vscode-text)]">
                <Folder size={15} className="text-[#c5c5c5]" />
                <span>content</span>
              </div>
              <div className="ml-3 space-y-1">
                {files.map((file) => (
                  <FileRow
                    key={file.id}
                    file={file}
                    active={file.id === activeFileId}
                    onSelect={onFileSelect}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
