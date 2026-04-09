'use client';

import { Tab } from '@/lib/types';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TabBarProps {
  tabs: Tab[];
  activeTab: string;
  onTabClick: (tabId: string) => void;
  onTabClose: (tabId: string) => void;
}

export function TabBar({ tabs, activeTab, onTabClick, onTabClose }: TabBarProps) {
  const getIsActive = (tab: Tab) => tab.id === activeTab;
  const getFileIcon = (iconPath: string) => {
    return iconPath;
  };

  return (
    <div className="bg-[#2d2d2d] border-b border-[#3c3c3c] flex items-center overflow-x-auto">
      <AnimatePresence mode="popLayout">
        {tabs.map((tab) => (
          <motion.div
            key={tab.id}
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.2 }}
            className={`flex items-center gap-2 px-4 py-2.5 border-r border-[#3c3c3c] cursor-pointer group relative ${
              getIsActive(tab)
                ? 'bg-[#1e1e1e] text-[#ffffff]'
                : 'bg-[#2d2d2d] text-[#858585] hover:bg-[#2a2a2a]'
            }`}
          >
            <button
              onClick={() => onTabClick(tab.id)}
              className="flex items-center gap-2 text-sm"
            >
              <img 
                src={tab.file.icon} 
                alt={tab.file.type}
                className="w-4 h-4 flex-shrink-0"
                onLoad={(e) => {
                  // Icon loaded successfully
                  const target = e.target as HTMLImageElement;
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'none';
                }}
                onError={(e) => {
                  // Fallback to emoji if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'inline';
                }}
              />
              <span 
                className="text-base" 
                style={{ display: 'none' }}
              >
                {tab.file.type === 'tsx' ? '⚛️' : tab.file.type === 'html' ? '🌐' : tab.file.type === 'js' ? '📦' : tab.file.type === 'json' ? '📊' : tab.file.type === 'ts' ? '💼' : tab.file.type === 'css' ? '🎨' : '📄'}
              </span>
              <span>{tab.file.name}</span>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onTabClose(tab.id);
              }}
              className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#3c3c3c] rounded p-0.5"
            >
              <X size={14} />
            </button>

            {getIsActive(tab) && (
              <motion.div
                layoutId="activeTab"
                className="absolute top-0 left-0 right-0 h-0.5 bg-[#007acc]"
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
