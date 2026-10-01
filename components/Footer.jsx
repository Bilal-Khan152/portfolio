'use client';

import { useState } from 'react';
import Reveal from './Reveal';
import { ArrowUpRight, Copy, Check } from 'lucide-react';

const EMAIL = 'bilalkhandev66@gmail.com';
const LINKEDIN = 'https://www.linkedin.com/in/muhammad-bilal-engineer';

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = EMAIL;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
                <span className="text-[#A3E635]">——</span>&nbsp;&nbsp;Have a product challenge?
              </p>
              <h2 className="font-sans font-extrabold tracking-tight text-4xl md:text-6xl mt-4">
                Let&apos;s make the complicated
                <br />
                feel <span className="text-[#A3E635]">simple.</span>
              </h2>
              <p className="text-[#A1A1AA] max-w-xl leading-relaxed mt-6">
                I&apos;m open to product engineering opportunities, thoughtful collaborations, and
                conversations about turning complex requirements into better web experiences.
              </p>

              <div className="flex flex-wrap gap-3 mt-8">
                <a
                  href={`mailto:${EMAIL}`}
                  className="inline-flex items-center gap-2 bg-[#A3E635] text-black font-sans font-bold text-sm px-6 py-3.5"
                >
                  Email me
                  <ArrowUpRight size={16} />
                </a>
                <a
                  href={LINKEDIN}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-white/30 text-white font-sans font-bold text-sm px-6 py-3.5"
                >
                  LinkedIn
                  <ArrowUpRight size={16} />
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="inline-flex items-center gap-2 bg-white text-black font-sans font-bold text-sm px-6 py-3.5"
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  {copied ? 'Copied' : 'Copy email'}
                </button>
              </div>

              <div className="mt-16 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-2">
                <p className="font-mono text-[11px] text-[#6B7280]">
                  MUHAMMAD BILAL · FRONTEND &amp; PRODUCT ENGINEER
                </p>
                <p className="font-mono text-[11px] text-[#6B7280]">
                  PRODUCT ENGINEERING · REACT · NEXT.JS
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
