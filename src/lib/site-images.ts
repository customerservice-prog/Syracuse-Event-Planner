/**
 * Unsplash URLs verified to return 200 with `auto=format` (avoid `fit=crop`, which can 404 on some assets).
 * Swap for your own photography when ready.
 */
export const siteImages = {
  heroHome:
    'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&w=2400&q=85',
  heroPricing:
    'https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&w=2400&q=85',
  heroServices:
    'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&w=2400&q=85',
  heroAbout:
    'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&w=2400&q=85',
  ctaBand:
    'https://images.unsplash.com/photo-1525182008055-f88b95ff7980?auto=format&w=2000&q=85',
  contactBg:
    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&w=2000&q=85',
  serviceWedding:
    'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&w=1200&q=85',
  serviceCorporate:
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&w=1200&q=85',
  serviceSocial:
    'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&w=1200&q=85',
  serviceGala:
    'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&w=1200&q=85',
  serviceMedia:
    'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&w=1200&q=85',
  serviceCatering:
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&w=1200&q=85',
  testimonial1:
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&w=400&q=85',
  testimonial2:
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&w=400&q=85',
  testimonial3:
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&w=400&q=85',
  aboutTeam:
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&w=1600&q=85',
} as const;
