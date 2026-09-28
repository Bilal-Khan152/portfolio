'use client';

import { useState } from 'react';
import { Copy, Check, Mail, Phone } from 'lucide-react';
import LinkedInIcon from './LinkedInIcon';

const email = 'bilalkhandev66@gmail.com';
const phone = '03139594577';

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = email;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer id="contact" className="scroll-mt-24 border-t border-zinc-200 bg-zinc-50 py-16 sm:py-20 dark:border-zinc-800 dark:bg-zinc-900/40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
          Contact
        </p>
        <h2 className="font-display mt-2 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
          Let&apos;s make the complicated feel simple.
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
          I&apos;m currently open to new opportunities and collaborations — if you have a product
          idea or a team that needs a product-minded frontend engineer, I&apos;d love to hear from you.
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          {/* Copy-email button: high contrast in both modes */}
          <div className="flex items-center gap-3 rounded-2xl border border-zinc-300 bg-white p-3 pl-5 dark:border-zinc-600 dark:bg-zinc-900">
            <Mail size={20} className="shrink-0 text-emerald-600 dark:text-emerald-400" />
            <span className="truncate text-sm font-medium text-zinc-800 sm:text-base dark:text-zinc-100">
              {email}
            </span>
            <button
              onClick={copyEmail}
              aria-label={copied ? 'Email copied' : 'Copy email address'}
              className="inline-flex h-11 shrink-0 items-center gap-2 rounded-xl bg-zinc-900 px-4 text-sm font-semibold text-white transition-colors hover:bg-emerald-600 dark:bg-emerald-600 dark:text-white dark:hover:bg-emerald-500"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>

          <a
            href={`tel:${phone}`}
            className="inline-flex h-14 items-center gap-2 rounded-2xl border border-zinc-300 bg-white px-6 text-sm font-semibold text-zinc-800 transition-colors hover:border-emerald-500 hover:text-emerald-600 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-emerald-400 dark:hover:text-emerald-400"
          >
            <Phone size={18} />
            {phone}
          </a>

          <a
            href="https://www.linkedin.com/in/muhammad-bilal-engineer"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Muhammad Bilal on LinkedIn"
            className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-zinc-300 bg-white text-zinc-800 transition-colors hover:border-emerald-500 hover:text-emerald-600 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-emerald-400 dark:hover:text-emerald-400"
          >
            <LinkedInIcon size={20} />
          </a>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-zinc-200 pt-6 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800 dark:text-zinc-500">
          <p>© {new Date().getFullYear()} Muhammad Bilal. All rights reserved.</p>
          <p>Frontend Engineer · Product Engineering</p>
        </div>
      </div>
    </footer>
  );
}
