import { Metadata } from 'next';
import { ContactPage } from '@/components/pages/ContactPage';

export const metadata: Metadata = {
  title: 'Contact - Pranav Thakwani',
  description: 'Get in touch with Pranav Thakwani for collaboration opportunities, project inquiries, or networking.',
};

export default function Contact() {
  return <ContactPage />;
}
