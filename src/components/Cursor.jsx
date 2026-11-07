import { useEffect, useState } from 'react';

const FINE_POINTER_QUERY = '(hover: hover) and (pointer: fine)';
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [position, setPosition] = useState({ x: -100, y: -100 });

  // Detect desktop mouse support
  useEffect(() => {
    const finePointer = window.matchMedia(FINE_POINTER_QUERY);
    const reducedMotion = window.matchMedia(REDUCED_MOTION_QUERY);

    const updateSupport = () => {
      setEnabled(finePointer.matches && !reducedMotion.matches);
    };

    updateSupport();

    finePointer.addEventListener('change', updateSupport);
    reducedMotion.addEventListener('change', updateSupport);

    return () => {
      finePointer.removeEventListener('change', updateSupport);
      reducedMotion.removeEventListener('change', updateSupport);
    };
  }, []);

  // Track actual mouse position
  useEffect(() => {
    if (!enabled) return;

    const handleMouseMove = (event) => {
      setPosition({
        x: event.clientX,
        y: event.clientY,
      });
    };

    window.addEventListener('mousemove', handleMouseMove, {
      passive: true,
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden="true"
      className="custom-cursor"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <div className="cursor-dot" />
      <div className="cursor-ring" />
    </div>
  );
}