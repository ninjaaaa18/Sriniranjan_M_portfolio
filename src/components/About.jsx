import ScrollReveal from './ScrollReveal';

// Technical interests — the three focus areas listed in the right column.
const INTERESTS = [
  { number: '01', title: 'Software Development', description: 'Building practical applications and exploring modern web technologies.' },
  { number: '02', title: 'Artificial Intelligence', description: 'Exploring machine learning and computer vision through hands-on projects.' },
  { number: '03', title: 'Cybersecurity', description: 'Learning about security concepts through technical challenges and CTF practice.' }
];

// Decorative corner accents, kept out of the accessibility tree.
const CornerTicks = () => (
  <>
    <div className="absolute -top-1 -left-1 h-2 w-2 bg-primary-200 dark:bg-dark-700"></div>
    <div className="absolute -top-1 -right-1 h-2 w-2 bg-primary-200 dark:bg-dark-700"></div>
    <div className="absolute -bottom-1 -left-1 h-2 w-2 bg-primary-200 dark:bg-dark-700"></div>
    <div className="absolute -bottom-1 -right-1 h-2 w-2 bg-primary-200 dark:bg-dark-700"></div>
  </>
);

const About = () => {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="bg-primary-50 dark:bg-dark-900 pt-20 transition-colors duration-200"
    >
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal
            as="div"
            selector=":scope > *"
            stagger={0.1}
            className="mb-12 flex flex-col gap-5"
          >
            <p className="eyebrow flex items-center gap-3">
              <span aria-hidden="true" className="h-1.5 w-1.5 bg-signal" />
              About Me
            </p>

            <h2
              id="about-heading"
              className="display max-w-[24ch] text-display-md text-fg md:text-display-lg"
            >
              Curious about technology. Driven to build. Always learning.
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-10 lg:gap-14">
            <ScrollReveal
              as="div"
              selector=":scope > p"
              stagger={0.1}
              duration={0.7}
              className="flex flex-col gap-6 md:col-span-7"
            >
              <p className="text-base sm:text-lg text-primary-700 dark:text-dark-200 leading-relaxed break-words">
                I&rsquo;m an Information Science and Engineering student at Atria Institute of
                Technology, Bengaluru, interested in software development, artificial intelligence,
                and cybersecurity.
              </p>

              <p className="text-base sm:text-lg text-primary-700 dark:text-dark-200 leading-relaxed break-words">
                I enjoy turning ideas into practical applications, exploring new technologies, and
                learning by building projects. From developing web applications to experimenting
                with machine learning, I like understanding how things work and finding ways to
                make them useful.
              </p>

              <p className="text-base sm:text-lg text-primary-700 dark:text-dark-200 leading-relaxed break-words">
                Hackathons and technical challenges give me opportunities to experiment with ideas,
                collaborate with others, and approach unfamiliar problems from different
                perspectives.
              </p>
            </ScrollReveal>

            <div className="relative md:col-span-5">
              <div
                aria-hidden="true"
                className="absolute inset-0 border border-primary-200 dark:border-dark-700 bg-primary-100/30 dark:bg-dark-800/30"
              >
                <CornerTicks />
              </div>

              <ScrollReveal
                as="div"
                selector=":scope > *"
                stagger={0.1}
                duration={0.7}
                className="relative p-6 sm:p-8"
              >
                <h3 className="label label-strong">Technical Interests</h3>

                <ul className="mt-6">
                  {INTERESTS.map((item) => (
                    <li
                      key={item.number}
                      className="border-t border-hairline py-5 first:border-t-0 first:pt-0"
                    >
                      <div className="flex items-baseline gap-4">
                        <span aria-hidden="true" className="label text-fg-faint">
                          {item.number}
                        </span>
                        <h4 className="label label-strong min-w-0 break-words">
                          {item.title}
                        </h4>
                      </div>

                      <p className="mt-2 text-sm leading-relaxed text-primary-700 dark:text-dark-200 break-words">
                        {item.description}
                      </p>
                    </li>
                  ))}
                </ul>

                {/* Highlighted CGPA */}
                <div className="mt-6 border border-primary-300/40 dark:border-accent-400/30 bg-primary-100/50 dark:bg-accent-400/5 px-4 py-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="text-xs font-mono font-semibold uppercase tracking-[0.2em] text-primary-600 dark:text-accent-400">
                      Current CGPA
                    </span>

                    <span className="text-3xl font-bold font-mono tracking-tight text-primary-900 dark:text-dark-50">
                      8.30
                    </span>
                  </div>

                  <div className="mt-3 h-px w-full bg-primary-200 dark:bg-dark-700"></div>

                  <p className="mt-3 text-xs tracking-wide text-primary-700 dark:text-dark-200">
                    Atria Institute of Technology
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
