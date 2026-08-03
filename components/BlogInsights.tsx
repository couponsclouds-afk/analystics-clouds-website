/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ReactNode } from "react";
import { ArrowRight, Calendar } from "lucide-react";
import { BlogPostItem } from '@/data/pageData';

interface BlogInsightsProps {
  eyebrow?: string;
  title?: ReactNode;
  posts: BlogPostItem[];
}

export function BlogInsights({
  eyebrow = "Latest Insights",
  title = (
    <>
      Read Our Latest <span className="text-primary">Blogs</span>
    </>
  ),
  posts,
}: BlogInsightsProps) {
  return (
    <section id="blog" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 gap-4">
          <div className="text-left space-y-4">
            <span className="text-xs font-bold text-primary tracking-widest uppercase font-sans">
              {eyebrow}
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-navy leading-tight tracking-tight">
              {title}
            </h2>
          </div>

          <div>
            <button className="bg-navy hover:bg-[#202242] text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md transition-all flex items-center gap-2">
              <span>View All Blogs</span>
              <ArrowRight size={16} className="text-primary" />
            </button>
          </div>
        </div>

        {/* 3 Blog Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <div
              key={i}
              className="group bg-white rounded-2xl border border-gray-100 hover:border-primary/20 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between text-left"
            >
              <div>
                {/* Image */}
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#FFF1EC] text-primary px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  {/* Date */}
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
                    <Calendar size={14} className="text-slate-400" />
                    <span>{post.date}</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-bold text-[#303360] text-base leading-snug group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                </div>
              </div>

              {/* Read More link */}
              <div className="px-6 pb-6 pt-2">
                <button className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FE7146] hover:gap-2.5 transition-all">
                  <span>Read More</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
