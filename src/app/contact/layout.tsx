import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo-metadata';

export const metadata: Metadata = pageMetadata({
  title: 'Contact Syracuse Event Planner',
  description:
    'Contact our Syracuse event planning team for weddings, corporate events, and galas. Fast replies, Onondaga County permits, and vendor-ready timelines.',
  path: '/contact',
  keywords: ['contact event planner Syracuse', 'Syracuse wedding consultation', 'CNY event planner phone'],
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
