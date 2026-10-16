'use client';

import { useId, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import Reveal from './Reveal';

const CENTER = { x: 200, y: 200 };

/**
 * Dark static architecture diagram: subtle grid, dashed curved connectors
 * from outer nodes into the center node. No animation — hardcoded boxes.
 */
function ArchitectureDiagram({
  center,
  centerTone = 'lime',
  nodes = [],
}) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const gridId = `arch-grid-${uid}`;
  const glowId = `arch-glow-${uid}`;

  const centerFill = centerTone === 'lime' ? '#A3E635' : '#2563EB';
  const centerText = centerTone === 'lime' ? '#09090B' : '#FFFFFF';

  const pathFor = (n) => {
    const mx = (n.x + CENTER.x) / 2;
    const my = (n.y + CENTER.y) / 2;
    const dx = CENTER.x - n.x;
    const dy = CENTER.y - n.y;
    const len = Math.hypot(dx, dy) || 1;
    const off = 26;
    const cx = mx + (-dy / len) * off;
    const cy = my + (dx / len) * off;
    return `M ${n.x} ${n.y} Q ${cx.toFixed(1)} ${cy.toFixed(1)} ${CENTER.x} ${CENTER.y}`;
  };

  const centerW = center.length * 9 + 40;
  const centerH = 46;

  return (
    <div className="relative h-full min-h-[320px] overflow-hidden bg-[#0B0E13] md:min-h-[400px]">
      <svg
        viewBox="0 0 400 400"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <pattern id={gridId} width="30" height="30" patternUnits="userSpaceOnUse">
            <path
              d="M 30 0 L 0 0 0 30"
              fill="none"
              stroke="rgba(255,255,255,0.055)"
              strokeWidth="1"
            />
          </pattern>
          <filter id={glowId} x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect width="400" height="400" fill={`url(#${gridId})`} />

        {/* connectors */}
        {nodes.map((n) => (
          <path
            key={`path-${n.label}`}
            d={pathFor(n)}
            fill="none"
            stroke="rgba(255,255,255,0.28)"
            strokeWidth="1.5"
            strokeDasharray="7 7"
          />
        ))}

        {/* outer nodes */}
        {nodes.map((n) => {
          const w = n.label.length * 7 + 26;
          const h = 32;
          return (
            <g key={`node-${n.label}`} opacity="0.95">
              <rect
                x={n.x - w / 2}
                y={n.y - h / 2}
                width={w}
                height={h}
                fill="rgba(255,255,255,0.03)"
                stroke={n.glow || 'rgba(255,255,255,0.35)'}
                strokeWidth="1.5"
                filter={n.glow ? `url(#${glowId})` : undefined}
              />
              <text
                x={n.x}
                y={n.y}
                dy="0.35em"
                textAnchor="middle"
                fill="#E4E4E7"
                fontSize="10"
                letterSpacing="1"
                style={{ fontFamily: 'monospace' }}
              >
                {n.label}
              </text>
            </g>
          );
        })}

        {/* center node */}
        <g filter={`url(#${glowId})`}>
          <rect
            x={CENTER.x - centerW / 2}
            y={CENTER.y - centerH / 2}
            width={centerW}
            height={centerH}
            fill={centerFill}
          />
          <text
            x={CENTER.x}
            y={CENTER.y}
            dy="0.35em"
            textAnchor="middle"
            fill={centerText}
            fontSize="13"
            fontWeight="800"
            letterSpacing="2"
            style={{ fontFamily: 'monospace' }}
          >
            {center}
          </text>
        </g>
      </svg>
    </div>
  );
}

const PROJECTS = [
  {
    num: '01',
    tag: 'MULTI-TENANT SAAS',
    company: 'XEVEN SOLUTIONS',
    title: 'COVIS AI',
    description:
      'An AI-powered platform for client management, tasks, business development, and onboarding. I develop and maintain the frontend across tenants and user roles, working with backend, AI, and QA teams.',
    chips: ['Next.js', 'JavaScript', 'Tailwind CSS', 'Shadcn', 'RTK Query', 'Sentry'],
    cta: { label: 'Visit product', href: 'https://covis.ai/' },
    type: 'product',
    diagram: {
      center: 'AI WORKSPACE',
      centerTone: 'lime',
      nodes: [
        { label: 'CLIENT MANAGEMENT', x: 100, y: 78 },
        { label: 'PROPOSAL GENERATION', x: 285, y: 78, glow: '#2563EB' },
        { label: 'PROJECT MANAGEMENT', x: 100, y: 322 },
        { label: 'HUMAN RESOURCE MANAGEMENT', x: 285, y: 322 },
      ],
    },
  },
  {
    num: '02',
    tag: 'OPERATIONS PLATFORM',
    company: 'HAZELSOFT',
    title: 'FR-Survey',
    description:
      'A restaurant management system for shift operations, customer feedback, reviews, and performance visibility. I helped build responsive interfaces aligned with business requirements.',
    chips: ['React.js', 'Redux', 'Axios', 'MUI', 'React-Bootstrap'],
    cta: null,
    type: 'product',
    diagram: {
      center: 'RESTAURANT OPS',
      centerTone: 'blue',
      nodes: [
        { label: 'SHIFTS', x: 100, y: 78 },
        { label: 'FEEDBACK', x: 300, y: 78 },
        { label: 'REVIEWS', x: 100, y: 322 },
        { label: 'INSIGHTS', x: 300, y: 322 },
      ],
    },
  },
  {
    num: '03',
    tag: 'LEARNING BUILD',
    company: 'PERSONAL',
    title: 'Car Management System',
    description:
      'A role-based car management app with a real-time chat system, notifications, and Firebase-backed data — built to explore product flows end to end.',
    chips: ['React.js', 'Context API', 'Firebase', 'Tailwind CSS'],
    cta: null,
    type: 'learning',
    diagram: {
      center: 'CAR SYSTEM',
      centerTone: 'lime',
      nodes: [
        { label: 'ROLES', x: 100, y: 78 },
        { label: 'CHAT', x: 300, y: 78 },
        { label: 'FIREBASE', x: 100, y: 322 },
        { label: 'ALERTS', x: 300, y: 322 },
      ],
    },
  },
];

