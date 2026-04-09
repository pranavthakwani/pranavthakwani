import { CHAT_KNOWLEDGE, PORTFOLIO_CONTEXT } from '@/lib/portfolio';

const STATIC_RESPONSES: Array<{
  topic: 'about' | 'projects' | 'skills' | 'contact';
  keywords: string[];
}> = [
  {
    topic: 'about',
    keywords: ['about', 'who', 'background', 'pranav'],
  },
  {
    topic: 'projects',
    keywords: ['project', 'built', 'case study', 'portfolio'],
  },
  {
    topic: 'skills',
    keywords: ['skills', 'stack', 'tech', 'tools'],
  },
  {
    topic: 'contact',
    keywords: ['contact', 'email', 'linkedin', 'github', 'reach'],
  },
];

export function generateChatId() {
  return `msg_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

export function getChatContext() {
  return PORTFOLIO_CONTEXT;
}

export function getStaticChatResponse(input: string) {
  const normalized = input.toLowerCase();
  const match = STATIC_RESPONSES.find((response) =>
    response.keywords.some((keyword) => normalized.includes(keyword))
  );

  if (!match) {
    return [
      'I can help with Pranav’s background, projects, stack, and contact details.',
      'Try asking about his projects, skills, or how to reach him.',
    ].join(' ');
  }

  return CHAT_KNOWLEDGE[match.topic];
}
