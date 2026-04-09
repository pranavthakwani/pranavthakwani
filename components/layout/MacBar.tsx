"use client";

export default function MacBar() {
  return (
    <div className="w-full h-8 flex items-center px-3 bg-[#1f1f1f] border-b border-[#2a2a2a]">
      
      {/* Traffic Lights */}
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
        <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
        <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
      </div>

      {/* Center Title */}
      <div className="flex-1 text-center text-xs text-gray-400">
        portfolio — VS Code
      </div>
    </div>
  );
}