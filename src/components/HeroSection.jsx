import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../context/ThemeContext';

/* ==================================================================
 * PASS 5B — Cinematic hero
 * ------------------------------------------------------------------
 * Editorial, dark-first composition built on the Pass 5A design tokens
 * (canvas / surface / fg / fg-muted / hairline / signal). The name is
 * the dominant element; depth comes from CSS perspective, transforms
 * and existing DOM layers only — no WebGL, no Three.js.
 *
 * Motion is GSAP-owned: one entrance timeline plus scroll-driven layers
 * via ScrollTrigger. Under prefers-reduced-motion nothing animates and
 * the content is simply, fully visible.
 *
 * Approved content below must stay exactly as written.
 * ================================================================== */

const NAME = 'SRINIRANJAN M ANCHALKAR';
const NAME_LINES = ['SRINIRANJAN', 'M ANCHALKAR'];
const TITLE = 'INFORMATION SCIENCE • SOFTWARE DEVELOPMENT • CYBERSECURITY';
const INTRO =
  'Exploring emerging technologies, building practical applications, and solving real-world problems through code.';
const EYEBROW = "HELLO, I'M";

// Calls to action — the primary one is the only magnetic element.
const CTA_LINKS = [
  { label: 'View Projects →', href: '#projects', variant: 'primary', magnetic: true },
  { label: 'Contact →', href: '#contact', variant: 'secondary', magnetic: false }
];

const CTA_BASE =
  'group inline-flex w-full items-center justify-center border px-7 py-4 font-mono text-xs uppercase tracking-[0.24em] transition-colors duration-ui ease-premium sm:w-auto';

const CTA_VARIANTS = {
  primary:
    'border-fg/30 bg-surface/50 text-fg/90 hover:border-fg/70 hover:bg-surface hover:text-fg',
  secondary:
    'border-hairline bg-transparent text-fg-muted hover:border-fg/40 hover:text-fg'
};

// Keyboard-visible focus ring, themed with the Pass 5A tokens.
const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg/60 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas';

// PASS 6B.2 (restored) — maximum whole-portrait tilt toward the cursor, in
// degrees. Conservative: reads as alive without breaking the editorial calm.
const TILT_MAX = 5;

