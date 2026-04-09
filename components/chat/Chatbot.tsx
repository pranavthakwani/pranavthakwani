'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Send, Sparkles, X } from 'lucide-react';

import { trackChat, trackClick } from '@/lib/analytics';
import { generateChatId, getChatContext } from '@/lib/chatbot';
import { CHAT_PROMPTS } from '@/lib/constants';
import { ChatMessage } from '@/lib/types';

interface ChatbotProps {
  currentPage: string;
  onClose: () => void;
}

export function Chatbot({ currentPage, onClose }: ChatbotProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: generateChatId(),
      content:
        "Hi, I'm the portfolio copilot. Ask about Pranav's work, projects, stack, or how to get in touch.",
      role: 'assistant',
      timestamp: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = async (value?: string) => {
    const message = (value || input).trim();
    if (!message) {
      return;
    }

    const userMessage: ChatMessage = {
      id: generateChatId(),
      content: message,
      role: 'user',
      timestamp: new Date().toISOString(),
    };

    setMessages((previous) => [...previous, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          context: getChatContext(),
        }),
      });

      const payload = (await response.json()) as { message?: string };
      const assistantMessage: ChatMessage = {
        id: generateChatId(),
        content: payload.message || 'I hit a small issue, but I can still help with projects, skills, or contact details.',
        role: 'assistant',
        timestamp: new Date().toISOString(),
      };

      setMessages((previous) => [...previous, assistantMessage]);
      trackChat(currentPage, {
        action: 'chat_message',
        query: message,
      });
    } catch {
      setMessages((previous) => [
        ...previous,
        {
          id: generateChatId(),
          content: 'The assistant fell back to offline mode. Ask again and I can still answer from the local portfolio context.',
          role: 'assistant',
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <aside className="flex h-full min-h-0 flex-col bg-[var(--vscode-panel)]">
      <div className="flex items-center justify-between border-b border-[var(--vscode-border)] px-4 py-3">
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-[var(--vscode-accent)]" />
          <div>
            <div className="text-[12px] text-white">Portfolio Assistant</div>
            <div className="text-[11px] text-[var(--vscode-muted)]">Copilot-style side panel</div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            onClose();
            trackClick(currentPage, {
              action: 'chat_panel_close',
            });
          }}
          className="rounded p-1 text-[var(--vscode-muted)] transition hover:bg-[#343434] hover:text-white"
          aria-label="Close assistant"
        >
          <X size={16} />
        </button>
      </div>

      <div className="border-b border-[var(--vscode-border)] px-4 py-2 text-[11px] text-[var(--vscode-muted)]">
        CONTEXT: bio + projects + skills + contact
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`flex ${message.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`max-w-[88%] rounded-md border px-3 py-2 text-[12px] leading-6 ${
                  message.role === 'assistant'
                    ? 'border-[#3a3a3a] bg-[#202020] text-[var(--vscode-text)]'
                    : 'border-[#0e639c] bg-[#094771] text-white'
                }`}
              >
                {message.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
            <div className="rounded-md border border-[#3a3a3a] bg-[#202020] px-3 py-2 text-[12px] text-[var(--vscode-muted)]">
              typing...
            </div>
          </motion.div>
        )}

        <div ref={scrollRef} />
      </div>

      {messages.length === 1 && (
        <div className="border-t border-[var(--vscode-border)] px-4 py-3">
          <div className="mb-2 text-[11px] uppercase tracking-[0.15em] text-[var(--vscode-muted)]">
            Suggestions
          </div>
          <div className="grid gap-2">
            {CHAT_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => sendMessage(prompt)}
                className="rounded border border-[#3a3a3a] bg-[#202020] px-3 py-2 text-left text-[12px] text-[var(--vscode-text)] transition hover:border-[#0e639c] hover:bg-[#252b32]"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="border-t border-[var(--vscode-border)] p-4">
        <div className="flex items-center gap-2 rounded-md border border-[#3a3a3a] bg-[#1f1f1f] p-2">
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                void sendMessage();
              }
            }}
            placeholder="Ask about work, skills, projects, contact..."
            className="w-full bg-transparent text-[12px] text-[var(--vscode-text)] outline-none placeholder:text-[var(--vscode-muted)]"
          />
          <button
            type="button"
            onClick={() => void sendMessage()}
            className="rounded bg-[var(--vscode-accent)] p-2 text-white transition hover:brightness-110"
            aria-label="Send message"
          >
            <Send size={14} />
          </button>
        </div>
      </div>
    </aside>
  );
}
