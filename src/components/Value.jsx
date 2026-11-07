import { motion, useReducedMotion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

// PASS 5F — CTF / cybersecurity learning index.
// Four learning / practice areas, unchanged in scope. Each description explains
// what the field involves and must never imply professional experience,
// proficiency, certification, or competition results.
const focusAreas = [
  {
    title: 'WEB EXPLOITATION',
    description: 'Learning about web application security, common vulnerabilities, and how web systems can be tested.'
  },
  {
    title: 'REVERSE ENGINEERING',
    description: 'Exploring how programs work by analyzing binaries, behavior, and underlying logic.'
  },
  {
    title: 'CRYPTOGRAPHY',
    description: 'Studying cryptographic concepts and solving challenges involving encryption, encoding, and ciphers.'
  },
  {
    title: 'OSINT & LINUX',
    description: 'Learning information-gathering techniques, command-line workflows, and Linux-based investigation.'
  }
];

const Value = () => {
  const prefersReducedMotion = useReducedMotion();
  // Row shift is the only transform: a small, local Framer hover interaction,
  // disabled entirely when the visitor prefers reduced motion.
  const rowShift = prefersReducedMotion ? undefined : { x: 6 };

  // `pt-16` + `pb-0` at the facing edges only (Tailwind utilities beat the
  // components layer): the last Hackathons chapter trails its own py-16
  // (~64px), so a single ~88px gap separates it from this heading, while the
  // next separation is carried by Contact's own top spacing. `min-h-screen`
  // is removed — it stretched this short index to a full viewport of space.
  return (
    <section
      id="ctf"
      aria-labelledby="ctf-heading"
      className="section-tight pt-16 pb-0 bg-primary-50 dark:bg-dark-900 transition-colors duration-200"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Quieter technical appendix: the section title and the existing
              learning framing share one trigger. */}
          <ScrollReveal
            as="div"
            selector=":scope > *"
            stagger={0.1}
            className="mb-6 flex flex-col items-start gap-4 md:mb-8"
          >
            <h2
              id="ctf-heading"
              className="section-heading"
            >
              CTF /
              <span className="block">CYBERSECURITY</span>
            </h2>

            {/* Same accent label treatment as the project event tag: the
                framing is carried by text, never by implication. */}
            <p
              className="text-sm text-fg muted-600 dark:text-muted-400 mb-4 mt-2"
            >
              LEARNING / PRACTICE
            </p>
          </ScrollReveal>

          {/* One restrained reveal for the whole index — no per-area triggers.
              Rows shift and their rule extends on hover only. */}
          <ScrollReveal
            as="ul"
            role="list"
            selector=":scope > li"
            stagger={0.08}
            className="border-b border-hairline pb-4"
          >
            {focusAreas.map((area, index) => (
              <motion.li
                key={area.title}
                whileHover={rowShift}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="group/item border-b border-hairline pb-3 md:pb-4"
              >
                <div className="flex items-baseline gap-4 py-5 md:gap-8 md:py-6">
                  <span
                    aria-hidden="true"
                    className="label text-fg-faint transition-colors duration-300 ease-premium group-hover/item:text-fg-muted motion-reduce:transition-none"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-mono text-sm font-semibold uppercase tracking-widest text-fg md:text-base break-words">
                      {area.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-fg-muted break-words">
                      {area.description}
                    </p>
                  </div>
                </div>

                <span
                  aria-hidden="true"
                  className="block h-px w-0 bg-accent-500/70 transition-[width] duration-700 ease-premium group-hover/item:w-full motion-reduce:transition-none"
                ></span>
              </motion.li>
            ))}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Value;
