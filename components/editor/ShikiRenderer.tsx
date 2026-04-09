'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { codeToHtml } from 'shiki';

interface ShikiCodeBlockProps {
  code: string;
  language: string;
  fileName: string;
}

export function ShikiCodeBlock({ code, language, fileName }: ShikiCodeBlockProps) {
  const [highlightedCode, setHighlightedCode] = useState<string>('');

  useEffect(() => {
    const highlight = async () => {
      const html = await codeToHtml(code, {
        lang: language,
        theme: 'dark-plus',
      });
      setHighlightedCode(html);
    };
    highlight();
  }, [code, language]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="h-full overflow-y-auto bg-[#1e1e1e]"
    >
      <div className="flex items-center gap-2 px-4 py-2 bg-[#252526] border-b border-[#3c3c3c] text-xs text-[#858585]">
        <span>{fileName}</span>
        <span className="text-[#3c3c3c]">|</span>
        <span>{language}</span>
        <span className="text-[#3c3c3c]">|</span>
        <span>UTF-8</span>
      </div>
      <div
        className="p-4 font-mono text-sm leading-relaxed"
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
      />
    </motion.div>
  );
}

interface CodeRendererProps {
  children: React.ReactNode;
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
      <div className="flex items-center gap-2 px-4 py-2 bg-[#252526] border-b border-[#3c3c3c] text-xs text-[#858585] sticky top-0 z-10">
        <span>{fileName}</span>
        <span className="text-[#3c3c3c]">|</span>
        <span>UTF-8</span>
      </div>
      <div className="p-8 font-mono text-sm leading-relaxed">
        {children}
      </div>
    </motion.div>
  );
}

interface CodeBlockWithLineNumbersProps {
  code: string;
  language: 'tsx' | 'html' | 'js' | 'json' | 'ts' | 'css' | 'python' | 'sql';
  showLineNumbers?: boolean;
}

export function CodeBlockWithLineNumbers({
  code,
  language,
  showLineNumbers = true,
}: CodeBlockWithLineNumbersProps) {
  const [highlightedCode, setHighlightedCode] = useState<string>('');

  useEffect(() => {
    const highlight = async () => {
      const html = await codeToHtml(code, {
        lang: language,
        theme: 'dark-plus',
      });
      setHighlightedCode(html);
    };
    highlight();
  }, [code, language]);

  const lines = code.split('\n');

  if (!highlightedCode) {
    return (
      <div className="bg-[#1e1e1e] p-4 font-mono text-sm">
        {showLineNumbers && (
          <div className="flex">
            <div className="select-none pr-4 text-right text-[#858585] border-r border-[#3c3c3c] mr-4">
              {lines.map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
            <pre className="text-[#d4d4d4]">{code}</pre>
          </div>
        )}
        {!showLineNumbers && <pre className="text-[#d4d4d4]">{code}</pre>}
      </div>
    );
  }

  return (
    <div className="bg-[#1e1e1e] rounded overflow-hidden">
      {showLineNumbers ? (
        <div className="flex">
          <div className="select-none py-4 pl-4 pr-4 text-right text-[#858585] bg-[#1e1e1e] border-r border-[#3c3c3c]">
            {lines.map((_, i) => (
              <div key={i} className="leading-6 text-xs">
                {i + 1}
              </div>
            ))}
          </div>
          <div
            className="flex-1 py-4 pl-4 overflow-x-auto"
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          />
        </div>
      ) : (
        <div
          className="p-4 overflow-x-auto"
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
      )}
    </div>
  );
}

// Legacy helper components for inline syntax highlighting
export function CodeLine({
  lineNumber,
  children,
}: {
  lineNumber?: number;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4 hover:bg-[#2a2a2a] px-4 -mx-4 py-0.5">
      {lineNumber !== undefined && (
        <span className="text-[#858585] select-none w-8 text-right flex-shrink-0">
          {lineNumber}
        </span>
      )}
      <div className="flex-1">{children}</div>
    </div>
  );
}

export function Comment({ children }: { children: React.ReactNode }) {
  return <span className="text-[#6a9955]">{children}</span>;
}

export function Keyword({ children }: { children: React.ReactNode }) {
  return <span className="text-[#569cd6]">{children}</span>;
}

export function String({ children }: { children: React.ReactNode }) {
  return <span className="text-[#ce9178]">{children}</span>;
}

export function Function({ children }: { children: React.ReactNode }) {
  return <span className="text-[#dcdcaa]">{children}</span>;
}

export function Property({ children }: { children: React.ReactNode }) {
  return <span className="text-[#9cdcfe]">{children}</span>;
}

export function Number({ children }: { children: React.ReactNode }) {
  return <span className="text-[#b5cea8]">{children}</span>;
}

export function Tag({ children }: { children: React.ReactNode }) {
  return <span className="text-[#4ec9b0]">{children}</span>;
}

export function ClassName({ children }: { children: React.ReactNode }) {
  return <span className="text-[#4ec9b0]">{children}</span>;
}

export function Type({ children }: { children: React.ReactNode }) {
  return <span className="text-[#4ec9b0]">{children}</span>;
}

export function Operator({ children }: { children: React.ReactNode }) {
  return <span className="text-[#d4d4d4]">{children}</span>;
}

export function Variable({ children }: { children: React.ReactNode }) {
  return <span className="text-[#9cdcfe]">{children}</span>;
}
