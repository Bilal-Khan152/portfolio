'use client';

import { useState } from 'react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';

const products = [
  {
    title: 'COVIS AI',
    tag: 'AI-powered multi-tenant SaaS',
    description:
      'Frontend engineering for an AI-powered multi-tenant SaaS platform — complex dashboards, scalable architecture, and product workflows built to serve many customers from a single codebase.',
    link: 'https://covis.ai/',
    linkLabel: 'Visit live product',
  },
  {
    title: 'FR-Survey',
    tag: 'Restaurant management system',
    description:
      'Associate Software Engineer on a restaurant management system — surveys, reporting, and operational tooling designed around how restaurant teams actually work.',
  },
  {
    title: 'Car Management System',
    tag: 'Learning project',
    description:
      'A full learning build with role-based access control, a real-time chat system, and notifications — built with React, Context API, Firebase, and Tailwind CSS.',
    tech: ['React', 'Context API', 'Firebase', 'Tailwind CSS'],
  },
];

function ProductCard({ product }) {
  const inner = (
    <>
      <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
        {product.tag}
      </p>
      <h3 className="mt-2 text-2xl font-semibold text-zinc-900 dark:text-white">
        {product.title}
      </h3>
      <p className="mt-3 leading-relaxed text-zinc-600 dark:text-zinc-400">
        {product.description}
      </p>
      {product.tech && (
        <div className="mt-4 flex flex-wrap gap-2">
          {product.tech.map((t) => (
            <span
              key={t}
              className="rounded-full border border-zinc-200 px-3 py-1 text-xs font-medium text-zinc-600 dark:border-zinc-700 dark:text-zinc-400"
            >
              {t}
            </span>
          ))}
        </div>
      )}
      {product.link && (
        <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300">
          {product.linkLabel}
          <ArrowUpRight size={16} />
        </span>
      )}
    </>
  );

  const classes =
    'block rounded-2xl border border-zinc-200 bg-white p-8 transition-colors hover:border-emerald-400 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-emerald-700';

  return product.link ? (
    <a href={product.link} target="_blank" rel="noopener noreferrer" className={classes}>
      {inner}
    </a>
  ) : (
    <div className={classes}>{inner}</div>
  );
}

export default function Products() {
  const [expanded, setExpanded] = useState(false);
  const visible = products.slice(0, 2);
  const hidden = products.slice(2);

  return (
    <section id="products" className="scroll-mt-24 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
          Products
        </p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
          Things I&apos;ve built
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {visible.map((p) => (
            <ProductCard key={p.title} product={p} />
          ))}
        </div>

        <div
          className={`grid overflow-hidden transition-[grid-template-rows] duration-500 ease-in-out ${
            expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
          }`}
        >
          <div className="min-h-0">
            <div className="grid gap-6 pt-6 md:grid-cols-2">
              {hidden.map((p) => (
                <ProductCard key={p.title} product={p} />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
            className="inline-flex items-center gap-2 rounded-full border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-700 transition-colors hover:border-emerald-500 hover:text-emerald-600 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-emerald-400 dark:hover:text-emerald-400"
          >
            {expanded ? 'Show less' : 'Show more'}
            <ChevronDown size={16} className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>
    </section>
  );
}
