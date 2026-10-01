import Reveal from './Reveal';

const rows = [
  {
    n: 'A01',
    title: 'Product discovery & engineering',
    text: 'R&D, flow exploration, and business-requirement discussions carried through to production-ready React and Next.js experiences.',
  },
  {
    n: 'A02',
    title: 'UI systems & architecture',
    text: 'Reusable component patterns, predictable state management, and maintainable foundations for growing products.',
  },
  {
    n: 'A03',
    title: 'API & state integration',
    text: 'Reliable data flows using Redux Toolkit, RTK Query, Axios, and thoughtful loading, error, and empty states.',
  },
  {
    n: 'A04',
    title: 'Performance & polish',
    text: 'Accessible, pixel-precise experiences with careful attention to responsiveness, consistency, and runtime quality.',
  },
];

export default function WhatIDo() {
  return (
    <section id="what-i-do">
      <div className="max-w-6xl mx-auto px-6 py-24 md:py-32">
        <div className="md:grid md:grid-cols-12 md:gap-8">
          <div className="md:col-span-3">
            <Reveal>
              <p className="font-mono text-xs text-zinc-500 dark:text-zinc-400">02 / 06</p>
              <p className="font-mono text-sm text-zinc-950 dark:text-zinc-50 mt-2">What I do</p>
            </Reveal>
          </div>

          <div className="md:col-span-9 mt-10 md:mt-0">
            <Reveal>
              <h2 className="font-sans font-bold tracking-tight text-4xl md:text-6xl text-zinc-950 dark:text-zinc-50">
                Product engineering that connects discovery to delivery.
              </h2>
            </Reveal>

            <div className="mt-12 md:mt-16">
              {rows.map((row, i) => (
                <Reveal key={row.n} delay={i * 60}>
                  <div
                    className={`grid md:grid-cols-12 gap-3 md:gap-4 py-8 border-t border-zinc-200 dark:border-white/10 transition-colors hover:bg-zinc-950/[0.03] dark:hover:bg-white/[0.04] ${
                      i === rows.length - 1 ? 'border-b' : ''
                    }`}
                  >
                    <p className="md:col-span-2 font-mono text-xs text-blue-600 dark:text-blue-400 pt-1">
                      {row.n}
                    </p>
                    <h3 className="md:col-span-4 font-sans font-bold text-2xl md:text-[1.7rem] leading-tight tracking-tight text-zinc-950 dark:text-zinc-50">
                      {row.title}
                    </h3>
                    <p className="md:col-span-6 text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {row.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
