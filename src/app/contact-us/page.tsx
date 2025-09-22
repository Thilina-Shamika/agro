import { fetchContactData } from '@/lib/wordpress';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

export default async function ContactUsPage() {
  const data = await fetchContactData();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[280px] md:h-[360px] lg:h-[420px] overflow-hidden">
        <Image
          src={data.banner_image?.url || 'http://agro-rajaguru.local/wp-content/uploads/2025/09/pt-contacts.webp'}
          alt={data.banner_image?.alt || 'Contacts hero'}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col items-center justify-center gap-3 text-center">
          <span className="text-white/90 text-xs md:text-sm tracking-widest uppercase">{data.contact_us_subheading || 'Keep in touch'}</span>
          <h1 className="text-white text-4xl md:text-6xl font-bold drop-shadow-lg">{data.contact_heading || 'Contacts'}</h1>
        </div>
      </section>

      {/* Info cards */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-8">
          {data.contact_boxes.map((box, idx) => {
            const type = (box.contact_type || '').toLowerCase();
            const Icon = type.includes('mail') ? Mail : type.includes('call') ? Phone : MapPin;
            const infoText = (box.info || '').replace(/\r?\n/g, ', ');
            const infoClass = type.includes('visit') ? 'whitespace-normal' : 'whitespace-pre-line';
            return (
            <div key={idx} className="rounded-2xl bg-[#f5f3f0] p-8 md:p-10">
              <Icon className="w-7 h-7 text-[#8a946e] mb-3" />
              <h3 className="text-3xl font-extrabold text-gray-900 mb-2">{box.contact_type}</h3>
              <div className={`text-gray-700 mb-6 ${infoClass}`}>{infoText}</div>
              <Link href={box.contact_button_link?.url || '#'} className="block">
                <div className="w-full text-center rounded-2xl bg-[#828c68] hover:bg-[#6f7758] text-white px-6 py-4 transition">
                  {box.contact_button_text}
                </div>
              </Link>
            </div>
          )})}
        </div>
      </section>

      {/* Form + Map */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12 items-stretch">
          {/* Left - form */}
          <div className="lg:col-span-6 h-full">
            <div className="mb-4">
              <span className="text-gray-700 text-xs font-medium tracking-wider uppercase">{data.contact_form_subheading}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4 text-gray-900">
              {data.contact_form_heading}
            </h2>
            <p className="text-sm text-gray-600 mb-8">{data.contact_form_description}</p>

            <form className="space-y-6 h-full">
              <input className="w-full border-b border-gray-200 py-4 outline-none focus:border-gray-400" placeholder="Your Name" />
              <input className="w-full border-b border-gray-200 py-4 outline-none focus:border-gray-400" placeholder="Your Email" />
              <input className="w-full border-b border-gray-200 py-4 outline-none focus:border-gray-400" placeholder="Website" />
              <textarea className="w-full border-b border-gray-200 py-4 outline-none focus:border-gray-400 min-h-[120px]" placeholder="Your Comment" />
              <button type="submit" className="px-6 py-3 rounded-full bg-yellow-300 text-gray-900 font-semibold hover:bg-yellow-400 transition">Get in Touch</button>
            </form>
          </div>

          {/* Right - map */}
          <div className="lg:col-span-6 h-full">
            <div className="relative w-full h-full min-h-[540px] rounded-2xl overflow-hidden bg-gray-100">
            <iframe
              src={(data.google_map_address?.url && data.google_map_address.url !== '#') ? data.google_map_address.url : 'https://www.google.com/maps?q=London%20Eye&output=embed'}
                className="absolute inset-0 w-full h-full"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


