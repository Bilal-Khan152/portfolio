'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Reveal from './Reveal';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';

const testimonials = [
  {
    name: 'Shehroz Ahmed',
    title: 'Software Engineer | Business Developer | Client Acquisition & Web Solutions',
    location: 'Islamabad, Islāmābād, Pakistan',
    photo: '/shehroz.png',
    linkedin: 'https://www.linkedin.com/in/shehrozahmed7',
    quote:
      'I had the opportunity to work with Bilal on a Point of Sale project for one of my clients. He was responsible for handling the frontend development of the system and demonstrated a strong technical understanding throughout the project. Bilal has a great ability to break down complex problems into smaller, manageable tasks and approach them with a clear and structured mindset. He communicates and collaborates well with the team, takes ownership of his work, and is capable of handling challenging frontend requirements effectively. Overall, working with Bilal was a great experience. His technical skills, problem-solving approach, and ability to collaborate make him a valuable developer to work with.',
  },
  {
    name: 'Muhammad Irfan',
    title: 'ML Engineer | Python • SQL • API Integrations | AI Agents, Predictive Models',
    location: 'Lahore, Punjab, Pakistan',
    photo: '/irfan.png',
    linkedin: 'https://www.linkedin.com/in/mirfan120/?skipRedirect=true',
    quote:
      'It was a privilege working with Bilal on a Car Management System project, and it was an outstanding experience. He consistently displayed professionalism, teamwork, and a problem-solving mindset, handling challenges with positivity and precision. His attention to detail, technical expertise, and supportive attitude made collaboration both smooth and enjoyable. Bilal\u2019s dedication and cooperative spirit make him a valuable asset to any team. I\u2019m truly grateful for the opportunity to work with him and would be delighted to collaborate again in the future.',
  },
  {
    name: 'Usman Younas',
    title: 'Full-Stack Developer | React.js • Next.js • NestJS | PostgreSQL | JavaScript | Redux Toolkit | Tailwind CSS',
    photo: '/usman.png',
    linkedin: 'https://www.linkedin.com/in/usman-younas-2aa830262/',
    quote:
      'It was a pleasure working with Bilal on the COVIS AI project. He has a good combination of technical skills and professionalism. He is always willing to learn, share ideas, and work together as a team. I really enjoyed working with him and appreciated his positive attitude and dedication. Wishing him all the best for his future journey!',
  },
];

