import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle, MapPin, Percent, Receipt } from 'lucide-react';
import { siteImages } from '@/lib/site-images';
import {
  LINE_ITEM_PRICING,
  ONONDAGA_SALES_TAX,
  PLANNING_OPERATIONS_FEE,
  PRICING_COPY,
  tierStartingTotal,
  typicalWeddingSyracuseTotal,
} from '@/lib/pricing-math';
import { PACKAGE_DETAILS } from '@/lib/package-details';

function fmt(n: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(n);
}

const taxPct = Math.round(ONONDAGA_SALES_TAX * 100);
const feePct = Math.round(PLANNING_OPERATIONS_FEE * 100);

export default function PricingOverview() {
  const typical = typicalWeddingSyracuseTotal('signature');

  return (
    <>
      <section className="relative min-h-[72vh] flex items-end pt-28 pb-20 overflow-hidden">
        <Image
          src={siteImages.heroPricing}
          alt="Celebration lighting and guests at an evening event"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/75 to-navy-950/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-transparent to-navy-950/50" />
        <div className="relative z-10 container-max px-4 md:px-8 lg:px-16">
          <p className="text-gold-400 text-sm uppercase tracking-[0.2em] mb-4">
            Syracuse &amp; Onondaga County
          </p>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-white max-w-4xl leading-[1.05] mb-6">
            Pricing built for{' '}
            <span className="text-gold-gradient">CNY budgets</span>
          </h1>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl leading-relaxed mb-10">
            Transparent estimates with{' '}
            <strong className="text-white">{taxPct}%</strong> sales tax (Onondaga) and a{' '}
            <strong className="text-white">{feePct}%</strong> planning operations fee — before you
            talk to a single vendor.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="#calculator"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gold-500 text-navy-950 font-bold hover:bg-gold-400 transition-all shadow-lg shadow-gold-500/25"
            >
              Open live estimator <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/25 text-white font-semibold hover:bg-white/5 transition-all"
            >
              Talk to a planner
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-navy-900/50">
        <div className="container-max px-4 md:px-8 lg:px-16 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-xl gold-gradient flex items-center justify-center flex-shrink-0">
              <Percent className="w-6 h-6 text-navy-950" />
            </div>
            <div>
              <h3 className="text-white font-display font-bold text-lg mb-1">{taxPct}% tax line</h3>
              <p className="text-white/50 text-sm leading-relaxed">{PRICING_COPY.taxDetail}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
              <Receipt className="w-6 h-6 text-gold-400" />
            </div>
            <div>
              <h3 className="text-white font-display font-bold text-lg mb-1">{feePct}% ops fee</h3>
              <p className="text-white/50 text-sm leading-relaxed">
                Covers coordination infrastructure — staffing, software, insurance certificates, and
                vendor payment runs.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-6 h-6 text-gold-400" />
            </div>
            <div>
              <h3 className="text-white font-display font-bold text-lg mb-1">Local venues</h3>
              <p className="text-white/50 text-sm leading-relaxed">
                {PRICING_COPY.venues.slice(0, 3).join(' · ')}
                <span className="text-white/35"> — and barns &amp; lake houses across the county.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-navy-950">
        <div className="container-max">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-gold-400 text-sm uppercase tracking-widest mb-3">Planning tiers</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              Packages that scale with your guest count
            </h2>
            <p className="text-white/50 text-lg">{PRICING_COPY.disclaimer}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            {PACKAGE_DETAILS.map((p) => {
              const fromTotal = tierStartingTotal(p.tier);
              const featured = p.tier === 'signature';
              return (
                <div
                  key={p.tier}
                  className={`relative rounded-3xl border p-8 flex flex-col ${
                    featured
                      ? 'border-gold-500/50 bg-gradient-to-b from-gold-500/10 to-white/[0.03] shadow-xl shadow-gold-500/10'
                      : 'border-white/10 bg-white/[0.03]'
                  }`}
                >
                  {featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gold-500 text-navy-950 text-xs font-bold uppercase tracking-wider">
                      Most booked
                    </div>
                  )}
                  <h3 className="font-display text-2xl font-bold text-white mb-1">{p.name}</h3>
                  <p className="text-white/45 text-sm mb-6">{p.tagline}</p>
                  <div className="mb-6">
                    <span className="text-white/40 text-sm uppercase tracking-wider">From</span>
                    <div className="font-display text-4xl font-bold text-gold-400">{fmt(fromTotal)}</div>
                    <p className="text-white/35 text-xs mt-1">
                      Wedding · 100 guests · venue + catering · tax &amp; {feePct}% fee included
                    </p>
                  </div>
                  <ul className="space-y-3 flex-1 mb-8">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-white/65">
                        <CheckCircle className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="#calculator"
                    className={`w-full text-center py-3 rounded-xl font-bold transition-all ${
                      featured
                        ? 'bg-gold-500 text-navy-950 hover:bg-gold-400'
                        : 'border border-white/20 text-white hover:bg-white/5'
                    }`}
                  >
                    Use this tier in estimator
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="glass-card-strong p-8 md:p-10 max-w-4xl mx-auto text-center">
            <p className="text-gold-400 text-sm uppercase tracking-widest mb-2">Typical Syracuse wedding</p>
            <p className="font-display text-3xl md:text-4xl font-bold text-white mb-3">
              Curated build · 130 guests · photo, décor &amp; entertainment
            </p>
            <p className="text-white/55 text-lg mb-2">
              <span className="text-gold-400 font-bold">{fmt(typical)}</span> in our{' '}
              <strong className="text-white">Signature</strong> tier — all-in with {taxPct}% Onondaga tax &
              ops fee.
            </p>
            <p className="text-white/40 text-sm max-w-2xl mx-auto">{PRICING_COPY.disclaimer}</p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-navy-900/30 border-t border-white/5">
        <div className="container-max">
          <div className="max-w-3xl mb-12">
            <p className="text-gold-400 text-sm uppercase tracking-widest mb-3">Line-item baselines</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              What goes into a Syracuse estimate
            </h2>
            <p className="text-white/50">
              Each toggle in the calculator maps to CNY-realistic vendor bundles. Per-guest costs scale for
              catering, security shuttles, and décor-heavy installs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(Object.keys(LINE_ITEM_PRICING) as (keyof typeof LINE_ITEM_PRICING)[]).map((key) => {
              const row = LINE_ITEM_PRICING[key];
              return (
                <div
                  key={key}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                >
                  <div>
                    <h4 className="text-white font-semibold capitalize mb-1">{key}</h4>
                    <p className="text-white/45 text-sm max-w-md">{row.label}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-gold-400 font-display font-bold text-lg">
                      {fmt(row.base)}
                      {row.perGuest > 0 && (
                        <span className="text-white/50 text-sm font-sans font-normal">
                          {' '}
                          + {fmt(row.perGuest)}/guest
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
