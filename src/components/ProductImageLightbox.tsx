'use client';

import Image from 'next/image';
import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { Search } from 'lucide-react';

interface Props {
  src: string;
  alt?: string;
}

export default function ProductImageLightbox({ src, alt }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="relative w-full h-[460px] rounded-3xl overflow-hidden bg-[#f5f3f0] group"
      >
        <div className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center shadow group-hover:bg-white">
          <Search className="w-5 h-5 text-gray-700" />
        </div>
        <Image src={src} alt={alt || ''} fill className="object-contain" />
      </button>

      <Lightbox open={open} close={() => setOpen(false)} slides={[{ src, alt }]} />
    </div>
  );
}


