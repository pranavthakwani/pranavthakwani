'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, X, Minimize2 } from 'lucide-react';
import { ChatMessage } from '@/lib/types';
import { getChatResponse, generateChatId } from '@/lib/chatbot';
import { trackChatInteraction } from '@/lib/analytics';
import { CHAT_PROMPTS } from '@/lib/constants';

interface ChatbotProps {
  onClose: () => void;
}

export function Chatbot({ onClose }: ChatbotProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: generateChatId(),
      content: "Hi! I'm Pranav's Copilot 👋\n\nAsk me anything about his projects, skills, experience, or achievements.",
      role: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [width, setWidth] = useState(384); // Default width (w-96)
  const [isResizing, setIsResizing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatbotRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isResizing && chatbotRef.current) {
        const newWidth = window.innerWidth - e.clientX;
        if (newWidth >= 300 && newWidth <= 600) {
          setWidth(newWidth);
        }
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  };

  const handleSendMessage = async (messageText?: string) => {
    const userMessage = messageText || input.trim();
    if (!userMessage) return;

    const newUserMessage: ChatMessage = {
      id: generateChatId(),
      content: userMessage,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = getChatResponse(userMessage);
      const botMessage: ChatMessage = {
        id: generateChatId(),
        content: response,
        role: 'assistant',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);

      trackChatInteraction(userMessage, response);
    }, 800);
  };

  const handlePromptClick = (prompt: string) => {
    handleSendMessage(prompt);
  };

  return (
    <div 
      ref={chatbotRef}
      className="bg-[#252526] border-l border-[#3c3c3c] flex flex-col h-full relative"
      style={{ width: `${width}px` }}
    >
      {/* Resize Handle */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1 bg-transparent hover:bg-[#007acc] cursor-col-resize z-10 transition-colors"
        onMouseDown={handleResizeStart}
      />

      <div className="p-4 border-b border-[#3c3c3c] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles size={18} className="text-[#007acc]" />
          <h2 className="text-sm font-medium text-[#d4d4d4]">Pranav's AI Assistant</h2>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={onClose}
            className="p-1 hover:bg-[#3c3c3c] rounded transition-colors"
          >
            <X size={16} className="text-[#858585]" />
          </button>
        </div>
      </div>

      <div className="px-3 py-2 border-b border-[#3c3c3c]">
        <p className="text-xs text-[#858585]">
          WORKSPACE <span className="text-[#007acc]">• portfolio-pranav-thakwani</span>
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence mode="popLayout">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-lg p-3 ${
                  message.role === 'user'
                    ? 'bg-[#007acc] text-white'
                    : 'bg-[#2d2d2d] text-[#d4d4d4]'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-[#2d2d2d] rounded-lg p-3">
              <div className="flex gap-1">
                <motion.div
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                  className="w-2 h-2 bg-[#858585] rounded-full"
                />
                <motion.div
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                  className="w-2 h-2 bg-[#858585] rounded-full"
                />
                <motion.div
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                  className="w-2 h-2 bg-[#858585] rounded-full"
                />
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {messages.length === 1 && (
        <div className="px-4 pb-4">
          <p className="text-xs text-[#858585] mb-2">Suggested prompts:</p>
          <div className="grid grid-cols-2 gap-2">
            {CHAT_PROMPTS.map((prompt, index) => (
              <button
                key={index}
                onClick={() => handlePromptClick(prompt)}
                className="text-left text-xs p-2 bg-[#2d2d2d] hover:bg-[#3c3c3c] text-[#d4d4d4] rounded border border-[#3c3c3c] transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="p-4 border-t border-[#3c3c3c]">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask about Pranav's projects, experience, skills..."
            className="flex-1 bg-[#3c3c3c] text-[#d4d4d4] text-sm px-3 py-2 rounded border border-[#3c3c3c] focus:border-[#007acc] outline-none placeholder:text-[#858585]"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={!input.trim()}
            className="p-2 bg-[#007acc] text-white rounded hover:bg-[#0098ff] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
        <p className="text-[10px] text-[#858585] mt-2">
          AI can make mistakes. Contact Pranav directly for important info.
        </p>
      </div>
    </div>
  );
}
