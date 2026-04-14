import Link from 'next/link';
import { Star, Shield, Award, Heart, ArrowRight, CheckCircle } from 'lucide-react';

export const metadata = { title: 'About | Syracuse Event Planner' };

export default function AboutPage() {
  const team = [
    { name:'Alicia Monroe', role:'Founder & Lead Planner', bio:'12+ years in luxury event management. Former director at Marriott Syracuse Downtown.', initials:'AM' },
    { name:'Jordan Reyes', role:'Corporate Events Director', bio:'Large-scale corporate productions for Fortune 500 companies across CNY.', initials:'JR' },
    { name:'Priya Patel', role:'Wedding Specialist', bio:'Certified planner specializing in multicultural ceremonies. 4 languages.', initials:'PP' },
    { name:'Marcus Webb', role:'Vendor Relations', bio:'Manages our 50+ local CNY vendor network.', initials:'MW' },
  ];
  const faqs = [
    { q:'How far in advance should I book?', a:'Weddings: 12-18 months. Corporate/social: 3-6 months. Last-minute bookings accommodated when available.' },
    { q:'Do you handle Syracuse permits?', a:'Yes — Onondaga County and City of Syracuse permits, park permits, and insurance verification.' },
    { q:'What areas do you serve?', a:'All of CNY: Syracuse, Skaneateles, Cazenovia, Baldwinsville, Liverpool, Utica, and 30 miles beyond.' },
    { q:'Are you insured?', a:'$2M general liability. Certificates provided to venues. All vendors verified.' },
  ];
  return (
    <div className="pt-24">
      <section className="section-padding text-center bg-navy-950 relative overflow-hidden">
        <div className="absolute inset-0 hero-pattern" />
        <div className="relative z-10 container-max">
          <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-6">About Syracuse<br /><span className="text-gold-gradient">Event Planner</span></h1>
          <p className="text-white/50 text-xl">Born in Syracuse. Built for CNY.</p>
        </div>
      </section>
      <section className="section-padding bg-navy-950">
        <div className="container-max grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-display text-4xl font-bold text-white mb-6">CNY&apos;s Premier Event Partner</h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>Founded in 2012 by Alicia Monroe, we built Syracuse Event Planner on a simple belief: every person deserves a flawlessly executed event.</p>
              <p>Our deep roots in Syracuse mean unmatched local knowledge — from the best venues in Onondaga County to navigating city permits.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {([{i:Star,t:'Excellence',d:'Never settle for good enough.'},{i:Shield,t:'Reliability',d:'Licensed, insured, 12 years.'},{i:Heart,t:'Passion',d:'We love what we do.'},{i:Award,t:'Local Expertise',d:'Better venues, better results.'}] as const).map(({i:Icon,t,d}) => (
              <div key={t} className="glass-card p-6"><Icon className="w-8 h-8 text-gold-400 mb-3" /><h3 className="text-white font-bold mb-2">{t}</h3><p className="text-white/50 text-sm">{d}</p></div>
            ))}
          </div>
        </div>
      </section>
      <section id="team" className="section-padding bg-navy-900">
        <div className="container-max">
          <div className="text-center mb-12"><h2 className="font-display text-4xl font-bold text-white">Meet the Team</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map(({ name, role, bio, initials }) => (
              <div key={name} className="glass-card p-6 text-center">
                <div className="w-20 h-20 rounded-full gold-gradient flex items-center justify-center text-navy-950 font-bold text-2xl mx-auto mb-4">{initials}</div>
                <h3 className="text-white font-bold mb-1">{name}</h3>
                <p className="text-gold-400 text-sm mb-3">{role}</p>
                <p className="text-white/50 text-sm">{bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="faq" className="section-padding bg-navy-950">
        <div className="container-max max-w-3xl">
          <div className="text-center mb-12"><h2 className="font-display text-4xl font-bold text-white">FAQ</h2></div>
          <div className="space-y-4">
            {faqs.map(({ q, a }) => (
              <div key={q} className="glass-card p-6">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5" />
                  <div><h3 className="text-white font-semibold mb-2">{q}</h3><p className="text-white/60 text-sm">{a}</p></div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gold-500 text-navy-950 font-bold hover:bg-gold-400 transition-all">Ask Us Anything <ArrowRight className="w-5 h-5" /></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
