import Reveal from './Reveal';
import { techIcons } from './techIcons';

// Icons with near-black brand fills get white in dark mode so they stay
// visible directly on the dark card (no tile behind them).
const DARK_FILL_WHITE = new Set(['nextdotjs', 'shadcnui', 'cursor', 'posthog', 'sentry']);

function TechIcon({ slug }) {
  const icon = techIcons[slug];
  if (!icon) return null;
  return (
    <svg
      viewBox="0 0 24 24"
      fill={icon.fill}
      className={`h-full w-full ${DARK_FILL_WHITE.has(slug) ? 'dark:fill-white' : ''}`}
      aria-hidden
    >
      {icon.paths.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}

function UnleashIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full" aria-hidden>
      <rect x="2" y="7" width="20" height="10" rx="5" fill="#6d28d9" />
      <circle cx="17" cy="12" r="3.2" fill="#ffffff" />
    </svg>
  );
}

const groups = [
  {
    label: 'Frontend core',
    skills: [
      { name: 'JavaScript', slug: 'javascript' },
      { name: 'React.js', slug: 'react' },
      { name: 'Next.js', slug: 'nextdotjs' },
    ],
  },
  {
    label: 'Styling & UI',
    skills: [
      { name: 'Tailwind CSS', slug: 'tailwindcss' },
      { name: 'Shadcn', slug: 'shadcnui' },
    ],
  },
  {
    label: 'State & backend',
    skills: [
      { name: 'Redux Toolkit', slug: 'redux' },
      { name: 'Firebase', slug: 'firebase' },
    ],
  },
  {
    label: 'Tooling',
    skills: [
      { name: 'Git', slug: 'git' },
      { name: 'Cursor', slug: 'cursor' },
    ],
  },
  {
    label: 'Third-party integrations',
    skills: [
      { name: 'Unleash', custom: true },
      { name: 'Sentry', slug: 'sentry' },
      { name: 'PostHog', slug: 'posthog' },
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills">
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <div className="md:grid md:grid-cols-12 md:gap-8">
          <div className="md:col-span-3">
            <Reveal>
              <p className="font-mono text-xs text-zinc-500 dark:text-zinc-400">04 / 06</p>
              <p className="font-mono text-sm text-zinc-950 dark:text-zinc-50 mt-2">Skills</p>
            </Reveal>
          </div>

          <div className="md:col-span-9 mt-10 md:mt-0">
            <Reveal>
              <h2 className="font-sans font-bold tracking-tight text-4xl md:text-6xl text-zinc-950 dark:text-zinc-50">
                Technical stack.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 max-w-2xl">
                The languages, frameworks, and services behind the production work.
              </p>
            </Reveal>

            <div className="mt-10 space-y-8">
              {groups.map((group, gi) => (
                <Reveal key={group.label} delay={gi * 60}>
                  <p className="font-mono text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    {group.label}
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mt-4">
                    {group.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="flex items-center gap-3 rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/5 px-4 py-3"
                      >
                        <span className="h-10 w-10 shrink-0">
                          {skill.custom ? <UnleashIcon /> : <TechIcon slug={skill.slug} />}
                        </span>
                        <span className="font-sans text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                          {skill.name}
                        </span>
                      </div>
                    ))}
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
