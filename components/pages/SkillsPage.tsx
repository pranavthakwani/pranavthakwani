'use client';

import { CodeRenderer, Comment } from '../editor/CodeRenderer';
import { motion } from 'framer-motion';

export function SkillsPage() {
  const skillCategories = [
    {
      title: 'LANGUAGES',
      skills: [
        { name: 'Python', level: 92, color: '#c586c0' },
        { name: 'Java', level: 72, color: '#ce9178' },
        { name: 'JavaScript', level: 70, color: '#dcdcaa' },
        { name: 'TypeScript', level: 74, color: '#569cd6' },
        { name: 'SQL', level: 88, color: '#c586c0' },
      ],
    },
    {
      title: 'GENERATIVE AI & LLM ENGINEERING',
      skills: [
        { name: 'LangChain', level: 82, color: '#4ec9b0' },
        { name: 'LangGraph', level: 70, color: '#4ec9b0' },
        { name: 'RAG Pipelines', level: 85, color: '#569cd6' },
        { name: 'Prompt Engineering', level: 96, color: '#dcdcaa' },
        { name: 'Agentic Workflows', level: 89, color: '#c586c0' },
        { name: 'Hugging Face Transformers', level: 83, color: '#ce9178' },
      ],
    },
    {
      title: 'AI · ML · DATA SCIENCE',
      skills: [
        { name: 'PyTorch', level: 85, color: '#ce9178' },
        { name: 'TensorFlow', level: 80, color: '#ce9178' },
        { name: 'scikit-learn', level: 90, color: '#dcdcaa' },
        { name: 'Pandas', level: 88, color: '#569cd6' },
        { name: 'NumPy', level: 86, color: '#569cd6' },
        { name: 'spaCy', level: 80, color: '#4ec9b0' },
        { name: 'NLTK', level: 75, color: '#569cd6' },
      ],
    },
    {
      title: 'BACKEND & APIS',
      skills: [
        { name: 'FastAPI', level: 90, color: '#4ec9b0' },
        { name: 'Flask', level: 82, color: '#569cd6' },
        { name: 'Django', level: 76, color: '#4ec9b0' },
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

              <div className="space-y-5">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: catIndex * 0.1 + skillIndex * 0.05, duration: 0.3 }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[#d4d4d4] text-sm">{skill.name}</span>
                      <span className="text-sm font-mono" style={{ color: skill.color }}>
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-2 bg-[#2d2d2d] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{
                          delay: catIndex * 0.1 + skillIndex * 0.05 + 0.2,
                          duration: 0.8,
                          ease: 'easeOut',
                        }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: skill.color }}
                      />
                    </div>
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
