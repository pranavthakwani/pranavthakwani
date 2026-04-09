"use client";

import { useState } from "react";

const menus = [
  { name: "File", items: ["New File", "Open...", "Save", "Exit"] },
  { name: "Edit", items: ["Undo", "Redo", "Cut", "Copy", "Paste"] },
  { name: "Selection", items: ["Select All", "Expand Selection"] },
  { name: "View", items: ["Appearance", "Explorer", "Terminal"] },
  { name: "Go", items: ["Go to File", "Go to Line"] },
  { name: "Run", items: ["Start Debugging", "Run Without Debugging"] },
  { name: "Terminal", items: ["New Terminal", "Split Terminal"] },
  { name: "Help", items: ["Documentation", "About"] },
];

export default function MenuBar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  return (
    <div className="w-full h-9 flex items-center px-2 bg-[#252526] text-sm text-gray-300 border-b border-[#2a2a2a] relative">
      
      {menus.map((menu) => (
        <div
          key={menu.name}
          className="relative px-3 py-1 cursor-pointer hover:bg-[#37373d]"
          onClick={() =>
            setActiveMenu(activeMenu === menu.name ? null : menu.name)
          }
        >
          {menu.name}

          {/* Dropdown */}
          {activeMenu === menu.name && (
            <div className="absolute top-8 left-0 bg-[#2d2d30] shadow-lg border border-[#3c3c3c] w-44 z-50">
              {menu.items.map((item, i) => (
                <div
                  key={i}
                  className="px-4 py-2 hover:bg-[#094771] hover:text-white cursor-pointer"
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Click outside to close */}
      {activeMenu && (
        <div
          className="fixed inset-0"
          onClick={() => setActiveMenu(null)}
        />
      )}
    </div>
  );
}