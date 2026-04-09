import { Metadata } from 'next';
import { SkillsPage } from '@/components/pages/SkillsPage';

export const metadata: Metadata = {
  title: 'Skills - Pranav Thakwani',
  description: 'Technical skills and expertise of Pranav Thakwani in backend engineering, AI/Automation, product management, and software development.',
};

export default function Skills() {
  return <SkillsPage />;
}
