import Link from 'next/link';
import { Star, Phone, Mail, MapPin, Instagram, Facebook, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-navy-950 border-t border-white/10">
      <div className="container-max section-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full gold-gradient flex items-center justify-center">
                <Star className="w-4 h-4 text-navy-950 fill-navy-950" />
              </div>
              <span className="font-display font-bold text-lg">Syracuse<span className="text-gold-400"> Events</span></span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6">CNY&apos;s premier event planning company.</p>
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-white/60 text-sm"><Phone className="w-4 h-4 text-gold-400" /><span>(315) 555-0192</span></div>
              <div className="flex items-center gap-3 text-white/60 text-sm"><Mail className="w-4 h-4 text-gold-400" /><span>hello@syracuseevents.com</span></div>
              <div className="flex items-center gap-3 text-white/60 text-sm"><MapPin className="w-4 h-4 text-gold-400" /><span>300 Salina St, Syracuse, NY 13202</span></div>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Services</h4>
            <ul className="space-y-2">
              {['Weddings','Corporate Events','Social Gatherings','Galas & Fundraisers'].map(s => (
                <li key={s}><Link href="/services" className="text-white/50 hover:text-gold-400 text-sm transition-colors">{s}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Company</h4>
            <ul className="space-y-2">
              {[['About Us','/about'],['Our Team','/about#team'],['FAQ','/about#faq'],['Contact','/contact']].map(([l,h]) => (
                <li key={l}><Link href={h} className="text-white/50 hover:text-gold-400 text-sm transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Get Started</h4>
            <ul className="space-y-2">
              {[['Get a Quote','/pricing'],['Dashboard','/dashboard']].map(([l,h]) => (
                <li key={l}><Link href={h} className="text-white/50 hover:text-gold-400 text-sm transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">&copy; {new Date().getFullYear()} Syracuse Event Planner. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-white/40 hover:text-gold-400 transition-colors"><Instagram className="w-5 h-5" /></a>
            <a href="#" className="text-white/40 hover:text-gold-400 transition-colors"><Facebook className="w-5 h-5" /></a>
            <a href="#" className="text-white/40 hover:text-gold-400 transition-colors"><Linkedin className="w-5 h-5" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
      }
