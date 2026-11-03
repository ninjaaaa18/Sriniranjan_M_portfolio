import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

/* ==================================================================
 * PASS 5A.1 — Premium cursor interaction system
 * ------------------------------------------------------------------
 * A purely decorative desktop / fine-pointer interaction layer. It
 * never changes layout, copy or section design, and it renders nothing
 * (native cursor untouched) on touch or coarse pointers, or whenever
 * the visitor prefers reduced motion.
 *
 * Visual language comes entirely from the Pass 5A tokens declared in
 * src/index.css (rgb(var(--fg)) -> off-white on dark, near-black on
 * light). No new colours, gradients, glows or shadows are introduced.
 * ================================================================== */

const FINE_POINTER_QUERY = '(hover: hover) and (pointer: fine)';
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

// Interactive elements are matched by delegation, so no NodeList is cached
// and no DOM query runs on every pointer move — only on enter/leave events.
const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, [data-cursor="interactive"], [data-cursor="magnetic"]';
const MAGNETIC_SELECTOR = '[data-cursor="magnetic"]';

// Restrained magnetic pull: transform-only, tiny, clamped, eased.
const MAGNETIC_STRENGTH = 0.25;
const MAGNETIC_MAX_OFFSET = 6;

// Restrained sizes / opacities.
const DOT_SIZE = 7;
const RING_SIZE = 30;
const DOT_IDLE_OPACITY = 0.9;
const DOT_HOVER_OPACITY = 0.6;
const RING_IDLE_OPACITY = 0.6;
const RING_HOVER_OPACITY = 0.95;
const DOT_HOVER_SCALE = 0.6;
const RING_HOVER_SCALE = 1.5;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

// Capability check (not viewport width): fine pointer + motion allowed.
const detectCustomCursorSupport = () => {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }

  return (
    window.matchMedia(FINE_POINTER_QUERY).matches &&
    !window.matchMedia(REDUCED_MOTION_QUERY).matches
  );
};

const Cursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [enabled, setEnabled] = useState(detectCustomCursorSupport);

  // Re-evaluate when the pointer capability or the motion preference changes
  // (e.g. a mouse attached to a tablet, or reduced motion switched on live).
  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return undefined;
    }

    const finePointer = window.matchMedia(FINE_POINTER_QUERY);
    const reducedMotion = window.matchMedia(REDUCED_MOTION_QUERY);

    const sync = () => setEnabled(finePointer.matches && !reducedMotion.matches);
    sync();

    finePointer.addEventListener('change', sync);
    reducedMotion.addEventListener('change', sync);

    return () => {
      finePointer.removeEventListener('change', sync);
      reducedMotion.removeEventListener('change', sync);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return undefined;

    // Hide the native cursor only inside supported fine-pointer desktop
    // environments, and only while motion is allowed. The rule is removed on
    // cleanup, keyboard focus is untouched, and text fields keep their caret.
    const nativeCursorStyle = document.createElement('style');
    nativeCursorStyle.setAttribute('data-premium-cursor', 'true');
    nativeCursorStyle.textContent = `
      @media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
        html, body, body * { cursor: none !important; }
        input, textarea, select, option, [contenteditable="true"] { cursor: auto !important; }
      }
    `;
    document.head.appendChild(nativeCursorStyle);

    let removeListeners = () => {};

    const context = gsap.context(() => {
      const startX = window.innerWidth / 2;
      const startY = window.innerHeight / 2;

      gsap.set([dot, ring], {
        xPercent: -50,
        yPercent: -50,
        x: startX,
        y: startY,
        opacity: 0,
      });

      // quickTo reuses a single tween per property: no tween is allocated per
      // pointer event. The dot snaps, the ring trails.
      const dotX = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power3.out' });
      const dotY = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power3.out' });
      const ringX = gsap.quickTo(ring, 'x', { duration: 0.5, ease: 'power3.out' });
      const ringY = gsap.quickTo(ring, 'y', { duration: 0.5, ease: 'power3.out' });
      const dotOpacity = gsap.quickTo(dot, 'opacity', { duration: 0.35, ease: 'power2.out' });
      const ringOpacity = gsap.quickTo(ring, 'opacity', { duration: 0.35, ease: 'power2.out' });
      const dotScale = gsap.quickTo(dot, 'scale', { duration: 0.3, ease: 'power2.out' });
      const ringScale = gsap.quickTo(ring, 'scale', { duration: 0.4, ease: 'power2.out' });

      let pointerX = startX;
      let pointerY = startY;
      let initialized = false;
      let hovering = false;
      let magneticEl = null;
      let magneticX = null;
      let magneticY = null;

      const paintState = () => {
        dotOpacity(hovering ? DOT_HOVER_OPACITY : DOT_IDLE_OPACITY);
        ringOpacity(hovering ? RING_HOVER_OPACITY : RING_IDLE_OPACITY);
        dotScale(hovering ? DOT_HOVER_SCALE : 1);
        ringScale(hovering ? RING_HOVER_SCALE : 1);
      };

      const applyHover = (next) => {
        if (next === hovering) return;
        hovering = next;
        if (!initialized) return;
        paintState();
      };

      const endMagnetic = () => {
        if (!magneticEl) return;
        const element = magneticEl;
        magneticEl = null;
        magneticX = null;
        magneticY = null;
        // context.add() registers the animation with the context so it is
        // killed and reverted on unmount along with everything else.
        context.add(() => {
          gsap.to(element, { x: 0, y: 0, duration: 0.7, ease: 'power3.out' });
        });
      };

      const beginMagnetic = (element) => {
        magneticEl = element;
        context.add(() => {
          magneticX = gsap.quickTo(element, 'x', { duration: 0.6, ease: 'power3.out' });
          magneticY = gsap.quickTo(element, 'y', { duration: 0.6, ease: 'power3.out' });
        });
      };

      const updateMagnetic = () => {
        if (!magneticEl || !magneticX) return;

        // Read the true layout centre (rect minus the transform we applied)
        // so the pull never feeds back into itself and stays stable.
        const rect = magneticEl.getBoundingClientRect();
        const currentX = Number(gsap.getProperty(magneticEl, 'x')) || 0;
        const currentY = Number(gsap.getProperty(magneticEl, 'y')) || 0;
        const centerX = rect.left + rect.width / 2 - currentX;
        const centerY = rect.top + rect.height / 2 - currentY;

        magneticX(clamp((pointerX - centerX) * MAGNETIC_STRENGTH, -MAGNETIC_MAX_OFFSET, MAGNETIC_MAX_OFFSET));
        magneticY(clamp((pointerY - centerY) * MAGNETIC_STRENGTH, -MAGNETIC_MAX_OFFSET, MAGNETIC_MAX_OFFSET));
      };

      const onPointerMove = (event) => {
        pointerX = event.clientX;
        pointerY = event.clientY;

        dotX(pointerX);
        dotY(pointerY);
        ringX(pointerX);
        ringY(pointerY);

        if (!initialized) {
          initialized = true;
          paintState();
        }

        if (magneticEl) updateMagnetic();
      };

      const onPointerOver = (event) => {
        const target = event.target;
        if (!target || typeof target.closest !== 'function') return;

        if (target.closest(INTERACTIVE_SELECTOR)) applyHover(true);

        const magnetic = target.closest(MAGNETIC_SELECTOR);
        if (magnetic && magnetic !== magneticEl) {
          endMagnetic();
          beginMagnetic(magnetic);
        }
      };

      const onPointerOut = (event) => {
        const target = event.target;
        if (!target || typeof target.closest !== 'function') return;

        const related = event.relatedTarget;
        const relatedEl = related && typeof related.closest === 'function' ? related : null;

        if (!(relatedEl && relatedEl.closest(INTERACTIVE_SELECTOR))) {
          applyHover(false);
        }

        if (magneticEl) {
          const nextMagnetic = relatedEl ? relatedEl.closest(MAGNETIC_SELECTOR) : null;
          if (nextMagnetic !== magneticEl) endMagnetic();
        }
      };

      const onWindowLeave = () => {
        dotOpacity(0);
        ringOpacity(0);
      };

      const onWindowEnter = () => {
        if (!initialized) return;
        paintState();
      };

      // Passive listeners: pointer sampling never blocks clicks or scrolling.
      window.addEventListener('pointermove', onPointerMove, { passive: true });
      window.addEventListener('pointerover', onPointerOver, { passive: true });
      window.addEventListener('pointerout', onPointerOut, { passive: true });
      document.documentElement.addEventListener('mouseleave', onWindowLeave);
      document.documentElement.addEventListener('mouseenter', onWindowEnter);

      removeListeners = () => {
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('pointerover', onPointerOver);
        window.removeEventListener('pointerout', onPointerOut);
        document.documentElement.removeEventListener('mouseleave', onWindowLeave);
        document.documentElement.removeEventListener('mouseenter', onWindowEnter);
      };
    });

    return () => {
      removeListeners();
      // Stop the reusable quickTo tweens, then revert everything the context
      // created (cursor transforms + any magnetic element transforms).
      gsap.killTweensOf([dot, ring]);
      context.revert();
      if (nativeCursorStyle.parentNode) {
        nativeCursorStyle.parentNode.removeChild(nativeCursorStyle);
      }
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0"
        style={{
          zIndex: 9999,
          width: `${DOT_SIZE}px`,
          height: `${DOT_SIZE}px`,
          borderRadius: '9999px',
          backgroundColor: 'rgb(var(--fg))',
          opacity: 0,
          transform: 'translate(-50%, -50%)',
          willChange: 'transform, opacity',
        }}
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0"
        style={{
          zIndex: 9999,
          width: `${RING_SIZE}px`,
          height: `${RING_SIZE}px`,
          borderRadius: '9999px',
          border: '1px solid rgb(var(--fg) / 0.4)',
          backgroundColor: 'rgb(var(--fg) / 0.03)',
          opacity: 0,
          transform: 'translate(-50%, -50%)',
          willChange: 'transform, opacity',
        }}
      />
    </>
  );
};

export default Cursor;