function TestimonialCard({ testimonial: t, isExpanded, onToggleExpand }) {
  const quoteRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState('5.5rem');

  useEffect(() => {
    const updateHeight = () => {
      if (quoteRef.current) {
        setMaxHeight(isExpanded ? `${quoteRef.current.scrollHeight}px` : '5.5rem');
      }
    };
    const rafId = requestAnimationFrame(updateHeight);
    window.addEventListener('resize', updateHeight);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', updateHeight);
    };
  }, [isExpanded]);

  return (
    <div className="w-full shrink-0 p-8 md:p-10">
      <div className="grid md:grid-cols-12 gap-8">
        <div className="md:col-span-4 flex md:block items-start gap-5">
          {t.photo ? (
            <Image
              src={t.photo}
              alt={t.name}
              width={96}
              height={96}
              className="w-24 h-24 rounded-lg object-cover shrink-0"
            />
          ) : (
            <div className="w-24 h-24 rounded-lg shrink-0 flex items-center justify-center bg-zinc-200 dark:bg-white/10">
              <span className="font-sans font-bold text-2xl text-zinc-600 dark:text-zinc-300">
                {t.name
                  .split(' ')
                  .map((w) => w[0])
                  .join('')
                  .slice(0, 2)
                  .toUpperCase()}
              </span>
            </div>
          )}
          <div className="md:mt-5">
            <p className="font-sans font-bold text-[#09090B] dark:text-[#FAFAFA]">{t.name}</p>
            <p className="text-sm text-[#52525B] dark:text-[#A1A1AA] mt-1">{t.title}</p>
            {t.location && (
              <p className="font-mono text-[11px] text-[#52525B] dark:text-[#A1A1AA] mt-2">
                {t.location}
              </p>
            )}
          </div>
        </div>
        <div className="md:col-span-8">
          <div className="relative">
            <div
              style={{ maxHeight }}
              className="overflow-hidden transition-[max-height] duration-500 ease-in-out"
            >
              <blockquote
                ref={quoteRef}
                className="text-lg leading-relaxed text-[#52525B] dark:text-[#A1A1AA]"
              >
                {t.quote}
              </blockquote>
            </div>
            <div
              className={`pointer-events-none absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white dark:from-[#131316] to-transparent transition-opacity duration-300 ${
                isExpanded ? 'opacity-0' : 'opacity-100'
              }`}
            />
          </div>
          <button
            type="button"
            onClick={onToggleExpand}
            className="font-mono text-xs font-bold underline underline-offset-4 text-[#09090B] dark:text-[#FAFAFA] mt-4 cursor-pointer transition-colors hover:text-blue-600 dark:hover:text-blue-400"
          >
            {isExpanded ? 'Show less' : 'Read more'}
          </button>
          <div className="mt-6">
            {t.linkedin && (
              <a
                href={t.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-mono text-xs text-[#2563EB] underline underline-offset-4"
              >
                VIEW LINKEDIN PROFILE
                <ArrowUpRight size={14} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);
  const total = testimonials.length;

  const prev = () => {
    setExpandedIndex(null);
    setIndex((i) => (i - 1 + total) % total);
  };
  const next = () => {
    setExpandedIndex(null);
    setIndex((i) => (i + 1) % total);
  };
  const pad = (n) => String(n).padStart(2, '0');

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEndX(null);
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    if (distance > minSwipeDistance && total > 1) {
      next();
    } else if (distance < -minSwipeDistance && total > 1) {
      prev();
    }
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      next();
    }
  };

  return (
    <section id="reviews">
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <Reveal>
          <div className="flex items-center justify-between gap-6">
            <h2 className="font-sans font-bold tracking-tight text-2xl md:text-3xl text-[#09090B] dark:text-[#FAFAFA]">
              Product Owners &amp; Colleagues Reviews
            </h2>
            <div className="flex items-center gap-3 shrink-0">
              <span className="font-mono text-xs text-[#52525B] dark:text-[#A1A1AA]">
                {pad(index + 1)} / {pad(total)}
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={prev}
                  disabled={total <= 1}
                  aria-label="Previous review"
                  className="w-10 h-10 cursor-pointer border border-[#E4E4E7] dark:border-white/10 bg-white dark:bg-[#131316] flex items-center justify-center text-[#09090B] dark:text-[#FAFAFA] transition-opacity disabled:opacity-40 hover:border-[#09090B] dark:hover:border-white/40"
                >
                  <ArrowLeft size={16} />
                </button>
                <button
                  type="button"
                  onClick={next}
                  disabled={total <= 1}
                  aria-label="Next review"
                  className="w-10 h-10 cursor-pointer border border-[#E4E4E7] dark:border-white/10 bg-white dark:bg-[#131316] flex items-center justify-center text-[#09090B] dark:text-[#FAFAFA] transition-opacity disabled:opacity-40 hover:border-[#09090B] dark:hover:border-white/40"
                >
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div
            tabIndex={0}
            onKeyDown={onKeyDown}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            aria-label="Reviews horizontal slider"
            className="mt-8 border border-dashed border-zinc-300 dark:border-white/20 bg-white dark:bg-[#131316] overflow-hidden focus:outline-none focus-visible:ring-1 focus-visible:ring-zinc-400"
          >
            <div
              className="flex transition-transform duration-500 ease-out will-change-transform items-start"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {testimonials.map((t, idx) => (
                <TestimonialCard
                  key={t.name}
                  testimonial={t}
                  isExpanded={expandedIndex === idx}
                  onToggleExpand={() =>
                    setExpandedIndex((curr) => (curr === idx ? null : idx))
                  }
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
