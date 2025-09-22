import { fetchTestimonialsData } from '@/lib/wordpress';
import Image from 'next/image';
import TestimonialsSlider from '@/components/TestimonialsSlider';

export default async function TestimonialsPage() {
  const data = await fetchTestimonialsData();

  return (
    <div className="min-h-screen">
      {/* Hero - match contact styling */}
      <section className="relative h-[280px] md:h-[360px] lg:h-[420px] overflow-hidden">
        <Image
          src={data.banner_image?.url || 'http://agro-rajaguru.local/wp-content/uploads/2025/09/pt-philosophy.webp'}
          alt={data.banner_image?.alt || 'Testimonials hero'}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col items-center justify-center gap-3 text-center">
          <span className="text-white/90 text-xs md:text-sm tracking-widest uppercase">{data.page_subheading}</span>
          <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-bold drop-shadow-lg">{data.page_heading}</h1>
        </div>
      </section>

      {/* Slider section */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-white to-[#f7f7f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TestimonialsSlider items={data.testimonials} />
        </div>
      </section>
    </div>
  );
}


