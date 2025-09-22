import { fetchAboutPageData, fetchAboutData } from '@/lib/wordpress';
import Image from 'next/image';
import NumberCounter from '@/components/NumberCounter';
import About from '@/components/About';

export default async function AboutUsPage() {
  const data = await fetchAboutPageData();
  const homeAbout = await fetchAboutData();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[280px] md:h-[360px] lg:h-[420px] overflow-hidden">
        <Image
          src={data.banner_image?.url || 'http://agro-rajaguru.local/wp-content/uploads/2025/09/pt-about-scaled-1.webp'}
          alt={data.banner_image?.alt || 'About hero'}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col items-center justify-center gap-3 text-center">
          <span className="text-white/90 text-xs md:text-sm tracking-widest uppercase">{data.about_subheading}</span>
          <h1 className="text-white text-4xl md:text-6xl font-bold drop-shadow-lg">{data.about_heading}</h1>
        </div>
      </section>

      {/* First section */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-[#6e744f] uppercase text-xs tracking-wider">{data.first_section_subheading}</span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">{data.first_section_heading}</h2>
              <p className="text-gray-700 text-lg">{data.first_section_main_description}</p>
            </div>
            <div className="lg:col-span-6">
              <p className="text-gray-600 leading-relaxed">{data.first_section_sub_description}</p>
            </div>
          </div>

          {data.first_section_image?.url && (
            <div className="mt-12">
              <div className="relative w-full h-[380px] md:h-[460px] rounded-3xl overflow-hidden">
                <Image
                  src={data.first_section_image.url}
                  alt={data.first_section_image.alt || 'About image'}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Counters */}
      {data.number_counter && data.number_counter.length > 0 && (
        <section className="pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-10">
            {data.number_counter.map((n, i) => (
              <div key={i} className="text-center">
                <NumberCounter value={n.number} className="text-7xl font-bold text-[#828c68]" />
                <p className="mt-4 text-gray-800 font-medium max-w-xs mx-auto">{n.number_description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Vision & Mission */}
      {(data.vision || data.mission) && (
        <section className="pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8">
            {data.vision && (
              <div className="rounded-3xl p-8 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)] border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Vision</h3>
                <p className="text-gray-700 leading-relaxed">{data.vision}</p>
              </div>
            )}
            {data.mission && (
              <div className="rounded-3xl p-8 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)] border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Mission</h3>
                <p className="text-gray-700 leading-relaxed">{data.mission}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Home About section */}
      <section>
        <About data={homeAbout} />
      </section>
    </div>
  );
}


