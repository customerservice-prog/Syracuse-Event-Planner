/** Public contact copy — override via NEXT_PUBLIC_* on Railway / Vercel. */
export const sitePhoneDisplay =
  process.env.NEXT_PUBLIC_CONTACT_PHONE ?? '(315) 555-0192';
export const sitePhoneTel =
  process.env.NEXT_PUBLIC_CONTACT_PHONE_TEL ?? '3155550192';
export const siteEmail =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'hello@syracuseevents.com';
export const siteAddress =
  process.env.NEXT_PUBLIC_CONTACT_ADDRESS ??
  '300 Salina St, Syracuse, NY 13202';
export const siteHours =
  process.env.NEXT_PUBLIC_CONTACT_HOURS ??
  'Mon-Fri 9AM-7PM | Sat 10AM-5PM';
