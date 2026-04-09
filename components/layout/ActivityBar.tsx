"use client";

import {
  VscFiles,
  VscSearch,
  VscSourceControl,
  VscExtensions,
} from "react-icons/vsc";
import { useState } from "react";

interface ActivityBarProps {
  activePanel: string;
  onPanelChange: (panel: string) => void;
}

export default function ActivityBar({ activePanel, onPanelChange }: ActivityBarProps) {
  const [active, setActive] = useState(activePanel);
  const items = [
    { id: "files", icon: <VscFiles size={22} /> },
    { id: "search", icon: <VscSearch size={22} /> },
    { id: "git", icon: <VscSourceControl size={22} /> },
    { id: "extensions", icon: <VscExtensions size={22} /> },
  ];

  return (
    <div className="w-[50px] bg-[#333333] flex flex-col items-center py-3 gap-6 border-r border-[#2a2a2a]">

      {items.map((item) => (
        <div
          key={item.id}
          onClick={() => onPanelChange(item.id)}
          className={`relative cursor-pointer text-gray-400 hover:text-white transition`}
        >
          {item.icon}

          {/* Active Indicator */}
          {active === item.id && (
            <span className="absolute left-[-10px] top-0 h-full w-[3px] bg-[#007acc]" />
          )}
        </div>
      ))}
    </div>
  );
}