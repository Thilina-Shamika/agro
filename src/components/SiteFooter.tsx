import Image from 'next/image';
import Link from 'next/link';
import { fetchFooterData } from '@/lib/wordpress';
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube, Twitter, Linkedin } from 'lucide-react';

export default async function SiteFooter() {
  const data = await fetchFooterData();

  return (
    <footer className="relative mt-20">
      {data.background_image?.url && (
        <div className="absolute inset-0 -z-10">
          <Image src={data.background_image.url} alt={data.background_image.alt || 'Footer background'} fill className="object-cover" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      )}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="mx-auto rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl p-10 grid md:grid-cols-3 gap-10">
          {/* Left */}
          <div className="space-y-4">
            {data.footer_logo?.url && (
              <div className="relative w-[160px] h-[30px]">
                <Image src={data.footer_logo.url} alt={data.footer_logo.alt || 'Logo'} fill className="object-contain" />
              </div>
            )}
            <p className="text-white/90 max-w-md whitespace-pre-line">{data.footer_description}</p>
            <div className="flex gap-3 pt-2">
              {data.social_media.map((s, i) => {
                const n = (s.name || '').toLowerCase();
                const Icon = n.includes('instagram')
                  ? Instagram
                  : n.includes('facebook')
                  ? Facebook
                  : n.includes('youtube')
                  ? Youtube
                  : n.includes('twitter')
                  ? Twitter
                  : n.includes('linkedin')
                  ? Linkedin
                  : null;
                return (
                  <Link
                    key={i}
                    href={s.url || '#'}
                    aria-label={s.name}
                    className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/10 text-white hover:bg-white/20 transition"
                  >
                    {Icon ? <Icon className="w-4 h-4" /> : <span className="text-xs">{s.name?.charAt(0) || '?'}</span>}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Middle links */}
          <div>
            <h4 className="text-white text-xl font-semibold mb-4">Useful Links</h4>
            <ul className="space-y-3">
              {data.footer_menu.map((m, i) => (
                <li key={i}>
                  <Link href={m.url || '#'} className="text-white/90 hover:text-yellow-300 transition">{m.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right contact info */}
          <div className="space-y-4">
            <h4 className="text-white text-xl font-semibold mb-2">Contact</h4>
            <ul className="space-y-3 text-white/90">
              {data.contact_box.map((c, idx) => {
                const t = (c.type || '').toLowerCase();
                const Icon = t.includes('address') ? MapPin : t.includes('call') ? Phone : Mail;
                return (
                  <li key={idx} className="flex items-start gap-3">
                    <Icon className="w-5 h-5 text-yellow-300 mt-0.5" />
                    <div>
                      <div className="font-semibold text-white">{c.type}</div>
                      <div className="text-white/90 text-sm">{c.info}</div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-6 text-white/80 text-sm">
          <div className="space-x-4">
            {data.important_links.map((l, i) => (
              <Link key={i} href={l.url || '#'} className="hover:text-yellow-300 transition">{l.text}</Link>
            ))}
          </div>
          <div className="text-center md:text-right">
            {data.copyright_text} {data.design_by_text}
          </div>
        </div>
      </div>
    </footer>
  );
}


