import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Heart, Briefcase, PartyPopper, Mic, Camera, Utensils } from 'lucide-react';
import { siteImages } from '@/lib/site-images';

const items = [
  {
    href: '/services#weddings',
    icon: Heart,
    title: 'Weddings',
    desc: 'Lakefront to downtown — full planning & day-of.',
    image: siteImages.serviceWedding,
  },
  {
    href: '/services#corporate',
    icon: Briefcase,
    title: 'Corporate',
    desc: 'Conferences, offsites, and galas at Oncenter & beyond.',
    image: siteImages.serviceCorporate,
  },
  {
    href: '/services#social',
    icon: PartyPopper,
    title: 'Social',
    desc: 'Milestones, birthdays, and celebrations done right.',
    image: siteImages.serviceSocial,
  },
  {
    href: '/services#galas',
    icon: Mic,
    title: 'Galas & fundraisers',
    desc: 'Auctions, staging, and donor experiences.',
    image: siteImages.serviceGala,
  },
  {
    href: '/services#media',
    icon: Camera,
    title: 'Photo & video',
    desc: 'CNY creatives for lasting memories.',
    image: siteImages.serviceMedia,
  },
  {
    href: '/services#catering',
    icon: Utensils,
    title: 'Catering & bar',
    desc: 'Menus, dietary needs, and premium bar service.',
    image: siteImages.serviceCatering,
  },
];

export default function ServicesSection() {
  return (
    <section className="section-padding bg-navy-950 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(244,196,48,0.12),transparent)] pointer-events-none" />
      <div className="container-max relative">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-gold-400 text-sm uppercase tracking-[0.2em] mb-3">Services</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Everything under one roof
          </h2>
          <p className="text-white/50 text-lg">
            Six core categories, one coordinated team — less vendor juggling, more time with your guests.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(({ href, icon: Icon, title, desc, image }) => (
            <Link
              key={href}
              href={href}
              className="group relative rounded-3xl border border-white/10 bg-white/[0.03] overflow-hidden hover:border-gold-500/35 transition-all duration-300 hover:shadow-2xl hover:shadow-gold-500/10"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={image}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />
                <div className="absolute bottom-4 left-4 w-11 h-11 rounded-xl gold-gradient flex items-center justify-center shadow-lg">
                  <Icon className="w-5 h-5 text-navy-950" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-bold text-white mb-2 flex items-center justify-between gap-2">
                  {title}
                  <ArrowRight className="w-5 h-5 text-gold-400 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all flex-shrink-0" />
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-14">
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gold-500 text-navy-950 font-bold hover:bg-gold-400 transition-all shadow-lg shadow-gold-500/20"
          >
            See Syracuse pricing <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
