'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2, Minimize2, Sparkles } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { TabBar } from './TabBar';
import { StatusBar } from './StatusBar';
import { Chatbot } from '../chat/Chatbot';
import { FileItem, Tab } from '@/lib/types';
import { FILES } from '@/lib/constants';
import MacBar from './MacBar';
import MenuBar from './MenuBar';
import ActivityBar from './ActivityBar';
import { HomePage } from '@/components/pages/HomePage';
import { AboutPage } from '@/components/pages/AboutPage';
import { ProjectsPage } from '@/components/pages/ProjectsPage';
import { SkillsPage } from '@/components/pages/SkillsPage';
import { ExperiencePage } from '@/components/pages/ExperiencePage';
import { ContactPage } from '@/components/pages/ContactPage';

interface VSCodeLayoutProps {
  children: React.ReactNode;
}

export function VSCodeLayout({ children }: VSCodeLayoutProps) {
  const [activeFile, setActiveFile] = useState('home');
  const [openTabs, setOpenTabs] = useState<Tab[]>([{ id: FILES[0].id, file: FILES[0] }]);
  const [isChatbotOpen, setIsChatbotOpen] = useState(true);
  const [activePanel, setActivePanel] = useState('files');

  const handleFileClick = (file: FileItem) => {
    setActiveFile(file.id);
    
    // Create tab from file
    const newTab: Tab = { id: file.id, file };
    
    // Check if tab is already open
    const existingTab = openTabs.find(t => t.id === file.id);
    if (!existingTab) {
      setOpenTabs([...openTabs, newTab]);
    }
  };

  const renderActivePage = () => {
    switch (activeFile) {
      case 'home':
        return <HomePage />;
      case 'about':
        return <AboutPage />;
      case 'projects':
        return <ProjectsPage />;
      case 'skills':
        return <SkillsPage />;
      case 'experience':
        return <ExperiencePage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  };

  const handleTabClose = (tabId: string) => {
    const newTabs = openTabs.filter(tab => tab.id !== tabId);
    setOpenTabs(newTabs);
    if (newTabs.length > 0) {
      // Switch to the last remaining tab
      setActiveFile(newTabs[newTabs.length - 1].id);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-[#1e1e1e] text-[#d4d4d4] font-mono text-sm overflow-hidden" style={{ transform: 'scale(0.85)', transformOrigin: 'top left', width: '117.65%', height: '117.65%' }}>
      {/* Mac Bar - Topmost */}
      <MacBar />
      
      {/* Menu Bar */}
      <MenuBar />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Activity Bar and Main Content */}
        <div className="flex flex-1">
          {/* Activity Bar - Leftmost */}
          <ActivityBar 
            activePanel={activePanel}
            onPanelChange={setActivePanel}
          />
          
          {/* Main Layout Area */}
          <div className="flex flex-1">
            {/* Sidebar */}
            {activePanel === 'files' && (
              <Sidebar
                activeFile={activeFile}
                onFileClick={handleFileClick}
              />
            )}
            
            {/* Main Editor Area */}
            <div className="flex-1 flex flex-col">
              {/* Tab Bar */}
              <TabBar
                tabs={openTabs}
                activeTab={activeFile}
                onTabClick={(tabId) => setActiveFile(tabId)}
                onTabClose={handleTabClose}
              />
              
              {/* Content Area */}
              <div className="flex-1 overflow-y-auto bg-[#1e1e1e]">
                {renderActivePage()}
              </div>
            </div>
            
            {/* Right Panel - Chatbot */}
            {isChatbotOpen && (
              <Chatbot onClose={() => setIsChatbotOpen(false)} />
            )}
          </div>
        </div>
      </div>
      
      {/* Floating Copilot Button */}
      {!isChatbotOpen && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => setIsChatbotOpen(true)}
          className="fixed top-16 right-6 bg-[#007acc] text-white p-4 rounded-full shadow-lg hover:bg-[#0098ff] transition-colors z-50 flex items-center gap-2"
        >
          <Sparkles size={20} />
          <span className="text-sm font-medium pr-1">Copilot</span>
        </motion.button>
      )}
      
      {/* Status Bar */}
      <StatusBar />
    </div>
  );
}
