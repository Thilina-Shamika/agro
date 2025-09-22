'use client';

import { useEffect, useRef, useState } from 'react';

interface NumberCounterProps {
  value: string; // supports units like k and %
  durationMs?: number;
  className?: string;
}

function parseValue(value: string) {
  const match = value.match(/([0-9]+(?:\.[0-9]+)?)(.*)/);
  if (!match) return { num: 0, suffix: '' };
  return { num: parseFloat(match[1]), suffix: match[2] || '' };
}

export default function NumberCounter({ value, durationMs = 1500, className }: NumberCounterProps) {
  const { num, suffix } = parseValue(value);
  const [display, setDisplay] = useState(0);
  const started = useRef(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const animate = (t: number) => {
            const progress = Math.min(1, (t - start) / durationMs);
            setDisplay(num * progress);
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      });
    }, { threshold: 0.3 });

    observer.observe(el);
    return () => observer.disconnect();
  }, [num, durationMs]);

  return (
    <div ref={ref} className={className}>
      {display % 1 === 0 ? Math.round(display) : display.toFixed(0)}{suffix}
    </div>
  );
}


