import { ArrowDown, ArrowDownRight, ArrowUpRight } from 'lucide-react';

const tickerItems = Array.from({ length: 6 }, () => 'I turn ideas into clear, fast web products, end to end.');

const facts = [
  { label: 'Experience', value: '2 years' },
  { label: 'Focus', value: 'Product engineering' },
  { label: 'Core stack', value: 'React · Next.js' },
];

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* Decorative concentric arcs, right side */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="animate-float absolute -top-40 right-[-12rem] h-[42rem] w-[42rem] rounded-full border-[3rem] border-zinc-300/40 dark:border-white/5" />
        <div className="animate-float absolute top-24 right-[-7rem] h-[26rem] w-[26rem] rounded-full border-2 border-zinc-300/50 dark:border-white/10" style={{ animationDelay: '-3s' }} />
        <div className="animate-float absolute top-48 right-[-2rem] h-[14rem] w-[14rem] rounded-full border border-zinc-300/60 dark:border-white/10" style={{ animationDelay: '-6s' }} />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 pt-16 md:pt-24">
        <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white/70 px-4 py-1.5 dark:border-white/15 dark:bg-white/5">
          <span className="animate-pulse-dot h-2 w-2 rounded-full bg-lime-400" />
          <span className="font-mono text-xs text-zinc-600 dark:text-zinc-300">
            Frontend Engineer · Product Engineering
          </span>
        </div>

        <h1
          className="animate-fade-up mt-8 max-w-5xl font-sans text-[2.9rem] leading-[1.02] font-extrabold tracking-tight text-zinc-950 md:text-7xl lg:text-[5.4rem] dark:text-white"
          style={{ animationDelay: '120ms' }}
        >
          I turn ideas into <span className="text-outline">clear,</span>{' '}
          <span className="text-outline">fast</span> web products, end to end.
        </h1>

        <p
          className="animate-fade-up mt-8 max-w-xl font-sans text-lg leading-relaxed text-zinc-600 dark:text-zinc-400"
          style={{ animationDelay: '240ms' }}
        >
          I&apos;m Muhammad Bilal. I work beyond the task handoff: researching the problem,
          discussing user flows and business requirements, shaping the solution, and engineering
          production-ready web products with React and Next.js.
        </p>

        <div className="animate-fade-up mt-10 flex flex-wrap gap-3" style={{ animationDelay: '360ms' }}>
          <a
            href="#work"
            className="inline-flex items-center gap-2 rounded-[3px] bg-lime-400 px-6 py-3.5 font-mono text-sm font-semibold text-zinc-950 transition-colors hover:bg-lime-300"
          >
            Explore selected work
            <ArrowDownRight className="h-4 w-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/muhammad-bilal-engineer"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-[3px] border border-zinc-300 bg-white px-6 py-3.5 font-mono text-sm font-semibold text-zinc-900 transition-colors hover:border-zinc-500 dark:border-white/15 dark:bg-white/5 dark:text-zinc-100 dark:hover:border-white/40"
          >
            LinkedIn
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <a
            href="/resume.pdf"
            className="inline-flex items-center gap-2 rounded-[3px] border border-zinc-300 bg-white px-6 py-3.5 font-mono text-sm font-semibold text-zinc-900 transition-colors hover:border-zinc-500 dark:border-white/15 dark:bg-white/5 dark:text-zinc-100 dark:hover:border-white/40"
          >
            Download résumé
            <ArrowDown className="h-4 w-4" />
          </a>
        </div>

        <div
          className="animate-fade-up mt-16 grid max-w-3xl grid-cols-3 gap-6 border-t border-zinc-300 pt-6 dark:border-white/10"
          style={{ animationDelay: '480ms' }}
        >
          {facts.map((fact) => (
            <div key={fact.label}>
              <p className="font-mono text-[11px] tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
                {fact.label}
              </p>
              <p className="mt-1.5 font-sans text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                {fact.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee ticker */}
      <div className="relative mt-16 border-y border-zinc-200 bg-white py-4 md:mt-24 dark:border-white/10 dark:bg-zinc-900/40">
        <div className="flex overflow-hidden" aria-hidden>
          <div className="animate-marquee flex w-max shrink-0 items-center">
            {[...tickerItems, ...tickerItems].map((phrase, i) => (
              <span key={i} className="flex shrink-0 items-center">
                <span className="px-8 font-serif text-xl text-zinc-800 italic dark:text-zinc-200">
                  {phrase}
                </span>
                <span className="h-2 w-2 rotate-45 bg-lime-400" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
