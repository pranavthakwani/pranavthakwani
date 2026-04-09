import { HomePage } from '@/components/pages/HomePage';
import { buildPortfolioMetadata } from '@/lib/portfolio';

export const metadata = buildPortfolioMetadata('home');

export default function Home() {
  return <HomePage />;
}
