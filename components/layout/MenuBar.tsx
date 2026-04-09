'use client';

import { ActivityPanelId, FileItem } from '@/lib/types';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from '@/components/ui/menubar';

interface MenuBarProps {
  files: FileItem[];
  activePanel: ActivityPanelId;
  isChatOpen: boolean;
  isTerminalOpen: boolean;
  onOpenFile: (file: FileItem) => void;
  onPanelChange: (panel: ActivityPanelId) => void;
  onToggleChat: () => void;
  onToggleTerminal: () => void;
}

const panelItems: Array<{ label: string; panel: ActivityPanelId }> = [
  { label: 'Explorer', panel: 'explorer' },
  { label: 'Search', panel: 'search' },
  { label: 'Source Control', panel: 'source-control' },
  { label: 'Extensions', panel: 'extensions' },
];

export default function MenuBar({
  files,
  activePanel,
  isChatOpen,
  isTerminalOpen,
  onOpenFile,
  onPanelChange,
  onToggleChat,
  onToggleTerminal,
}: MenuBarProps) {
  return (
    <div className="border-b border-[var(--vscode-border)] bg-[var(--vscode-sidebar)] px-1">
      <Menubar className="h-8 gap-0 rounded-none border-0 bg-transparent p-0 text-[12px]">
        <MenubarMenu>
          <MenubarTrigger className="h-8 rounded-none px-3 font-normal text-[var(--vscode-text)] data-[state=open]:bg-[#313131]">
            File
          </MenubarTrigger>
          <MenubarContent className="rounded-sm border-[#3a3a3a] bg-[#252526] p-1 text-[var(--vscode-text)]">
            {files.map((file) => (
              <MenubarItem
                key={file.id}
                onClick={() => onOpenFile(file)}
                className="rounded-sm px-3 py-2 text-[12px] focus:bg-[var(--vscode-accent-soft)] focus:text-white"
              >
                {file.name}
                <MenubarShortcut>{file.type}</MenubarShortcut>
              </MenubarItem>
            ))}
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger className="h-8 rounded-none px-3 font-normal text-[var(--vscode-text)] data-[state=open]:bg-[#313131]">
            Edit
          </MenubarTrigger>
          <MenubarContent className="rounded-sm border-[#3a3a3a] bg-[#252526] p-1 text-[var(--vscode-text)]">
            <MenubarItem className="rounded-sm px-3 py-2 text-[12px] focus:bg-[var(--vscode-accent-soft)] focus:text-white">
              Copy Portfolio Link
            </MenubarItem>
            <MenubarItem className="rounded-sm px-3 py-2 text-[12px] focus:bg-[var(--vscode-accent-soft)] focus:text-white">
              Copy Contact Email
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger className="h-8 rounded-none px-3 font-normal text-[var(--vscode-text)] data-[state=open]:bg-[#313131]">
            Selection
          </MenubarTrigger>
          <MenubarContent className="rounded-sm border-[#3a3a3a] bg-[#252526] p-1 text-[var(--vscode-text)]">
            <MenubarItem className="rounded-sm px-3 py-2 text-[12px] focus:bg-[var(--vscode-accent-soft)] focus:text-white">
              Select Current File
              <MenubarShortcut>Alt+Shift+F</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger className="h-8 rounded-none px-3 font-normal text-[var(--vscode-text)] data-[state=open]:bg-[#313131]">
            View
          </MenubarTrigger>
          <MenubarContent className="rounded-sm border-[#3a3a3a] bg-[#252526] p-1 text-[var(--vscode-text)]">
            {panelItems.map((item) => (
              <MenubarItem
                key={item.panel}
                onClick={() => onPanelChange(item.panel)}
                className="rounded-sm px-3 py-2 text-[12px] focus:bg-[var(--vscode-accent-soft)] focus:text-white"
              >
                {item.label}
                <MenubarShortcut>{activePanel === item.panel ? 'On' : 'Off'}</MenubarShortcut>
              </MenubarItem>
            ))}
            <MenubarSeparator className="bg-[#333333]" />
            <MenubarItem
              onClick={onToggleChat}
              className="rounded-sm px-3 py-2 text-[12px] focus:bg-[var(--vscode-accent-soft)] focus:text-white"
            >
              Copilot Panel
              <MenubarShortcut>{isChatOpen ? 'Open' : 'Closed'}</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger className="h-8 rounded-none px-3 font-normal text-[var(--vscode-text)] data-[state=open]:bg-[#313131]">
            Go
          </MenubarTrigger>
          <MenubarContent className="rounded-sm border-[#3a3a3a] bg-[#252526] p-1 text-[var(--vscode-text)]">
            {files.map((file, index) => (
              <MenubarItem
                key={file.id}
                onClick={() => onOpenFile(file)}
                className="rounded-sm px-3 py-2 text-[12px] focus:bg-[var(--vscode-accent-soft)] focus:text-white"
              >
                Go to {file.title}
                <MenubarShortcut>{index + 1}</MenubarShortcut>
              </MenubarItem>
            ))}
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger className="h-8 rounded-none px-3 font-normal text-[var(--vscode-text)] data-[state=open]:bg-[#313131]">
            Run
          </MenubarTrigger>
          <MenubarContent className="rounded-sm border-[#3a3a3a] bg-[#252526] p-1 text-[var(--vscode-text)]">
            <MenubarItem className="rounded-sm px-3 py-2 text-[12px] focus:bg-[var(--vscode-accent-soft)] focus:text-white">
              Open Live Portfolio
            </MenubarItem>
            <MenubarItem className="rounded-sm px-3 py-2 text-[12px] focus:bg-[var(--vscode-accent-soft)] focus:text-white">
              Inspect Analytics
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger className="h-8 rounded-none px-3 font-normal text-[var(--vscode-text)] data-[state=open]:bg-[#313131]">
            Terminal
          </MenubarTrigger>
          <MenubarContent className="rounded-sm border-[#3a3a3a] bg-[#252526] p-1 text-[var(--vscode-text)]">
            <MenubarItem
              onClick={onToggleTerminal}
              className="rounded-sm px-3 py-2 text-[12px] focus:bg-[var(--vscode-accent-soft)] focus:text-white"
            >
              Toggle Terminal
              <MenubarShortcut>{isTerminalOpen ? 'Open' : 'Closed'}</MenubarShortcut>
            </MenubarItem>
            <MenubarItem className="rounded-sm px-3 py-2 text-[12px] focus:bg-[var(--vscode-accent-soft)] focus:text-white">
              Developer Summary
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger className="h-8 rounded-none px-3 font-normal text-[var(--vscode-text)] data-[state=open]:bg-[#313131]">
            Help
          </MenubarTrigger>
          <MenubarContent className="rounded-sm border-[#3a3a3a] bg-[#252526] p-1 text-[var(--vscode-text)]">
            <MenubarItem className="rounded-sm px-3 py-2 text-[12px] focus:bg-[var(--vscode-accent-soft)] focus:text-white">
              Portfolio Guide
            </MenubarItem>
            <MenubarItem className="rounded-sm px-3 py-2 text-[12px] focus:bg-[var(--vscode-accent-soft)] focus:text-white">
              About This Build
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
}
