const roles = [
  {
    company: 'Xeven Solutions',
    role: 'Frontend Engineer',
    detail: 'COVIS AI — AI-powered multi-tenant SaaS platform',
  },
  {
    company: 'HazelSoft',
    role: 'Associate Software Engineer',
    detail: 'FR-Survey — restaurant management system',
  },
];

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-24 bg-zinc-50 py-16 sm:py-24 dark:bg-zinc-900/40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
          Experience
        </p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
          Where I&apos;ve worked
        </h2>

        <div className="mt-10 max-w-3xl">
          <ol className="relative space-y-8 border-l-2 border-emerald-200 pl-8 dark:border-emerald-900">
            {roles.map((r) => (
              <li key={r.company} className="relative">
                <span
                  aria-hidden
                  className="absolute -left-[41px] top-1 h-4 w-4 rounded-full border-2 border-emerald-500 bg-white dark:bg-zinc-950"
                />
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">
                  {r.role}
                </h3>
                <p className="mt-1 text-base font-medium text-emerald-600 dark:text-emerald-400">
                  {r.company}
                </p>
                <p className="mt-2 leading-relaxed text-zinc-600 dark:text-zinc-400">{r.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
