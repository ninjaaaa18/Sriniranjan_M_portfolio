import { useReducedMotion } from 'framer-motion';

// The name below is the same one already published in this project (index.html
// <title>, author meta tag and the hero heading). Do not add job claims,
// experience, certifications, achievements, social URLs, emails, location,
// college details or technology lists here.
const OWNER_NAME = 'Sriniranjan M Anchalkar';

// Keyboard-visible focus ring, themed for both light and dark surfaces.
const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-50 dark:focus-visible:ring-dark-400 dark:focus-visible:ring-dark-900';

const Footer = () => {
  const prefersReducedMotion = useReducedMotion();
  const currentYear = new Date().getFullYear();

  // Reuses the same scrolling approach as the navbar: an anchor to "#hero"
  // scrolled smoothly into view, with smooth behaviour dropped when the
  // visitor prefers reduced motion.
  const handleBackToTop = (event) => {
    event.preventDefault();

    const hero = document.getElementById('hero');
    if (!hero) return;

    if (prefersReducedMotion) {
      hero.scrollIntoView({ block: 'start' });
    } else {
      hero.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer
      aria-label="Site footer"
      className="border-t border-primary-200 bg-primary-50 transition-colors duration-200 dark:border-dark-700 dark:bg-dark-900"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between sm:gap-6">
          <p className="text-center font-mono text-sm tracking-widest text-primary-700 break-words sm:text-left dark:text-dark-200">
            {OWNER_NAME}
          </p>

          <a
            href="#hero"
            onClick={handleBackToTop}
            aria-label="Back to top of page"
            className={`inline-flex items-center gap-2 border border-primary-200 bg-primary-100/30 px-4 py-2 font-mono text-xs uppercase tracking-widest text-primary-700 transition-colors duration-200 hover:border-primary-300 hover:bg-primary-100/60 hover:text-primary-900 dark:border-dark-700 dark:bg-dark-800/30 dark:text-dark-200 dark:hover:border-dark-600 dark:hover:bg-dark-800/60 dark:hover:text-dark-50 ${FOCUS_RING}`}
          >
            <span aria-hidden="true">↑</span>
            Back to top
          </a>
        </div>

        <div className="mt-6 border-t border-primary-200 pt-6 dark:border-dark-700">
          <p className="text-center font-mono text-xs tracking-widest text-primary-500 break-words dark:text-dark-400">
            © {currentYear} {OWNER_NAME}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
