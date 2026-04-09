'use client';

import { CodeRenderer, Comment } from '../editor/CodeRenderer';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Twitter, Code as Code2, Instagram, Send } from 'lucide-react';
import { useState } from 'react';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const socialLinks = [
    {
      icon: Mail,
      label: 'EMAIL',
      value: 'pranavthakwani@gmail.com',
      url: 'mailto:pranavthakwani@gmail.com',
      color: '#ea4335',
    },
    {
      icon: Linkedin,
      label: 'LINKEDIN',
      value: 'linkedin.com/in/pranavthakwani',
      url: 'https://linkedin.com/in/pranavthakwani',
      color: '#0077b5',
    },
    {
      icon: Github,
      label: 'GITHUB',
      value: 'github.com/pranavthakwani',
      url: 'https://github.com/pranavthakwani',
      color: '#ffffff',
    },
    {
      icon: Code2,
      label: 'MEDIUM',
      value: 'medium.com/@pranavthakwani',
      url: 'https://medium.com/@pranavthakwani',
      color: '#00ab6c',
    },
    {
      icon: Code2,
      label: 'TABLEAU',
      value: 'Tableau Public Vizzes',
      url: 'https://public.tableau.com/app/profile/pranavthakwani',
      color: '#e97627',
    },
    {
      icon: Code2,
      label: 'LEETCODE',
      value: 'leetcode.com/pranavthakwani',
      url: 'https://leetcode.com/pranavthakwani',
      color: '#ffa116',
    },
    {
      icon: Twitter,
      label: 'TWITTER/X',
      value: 'twitter.com/pranavthakwani',
      url: 'https://twitter.com/pranavthakwani',
      color: '#1DA1F2',
    },
    {
      icon: Instagram,
      label: 'INSTAGRAM',
      value: 'instagram.com/pranavthakwani',
      url: 'https://instagram.com/pranavthakwani',
      color: '#e4405f',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:pranavthakwani@gmail.com?subject=${encodeURIComponent(
      formData.subject
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
    )}`;
    window.location.href = mailtoLink;
  };

  return (
    <CodeRenderer fileName="contact.css">
      <div className="max-w-5xl mx-auto">
        <Comment>/* contact.css - let's build something */</Comment>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-8 mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">Contact</h1>
          <Comment>// open to work, collabs & good conversations</Comment>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h2 className="text-xl font-bold text-[#4ec9b0] mb-6 uppercase tracking-wide">
              FIND ME ON
            </h2>

            <div className="space-y-3">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-[#252526] border border-[#3c3c3c] rounded hover:border-[#007acc] transition-colors group"
                >
                  <link.icon size={20} style={{ color: link.color }} />
                  <div className="flex-1">
                    <p className="text-xs text-[#858585] uppercase tracking-wider mb-1">
                      {link.label}
                    </p>
                    <p className="text-[#d4d4d4] text-sm group-hover:text-white transition-colors">
                      {link.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <h2 className="text-xl font-bold text-[#4ec9b0] mb-6 uppercase tracking-wide">
              SEND A MESSAGE
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-[#858585] mb-2">
                  <Comment>// YOUR_NAME *</Comment>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-[#252526] border border-[#3c3c3c] rounded text-[#d4d4d4] focus:border-[#007acc] outline-none transition-colors"
                  placeholder="string"
                />
              </div>

              <div>
                <label className="block text-sm text-[#858585] mb-2">
                  <Comment>// YOUR_EMAIL *</Comment>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-[#252526] border border-[#3c3c3c] rounded text-[#d4d4d4] focus:border-[#007acc] outline-none transition-colors"
                  placeholder="string"
                />
              </div>

              <div>
                <label className="block text-sm text-[#858585] mb-2">
                  <Comment>// SUBJECT</Comment>
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 bg-[#252526] border border-[#3c3c3c] rounded text-[#d4d4d4] focus:border-[#007acc] outline-none transition-colors"
                  placeholder="string"
                />
              </div>

              <div>
                <label className="block text-sm text-[#858585] mb-2">
                  <Comment>// MESSAGE *</Comment>
                </label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-3 bg-[#252526] border border-[#3c3c3c] rounded text-[#d4d4d4] focus:border-[#007acc] outline-none transition-colors resize-none"
                  placeholder="/* your message */"
                />
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-[#007acc] text-white rounded hover:bg-[#0098ff] transition-colors flex items-center justify-center gap-2 font-medium"
              >
                <span>→ send_message()</span>
                <Send size={18} />
              </button>

              <p className="text-xs text-[#858585] text-center">
                <Comment>// Powered by F0resques (lands directly in my inbox) :p</Comment>
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </CodeRenderer>
  );
}
