/* eslint-disable react/prop-types -- declarative API by design; the project
   does not ship the prop-types package (see ThemeContext for the same pattern). */
import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/* ==================================================================
 * PASS 5C — Reusable scroll storytelling layer
 * ------------------------------------------------------------------
 * One small wrapper that gives every section the same restrained
 * GSAP + ScrollTrigger motion vocabulary:
 *
 *   variant="section"   opacity + directional offset (+ optional stagger)
 *   variant="text"      clip-path reveal + slight rise (headings)
 *   variant="parallax"  subtle scrub translation (desktop only)
 *
 * `scale` (default 1) optionally starts a section/text reveal from a smaller
 * size (e.g. 0.96 -> 1) so a visual field settles into place on the same
 * trigger instead of needing a second ScrollTrigger.
 *
 * It registers a single ScrollTrigger for its own root (cleaned up on
 * unmount) and becomes a complete no-op — content fully visible, no
 * ScrollTrigger created — when the visitor prefers reduced motion.
 * ================================================================== */

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const EASE = 'power3.out';
const START = 'top 85%'; // fires once ~15% of the element has entered view
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';
const DESKTOP_QUERY = '(min-width: 768px)';

const ScrollReveal = ({
  as: Tag = 'div',
  variant = 'section',
  direction = 'up',
  distance = 24,
  duration = 0.8,
  delay = 0,
  stagger = 0,
  scale = 1,
  selector = null,
  once = true,
  start = START,
  className,
  children,
  ...rest
}) => {
  const rootRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root || typeof window === 'undefined') return undefined;

    // Reduced motion is resolved directly (not via CSS): no GSAP, no trigger.
    if (
      prefersReducedMotion === true ||
      window.matchMedia(REDUCED_MOTION_QUERY).matches
    ) {
      return undefined;
    }

    // Parallax is desktop-only so small screens keep simple, native motion.
    if (variant === 'parallax' && !window.matchMedia(DESKTOP_QUERY).matches) {
      return undefined;
    }

    const context = gsap.context(() => {
      const targets = selector ? root.querySelectorAll(selector) : [root];
      if (!targets.length) return;

      try {
        if (variant === 'parallax') {
          const axis = direction === 'left' || direction === 'right' ? 'x' : 'y';
          gsap.fromTo(
            targets,
            { [axis]: distance },
            {
              [axis]: -distance,
              ease: 'none',
              scrollTrigger: {
                trigger: root,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
              }
            }
          );
          return;
        }

        const from = { opacity: 0 };
        const to = { opacity: 1, duration, delay, ease: EASE, stagger };

        // Optional start scale: a visual field can settle from (say) 0.96
        // into place on this same trigger. Identity when unset, so every
        // existing caller renders exactly as before.
        if (scale !== 1) {
          from.scale = scale;
          to.scale = 1;
        }

        if (variant === 'text') {
          from.y = distance;
          from.clipPath = 'inset(0% 0% 100% 0%)';
          to.y = 0;
          to.clipPath = 'inset(0% 0% 0% 0%)';
        } else if (direction === 'up') {
          from.y = distance;
        } else if (direction === 'down') {
          from.y = -distance;
        } else if (direction === 'left') {
          from.x = distance;
        } else if (direction === 'right') {
          from.x = -distance;
        }

        gsap.fromTo(targets, from, {
          ...to,
          scrollTrigger: {
            trigger: root,
            start,
            once,
            toggleActions: once ? 'play none none none' : 'play none none reverse'
          }
        });
      } catch {
        // Safety net: never leave content hidden if an animation fails.
        gsap.set(targets, { clearProps: 'all' });
      }
    }, root);

    return () => context.revert();
  }, [
    prefersReducedMotion,
    variant,
    direction,
    distance,
    duration,
    delay,
    stagger,
    scale,
    selector,
    once,
    start
  ]);

  return (
    <Tag ref={rootRef} className={className} {...rest}>
      {children}
    </Tag>
  );
};

export default ScrollReveal;
