import { motion, useReducedMotion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

// Every project links to its verified GitHub repository. `link` opens in a new
// tab (target="_blank" + rel="noopener noreferrer") and `demo` is only set when
// a verified, working deployment URL exists — never a placeholder. While `link`
// is null the panel stays non-clickable and shows a subtle "Details available on
// request" label. Never use a placeholder URL here.
const projects = [
  {
    title: 'DinePulse',
    description:
      'An AI-powered restaurant management and customer wellness platform combining food ordering, nutritional insights, dietary safety analysis, inventory management, and operational recommendations.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Supabase', 'PostgreSQL', 'Gemini AI'],
    link: 'https://github.com/ninjaaaa18/DinePulse',
    demo: 'https://dinepulse-sigma.vercel.app'
  },
  {
    title: 'SWIFTORA',
    description:
      'A fashion and textile commerce platform designed to improve product discovery and shopping experiences, with a dedicated Magic Mirror experience.',
    technologies: ['React', 'TypeScript', 'Vite'],
    link: 'https://github.com/ninjaaaa18/CodeStrom_Cypher',
    demo: null
  },
  {
    title: 'AI-Based Violence Detection',
    description:
      'A deep-learning-based scene classification project that explores identifying potentially violent or hazardous situations using computer vision and model inference.',
    technologies: ['Python', 'TensorFlow/Keras', 'MobileNetV2', 'Computer Vision'],
    link: 'https://github.com/ninjaaaa18/voilence_detection',
    demo: null
  }
];

/* Editorial chapter layout, chosen purely by position — it adds no project
 * information. Columns alternate so the composition stays asymmetric, the
 * middle chapter offsets its text column to break the shared baseline, and the
 * final chapter (the one carrying the most approved context) keeps the widest
 * visual plate. Falls back to the last layout if a project is ever added. */
const chapterLayouts = [
  { visual: 'md:col-span-7', info: 'md:col-span-5', flip: false, offset: '' },
  { visual: 'md:col-span-5', info: 'md:col-span-7', flip: true, offset: 'md:mt-14' },
  { visual: 'md:col-span-7', info: 'md:col-span-5', flip: false, offset: 'md:mt-6' }
];

/* Plates stay subordinate to the copy on small screens and only grow into full
 * editorial fields from md upward, so imagery never dominates the content. */
const visualSize = 'min-h-[14rem] sm:min-h-[18rem] md:min-h-[26rem] lg:min-h-[30rem]';

/* Fixed light-on-dark grid. The plates below are always ink, so their grid
 * must not follow the page theme (the theme-aware .bg-grid would turn black
 * and disappear in light mode). */
const plateGrid = {
  backgroundImage:
    'linear-gradient(to right, rgba(255,255,255,0.055) 1px, transparent 1px), ' +
    'linear-gradient(to bottom, rgba(255,255,255,0.055) 1px, transparent 1px)',
  backgroundSize: '4rem 4rem'
};

/* ---- Decorative visual fields ------------------------------------------
 * Abstract CSS compositions standing in for project imagery, which does not
 * exist. They are deliberately non-representational: no screenshots, no UI
 * mockups, no charts, no invented data — decoration only. This subtree is
 * rendered inside an aria-hidden plate, so assistive tech never announces it.
 * A plain render function (called directly, never used as a JSX element) since
 * this project does not install the `prop-types` package its ESLint config
 * would otherwise require. */
