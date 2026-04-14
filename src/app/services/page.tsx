import Link from 'next/link';
import { ArrowRight, CheckCircle, Heart, Briefcase, PartyPopper, Mic, Camera, Utensils } from 'lucide-react';

export const metadata = { title: 'Services | Syracuse Event Planner' };

export default function ServicesPage() {
  const services = [
    { id:'weddings', icon:Heart, title:'Weddings', ic:'text-rose-400', bg:'from-rose-500/20', desc:'From Skaneateles Lake to downtown Syracuse receptions.', features:['20+ CNY venues','Vendor management','Custom design','Day-of coordination'] },
    { id:'corporate', icon:Briefcase, title:'Corporate Events', ic:'text-blue-400', bg:'from-blue-500/20', desc:'Conferences and galas at OnCenter and beyond.', features:['Conference planning','Annual galas','AV setup','Corporate catering'] },
    { id:'social', icon:PartyPopper, title:'Social Celebrations', ic:'text-purple-400', bg:'from-purple-500/20', desc:'Birthdays, anniversaries, graduations — every milestone.', features:['Theme design','Entertainment','Catering & bar','Photo booth'] },
    { id:'galas', icon:Mic, title:'Galas & Fundraisers', ic:'text-gold-400', bg:'from-gold-500/20', desc:'High-impact charity galas with silent auctions.', features:['Full production','Auctions','Entertainment','Donor recognition'] },
    { id:'media', icon:Camera, title:'Photography & Video', ic:'text-emerald-400', bg:'from-emerald-500/20', desc:'CNY photographers delivering stunning memories.', features:['Event photography','Videography','Drone footage','Live streaming'] },
    { id:'catering', icon:Utensils, title:'Catering & Bar', ic:'text-orange-400', bg:'from-orange-500/20', desc:'Farm-to-table menus from top Syracuse caterers.', features:['Menu curation','Dietary options','Premium bar','Craft beverages'] },
  ];

  return (
    <div className="pt-24 pb-16">
      <section className="section-padding text-center bg-navy-950 relative overflow-hidden">
        <div className="absolute inset-0 hero-pattern" />
        <div className="relative z-10 container-max">
          <p className="text-gold-400 text-sm uppercase tracking-widest mb-3">What We Offer</p>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-6">Event Services</h1>
          <p className="text-white/50 text-xl mb-8">Every detail handled. Every moment perfected.</p>
          <Link href="/pricing" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gold-500 text-navy-950 font-bold hover:bg-gold-400 transition-all">
            Get Custom Quote <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
      <section className="section-padding bg-navy-950">
        <div className="container-max space-y-20">
          {services.map(({ id, icon: Icon, title, ic, bg, desc, features }, i) => (
            <div key={id} id={id} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${bg} to-transparent flex items-center justify-center mb-6`}><Icon className={`w-8 h-8 ${ic}`} /></div>
                <h2 className="font-display text-4xl font-bold text-white mb-4">{title}</h2>
                <p className="text-white/60 leading-relaxed mb-8">{desc}</p>
                <Link href="/pricing" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold-500 text-navy-950 font-semibold hover:bg-gold-400 transition-all">
                  Price {title} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                <div className="glass-card p-8">
                  <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">What&apos;s Included</h3>
                  <ul className="space-y-3">
                    {features.map(f => (<li key={f} className="flex items-start gap-3"><CheckCircle className={`w-5 h-5 ${ic} flex-shrink-0 mt-0.5`} /><span className="text-white/70 text-sm">{f}</span></li>))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
            }
