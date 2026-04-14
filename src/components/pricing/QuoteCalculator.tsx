'use client';
import { useEffect } from 'react';
import Image from 'next/image';
import { useQuoteStore, EventType } from '@/store/quoteStore';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { PACKAGE_DETAILS } from '@/lib/package-details';
import {
  PRICING_COPY,
  ONONDAGA_SALES_TAX,
  PLANNING_OPERATIONS_FEE,
} from '@/lib/pricing-math';
import { siteImages } from '@/lib/site-images';
import {
  Heart,
  Briefcase,
  PartyPopper,
  GraduationCap,
  Users,
  Sparkles,
  Home,
  Utensils,
  Camera,
  Video,
  Palette,
  Music,
  Shield,
  Car,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Star,
} from 'lucide-react';

function fmt(n: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(n);
}

const eventTypes: { value: EventType; label: string; icon: React.ElementType }[] = [
  { value: 'wedding', label: 'Wedding', icon: Heart },
  { value: 'corporate', label: 'Corporate', icon: Briefcase },
  { value: 'birthday', label: 'Birthday', icon: PartyPopper },
  { value: 'social', label: 'Social', icon: Users },
  { value: 'graduation', label: 'Graduation', icon: GraduationCap },
  { value: 'other', label: 'Other', icon: Sparkles },
];

const serviceOpts = [
  { key: 'venue', label: 'Venue', icon: Home },
  { key: 'catering', label: 'Catering', icon: Utensils },
  { key: 'photography', label: 'Photography', icon: Camera },
  { key: 'videography', label: 'Videography', icon: Video },
  { key: 'decor', label: 'Decor', icon: Palette },
  { key: 'entertainment', label: 'Entertainment', icon: Music },
  { key: 'security', label: 'Security', icon: Shield },
  { key: 'transportation', label: 'Transport', icon: Car },
] as const;

const taxPct = Math.round(ONONDAGA_SALES_TAX * 100);
const feePct = Math.round(PLANNING_OPERATIONS_FEE * 100);

