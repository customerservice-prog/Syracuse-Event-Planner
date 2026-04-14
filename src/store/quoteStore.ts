import { create } from 'zustand';

export type EventType = 'wedding' | 'corporate' | 'birthday' | 'social' | 'graduation' | 'other';
export type PackageTier = 'essential' | 'signature' | 'premier';

interface Services {
  venue: boolean; catering: boolean; photography: boolean; videography: boolean;
  decor: boolean; entertainment: boolean; security: boolean; transportation: boolean;
}

export interface QuoteState {
  eventType: EventType;
  guestCount: number;
  services: Services;
  selectedPackage: PackageTier | null;
  subtotal: number; tax: number; serviceFee: number; total: number;
  contactEmail: string; contactName: string;
  step: number;
  setEventType: (t: EventType) => void;
  setGuestCount: (n: number) => void;
  toggleService: (k: keyof Services) => void;
  selectPackage: (t: PackageTier) => void;
  setContact: (name: string, email: string) => void;
  nextStep: () => void; prevStep: () => void;
  calculateQuote: () => void; reset: () => void;
}

const PRICING: Record<keyof Services, {base:number;perGuest:number}> = {
  venue:{base:2500,perGuest:5}, catering:{base:0,perGuest:45}, photography:{base:1800,perGuest:0},
  videography:{base:1500,perGuest:0}, decor:{base:800,perGuest:8}, entertainment:{base:1200,perGuest:0},
  security:{base:600,perGuest:2}, transportation:{base:500,perGuest:3},
};

const EVENT_MULT: Record<EventType,number> = {
  wedding:1.4, corporate:1.1, birthday:0.9, social:1.0, graduation:0.95, other:1.0
};

const PKG_MULT: Record<PackageTier,number> = { essential:1.0, signature:1.25, premier:1.6 };
const SYRACUSE_TAX = 0.08;

function calcSubtotal(services: Services, guestCount: number, eventType: EventType, pkg: PackageTier | null): number {
  let sub = 0;
  for (const [key, enabled] of Object.entries(services)) {
    if (enabled) {
      const p = PRICING[key as keyof Services];
      sub += p.base + p.perGuest * guestCount;
    }
  }
  return Math.round(sub * EVENT_MULT[eventType] * PKG_MULT[pkg ?? 'signature']);
}

export const useQuoteStore = create<QuoteState>((set, get) => ({
  eventType: 'wedding', guestCount: 100,
  services: { venue:true, catering:true, photography:false, videography:false, decor:false, entertainment:false, security:false, transportation:false },
  selectedPackage: 'signature',
  subtotal: 0, tax: 0, serviceFee: 0, total: 0,
  contactEmail: '', contactName: '', step: 1,
  setEventType: (eventType) => { set({ eventType }); get().calculateQuote(); },
  setGuestCount: (guestCount) => { set({ guestCount }); get().calculateQuote(); },
  toggleService: (k) => {
    const services = { ...get().services, [k]: !get().services[k] };
    set({ services }); get().calculateQuote();
  },
  selectPackage: (selectedPackage) => { set({ selectedPackage }); get().calculateQuote(); },
  setContact: (contactName, contactEmail) => set({ contactName, contactEmail }),
  nextStep: () => set(s => ({ step: Math.min(s.step+1, 5) })),
  prevStep: () => set(s => ({ step: Math.max(s.step-1, 1) })),
  calculateQuote: () => {
    const { services, guestCount, eventType, selectedPackage } = get();
    const subtotal = calcSubtotal(services, guestCount, eventType, selectedPackage);
    const tax = Math.round(subtotal * SYRACUSE_TAX);
    const serviceFee = Math.round(subtotal * 0.05);
    set({ subtotal, tax, serviceFee, total: subtotal + tax + serviceFee });
  },
  reset: () => set({ step:1, selectedPackage:null, subtotal:0, tax:0, serviceFee:0, total:0 }),
}));
