import './globals.css';

import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';

import { VSCodeLayout } from '@/components/layout/VSCodeLayout';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-editor',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pranavthakwani.dev';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Pranav Thakwani | Developer Portfolio',
  description:
    'A VS Code-inspired developer portfolio featuring interactive navigation, portfolio chat, analytics, and an admin dashboard.',
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: 'Pranav Thakwani | Developer Portfolio',
    description:
      'A VS Code-inspired developer portfolio featuring interactive navigation, portfolio chat, analytics, and an admin dashboard.',
    type: 'website',
    images: [{ url: '/favicon.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pranav Thakwani | Developer Portfolio',
    description:
      'A VS Code-inspired developer portfolio featuring interactive navigation, portfolio chat, analytics, and an admin dashboard.',
    images: ['/favicon.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <body className={`${jetbrainsMono.className} h-full bg-[#1e1e1e]`}>
        <VSCodeLayout>{children}</VSCodeLayout>
      </body>
    </html>
  );
}
