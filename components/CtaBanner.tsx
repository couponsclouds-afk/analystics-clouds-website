/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

"use client";

import { ArrowUpRight, TrendingUp } from "lucide-react";

import { useRouter } from "next/navigation";

interface CtaBannerProps {
  onContactClick?: () => void;
}
export function CtaBanner(props: CtaBannerProps) {
  const router = useRouter();
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Full-width Orange Banner Card */}
        <div className="bg-[#FE7146] rounded-3xl p-8 sm:p-12 lg:p-16 text-white relative overflow-hidden shadow-2xl shadow-[#FE7146]/30 flex flex-col lg:flex-row justify-between items-center gap-8 text-left">
          
          {/* Growth graph background vector */}
          <div className="absolute inset-0 opacity-10 pointer-events-none select-none">
            <svg className="w-full h-full" viewBox="0 0 800 300" preserveAspectRatio="none">
              <path
                d="M -50,250 Q 200,240 350,150 T 650,80 T 850,20 L 850,350 L -50,350 Z"
                fill="white"
              />
              <path
                d="M -50,250 Q 200,240 350,150 T 650,80 T 850,20"
                fill="none"
                stroke="white"
                strokeWidth="10"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Bold Growth Arrow pointing up-right */}
          <div className="absolute right-10 bottom-0 opacity-10 pointer-events-none select-none hidden lg:block">
            <ArrowUpRight size={240} className="stroke-[1.5]" />
          </div>

          {/* Left: Heading and Subcopy */}
          <div className="space-y-4 max-w-2xl relative z-10">
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white leading-tight tracking-tight">
              Ready to Grow Your Business?
            </h2>
            <p className="text-orange-50 text-base sm:text-lg font-normal">
              Let's build data-driven strategies that bring real results. Start your free, no-obligation performance audit today.
            </p>
          </div>

          {/* Right: Solid white Button */}
          <div className="relative z-10 w-full lg:w-auto">
            <button
              onClick={props.onContactClick ? props.onContactClick : () => router.push('/contact')}
              className="w-full lg:w-auto bg-white hover:bg-orange-50 text-[#FE7146] font-black text-base px-8 py-4 rounded-xl shadow-lg transition-all hover:scale-[1.03] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Get Free Consultation</span>
              <TrendingUp size={18} />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
