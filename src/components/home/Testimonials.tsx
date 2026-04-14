import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    quote:
      'They handled our Marriott downtown reception flawlessly — timeline, vendors, and a last-minute weather pivot.',
    name: 'Jordan & Alex M.',
    role: 'Wedding · Syracuse',
  },
  {
    quote:
      'Our TechCNY gala at the OnCenter looked incredible. Sponsors noticed the polish.',
    name: 'Priya S.',
    role: 'Corporate gala',
  },
  {
    quote:
      'Transparent pricing and local vendors who actually showed up on time. Refreshing.',
    name: 'Marcus T.',
    role: 'Birthday celebration',
  },
];

export default function Testimonials() {
  return (
    <section className="section-padding bg-navy-950 border-t border-white/5">
      <div className="container-max">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-gold-400 text-sm uppercase tracking-widest mb-3">Testimonials</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Loved across CNY
          </h2>
          <p className="text-white/50 text-lg">Real feedback from planners who wanted less stress and better flow.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map(({ quote, name, role }) => (
            <div key={name} className="glass-card p-8 relative">
              <Quote className="w-10 h-10 text-gold-400/40 absolute top-6 right-6" />
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-gold-400 fill-gold-400" />
                ))}
              </div>
              <p className="text-white/80 leading-relaxed mb-6">&ldquo;{quote}&rdquo;</p>
              <div>
                <div className="text-white font-semibold">{name}</div>
                <div className="text-white/40 text-sm">{role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
