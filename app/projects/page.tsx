import { ProjectsPage as ProjectsContent } from '@/components/pages/ProjectsPage';
import { buildPortfolioMetadata } from '@/lib/portfolio';

export const metadata = buildPortfolioMetadata('projects');

export default function ProjectsRoute() {
  return <ProjectsContent />;
}
