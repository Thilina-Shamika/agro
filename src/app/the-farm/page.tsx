import { fetchTheFarmData } from '@/lib/wordpress';
import Image from 'next/image';
import GallerySlider from '@/components/GallerySlider';

export default async function TheFarmPage() {
  const data = await fetchTheFarmData();

  return (
    <div className="min-h-screen">
      {/* Hero - same pattern as contact/testimonials */}
      <section className="relative h-[280px] md:h-[360px] lg:h-[420px] overflow-hidden">
        <Image
          src={data.banner_image?.url || 'http://agro-rajaguru.local/wp-content/uploads/2025/09/h1-1-1.webp'}
          alt={data.banner_image?.alt || 'The farm banner'}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col items-center justify-center gap-3 text-center">
          <span className="text-white/90 text-xs md:text-sm tracking-widest uppercase">{data.page_subheading}</span>
          <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-bold drop-shadow-lg">{data.heading}</h1>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-8 max-w-4xl">{data.secondary_heading}</h2>
          <p className="text-gray-700 leading-relaxed max-w-5xl whitespace-pre-line">{data.description}</p>

          {/* Gallery Slider + Lightbox */}
          {data.image_gallery && data.image_gallery.length > 0 && (
            <div className="mt-12">
              <GallerySlider items={data.image_gallery} />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}


