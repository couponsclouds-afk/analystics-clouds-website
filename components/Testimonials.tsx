/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ReactNode } from "react";
import { Quote, Star } from "lucide-react";
import { TestimonialItem } from '@/data/pageData';

interface TestimonialsProps {
  eyebrow?: string;
  title?: ReactNode;
  testimonials: TestimonialItem[];
}

export function Testimonials({
  eyebrow = "Testimonials",
  title = (
    <>
      What Our <span className="text-primary">Clients</span> Say
    </>
  ),
  testimonials,
}: TestimonialsProps) {
  return (
    <section id="testimonials" className="py-24 bg-[#F5F5FA]/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold text-primary tracking-widest uppercase font-sans">
            {eyebrow}
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-navy leading-tight tracking-tight">
            {title}
          </h2>
        </div>

        {/* 3-card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((test, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-[#FE7146]/20 hover:shadow-xl transition-all duration-300 flex flex-col justify-between text-left relative"
            >
              {/* Quote Mark */}
              <div className="absolute top-6 right-8 text-orange-100">
                <Quote size={40} className="fill-orange-50/50" />
              </div>

              <div className="space-y-4">
                {/* 5 Star Rating */}
                <div className="flex gap-1 text-amber-400">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} size={16} className="fill-current" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-[#333333] text-sm sm:text-base font-medium leading-relaxed italic relative z-10">
                  "{test.quote}"
                </p>
              </div>

              {/* Author profile */}
              <div className="flex items-center gap-4 mt-8 pt-4 border-t border-gray-50">
                <img
                  src={test.avatar}
                  alt={test.author}
                  className="w-12 h-12 rounded-full object-cover border-2 border-orange-100"
                  referrerPolicy="no-referrer"
                />
                <div className="space-y-0.5">
                  <h4 className="font-display font-bold text-[#303360] text-sm sm:text-base">
                    {test.author}
                  </h4>
                  <p className="text-xs font-semibold text-slate-500">
                    {test.role}, <span className="text-[#FE7146]">{test.company}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel indicators dots */}
        <div className="flex justify-center gap-2 mt-12">
          <span className="w-6 h-1.5 bg-[#FE7146] rounded-full"></span>
          <span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
          <span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
          <span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
        </div>

      </div>
    </section>
  );
}
