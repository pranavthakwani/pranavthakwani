'use client';

import { CodeRenderer, Comment } from '../editor/CodeRenderer';
import { motion } from 'framer-motion';
import { Briefcase, Calendar } from 'lucide-react';

export function ExperiencePage() {
  const experiences = [
    {
      company: 'KORE Mobile',
      role: 'Jr. SDE',
      type: 'Full-time',
      duration: 'Jul 2025 - Present · 10 mos',
      location: 'Ahmedabad, Gujarat, India · On-site',
      achievements: [
        'Building scalable backend systems and AI integrations',
        'Developing mobile applications and web solutions',
        'Working on product development and feature implementation',
      ],
      tags: ['Backend Development', 'Mobile Apps', 'AI Integration'],
      color: 'blue',
    },
    {
      company: 'RedSand Technology',
      role: 'SDE Intern',
      type: 'Full-time',
      duration: 'Feb 2025 - May 2025 · 4 mos',
      location: 'Dubai, United Arab Emirates · Remote',
      achievements: [
        'Developed software solutions for client projects',
        'Worked on full-stack development tasks',
        'Collaborated with cross-functional teams',
      ],
      tags: ['Full Stack', 'Web Development', 'Remote Collaboration'],
      color: 'green',
    },
    {
      company: 'CE Marwadi University',
      role: 'Research Intern',
      type: 'Internship',
      duration: 'May 2024 - Jul 2024 · 3 mos',
      location: 'Rajkot, Gujarat, India',
      achievements: [
        'Conducted research on emerging technologies',
        'Assisted in academic research projects',
        'Contributed to technical documentation and analysis',
      ],
      tags: ['Research', 'Academic Projects', 'Technical Analysis'],
      color: 'purple',
    },
    {
      company: 'BasketHunt Pvt Ltd',
      role: 'Web Dev Intern',
      type: 'Internship',
      duration: 'Jul 2023 - Sep 2023 · 3 mos',
      location: 'Gurugram, Haryana, India · Remote',
      achievements: [
        'Developed and maintained web applications',
        'Worked on frontend and backend development',
        'Implemented responsive design and user interfaces',
      ],
      tags: ['Web Development', 'Frontend', 'Backend'],
      color: 'yellow',
    },
    {
      company: 'Internshala',
      role: 'Campus Ambassador',
      type: 'Part-time',
      duration: 'Jun 2023 - Aug 2023 · 3 mos',
      location: 'Gurugram, Haryana, India · Remote',
      achievements: [
        'Promoted Internshala services on campus',
        'Organized events and awareness campaigns',
        'Built relationships with student community',
      ],
      tags: ['Marketing', 'Community Building', 'Events'],
      color: 'orange',
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
      orange: {
        border: 'border-orange-400',
        text: 'text-orange-400',
        bg: 'bg-orange-400/10',
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
