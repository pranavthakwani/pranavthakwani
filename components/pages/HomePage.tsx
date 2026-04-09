'use client';

import { CodeRenderer, Comment } from '../editor/CodeRenderer';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Twitter, Code as Code2, Instagram } from 'lucide-react';
import Link from 'next/link';
import { ProfileCard } from '../ui/ProfileCard';

export function HomePage() {
  const stats = [
    { label: 'YEARS', value: '1+' },
    { label: 'PROJECTS', value: '10+' },
    { label: 'CURIOSITY', value: '∞' },
    { label: 'ALWAYS LEARNING', value: '↑' },
  ];

  const socialLinks = [
    { icon: Github, label: 'GitHub', url: 'https://github.com/pranavthakwani', color: '#ffffff' },
    { icon: Linkedin, label: 'LinkedIn', url: 'https://linkedin.com/in/pranavthakwani', color: '#0077b5' },
    { icon: Mail, label: 'Email', url: 'mailto:pranavthakwani@gmail.com', color: '#ea4335' },
    { icon: Code2, label: 'LeetCode', url: 'https://leetcode.com/pranavthakwani', color: '#ffa116' },
    { icon: Instagram, label: 'Instagram', url: 'https://instagram.com/pranavthakwani', color: '#e4405f' },
    { icon: Twitter, label: 'Twitter/X', url: 'https://twitter.com/pranavthakwani', color: '#1DA1F2' },
  ];

  return (
    <CodeRenderer fileName="home.tsx">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Comment>// hello world !! Welcome to my portfolio</Comment>

            <div className="mt-8 mb-12">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-6xl font-bold mb-4"
              >
                <span className="text-white">Pranav</span>
                <br />
                <span
                  className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-600"
                  style={{
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Thakwani
                </span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="flex flex-wrap gap-3 mt-6"
              >
                <span className="px-3 py-1.5 bg-[#2a2a2a] border border-red-500 text-red-500 rounded text-sm">
                  ● Backend Engineer
                </span>
                <span className="px-3 py-1.5 bg-[#2a2a2a] border border-yellow-500 text-yellow-500 rounded text-sm">
                  ● AI / Automation Dev
                </span>
                <span className="px-3 py-1.5 bg-[#2a2a2a] border border-green-500 text-green-500 rounded text-sm">
                  ● Product Enthusiast
                </span>
                <span className="px-3 py-1.5 bg-[#2a2a2a] border border-blue-500 text-blue-500 rounded text-sm">
                  🏢 KORE Mobile
                </span>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mb-12 text-[#d4d4d4] leading-relaxed space-y-4"
            >
              <p>
                Exploring LLMs & RAG pipel<span className="text-[#ce9178]">i</span>n<span className="text-[#4ec9b0]">e</span>s
              </p>

              <p className="text-lg">
                I am focused on developing products that combine <span className="text-[#569cd6]">practical tech</span>,{' '}
                <span className="text-[#569cd6]">user experience</span>, and{' '}
                <span className="text-[#4ec9b0]">strategic thinking</span>. My emphasis is on{' '}
                <span className="text-[#ce9178]">understanding users</span>, addressing meaningful challenges, and shaping concepts into{' '}
                <span className="text-[#569cd6]">scalable digital experiences</span>.
              </p>

              <p className="text-lg">
                I am currently enhancing my expertise in <span className="text-[#569cd6]">product management</span> and{' '}
                <span className="text-[#569cd6]">AI-driven automation</span> to create thoughtful,{' '}
                <span className="text-[#4ec9b0]">user-centric products</span> with lasting impact.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex gap-4 mb-12"
            >
              <Link
                href="/projects"
                className="px-6 py-3 bg-[#007acc] text-white rounded hover:bg-[#0098ff] transition-colors flex items-center gap-2 font-medium"
              >
                📂 Projects
              </Link>
              <Link
                href="/about"
                className="px-6 py-3 bg-[#2a2a2a] text-[#d4d4d4] border border-[#3c3c3c] rounded hover:bg-[#3c3c3c] transition-colors flex items-center gap-2 font-medium"
              >
                👤 About Me
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 bg-[#2a2a2a] text-[#d4d4d4] border border-[#3c3c3c] rounded hover:bg-[#3c3c3c] transition-colors flex items-center gap-2 font-medium"
              >
                💬 Contact
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="grid grid-cols-4 gap-6 mb-12 p-6 bg-[#252526] border border-[#3c3c3c] rounded-lg"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-xs text-[#858585] uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-[#2a2a2a] border border-[#3c3c3c] rounded hover:border-[#007acc] transition-colors group"
                    style={{ color: link.color }}
                  >
                    <link.icon size={16} />
                    <span className="text-[#d4d4d4] text-sm group-hover:text-white">{link.label}</span>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Profile Card - Right Side */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="sticky top-8"
            >
              <ProfileCard />
            </motion.div>
          </div>
        </div>
      </div>
    </CodeRenderer>
  );
}
