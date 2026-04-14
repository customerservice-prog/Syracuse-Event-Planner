/**
 * Syracuse / CNY–aligned estimate model.
 * 8% reflects the common Onondaga County combined sales & use tax rate
 * quoted for taxable goods/services in many Syracuse-area event budgets (verify for your venue).
 */

export type EventType =
  | 'wedding'
  | 'corporate'
  | 'birthday'
  | 'social'
  | 'graduation'
  | 'other';

export type PackageTier = 'essential' | 'signature' | 'premier';

export interface ServiceSelection {
  venue: boolean;
  catering: boolean;
  photography: boolean;
  videography: boolean;
  decor: boolean;
  entertainment: boolean;
  security: boolean;
  transportation: boolean;
}

/** Line items calibrated toward mid–upper CNY vendor rates (not a binding quote). */
export const LINE_ITEM_PRICING: Record<
  keyof ServiceSelection,
  { base: number; perGuest: number; label: string }
> = {
  venue: {
    base: 3800,
    perGuest: 11,
    label: 'Venue liaison, load-in, floor plans (downtown / Oncenter-style complexity)',
  },
  catering: {
    base: 750,
    perGuest: 54,
    label: 'Plated or buffet catering — Syracuse metro mid-tier (bar & staffing extra)',
  },
  photography: {
    base: 2400,
    perGuest: 0,
    label: 'Full-day coverage — typical CNY wedding package',
  },
  videography: {
    base: 1900,
    perGuest: 0,
    label: 'Highlight + ceremony — second shooter optional',
  },
  decor: {
    base: 950,
    perGuest: 9,
    label: 'Florals, linens, uplighting — scalable by headcount',
  },
  entertainment: {
    base: 1450,
    perGuest: 0,
    label: 'DJ or small ensemble — peak Saturdays premium in season',
  },
  security: {
    base: 650,
    perGuest: 2,
    label: 'Licensed staff — often required 100+ guests / alcohol',
  },
  transportation: {
    base: 550,
    perGuest: 3,
    label: 'Shuttle blocks — hotel to Marriott / Oncenter corridor',
  },
};

export const EVENT_MULTIPLIER: Record<EventType, number> = {
  wedding: 1.42,
  corporate: 1.12,
  birthday: 0.92,
  social: 1.0,
  graduation: 0.96,
  other: 1.0,
};

export const PACKAGE_MULTIPLIER: Record<PackageTier, number> = {
  essential: 1.0,
  signature: 1.28,
  premier: 1.62,
};

export const ONONDAGA_SALES_TAX = 0.08;
export const PLANNING_OPERATIONS_FEE = 0.05;

export const PRICING_COPY = {
  region: 'Onondaga County & greater Syracuse',
  taxShort: '8% Onondaga County tax',
  taxDetail:
    'Our estimator applies 8% to the taxable subtotal — the rate most CNY planners use for Syracuse / Onondaga venues. Your venue contract may vary.',
  feeShort: '5% planning operations fee',
  disclaimer:
    'Illustrative budgets for Syracuse-area events. Final pricing depends on date, venue (Marriott Syracuse, Oncenter, SKY Armory, barns in Skaneateles / Cazenovia, etc.), and vendor contracts.',
  venues: [
    'Marriott Syracuse Downtown',
    'Oncenter Complex',
    'SKY Armory',
    'The Oncenter Ballroom',
    'Skaneateles & Cazenovia estates',
  ],
};

export function calculateSubtotal(
  services: ServiceSelection,
  guestCount: number,
  eventType: EventType,
  pkg: PackageTier | null,
): number {
  let sub = 0;
  for (const key of Object.keys(services) as (keyof ServiceSelection)[]) {
    if (services[key]) {
      const p = LINE_ITEM_PRICING[key];
      sub += p.base + p.perGuest * guestCount;
    }
  }
  const tier: PackageTier = pkg ?? 'signature';
  return Math.round(
    sub * EVENT_MULTIPLIER[eventType] * PACKAGE_MULTIPLIER[tier],
  );
}

export function calculateTotals(
  services: ServiceSelection,
  guestCount: number,
  eventType: EventType,
  pkg: PackageTier | null,
) {
  const subtotal = calculateSubtotal(services, guestCount, eventType, pkg);
  const tax = Math.round(subtotal * ONONDAGA_SALES_TAX);
  const serviceFee = Math.round(subtotal * PLANNING_OPERATIONS_FEE);
  return {
    subtotal,
    tax,
    serviceFee,
    total: subtotal + tax + serviceFee,
  };
}

/** “From” price: wedding, 100 guests, venue + catering only — shows entry point per tier. */
export function tierStartingTotal(tier: PackageTier): number {
  const services: ServiceSelection = {
    venue: true,
    catering: true,
    photography: false,
    videography: false,
    decor: false,
    entertainment: false,
    security: false,
    transportation: false,
  };
  return calculateTotals(services, 100, 'wedding', tier).total;
}

/** Typical curated wedding build for pricing page anchor. */
export function typicalWeddingSyracuseTotal(tier: PackageTier): number {
  const services: ServiceSelection = {
    venue: true,
    catering: true,
    photography: true,
    videography: false,
    decor: true,
    entertainment: true,
    security: false,
    transportation: false,
  };
  return calculateTotals(services, 130, 'wedding', tier).total;
}
