import { ChatMessage } from './types';

interface ChatResponse {
  answer: string;
  keywords: string[];
}

const CHAT_RESPONSES: Record<string, ChatResponse> = {
  about: {
    answer: "Hi! I'm Pranav Thakwani, a software developer passionate about backend engineering, AI/Automation, and product management. I'm currently a Junior Software Developer at KORE Mobile, where I build scalable AI integrations and backend systems. I love creating intelligent and scalable solutions!",
    keywords: ['about', 'who', 'tell me', 'pranav', 'yourself'],
  },
  projects: {
    answer: "I've built several impactful projects:\n\n🤍 Little Angel Foundation - NGO website supporting underprivileged children\n📱 Safe Yatra - Women's safety app with AI-powered features\n🧠 OrgMind - Company intelligence assistant using GraphRAG\n🤖 Gita-GPT - Bhagavad Gita verse suggestion chatbot\n\nEach project combines my passion for technology with real-world impact!",
    keywords: ['project', 'built', 'work', 'portfolio', 'created'],
  },
  skills: {
    answer: "My tech stack includes:\n\n💻 Languages: Python (92%), Java (72%), JavaScript (70%), TypeScript (74%), SQL (88%)\n🤖 AI/Automation: LangChain (82%), LangGraph (70%), RAG Pipelines (85%), PyTorch (85%), TensorFlow (80%)\n⚙️ Backend: FastAPI (90%), Flask (82%), Django (76%)\n☁️ Tools: Git, Docker, AWS, Vector Databases\n\nI'm always learning and exploring new technologies!",
    keywords: ['skill', 'tech', 'stack', 'technology', 'know', 'language', 'framework'],
  },
  experience: {
    answer: "I'm currently working as a Junior Software Developer at KORE Mobile, where I build scalable backend systems and AI integrations. I've developed RAG pipelines, MLOps systems, and backend APIs that serve thousands of users. I'm passionate about creating intelligent systems that make a difference!",
    keywords: ['experience', 'work', 'job', 'career', 'kore mobile'],
  },
  contact: {
    answer: "I'd love to connect with you!\n\n📧 Email: pranavthakwani@gmail.com\n💼 LinkedIn: linkedin.com/in/pranavthakwani\n🐙 GitHub: github.com/pranavthakwani\n📝 Medium: medium.com/@pranavthakwani\n\nFeel free to reach out for collaborations, opportunities, or just to chat!",
    keywords: ['contact', 'reach', 'email', 'connect', 'get in touch', 'message'],
  },
  education: {
    answer: "I'm currently pursuing my Bachelor of Engineering in Computer Engineering from SIES Graduate School of Technology, University of Mumbai (2021-2025). My focus areas include Artificial Intelligence and Machine Learning. GPA: 9.28",
    keywords: ['education', 'study', 'university', 'degree', 'college', 'school'],
  },
  default: {
    answer: "I'm here to help! You can ask me about:\n\n• Pranav's background and experience\n• His projects and achievements\n• Technical skills and expertise\n• How to get in touch\n\nWhat would you like to know?",
    keywords: [],
  },
};

function findBestMatch(query: string): ChatResponse {
  const lowerQuery = query.toLowerCase();

  for (const [key, response] of Object.entries(CHAT_RESPONSES)) {
    if (key === 'default') continue;

    const hasMatch = response.keywords.some((keyword) =>
      lowerQuery.includes(keyword)
    );

    if (hasMatch) {
      return response;
    }
  }

  return CHAT_RESPONSES.default;
}

export function getChatResponse(userMessage: string): string {
  const response = findBestMatch(userMessage);
  return response.answer;
}

export function generateChatId(): string {
  return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
