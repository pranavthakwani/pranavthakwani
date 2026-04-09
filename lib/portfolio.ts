import type { Metadata } from 'next';

import { FileItem, PortfolioContext } from '@/lib/types';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://pranavthakwani.dev';

const profile = {
  name: 'Pranav Thakwani',
  role: 'Backend Engineer + AI Automation Developer',
  company: 'KORE Mobile',
  location: 'Mumbai, India',
  bio: 'Product-minded backend engineer building developer tools, AI automation systems, and portfolio-grade user experiences that feel like software, not brochures.',
  contact: {
    email: 'pranavthakwani@gmail.com',
    github: 'github.com/pranavthakwani',
    linkedin: 'linkedin.com/in/pranavthakwani',
    medium: 'medium.com/@pranavthakwani',
  },
};

const projectSummaries = [
  {
    name: 'OrgMind',
    summary: 'GraphRAG company intelligence assistant with FastAPI, React, Pinecone, and Neo4j.',
  },
  {
    name: 'Safe Yatra',
    summary: "AI-assisted women's safety app with route tracking, voice triggers, and TensorFlow.js.",
  },
  {
    name: 'Little Angel Foundation',
    summary: 'Mission-driven NGO platform designed and shipped as a production website.',
  },
  {
    name: 'Gita-GPT',
    summary: 'Emotion-aware verse recommendation app combining NLP and conversational UX.',
  },
];

const skillList = [
  'TypeScript',
  'Next.js',
  'React',
  'Tailwind CSS',
  'FastAPI',
  'Python',
  'LangChain',
  'LangGraph',
  'PostgreSQL',
  'Supabase',
  'Docker',
  'OpenAI APIs',
];

const makeFile = (file: Omit<FileItem, 'keywords'> & { keywords?: string[] }): FileItem => ({
  ...file,
  keywords: file.keywords || [file.title, file.type, file.description],
});

