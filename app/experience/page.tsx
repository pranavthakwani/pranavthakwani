import { ExperiencePage as ExperienceContent } from '@/components/pages/ExperiencePage';
import { buildPortfolioMetadata } from '@/lib/portfolio';

export const metadata = buildPortfolioMetadata('experience');

export default function ExperienceRoute() {
  return <ExperienceContent />;
}
