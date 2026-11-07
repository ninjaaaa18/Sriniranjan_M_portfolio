import { motion, useReducedMotion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

// Project information
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
  },
  {
    title: 'Kheti Sethu – Smart India Hackathon',
    description:
      'Farmer-market linkage platform designed to improve agricultural price discovery and connect farmers with buyers.',
    technologies: ['Python', 'FastAPI', 'PostgreSQL', 'React'],
    link: null,
    demo: null
  },
  {
    title: 'Mapping Unsafe Streets for Women',
    description:
      'Public-safety solution focused on identifying and mapping unsafe streets to support safer route discovery.',
    technologies: [],
    link: null,
    demo: null
  },
  {
    title: 'Grocery Delivery Application',
    description:
      'Android grocery delivery application developed as part of the Mobile Application Development (MAD) laboratory project.',
    technologies: [],
    link: null,
    demo: null
  },
  {
    title: 'QR-Based E-Canteen System',
    description:
      'QR-based digital canteen solution designed to simplify food ordering and improve the canteen experience.',
    technologies: [],
    link: null,
    event: '2nd Place Winner',
    demo: null
  }
];

const Work = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="section pt-16 md:pt-20 pb-0 bg-primary-50 dark:bg-dark-900 transition-colors duration-200"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">

          {/* Projects section heading */}
          <ScrollReveal
            as="h2"
            variant="text"
            id="projects-heading"
            className="section-heading mb-12 md:mb-16"
          >
            <span className="border-b-2 border-primary-200 dark:border-dark-700 pb-2">
              PROJECTS
            </span>
          </ScrollReveal>

          {/* Responsive project grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">

            {projects.map((project, index) => {
              const number = String(index + 1).padStart(2, '0');

              return (
                <motion.article
                  key={project.title}
                  whileHover={
                    prefersReducedMotion ? undefined : { y: -5 }
                  }
                  transition={{
                    duration: 0.3,
                    ease: 'easeOut'
                  }}
                  className="group relative flex flex-col h-full border border-hairline p-6 md:p-7 lg:p-8 bg-transparent hover:border-accent-500/50 transition-colors duration-300"
                >
                  <ScrollReveal
                    as="div"
                    selector=":scope > *"
                    stagger={0.08}
                    className="flex flex-col flex-1"
                  >

                    {/* Project number */}
                    <div className="flex items-center gap-4 mb-5">
                      <span
                        aria-hidden="true"
                        className="font-mono font-bold text-4xl md:text-5xl leading-none text-fg/20 dark:text-fg/15"
                      >
                        {number}
                      </span>

                      <span
                        aria-hidden="true"
                        className="h-px flex-1 bg-hairline transition-colors duration-500 group-hover:bg-accent-500/60"
                      />
                    </div>

                    {/* Project title */}
                    <h3 className="display text-2xl md:text-3xl text-fg mb-5">
                      {project.title}
                    </h3>

                    {/* Achievement badge */}
                    {project.event && (
                      <p className="label self-start border border-accent-400/40 bg-accent-400/10 px-3 py-1.5 mb-5 text-accent-700 dark:border-accent-500/40 dark:bg-accent-500/10 dark:text-accent-400">
                        {project.event}
                      </p>
                    )}

                    {/* Project description */}
                    <p className="lede mb-6">
                      {project.description}
                    </p>

                    {/* Technology tags */}
                    {project.technologies.length > 0 && (
                      <ul className="flex flex-wrap gap-2 mb-6">
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

                    {/* Project links */}
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-hairline pt-5 mt-auto">

                      {project.link ? (
                        <>
                          <motion.a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="label label-strong inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500/70"
                            whileHover={
                              prefersReducedMotion ? undefined : { x: 5 }
                            }
                          >
                            GitHub →
                          </motion.a>

                          {project.demo && (
                            <motion.a
                              href={project.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="label label-strong inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500/70"
                              whileHover={
                                prefersReducedMotion ? undefined : { x: 5 }
                              }
                            >
                              Live Demo →
                            </motion.a>
                          )}
                        </>
                      ) : (
                        <span className="label">
                          Details available on request
                        </span>
                      )}

                    </div>

                  </ScrollReveal>
                </motion.article>
              );
            })}

          </div>
        </div>
      </div>
    </section>
  );
};

export default Work;