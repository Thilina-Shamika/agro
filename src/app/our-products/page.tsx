import { fetchProductsData, fetchProductList } from '@/lib/wordpress';
import Image from 'next/image';
import ProductCard from '@/components/ProductCard';

export default async function ProductsPage() {
  const data = await fetchProductsData();
  const products = await fetchProductList();

  return (
    <div className="min-h-screen">
      {/* Hero styled like Contact page */}
      <section className="relative h-[280px] md:h-[360px] lg:h-[420px] overflow-hidden">
        <Image
          src={data.image_banner?.url || 'http://agro-rajaguru.local/wp-content/uploads/2025/09/pt-shop.webp'}
          alt={data.image_banner?.alt || 'Products banner'}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col items-center justify-center gap-3 text-center">
          <span className="text-white/90 text-xs md:text-sm tracking-widest uppercase">{data.products_page_subheading}</span>
          <h1 className="text-white text-4xl md:text-6xl font-bold drop-shadow-lg">{data.products_page_heading}</h1>
        </div>
      </section>

      {/* Product grid */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-10">
          {products.map((p) => (
            <ProductCard key={p.slug} href={`/our-products/${p.slug}`} title={p.title} image={p.image} excerpt={p.short_description} />
          ))}
        </div>
      </section>
    </div>
  );
}


