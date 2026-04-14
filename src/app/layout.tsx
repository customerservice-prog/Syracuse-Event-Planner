import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import OrganizationJsonLd from '@/components/seo/OrganizationJsonLd';
import { getSiteUrl } from '@/lib/site-url';
import { siteImages } from '@/lib/site-images';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default:
      'Syracuse Event Planner | Weddings, Corporate & Galas in Onondaga County NY',
    template: '%s | Syracuse Event Planner',
  },
  description:
    'Award-caliber event planning in Syracuse, NY: weddings, corporate events, galas, and social celebrations across Onondaga County and CNY. Transparent pricing, local vendors, permits & insurance handled.',
  keywords: [
    'Syracuse event planner',
    'wedding planner Syracuse NY',
    'Onondaga County event planning',
    'corporate events Syracuse',
    'CNY wedding coordinator',
    'Oncenter event planner',
    'Marriott Syracuse wedding',
    'Skaneateles wedding planner',
    'Syracuse NY gala planner',
  ],
  authors: [{ name: 'Syracuse Event Planner' }],
  creator: 'Syracuse Event Planner',
  publisher: 'Syracuse Event Planner',
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Syracuse Event Planner',
    title: 'Syracuse Event Planner | Premium Events in CNY',
    description:
      'Full-service event planning in Syracuse and Central New York — weddings, corporate events, galas, and more.',
    images: [
      { url: siteImages.heroHome, width: 1200, height: 800, alt: 'Syracuse Event Planner' },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Syracuse Event Planner | Premium Events in CNY',
    description:
      'Full-service event planning in Syracuse and Central New York — weddings, corporate, galas.',
    images: [siteImages.heroHome],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'Event planning',
  alternates: { canonical: '/' },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? {
        verification: {
          google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
        },
      }
    : {}),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US" className="dark">
      <body className={`${inter.variable} ${playfair.variable} bg-navy-950 text-white antialiased`}>
        <OrganizationJsonLd />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
