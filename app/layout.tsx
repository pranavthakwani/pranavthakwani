import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { VSCodeLayout } from '@/components/layout/VSCodeLayout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Pranav Thakwani - Backend Engineer, AI/Automation Developer, Product Enthusiast',
  description: 'Software developer specializing in backend engineering, AI/Automation, and product management. Building intelligent and scalable systems at KORE Mobile.',
  keywords: [
    'Pranav Thakwani',
    'Software Developer',
    'Backend Engineer',
    'AI/Automation Developer',
    'Product Enthusiast',
    'LangChain',
    'RAG',
    'Python',
    'FastAPI',
    'KORE Mobile',
  ],
  authors: [{ name: 'Pranav Thakwani' }],
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: 'Pranav Thakwani - Portfolio',
    description: 'Backend Engineer, AI/Automation Developer, Product Enthusiast',
    type: 'website',
    images: [
      {
        url: 'https://bolt.new/static/og_default.png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pranav Thakwani - Portfolio',
    description: 'Backend Engineer, AI/Automation Developer, Product Enthusiast',
    images: [
      {
        url: 'https://bolt.new/static/og_default.png',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <VSCodeLayout>{children}</VSCodeLayout>
      </body>
    </html>
  );
}
