'use client';

import { CodeRenderer, Comment } from '../editor/CodeRenderer';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Heart, Shield, Brain, Sparkles } from 'lucide-react';

export function ProjectsPage() {
  const projects = [
    {
      icon: <Heart className="text-pink-500" size={24} />,
      category: 'FULL STACK · NGO · SOCIAL IMPACT',
      title: 'Little Angel Foundation',
      description:
        "Official website for my mom's NGO, built from scratch. Little Angel Foundation supports underprivileged children through education and care. Founded by Priyanka Bobade 9 years ago. Revamped and developed the entire site as my way of giving back to something I've believed in for years.",
      tags: ['React', 'JavaScript', 'Node DB', 'Cloudinary'],
      liveUrl: 'https://littleangelfoundation.org',
      color: 'pink',
    },
    {
      icon: <Shield className="text-blue-400" size={24} />,
      category: 'MOBILE · AI · SAFETY TECH',
      title: "Safe Yatra - Women's Safety App",
      description:
        'Mobile app with 100% route tracking and voice-triggered emergency alerts. Integrated TensorFlow.js for voice emotion recognition with 70% distress detection accuracy. Won 1st Prize at SIES GST Innovations 2025.',
      tags: ['TensorFlow.js', 'Python', 'React Native', 'NLP', 'Voice AI'],
      githubUrl: 'https://github.com/pranavthakwani/safe-yatra',
      color: 'blue',
    },
    {
      icon: <Brain className="text-purple-400" size={24} />,
      category: 'AI · GRAPHRAG · FULL STACK',
      title: 'OrgMind - Company Intelligence Assistant',
      description:
        "Hybrid GraphRAG system combining Neo4j knowledge graph traversal with Pinecone vector search. Answers org questions standard RAG can't - like 'Who owns this project and what have they written about security?' Built with FastAPI, React, and GPT-4o.",
      tags: ['Neo4j', 'Pinecone', 'GPT-4o', 'FastAPI', 'React', 'LangChain', 'GraphRAG'],
      githubUrl: 'https://github.com/pranavthakwani/orgmind',
      liveUrl: 'https://orgmind.demo',
      color: 'purple',
    },
    {
      icon: <Sparkles className="text-yellow-400" size={24} />,
      category: 'FULL STACK · NLP · GENAI',
      title: 'Gita-GPT',
      description:
        'Web app that suggests Bhagavad Gita verses based on user emotion. Integrated Huue AI for empathetic chatbot support, boosted engagement by 40%. Won 1st Prize at Cognition Technical Fest 2023.',
      tags: ['TypeScript', 'Huue AI', 'LangChain', 'NLP', 'Next.js'],
      color: 'yellow',
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { border: string; text: string; bg: string }> = {
      pink: {
        border: 'border-pink-500',
        text: 'text-pink-500',
        bg: 'bg-pink-500/10',
      },
      blue: {
        border: 'border-blue-400',
        text: 'text-blue-400',
        bg: 'bg-blue-400/10',
      },
      purple: {
        border: 'border-purple-400',
        text: 'text-purple-400',
        bg: 'bg-purple-400/10',
      },
      yellow: {
        border: 'border-yellow-400',
        text: 'text-yellow-400',
        bg: 'bg-yellow-400/10',
      },
    };
    return colors[color] || colors.blue;
  };

  return (
    <CodeRenderer fileName="projects.js">
      <div className="max-w-6xl mx-auto">
        <Comment>// projects.js : things I've built & shipped</Comment>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-8 mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">Projects</h1>
          <p className="text-[#858585]">
            <span className="text-[#dcdcaa]">const</span>{' '}
            <span className="text-[#9cdcfe]">projects</span> ={' '}
            <span className="text-[#d4d4d4]">[</span>{' '}
            <span className="text-[#ce9178]">...shipped</span>
            <span className="text-[#d4d4d4]">,</span>{' '}
            <span className="text-[#ce9178]">...building</span>{' '}
            <span className="text-[#d4d4d4]">]</span>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((project, index) => {
            const colors = getColorClasses(project.color);
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`p-6 bg-[#252526] border ${colors.border} rounded-lg hover:bg-[#2a2a2a] transition-colors`}
              >
                <div className="mb-4">{project.icon}</div>

                <div className={`text-xs ${colors.text} font-bold mb-3 tracking-wider`}>
                  {project.category}
                </div>

                <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>

                <p className="text-[#d4d4d4] text-sm leading-relaxed mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className={`px-2 py-1 ${colors.bg} ${colors.text} text-xs rounded border ${colors.border}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-[#2d2d2d] hover:bg-[#3c3c3c] border border-[#3c3c3c] rounded text-sm text-[#d4d4d4] transition-colors"
                    >
                      <Github size={14} />
                      <span>GitHub</span>
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-1.5 px-3 py-1.5 ${colors.bg} hover:${colors.bg} border ${colors.border} rounded text-sm ${colors.text} transition-colors`}
                    >
                      <ExternalLink size={14} />
                      <span>Live</span>
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </CodeRenderer>
  );
}