export const PORTFOLIO_FILES: FileItem[] = [
  makeFile({
    id: 'home',
    name: 'home.tsx',
    route: '/',
    workspacePath: 'src/content/home.tsx',
    type: 'tsx',
    icon: '/assets/icons/react.svg',
    title: 'Home',
    description: 'Primary portfolio overview in a TypeScript React document.',
    seoTitle: `${profile.name} | Developer Portfolio`,
    seoDescription: `${profile.role} shipping backend systems, AI tooling, and intentional developer experiences.`,
    code: `import { Hero, Highlights, Availability } from "./portfolio-core";

const profile = {
  name: "${profile.name}",
  role: "${profile.role}",
  company: "${profile.company}",
  location: "${profile.location}",
};

const highlights = [
  "Backend architecture for AI-assisted products",
  "Production UI systems with design-level fidelity",
  "Developer workflows, analytics, and admin tooling",
];

export default function HomeWorkspace() {
  return (
    <Hero profile={profile}>
      <p>
        Product-minded engineer focused on backend APIs, automation systems,
        and software experiences that feel polished enough to ship.
      </p>

      <Highlights
        stats={{
          yearsBuilding: "1+",
          projectsShipped: "10+",
          currentFocus: "LLM tooling + fullstack product architecture",
        }}
        items={highlights}
      />

      <Availability
        value="Open to developer tooling, AI product, and platform roles."
      />
    </Hero>
  );
}`,
    keywords: ['about pranav', 'home', 'overview', 'role', 'availability'],
  }),
  makeFile({
    id: 'about',
    name: 'about.html',
    route: '/about',
    workspacePath: 'src/content/about.html',
    type: 'html',
    icon: '/assets/icons/html.svg',
    title: 'About',
    description: 'Background, education, and approach.',
    seoTitle: `About | ${profile.name}`,
    seoDescription: `Background, education, and current focus for ${profile.name}.`,
    code: `type BuilderProfile = {
  education: string;
  strengths: string[];
  philosophy: string[];
};

export const builder: BuilderProfile = {
  education: "B.E. Computer Engineering, SIES GST, University of Mumbai",
  strengths: [
    "Backend system design",
    "AI automation and RAG workflows",
    "Developer experience and UI systems",
  ],
  philosophy: [
    "Build software that earns trust through clarity and craft.",
    "Prefer systems that scale operationally, not just technically.",
    "Blend product thinking with implementation discipline.",
  ],
};

export const now = {
  role: "Junior Software Developer",
  company: "${profile.company}",
  focus: [
    "AI integrations for learning experiences",
    "Scalable APIs and internal tooling",
    "LLM workflows with structured analytics",
  ],
};`,
    keywords: ['background', 'education', 'philosophy', 'about'],
  }),
  makeFile({
    id: 'projects',
    name: 'projects.js',
    route: '/projects',
    workspacePath: 'src/content/projects.js',
    type: 'js',
    icon: '/assets/icons/javascript.svg',
    title: 'Projects',
    description: 'Selected builds and shipped outcomes.',
    seoTitle: `Projects | ${profile.name}`,
    seoDescription: `Selected AI, backend, and product projects built by ${profile.name}.`,
    code: `export const shippedProjects = [
  {
    name: "OrgMind",
    stack: ["FastAPI", "React", "Neo4j", "Pinecone", "GPT-4o"],
    summary:
      "GraphRAG assistant that connects vector search with company knowledge graphs.",
  },
  {
    name: "Safe Yatra",
    stack: ["React Native", "TensorFlow.js", "Python", "Maps"],
    summary:
      "Safety-focused mobile experience with AI-assisted distress detection.",
  },
  {
    name: "Little Angel Foundation",
    stack: ["React", "Node", "Cloudinary"],
    summary:
      "Production NGO platform created to support education and social impact work.",
  },
  {
    name: "Gita-GPT",
    stack: ["Next.js", "LangChain", "OpenAI"],
    summary:
      "Emotion-aware verse recommendation experience with conversational guidance.",
  },
];

export const approach = "Build for real users, measurable outcomes, and maintainable systems.";`,
    keywords: ['projects', 'portfolio builds', 'orgmind', 'safe yatra'],
  }),
  makeFile({
    id: 'skills',
    name: 'skills.json',
    route: '/skills',
    workspacePath: 'src/content/skills.json',
    type: 'json',
    icon: '/assets/icons/json.svg',
    title: 'Skills',
    description: 'Core stack and areas of focus.',
    seoTitle: `Skills | ${profile.name}`,
    seoDescription: `Technical stack and specialization areas for ${profile.name}.`,
    code: `{
  "languages": ["TypeScript", "Python", "JavaScript", "SQL", "Java"],
  "frontend": ["Next.js", "React", "Tailwind CSS", "UI systems"],
  "backend": ["FastAPI", "PostgreSQL", "Supabase", "REST APIs"],
  "ai": ["LangChain", "LangGraph", "RAG", "OpenAI APIs", "Prompt design"],
  "tooling": ["Git", "Docker", "Analytics pipelines", "Admin dashboards"],
  "currentFocus": ["developer tools", "LLM products", "production architecture"]
}`,
    keywords: ['skills', 'tech stack', 'languages', 'frameworks'],
  }),
  makeFile({
    id: 'experience',
    name: 'experience.ts',
    route: '/experience',
    workspacePath: 'src/content/experience.ts',
    type: 'ts',
    icon: '/assets/icons/ts.png',
    title: 'Experience',
    description: 'Work history and shipped responsibilities.',
    seoTitle: `Experience | ${profile.name}`,
    seoDescription: `Professional experience and responsibilities for ${profile.name}.`,
    code: `export const experience = [
  {
    company: "${profile.company}",
    role: "Junior Software Developer",
    period: "May 2024 -> Present",
    shipped: [
      "Backend APIs for AI-powered learning workflows",
      "RAG pipelines and model integration layers",
      "Operational tooling for reliability and delivery speed",
    ],
  },
  {
    company: "Independent + freelance builds",
    role: "Fullstack / AI product developer",
    period: "2022 -> Present",
    shipped: [
      "Mission-led websites and social impact products",
      "AI-assisted mobile and web applications",
      "End-to-end product implementation from design through deployment",
    ],
  },
];

export const principle = "Ownership means shipping the interface, the system, and the observability around it.";`,
    keywords: ['experience', 'work history', 'kore mobile', 'career'],
  }),
  makeFile({
    id: 'contact',
    name: 'contact.css',
    route: '/contact',
    workspacePath: 'src/content/contact.css',
    type: 'css',
    icon: '/assets/icons/css.svg',
    title: 'Contact',
    description: 'Contact details and preferred collaboration channels.',
    seoTitle: `Contact | ${profile.name}`,
    seoDescription: `Get in touch with ${profile.name} for collaboration and opportunities.`,
    code: `:root {
  --email: "${profile.contact.email}";
  --github: "${profile.contact.github}";
  --linkedin: "${profile.contact.linkedin}";
  --medium: "${profile.contact.medium}";
}

.availability {
  status: "replying-to-opportunities";
  preferred-topics: "developer tooling, backend systems, AI product work";
}

.note::after {
  content: "The fastest route is email, but thoughtful messages anywhere are welcome.";
}`,
    keywords: ['contact', 'email', 'github', 'linkedin'],
  }),
];

