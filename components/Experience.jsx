import Reveal from './Reveal';

const ITEMS = [
  {
    meta: '12/2025 — PRESENT · XEVEN SOLUTIONS · COVIS AI',
    title: 'Frontend Engineer',
    body: 'Product R&D and flow discussions, plus development and maintenance of a multi-tenant SaaS frontend used across organizations and roles.',
  },
  {
    meta: '10/2024 — 12/2025 · HAZELSOFT · FR-SURVEY',
    title: 'Associate Software Engineer',
    body: 'Responsive interfaces for a restaurant management platform, built with a frontend team and project manager.',
  },
  {
    meta: '03/2021 — 03/2025 · ABDUL WALI KHAN UNIVERSITY',
    title: 'BS Computer Science',
    body: 'Degree in computer science from Nowshera, Pakistan.',
  },
];

export default function Experience() {
  return (
    <section id="experience" className="border-t border-zinc-200 dark:border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="md:grid md:grid-cols-12 md:gap-8">
          <div className="md:col-span-3">
            <Reveal>
              <p className="font-mono text-xs text-zinc-500 dark:text-zinc-400">06 / 06</p>
              <p className="mt-2 font-mono text-sm text-zinc-900 dark:text-zinc-100">Experience</p>
            </Reveal>
          </div>
          <div className="mt-10 md:col-span-9 md:mt-0">
            <Reveal>
              <h2 className="font-sans text-4xl font-bold tracking-tight text-zinc-950 md:text-6xl dark:text-white">
                Where the experience comes from.
              </h2>
            </Reveal>
            <div className="mt-12 space-y-6">
              {ITEMS.map((item, i) => (
                <Reveal key={item.title} delay={i * 60}>
                  <article className="border border-zinc-200 bg-white p-8 md:p-10 dark:border-white/10 dark:bg-zinc-900">
                    <p className="font-mono text-xs tracking-widest text-zinc-500 dark:text-zinc-400">
                      {item.meta}
                    </p>
                    <h3 className="mt-4 font-sans text-2xl font-bold text-zinc-950 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="mt-3 leading-relaxed text-zinc-500 dark:text-zinc-400">
                      {item.body}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
