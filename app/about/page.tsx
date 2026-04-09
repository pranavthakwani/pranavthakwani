import { Metadata } from 'next';
import { AboutPage } from '@/components/pages/AboutPage';

export const metadata: Metadata = {
  title: 'About - Pranav Thakwani',
  description: 'Learn more about Pranav Thakwani, a software developer specializing in backend engineering, AI/Automation, and product management.',
};

export default function About() {
  return <AboutPage />;
}
