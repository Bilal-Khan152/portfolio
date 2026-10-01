import Reveal from './Reveal';
import { SquarePlus, CircleCheck } from 'lucide-react';

const cards = [
  {
    icon: SquarePlus,
    title: 'Cross-functional by default',
    body: 'I work closely with backend, AI, QA, and product stakeholders so interface decisions stay connected to the whole system.',
  },
  {
    icon: CircleCheck,
    title: 'Own the outcome',
    body: 'I do more than execute a task: I question the flow, understand the business need, and follow through to a verified product experience.',
  },
];

export default function Collaboration() {
  return (
    <section id="collaboration">
      <div className="max-w-6xl mx-auto px-6 py-24 md:py-32">
        <div className="md:grid md:grid-cols-12 md:gap-8">
          <div className="md:col-span-3 mb-10 md:mb-0">
            <Reveal>
              <p className="font-mono text-xs text-[#52525B] dark:text-[#A1A1AA]">06 / 06</p>
              <p className="font-mono text-sm text-[#09090B] dark:text-[#FAFAFA] mt-2">Collaboration</p>
            </Reveal>
          </div>
          <div className="md:col-span-9">
            <Reveal>
              <h2 className="font-sans font-bold tracking-tight text-4xl md:text-6xl text-[#09090B] dark:text-[#FAFAFA]">
                Good frontend work is a team sport.
              </h2>
            </Reveal>
            <div className="grid md:grid-cols-2 gap-6 mt-12">
              {cards.map((card, i) => (
                <Reveal key={card.title} delay={i * 80}>
                  <div className="bg-white dark:bg-[#131316] border border-[#E4E4E7] dark:border-white/10 p-8 md:p-10 h-full">
                    <card.icon size={28} className="text-[#2563EB]" strokeWidth={1.75} />
                    <h3 className="font-sans font-bold text-2xl text-[#09090B] dark:text-[#FAFAFA] mt-8">
                      {card.title}
                    </h3>
                    <p className="text-[#52525B] dark:text-[#A1A1AA] leading-relaxed mt-4">
                      {card.body}
                    </p>
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
