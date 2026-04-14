import type { Metadata } from 'next';
import PricingOverview from '@/components/pricing/PricingOverview';
import QuoteCalculator from '@/components/pricing/QuoteCalculator';

export const metadata: Metadata = {
  title: 'Pricing & Quotes | Syracuse Event Planner',
  description:
    'Syracuse and Onondaga County event pricing with 8% tax, transparent packages, and a live calculator for weddings, corporate events, and galas.',
};

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
