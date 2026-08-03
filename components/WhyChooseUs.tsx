/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ReactNode } from "react";
import { AnimatedCounter } from './AnimatedCounter';
import { Differentiator, StatItem } from '@/data/pageData';

interface WhyChooseUsProps {
  eyebrow?: string;
  title?: ReactNode;
  differentiators: Differentiator[];
  stats: StatItem[];
}

export function WhyChooseUs({
  eyebrow = "Why Choose Us",
  title = (
    <>
      We Don't Just Run Campaigns, <br />
      We Build <span className="text-[#FE7146]">Growth Engines</span>.
    </>
  ),
  differentiators,
  stats,
}: WhyChooseUsProps) {
  return (
    <section id="why-choose-us" className="bg-[#303360] text-white py-24 relative overflow-hidden">
      {/* Decorative dark patterns */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Headline & differentiators */}
          <div className="lg:col-span-6 space-y-8 text-left">
            <div className="space-y-4">
              <span className="text-xs font-bold text-[#FE7146] tracking-widest uppercase font-sans block">
                {eyebrow}
              </span>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-white leading-tight tracking-tight">
                {title}
              </h2>
            </div>

            {/* Differentiators list */}
            <div className="space-y-6">
              {differentiators.map((diff, i) => (
                <div key={i} className="flex gap-4 items-start group">
                  <div className="p-3 bg-white/10 rounded-xl group-hover:bg-[#FE7146]/20 transition-colors">
                    {diff.icon}
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-display font-bold text-white text-base">
                      {diff.title}
                    </h3>
                    <p className="text-gray-300 text-xs sm:text-sm font-normal leading-relaxed max-w-md">
                      {diff.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Floating stat grid */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="bg-white text-[#303360] p-6 rounded-2xl shadow-xl border border-white/10 flex flex-col justify-between hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300 text-left"
                >
                  <div className="space-y-2">
                    {/* Big animated count */}
                    <div className="text-3xl sm:text-4xl font-mono font-extrabold text-[#FE7146] tracking-tight">
                      <AnimatedCounter endValue={stat.value} suffix={stat.suffix} />
                    </div>
                    
                    {/* Label */}
                    <div className="font-display font-extrabold text-sm sm:text-base text-[#303360] leading-snug">
                      {stat.label}
                    </div>
                  </div>

                  {/* Supporting text */}
                  <div className="text-xs text-slate-500 font-medium mt-2">
                    {stat.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