const renderBackdrop = (index) => {
  if (index === 0) {
    // DinePulse: concentric rings radiating from a single seed point.
    return (
      <>
        <div className="absolute inset-0 opacity-60" style={plateGrid} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.09),transparent_62%)]" />
        <span className="absolute left-1/2 top-1/2 h-[86%] aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5" />
        <span className="absolute left-1/2 top-1/2 h-[64%] aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
        <span className="absolute left-1/2 top-1/2 h-[42%] aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15" />
        <span className="absolute left-1/2 top-1/2 h-[20%] aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/25" />
        <span className="absolute left-1/2 top-1/2 h-[4%] aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/30" />
      </>
    );
  }

  if (index === 1) {
    // SWIFTORA: perspective floor grid meeting a lit horizon. Strongest
    // plate of the three — proportion only, no added claims.
    return (
      <>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_38%,rgba(255,255,255,0.10),transparent_60%)]" />
        <div className="absolute inset-0 overflow-hidden" style={{ perspective: '700px' }}>
          <div
            className="absolute bottom-[-35%] left-[-30%] right-[-30%] h-[85%] opacity-70"
            style={{ ...plateGrid, transform: 'rotateX(64deg)', transformOrigin: 'center bottom' }}
          />
        </div>
        <span className="absolute left-0 right-0 top-[38%] h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        <span className="absolute left-1/2 top-[8%] h-[30%] w-px -translate-x-1/2 bg-white/20" />
        <span className="absolute left-[22%] top-[18%] h-[20%] w-px bg-white/10" />
        <span className="absolute right-[22%] top-[18%] h-[20%] w-px bg-white/10" />
      </>
    );
  }

  // AI-Based Violence Detection: a detection frame with a scan axis.
  return (
    <>
      <div className="absolute inset-0 opacity-70" style={plateGrid} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.07),transparent_65%)]" />
      <span className="absolute inset-[12%] border border-white/15" />
      <span className="absolute inset-[22%] border border-dashed border-white/10" />
      <span className="absolute left-1/2 top-[12%] bottom-[12%] w-px -translate-x-1/2 bg-white/10" />
      <span className="absolute top-1/2 left-[12%] right-[12%] h-px -translate-y-1/2 bg-white/10" />
      <span className="absolute left-[12%] right-[12%] top-[38%] h-px bg-accent-400/50" />
    </>
  );
};