const FILTERS = ['All work', 'Product', 'Learning build'];

function ProjectCard({ project }) {
  return (
    <article className="h-full border border-zinc-200 bg-white dark:border-white/10 dark:bg-zinc-900">
      <div className="grid h-full md:grid-cols-2">
        <div className="flex flex-col justify-between p-8 md:p-10">
          <div>
            <div className="flex items-center justify-between font-mono text-[11px] tracking-widest text-blue-600 dark:text-blue-500">
              <span>
                {project.num} · {project.tag}
              </span>
              <span>{project.company}</span>
            </div>
            <h3 className="mt-5 font-sans text-4xl font-extrabold tracking-tight text-zinc-950 md:text-5xl dark:text-white">
              {project.title}
            </h3>
            <p className="mt-4 leading-relaxed text-zinc-500 dark:text-zinc-400">
              {project.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.chips.map((chip) => (
                <span
                  key={chip}
                  className="border border-zinc-200 px-3 py-1.5 font-mono text-[11px] text-zinc-600 dark:border-white/10 dark:text-zinc-400"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
          {project.cta && (
            <a
              href={project.cta.href}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 self-start bg-lime-400 px-5 py-3 font-mono text-xs font-semibold tracking-wide text-zinc-950 transition-colors hover:bg-lime-300"
            >
              {project.cta.label}
              <ArrowUpRight size={14} />
            </a>
          )}
        </div>
        <ArchitectureDiagram
          center={project.diagram.center}
          centerTone={project.diagram.centerTone}
          nodes={project.diagram.nodes}
        />
      </div>
    </article>
  );
}

export default function Work() {
  const [filter, setFilter] = useState('All work');
  const [index, setIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

  const handleFilter = (f) => {
    setFilter(f);
    setIndex(0);
  };

  const matches = PROJECTS.filter((p) => {
    if (filter === 'Product') return p.type === 'product';
    if (filter === 'Learning build') return p.type === 'learning';
    return true;
  });

  const total = matches.length;
  const currentIndex = total > 0 ? Math.min(index, total - 1) : 0;

  const prev = () => {
    setIndex((i) => (i - 1 + total) % total);
  };
  const next = () => {
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
    <section id="work" className="border-t border-zinc-200 dark:border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="md:grid md:grid-cols-12 md:gap-8">
          <div className="md:col-span-3">
            <Reveal>
              <p className="font-mono text-xs text-zinc-500 dark:text-zinc-400">05 / 07</p>
              <p className="mt-2 font-mono text-sm text-zinc-900 dark:text-zinc-100">
                Selected work
              </p>
            </Reveal>
          </div>
          <div className="mt-10 md:col-span-9 md:mt-0">
            <Reveal>
              <h2 className="font-sans text-4xl font-bold tracking-tight text-zinc-950 md:text-6xl dark:text-white">
                From product questions to systems for real work.
              </h2>
            </Reveal>

            <Reveal delay={80}>
              <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {FILTERS.map((f) => {
                    const active = filter === f;
                    return (
                      <button
                        key={f}
                        type="button"
                        onClick={() => handleFilter(f)}
                        className={`cursor-pointer border px-4 py-2 font-mono text-xs transition-colors ${
                          active
                            ? 'border-zinc-950 bg-zinc-950 text-white dark:border-white dark:bg-white dark:text-zinc-950'
                            : 'border-zinc-300 text-zinc-500 hover:border-zinc-950 dark:border-white/15 dark:text-zinc-400 dark:hover:border-white/40'
                        }`}
                      >
                        {f}
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                  <span className="font-mono text-xs text-[#52525B] dark:text-[#A1A1AA]">
                    {pad(currentIndex + 1)} / {pad(total)}
                  </span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={prev}
                      disabled={total <= 1}
                      aria-label="Previous project"
                      className="w-10 h-10 cursor-pointer border border-[#E4E4E7] dark:border-white/10 bg-white dark:bg-[#131316] flex items-center justify-center text-[#09090B] dark:text-[#FAFAFA] transition-opacity disabled:opacity-40 hover:border-[#09090B] dark:hover:border-white/40"
                    >
                      <ArrowLeft size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={next}
                      disabled={total <= 1}
                      aria-label="Next project"
                      className="w-10 h-10 cursor-pointer border border-[#E4E4E7] dark:border-white/10 bg-white dark:bg-[#131316] flex items-center justify-center text-[#09090B] dark:text-[#FAFAFA] transition-opacity disabled:opacity-40 hover:border-[#09090B] dark:hover:border-white/40"
                    >
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div
                tabIndex={0}
                onKeyDown={onKeyDown}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                aria-label="Projects horizontal slider"
                className="mt-8 relative overflow-hidden focus:outline-none focus-visible:ring-1 focus-visible:ring-zinc-400"
              >
                <div
                  className="flex transition-transform duration-500 ease-out will-change-transform"
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  {matches.map((p) => (
                    <div key={p.num} className="w-full shrink-0">
                      <ProjectCard project={p} />
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
