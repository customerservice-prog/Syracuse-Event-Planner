'use client';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { siteImages } from '@/lib/site-images';

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden pt-24 pb-20">
      <Image
        src={siteImages.heroHome}
        alt="Elegant event tablescape with florals and candlelight"
        fill
        priority
        className="object-cover scale-105"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-950/55" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-navy-950/40" />
      <div className="absolute top-1/4 right-1/4 w-[min(90vw,28rem)] h-[min(90vw,28rem)] bg-gold-500/15 rounded-full blur-3xl" />

      <div className="relative z-10 container-max px-4 md:px-8 lg:px-16 w-full">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/30 backdrop-blur-md border border-white/15 text-gold-400 text-sm mb-8">
            <Sparkles className="w-4 h-4" />
            Syracuse · Onondaga County · CNY
          </div>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] mb-6 drop-shadow-lg">
            Events that feel{' '}
            <span className="text-gold-gradient">effortless</span>
          </h1>
          <p className="text-white/75 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl text-pretty">
            Full-service planning for weddings, corporate gatherings, and galas — with transparent
            Syracuse-area pricing, local vendors, and day-of coordination you can trust.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gold-500 text-navy-950 font-bold hover:bg-gold-400 transition-all shadow-xl shadow-gold-500/25"
            >
              Build your quote <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/25 text-white font-semibold hover:bg-white/10 backdrop-blur-sm transition-all"
            >
              Explore services
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
