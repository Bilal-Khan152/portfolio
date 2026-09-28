import { Globe2, Layers, Code2 } from 'lucide-react';

const items = [
  {
    icon: Globe2,
    title: 'Web Application Development',
    copy: 'Full-featured, responsive web applications — from architecture and state management to polished, accessible interfaces.',
  },
  {
    icon: Layers,
    title: 'SaaS Development',
    copy: 'Multi-tenant product thinking: scalable frontends, complex dashboards, and workflows built for growing platforms.',
  },
  {
    icon: Code2,
    title: 'Frontend Development',
    copy: 'Pixel-careful, performance-minded UI engineering with React, Next.js, and modern tooling — shipped with ownership.',
  },
];

export default function Expertise() {
  return (
    <section id="expertise" className="scroll-mt-24 bg-zinc-50 py-16 sm:py-24 dark:bg-zinc-900/40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
          Expertise
        </p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
          Where I do my best work
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-zinc-200 bg-white p-8 transition-colors hover:border-emerald-400 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-emerald-700"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                <item.icon size={24} />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-zinc-900 dark:text-white">
                {item.title}
              </h3>
              <p className="mt-3 leading-relaxed text-zinc-600 dark:text-zinc-400">{item.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
