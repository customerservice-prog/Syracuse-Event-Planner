import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

export const SYRACUSE_SALES_TAX = 0.08; // 8% Onondaga County sales tax

export function calculateTaxAndFees(subtotal: number) {
  const tax = subtotal * SYRACUSE_SALES_TAX;
  const serviceFee = subtotal * 0.05;
  return { tax, serviceFee, total: subtotal + tax + serviceFee };
}
