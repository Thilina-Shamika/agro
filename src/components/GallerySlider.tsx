'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

interface GalleryItem {
  url: string;
  alt?: string;
}

interface Props {
  items: GalleryItem[];
}

export default function GallerySlider({ items }: Props) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const slides = useMemo(() => items.map((i) => ({ src: i.url, alt: i.alt })), [items]);

  // advance one slide at a time (desktop shows 3 items)
  useEffect(() => {
    if (items.length === 0) return;
    const id = setInterval(() => setActive((a) => a + 1), 3000);
    return () => clearInterval(id);
  }, [items.length]);

  // handle seamless loop by resetting without transition when we reach duplicate boundary
  const total = items.length;
  const displayItems = [...items, ...items, ...items]; // triple for smooth wrap
  const logicalIndex = active % total;

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.style.transition = 'transform 600ms ease';
    const translate = `translateX(calc(${-(active) * (100 / 3)}%))`;
    el.style.transform = translate;

    // instant jump when we have advanced a full cycle to avoid large numbers
    if (active > 0 && active % total === 0) {
      const timeout = setTimeout(() => {
        if (!trackRef.current) return;
        trackRef.current.style.transition = 'none';
        trackRef.current.style.transform = `translateX(0)`;
        setActive(0);
      }, 610);
      return () => clearTimeout(timeout);
    }
  }, [active, total]);

  return (
    <div>
      <div className="overflow-hidden">
        <div ref={trackRef} className="flex">
          {displayItems.map((img, i) => (
            <button
              key={i}
              className="slide-card relative h-[220px] md:h-[280px] rounded-2xl overflow-hidden shadow-lg border border-gray-100"
              onClick={() => {
                setIndex(i % items.length);
                setOpen(true);
              }}
            >
              <Image src={img.url} alt={img.alt || `gallery ${i + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      </div>

      <Lightbox open={open} close={() => setOpen(false)} slides={slides} index={index} carousel={{ finite: false }} />

      <style jsx>{`
        .slide-card { flex: 0 0 calc(100% / 3); margin-right: 1.5rem; }
        @media (max-width: 1024px) { .slide-card { flex-basis: 80%; } }
        @media (max-width: 640px) { .slide-card { flex-basis: 100%; } }
      `}</style>
    </div>
  );
}


