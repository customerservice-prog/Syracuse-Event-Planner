import { create } from 'zustand';
import {
  type EventType,
  type PackageTier,
  type ServiceSelection,
  calculateTotals,
} from '@/lib/pricing-math';

export type { EventType, PackageTier };
export type { ServiceSelection as Services };

export interface QuoteState {
  eventType: EventType;
  guestCount: number;
  services: ServiceSelection;
  selectedPackage: PackageTier | null;
  subtotal: number;
  tax: number;
  serviceFee: number;
  total: number;
  contactEmail: string;
  contactName: string;
  step: number;
  setEventType: (t: EventType) => void;
  setGuestCount: (n: number) => void;
  toggleService: (k: keyof ServiceSelection) => void;
  selectPackage: (t: PackageTier) => void;
  setContact: (name: string, email: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  calculateQuote: () => void;
  reset: () => void;
}

const defaultServices: ServiceSelection = {
  venue: true,
  catering: true,
  photography: false,
  videography: false,
  decor: false,
  entertainment: false,
  security: false,
  transportation: false,
};

export const useQuoteStore = create<QuoteState>((set, get) => ({
  eventType: 'wedding',
  guestCount: 100,
  services: { ...defaultServices },
  selectedPackage: 'signature',
  subtotal: 0,
  tax: 0,
  serviceFee: 0,
  total: 0,
  contactEmail: '',
  contactName: '',
  step: 1,
  setEventType: (eventType) => {
    set({ eventType });
    get().calculateQuote();
  },
  setGuestCount: (guestCount) => {
    set({ guestCount });
    get().calculateQuote();
  },
  toggleService: (k) => {
    const services = { ...get().services, [k]: !get().services[k] };
    set({ services });
    get().calculateQuote();
  },
  selectPackage: (selectedPackage) => {
    set({ selectedPackage });
    get().calculateQuote();
  },
  setContact: (contactName, contactEmail) => set({ contactName, contactEmail }),
  nextStep: () => set((s) => ({ step: Math.min(s.step + 1, 5) })),
  prevStep: () => set((s) => ({ step: Math.max(s.step - 1, 1) })),
  calculateQuote: () => {
    const { services, guestCount, eventType, selectedPackage } = get();
    const { subtotal, tax, serviceFee, total } = calculateTotals(
      services,
      guestCount,
      eventType,
      selectedPackage,
    );
    set({ subtotal, tax, serviceFee, total });
  },
  reset: () => {
    set({
      step: 1,
      eventType: 'wedding',
      guestCount: 100,
      services: { ...defaultServices },
      selectedPackage: 'signature',
      contactEmail: '',
      contactName: '',
      subtotal: 0,
      tax: 0,
      serviceFee: 0,
      total: 0,
    });
    get().calculateQuote();
  },
}));
