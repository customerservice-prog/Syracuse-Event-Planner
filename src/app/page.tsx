import type { Metadata } from 'next';
import Hero from '@/components/home/Hero';
import SeoIntro from '@/components/home/SeoIntro';
import ServicesSection from '@/components/home/ServicesSection';
import Stats from '@/components/home/Stats';
import Testimonials from '@/components/home/Testimonials';
import CTASection from '@/components/home/CTASection';
import { pageMetadata } from '@/lib/seo-metadata';

export const metadata: Metadata = pageMetadata({
  title: 'Syracuse NY Wedding & Event Planning | Onondaga County',
  titleAbsolute:
    'Syracuse Event Planner | Weddings, Corporate & Galas in Onondaga County NY',
  description:
    'Syracuse event planner for weddings, corporate events, and galas. Serving Onondaga County & CNY: Marriott Syracuse, Oncenter, Skaneateles, Cazenovia. Live pricing, local vendors, day-of coordination.',
  path: '/',
  keywords: [
    'Syracuse wedding planner',
    'event planner Syracuse NY',
    'Onondaga County weddings',
    'CNY corporate events',
  ],
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <SeoIntro />
      <ServicesSection />
      <Stats />
      <Testimonials />
      <CTASection />
    </>
  );
}
