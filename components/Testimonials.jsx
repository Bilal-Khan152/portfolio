'use client';

import { useState } from 'react';
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
    quote:
      'It was a privilege working with Bilal on a Car Management System project, and it was an outstanding experience. He consistently displayed professionalism, teamwork, and a problem-solving mindset, handling challenges with positivity and precision. His attention to detail, technical expertise, and supportive attitude made collaboration both smooth and enjoyable. Bilal\u2019s dedication and cooperative spirit make him a valuable asset to any team. I\u2019m truly grateful for the opportunity to work with him and would be delighted to collaborate again in the future.',
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const total = testimonials.length;
  const t = testimonials[index];

  const prev = () => {
    setExpanded(false);
    setIndex((i) => (i - 1 + total) % total);
  };
  const next = () => {
    setExpanded(false);
    setIndex((i) => (i + 1) % total);
  };
  const pad = (n) => String(n).padStart(2, '0');

  return (
    <section id="reviews">
      <div className="max-w-6xl mx-auto px-6 py-24 md:py-32">
        <Reveal>
          <div className="flex items-center justify-between gap-6">
            <h2 className="font-sans font-bold tracking-tight text-2xl md:text-3xl text-[#09090B] dark:text-[#FAFAFA]">
              Reviews
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
            key={index}
            className="mt-8 border border-dashed border-zinc-300 dark:border-white/20 bg-white dark:bg-[#131316] p-8 md:p-10"
          >
            <div className="grid md:grid-cols-12 gap-8">
              <div className="md:col-span-4 flex md:block items-start gap-5">
                <Image
                  src={t.photo}
                  alt={t.name}
                  width={96}
                  height={96}
                  className="w-24 h-24 rounded-lg object-cover shrink-0"
                />
                <div className="md:mt-5">
                  <p className="font-sans font-bold text-[#09090B] dark:text-[#FAFAFA]">{t.name}</p>
                  <p className="text-sm text-[#52525B] dark:text-[#A1A1AA] mt-1">{t.title}</p>
                  <p className="font-mono text-[11px] text-[#52525B] dark:text-[#A1A1AA] mt-2">
                    {t.location}
                  </p>
                </div>
              </div>
              <div className="md:col-span-8">
                <blockquote
                  className={`text-lg leading-relaxed text-[#52525B] dark:text-[#A1A1AA] ${
                    expanded ? '' : 'line-clamp-3'
                  }`}
                >
                  {t.quote}
                </blockquote>
                <button
                  type="button"
                  onClick={() => setExpanded((v) => !v)}
                  className="font-mono text-xs font-bold underline underline-offset-4 text-[#09090B] dark:text-[#FAFAFA] mt-4 cursor-pointer"
                >
                  {expanded ? 'Show less' : 'Read more'}
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
        </Reveal>
      </div>
    </section>
  );
}
