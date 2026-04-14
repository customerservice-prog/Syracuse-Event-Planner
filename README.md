# Syracuse Event Planner

Premium event planning platform for Syracuse, NY built with Next.js 14, TypeScript, Tailwind CSS, and Zustand.

## Quick Start

```bash
git clone https://github.com/customerservice-prog/Syracuse-Event-Planner.git
cd Syracuse-Event-Planner
npm install
npm run dev
# Visit http://localhost:3000
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page — hero, services, stats, testimonials, CTA |
| `/pricing` | 5-step interactive quote calculator with live pricing |
| `/services` | All 6 service categories with features |
| `/about` | Company story, team bios, FAQ |
| `/contact` | Contact form with event details |
| `/dashboard` | Organizer analytics dashboard |

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS** with custom design system
- **Zustand** for state management
- **Framer Motion** for animations
- **Lucide React** icons
- **Sonner** for toast notifications

## Project Structure

```
src/
  app/
    page.tsx              # Home
    layout.tsx            # Root layout
    globals.css           # Global styles + CSS vars
    pricing/page.tsx      # Quote calculator
    services/page.tsx     # Services detail
    about/page.tsx        # About + Team + FAQ
    contact/page.tsx      # Contact form
    dashboard/page.tsx    # Analytics dashboard
  components/
    layout/
      Navbar.tsx          # Sticky responsive nav
      Footer.tsx          # Full footer
    home/
      Hero.tsx            # Animated hero
      ServicesSection.tsx # 6-service grid
      Stats.tsx           # Gold stats banner
      Testimonials.tsx    # Client reviews
      CTASection.tsx      # Bottom CTA
    pricing/
      QuoteCalculator.tsx # 5-step wizard
  lib/
    utils.ts              # cn(), formatCurrency(), tax calc
  store/
    quoteStore.ts         # Zustand quote state + pricing logic
```

## Design System

- **Colors**: Deep Navy (#090F1E) bg + Gold (#F4C430) accent
- **Fonts**: Playfair Display (headings) + Inter (body)
- **Cards**: Glassmorphism (bg-white/5 backdrop-blur)
- **Responsive**: Mobile-first

## Syracuse Features

- Onondaga County 8% sales tax auto-calculated
- Local venues referenced (Marriott Downtown, OnCenter)
- Permit awareness in quote flow
- CNY vendor network

## Backend Phase 2 (Connect in Cursor)

Add to `.env.local`:
```
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=your-secret
STRIPE_SECRET_KEY=sk_live_...
RESEND_API_KEY=re_...
```
