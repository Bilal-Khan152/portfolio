'use client';

import { useEffect, useState } from 'react';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { ArrowUpRight, CheckCircle2, X } from 'lucide-react';
import PhoneInput from './PhoneInput';

const WHATSAPP_NUMBER = '923139594577';

const labelClass =
  'font-mono text-[11px] tracking-wider text-zinc-500 uppercase dark:text-zinc-400';
const inputClass =
  'h-12 w-full rounded-[3px] border border-zinc-300 bg-white px-3.5 font-sans text-sm text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-lime-500 dark:border-white/15 dark:bg-white/5 dark:text-zinc-100';

/**
 * Call-back modal. On submit the details go to /api/lead, which notifies
 * Bilal on WhatsApp and/or email (free tiers, keys in env vars). If that
 * route is not configured or fails, it falls back to opening a pre-filled
 * WhatsApp chat so the lead is never lost.
 */
export default function BookCallModal({ onClose }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    window.__lenis?.stop();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      window.__lenis?.start();
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  const submit = async (e) => {
    e.preventDefault();
    const next = {};
    if (name.trim().length < 2) next.name = 'Please add your name.';
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      next.email = 'That email does not look right.';
    if (!phone || !isValidPhoneNumber(phone))
      next.phone = 'Please add a valid phone number.';
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const details = { name: name.trim(), email: email.trim(), phone };
    setSending(true);
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(details),
      });
      const data = await res.json().catch(() => null);
      if (data?.ok) {
        setSent(true);
        return;
      }
      throw new Error('notify failed');
    } catch {
      const lines = ['New call back request', `Name: ${details.name}`, `Phone: ${details.phone}`];
      if (details.email) lines.push(`Email: ${details.email}`);
      window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`,
        '_blank',
      );
      onClose();
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 bg-zinc-950/70 backdrop-blur-sm"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Request a call back"
        className="animate-fade-up relative max-h-[92vh] w-full max-w-md overflow-y-auto rounded-xl border border-zinc-200 bg-white p-6 shadow-2xl md:p-8 dark:border-white/10 dark:bg-zinc-900"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 cursor-pointer p-1.5 text-zinc-500 transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
        >
          <X className="h-5 w-5" />
        </button>

        {sent ? (
          <div className="py-6 text-center">
            <CheckCircle2 className="mx-auto h-12 w-12 text-lime-500" />
            <h3 className="mt-4 font-sans text-2xl font-extrabold tracking-tight text-zinc-950 dark:text-white">
              Request sent
            </h3>
            <p className="mx-auto mt-2 max-w-xs font-sans text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              Thanks, {name.trim().split(' ')[0]}. Expect a call back soon.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 inline-flex h-12 cursor-pointer items-center justify-center rounded-[3px] bg-lime-400 px-8 font-mono text-sm font-semibold text-zinc-950 transition-colors hover:bg-lime-300"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <p className="flex items-center gap-2.5 font-mono text-[11px] tracking-widest text-zinc-500 dark:text-zinc-400">
              <span className="inline-block h-2 w-2 bg-lime-400" />
              CALL ME BACK
            </p>
            <h3 className="mt-3 font-sans text-2xl font-extrabold tracking-tight text-zinc-950 dark:text-white">
              Request a call back
            </h3>
            <p className="mt-2 font-sans text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              Leave your details and get a call back to talk through the idea,
              the scope, and the next steps.
            </p>

            <form onSubmit={submit} noValidate className="mt-6 flex flex-col gap-4">
              <div>
                <label htmlFor="book-name" className={labelClass}>
                  Name
                </label>
                <input
                  id="book-name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`${inputClass} mt-1.5 ${errors.name ? 'border-red-400 dark:border-red-400' : ''}`}
                />
                {errors.name && <p className="mt-1.5 text-xs text-red-500">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="book-email" className={labelClass}>
                  Email <span className="text-zinc-400 normal-case">(optional)</span>
                </label>
                <input
                  id="book-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`${inputClass} mt-1.5 ${errors.email ? 'border-red-400 dark:border-red-400' : ''}`}
                />
                {errors.email && <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>}
              </div>

              <div>
                <span className={labelClass}>Phone (WhatsApp)</span>
                <div className="mt-1.5">
                  <PhoneInput value={phone} onChange={setPhone} invalid={!!errors.phone} />
                </div>
                {errors.phone && <p className="mt-1.5 text-xs text-red-500">{errors.phone}</p>}
              </div>

              <button
                type="submit"
                disabled={sending}
                className="mt-2 inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-[3px] bg-lime-400 font-mono text-sm font-semibold text-zinc-950 transition-colors hover:bg-lime-300 disabled:cursor-wait disabled:opacity-70"
              >
                {sending ? 'Sending...' : 'Request call back'}
                <ArrowUpRight className="h-4 w-4" />
              </button>
              <p className="text-center font-sans text-xs text-zinc-500 dark:text-zinc-400">
                Your details go straight to Bilal. Nothing else.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
