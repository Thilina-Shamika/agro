import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <div className="relative inline-block">
          <span className="block text-[120px] md:text-[200px] lg:text-[260px] font-extrabold leading-none tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-[#9fb07a] to-[#6e744f] select-none">
            404
          </span>
        </div>
        <h1 className="mt-4 text-3xl md:text-4xl font-bold text-gray-900">Page not found</h1>
        <p className="mt-3 text-gray-600">Sorry, we couldn’t find the page you’re looking for.</p>
        <div className="mt-8">
          <Link href="/" className="inline-flex items-center px-6 py-3 rounded-full bg-yellow-300 text-gray-900 font-semibold hover:bg-yellow-400 transition">
            Go back home
          </Link>
        </div>
      </div>
    </section>
  );
}


