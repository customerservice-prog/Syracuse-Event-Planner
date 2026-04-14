'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-navy-950 overflow-hidden pt-24 pb-16">
      <div className="absolute inset-0 hero-pattern" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 container-max px-4 md:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gold-400 text-sm mb-8">
            <Sparkles className="w-4 h-4" />
            Syracuse &amp; Onondaga County
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
            Events that feel{' '}
            <span className="text-gold-gradient">effortless</span>
          </h1>
          <p className="text-white/60 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl">
            Full-service planning for weddings, corporate gatherings, and galas — with local vendors,
            transparent pricing, and day-of coordination you can trust.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gold-500 text-navy-950 font-bold hover:bg-gold-400 transition-all"
            >
              Build your quote <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white font-semibold hover:bg-white/5 transition-all"
            >
              Explore services
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
