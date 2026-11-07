import ScrollReveal from './ScrollReveal';

// Technology categories and their respective skills.
const techStack = [
  {
    category: 'Languages',
    technologies: ['Java', 'Python', 'C/C++', 'JavaScript', 'SQL']
  },
  {
    category: 'Backend & Web',
    technologies: ['Spring Boot', 'Node.js', 'REST APIs', 'HTML', 'CSS', 'Flutter']
  },
  {
    category: 'AI & Data',
    technologies: [
      'Pandas',
      'NumPy',
      'Scikit-learn',
      'Data Analysis',
      'Machine Learning',
      'Computer Vision'
    ]
  },
  {
    category: 'Tools & Platforms',
    technologies: ['Git', 'GitHub', 'VS Code', 'Jupyter', 'MySQL', 'Maven']
  }
];

// Calculate the total number of technologies automatically.
const totalSkills = techStack.reduce(
  (total, category) => total + category.technologies.length,
  0
);

const Skills = () => {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="section pt-24 bg-primary-50 dark:bg-dark-900 transition-colors duration-200"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">

          {/* Section heading */}
          <ScrollReveal
            as="div"
            selector=":scope > *"
            stagger={0.1}
            className="mb-12 md:mb-16 flex flex-col gap-5"
          >
            <p className="eyebrow flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 bg-signal"
              />
              Technology
            </p>

            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2
                id="skills-heading"
                className="section-heading"
              >
                <span className="border-b-2 border-primary-200 dark:border-dark-700 pb-2">
                  SKILLS
                </span>
              </h2>

              <p className="label pb-2">
                <span className="text-fg">
                  {String(techStack.length).padStart(2, '0')}
                </span>{' '}
                Categories
                <span
                  aria-hidden="true"
                  className="mx-2 text-fg-faint"
                >
                  /
                </span>
                <span className="text-fg">
                  {String(totalSkills).padStart(2, '0')}
                </span>{' '}
                Technologies
              </p>
            </div>

            <p className="text-base sm:text-lg text-primary-700 dark:text-dark-200">
              Technologies I use to build, experiment, and learn.
            </p>
          </ScrollReveal>

          {/* Horizontal technology categories */}
          <div>
            {techStack.map((category, index) => (
              <ScrollReveal
                key={category.category}
                as="div"
                variant="fade"
                className="grid grid-cols-1 md:grid-cols-[30%_70%] gap-5 md:gap-8 py-7 md:py-9 border-t border-hairline last:border-b"
              >
                {/* Category name */}
                <h3 className="text-sm md:text-base font-bold uppercase tracking-wider text-primary-700 dark:text-dark-200">
                  {category.category}
                </h3>

                {/* Technology names */}
                <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
                  {category.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-base md:text-lg text-fg dark:text-dark-200 transition-colors duration-200 hover:text-primary-500 dark:hover:text-primary-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Skills;