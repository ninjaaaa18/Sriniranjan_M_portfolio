import { motion, useReducedMotion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

// PASS 5F — Hackathons editorial archive.
// Content below is kept strictly to what is already documented in this
// project: the event names, the two labelled focus statements, the existing
// description and the technology list. Do not add ranks, scores, prizes,
// winner/finalist status, certificates, dates, roles, or results.
// `details` holds the labelled blocks; `technologies` is optional.
const events = [
  {
    title: 'Smart India Hackathon 2026',
    details: [
      {
        label: 'Problem Focus',
        value: 'Strengthening market linkages and price discovery for farmers.'
      },
      {
        label: 'Project Focus',
        value: 'Helping farmers discover market prices and connect with buyers through digital price discovery and buyer matching.'
      }
    ],
    description: null,
    technologies: ['Python', 'FastAPI', 'PostgreSQL', 'React', 'Vite']
  },
  {
    title: 'RV University Code Clash / CyberSec CTF 2.0',
    details: [],
    description: 'A coding and cybersecurity competition experience.',
    technologies: []
  }
];

const Blog = () => {
  const prefersReducedMotion = useReducedMotion();
  const hoverLift = prefersReducedMotion ? undefined : { y: -4 };

  // `pt-0` + `pb-0` at the facing edges only: the Projects section's last
  // chapter already carries its own pb-24 (~96px), and the last Hackathons
  // chapter trails its own py-16 (~64px), so the shared .section paddings
  // (151px+ per side) that used to stack at both boundaries are removed here.
  // min-h-screen is untouched; the Hackathons → CTF separation is carried by
  // the CTF section's own top spacing.
  return (
    <section
      id="hackathons"
      aria-labelledby="hackathons-heading"
      className="section pt-0 pb-0 min-h-screen bg-primary-50 dark:bg-dark-900 transition-colors duration-200"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section head: eyebrow, title and factual count on one trigger. */}
          <ScrollReveal
            as="div"
            selector=":scope > *"
            stagger={0.1}
            className="mb-10 flex flex-col gap-5 md:mb-16"
          >
            <p className="eyebrow flex items-center gap-3">
              <span aria-hidden="true" className="h-1.5 w-1.5 bg-signal" />
              Field Notes
            </p>

            <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
              <h2
                id="hackathons-heading"
                className="text-display-xl md:text-display-2xl font-bold text-primary-900 dark:text-dark-50"
              >
                <span className="border-b-2 border-primary-200 dark:border-dark-700 pb-2">
                  HACKATHONS
                </span>
              </h2>

              {/* Count derived from the data above — factual only. */}
              <p className="label pb-2">
                <span className="text-fg">
                  {String(events.length).padStart(2, '0')}
                </span>{' '}
                Events
              </p>
            </div>
          </ScrollReveal>

          {/* One editorial chapter per event: ghosted number, oversized title
              and an asymmetric body. Each chapter carries its own ScrollReveal
              (stagger + 0.96 -> 1 settle) — three triggers for the section. */}
          <div>
            {events.map((event, index) => (
              <motion.article
                key={event.title}
                whileHover={hoverLift}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="group border-t border-hairline py-10 md:py-16"
              >
                <ScrollReveal
                  as="div"
                  selector=":scope > *"
                  stagger={0.12}
                  scale={0.96}
                  className="flex flex-col gap-8 md:gap-12"
                >
                  {/* Chapter head: number, rule, oversized title. */}
                  <div className="flex flex-col gap-4 md:gap-5">
                    <div className="flex items-center gap-5 md:gap-8">
                      <span
                        aria-hidden="true"
                        className="font-mono font-bold select-none text-display-xl leading-none text-fg/20 transition-colors duration-700 ease-premium dark:text-fg/15 group-hover:text-fg/40 dark:group-hover:text-fg/30 motion-reduce:transition-none"
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span
                        aria-hidden="true"
                        className="hidden h-px flex-1 bg-hairline transition-colors duration-700 ease-premium group-hover:bg-accent-500/70 md:block"
                      ></span>
                    </div>

                    <h3 className="display max-w-[24ch] text-display-md text-fg md:text-display-lg break-words">
                      {event.title}
                    </h3>

                    <span
                      aria-hidden="true"
                      className="block h-px w-20 bg-hairline-strong transition-[width,background-color] duration-700 ease-premium group-hover:w-44 group-hover:bg-accent-500 motion-reduce:transition-none"
                    ></span>
                  </div>

                  {/* Body: labelled focus statements beside a ruled technology
                      list, or the single documented description on an offset
                      column — both stay honest to how much detail exists. */}
                  <div className="grid gap-8 md:grid-cols-12 md:gap-10">
                    {Array.isArray(event.details) && event.details.length > 0 ? (
                      <dl className="grid gap-6 sm:grid-cols-2 md:col-span-8">
                        {event.details.map((detail) => (
                          <div key={detail.label} className="min-w-0 border-t border-hairline pt-4">
                            <dt className="label mb-3">{detail.label}</dt>
                            <dd className="lede measure">{detail.value}</dd>
                          </div>
                        ))}
                      </dl>
                    ) : (
                      <div className="md:col-span-7 md:col-start-4">
                        <p className="lede measure">{event.description}</p>
                      </div>
                    )}

                    {Array.isArray(event.technologies) && event.technologies.length > 0 && (
                      <div className="min-w-0 md:col-span-4">
                        <p className="label mb-4">Technologies</p>
                        <ul role="list" className="flex flex-col">
                          {event.technologies.map((tech) => (
                            <li
                              key={tech}
                              className="label label-strong flex items-center gap-3 border-t border-hairline py-3"
                            >
                              <span
                                aria-hidden="true"
                                className="h-1 w-1 shrink-0 bg-accent-500"
                              ></span>
                              {tech}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </ScrollReveal>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
