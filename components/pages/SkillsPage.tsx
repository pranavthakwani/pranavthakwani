'use client';

import { CodeRenderer, Comment } from '../editor/CodeRenderer';
import { motion } from 'framer-motion';

export function SkillsPage() {
  const skillCategories = [
    {
      title: 'PROGRAMMING LANGUAGES',
      skills: [
        { name: 'JavaScript', level: 95, color: '#dcdcaa' },
        { name: 'Python', level: 90, color: '#c586c0' },
        { name: 'Java', level: 85, color: '#ce9178' },
        { name: 'TypeScript', level: 80, color: '#569cd6' },
        { name: 'SQL', level: 88, color: '#c586c0' },
      ],
    },
    {
      title: 'AI & MACHINE LEARNING',
      skills: [
        { name: 'RAG Systems', level: 92, color: '#4ec9b0' },
        { name: 'LLM Operations', level: 88, color: '#569cd6' },
        { name: 'Computer Vision', level: 85, color: '#ce9178' },
        { name: 'CNN Architectures', level: 82, color: '#c586c0' },
        { name: 'Data Classification', level: 90, color: '#dcdcaa' },
        { name: 'Feature Engineering', level: 87, color: '#4ec9b0' },
      ],
    },
    {
      title: 'BACKEND & AUTOMATION',
      skills: [
        { name: 'Node.js', level: 92, color: '#4ec9b0' },
        { name: 'FastAPI', level: 88, color: '#569cd6' },
        { name: 'Flask', level: 85, color: '#c586c0' },
        { name: 'Automation Workflows', level: 94, color: '#dcdcaa' },
        { name: 'API Development', level: 90, color: '#4ec9b0' },
        { name: 'Data Processing', level: 87, color: '#569cd6' },
      ],
    },
    {
      title: 'FRONTEND & MOBILE',
      skills: [
        { name: 'React.js', level: 88, color: '#4ec9b0' },
        { name: 'Next.js', level: 82, color: '#c586c0' },
        { name: 'Responsive Design', level: 90, color: '#4ec9b0' },
      ],
    },
    {
      title: 'TOOLS & PLATFORMS',
      skills: [
        { name: 'MongoDB', level: 85, color: '#4ec9b0' },
        { name: 'Firebase', level: 82, color: '#569cd6' },
        { name: 'Playwright', level: 88, color: '#ce9178' },
        { name: 'n8n Automation', level: 90, color: '#c586c0' },
        { name: 'WebRTC', level: 78, color: '#dcdcaa' },
        { name: 'Socket.io', level: 85, color: '#4ec9b0' },
      ],
    },
  ];

  return (
    <CodeRenderer fileName="skills.json">
      <div className="max-w-6xl mx-auto">
        <Comment>// skills.json - tech stack & tools I actually use</Comment>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-8 mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">Skills</h1>
          <p className="text-[#858585]">
            <span className="text-[#d4d4d4]">{'{'}</span>{' '}
            <span className="text-[#9cdcfe]">"status"</span>
            <span className="text-[#d4d4d4]">:</span>{' '}
            <span className="text-[#ce9178]">"always_learning"</span>
            <span className="text-[#d4d4d4]">,</span>{' '}
            <span className="text-[#9cdcfe]">"passion"</span>
            <span className="text-[#d4d4d4]">:</span>{' '}
            <span className="text-[#ce9178]">"immeasurable"</span>{' '}
            <span className="text-[#d4d4d4]">{'}'}</span>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={catIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: catIndex * 0.1, duration: 0.5 }}
              className="space-y-4"
            >
              <h2 className="text-sm font-bold text-[#dcdcaa] mb-6 tracking-wider">
                {category.title}
              </h2>

              <div className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: catIndex * 0.1 + skillIndex * 0.05, duration: 0.3 }}
                    className="flex items-center p-3 bg-[#252526] border border-[#3c3c3c] rounded hover:border-[#4ec9b0] transition-colors"
                  >
                    <span className="text-[#d4d4d4] text-sm font-medium">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </CodeRenderer>
  );
}
