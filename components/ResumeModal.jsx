'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowDown, X } from 'lucide-react';
import { track } from '../lib/analytics';

const PDF_URL = '/Bilal-Frontend-Engineer.pdf';

const iconButtonClass =
  'flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/15 text-zinc-200 transition-colors hover:border-white/40 hover:text-white';
const tooltipClass =
  'pointer-events-none absolute top-[calc(100%+8px)] left-1/2 z-10 -translate-x-1/2 scale-95 rounded-md bg-black px-2.5 py-1.5 font-mono text-[10px] tracking-wider whitespace-nowrap text-white uppercase opacity-0 shadow-lg ring-1 ring-white/15 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100';

/**
 * Résumé preview. Shows the résumé pages inside the portfolio as images
 * rendered from the PDF (public/resume-page-1.jpg, -2.jpg — regenerate
 * them whenever the PDF is replaced), so the preview looks identical in
 * every browser and has no PDF-viewer toolbar or zoom controls. Two
 * actions top-right: download the real PDF, or close. Rendered through
 * a portal at body level and scroll-locked, same pattern as
 * BookCallModal.
 */
export default function ResumeModal({ onClose }) {
  const [leaving, setLeaving] = useState(false);
  const closeTimer = useRef(null);
  const leavingRef = useRef(false);

  useEffect(() => {
    track('resume_preview_opened');
  }, []);

  // Play the exit fade, then let the parent unmount. Ref-guarded: the
  // scroll-lock effect below must never cancel this timer (see
  // BookCallModal for the freeze this prevents).
  const requestClose = () => {
    if (leavingRef.current) return;
    leavingRef.current = true;
    setLeaving(true);
    closeTimer.current = setTimeout(onClose, 200);
  };

  // Scroll lock: mount once, release on unmount only.
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

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Résumé preview"
      className={`fixed inset-0 z-[90] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm transition-opacity duration-200 ${leaving ? 'opacity-0' : 'opacity-100'}`}
    >
      <div
        data-lenis-prevent
        className="animate-fade-up flex h-[86vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#101014] shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5">
          <p className="font-mono text-[11px] tracking-widest text-zinc-400 uppercase">
            Résumé · Muhammad Bilal
          </p>
          <div className="flex items-center gap-2">
            <div className="group relative">
              <a
                href={PDF_URL}
                download="Bilal-Frontend-Engineer.pdf"
                onClick={() => track('resume_downloaded')}
                aria-label="Download résumé"
                className={iconButtonClass}
              >
                <ArrowDown size={17} />
              </a>
              <span className={tooltipClass}>Download</span>
            </div>
            <div className="group relative">
              <button
                type="button"
                onClick={requestClose}
                aria-label="Close preview"
                className={iconButtonClass}
              >
                <X size={17} />
              </button>
              <span className={tooltipClass}>Close</span>
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-3 overflow-y-auto bg-[#0B0D10] p-3 sm:p-4">
          <img
            src="/resume-page-1.jpg"
            alt="Résumé page 1"
            className="block h-auto w-full shadow-lg"
          />
          <img
            src="/resume-page-2.jpg"
            alt="Résumé page 2"
            className="block h-auto w-full shadow-lg"
          />
        </div>
      </div>
    </div>,
    document.body
  );
}
