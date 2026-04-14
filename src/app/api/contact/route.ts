import { NextResponse } from 'next/server';
import { z } from 'zod';
import { logContactLead } from '@/lib/lead-log';
import { isResendConfigured, sendTransactionalEmail } from '@/lib/send-email';

const bodySchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().max(320),
  phone: z.string().max(40).optional(),
  eventType: z.string().max(80).optional(),
  date: z.string().max(40).optional(),
  message: z.string().min(1).max(8000),
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
      { error: 'Invalid form data.', details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { name, email, phone, eventType, date, message } = parsed.data;

  logContactLead({ name, email, phone, eventType, date, message });

  if (!isResendConfigured()) {
    return NextResponse.json({ ok: true, delivery: 'log' as const });
  }

  const html = `
    <h2>New contact — Syracuse Event Planner</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    ${phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ''}
    ${eventType ? `<p><strong>Event type:</strong> ${escapeHtml(eventType)}</p>` : ''}
    ${date ? `<p><strong>Date:</strong> ${escapeHtml(date)}</p>` : ''}
    <p><strong>Message:</strong></p>
    <pre style="white-space:pre-wrap;font-family:inherit">${escapeHtml(message)}</pre>
  `;

  const result = await sendTransactionalEmail(`Contact: ${name}`, html);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 502 });
  }

  return NextResponse.json({ ok: true, delivery: 'email' as const });
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
