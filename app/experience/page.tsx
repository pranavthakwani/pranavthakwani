import { Metadata } from 'next';
import { ExperiencePage } from '@/components/pages/ExperiencePage';

export const metadata: Metadata = {
  title: 'Experience - Pranav Thakwani',
  description: 'Work experience and professional journey of Pranav Thakwani, including roles at KORE Mobile and freelance projects.',
};

export default function Experience() {
  return <ExperiencePage />;
}
