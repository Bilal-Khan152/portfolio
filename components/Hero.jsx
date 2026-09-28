import { ArrowDown, Mail } from 'lucide-react';
import LinkedInIcon from './LinkedInIcon';

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-20">
      <div
        aria-hidden
        className="animate-float pointer-events-none absolute -top-32 left-1/2 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl dark:bg-emerald-400/10"
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p
            className="animate-fade-up mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-300"
            style={{ animationDelay: '0ms' }}
          >
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Frontend Engineer · Product Engineering
          </p>
          <h1
            className="animate-fade-up font-display text-5xl font-semibold tracking-tight text-zinc-900 sm:text-6xl lg:text-7xl dark:text-white"
            style={{ animationDelay: '120ms' }}
          >
            Muhammad Bilal
          </h1>
          <p
            className="animate-fade-up mt-6 text-lg leading-relaxed text-zinc-600 sm:text-xl dark:text-zinc-300"
            style={{ animationDelay: '220ms' }}
          >
            I build products end-to-end — not just interfaces. From early R&amp;D and user-flow
            discussions to digging into business requirements, I take ownership from problem to
            production and make the complicated feel simple.
          </p>
          <div
            className="animate-fade-up mt-8 flex flex-wrap items-center gap-4"
            style={{ animationDelay: '320ms' }}
          >
            <a
              href="#products"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-400"
            >
              View products
              <ArrowDown size={16} />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-300 px-6 py-3.5 text-sm font-semibold text-zinc-700 transition-colors hover:border-emerald-500 hover:text-emerald-600 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-emerald-400 dark:hover:text-emerald-400"
            >
              <Mail size={16} />
              Get in touch
            </a>
            <a
              href="https://www.linkedin.com/in/muhammad-bilal-engineer"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Muhammad Bilal on LinkedIn"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-zinc-300 text-zinc-600 transition-colors hover:border-emerald-500 hover:text-emerald-600 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-emerald-400 dark:hover:text-emerald-400"
            >
              <LinkedInIcon size={20} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
