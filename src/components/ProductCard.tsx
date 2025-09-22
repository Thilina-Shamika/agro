import Image from 'next/image';
import Link from 'next/link';
// no rating

interface Props {
  href: string;
  title: string;
  image?: { url: string; alt?: string };
  // Optional pricing if provided later
  price?: string;
  oldPrice?: string;
  sale?: boolean;
  excerpt?: string;
}

export default function ProductCard({ href, title, image, price, oldPrice, sale, excerpt }: Props) {
  return (
    <Link href={href} className="block group">
      <div className="rounded-2xl border border-gray-100 p-4">
        <div className="relative bg-[#f5f3f0] rounded-2xl w-full h-[260px] overflow-hidden">
          {sale && (
            <span className="absolute top-3 left-3 z-10 text-xs px-3 py-1 rounded-md bg-black text-white">SALE</span>
          )}
          {image && (
            <Image src={image.url} alt={image.alt || title} fill className="object-contain" />
          )}
        </div>

        {/* Title */}
        <h3 className="mt-4 text-xl font-semibold text-gray-900 group-hover:text-[#6e744f] transition">{title}</h3>

        {excerpt && (
          <p className="text-gray-600 mt-2 text-sm line-clamp-2">{excerpt}</p>
        )}

        {/* Price row (shown only if provided) */}
        {(price || oldPrice) && (
          <div className="mt-2 flex items-center gap-4">
            {oldPrice && <span className="text-gray-400 line-through">{oldPrice}</span>}
            {price && <span className="text-gray-900 font-semibold">{price}</span>}
          </div>
        )}
      </div>
    </Link>
  );
}


