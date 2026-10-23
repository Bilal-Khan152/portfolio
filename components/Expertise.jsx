import { Bot } from 'lucide-react';
import Reveal from './Reveal';

const cards = [
  {
    n: '01',
    tag: 'END TO END',
    title: 'Web application development',
    text: 'Responsive, API-connected web apps — from feature design and user flows to production.',
  },
  {
    n: '02',
    tag: 'PRODUCT SYSTEMS',
    title: 'SaaS development',
    text: 'Scalable multi-tenant platforms with role-based journeys, onboarding flows, dashboards, and dependable data states.',
  },
  {
    n: '03',
    tag: 'INTERFACE LAYER',
    title: 'Classic and Agentic Frontend development',
    text: 'Clean components, sane state, accessible interfaces that stay fast. Classic craft where it counts, agentic AI where it helps — simple screens and loading spinners no longer cut it.',
  },
  {
    n: '04',
    tag: 'AI ASSISTED',
    title: 'AI-assisted development',
    text: 'AI tooling in the daily workflow — faster scaffolding, debugging, and iteration, without dropping code quality.',
    icon: true,
  },
];

export default function Expertise() {
  return (
    <section id="expertise">
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <div className="md:grid md:grid-cols-12 md:gap-8">
          <div className="md:col-span-3">
            <Reveal>
              <p className="font-mono text-xs text-zinc-500 dark:text-zinc-400">03 / 06</p>
              <p className="font-mono text-sm text-zinc-950 dark:text-zinc-50 mt-2">Expertise</p>
            </Reveal>
          </div>

          <div className="md:col-span-9 mt-10 md:mt-0">
            <Reveal>
              <h2 className="font-sans font-bold tracking-tight text-4xl md:text-6xl text-zinc-950 dark:text-zinc-50">
                Core expertise.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 max-w-2xl">
                Four areas of day-to-day work.
              </p>
            </Reveal>

            <Reveal delay={120}>
              <div className="grid md:grid-cols-2 gap-px bg-zinc-200 dark:bg-white/10 border border-zinc-200 dark:border-white/10 mt-8">
                {cards.map((card) => (
                  <div
                    key={card.n}
                    className="bg-white dark:bg-[#131316] p-8 md:p-10 min-h-[280px] flex flex-col"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <p className="font-mono text-xs text-blue-600 dark:text-blue-400">{card.n}</p>
                      <p className="font-mono text-[11px] uppercase tracking-wide text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
                        {card.icon && <Bot size={14} className="text-blue-600 dark:text-blue-400" />}
                        {card.tag}
                      </p>
                    </div>
                    <h3 className="font-sans font-bold tracking-tight text-3xl md:text-[2rem] leading-tight text-zinc-950 dark:text-zinc-50 mt-6">
                      {card.title}
                    </h3>
                    <p className="text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400 mt-4">
                      {card.text}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
