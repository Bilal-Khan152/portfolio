'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Buttery inertial smooth scrolling (Lenis). Skipped entirely when the user
 * prefers reduced motion. Anchor links (e.g. #work) are handled by Lenis too,
 * so the CSS `scroll-behavior: smooth` was removed to avoid conflicts.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      anchors: true,
    });
    // Shared so UI like BackToTop can ride the same glide.
    window.__lenis = lenis;

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return null;
}
