import { motion, useReducedMotion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

/* PASS 5E — Editorial technology index.
 * The five groups below hold the complete, documented skill set for this
 * portfolio. The layout is fully data-driven (chapter numbering included),
 * so adding or removing an entry here is the only change ever needed.
 * Do not add skills that are not already documented, and do not attach
 * proficiency levels, percentages or years of experience — this section
 * presents the stack, it does not rate it. */
const skillGroups = [
  {
    number: '01',
    title: 'Languages',
    items: ['Python', 'Java', 'JavaScript']
  },
  {
    number: '02',
    title: 'Frontend',
    items: ['React', 'Vite']
  },
  {
    number: '03',
    title: 'Backend',
    items: ['FastAPI', 'REST APIs']
  },
  {
    number: '04',
    title: 'Database',
    items: ['PostgreSQL', 'SQL']
  },
  {
    number: '05',
    title: 'Tools & Platforms',
    items: ['Git', 'GitHub', 'Linux']
  }
];

const totalSkills = skillGroups.reduce(
  (count, group) => count + group.items.length,
  0
);

const Skills = () => {
  const prefersReducedMotion = useReducedMotion();
  // Row shift is the only transform: a small, local Framer hover interaction,
  // disabled entirely when the visitor prefers reduced motion.
  const rowShift = prefersReducedMotion ? undefined : { x: 6 };

  // pt-24 overrides the shared .section padding-top at this one boundary
  // (Tailwind utilities beat the components layer): About already ends flush
  // with its content, so a single ~96px gap separates the two sections.
  // Padding-bottom still follows the shared section token.
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="section pt-24 bg-primary-50 dark:bg-dark-900 transition-colors duration-200"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section head: eyebrow, title and factual meta on a single
              trigger — no per-character animation anywhere in the section. */}
          <ScrollReveal
            as="div"
            selector=":scope > *"
            stagger={0.1}
            className="mb-10 flex flex-col gap-5 md:mb-20"
          >
            <p className="eyebrow flex items-center gap-3">
              <span aria-hidden="true" className="h-1.5 w-1.5 bg-signal" />
              Technology
            </p>

            <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
              <h2
                id="skills-heading"
                className="text-display-xl md:text-display-2xl font-bold text-primary-900 dark:text-dark-50"
              >
                <span className="border-b-2 border-primary-200 dark:border-dark-700 pb-2">
                  SKILLS
                </span>
              </h2>

              {/* Counts are derived from the data above — factual only. */}
              <p className="label pb-2">
                <span className="text-fg">
                  {String(skillGroups.length).padStart(2, '0')}
                </span>{' '}
                Categories
                <span aria-hidden="true" className="mx-2 text-fg-faint">
                  /
                </span>
                <span className="text-fg">
                  {String(totalSkills).padStart(2, '0')}
                </span>{' '}
                Technologies
              </p>
            </div>
          </ScrollReveal>

          {/* The index: five editorial chapters, one ScrollReveal per
              chapter. The alternating 5/7 split keeps the composition
              asymmetric on desktop; on mobile everything stacks naturally
              with the chapter number still visible. */}
          <div>
            {skillGroups.map((group, index) => {
              const flip = index % 2 === 1;

              return (
                <article
                  key={group.number}
                  className="group border-t border-hairline py-8 sm:py-10 md:py-14"
                >
                  <ScrollReveal
                    as="div"
                    selector=":scope > *"
                    stagger={0.1}
                    scale={0.97}
                    className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-10 lg:gap-14"
                  >
                    {/* Chapter label: ghosted number, mono heading and an
                        accent rule that grows on hover. Number and rule are
                        decorative — the category itself is the h3 text. */}
                    <div
                      className={`flex items-start gap-4 sm:gap-6 md:col-span-5 ${flip ? 'md:order-2' : ''}`}
                    >
                      <span
                        aria-hidden="true"
                        className="select-none font-mono font-bold leading-none text-display-lg text-fg/20 transition-colors duration-700 ease-premium dark:text-fg/15 group-hover:text-fg/40 dark:group-hover:text-fg/30 motion-reduce:transition-none"
                      >
                        {group.number}
                      </span>

                      <div className="min-w-0 pt-1">
                        <h3 className="label label-strong">{group.title}</h3>
                        <span
                          aria-hidden="true"
                          className="mt-4 block h-px w-16 bg-hairline-strong transition-[width,background-color] duration-700 ease-premium group-hover:w-32 group-hover:bg-accent-500 motion-reduce:transition-none"
                        ></span>
                      </div>
                    </div>

                    {/* Ordered visual list: index marker, technology name
                        as display type, and a leader hairline that turns
                        accent when the row is hovered. No badges, no logos. */}
                    <ol
                      role="list"
                      className={`min-w-0 md:col-span-7 ${flip ? 'md:order-1' : ''}`}
                    >
                      {group.items.map((item, itemIndex) => (
                        <motion.li
                          key={item}
                          whileHover={rowShift}
                          transition={{ duration: 0.25, ease: 'easeOut' }}
                          className="group/item flex items-baseline gap-4 border-t border-hairline py-4 first:border-t-0 sm:gap-6 md:py-5"
                        >
                          <span
                            aria-hidden="true"
                            className="label transition-colors duration-ui ease-premium group-hover/item:text-accent-600 dark:group-hover/item:text-accent-400 motion-reduce:transition-none"
                          >
                            {String(itemIndex + 1).padStart(2, '0')}
                          </span>

                          <span className="display min-w-0 text-display-sm text-fg md:text-display-md">
                            {item}
                          </span>

                          <span
                            aria-hidden="true"
                            className="h-px min-w-[2rem] flex-1 bg-hairline transition-colors duration-ui ease-premium group-hover/item:bg-accent-500/60 motion-reduce:transition-none"
                          ></span>
                        </motion.li>
                      ))}
                    </ol>
                  </ScrollReveal>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;