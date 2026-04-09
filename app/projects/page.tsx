import { Metadata } from 'next';
import { ProjectsPage } from '@/components/pages/ProjectsPage';

export const metadata: Metadata = {
  title: 'Projects - Pranav Thakwani',
  description: 'Explore projects built by Pranav Thakwani, including AI applications, full-stack web apps, and social impact initiatives.',
};

export default function Projects() {
  return <ProjectsPage />;
}
