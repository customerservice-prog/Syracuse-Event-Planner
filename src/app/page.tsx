import Hero from '@/components/home/Hero';
import ServicesSection from '@/components/home/ServicesSection';
import Stats from '@/components/home/Stats';
import Testimonials from '@/components/home/Testimonials';
import CTASection from '@/components/home/CTASection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <Stats />
      <Testimonials />
      <CTASection />
    </>
  );
}
