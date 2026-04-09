'use client';

import { GitBranch, CircleAlert as AlertCircle, Sparkles } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function StatusBar() {
  const pathname = usePathname();
  const [time, setTime] = useState('');
  const [copilotStatus, setCopilotStatus] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const getLanguageFromPath = () => {
    const langMap: Record<string, string> = {
      '/': 'TypeScript React',
      '/about': 'HTML',
      '/projects': 'JavaScript',
      '/skills': 'JSON',
      '/experience': 'TypeScript',
      '/contact': 'CSS',
    };
    return langMap[pathname] || 'TypeScript React';
  };

  return (
    <div className="bg-[#007acc] text-white text-xs flex items-center justify-between px-4 py-1 h-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5 hover:bg-[#0098ff] px-2 py-0.5 rounded cursor-pointer transition-colors">
          <GitBranch size={14} />
          <span className="font-medium">main</span>
        </div>

        <div className="flex items-center gap-1.5">
          <AlertCircle size={14} />
          <span>0</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => setCopilotStatus(!copilotStatus)}
          className={`flex items-center gap-1.5 px-2 py-0.5 rounded transition-colors ${
            copilotStatus ? 'bg-[#0098ff]' : 'hover:bg-[#0098ff]'
          }`}
        >
          <Sparkles size={14} className={copilotStatus ? 'fill-current' : ''} />
          <span>Copilot</span>
        </button>

        <span className="font-medium">{getLanguageFromPath()}</span>

        <span>UTF-8</span>

        <span className="font-medium">Prettier</span>

        <span className="font-mono">{time}</span>
      </div>
    </div>
  );
}
