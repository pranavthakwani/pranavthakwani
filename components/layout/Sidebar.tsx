'use client';

import { FileItem } from '@/lib/types';
import { FILES } from '@/lib/constants';
import { motion } from 'framer-motion';
import { FileCode, Folder, ChevronDown } from 'lucide-react';

interface SidebarProps {
  activeFile: string;
  onFileClick: (file: FileItem) => void;
}

export function Sidebar({ activeFile, onFileClick }: SidebarProps) {

  return (
    <div className="w-64 bg-[#252526] border-r border-[#3c3c3c] flex flex-col h-full">
      <div className="p-3 border-b border-[#3c3c3c] flex items-center gap-2 text-[#858585] text-xs uppercase tracking-wider">
        <FileCode size={16} />
        <span>Explorer</span>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-2">
          <div className="flex items-center gap-1 px-2 py-1 text-[#d4d4d4] text-sm font-medium">
            <ChevronDown size={16} />
            <Folder size={16} className="text-[#858585]" />
            <span>PORTFOLIO</span>
          </div>

          <div className="mt-1 ml-2">
            {FILES.map((file) => (
              <motion.button
                key={file.id}
                onClick={() => onFileClick(file)}
                className={`w-full flex items-center gap-2 px-3 py-1.5 text-sm rounded transition-colors ${
                  activeFile === file.id
                    ? 'bg-[#37373d] text-[#ffffff]'
                    : 'text-[#d4d4d4] hover:bg-[#2a2d2e]'
                }`}
                whileHover={{ x: 2 }}
                transition={{ duration: 0.15 }}
              >
                <img 
                  src={file.icon} 
                  alt={file.type}
                  className="w-4 h-4 flex-shrink-0"
                  onLoad={(e) => {
                    // Icon loaded successfully
                    const target = e.target as HTMLImageElement;
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'none';
                  }}
                  onError={(e) => {
                    // Fallback to emoji if image fails to load
                    console.error(`Failed to load icon: ${file.icon}`);
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
                  {file.type === 'tsx' ? '⚛️' : file.type === 'html' ? '🌐' : file.type === 'js' ? '📦' : file.type === 'json' ? '📊' : file.type === 'ts' ? '💼' : file.type === 'css' ? '🎨' : '📄'}
                </span>
                <span className="flex-1 text-left">{file.name}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-3 border-t border-[#3c3c3c] text-[#858585] text-xs">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>Ready</span>
        </div>
      </div>
    </div>
  );
}
