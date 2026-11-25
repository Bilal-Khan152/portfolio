'use client';

import { useState } from 'react';
import Reveal from './Reveal';
import ContactForm from './ContactForm';
import { track } from '../lib/analytics';
import { ArrowUpRight, Copy, Check, Eye, MessageCircle } from 'lucide-react';
import ResumeModal from './ResumeModal';

const EMAIL = 'bilalkhandev66@gmail.com';
const WHATSAPP = 'https://wa.me/923139594577';
const PHONE_LABEL = '+92 313 9594577';
const LINKEDIN = 'https://www.linkedin.com/in/muhammad-bilal-engineer';

export default function Footer() {
  const [copiedKey, setCopiedKey] = useState(null);
  const [resumeOpen, setResumeOpen] = useState(false);

  const copyText = async (text, key) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <section id="contact">
      <div className="max-w-6xl mx-auto px-6 pb-10">
        <Reveal>
          <div className="relative overflow-hidden bg-[#0B0D10] text-white rounded-3xl p-8 md:p-16">
            {/* Decorative lime arcs, bottom-right */}
            <div aria-hidden="true" className="pointer-events-none absolute -right-40 -bottom-56 select-none">
              <div className="relative w-[560px] h-[560px]">
                <div className="absolute inset-0 rounded-full border-[28px] border-[#A3E635]/25" />
                <div className="absolute inset-16 rounded-full border-[28px] border-[#A3E635]/15" />
                <div className="absolute inset-32 rounded-full border-[28px] border-[#A3E635]/10" />
              </div>
            </div>

            <div className="relative">
              <p className="font-mono text-xs text-[#A1A1AA]">
                Have a product challenge?
              </p>
              <h2 className="font-sans font-extrabold tracking-tight text-4xl md:text-6xl mt-4">
                Making the complicated
                <br />
                feel <span className="text-[#A3E635]">simple.</span>
              </h2>
              <p className="text-[#A1A1AA] max-w-xl leading-relaxed mt-6">
                Have a project or a product idea? Connect and see what can be built together.
              </p>

              <div className="flex flex-wrap gap-3 mt-8">
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat on WhatsApp"
                  onClick={() => track('whatsapp_clicked')}
                  className="inline-flex cursor-pointer items-center gap-2 bg-[#A3E635] text-black font-sans font-bold text-sm px-6 py-3.5 transition-colors hover:bg-[#b9f04e]"
                >
                  <MessageCircle size={16} />
                  {PHONE_LABEL}
                </a>
                <a
                  href={LINKEDIN}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track('linkedin_clicked')}
                  className="inline-flex cursor-pointer items-center gap-2 border border-white/30 text-white font-sans font-bold text-sm px-6 py-3.5 transition-colors hover:border-white/60"
                >
                  LinkedIn
                  <ArrowUpRight size={16} />
                </a>
                <button
                  type="button"
                  onClick={() => { copyText(EMAIL, 'email'); track('email_copied'); }}
                  className="inline-flex cursor-pointer items-center gap-2 border border-white/30 text-white font-sans font-bold text-sm px-6 py-3.5 transition-colors hover:border-white/60"
                >
                  {copiedKey === 'email' ? <Check size={16} /> : <Copy size={16} />}
                  {copiedKey === 'email' ? 'Copied' : 'Copy email'}
                </button>
                <button
                  type="button"
                  onClick={() => setResumeOpen(true)}
                  className="inline-flex cursor-pointer items-center gap-2 border border-white/30 text-white font-sans font-bold text-sm px-6 py-3.5 transition-colors hover:border-white/60"
                >
                  View résumé
                  <Eye size={16} />
                </button>
              </div>

              <div className="mt-12 border-t border-white/10 pt-10">
                <p className="font-mono text-xs text-[#A1A1AA]">
                  Send a message
                </p>
                <ContactForm />
              </div>

              <div className="mt-16 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-2">
                <p className="font-mono text-[11px] text-[#6B7280]">
                  MUHAMMAD BILAL · SOFTWARE &amp; PRODUCT ENGINEER
                </p>
                <p className="font-mono text-[11px] text-[#6B7280]">
                  PRODUCT ENGINEERING · REACT · NEXT.JS
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
      {resumeOpen && <ResumeModal onClose={() => setResumeOpen(false)} />}
    </section>
  );
}
