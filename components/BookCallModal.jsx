'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { ArrowUpRight, X } from 'lucide-react';
import { toast } from 'sonner';
import PhoneInput from './PhoneInput';

const WHATSAPP_NUMBER = '923139594577';

const labelClass =
  'font-mono text-[11px] tracking-wider text-zinc-500 uppercase dark:text-zinc-400';
const inputClass =
  'h-12 w-full rounded-[3px] border border-zinc-300 bg-white px-3.5 font-sans text-sm text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-lime-500 dark:border-white/15 dark:bg-white/5 dark:text-zinc-100';

/**
 * Call-back modal. On submit the details go to /api/lead, which emails
 * Bilal via Resend. The result is reported with a toast (Sonner): success
 * closes the modal, failure keeps it open and offers a WhatsApp action as
 * a choice. The visitor is never auto-navigated anywhere.
 */
export default function BookCallModal({ onClose }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState(''); // honeypot, humans never fill it
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const closeTimer = useRef(null);
  const leavingRef = useRef(false);

  // Play the exit animation, then let the parent unmount. Guarded by a ref:
  // a state-guarded version re-triggers the effect below, whose cleanup
  // used to cancel this very timer, leaving an invisible overlay mounted
  // forever (page unscrollable, clicks dead).
  const requestClose = () => {
    if (leavingRef.current) return;
    leavingRef.current = true;
    setLeaving(true);
    closeTimer.current = setTimeout(onClose, 200);
  };

  // Scroll lock: mount once, release on unmount only. Must not depend on
  // `leaving` and must never clear the close timer.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') requestClose();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(
    () => () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    },
    [],
  );

  // Errors are added on submit only, but clear live as a field becomes
  // valid while the visitor is still typing.
  const clearError = (field) =>
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });

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

    const details = { name: name.trim(), email: email.trim(), phone, website, message: message.trim() };
    setSending(true);
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(details),
      });
      const data = await res.json().catch(() => null);
      if (!data?.ok) throw new Error('notify failed');
      toast.success('Request sent', {
        description: 'Expect a call back soon.',
      });
      requestClose();
    } catch {
      const lines = ['New call back request', `Name: ${details.name}`, `Phone: ${details.phone}`];
      if (details.email) lines.push(`Email: ${details.email}`);
      if (details.message) lines.push(`Message: ${details.message}`);
      toast.error('Could not send your request', {
        description: 'Try again, or send it on WhatsApp instead.',
        action: {
          label: 'WhatsApp',
          onClick: () =>
            window.open(
              `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`,
              '_blank',
            ),
        },
      });
    } finally {
      setSending(false);
    }
  };

  // Rendered through a portal at body level: the hero button that opens
  // this modal sits inside an animated (opacity) wrapper, which creates a
  // stacking context. Without the portal the modal's z-index is trapped
  // inside that wrapper and later hero elements (facts row, ticker) paint
  // over it.
  return createPortal(
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div
        aria-hidden="true"
        onClick={requestClose}
        className={`absolute inset-0 bg-zinc-950/80 backdrop-blur-sm ${leaving ? 'animate-modal-backdrop-out' : 'animate-modal-backdrop'}`}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Request a call back"
        data-lenis-prevent
        className={`scrollbar-hide relative max-h-[92vh] w-full max-w-md overflow-y-auto rounded-xl border border-zinc-200 bg-white p-6 shadow-2xl md:p-8 dark:border-white/10 dark:bg-zinc-900 ${leaving ? 'animate-modal-card-out' : 'animate-modal-card'}`}
      >
        <button
          type="button"
          onClick={requestClose}
          aria-label="Close"
          className="absolute top-4 right-4 cursor-pointer p-1.5 text-zinc-500 transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
        >
          <X className="h-5 w-5" />
        </button>

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
              <input
                type="text"
                name="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute -left-[9999px] h-px w-px opacity-0"
              />
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
                  onChange={(e) => {
                    setName(e.target.value);
                    if (e.target.value.trim().length >= 2) clearError('name');
                  }}
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
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (!e.target.value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value.trim()))
                      clearError('email');
                  }}
                  className={`${inputClass} mt-1.5 ${errors.email ? 'border-red-400 dark:border-red-400' : ''}`}
                />
                {errors.email && <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>}
              </div>

              <div>
                <span className={labelClass}>Phone number</span>
                <div className="mt-1.5">
                  <PhoneInput
                    value={phone}
                    onChange={(val) => {
                      setPhone(val);
                      if (val && isValidPhoneNumber(val)) clearError('phone');
                    }}
                    invalid={!!errors.phone}
                  />
                </div>
                {errors.phone && <p className="mt-1.5 text-xs text-red-500">{errors.phone}</p>}
              </div>

              <div>
                <label htmlFor="book-message" className={labelClass}>
                  Message <span className="text-zinc-400 normal-case">(optional)</span>
                </label>
                <textarea
                  id="book-message"
                  rows={3}
                  placeholder="A few words about the idea or project"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mt-1.5 w-full resize-none rounded-[3px] border border-zinc-300 bg-white px-3.5 py-3 font-sans text-sm text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-lime-500 dark:border-white/15 dark:bg-white/5 dark:text-zinc-100"
                />
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
      </div>
    </div>,
    document.body,
  );
}
