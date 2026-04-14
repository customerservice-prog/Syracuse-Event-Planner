import type { Metadata } from 'next';
import QuoteCalculator from '@/components/pricing/QuoteCalculator';

export const metadata: Metadata = {
  title: 'Get a Quote | Syracuse Event Planner',
  description: 'Instant pricing for your Syracuse event. Weddings, corporate, social - get your custom quote in minutes.',
};

export default function PricingPage() {
  return <QuoteCalculator />;
}
