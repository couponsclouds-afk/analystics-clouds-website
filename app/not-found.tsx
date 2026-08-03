import Link from 'next/link';
import { Home, ArrowRight, SearchX } from 'lucide-react';
import { CtaBanner } from '@/components/CtaBanner';

export const metadata = {
  title: 'Page Not Found',
  description: "The page you're looking for doesn't exist or may have been moved. Head back home or explore our services.",
};

export default function NotFound() {
  return (
    <div className="bg-white text-[#333333] selection:bg-[#FE7146] selection:text-white">
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        {/* Decorative blurred orange glow, matching hero sections elsewhere on the site */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] bg-[#FE7146]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto text-center space-y-6 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#FFF1EC] text-[#FE7146] mx-auto">
            <SearchX size={28} />
          </div>

          <p className="font-display font-black text-7xl sm:text-8xl text-[#303360] tracking-tight leading-none">
            404
          </p>

          <h1 className="font-display font-black text-3xl sm:text-4xl text-[#303360] tracking-tight leading-tight">
            Page Not Found
          </h1>

          <p className="text-[#333333]/70 text-base sm:text-lg leading-relaxed max-w-lg mx-auto">
            The page you're looking for doesn't exist or may have been moved. Let's get you back on track.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/"
              className="w-full sm:w-auto bg-[#FE7146] hover:bg-[#e0562b] text-white font-extrabold px-8 py-4 rounded-xl shadow-lg shadow-[#FE7146]/25 hover:shadow-[#FE7146]/35 transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Home size={18} />
              <span>Back to Home</span>
            </Link>
            <Link
              href="/services"
              className="w-full sm:w-auto border-2 border-[#303360]/20 hover:border-[#303360] text-[#303360] font-bold px-8 py-4 rounded-xl transition-all flex items-center justify-center gap-2 hover:bg-[#303360]/5 active:scale-[0.98]"
            >
              <span>Explore Our Services</span>
              <ArrowRight size={18} className="text-[#FE7146]" />
            </Link>
          </div>
        </div>
      </section>

      <CtaBanner />
    </div>
  );
}
