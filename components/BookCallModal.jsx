'use client';

import { useEffect, useState } from 'react';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { ArrowUpRight, X } from 'lucide-react';
import PhoneInput from './PhoneInput';

const WHATSAPP_NUMBER = '923139594577';

const labelClass =
  'font-mono text-[11px] tracking-wider text-zinc-500 uppercase dark:text-zinc-400';
const inputClass =
  'h-12 w-full rounded-[3px] border border-zinc-300 bg-white px-3.5 font-sans text-sm text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-lime-500 dark:border-white/15 dark:bg-white/5 dark:text-zinc-100';

/**
 * Book-a-call modal. No third-party booking tool: the form collects name,
 * optional email and a WhatsApp number, then hands off to a pre-filled
 * WhatsApp chat with Bilal.
 */
export default function BookCallModal({ onClose }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState({});

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

  const submit = (e) => {
    e.preventDefault();
    const next = {};
    if (name.trim().length < 2) next.name = 'Please add your name.';
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      next.email = 'That email does not look right.';
    if (!phone || !isValidPhoneNumber(phone))
      next.phone = 'Please add a valid phone number.';
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const lines = [
      'New 15-min call request',
      `Name: ${name.trim()}`,
      `Phone: ${phone}`,
    ];
    if (email.trim()) lines.push(`Email: ${email.trim()}`);
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`,
      '_blank',
    );
    onClose();
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
        aria-label="Book a 15-min call"
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

        <p className="flex items-center gap-2.5 font-mono text-[11px] tracking-widest text-zinc-500 dark:text-zinc-400">
          <span className="inline-block h-2 w-2 bg-lime-400" />
          BOOK A CALL
        </p>
        <h3 className="mt-3 font-sans text-2xl font-extrabold tracking-tight text-zinc-950 dark:text-white">
          Book a 15-min call
        </h3>
        <p className="mt-2 font-sans text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Fifteen minutes to talk through the idea, the scope, and the next
          steps. No pitch, no obligation.
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
            className="mt-2 inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-[3px] bg-lime-400 font-mono text-sm font-semibold text-zinc-950 transition-colors hover:bg-lime-300"
          >
            Confirm on WhatsApp
            <ArrowUpRight className="h-4 w-4" />
          </button>
          <p className="text-center font-sans text-xs text-zinc-500 dark:text-zinc-400">
            Opens WhatsApp with your details pre-filled. Just press send there.
          </p>
        </form>
      </div>
    </div>
  );
}
