'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Fade-up reveal on scroll into view. Respects prefers-reduced-motion.
 *
 * The observer triggers well BEFORE the section reaches the viewport
 * (480px root margin), so fast scrolling never shows an empty black gap —
 * content is already in place by the time it scrolls into view.
 * A fail-safe timeout guarantees content can never stay hidden if the
 * observer stalls.
 */
export default function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
      return;
    }
    // Fail-safe: never leave content hidden.
    const failsafe = setTimeout(() => setVisible(true), 2500);
    if (typeof IntersectionObserver === 'undefined') {
      return () => clearTimeout(failsafe);
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          clearTimeout(failsafe);
          observer.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px 480px 0px' }
    );
    observer.observe(el);
    return () => {
      clearTimeout(failsafe);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`${className} transition-all duration-700 ease-out will-change-transform ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
    >
      {children}
    </div>
  );
}
