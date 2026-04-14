import Link from 'next/link';
import { ArrowRight, Heart, Briefcase, PartyPopper, Mic, Camera, Utensils } from 'lucide-react';

const items = [
  { href: '/services#weddings', icon: Heart, title: 'Weddings', desc: 'Lakefront to downtown — full planning & day-of.' },
  { href: '/services#corporate', icon: Briefcase, title: 'Corporate', desc: 'Conferences, offsites, and galas at OnCenter & beyond.' },
  { href: '/services#social', icon: PartyPopper, title: 'Social', desc: 'Milestones, birthdays, and celebrations done right.' },
  { href: '/services#galas', icon: Mic, title: 'Galas & fundraisers', desc: 'Auctions, staging, and donor experiences.' },
  { href: '/services#media', icon: Camera, title: 'Photo & video', desc: 'CNY creatives for lasting memories.' },
  { href: '/services#catering', icon: Utensils, title: 'Catering & bar', desc: 'Menus, dietary needs, and premium bar service.' },
];

export default function ServicesSection() {
  return (
    <section className="section-padding bg-navy-950">
      <div className="container-max">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-gold-400 text-sm uppercase tracking-widest mb-3">Services</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Everything under one roof
          </h2>
          <p className="text-white/50 text-lg">
            Six core categories, one coordinated team — so you spend less time juggling vendors.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(({ href, icon: Icon, title, desc }) => (
            <Link
              key={href}
              href={href}
              className="glass-card p-8 group hover:border-gold-500/30 transition-all"
            >
              <div className="w-12 h-12 rounded-xl gold-gradient flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <Icon className="w-6 h-6 text-navy-950" />
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-2 flex items-center justify-between gap-2">
                {title}
                <ArrowRight className="w-5 h-5 text-gold-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
            </Link>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gold-500 text-navy-950 font-bold hover:bg-gold-400 transition-all"
          >
            Get instant pricing <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
