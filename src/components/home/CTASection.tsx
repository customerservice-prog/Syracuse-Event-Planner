import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="section-padding bg-navy-950 relative overflow-hidden">
      <div className="absolute inset-0 hero-pattern opacity-80" />
      <div className="relative z-10 container-max">
        <div className="glass-card p-10 md:p-14 flex flex-col lg:flex-row items-center justify-between gap-10 border-gold-500/20">
          <div className="flex items-start gap-5">
            <div className="w-14 h-14 rounded-2xl gold-gradient flex items-center justify-center flex-shrink-0">
              <Calendar className="w-7 h-7 text-navy-950" />
            </div>
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">
                Ready to set a date?
              </h2>
              <p className="text-white/50 text-lg max-w-xl">
                Tell us your guest count and services — we&apos;ll return a line-item estimate with Onondaga County tax
                included.
              </p>
            </div>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gold-500 text-navy-950 font-bold hover:bg-gold-400 transition-all whitespace-nowrap"
          >
            Talk to a planner <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
