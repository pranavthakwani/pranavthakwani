'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CodeRendererProps {
  children: ReactNode;
  fileName: string;
}

export function CodeRenderer({ children, fileName }: CodeRendererProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="h-full overflow-y-auto bg-[#1e1e1e] text-[#d4d4d4]"
    >
      <div className="p-8 font-mono text-sm leading-relaxed">
        {children}
      </div>
    </motion.div>
  );
}

export function CodeLine({ lineNumber, children }: { lineNumber?: number; children: ReactNode }) {
  return (
    <div className="flex gap-8 hover:bg-[#2a2a2a] px-4 -mx-4 py-0.5">
      {lineNumber !== undefined && (
        <span className="text-[#858585] select-none w-8 text-right flex-shrink-0">
          {lineNumber}
        </span>
      )}
      <div className="flex-1">{children}</div>
    </div>
  );
}

export function Comment({ children }: { children: ReactNode }) {
  return <span className="text-[#6a9955]">{children}</span>;
}

export function Keyword({ children }: { children: ReactNode }) {
  return <span className="text-[#569cd6]">{children}</span>;
}

export function String({ children }: { children: ReactNode }) {
  return <span className="text-[#ce9178]">{children}</span>;
}

export function Function({ children }: { children: ReactNode }) {
  return <span className="text-[#dcdcaa]">{children}</span>;
}

export function Property({ children }: { children: ReactNode }) {
  return <span className="text-[#9cdcfe]">{children}</span>;
}

export function Number({ children }: { children: ReactNode }) {
  return <span className="text-[#b5cea8]">{children}</span>;
}

export function Tag({ children }: { children: ReactNode }) {
  return <span className="text-[#4ec9b0]">{children}</span>;
}

export function ClassName({ children }: { children: ReactNode }) {
  return <span className="text-[#4ec9b0]">{children}</span>;
}
