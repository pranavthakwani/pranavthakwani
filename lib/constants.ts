import { FileItem } from './types';

export const FILES: FileItem[] = [
  {
    id: 'home',
    name: 'home.tsx',
    path: '/',
    type: 'tsx',
    icon: '/assets/icons/react.svg',
  },
  {
    id: 'about',
    name: 'about.html',
    path: '/about',
    type: 'html',
    icon: '/assets/icons/html.svg',
  },
  {
    id: 'projects',
    name: 'projects.js',
    path: '/projects',
    type: 'js',
    icon: '/assets/icons/javascript.svg',
  },
  {
    id: 'skills',
    name: 'skills.json',
    path: '/skills',
    type: 'json',
    icon: '/assets/icons/json.svg',
  },
  {
    id: 'experience',
    name: 'experience.ts',
    path: '/experience',
    type: 'ts',
    icon: '/assets/icons/ts.png',
  },
  {
    id: 'contact',
    name: 'contact.css',
    path: '/contact',
    type: 'css',
    icon: '/assets/icons/css.svg',
  },
];

export const CHAT_PROMPTS = [
  "Tell me about Pranav?",
  "What projects has Pranav built?",
  "Tell me about his work experience",
  "What's his tech stack?",
  "How can I contact Pranav?",
  "How can I support Pranav?",
];

export const VS_CODE_THEME = {
  background: '#1e1e1e',
  sidebarBg: '#252526',
  tabsBg: '#2d2d2d',
  statusBarBg: '#007acc',
  editorBg: '#1e1e1e',
  textPrimary: '#d4d4d4',
  textSecondary: '#858585',
  accentBlue: '#007acc',
  accentGreen: '#4ec9b0',
  accentOrange: '#ce9178',
  accentPurple: '#c586c0',
  accentYellow: '#dcdcaa',
  borderColor: '#3c3c3c',
};
