'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

interface Testimonial {
  customer_name: string;
  profile_pic?: { url: string; alt: string };
  testimonials_texts: string;
}

interface Props {
  items: Testimonial[];
}

// Simple CSS-driven infinite slider using duplicated track
export default function TestimonialsSlider({ items }: Props) {
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // restart animation when items change
    const el = trackRef.current;
    if (!el) return;
    el.style.animation = 'none';
    // force reflow
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    el.offsetHeight;
    el.style.animation = '';
  }, [items]);

  const renderCard = (t: Testimonial, idx: number) => (
    <div key={idx} className="min-w-[320px] max-w-sm bg-white/80 backdrop-blur rounded-2xl p-6 shadow-lg border border-white/40">
      <div className="flex items-center gap-4 mb-4">
        {t.profile_pic?.url && (
          <div className="relative w-12 h-12 rounded-full overflow-hidden">
            <Image src={t.profile_pic.url} alt={t.profile_pic.alt || t.customer_name} fill className="object-cover" />
          </div>
        )}
        <div className="font-semibold text-gray-900">{t.customer_name}</div>
      </div>
      <p className="text-gray-700 leading-relaxed">{t.testimonials_texts}</p>
    </div>
  );

  const duplicated = [...items, ...items];

  return (
    <div className="overflow-hidden">
      <div
        ref={trackRef}
        className="flex gap-6 animate-[testimonialScroll_25s_linear_infinite]"
        style={{ willChange: 'transform' }}
      >
        {duplicated.map((t, i) => renderCard(t, i))}
      </div>
      <style jsx>{`
        @keyframes testimonialScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}


