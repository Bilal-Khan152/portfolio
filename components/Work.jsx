'use client';

import { useId, useState } from 'react';
import { ArrowDown, ArrowUp, ArrowUpRight } from 'lucide-react';
import Reveal from './Reveal';

const CENTER = { x: 200, y: 200 };

/**
 * Dark animated architecture diagram: subtle grid, dashed curved connectors
 * from outer nodes into the center, lime pulses traveling along each path,
 * and a pulsing halo around the center node.
 */
function ArchitectureDiagram({
  center,
  centerTone = 'lime',
  nodes = [],
  pulse = '#A3E635',
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
        preserveAspectRatio="xMidYMid slice"
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

        {/* traveling pulses */}
        {nodes.map((n, i) => {
          const d = pathFor(n);
          const dur = 2.8 + i * 0.7;
          return (
            <g key={`pulse-${n.label}`}>
              <circle r="4" fill={pulse} filter={`url(#${glowId})`}>
                <animateMotion dur={`${dur}s`} begin={`${i * 0.55}s`} repeatCount="indefinite" path={d} />
              </circle>
              <circle r="2.5" fill={pulse} opacity="0.85">
                <animateMotion
                  dur={`${dur}s`}
                  begin={`${i * 0.55 + dur / 2}s`}
                  repeatCount="indefinite"
                  path={d}
                />
              </circle>
            </g>
          );
        })}

        {/* outer nodes */}
        {nodes.map((n, i) => {
          const w = n.label.length * 8 + 30;
          const h = 32;
          return (
            <g key={`node-${n.label}`} opacity="0.9">
              <animate
                attributeName="opacity"
                values="0.65;1;0.65"
                dur={`${3 + i * 0.6}s`}
                repeatCount="indefinite"
              />
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
                fontSize="11"
                letterSpacing="1.5"
                style={{ fontFamily: 'monospace' }}
              >
                {n.label}
              </text>
            </g>
          );
        })}

        {/* center halo pulse */}
        <circle cx={CENTER.x} cy={CENTER.y} r="36" fill="none" stroke={centerFill} strokeWidth="1.5">
          <animate attributeName="r" values="36;88" dur="2.6s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.55;0" dur="2.6s" repeatCount="indefinite" />
        </circle>

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
        { label: 'CLIENTS', x: 78, y: 78 },
        { label: 'TASKS', x: 322, y: 78, glow: '#2563EB' },
        { label: 'PIPELINE', x: 78, y: 322 },
        { label: 'ONBOARD', x: 322, y: 322 },
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
        { label: 'SHIFTS', x: 78, y: 78 },
        { label: 'FEEDBACK', x: 322, y: 78 },
        { label: 'REVIEWS', x: 78, y: 322 },
        { label: 'INSIGHTS', x: 322, y: 322 },
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
        { label: 'ROLES', x: 78, y: 78 },
        { label: 'CHAT', x: 322, y: 78 },
        { label: 'FIREBASE', x: 78, y: 322 },
        { label: 'ALERTS', x: 322, y: 322 },
      ],
    },
  },
];

const FILTERS = ['All work', 'Product', 'Learning build'];

function ProjectCard({ project }) {
  return (
    <article className="border border-zinc-200 bg-white dark:border-white/10 dark:bg-zinc-900">
      <div className="grid md:grid-cols-2">
        <div className="flex flex-col p-8 md:p-10">
          <div className="flex items-center justify-between font-mono text-[11px] tracking-widest text-blue-600 dark:text-blue-500">
            <span>
              {project.num} · {project.tag}
            </span>
            <span>{project.company}</span>
          </div>
          <h3 className="mt-5 font-sans text-4xl font-extrabold tracking-tight text-zinc-950 md:text-5xl dark:text-white">
            {project.title}
          </h3>
          <p className="mt-4 flex-1 leading-relaxed text-zinc-500 dark:text-zinc-400">
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
          {project.cta && (
            <a
              href={project.cta.href}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 self-start bg-zinc-950 px-5 py-3 font-mono text-xs tracking-wide text-white dark:bg-white dark:text-zinc-950"
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
  const [showMore, setShowMore] = useState(false);

  const handleFilter = (f) => {
    setFilter(f);
    setShowMore(false);
  };

  const matches = PROJECTS.filter((p) => {
    if (filter === 'Product') return p.type === 'product';
    if (filter === 'Learning build') return p.type === 'learning';
    return true;
  });
  const productCards = matches.filter((p) => p.type === 'product');
  const extraCards = matches.filter((p) => p.type !== 'product');
  const extraExpanded = showMore || filter !== 'All work';

  return (
    <section id="work" className="border-t border-zinc-200 dark:border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="md:grid md:grid-cols-12 md:gap-8">
          <div className="md:col-span-3">
            <Reveal>
              <p className="font-mono text-xs text-zinc-500 dark:text-zinc-400">04 / 06</p>
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
              <div className="mt-8 flex flex-wrap gap-2">
                {FILTERS.map((f) => {
                  const active = filter === f;
                  return (
                    <button
                      key={f}
                      type="button"
                      onClick={() => handleFilter(f)}
                      className={`cursor-pointer border px-4 py-2 font-mono text-xs ${
                        active
                          ? 'border-zinc-950 bg-zinc-950 text-white dark:border-white dark:bg-white dark:text-zinc-950'
                          : 'border-zinc-300 text-zinc-500 dark:border-white/15 dark:text-zinc-400'
                      }`}
                    >
                      {f}
                    </button>
                  );
                })}
              </div>
            </Reveal>

            <div className="mt-8 space-y-8">
              {productCards.map((p, i) => (
                <Reveal key={p.num} delay={i * 60}>
                  <ProjectCard project={p} />
                </Reveal>
              ))}
              {extraCards.map((p, i) => (
                <div
                  key={p.num}
                  className={`grid transition-all duration-500 ease-in-out ${
                    extraExpanded ? 'grid-rows-[1fr] opacity-100' : '-mt-8 grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <Reveal delay={(productCards.length + i) * 60}>
                      <ProjectCard project={p} />
                    </Reveal>
                  </div>
                </div>
              ))}
            </div>

            {filter === 'All work' && (
              <Reveal className="mt-10 flex justify-center">
                <button
                  type="button"
                  onClick={() => setShowMore((v) => !v)}
                  className="inline-flex cursor-pointer items-center gap-2 border border-zinc-300 px-6 py-3 font-mono text-xs text-zinc-900 transition-colors hover:border-zinc-950 dark:border-white/15 dark:text-zinc-100 dark:hover:border-white/40"
                >
                  {showMore ? 'Show less' : 'Show more'}
                  {showMore ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                </button>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
