import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

// Navigation destinations, unchanged.
const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'hackathons', label: 'Hackathons' },
  { id: 'ctf', label: 'CTF' },
  { id: 'contact', label: 'Contact' }
];

// Shared link styling: padded so the hit area is comfortable on desktop.
const LINK_BASE =
  'relative inline-flex items-center px-3 py-2 font-mono text-sm uppercase tracking-widest transition-colors duration-200';

// Keyboard-visible focus ring, themed for both light and dark surfaces.
const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-50 dark:focus-visible:ring-dark-400 dark:focus-visible:ring-offset-dark-900';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const prefersReducedMotion = useReducedMotion();

  // The bar slides in on load unless the visitor prefers reduced motion.
  const navEntrance = prefersReducedMotion
    ? {}
    : { initial: { y: -100 }, animate: { y: 0 }, transition: { duration: 0.5, ease: 'easeOut' } };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Check which section is in view
      const sections = navLinks.map(link => document.getElementById(link.id));
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      // If we're at the top of the page, no section is active
      if (window.scrollY < 100) {
        setActiveSection(null);
        return;
      }

      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i] && scrollPosition >= sections[i].offsetTop) {
          setActiveSection(navLinks[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Let keyboard users dismiss the mobile menu.
  useEffect(() => {
    if (!isMenuOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setIsMenuOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  const smoothScrollTo = (targetId) => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Single navigation handler: scrolls to the section and closes the mobile menu.
  const handleNavigate = (event, id) => {
    event.preventDefault();
    smoothScrollTo(id);
    setIsMenuOpen(false);
  };

  return (
    <motion.nav
      {...navEntrance}
      aria-label="Primary"
      className={`fixed z-50 w-full border-b transition-colors duration-300 ${
        isScrolled
          ? 'border-primary-200 bg-primary-50 dark:border-dark-700 dark:bg-dark-900'
          : 'border-transparent bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo — supplied S+N mark (/images/sn-logo.png), unchanged in both
              themes. A tight dark chip (no border, minimal padding) keeps the
              off-white strokes legible against the light canvas; on dark the
              chip matches the navbar surface, so the mark reads as floating. */}
          <motion.a
            href="#hero"
            onClick={(event) => handleNavigate(event, 'hero')}
            aria-label="Back to top"
            whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={`inline-flex h-9 w-9 items-center justify-center bg-dark-900 p-1 transition-opacity duration-200 hover:opacity-90 ${FOCUS_RING}`}
          >
            <img
              src="/images/sn-logo.png"
              alt="Sriniranjan logo"
              className="h-full w-full object-contain"
            />
          </motion.a>

          {/* Desktop navigation */}
          <div className="hidden items-center md:flex">
            <div className="flex items-center gap-1">
              {navLinks.map(({ id, label }) => {
                const isActive = activeSection === id;

                return (
                  <motion.a
                    key={id}
                    href={`#${id}`}
                    onClick={(event) => handleNavigate(event, id)}
                    aria-current={isActive ? 'true' : undefined}
                    whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className={`group ${LINK_BASE} ${FOCUS_RING} ${
                      isActive
                        ? 'text-primary-900 dark:text-dark-50'
                        : 'text-primary-700 hover:text-primary-900 dark:text-dark-200 dark:hover:text-dark-50'
                    }`}
                  >
                    {label}
                    {/* Hover hint underline (CSS only) */}
                    <span
                      aria-hidden="true"
                      className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-primary-400 transition-transform duration-300 group-hover:scale-x-100 dark:bg-dark-500"
                    ></span>
                    {/* Active-section indicator */}
                    <motion.span
                      aria-hidden="true"
                      className="absolute bottom-0 left-0 h-px w-full origin-left bg-primary-700 dark:bg-dark-200"
                      initial={false}
                      animate={{ scaleX: isActive ? 1 : 0 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    />
                  </motion.a>
                );
              })}
            </div>

            <span
              aria-hidden="true"
              className="mx-3 h-5 w-px bg-primary-200 dark:bg-dark-700"
            ></span>
            <ThemeToggle />
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              className={`-mr-2 inline-flex h-10 w-10 items-center justify-center text-primary-900 transition-colors duration-200 hover:bg-gray-800/10 dark:text-dark-50 dark:hover:bg-white/10 ${FOCUS_RING}`}
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-navigation"
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: -12 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="border-b border-primary-200 bg-primary-50 md:hidden dark:border-dark-700 dark:bg-dark-900"
          >
            <div className="container mx-auto px-4 py-2">
              <ul className="divide-y divide-primary-200 dark:divide-dark-700">
                {navLinks.map(({ id, label }) => {
                  const isActive = activeSection === id;

                  return (
                    <li key={id}>
                      <a
                        href={`#${id}`}
                        onClick={(event) => handleNavigate(event, id)}
                        aria-current={isActive ? 'true' : undefined}
                        className={`block py-3 font-mono text-sm uppercase tracking-widest transition-colors duration-200 ${FOCUS_RING} ${
                          isActive
                            ? 'text-primary-900 dark:text-dark-50'
                            : 'text-primary-700 hover:text-primary-900 dark:text-dark-200 dark:hover:text-dark-50'
                        }`}
                      >
                        {label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;