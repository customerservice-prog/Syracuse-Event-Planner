import Image from 'next/image';
import { Star, Quote } from 'lucide-react';
import { siteImages } from '@/lib/site-images';

const reviews = [
  {
    quote:
      'They handled our Marriott downtown reception flawlessly — timeline, vendors, and a last-minute weather pivot.',
    name: 'Jordan & Alex M.',
    role: 'Wedding · Syracuse',
    image: siteImages.testimonial1,
  },
  {
    quote:
      'Our TechCNY gala at the Oncenter looked incredible. Sponsors noticed the polish.',
    name: 'Priya S.',
    role: 'Corporate gala',
    image: siteImages.testimonial2,
  },
  {
    quote:
      'Transparent pricing and local vendors who actually showed up on time. Refreshing.',
    name: 'Marcus T.',
    role: 'Birthday celebration',
    image: siteImages.testimonial3,
  },
];

export default function Testimonials() {
  return (
    <section className="section-padding bg-navy-950 border-t border-white/5 relative overflow-hidden">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="container-max relative">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-gold-400 text-sm uppercase tracking-[0.2em] mb-3">Testimonials</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Loved across CNY
          </h2>
          <p className="text-white/50 text-lg">Clients who wanted less stress and a sharper run of show.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map(({ quote, name, role, image }) => (
            <div
              key={name}
              className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-8 backdrop-blur-sm"
            >
              <Quote className="w-10 h-10 text-gold-400/30 absolute top-6 right-6" />
              <div className="flex items-center gap-4 mb-5">
                <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-gold-500/40 flex-shrink-0">
                  <Image src={image} alt="" fill className="object-cover" sizes="56px" />
                </div>
                <div>
                  <div className="text-white font-semibold">{name}</div>
                  <div className="text-white/40 text-sm">{role}</div>
                </div>
              </div>
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-gold-400 fill-gold-400" />
                ))}
              </div>
              <p className="text-white/80 leading-relaxed text-sm md:text-base">&ldquo;{quote}&rdquo;</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