const Work = () => {
  const prefersReducedMotion = useReducedMotion();
  // `pb-0` at this boundary only: the last chapter's own pb-24 provides the
  // ~96px of separation before Hackathons, instead of stacking that on top of
  // the shared .section padding-bottom (151px+) that used to sit below it.
  // The section's padding-TOP is untouched, so Skills → Projects is unchanged.
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="section pt-16 md:pt-20 pb-0 bg-primary-50 dark:bg-dark-900 transition-colors duration-200"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal
            as="h2"
            variant="text"
            id="projects-heading"
            className="text-4xl md:text-5xl font-bold text-primary-900 dark:text-dark-50 mb-14 md:mb-20 font-mono"
          >
            <span className="border-b-2 border-primary-200 dark:border-dark-700 pb-2">PROJECTS</span>
          </ScrollReveal>

          {/* Each project is an editorial chapter. One ScrollReveal reveals the
              head and the body as a staggered pair (rise + a 0.96 -> 1 settle),
              and one nested instance drifts the decorative backdrop: exactly two
              triggers per chapter, all through the shared ScrollReveal API. */}
          {projects.map((project, index) => {
            const number = String(index + 1).padStart(2, '0');
            const layout =
              chapterLayouts[index] ?? chapterLayouts[chapterLayouts.length - 1];

            return (
              <motion.article
                key={project.title}
                whileHover={prefersReducedMotion ? undefined : { y: -4 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="group relative border-t border-hairline pt-10 pb-16 md:pt-16 md:pb-24 first:border-t-0"
              >
                <ScrollReveal
                  as="div"
                  selector=":scope > *"
                  stagger={0.12}
                  scale={0.96}
                  className="flex flex-col gap-10 md:gap-14"
                >
                  {/* ---- Chapter head: number, rule, oversized title ---- */}
                  <div className="flex flex-col gap-4 md:gap-5">
                    <div className="flex items-center gap-5 md:gap-8">
                      <span
                        aria-hidden="true"
                        className="font-mono font-bold select-none text-display-xl leading-none text-fg/20 dark:text-fg/15"
                      >
                        {number}
                      </span>
                      <span
                        aria-hidden="true"
                        className="hidden h-px flex-1 bg-hairline transition-colors duration-700 ease-premium group-hover:bg-accent-500/70 md:block"
                      ></span>
                    </div>

                    <h3 className="display max-w-[24ch] text-display-md text-fg md:text-display-lg">
                      {project.title}
                    </h3>

                    <span
                      aria-hidden="true"
                      className="block h-px w-20 bg-hairline-strong transition-[width,background-color] duration-700 ease-premium group-hover:w-44 group-hover:bg-accent-500 motion-reduce:transition-none"
                    ></span>
                  </div>

                  {/* ---- Chapter body: visual plate + project information ---- */}
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-10 lg:gap-14">
                    <div className={layout.flip ? `${layout.visual} md:order-2` : layout.visual}>
                      <div
                        aria-hidden="true"
                        className={`visual-frame relative h-full w-full bg-dark-900 shadow-panel transition-[transform,border-color] duration-700 ease-premium group-hover:scale-[1.015] group-hover:border-white/25 motion-reduce:transition-none motion-reduce:transform-none ${visualSize}`}
                      >
                        <ScrollReveal
                          as="div"
                          variant="parallax"
                          distance={28}
                          className="pointer-events-none absolute -inset-12"
                        >
                          {renderBackdrop(index)}
                        </ScrollReveal>

                        {/* Static foreground plane: frame, ticks and a hover rule
                            that drifts against the parallax backdrop for depth. */}
                        <div className="pointer-events-none absolute inset-0">
                          <span className="absolute inset-4 border border-white/10 md:inset-6" />
                          <span className="absolute left-4 top-4 h-3 w-3 border-l border-t border-white/30 md:left-6 md:top-6" />
                          <span className="absolute right-4 top-4 h-3 w-3 border-r border-t border-white/30 md:right-6 md:top-6" />
                          <span className="absolute left-4 bottom-4 h-3 w-3 border-b border-l border-white/30 md:left-6 md:bottom-6" />
                          <span className="absolute right-4 bottom-4 h-3 w-3 border-b border-r border-white/30 md:right-6 md:bottom-6" />
                          <span className="absolute bottom-0 left-0 h-px w-0 bg-accent-400 transition-[width] duration-700 ease-premium group-hover:w-full motion-reduce:transition-none" />
                        </div>
                      </div>
                    </div>

                    {/* Information column: context label, description,
                        restrained mono chips and the existing footer row. */}
                    <div className={`flex flex-col justify-center gap-6 ${layout.info} ${layout.offset}`}>
                      {project.event && (
                        <p className="label self-start border border-accent-400/40 bg-accent-400/10 px-3 py-1.5 text-accent-700 dark:border-accent-500/40 dark:bg-accent-500/10 dark:text-accent-400">
                          {project.event}
                        </p>
                      )}

                      <p className="lede measure">{project.description}</p>

                      {project.technologies?.length > 0 && (
                        <ul className="flex flex-wrap gap-2">
                          {project.technologies.map((tech) => (
                            <li
                              key={tech}
                              className="label border border-hairline px-3 py-1.5 transition-colors duration-300 hover:border-hairline-strong hover:text-fg motion-reduce:transition-none"
                            >
                              {tech}
                            </li>
                          ))}
                        </ul>
                      )}

                      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-hairline pt-5">
                        {project.link ? (
                          <>
                            <motion.a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="label label-strong inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500/70"
                              whileHover={{ x: 5 }}
                            >
                              GitHub →
                            </motion.a>
                            {project.demo && (
                              <motion.a
                                href={project.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="label label-strong inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500/70"
                                whileHover={{ x: 5 }}
                              >
                                Live Demo →
                              </motion.a>
                            )}
                          </>
                        ) : (
                          <span className="label">Details available on request</span>
                        )}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Work;
