/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { CaseStudyItem } from '@/data/pageData';

interface CaseStudiesProps {
  eyebrow?: string;
  title?: ReactNode;
  caseStudies: CaseStudyItem[];
}

export function CaseStudies({
  eyebrow = "Case Studies",
  title = (
    <>
      Real <span className="text-primary">Results</span>. Real Impact.
    </>
  ),
  caseStudies,
}: CaseStudiesProps) {
  return (
    <section id="case-studies" className="py-24 bg-white">
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

        {/* 3 Case Study Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {caseStudies.map((cs, i) => (
            <div
              key={i}
              className="group bg-white rounded-2xl border border-gray-100 hover:border-primary/20 hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Image */}
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={cs.image}
                    alt={cs.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${cs.categoryBg}`}>
                      {cs.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 text-left space-y-4">
                  <h3 className="font-display font-bold text-[#303360] text-base sm:text-lg leading-snug group-hover:text-[#FE7146] transition-colors">
                    {cs.title}
                  </h3>

                  {/* Metrics Box */}
                  <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-50">
                    {cs.metrics.map((metric, idx) => (
                      <div key={idx} className="bg-[#F5F5FA] rounded-xl p-3 text-left">
                        <div className="flex items-center gap-1.5 mb-1">
                          {metric.icon}
                          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wide">
                            {metric.label}
                          </span>
                        </div>
                        <span className="font-mono font-bold text-sm sm:text-base text-navy">
                          {metric.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* View Case Study link */}
              <div className="px-6 pb-6 pt-2 text-left">
                <button className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FE7146] hover:gap-2.5 transition-all">
                  <span>View Case Study</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Center button */}
        <div className="text-center mt-12">
          <button className="bg-navy hover:bg-[#202242] text-white font-bold text-sm px-8 py-3.5 rounded-xl shadow-md transition-all inline-flex items-center gap-2">
            <span>View All Case Studies</span>
            <ArrowRight size={16} className="text-[#FE7146]" />
          </button>
        </div>

      </div>
    </section>
  );
}
