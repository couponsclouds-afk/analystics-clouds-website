/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

"use client";

import { useRouter } from 'next/navigation';
import { TrendingUp, ArrowRight, Calendar, Star } from "lucide-react";
import { Dashboard } from './Dashboard';

interface HeroProps {
  
  onServicesClick?: () => void;
}

export function Hero({  onServicesClick }: HeroProps) {
  const navigate = useRouter();

  const handleServicesClick = () => {
    if (onServicesClick) {
      onServicesClick();
    } else {
      navigate.push("/services");
    }
  };

  return (
    <section className="relative pt-32 pb-20 sm:pb-28 overflow-hidden bg-gradient-to-b from-[#FFF1EC]/30 via-white to-white">
      {/* Decorative vector meshes or light blobs to look premium */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#FE7146]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#303360]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline and description */}
          <div className="lg:col-span-7 flex flex-col space-y-6 sm:space-y-8 text-left">
            
            {/* Live Growth Eyebrow */}
            <div className="inline-flex items-center gap-2 bg-[#FFF1EC] border border-[#FE7146]/20 px-3 py-1.5 rounded-full w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FE7146] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FE7146]"></span>
              </span>
              <span className="text-xs font-semibold text-[#FE7146] tracking-wide uppercase font-sans">
                Digital Marketing That Drives Real Growth
              </span>
            </div>

            {/* Premium 3-line Headline */}
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[#303360] leading-[1.1] tracking-tight">
              We Turn Clicks Into <br />
              <span className="text-[#FE7146] relative inline-block">
                Customers
                <span className="absolute left-0 bottom-1 w-full h-1 bg-[#FE7146]/10 rounded" />
              </span>{" "}
              & Data Into <br />
              <span className="text-[#FE7146] relative inline-block">
                Growth.
              </span>
            </h1>

            {/* Subcopy text */}
            <p className="text-[#333333] text-base sm:text-lg font-normal leading-relaxed max-w-xl">
              Analytics Clouds is a performance-driven digital marketing agency in Noida helping brands grow with SEO, Paid Ads, Social Media, Content, and Data-Driven Strategies.
            </p>

            {/* Two Action CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={() => navigate.push('/contact')}
                className="bg-[#FE7146] hover:bg-[#e0562b] text-white font-extrabold px-8 py-4 rounded-xl shadow-lg shadow-[#FE7146]/25 hover:shadow-[#FE7146]/35 transition-all text-center flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span>Get Free Consultation</span>
                <TrendingUp size={18} />
              </button>
              
              <button
                onClick={handleServicesClick}
                className="border-2 border-gray-200 hover:border-[#303360] text-[#303360] font-bold px-8 py-4 rounded-xl transition-all text-center flex items-center justify-center gap-2 hover:bg-gray-50 active:scale-[0.98] cursor-pointer"
              >
                <span>Explore Services</span>
                <ArrowRight size={18} className="text-[#FE7146]" />
              </button>
            </div>

            {/* Trust and Social Proof Row */}
            <div className="border-t border-gray-100 pt-6 sm:pt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              {/* Clients avatar card */}
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2 overflow-hidden">
                  {[
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&h=80&q=80",
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80",
                    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&h=80&q=80",
                  ].map((url, i) => (
                    <img
                      key={i}
                      src={url}
                      alt="Happy Client Profile"
                      className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ))}
                </div>
                <div className="flex flex-col">
                  <span className="text-[13px] font-bold text-[#303360] leading-tight">
                    200+ Happy Clients
                  </span>
                  <span className="text-[11px] text-gray-500 font-medium">
                    Across India
                  </span>
                </div>
              </div>

              {/* Experience Stat */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-[#FE7146]">
                  <Calendar size={16} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[13px] font-bold text-[#303360] leading-tight">
                    7+ Years of
                  </span>
                  <span className="text-[11px] text-gray-500 font-medium">
                    Industry Experience
                  </span>
                </div>
              </div>

              {/* Star Rating Stat */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-500">
                  <Star size={16} className="fill-amber-500" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[13px] font-bold text-[#303360] leading-tight">
                    4.9/5 Rating
                  </span>
                  <span className="text-[11px] text-gray-500 font-medium">
                    Client Satisfaction
                  </span>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Signature live-feeling dashboard visual */}
          <div className="lg:col-span-5 flex items-center justify-center relative w-full mt-6 lg:mt-0">
            {/* Visual background shadows & accents */}
            <div className="absolute w-[110%] h-[110%] bg-radial from-[#FE7146]/10 via-transparent to-transparent -z-10 blur-2xl" />
            
            {/* Live-feeling Dashboard */}
            <Dashboard />
          </div>

        </div>
      </div>
    </section>
  );
}
