import Reveal from './Reveal';

const principles = [
  {
    n: '01',
    title: 'Think before building',
    text: 'Map the flow and pin down the real problem before any code gets written.',
  },
  {
    n: '02',
    title: 'Built to scale',
    text: 'Reusable components and patterns that hold up as products grow.',
  },
  {
    n: '03',
    title: 'Outcome aware',
    text: 'Connect implementation choices to user needs and business value.',
  },
];

export default function About() {
  return (
    <section id="about">
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
        <div className="md:grid md:grid-cols-12 md:gap-8">
          <div className="md:col-span-3">
            <Reveal>
              <p className="font-mono text-xs text-zinc-500 dark:text-zinc-400">01 / 06</p>
              <p className="font-mono text-sm text-zinc-950 dark:text-zinc-50 mt-2">About</p>
            </Reveal>
          </div>

          <div className="md:col-span-9 mt-10 md:mt-0">
            <Reveal>
              <div className="grid md:grid-cols-5 gap-8">
                <div className="md:col-span-2">
                  <div className="relative overflow-hidden aspect-[3/4]">
                    <img
                      src="/bilal-desk.jpg"
                      alt="Muhammad Bilal"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 flex h-1/2 items-end justify-between gap-2 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-5">
                      <p className="font-sans font-bold text-white text-xl leading-tight">
                        Muhammad
                        <br />
                        Bilal
                      </p>
                      <p className="font-mono text-[10px] tracking-wide text-white/85 text-right leading-relaxed">
                        LAHORE,
                        <br />
                        PAKISTAN
                      </p>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-3">
                  <p className="font-sans font-medium text-2xl md:text-[1.75rem] leading-snug tracking-tight text-zinc-950 dark:text-zinc-50">
                    Every build starts with{' '}
                    <span className="text-blue-600 dark:text-blue-400">
                      the problem
                    </span>
                    {' '}— who it helps, what it solves, and what the business actually needs.
                  </p>
                  <p className="text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400 mt-8">
                    Frontend engineer based in Lahore, with two years of production experience
                    in React, Next.js, and Tailwind CSS. Day-to-day work: multi-tenant SaaS
                    dashboards, data-heavy interfaces, and browser extensions. Work starts
                    before implementation — R&amp;D, feature design, flow discussions, and
                    business requirements. Agentic AI tools are part of the process now;
                    classic frontend alone no longer cuts it.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="grid md:grid-cols-3 md:divide-x md:divide-zinc-200 dark:md:divide-white/10 mt-14 md:mt-20">
                {principles.map((p, i) => (
                  <div key={p.n} className={i === 0 ? 'md:pr-8' : 'md:px-8'}>
                    <p className="font-mono text-xs text-blue-600 dark:text-blue-400">{p.n}</p>
                    <h3 className="font-sans font-semibold text-lg text-zinc-950 dark:text-zinc-50 mt-6">
                      {p.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 mt-3">
                      {p.text}
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
