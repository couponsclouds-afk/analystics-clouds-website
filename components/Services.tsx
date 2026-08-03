/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { ServiceItem } from '@/data/pageData';

interface ServicesProps {
  eyebrow?: string;
  title?: ReactNode;
  subtitle?: string;
  services: ServiceItem[];
  showAllButton?: boolean;
}

export function Services({
  eyebrow = "Our Services",
  title = (
    <>
      Performance Marketing Services <br className="hidden sm:block" />
      That Deliver <span className="text-primary">Real Results</span>
    </>
  ),
  subtitle = "Strategy. Execution. Optimization. Growth.",
  services,
  showAllButton = true,
}: ServicesProps) {
  return (
    <section id="services" className="py-24 bg-[#F5F5FA]/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold text-primary tracking-widest uppercase font-sans">
            {eyebrow}
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-navy leading-tight tracking-tight">
            {title}
          </h2>
          <p className="text-sm font-semibold tracking-wide text-slate-500 uppercase font-sans">
            {subtitle}
          </p>
        </div>

        {/* 4x2 / 2x2 / col Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((svc, i) => (
            <div
              key={i}
              className="group bg-white p-6 rounded-2xl border border-gray-100 hover:border-primary/20 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4 text-left">
                {/* Icon box */}
                <div className={`w-10 h-10 rounded-xl ${svc.iconBg} flex items-center justify-center`}>
                  {svc.icon}
                </div>
                
                {/* Title */}
                <h3 className="font-display font-bold text-[#303360] text-base leading-snug group-hover:text-primary transition-colors">
                  {svc.title}
                </h3>

                {/* Description */}
                <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed">
                  {svc.description}
                </p>
              </div>

              {/* CTA Link */}
              <div className="pt-6 text-left">
                <button className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FE7146] hover:gap-2.5 transition-all">
                  <span>Learn More</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Center button */}
        {showAllButton && (
          <div className="text-center mt-12">
            <button className="bg-navy hover:bg-[#202242] text-white font-bold text-sm px-8 py-3.5 rounded-xl shadow-md transition-all inline-flex items-center gap-2">
              <span>View All Services</span>
              <ArrowRight size={16} className="text-primary" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