export default function QuoteCalculator() {
  const s = useQuoteStore();

  useEffect(() => {
    useQuoteStore.getState().calculateQuote();
  }, []);

  const handleSubmit = async () => {
    if (!s.contactName || !s.contactEmail) {
      toast.error('Please fill your name and email.');
      return;
    }
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventType: s.eventType,
          guestCount: s.guestCount,
          services: s.services,
          selectedPackage: s.selectedPackage,
          subtotal: s.subtotal,
          tax: s.tax,
          serviceFee: s.serviceFee,
          total: s.total,
          contactName: s.contactName,
          contactEmail: s.contactEmail,
        }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        toast.error(data.error ?? 'Could not submit quote.');
        return;
      }
      toast.success('Quote submitted!', { description: `Est. total: ${fmt(s.total)}` });
      s.reset();
    } catch {
      toast.error('Network error. Try again shortly.');
    }
  };

  const ic =
    'w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400/40';

  return (
    <section className="relative pb-24 pt-12 section-padding overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-gold-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/15 rounded-full blur-[100px]" />
      </div>

      <div className="container-max relative z-10">
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <p className="text-gold-400 font-medium text-sm uppercase tracking-[0.2em] mb-3">
            Live estimator
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Build your Syracuse-area quote
          </h2>
          <p className="text-white/50 text-lg">
            {PRICING_COPY.region}. {taxPct}% tax + {feePct}% ops fee roll into your total automatically.
          </p>
        </div>

        <div className="flex items-center justify-center gap-1 sm:gap-2 mb-12 flex-wrap">
          {['Event', 'Guests', 'Services', 'Package', 'Summary'].map((step, i) => (
            <div key={step} className="flex items-center gap-1 sm:gap-2">
              <div
                className={cn(
                  'w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all',
                  i + 1 < s.step
                    ? 'bg-gold-500 text-navy-950'
                    : i + 1 === s.step
                      ? 'bg-gold-500 text-navy-950 ring-4 ring-gold-500/35 scale-105'
                      : 'bg-white/10 text-white/40',
                )}
              >
                {i + 1 < s.step ? <CheckCircle className="w-4 h-4" /> : i + 1}
              </div>
              <span
                className={cn(
                  'hidden sm:inline text-xs font-medium mr-1',
                  i + 1 === s.step ? 'text-gold-400' : 'text-white/35',
                )}
              >
                {step}
              </span>
              {i < 4 && (
                <div
                  className={cn(
                    'w-6 sm:w-10 h-0.5 mx-1',
                    i + 1 < s.step ? 'bg-gold-500' : 'bg-white/10',
                  )}
                />
              )}
            </div>
          ))}
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 glass-card-strong p-6 sm:p-10 border-white/10">
            {s.step === 1 && (
              <div>
                <h3 className="font-display text-2xl font-bold text-white mb-2">What type of event?</h3>
                <p className="text-white/45 text-sm mb-8">
                  Multipliers reflect demand curves we see across {PRICING_COPY.region}.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {eventTypes.map(({ value, label, icon: Icon }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => s.setEventType(value)}
                      className={cn(
                        'p-5 rounded-2xl border text-left transition-all hover:scale-[1.02]',
                        s.eventType === value
                          ? 'border-gold-500 bg-gold-500/15 shadow-lg shadow-gold-500/10'
                          : 'border-white/10 bg-white/[0.04] hover:border-white/25',
                      )}
                    >
                      <Icon
                        className={cn(
                          'w-7 h-7 mb-3',
                          s.eventType === value ? 'text-gold-400' : 'text-white/40',
                        )}
                      />
                      <div
                        className={cn(
                          'font-semibold text-sm',
                          s.eventType === value ? 'text-white' : 'text-white/65',
                        )}
                      >
                        {label}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {s.step === 2 && (
              <div>
                <h3 className="font-display text-2xl font-bold text-white mb-2">How many guests?</h3>
                <p className="text-white/45 text-sm mb-8">
                  Catering, security, and décor lines scale per guest in our Syracuse model.
                </p>
                <div className="text-center mb-8">
                  <div className="text-7xl font-display font-bold text-gold-400 drop-shadow-lg">
                    {s.guestCount}
                  </div>
                  <div className="text-white/50">guests</div>
                </div>
                <input
                  type="range"
                  min={10}
                  max={500}
                  step={5}
                  value={s.guestCount}
                  onChange={(e) => s.setGuestCount(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-gold-500"
                />
                <div className="flex justify-between text-white/30 text-sm mt-2">
                  <span>10</span>
                  <span>100</span>
                  <span>250</span>
                  <span>500</span>
                </div>
                <div className="grid grid-cols-4 gap-2 sm:gap-3 mt-8">
                  {[25, 75, 150, 300].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => s.setGuestCount(n)}
                      className={cn(
                        'py-2.5 rounded-xl border text-sm font-medium transition-all',
                        s.guestCount === n
                          ? 'border-gold-500 bg-gold-500/15 text-gold-400'
                          : 'border-white/10 text-white/50 hover:border-white/30',
                      )}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {s.step === 3 && (
              <div>
                <h3 className="font-display text-2xl font-bold text-white mb-2">Which services?</h3>
                <p className="text-white/45 text-sm mb-6">
                  Toggle CNY-realistic bundles — numbers refresh instantly.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {serviceOpts.map(({ key, label, icon: Icon }) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => s.toggleService(key as keyof typeof s.services)}
                      className={cn(
                        'p-4 rounded-2xl border text-left flex items-start gap-3 transition-all',
                        s.services[key as keyof typeof s.services]
                          ? 'border-gold-500 bg-gold-500/12'
                          : 'border-white/10 bg-white/[0.04] hover:border-white/25',
                      )}
                    >
                      <Icon
                        className={cn(
                          'w-5 h-5 mt-0.5',
                          s.services[key as keyof typeof s.services]
                            ? 'text-gold-400'
                            : 'text-white/40',
                        )}
                      />
                      <span
                        className={cn(
                          'font-semibold text-sm',
                          s.services[key as keyof typeof s.services]
                            ? 'text-white'
                            : 'text-white/65',
                        )}
                      >
                        {label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {s.step === 4 && (
              <div>
                <h3 className="font-display text-2xl font-bold text-white mb-2">Choose your package</h3>
                <p className="text-white/45 text-sm mb-6">Planning depth multiplies the line-item subtotal.</p>
                <div className="space-y-4">
                  {PACKAGE_DETAILS.map(({ tier, name, tagline, features }) => (
                    <button
                      key={tier}
                      type="button"
                      onClick={() => s.selectPackage(tier)}
                      className={cn(
                        'w-full p-6 rounded-2xl border text-left transition-all',
                        s.selectedPackage === tier
                          ? 'border-gold-500 bg-gold-500/12 ring-1 ring-gold-500/30'
                          : 'border-white/10 bg-white/[0.04] hover:border-white/25',
                      )}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-white text-lg">{name}</span>
                        <div
                          className={cn(
                            'w-5 h-5 rounded-full border-2 transition-all',
                            s.selectedPackage === tier
                              ? 'border-gold-400 bg-gold-400'
                              : 'border-white/30',
                          )}
                        />
                      </div>
                      <p className="text-white/45 text-sm mb-3">{tagline}</p>
                      <ul className="space-y-1.5">
                        {features.map((f) => (
                          <li key={f} className="flex items-center gap-2 text-sm text-white/60">
                            <CheckCircle className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {s.step === 5 && (
              <div>
                <h3 className="font-display text-2xl font-bold text-white mb-6">Quote summary</h3>
                <div className="space-y-3 mb-6 rounded-2xl bg-black/20 border border-white/10 p-6">
                  <div className="flex justify-between text-white/60 text-sm">
                    <span>Event</span>
                    <span className="text-white capitalize">{s.eventType}</span>
                  </div>
                  <div className="flex justify-between text-white/60 text-sm">
                    <span>Guests</span>
                    <span className="text-white">{s.guestCount}</span>
                  </div>
                  <div className="flex justify-between text-white/60 text-sm">
                    <span>Package</span>
                    <span className="text-white capitalize">{s.selectedPackage}</span>
                  </div>
                  <div className="border-t border-white/10 my-3" />
                  <div className="flex justify-between text-white/60 text-sm">
                    <span>Subtotal</span>
                    <span>{fmt(s.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-white/60 text-sm">
                    <span>
                      Onondaga sales tax ({taxPct}%)
                    </span>
                    <span>{fmt(s.tax)}</span>
                  </div>
                  <div className="flex justify-between text-white/60 text-sm">
                    <span>Planning operations ({feePct}%)</span>
                    <span>{fmt(s.serviceFee)}</span>
                  </div>
                  <div className="border-t border-white/10 my-3" />
                  <div className="flex justify-between text-white font-bold text-lg">
                    <span>Total estimate</span>
                    <span className="text-gold-400">{fmt(s.total)}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <input
                    type="text"
                    className={ic}
                    placeholder="Your Name *"
                    value={s.contactName}
                    onChange={(e) => s.setContact(e.target.value, s.contactEmail)}
                  />
                  <input
                    type="email"
                    className={ic}
                    placeholder="Your Email *"
                    value={s.contactEmail}
                    onChange={(e) => s.setContact(s.contactName, e.target.value)}
                  />
                </div>
              </div>
            )}

            <div className="flex justify-between mt-10 gap-4">
              {s.step > 1 ? (
                <button
                  type="button"
                  onClick={s.prevStep}
                  className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white hover:bg-white/5 text-sm"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
              ) : (
                <div />
              )}
              {s.step < 5 ? (
                <button
                  type="button"
                  onClick={s.nextStep}
                  className="flex items-center gap-2 px-8 py-3 rounded-full bg-gold-500 text-navy-950 font-bold hover:bg-gold-400 text-sm ml-auto shadow-lg shadow-gold-500/20"
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="flex items-center gap-2 px-8 py-3 rounded-full bg-gold-500 text-navy-950 font-bold hover:bg-gold-400 text-sm ml-auto shadow-lg shadow-gold-500/20"
                >
                  <Star className="w-4 h-4" /> Request quote
                </button>
              )}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="relative h-48 rounded-2xl overflow-hidden border border-white/10">
              <Image
                src={siteImages.heroHome}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 400px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />
              <p className="absolute bottom-4 left-4 right-4 text-white/90 text-sm font-medium">
                Downtown Syracuse to Skaneateles — same estimator, local nuance in every line.
              </p>
            </div>

            <div className="glass-card-strong p-6 lg:sticky lg:top-28 border-gold-500/15">
              <div className="text-white/50 text-xs uppercase tracking-widest mb-1">Live estimate</div>
              <div className="text-4xl sm:text-5xl font-display font-bold text-gold-400 mb-4">
                {s.subtotal > 0 ? fmt(s.total) : '—'}
              </div>
              {s.subtotal > 0 && (
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between text-white/45">
                    <span>Subtotal</span>
                    <span>{fmt(s.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-white/45">
                    <span>Tax + ops</span>
                    <span>{fmt(s.tax + s.serviceFee)}</span>
                  </div>
                </div>
              )}
              <div className="border-t border-white/10 pt-4 space-y-2">
                {[
                  'No commitment to book',
                  `${taxPct}% Onondaga tax built in`,
                  'CNY vendor assumptions',
                  'Human review within 2 hours',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-white/50 text-xs">
                    <CheckCircle className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
