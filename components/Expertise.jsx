import { Bot } from 'lucide-react';
import Reveal from './Reveal';

const cards = [
  {
    n: 'E01',
    tag: 'END TO END',
    title: 'Web application development',
    text: 'Responsive, API-connected applications shaped from business requirements and user flows through to a production-ready experience.',
  },
  {
    n: 'E02',
    tag: 'PRODUCT SYSTEMS',
    title: 'SaaS development',
    text: 'Scalable multi-tenant platforms with role-based journeys, onboarding flows, dashboards, and dependable data states.',
  },
  {
    n: 'E03',
    tag: 'INTERFACE LAYER',
    title: 'Frontend development',
    text: 'Maintainable component systems, thoughtful state integration, and accessible interfaces that stay fast across screen sizes.',
  },
  {
    n: 'E04',
    tag: 'CONVERSATIONAL AI',
    title: 'AI Assistant Development',
    text: 'Conversational AI assistants and chat experiences built directly into real products with clear, useful user flows.',
    icon: true,
  },
];

export default function Expertise() {
  return (
    <section id="expertise">
      <div className="max-w-6xl mx-auto px-6 py-24 md:py-32">
        <div className="md:grid md:grid-cols-12 md:gap-8">
          <div className="md:col-span-3">
            <Reveal>
              <p className="font-mono text-xs text-zinc-500 dark:text-zinc-400">03 / 06</p>
              <p className="font-mono text-sm text-zinc-950 dark:text-zinc-50 mt-2">Expertise</p>
            </Reveal>
          </div>

          <div className="md:col-span-9 mt-10 md:mt-0">
            <Reveal>
              <h2 className="font-sans font-bold tracking-tight text-4xl md:text-6xl text-zinc-950 dark:text-zinc-50">
                Where I can contribute.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 max-w-2xl">
                Four focused areas where product engineering, technical execution, and frontend
                craft come together.
              </p>
            </Reveal>

            <Reveal delay={120}>
              <div className="grid md:grid-cols-2 gap-px bg-zinc-200 dark:bg-white/10 border border-zinc-200 dark:border-white/10 mt-12">
                {cards.map((card) => (
                  <div
                    key={card.n}
                    className="bg-white dark:bg-[#131316] p-8 md:p-10 min-h-[280px] flex flex-col"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <p className="font-mono text-xs text-blue-600 dark:text-blue-400">{card.n}</p>
                      <p className="font-mono text-[11px] uppercase tracking-wide text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
                        {card.icon && <Bot size={14} className="text-blue-600 dark:text-blue-400" />}
                        {card.tag}
                      </p>
                    </div>
                    <h3 className="font-sans font-bold tracking-tight text-3xl md:text-[2rem] leading-tight text-zinc-950 dark:text-zinc-50 mt-10">
                      {card.title}
                    </h3>
                    <p className="text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400 mt-4">
                      {card.text}
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
