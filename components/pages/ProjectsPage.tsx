'use client';

import { CodeRenderer, Comment } from '../editor/CodeRenderer';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Heart, Shield, Brain, Sparkles } from 'lucide-react';

export function ProjectsPage() {
  const projects = [
    {
      icon: <Brain className="text-blue-400" size={24} />,
      category: 'AUTOMATION · SALES OPERATIONS',
      title: 'LeadOps Automation System',
      description: 'Multilingual inbound lead intake, classification, and instant response automation for sales operations. Ingests unstructured messages, classifies lead types, extracts data, auto-responds, and routes qualified leads to correct pipelines.',
      tags: ['JavaScript', 'n8n', 'Automation', 'Lead Processing'],
      duration: 'Dec 2025 – Present',
      color: 'blue',
      githubUrl: undefined,
      liveUrl: undefined,
    },
    {
      icon: <Brain className="text-green-400" size={24} />,
      category: 'DATAOPS · AUTOMATION',
      title: 'DataOps Automation System',
      description: 'Zero-touch DataOps pipeline that ingests Excel files via chat, validates/cleans data, isolates exceptions, and uploads to internal systems. Runs scheduled cron jobs for automated data processing from source portals.',
      tags: ['JavaScript', 'Backend Operations', 'File Processing', 'APIs'],
      duration: 'Sep 2025 – Nov 2025',
      color: 'green',
      githubUrl: undefined,
      liveUrl: undefined,
    },
    {
      icon: <Brain className="text-purple-400" size={24} />,
      category: 'AI · RAG · LLM',
      title: 'RAG Setup Qwen 2.5 14B',
      description: 'Built for Kore Mobile general purpose queries using Qwen2.5 14B Instruct model. Supports PDF ingestion, multilingual text queries (Hindi/English/Hinglish), real-time streaming with 4096 token context window.',
      tags: ['RAG', 'LLMOps', 'Qwen2.5', 'PDF Processing'],
      duration: 'Oct 2025 – Oct 2025',
      color: 'purple',
      githubUrl: undefined,
      liveUrl: undefined,
    },
    {
      icon: <Brain className="text-yellow-400" size={24} />,
      category: 'ECOMMERCE · DATA INTELLIGENCE',
      title: 'Product Catalog Intelligence System',
      description: 'Automated system to collect, normalize, and analyze product data across e-commerce platforms. Built scalable crawling architecture with job queues, distributed workers, and caching for competitive intelligence.',
      tags: ['Playwright', 'JavaScript', 'Web Crawling', 'Data Processing'],
      duration: 'Sep 2025 – Sep 2025',
      color: 'yellow',
      githubUrl: undefined,
      liveUrl: undefined,
    },
    {
      icon: <Shield className="text-red-400" size={24} />,
      category: 'AI · COMPUTER VISION · MOBILE',
      title: 'Plant Disease Detection System',
      description: 'Real-time plant disease detection using CNN-based image classification and bounding box localization. React Native frontend with Flask backend, optimized for mobile deployment with camera integration.',
      tags: ['CNN', 'React Native', 'Flask', 'Computer Vision'],
      duration: 'Jan 2025 – May 2025',
      color: 'red',
      githubUrl: undefined,
      liveUrl: undefined,
    },
    {
      icon: <Sparkles className="text-orange-400" size={24} />,
      category: 'COMMUNICATION · VOIP · REAL-TIME',
      title: 'Instant messaging application with VoIP',
      description: 'Cross-platform real-time communication system with Flutter frontend, Node.js backend, and MongoDB. Supports messaging, voice, and video using WebRTC, WebSocket, and Socket.io protocols.',
      tags: ['Flutter', 'Node.js', 'WebRTC', 'MongoDB'],
      duration: 'Jan 2024 – Dec 2024',
      color: 'orange',
      githubUrl: undefined,
      liveUrl: undefined,
    },
    {
      icon: <Shield className="text-pink-400" size={24} />,
      category: 'MACHINE LEARNING · SECURITY',
      title: 'Phishing URL Classification System',
      description: 'Phishing URL classifier using PhiUSIIL Dataset with 134,850 legitimate and 100,945 phishing URLs. Features extracted from webpage source code and URL analysis for real-time threat detection.',
      tags: ['Machine Learning', 'Security', 'Data Analysis', 'Classification'],
      duration: 'Jul 2024 – Dec 2024',
      color: 'pink',
      githubUrl: undefined,
      liveUrl: undefined,
    },
    {
      icon: <Sparkles className="text-indigo-400" size={24} />,
      category: 'MOBILE · ANDROID · NOTIFICATIONS',
      title: 'Service Reminder System',
      description: 'Android app for service reminders using Java and Firebase. Enables users to schedule/manage appliance service reminders with timely notifications and integrated payment gateway for hassle-free bookings.',
      tags: ['Java', 'Android', 'Firebase', 'Payment Gateway'],
      duration: 'Feb 2024 – Dec 2024',
      color: 'indigo',
      githubUrl: undefined,
      liveUrl: undefined,
    },
    {
      icon: <Brain className="text-teal-400" size={24} />,
      category: 'WEB · CONSTRUCTION · MERN',
      title: 'VK Constructions',
      description: 'MERN stack web application for construction project management. Features project updates, task management, real-time communication, and client interaction tracking for efficient project execution.',
      tags: ['MongoDB', 'Express.js', 'React.js', 'Node.js'],
      duration: 'Feb 2024 – Nov 2024',
      color: 'teal',
      githubUrl: undefined,
      liveUrl: undefined,
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
      green: {
        border: 'border-green-400',
        text: 'text-green-400',
        bg: 'bg-green-400/10',
      },
      red: {
        border: 'border-red-400',
        text: 'text-red-400',
        bg: 'bg-red-400/10',
      },
      orange: {
        border: 'border-orange-400',
        text: 'text-orange-400',
        bg: 'bg-orange-400/10',
      },
      indigo: {
        border: 'border-indigo-400',
        text: 'text-indigo-400',
        bg: 'bg-indigo-400/10',
      },
      teal: {
        border: 'border-teal-400',
        text: 'text-teal-400',
        bg: 'bg-teal-400/10',
      },
    };
    return colors[color] || colors.blue;
  };

  return (
    <CodeRenderer fileName="projects.js">
      <div className="max-w-6xl mx-auto">
        <Comment>{"// projects.js : things I&apos;ve built & shipped"}</Comment>

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
