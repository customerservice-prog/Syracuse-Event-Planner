'use client';
import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import {
  sitePhoneDisplay,
  sitePhoneTel,
  siteEmail,
  siteAddress,
  siteHours,
} from '@/lib/site-public';

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    date: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        toast.error(data.error ?? 'Could not send message.');
        return;
      }
      setSubmitted(true);
      toast.success('Message sent! We respond within 2 hours.');
    } catch {
      toast.error('Network error. Try again shortly.');
    } finally {
      setSending(false);
    }
  };

  const ic =
    'w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-gold-400';

  const contactRows = [
    {
      icon: Phone,
      label: 'Phone',
      value: sitePhoneDisplay,
      href: `tel:${sitePhoneTel}` as const,
    },
    {
      icon: Mail,
      label: 'Email',
      value: siteEmail,
      href: `mailto:${siteEmail}` as const,
    },
    { icon: MapPin, label: 'Office', value: siteAddress, href: null },
    { icon: Clock, label: 'Hours', value: siteHours, href: null },
  ];

  return (
    <div className="pt-24">
      <section className="section-padding text-center bg-navy-950 relative overflow-hidden">
        <div className="absolute inset-0 hero-pattern" />
        <div className="relative z-10 container-max">
          <h1 className="font-display text-5xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-white/50 text-xl">We respond within 2 hours.</p>
        </div>
      </section>
      <section className="section-padding bg-navy-950">
        <div className="container-max grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <div className="space-y-6">
              {contactRows.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl gold-gradient flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-navy-950" />
                  </div>
                  <div>
                    <div className="text-white/40 text-xs uppercase tracking-wider mb-1">{label}</div>
                    {href ? (
                      <a href={href} className="text-white hover:text-gold-400">
                        {value}
                      </a>
                    ) : (
                      <span className="text-white">{value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="glass-card p-8">
            {submitted ? (
              <div className="text-center py-12">
                <CheckCircle className="w-16 h-16 text-gold-400 mx-auto mb-4" />
                <h3 className="font-display text-2xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-white/50">We&apos;ll be in touch within 2 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="font-display text-2xl font-bold text-white mb-6">Send a Message</h2>
                <input
                  required
                  type="text"
                  className={ic}
                  placeholder="Your Name *"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <input
                  required
                  type="email"
                  className={ic}
                  placeholder="Email *"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <input
                  type="tel"
                  className={ic}
                  placeholder="Phone"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
                <div className="grid grid-cols-2 gap-4">
                  <select
                    className={ic}
                    value={form.eventType}
                    onChange={(e) => setForm({ ...form, eventType: e.target.value })}
                  >
                    <option value="">Event Type</option>
                    <option>Wedding</option>
                    <option>Corporate</option>
                    <option>Birthday</option>
                    <option>Gala</option>
                    <option>Other</option>
                  </select>
                  <input
                    type="date"
                    className={ic}
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                  />
                </div>
                <textarea
                  required
                  rows={4}
                  className={ic + ' resize-none'}
                  placeholder="Tell us about your event..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gold-500 text-navy-950 font-bold hover:bg-gold-400 transition-all disabled:opacity-60"
                >
                  <Send className="w-5 h-5" /> {sending ? 'Sending…' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
