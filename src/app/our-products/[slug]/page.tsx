import { fetchProductBySlug, fetchProductsData } from '@/lib/wordpress';
import Image from 'next/image';
import ProductImageLightbox from '@/components/ProductImageLightbox';
import { notFound } from 'next/navigation';

interface Props { params: { slug: string } }

export default async function ProductDetailPage({ params }: Props) {
  const product = await fetchProductBySlug(params.slug);
  if (!product) return notFound();
  const page = await fetchProductsData();

  return (
    <div className="min-h-screen">
      {/* Hero same as Products page */}
      <section className="relative h-[220px] md:h-[320px] lg:h-[380px] overflow-hidden">
        <Image
          src={page.image_banner?.url || 'http://agro-rajaguru.local/wp-content/uploads/2025/09/pt-shop.webp'}
          alt={page.image_banner?.alt || 'Products banner'}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col items-center justify-center gap-3 text-center">
          <span className="text-white/90 text-xs md:text-sm tracking-widest uppercase">{page.products_page_subheading}</span>
          <h1 className="text-white text-4xl md:text-6xl font-bold drop-shadow-lg">{page.products_page_heading}</h1>
        </div>
      </section>

      {/* Content layout */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-10 items-start">
          {/* Left: image with lightbox */}
          <div className="lg:col-span-6">
            {product.image && (
              <ProductImageLightbox src={product.image.url} alt={product.image.alt || product.title} />
            )}
          </div>

          {/* Right content */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{product.title}</h2>
            <p className="text-gray-700 leading-relaxed">{product.short_description}</p>
            <div className="prose max-w-none text-gray-700 whitespace-pre-line">{product.description}</div>
          </div>
        </div>
      </section>
    </div>
  );
}


