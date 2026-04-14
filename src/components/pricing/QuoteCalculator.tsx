'use client';
import { useQuoteStore, EventType, PackageTier } from '@/store/quoteStore';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { Heart, Briefcase, PartyPopper, GraduationCap, Users, Sparkles, Home, Utensils, Camera, Video, Palette, Music, Shield, Car, ArrowRight, ArrowLeft, CheckCircle, Star } from 'lucide-react';

function fmt(n: number) { return new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',minimumFractionDigits:0}).format(n); }

const eventTypes: {value:EventType;label:string;icon:React.ElementType}[] = [
  {value:'wedding',label:'Wedding',icon:Heart},{value:'corporate',label:'Corporate',icon:Briefcase},
  {value:'birthday',label:'Birthday',icon:PartyPopper},{value:'social',label:'Social',icon:Users},
  {value:'graduation',label:'Graduation',icon:GraduationCap},{value:'other',label:'Other',icon:Sparkles},
];

const serviceOpts = [
  {key:'venue',label:'Venue',icon:Home},{key:'catering',label:'Catering',icon:Utensils},
  {key:'photography',label:'Photography',icon:Camera},{key:'videography',label:'Videography',icon:Video},
  {key:'decor',label:'Decor',icon:Palette},{key:'entertainment',label:'Entertainment',icon:Music},
  {key:'security',label:'Security',icon:Shield},{key:'transportation',label:'Transport',icon:Car},
] as const;

const packages: {tier:PackageTier;name:string;features:string[]}[] = [
  {tier:'essential',name:'Essential',features:['Day-of coordination','Vendor communication','Timeline creation']},
  {tier:'signature',name:'Signature ⭐',features:['Everything in Essential','Full planning support','CNY vendor discounts','Guest portal']},
  {tier:'premier',name:'Premier',features:['Everything in Signature','Dedicated lead planner','Unlimited consultations','Permit assistance']},
];

export default function QuoteCalculator() {
  const s = useQuoteStore();

  const handleSubmit = () => {
    if (!s.contactName || !s.contactEmail) { toast.error('Please fill your name and email.'); return; }
    toast.success('Quote submitted!', { description: `Est. total: ${fmt(s.total)}` });
    s.reset();
  };

  const ic = "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-gold-400";

  return (
    <div className="min-h-screen pt-24 pb-16 section-padding">
      <div className="container-max">
        <div className="text-center mb-12">
          <p className="text-gold-400 font-medium text-sm uppercase tracking-widest mb-3">Instant Pricing</p>
          <h1 className="font-display text-5xl font-bold text-white mb-4">Build Your Custom Quote</h1>
          <p className="text-white/50 text-lg">Real pricing, real time. No phone calls required.</p>
        </div>

        {/* Steps */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {['Event','Guests','Services','Package','Summary'].map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <div className={cn('w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold',
                i+1 < s.step ? 'bg-gold-500 text-navy-950' : i+1===s.step ? 'bg-gold-500 text-navy-950 ring-4 ring-gold-500/30' : 'bg-white/10 text-white/40')}>
                {i+1 < s.step ? <CheckCircle className="w-4 h-4" /> : i+1}
              </div>
              {i < 4 && <div className={cn('w-8 h-0.5', i+1 < s.step ? 'bg-gold-500' : 'bg-white/10')} />}
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 glass-card p-8">

            {/* Step 1 */}
            {s.step === 1 && (
              <div>
                <h2 className="font-display text-2xl font-bold text-white mb-6">What type of event?</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {eventTypes.map(({value,label,icon:Icon}) => (
                    <button key={value} onClick={() => s.setEventType(value)}
                      className={cn('p-5 rounded-2xl border text-left transition-all',
                        s.eventType===value ? 'border-gold-500 bg-gold-500/10' : 'border-white/10 bg-white/5 hover:border-white/30')}>
                      <Icon className={cn('w-7 h-7 mb-3', s.eventType===value ? 'text-gold-400' : 'text-white/40')} />
                      <div className={cn('font-semibold text-sm', s.eventType===value ? 'text-white' : 'text-white/60')}>{label}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2 */}
            {s.step === 2 && (
              <div>
                <h2 className="font-display text-2xl font-bold text-white mb-6">How many guests?</h2>
                <div className="text-center mb-8">
                  <div className="text-7xl font-display font-bold text-gold-400">{s.guestCount}</div>
                  <div className="text-white/50">guests</div>
                </div>
                <input type="range" min={10} max={500} step={5} value={s.guestCount}
                  onChange={e => s.setGuestCount(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-gold-500" />
                <div className="flex justify-between text-white/30 text-sm mt-2"><span>10</span><span>100</span><span>250</span><span>500</span></div>
                <div className="grid grid-cols-4 gap-3 mt-8">
                  {[25,75,150,300].map(n => (
                    <button key={n} onClick={() => s.setGuestCount(n)}
                      className={cn('py-2 rounded-xl border text-sm font-medium',
                        s.guestCount===n ? 'border-gold-500 bg-gold-500/10 text-gold-400' : 'border-white/10 text-white/50 hover:border-white/30')}>
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3 */}
            {s.step === 3 && (
              <div>
                <h2 className="font-display text-2xl font-bold text-white mb-2">Which services?</h2>
                <p className="text-white/40 text-sm mb-6">Prices update live.</p>
                <div className="grid grid-cols-2 gap-3">
                  {serviceOpts.map(({key,label,icon:Icon}) => (
                    <button key={key} onClick={() => s.toggleService(key as keyof typeof s.services)}
                      className={cn('p-4 rounded-2xl border text-left flex items-start gap-3 transition-all',
                        s.services[key as keyof typeof s.services] ? 'border-gold-500 bg-gold-500/10' : 'border-white/10 bg-white/5 hover:border-white/30')}>
                      <Icon className={cn('w-5 h-5 mt-0.5', s.services[key as keyof typeof s.services] ? 'text-gold-400' : 'text-white/40')} />
                      <span className={cn('font-semibold text-sm', s.services[key as keyof typeof s.services] ? 'text-white' : 'text-white/60')}>{label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4 */}
            {s.step === 4 && (
              <div>
                <h2 className="font-display text-2xl font-bold text-white mb-6">Choose your package</h2>
                <div className="space-y-4">
                  {packages.map(({tier,name,features}) => (
                    <button key={tier} onClick={() => s.selectPackage(tier)}
                      className={cn('w-full p-6 rounded-2xl border text-left transition-all',
                        s.selectedPackage===tier ? 'border-gold-500 bg-gold-500/10' : 'border-white/10 bg-white/5 hover:border-white/30')}>
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-bold text-white text-lg">{name}</span>
                        <div className={cn('w-5 h-5 rounded-full border-2 transition-all', s.selectedPackage===tier ? 'border-gold-400 bg-gold-400' : 'border-white/30')} />
                      </div>
                      <ul className="space-y-1">
                        {features.map(f => (<li key={f} className="flex items-center gap-2 text-sm text-white/60"><CheckCircle className="w-3.5 h-3.5 text-gold-400" />{f}</li>))}
                      </ul>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 5 */}
            {s.step === 5 && (
              <div>
                <h2 className="font-display text-2xl font-bold text-white mb-6">Quote Summary</h2>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-white/60 text-sm"><span>Event</span><span className="text-white capitalize">{s.eventType}</span></div>
                  <div className="flex justify-between text-white/60 text-sm"><span>Guests</span><span className="text-white">{s.guestCount}</span></div>
                  <div className="flex justify-between text-white/60 text-sm"><span>Package</span><span className="text-white capitalize">{s.selectedPackage}</span></div>
                  <div className="border-t border-white/10 my-3" />
                  <div className="flex justify-between text-white/60 text-sm"><span>Subtotal</span><span>{fmt(s.subtotal)}</span></div>
                  <div className="flex justify-between text-white/60 text-sm"><span>NY Sales Tax (8%)</span><span>{fmt(s.tax)}</span></div>
                  <div className="flex justify-between text-white/60 text-sm"><span>Service Fee (5%)</span><span>{fmt(s.serviceFee)}</span></div>
                  <div className="border-t border-white/10 my-3" />
                  <div className="flex justify-between text-white font-bold text-lg"><span>Total</span><span className="text-gold-400">{fmt(s.total)}</span></div>
                </div>
                <div className="space-y-3">
                  <input type="text" className={ic} placeholder="Your Name *" value={s.contactName} onChange={e => s.setContact(e.target.value, s.contactEmail)} />
                  <input type="email" className={ic} placeholder="Your Email *" value={s.contactEmail} onChange={e => s.setContact(s.contactName, e.target.value)} />
                </div>
              </div>
            )}

            {/* Nav buttons */}
            <div className="flex justify-between mt-8">
              {s.step > 1
                ? <button onClick={s.prevStep} className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white hover:bg-white/5 text-sm"><ArrowLeft className="w-4 h-4" /> Back</button>
                : <div />}
              {s.step < 5
                ? <button onClick={s.nextStep} className="flex items-center gap-2 px-8 py-3 rounded-full bg-gold-500 text-navy-950 font-bold hover:bg-gold-400 text-sm">Continue <ArrowRight className="w-4 h-4" /></button>
                : <button onClick={handleSubmit} className="flex items-center gap-2 px-8 py-3 rounded-full bg-gold-500 text-navy-950 font-bold hover:bg-gold-400 text-sm"><Star className="w-4 h-4" /> Request Quote</button>}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="glass-card p-6 sticky top-28">
              <div className="text-white/50 text-sm mb-1 uppercase tracking-wider">Live Estimate</div>
              <div className="text-4xl font-display font-bold text-gold-400 mb-4">
                {s.subtotal > 0 ? fmt(s.total) : '--'}
              </div>
              {s.subtotal > 0 && (
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-white/40"><span>Subtotal</span><span>{fmt(s.subtotal)}</span></div>
                  <div className="flex justify-between text-white/40"><span>Tax & Fees</span><span>{fmt(s.tax + s.serviceFee)}</span></div>
                </div>
              )}
              <div className="border-t border-white/10 my-4" />
              <div className="space-y-2">
                {['No commitment required','Syracuse tax included','Response within 2 hours','12+ years experience'].map(item => (
                  <div key={item} className="flex items-center gap-2 text-white/50 text-xs">
                    <CheckCircle className="w-3.5 h-3.5 text-gold-400" />{item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  }
