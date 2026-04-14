import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar } from 'lucide-react';
import { siteImages } from '@/lib/site-images';

export default function CTASection() {
  return (
    <section className="relative section-padding overflow-hidden min-h-[380px]">
      <Image
        src={siteImages.ctaBand}
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-navy-950/88" />
      <div className="absolute inset-0 bg-gradient-to-r from-gold-500/10 via-transparent to-blue-500/10" />
      <div className="relative z-10 container-max">
        <div className="glass-card-strong p-10 md:p-14 flex flex-col lg:flex-row items-center justify-between gap-10 max-w-5xl mx-auto border-gold-500/25">
          <div className="flex items-start gap-5">
            <div className="w-14 h-14 rounded-2xl gold-gradient flex items-center justify-center flex-shrink-0 shadow-lg shadow-gold-500/20">
              <Calendar className="w-7 h-7 text-navy-950" />
            </div>
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">
                Ready to set a date?
              </h2>
              <p className="text-white/55 text-lg max-w-xl leading-relaxed">
                Get a line-item estimate with <strong className="text-white">Onondaga County tax</strong>{' '}
                included — then we refine with your venue and season.
              </p>
            </div>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gold-500 text-navy-950 font-bold hover:bg-gold-400 transition-all whitespace-nowrap shadow-lg shadow-gold-500/25"
          >
            Talk to a planner <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
