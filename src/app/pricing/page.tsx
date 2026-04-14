import type { Metadata } from 'next';
import PricingOverview from '@/components/pricing/PricingOverview';
import QuoteCalculator from '@/components/pricing/QuoteCalculator';
import { pageMetadata } from '@/lib/seo-metadata';

export const metadata: Metadata = pageMetadata({
  title: 'Syracuse Event Pricing & Custom Quotes',
  description:
    'See Syracuse and Onondaga County event pricing: 8% tax, planning packages, and a live calculator for weddings, corporate events, and galas. Budget-ready estimates for CNY venues.',
  path: '/pricing',
  keywords: [
    'Syracuse wedding cost',
    'event pricing Syracuse NY',
    'Onondaga County wedding budget',
    'corporate event pricing CNY',
  ],
});

export default function PricingPage() {
  return (
    <>
      <PricingOverview />
      <div id="calculator" className="scroll-mt-24">
        <QuoteCalculator />
      </div>
    </>
  );
}
