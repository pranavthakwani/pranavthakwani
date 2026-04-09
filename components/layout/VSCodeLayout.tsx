'use client';

import dynamic from 'next/dynamic';
import { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Sparkles } from 'lucide-react';

import { pointerMetadata, trackClick, trackPageView } from '@/lib/analytics';
import { getPortfolioFileById, getPortfolioFileByRoute, PORTFOLIO_FILES } from '@/lib/portfolio';
import { ActivityPanelId, Tab } from '@/lib/types';

import ActivityBar from './ActivityBar';
import MacBar from './MacBar';
import MenuBar from './MenuBar';
import { Sidebar } from './Sidebar';
import { StatusBar } from './StatusBar';
import { TabBar } from './TabBar';
import { TerminalPanel } from './TerminalPanel';

const Chatbot = dynamic(() => import('../chat/Chatbot').then((module) => module.Chatbot), {
  ssr: false,
});

const TAB_STORAGE_KEY = 'portfolio.open-tabs';

interface VSCodeLayoutProps {
  children: React.ReactNode;
}

function dedupeTabs(tabIds: string[]) {
  return Array.from(new Set(tabIds)).filter((id) =>
    PORTFOLIO_FILES.some((file) => file.id === id)
  );
}

export function VSCodeLayout({ children }: VSCodeLayoutProps) {
  const pathname = usePathname() || '/';
  const router = useRouter();
  const isAdminRoute = pathname.startsWith('/admin');
  const currentFile = getPortfolioFileByRoute(pathname);
  const [activePanel, setActivePanel] = useState<ActivityPanelId>('explorer');
  const [openTabIds, setOpenTabIds] = useState<string[]>([currentFile.id]);
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [isTerminalOpen, setIsTerminalOpen] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const viewportIsCompact = window.innerWidth < 1280;
    if (viewportIsCompact) {
      setIsChatOpen(false);
    }

    const storedTabs = window.localStorage.getItem(TAB_STORAGE_KEY);
    if (!storedTabs) {
      return;
    }

    try {
      const parsed = JSON.parse(storedTabs) as string[];
      setOpenTabIds(dedupeTabs([...parsed, currentFile.id]));
    } catch {
      setOpenTabIds([currentFile.id]);
    }
  }, [currentFile.id]);

  useEffect(() => {
    setOpenTabIds((previous) => dedupeTabs([...previous, currentFile.id]));
  }, [currentFile.id]);

  useEffect(() => {
    if (!isMounted) {
      return;
    }

    window.localStorage.setItem(TAB_STORAGE_KEY, JSON.stringify(openTabIds));
  }, [isMounted, openTabIds]);

  useEffect(() => {
    if (isAdminRoute) {
      return;
    }

    trackPageView(pathname, {
      fileId: currentFile.id,
      fileName: currentFile.name,
    });
  }, [currentFile.id, currentFile.name, isAdminRoute, pathname]);

  const tabs = useMemo<Tab[]>(
    () =>
      openTabIds.map((tabId) => ({
        id: tabId,
        file: getPortfolioFileById(tabId),
      })),
    [openTabIds]
  );

  const navigateToFile = (
    fileId: string,
    event?: React.MouseEvent<HTMLButtonElement>,
    action: 'file_open' | 'tab_focus' = 'file_open'
  ) => {
    const file = getPortfolioFileById(fileId);
    const wasOpen = openTabIds.includes(fileId);

    if (!wasOpen) {
      setOpenTabIds((previous) => dedupeTabs([...previous, fileId]));
    }

    trackClick(file.route, {
      action,
      fileId: file.id,
      fileName: file.name,
      ...pointerMetadata(event),
    });

    router.push(file.route);
  };

  const handlePanelChange = (panel: ActivityPanelId, event?: React.MouseEvent<HTMLButtonElement>) => {
    setActivePanel(panel);

    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setIsMobileSidebarOpen(true);
    }

    trackClick(pathname, {
      action: 'panel_change',
      panel,
      ...pointerMetadata(event),
    });
  };

  const handleCloseTab = (tabId: string, event?: React.MouseEvent<HTMLButtonElement>) => {
    const nextTabs = openTabIds.filter((id) => id !== tabId);
    const closingFile = getPortfolioFileById(tabId);

    trackClick(pathname, {
      action: 'tab_close',
      fileId: closingFile.id,
      fileName: closingFile.name,
      ...pointerMetadata(event),
    });

    if (nextTabs.length === 0) {
      setOpenTabIds([currentFile.id]);
      return;
    }

    setOpenTabIds(nextTabs);

    if (currentFile.id === tabId) {
      const fallbackFile = getPortfolioFileById(nextTabs[nextTabs.length - 1]);
      router.push(fallbackFile.route);
    }
  };

  const handleToggleChat = (event?: React.MouseEvent<HTMLButtonElement>) => {
    setIsChatOpen((value) => !value);
    trackClick(pathname, {
      action: 'toggle_chat',
      state: isChatOpen ? 'closed' : 'open',
      ...pointerMetadata(event),
    });
  };

  const handleToggleTerminal = (event?: React.MouseEvent<HTMLButtonElement>) => {
    setIsTerminalOpen((value) => !value);
    trackClick(pathname, {
      action: 'toggle_terminal',
      state: isTerminalOpen ? 'closed' : 'open',
      ...pointerMetadata(event),
    });
  };

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-full min-h-0 w-full flex-col bg-[var(--vscode-bg)] text-[var(--vscode-text)]">
      <MacBar activeTitle={currentFile.workspacePath} />
      <MenuBar
        files={PORTFOLIO_FILES}
        activePanel={activePanel}
        isChatOpen={isChatOpen}
        isTerminalOpen={isTerminalOpen}
        onOpenFile={(file) => navigateToFile(file.id)}
        onPanelChange={handlePanelChange}
        onToggleChat={handleToggleChat}
        onToggleTerminal={handleToggleTerminal}
      />

      <div className="flex min-h-0 flex-1">
        <ActivityBar
          activePanel={activePanel}
          isChatOpen={isChatOpen}
          onPanelChange={handlePanelChange}
          onToggleChat={handleToggleChat}
        />

        <div className="relative flex min-w-0 flex-1">
          <div
            className={`absolute inset-y-0 left-0 z-30 transition-transform duration-200 md:static md:translate-x-0 ${
              isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <Sidebar
              activeFileId={currentFile.id}
              activePanel={activePanel}
              files={PORTFOLIO_FILES}
              openTabIds={openTabIds}
              onFileSelect={(file, event) => {
                navigateToFile(file.id, event);
                setIsMobileSidebarOpen(false);
              }}
            />
          </div>

          {isMobileSidebarOpen && (
            <button
              type="button"
              aria-label="Close sidebar"
              onClick={() => setIsMobileSidebarOpen(false)}
              className="absolute inset-0 z-20 bg-black/30 md:hidden"
            />
          )}

          <div className="flex min-w-0 flex-1 flex-col">
            <TabBar
              tabs={tabs}
              activeTabId={currentFile.id}
              onTabSelect={(tabId, event) => navigateToFile(tabId, event, 'tab_focus')}
              onTabClose={handleCloseTab}
            />

            <main className="min-h-0 flex-1 overflow-hidden bg-[var(--vscode-bg)]">{children}</main>

            <TerminalPanel isOpen={isTerminalOpen} onToggle={handleToggleTerminal} />
          </div>

          {isChatOpen && (
            <div className="fixed inset-y-[4.4rem] right-0 z-40 w-[min(24rem,92vw)] border-l border-[var(--vscode-border)] bg-[var(--vscode-panel)] shadow-2xl xl:static xl:inset-auto xl:w-[23rem] xl:shadow-none">
              <Chatbot currentPage={pathname} onClose={handleToggleChat} />
            </div>
          )}

          {!isChatOpen && (
            <button
              type="button"
              onClick={handleToggleChat}
              className="fixed bottom-10 right-4 z-40 flex items-center gap-2 rounded-full border border-[#0e639c] bg-[#094771] px-4 py-2 text-[12px] font-medium text-white shadow-xl transition hover:brightness-110"
            >
              <Sparkles size={14} />
              <span>Open Copilot</span>
            </button>
          )}
        </div>
      </div>

      <StatusBar
        currentFile={currentFile}
        isChatOpen={isChatOpen}
        isTerminalOpen={isTerminalOpen}
        onToggleChat={handleToggleChat}
        onToggleTerminal={handleToggleTerminal}
      />
    </div>
  );
}
