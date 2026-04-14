import { NextResponse } from 'next/server';
import { z } from 'zod';
import { sendTransactionalEmail } from '@/lib/send-email';

const servicesSchema = z.object({
  venue: z.boolean(),
  catering: z.boolean(),
  photography: z.boolean(),
  videography: z.boolean(),
  decor: z.boolean(),
  entertainment: z.boolean(),
  security: z.boolean(),
  transportation: z.boolean(),
});

const bodySchema = z.object({
  eventType: z.string(),
  guestCount: z.number().int().min(1).max(50000),
  services: servicesSchema,
  selectedPackage: z.string().nullable(),
  subtotal: z.number(),
  tax: z.number(),
  serviceFee: z.number(),
  total: z.number(),
  contactName: z.string().min(1).max(200),
  contactEmail: z.string().email().max(320),
});

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid quote payload.', details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const d = parsed.data;
  const enabled = Object.entries(d.services)
    .filter(([, v]) => v)
    .map(([k]) => k)
    .join(', ');

  const html = `
    <h2>New quote request</h2>
    <p><strong>Name:</strong> ${escapeHtml(d.contactName)}</p>
    <p><strong>Email:</strong> ${escapeHtml(d.contactEmail)}</p>
    <p><strong>Event:</strong> ${escapeHtml(d.eventType)} · <strong>Guests:</strong> ${d.guestCount}</p>
    <p><strong>Package:</strong> ${escapeHtml(d.selectedPackage ?? '—')}</p>
    <p><strong>Services:</strong> ${escapeHtml(enabled || 'none selected')}</p>
    <p><strong>Subtotal:</strong> $${d.subtotal} · <strong>Tax:</strong> $${d.tax} · <strong>Fee:</strong> $${d.serviceFee}</p>
    <p><strong>Total:</strong> $${d.total}</p>
  `;

  const result = await sendTransactionalEmail(
    `Quote: ${d.contactName} (${d.eventType})`,
    html,
  );

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 503 });
  }

  return NextResponse.json({ ok: true });
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
