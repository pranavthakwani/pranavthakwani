'use client';

import { CodeRenderer, Comment } from '../editor/CodeRenderer';
import { motion } from 'framer-motion';
import { Briefcase, Calendar } from 'lucide-react';

export function ExperiencePage() {
  const experiences = [
    {
      company: 'KORE Mobile',
      role: 'Junior Software Developer',
      type: 'Full-time',
      duration: 'May 2024 - Present',
      location: 'Remote',
      achievements: [
        'Built scalable RAG pipelines & vector search systems using Pinecone, LangChain & LangGraph',
        'Developed backend APIs with FastAPI serving 1000+ daily users',
        'Implemented MLOps workflows for model deployment & monitoring',
        'Integrated OpenAI & Anthropic APIs for intelligent chatbot features',
        'Optimized database queries reducing response time by 40%',
      ],
      tags: ['Python', 'FastAPI', 'LangChain', 'Pinecone', 'PostgreSQL', 'Docker'],
      color: 'blue',
    },
    {
      company: 'Freelance Developer',
      role: 'Full Stack & AI/ML Projects',
      type: 'Contract',
      duration: '2022 - Present',
      location: 'Remote',
      achievements: [
        'Developed Little Angel Foundation website (NGO) from scratch',
        'Built AI-powered women safety app with voice emotion recognition',
        'Created multiple GraphRAG and LLM-based applications',
        'Delivered 10+ client projects across web dev and AI domains',
      ],
      tags: ['React', 'Node.js', 'Python', 'AI/ML', 'APIs'],
      color: 'green',
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { border: string; text: string; bg: string }> = {
      blue: {
        border: 'border-blue-400',
        text: 'text-blue-400',
        bg: 'bg-blue-400/10',
      },
      green: {
        border: 'border-green-400',
        text: 'text-green-400',
        bg: 'bg-green-400/10',
      },
    };
    return colors[color] || colors.blue;
  };

  return (
    <CodeRenderer fileName="experience.ts">
      <div className="max-w-4xl mx-auto">
        <Comment>// experience.ts - where I've worked & what I've built</Comment>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-8 mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">Experience</h1>
          <p className="text-[#858585]">
            <span className="text-[#569cd6]">interface</span>{' '}
            <span className="text-[#4ec9b0]">Experience</span>{' '}
            <span className="text-[#d4d4d4]">{'{'}</span>
          </p>
        </motion.div>

        <div className="space-y-8">
          {experiences.map((exp, index) => {
            const colors = getColorClasses(exp.color);
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className={`p-6 bg-[#252526] border ${colors.border} rounded-lg`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Briefcase className={colors.text} size={24} />
                      <h3 className="text-xl font-bold text-white">{exp.company}</h3>
                    </div>
                    <p className="text-lg text-[#569cd6] font-medium mb-1">{exp.role}</p>
                    <div className="flex items-center gap-4 text-sm text-[#858585]">
                      <span className={`px-2 py-1 ${colors.bg} ${colors.text} rounded text-xs font-medium`}>
                        {exp.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {exp.duration}
                      </span>
                      <span>📍 {exp.location}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  {exp.achievements.map((achievement, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-[#4ec9b0] mt-1">▹</span>
                      <p className="text-[#d4d4d4] text-sm leading-relaxed">{achievement}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  {exp.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-[#2d2d2d] text-[#858585] text-xs rounded border border-[#3c3c3c]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </CodeRenderer>
  );
}
