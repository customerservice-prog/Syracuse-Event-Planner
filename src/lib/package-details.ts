import type { PackageTier } from '@/lib/pricing-math';

export const PACKAGE_DETAILS: {
  tier: PackageTier;
  name: string;
  tagline: string;
  features: string[];
}[] = [
  {
    tier: 'essential',
    name: 'Essential',
    tagline: 'Day-of excellence for Syracuse timelines',
    features: [
      'Day-of coordination & run-of-show',
      'Vendor communication & load-in schedule',
      'Timeline + contingency planning',
      'Onondaga permit checklist review',
    ],
  },
  {
    tier: 'signature',
    name: 'Signature',
    tagline: 'Most popular for CNY weddings & galas',
    features: [
      'Everything in Essential',
      'Full planning through rehearsal',
      'Preferred CNY vendor rates',
      'Guest portal & RSVP support',
    ],
  },
  {
    tier: 'premier',
    name: 'Premier',
    tagline: 'White-glove for Marriott / Oncenter-scale events',
    features: [
      'Everything in Signature',
      'Dedicated lead planner + assistant',
      'Unlimited consults & site visits',
      'City / county permit filing support',
    ],
  },
];
