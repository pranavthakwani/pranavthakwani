import { SkillsPage as SkillsContent } from '@/components/pages/SkillsPage';
import { buildPortfolioMetadata } from '@/lib/portfolio';

export const metadata = buildPortfolioMetadata('skills');

export default function SkillsRoute() {
  return <SkillsContent />;
}