export const CHAT_SUGGESTIONS = [
  'Tell me about Pranav',
  'Which projects stand out most?',
  'What is his current stack?',
  'How can I contact him?',
];

export const PORTFOLIO_CONTEXT: PortfolioContext = {
  bio: profile.bio,
  skills: skillList,
  projects: projectSummaries,
  contacts: [
    { label: 'email', value: profile.contact.email },
    { label: 'github', value: profile.contact.github },
    { label: 'linkedin', value: profile.contact.linkedin },
    { label: 'medium', value: profile.contact.medium },
  ],
};

export const CHAT_KNOWLEDGE = {
  about: `${profile.name} is a ${profile.role} at ${profile.company} in ${profile.location}. ${profile.bio}`,
  projects: projectSummaries
    .map((project) => `${project.name}: ${project.summary}`)
    .join(' '),
  skills: `Primary stack: ${skillList.join(', ')}.`,
  contact: `Email ${profile.contact.email}, GitHub ${profile.contact.github}, LinkedIn ${profile.contact.linkedin}, Medium ${profile.contact.medium}.`,
};

export function getPortfolioFileByRoute(route: string): FileItem {
  return PORTFOLIO_FILES.find((file) => file.route === route) || PORTFOLIO_FILES[0];
}

export function getPortfolioFileById(id: string): FileItem {
  return PORTFOLIO_FILES.find((file) => file.id === id) || PORTFOLIO_FILES[0];
}

export function buildPortfolioMetadata(fileId: string): Metadata {
  const file = getPortfolioFileById(fileId);

  return {
    title: file.seoTitle,
    description: file.seoDescription,
    keywords: [...file.keywords, profile.name, profile.role],
    alternates: {
      canonical: file.route === '/' ? SITE_URL : `${SITE_URL}${file.route}`,
    },
    openGraph: {
      title: file.seoTitle,
      description: file.seoDescription,
      url: file.route === '/' ? SITE_URL : `${SITE_URL}${file.route}`,
      siteName: `${profile.name} Portfolio`,
      type: 'website',
      images: [
        {
          url: `${SITE_URL}/favicon.png`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: file.seoTitle,
      description: file.seoDescription,
      images: [`${SITE_URL}/favicon.png`],
    },
  };
}

export function getPortfolioRoutes() {
  return PORTFOLIO_FILES.map((file) => file.route);
}
