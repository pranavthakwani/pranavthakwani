'use client';

import { CodeRenderer, Comment, Tag } from '../editor/CodeRenderer';
import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Rocket, Coffee } from 'lucide-react';

export function AboutPage() {
  const currentFocus = [
    { icon: '�️', text: 'Building scalable backend systems & AI integrations at KORE Mobile' },
    { icon: '🌱', text: 'Currently exploring RAG, MLOps & Vector Databases' },
    { icon: '🔥', text: 'Making data stories non-data people actually get' },
    { icon: '🚀', text: 'Always learning, always shipping' },
  ];

  const interests = [
    { icon: '💡', text: 'Deep interest in NLP, LLMs & ML pipelines' },
    { icon: '💬', text: 'Talk to me about Python, APIs, Data Science' },
    { icon: '∞', text: 'Always learning, always shipping' },
  ];

  return (
    <CodeRenderer fileName="about.html">
      <div className="max-w-4xl mx-auto">
        <Comment>&lt;!-- about.html - Pranav Thakwani --&gt;</Comment>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-8"
        >
          <h1 className="text-4xl font-bold text-white mb-6">
            <Tag>About Me</Tag>
          </h1>

          <Comment>{"// Who I am · what I do · where I build"}</Comment>

          <div className="mt-8 space-y-6 text-[#d4d4d4] leading-relaxed">
            <p className="text-lg">
              Hi! I&apos;m <span className="text-[#4ec9b0] font-semibold">Pranav Thakwani</span>, a software developer living at the crossroads of{' '}
              <span className="text-[#569cd6]">backend engineering</span>,{' '}
              <span className="text-[#569cd6]">AI/Automation</span>, and{' '}
              <span className="text-[#4ec9b0]">product management</span>. I love building systems that are not just functional but genuinely{' '}
              <span className="text-[#ce9178]">intelligent and scalable</span>.
            </p>

            <p className="text-lg">
              Currently a <span className="text-[#569cd6] font-semibold">Junior Software Developer at KORE Mobile</span>, building AI integrations and backend systems that power learning experiences for thousands of users daily.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold text-[#4ec9b0] mb-6 uppercase tracking-wide">
            CURRENT FOCUS
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentFocus.map((item, index) => (
              <div
                key={index}
                className="p-4 bg-[#252526] border border-[#3c3c3c] rounded hover:border-[#4ec9b0] transition-colors"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{item.icon}</span>
                  <p className="text-[#d4d4d4] text-sm">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold text-[#4ec9b0] mb-6 uppercase tracking-wide">
            EDUCATION
          </h2>

          <div className="space-y-6">
            <div className="p-6 bg-[#252526] border border-[#3c3c3c] rounded">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <GraduationCap className="text-[#569cd6]" size={24} />
                  <h3 className="text-xl font-bold text-white">Indian Institute of Technology, Patna</h3>
                </div>
                <span className="text-[#858585]">Jun 2025 – Mar 2026</span>
              </div>
              <p className="text-[#569cd6] font-medium">Product Management</p>
            </div>

            <div className="p-6 bg-[#252526] border border-[#3c3c3c] rounded">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <GraduationCap className="text-[#569cd6]" size={24} />
                  <h3 className="text-xl font-bold text-white">Marwadi University</h3>
                </div>
                <span className="text-[#858585]">Sep 2021 – Jun 2025</span>
              </div>
              <p className="text-[#569cd6] font-medium">Bachelor of Technology - BTech, Computer Engineering</p>
            </div>

            <div className="p-6 bg-[#252526] border border-[#3c3c3c] rounded">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <GraduationCap className="text-[#569cd6]" size={24} />
                  <h3 className="text-xl font-bold text-white">P.V. Modi High School</h3>
                </div>
                <span className="text-[#858585]">Jun 2019 – May 2021</span>
              </div>
              <p className="text-[#569cd6] font-medium">HSC, Science</p>
            </div>

            <div className="p-6 bg-[#252526] border border-[#3c3c3c] rounded">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <GraduationCap className="text-[#569cd6]" size={24} />
                  <h3 className="text-xl font-bold text-white">P.V. Modi School</h3>
                </div>
                <span className="text-[#858585]">Jun 2009 – May 2019</span>
              </div>
              <p className="text-[#569cd6] font-medium">Primary & Secondary Education</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-12 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {interests.map((item, index) => (
              <div
                key={index}
                className="p-4 bg-[#252526] border border-[#3c3c3c] rounded text-center hover:border-[#569cd6] transition-colors"
              >
                <div className="text-3xl mb-2">{item.icon}</div>
                <p className="text-[#d4d4d4] text-sm">{item.text}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </CodeRenderer>
  );
}
