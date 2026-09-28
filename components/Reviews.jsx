'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import LinkedInIcon from './LinkedInIcon';

const reviews = [
  {
    name: 'Shehroz Ahmed',
    title: 'Software Engineer | Business Developer | Client Acquisition & Web Solutions',
    location: 'Islamabad, Pakistan',
    photo: '/shehroz.png',
    linkedin: 'https://www.linkedin.com/in/shehrozahmed7/',
    text: "I had the opportunity to work with Bilal on a Point of Sale project for one of my clients. He was responsible for handling the frontend development of the system and demonstrated a strong technical understanding throughout the project. Bilal has a great ability to break down complex problems into smaller, manageable tasks and approach them with a clear and structured mindset. He communicates and collaborates well with the team, takes ownership of his work, and is capable of handling challenging frontend requirements effectively. Overall, working with Bilal was a great experience. His technical skills, problem-solving approach, and ability to collaborate make him a valuable developer to work with.",
  },
];

export default function Reviews() {
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const review = reviews[index];

  const go = (dir) => {
    setExpanded(false);
    setIndex((i) => (i + dir + reviews.length) % reviews.length);
  };

  return (
    <section id="reviews" className="scroll-mt-24 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
          Reviews
        </p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
          Product Owners &amp; Colleagues Review
        </h2>

        <div className="mt-10 flex items-stretch gap-3 sm:gap-4">
          <button
            onClick={() => go(-1)}
            aria-label="Previous review"
            className="flex w-11 shrink-0 items-center justify-center rounded-xl border border-zinc-200 text-zinc-500 transition-colors hover:border-emerald-500 hover:text-emerald-600 disabled:opacity-40 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-emerald-400 dark:hover:text-emerald-400"
            disabled={reviews.length <= 1}
          >
            <ChevronLeft size={22} />
          </button>

          <article
            key={index}
            className="min-w-0 flex-1 rounded-2xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <Quote size={28} className="text-emerald-500" />
            {/* Long reviews clamp with a smooth Read more / Show less expand */}
            <div className="relative">
              <div
                className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${
                  expanded ? 'max-h-[1200px]' : 'max-h-36'
                }`}
              >
                <p className="mt-4 leading-relaxed text-zinc-600 dark:text-zinc-300">
                  {review.text}
                </p>
              </div>
              {!expanded && (
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent dark:from-zinc-900"
                />
              )}
            </div>
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-3 text-sm font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
            >
              {expanded ? 'Show less' : 'Read more'}
            </button>

            <div className="mt-6 flex items-center gap-4 border-t border-zinc-100 pt-6 dark:border-zinc-800">
              <Image
                src={review.photo}
                alt={`Photo of ${review.name}`}
                width={56}
                height={56}
                className="h-14 w-14 rounded-full object-cover"
              />
              <div className="min-w-0">
                <p className="font-semibold text-zinc-900 dark:text-white">{review.name}</p>
                <p className="truncate text-sm text-zinc-500 dark:text-zinc-400">{review.title}</p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">{review.location}</p>
              </div>
              <a
                href={review.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${review.name} on LinkedIn`}
                className="ml-auto inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-zinc-200 text-zinc-500 transition-colors hover:border-emerald-500 hover:text-emerald-600 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-emerald-400 dark:hover:text-emerald-400"
              >
                <LinkedInIcon size={18} />
              </a>
            </div>
          </article>

          <button
            onClick={() => go(1)}
            aria-label="Next review"
            className="flex w-11 shrink-0 items-center justify-center rounded-xl border border-zinc-200 text-zinc-500 transition-colors hover:border-emerald-500 hover:text-emerald-600 disabled:opacity-40 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-emerald-400 dark:hover:text-emerald-400"
            disabled={reviews.length <= 1}
          >
            <ChevronRight size={22} />
          </button>
        </div>

        {reviews.length > 1 && (
          <div className="mt-4 flex justify-center gap-2">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setExpanded(false);
                  setIndex(i);
                }}
                aria-label={`Go to review ${i + 1}`}
                className={`h-2.5 w-2.5 rounded-full transition-colors ${
                  i === index ? 'bg-emerald-500' : 'bg-zinc-300 dark:bg-zinc-700'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
