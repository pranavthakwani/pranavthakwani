import { AboutPage as AboutContent } from '@/components/pages/AboutPage';
import { buildPortfolioMetadata } from '@/lib/portfolio';

export const metadata = buildPortfolioMetadata('about');

export default function AboutRoute() {
  return <AboutContent />;
}
