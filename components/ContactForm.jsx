'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Send } from 'lucide-react';
import { track } from '../lib/analytics';

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

const inputClass =
  'mt-1.5 w-full rounded-[3px] border border-white/15 bg-white/5 px-3.5 py-3 font-sans text-sm text-zinc-100 outline-none transition-colors placeholder:text-zinc-500 focus:border-lime-400';

const labelClass = 'block font-mono text-xs text-[#A1A1AA]';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);

  const set = (key) => (e) => {
    const value = e.target.value;
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((err) => (err[key] ? { ...err, [key]: undefined } : err));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const next = {};
    if (!form.name.trim()) next.name = 'Name is required';
    if (!form.email.trim()) next.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      next.email = 'Enter a valid email address';
    if (!form.message.trim()) next.message = 'Message is required';
    setErrors(next);
    if (Object.keys(next).length) return;

    setSending(true);
    try {
      const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: SERVICE_ID,
          template_id: TEMPLATE_ID,
          user_id: PUBLIC_KEY,
          template_params: {
            name: form.name.trim(),
            email: form.email.trim(),
            message: form.message.trim(),
            time: new Date().toLocaleString('en-GB', {
              dateStyle: 'medium',
              timeStyle: 'short',
            }),
          },
        }),
      });
      if (!res.ok) throw new Error('EmailJS send failed');
      track('contact_form_submitted');
      toast.success('Message sent');
      setForm({ name: '', email: '', message: '' });
    } catch {
      toast.error('Could not send your message', {
        description: 'Please try again, or use WhatsApp or email above.',
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={onSubmit} noValidate className="mt-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={labelClass}>
            Name <span className="text-red-400">*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            value={form.name}
            onChange={set('name')}
            placeholder="Your name"
            className={`${inputClass} ${errors.name ? 'border-red-400' : ''}`}
          />
          {errors.name && (
            <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>
          )}
        </div>
        <div>
          <label htmlFor="contact-email" className={labelClass}>
            Email <span className="text-red-400">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            value={form.email}
            onChange={set('email')}
            placeholder="you@company.com"
            className={`${inputClass} ${errors.email ? 'border-red-400' : ''}`}
          />
          {errors.email && (
            <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>
          )}
        </div>
      </div>
      <div className="mt-4">
        <label htmlFor="contact-message" className={labelClass}>
          Message <span className="text-red-400">*</span>
        </label>
        <textarea
          id="contact-message"
          rows={4}
          value={form.message}
          onChange={set('message')}
          placeholder="Project details, timeline, anything useful"
          className={`${inputClass} resize-none ${errors.message ? 'border-red-400' : ''}`}
        />
        {errors.message && (
          <p className="mt-1.5 text-xs text-red-400">{errors.message}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={sending}
        className="mt-5 inline-flex cursor-pointer items-center gap-2 bg-[#A3E635] px-6 py-3.5 font-sans text-sm font-bold text-black transition-colors hover:bg-[#b9f04e] disabled:cursor-wait disabled:opacity-70"
      >
        <Send size={16} />
        {sending ? 'Sending...' : 'Send message'}
      </button>
    </form>
  );
}
