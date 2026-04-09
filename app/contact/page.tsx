import { ContactPage as ContactContent } from '@/components/pages/ContactPage';
import { buildPortfolioMetadata } from '@/lib/portfolio';

export const metadata = buildPortfolioMetadata('contact');

export default function ContactRoute() {
  return <ContactContent />;
}