const HeroSection = () => {
  const prefersReducedMotion = useReducedMotion();

  // Existing theme state (src/context/ThemeContext) — drives which portrait
  // source is shown and whether the dark-only mask/treatment applies. No new
  // theme mechanism is introduced; the .dark class on <html> comes from the
  // same provider, so CSS tokens and this src swap always stay in sync.
  const { isDarkMode } = useTheme();

  // Semantic / content anchors
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const labelRef = useRef(null);
  const nameRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const ctaRef = useRef(null);

  // Decorative depth layers
  const stageRef = useRef(null);
  const fieldRef = useRef(null);
  const frameARef = useRef(null);
  const frameBRef = useRef(null);
  const ghostRef = useRef(null);
  const cueRef = useRef(null);
  const portraitRef = useRef(null);


  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    // Reduced-motion path: keep everything visible and completely static.
    const reduceMotion =
      prefersReducedMotion === true ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return undefined;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1) Entrance choreography --------------------------------------
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(stageRef.current, { autoAlpha: 0, scale: 0.99, duration: 1.4 }, 0)
        .from(labelRef.current, { autoAlpha: 0, y: 14, duration: 0.7 }, 0.15)
        .from(
          nameRef.current.querySelectorAll('.hero-name-line'),
          { autoAlpha: 0, y: 44, duration: 1.05, stagger: 0.12 },
          0.28
        )
        .from(titleRef.current, { autoAlpha: 0, y: 16, duration: 0.75 }, 0.62)
        .from(descRef.current, { autoAlpha: 0, y: 16, duration: 0.75 }, 0.78)
        .from(ctaRef.current, { autoAlpha: 0, y: 16, duration: 0.75 }, 0.94)
        .from(portraitRef.current, { autoAlpha: 0, scale: 1.05, duration: 1.3 }, 0.1);

      // 2) Scroll choreography ----------------------------------------
      const scrub = {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.5
      };

      gsap.to(contentRef.current, {
        yPercent: -6,
        autoAlpha: 0.28,
        ease: 'none',
        scrollTrigger: scrub
      });
      gsap.to(fieldRef.current, { yPercent: -14, ease: 'none', scrollTrigger: scrub });
      gsap.to(frameARef.current, { yPercent: -20, scale: 1.06, ease: 'none', scrollTrigger: scrub });
      gsap.to(frameBRef.current, { yPercent: -30, scale: 1.05, ease: 'none', scrollTrigger: scrub });
      gsap.to(portraitRef.current, { yPercent: -8, ease: 'none', scrollTrigger: scrub });
      gsap.to(ghostRef.current, { yPercent: -16, ease: 'none', scrollTrigger: scrub });

      // Scroll cue leaves early, long before the hero is out of view.
      gsap.to(cueRef.current, {
        autoAlpha: 0,
        y: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '16% top',
          scrub: true
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  // PASS 6B.2 (restored) — whole-portrait cursor tilt.
  // The portrait plate (image + aura) turns gently toward the pointer under the
  // portrait WRAPPER's own CSS perspective (see the JSX below — the stage-level
  // perspective only projects its DIRECT children, so the wrapper must supply
  // its own or the plate's 3D rotation renders flat and invisible). ROTATION
  // ONLY — never x/y/scale/opacity — so it never fights the entrance timeline or
  // the scroll scrub in the effect above, which own those transform components
  // on the same element. Driven by gsap.quickTo on GSAP's rAF ticker (no
  // per-move React state), clamped to ±TILT_MAX degrees. Skipped under
  // reduced-motion and on touch/coarse pointers; all listeners and tweens are
  // cleaned up on unmount.
  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const portrait = portraitRef.current;
    if (!portrait) return undefined;

    const reduceMotion =
      prefersReducedMotion === true ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return undefined;

    // Fine-pointer, hover-capable devices only (desktop). Touch/coarse = static.
    const finePointer =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!finePointer) return undefined;

    // Smoothed tweens for the two rotation axes. quickTo reuses one tween per
    // property and runs on GSAP's ticker — cheap and allocation-free per move.
    const tiltXTo = gsap.quickTo(portrait, 'rotationX', {
      duration: 0.6,
      ease: 'power2.out'
    });
    const tiltYTo = gsap.quickTo(portrait, 'rotationY', {
      duration: 0.6,
      ease: 'power2.out'
    });

    // Pointer position relative to the live plate box, normalized to −1..1 and
    // clamped so the tilt saturates smoothly at the edges instead of spiking.
    // One layout read per move; the guard skips while the plate is hidden (md-).
    const onMove = (event) => {
      const rect = portrait.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const nx = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width) * 2 - 1));
      const ny = Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height) * 2 - 1));
      tiltYTo(nx * TILT_MAX); // turn left/right toward the cursor
      tiltXTo(ny * TILT_MAX); // tip up/down toward the cursor
    };

    // Ease back to neutral when the pointer leaves the hero.
    const reset = () => {
      tiltXTo(0);
      tiltYTo(0);
    };

    // Scope both listeners to the hero section itself: it receives pointer
    // movement across the whole hero (the decorative stage is pointer-events-none
    // so events pass through to the section), and leaving it resets the tilt —
    // no stuck rotation while the pointer reads text or other sections.
    const hero = sectionRef.current;
    if (!hero) return undefined;

    hero.addEventListener('pointermove', onMove, { passive: true });
    hero.addEventListener('pointerleave', reset);

    return () => {
      hero.removeEventListener('pointermove', onMove);
      hero.removeEventListener('pointerleave', reset);
      // Kill/clear ONLY the rotation tweens — the entrance and scroll tweens
      // belong to the effect above and are reverted by its own cleanup.
      gsap.killTweensOf(portrait, { rotationX: true, rotationY: true });
      gsap.set(portrait, { clearProps: 'rotationX,rotationY' });
    };
  }, [prefersReducedMotion]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative isolate flex min-h-hero w-full items-center overflow-hidden bg-canvas py-28 text-fg sm:py-32 lg:py-40"
    >
      {/* ---------- Depth layers (decorative) ---------- */}
      <div
        ref={stageRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{ perspective: '1400px' }}
      >
        {/* Mobile-only cinematic portrait backdrop (visible below md only —
            the desktop plate further down is untouched). It reuses the SAME
            theme-driven image sources as the desktop <img>, so the browser
            serves the already-cached asset — no duplicated download. Two
            layers: (1) background-size: cover with the face anchored at the
            same 54% horizontal spot the desktop crop uses, grayscale in dark
            mode to match the desktop treatment; (2) a strong canvas-toned
            vertical scrim so the eyebrow, name, title, description and CTAs
            keep strong contrast at 320–430px while the portrait stays a
            quiet, cinematic texture rather than competing with the text.
            Purely decorative (inside the aria-hidden, pointer-events-none
            stage) and purely CSS — no pointer handlers are attached, so
            touch devices are unaffected; the existing tilt effect already
            guards itself on (hover: hover) and (pointer: fine). */}
        <div
          className={`absolute inset-0 bg-cover no-repeat md:hidden ${
            isDarkMode ? 'grayscale contrast-[1.05]' : ''
          }`}
          style={{
            backgroundImage: `url(${
              isDarkMode ? '/images/Sriniranjan.jpeg' : '/images/Sriniranjan_light.png'
            })`,
            backgroundPosition: '54% 30%'
          }}
        />
        <div
          className="absolute inset-0 md:hidden"
          style={{
            background: isDarkMode
              ? 'linear-gradient(180deg, rgb(var(--canvas) / 0.90) 0%, rgb(var(--canvas) / 0.62) 34%, rgb(var(--canvas) / 0.78) 68%, rgb(var(--canvas) / 0.97) 100%)'
              : 'linear-gradient(180deg, rgb(var(--canvas) / 0.86) 0%, rgb(var(--canvas) / 0.58) 36%, rgb(var(--canvas) / 0.80) 70%, rgb(var(--canvas) / 0.97) 100%)'
          }}
        />

        {/* Tonal field — a single restrained neutral gradient */}
        <div
          ref={fieldRef}
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(115% 85% at 82% 10%, rgb(var(--fg) / 0.10), transparent 58%)'
          }}
        />

        {/* Large tilted frame */}
        <div
          className="absolute right-[-8%] top-[8%] hidden lg:block"
          style={{ transform: 'rotate(-7deg) rotateY(-16deg)' }}
        >
          <div
            ref={frameARef}
            className="h-[34rem] w-[34rem] rounded-[2rem] border border-hairline bg-surface/20"
          />
        </div>

        {/* Smaller offset frame for layered depth */}
        <div
          className="absolute right-[10%] top-[34%] hidden lg:block"
          style={{ transform: 'rotate(11deg) rotateY(14deg)' }}
        >
          <div
            ref={frameBRef}
            className="h-[18rem] w-[18rem] rounded-[1.25rem] border border-hairline bg-surface/10"
          />
        </div>

        {/* Cinematic portrait — decorative plate on the right.
            Grayscale with a restrained electric-blue aura, edge-blended into
            the canvas via a radial mask so it reads as part of the composition
            rather than a rectangular photo. It lives in the decorative stage
            (pointer-events-none, behind the z-10 content), so it never covers
            the name, copy or CTAs, and is hidden on small screens to keep the
            text fully readable with no horizontal overflow. */}
        {/* Perspective for the tilt MUST live on this wrapper (or the plate needs
            preserve-3d): the stage-level perspective above only projects 3D
            transforms on its DIRECT children, and this wrapper is the stage's
            child — the tilted plate is one level deeper, so without a local
            perspective its rotationX/rotationY renders flat (≈invisible at 5°). */}
        <div
          className="pointer-events-none absolute right-[6%] top-1/2 z-0 hidden h-[60vh] max-h-[40rem] w-[76%] max-w-[42rem] -translate-y-1/2 select-none md:block lg:h-[68vh] lg:w-[52%] xl:w-[46%]"
          style={{ perspective: '1400px' }}
        >
          <div ref={portraitRef} className="absolute inset-0 will-change-transform">
            {/* Electric-blue aura glowing through the feathered edges */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(58% 58% at 70% 46%, rgb(var(--signal) / 0.20), transparent 70%)'
              }}
            />
            {/* Stationary base portrait. The restored 6B.2 tilt is applied to the
                parent plate (portraitRef) as rotation only, under this wrapper's
                own perspective; the image itself keeps its placement and mask.
                The src follows the existing theme context: dark mode keeps the
                original masked, grayscale jpeg; light mode shows the purpose-
                built light portrait with NO radial mask, halo or tone treatment
                — its own background blends into the canvas naturally. */}
            <img
              src={isDarkMode ? '/images/Sriniranjan.jpeg' : '/images/Sriniranjan_light.png'}
              alt=""
              decoding="async"
              className={
                isDarkMode
                  ? 'absolute inset-0 h-full w-full object-cover object-[54%_38%] grayscale contrast-[1.05]'
                  : 'absolute inset-0 h-full w-full object-cover object-[54%_38%]'
              }
              style={
                isDarkMode
                  ? {
                      maskImage:
                        'radial-gradient(80% 70% at 52% 46%, #000 0%, #000 34%, rgba(0, 0, 0, 0.92) 54%, rgba(0, 0, 0, 0.55) 72%, rgba(0, 0, 0, 0.14) 90%, transparent 100%)',
                      WebkitMaskImage:
                        'radial-gradient(80% 70% at 52% 46%, #000 0%, #000 34%, rgba(0, 0, 0, 0.92) 54%, rgba(0, 0, 0, 0.55) 72%, rgba(0, 0, 0, 0.14) 90%, transparent 100%)'
                    }
                  : undefined
              }
            />
          </div>
        </div>

        {/* Oversized typographic fragment, clipped as texture */}
        <div className="absolute inset-x-0 bottom-[-6%] hidden overflow-hidden md:block">
          <div
            ref={ghostRef}
            className="select-none whitespace-nowrap text-center font-display font-bold leading-none text-fg/5"
            style={{ fontSize: 'clamp(6rem, 19vw, 20rem)' }}
          >
            {NAME_LINES[0]}
          </div>
        </div>

        {/* Minimal scroll cue */}
        <div ref={cueRef} className="absolute inset-x-0 bottom-6 flex flex-col items-center gap-3">
          <span className="block h-8 w-px bg-hairline" />
          <span className="block h-1.5 w-1.5 bg-fg/40" />
        </div>
      </div>

      {/* ---------- Content ---------- */}
      <div className="relative z-10 mx-auto w-full max-w-wide px-5 sm:px-8 lg:px-12">
        <div ref={contentRef}>
          {/* Small technical label */}
          <p
            ref={labelRef}
            className="eyebrow flex items-center gap-3 text-fg-muted tracking-[0.3em]"
          >
            <span aria-hidden="true" className="h-1.5 w-1.5 bg-signal" />
            {EYEBROW}
          </p>

          {/* Name — the dominant visual element */}
          <h1
            ref={nameRef}
            aria-label={NAME}
            className="display mt-6 break-words text-display-xl sm:mt-8"
          >
            {NAME_LINES.map((line) => (
              <span key={line} className="hero-name-line block">
                {line}
              </span>
            ))}
          </h1>

          {/* Technical title */}
          <p
            ref={titleRef}
            className="eyebrow mt-6 max-w-3xl text-fg-muted leading-relaxed tracking-[0.16em] sm:mt-8 sm:tracking-[0.24em]"
          >
            {TITLE}
          </p>

          {/* Description */}
          <p ref={descRef} className="lede mt-6 max-w-[52ch] sm:mt-8">
            {INTRO}
          </p>

          {/* Calls to action */}
          <div
            ref={ctaRef}
            className="mt-10 flex flex-col gap-3 sm:mt-14 sm:flex-row sm:items-center sm:gap-4"
          >
            {CTA_LINKS.map(({ label, href, variant, magnetic }) => (
              <a
                key={href}
                href={href}
                {...(magnetic ? { 'data-cursor': 'magnetic' } : {})}
                className={`${CTA_BASE} ${CTA_VARIANTS[variant]} ${FOCUS_RING}`}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
