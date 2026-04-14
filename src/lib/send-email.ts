export async function sendTransactionalEmail(
  subject: string,
  html: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_INBOX_EMAIL;
  const from = process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    return {
      ok: false,
      error:
        'Email is not configured. Set RESEND_API_KEY, CONTACT_INBOX_EMAIL, and RESEND_FROM_EMAIL in Railway variables.',
    };
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from, to: [to], subject, html }),
  });

  if (!response.ok) {
    const text = await response.text();
    console.error('Resend error:', response.status, text);
    return { ok: false, error: 'Failed to send email.' };
  }

  return { ok: true };
}
