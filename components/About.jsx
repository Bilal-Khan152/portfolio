import Reveal from './Reveal';

const principles = [
  {
    n: '01',
    title: 'Think before building',
    text: 'Question assumptions, map the flow, and make the right problem clear before writing code.',
  },
  {
    n: '02',
    title: 'Built to scale',
    text: 'Reusable components and patterns that stay coherent as products grow.',
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
      <div className="max-w-6xl mx-auto px-6 py-24 md:py-32">
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
                  <div className="relative overflow-hidden border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#131316] aspect-[3/4]">
                    <img
                      src="/bilal.jpg"
                      alt="Muhammad Bilal"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent p-4 flex items-end justify-between gap-2">
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
                    Great software isn&apos;t only about clean code. It&apos;s about understanding{' '}
                    <span className="font-serif italic text-blue-600 dark:text-blue-400">
                      why a feature matters
                    </span>
                    , who it helps, and how it moves the product forward.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-6 mt-8">
                    <p className="text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                      I&apos;m a product-minded frontend engineer with hands-on experience building
                      responsive, high-performance web applications. I care about maintainable
                      architecture, accessible interactions, and the details that make a product
                      feel dependable.
                    </p>
                    <p className="text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                      My work starts before implementation. I explore the problem, contribute to
                      R&amp;D, discuss flows with stakeholders, and translate business
                      requirements into end-to-end experiences people can use with confidence.
                    </p>
                  </div>
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
