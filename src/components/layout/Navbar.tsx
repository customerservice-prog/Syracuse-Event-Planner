'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/pricing', label: 'Get a Quote' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/dashboard', label: 'Dashboard' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled ? 'bg-navy-950/95 backdrop-blur-md border-b border-white/10 py-3' : 'bg-transparent py-5'
    )}>
      <div className="container-max flex items-center justify-between px-4 md:px-8 lg:px-16">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full gold-gradient flex items-center justify-center">
            <Star className="w-4 h-4 text-navy-950 fill-navy-950" />
          </div>
          <span className="font-display font-bold text-lg text-white">
            Syracuse<span className="text-gold-400"> Events</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.slice(0, 5).map((link) => (
            <Link key={link.href} href={link.href}
              className={cn('text-sm font-medium transition-colors duration-200',
                pathname === link.href ? 'text-gold-400' : 'text-white/70 hover:text-white')}>
              {link.label}
            </Link>
          ))}
          <Link href="/pricing"
            className="px-5 py-2 rounded-full bg-gold-500 text-navy-950 font-semibold text-sm hover:bg-gold-400 transition-colors">
            Book Now
          </Link>
        </nav>

        <button className="md:hidden text-white" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-navy-950/98 backdrop-blur-md border-t border-white/10">
          <nav className="flex flex-col px-4 py-4 gap-3">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
                className={cn('text-base font-medium py-2 transition-colors',
                  pathname === link.href ? 'text-gold-400' : 'text-white/70')}>
                {link.label}
              </Link>
            ))}
            <Link href="/pricing" onClick={() => setMobileOpen(false)}
              className="mt-2 px-5 py-3 rounded-full bg-gold-500 text-navy-950 font-semibold text-center">
              Book Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
              }
