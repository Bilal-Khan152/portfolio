import Image from 'next/image';

const skills = ['React.js', 'Next.js', 'Tailwind CSS', 'JavaScript', 'Redux Toolkit', 'RTK Query'];

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
          About
        </p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
          Engineer who thinks in products
        </h2>
        <div className="mt-10 grid items-start gap-10 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <div className="overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <Image
              src="/bilal.jpg"
              alt="Portrait of Muhammad Bilal"
              width={640}
              height={800}
              className="h-auto w-full object-cover"
              priority={false}
            />
          </div>
          <div>
            <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">
              I&apos;m a Frontend Software Engineer from Lahore, Pakistan, with around two years of
              experience building real, production web applications. I&apos;ve shipped work with{' '}
              <span className="font-semibold text-zinc-900 dark:text-white">Xeven Solutions</span>{' '}
              and <span className="font-semibold text-zinc-900 dark:text-white">HazelSoft</span>,
              and what sets me apart is how I work: I do the R&amp;D, sit in the flow discussions,
              and dig into business requirements before writing a line of code.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">
              My stack centers on React.js, Next.js, Tailwind CSS, JavaScript, Redux Toolkit, and
              RTK Query — chosen to build interfaces that are fast, maintainable, and genuinely
              easy for people to use.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {skills.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm font-medium text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
