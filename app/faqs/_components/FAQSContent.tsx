/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

"use client";

import { useState } from "react";
import Link from 'next/link';
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, ArrowRight, ShieldCheck, Clock, HelpCircle } from "lucide-react";

interface FaqItem {
  id: string;
  title: string;
  content: string;
}

export function FAQS() {
  const [openSection, setOpenSection] = useState<string | null>("services-offered");

  const faqItems: FaqItem[] = [
  {
    id: "services-offered",
    title: "1. What services does Analytics Clouds offer?",
    content: `We provide end-to-end digital marketing solutions, including SEO, Google Ads, Performance Marketing, Social Media Marketing, Website Development, Affiliate Marketing, Content Marketing, and more - all tailored to your business goals.`
  },
  {
    id: "business-strategy",
    title: "2. How do you create a strategy for my business?",
    content: `Every business is unique. We start by understanding your goals, target audience, competitors, and industry before creating a customized strategy designed to support long-term growth.`
  },
  {
    id: "business-sizes",
    title: "3. Do you work with businesses of all sizes?",
    content: `Yes. We work with startups, small and medium-sized businesses, as well as established enterprises across a wide range of industries.`
  },
  {
    id: "results-timeline",
    title: "4. How long does it take to see results?",
    content: `The timeline depends on the service and your business objectives. Paid advertising can deliver results relatively quickly, while SEO and organic marketing typically require consistent effort over time to build sustainable growth.`
  },
  {
    id: "regular-reports",
    title: "5. Do you provide regular reports?",
    content: `Absolutely. We provide transparent reports and performance insights so you can track the progress of your campaigns and understand how they're contributing to your business goals.`
  },
  {
    id: "manage-campaigns",
    title: "6. Can you manage my existing marketing campaigns?",
    content: `Yes. Whether you already have active campaigns or are starting from scratch, we can review, optimize, and manage your digital marketing efforts to improve overall performance.`
  },
  {
    id: "custom-websites",
    title: "7. Do you build custom websites?",
    content: `Yes. We design and develop responsive, user-friendly websites that are tailored to your brand, business objectives, and customer experience.`
  },
  {
    id: "measure-success",
    title: "8. How do you measure campaign success?",
    content: `We focus on meaningful performance indicators such as website traffic, lead generation, conversions, customer engagement, and return on investment (ROI), depending on your business goals.`
  },
  {
    id: "choose-services",
    title: "9. Can I choose only the services I need?",
    content: `Of course. You can select individual services or opt for a complete digital marketing solution. We'll recommend the approach that best aligns with your business objectives.`
  },
  {
    id: "getting-started",
    title: "10. How do I get started with Analytics Clouds?",
    content: `Getting started is simple. Contact our team through the website, tell us about your business and goals, and we'll discuss the best strategy to help you grow online.`
  },
  {
    id: "contact-faq",
    title: "11. How can I contact the team?",
    content: `Reach us any way that's convenient:

• Email: [sales@analyticsclouds.com](mailto:sales@analyticsclouds.com)
• Phone: +91 99979 69967
• Contact page: Submit a query and our team responds within 24 hours.`
  }
];

  const toggleSection = (id: string) => {
    setOpenSection(openSection === id ? null : id);
  };

  return (
    <div id="faqs-page-container" className="bg-white text-[#333333] selection:bg-[#FE7146] selection:text-white">

      {/* 1. Hero Section (dark navy band, extends behind the fixed navbar — no white gap) */}
      <section id="faqs-hero-section" className="bg-[#303360] text-white pt-28 pb-16 sm:pt-32 sm:pb-20 relative overflow-hidden">

        {/* Subtle background decoration (low opacity orange gradient and dots) */}
        <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
          <div className="absolute top-1/2 right-10 -translate-y-1/2 w-96 h-96 bg-[#FE7146] rounded-full filter blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">

          {/* Small pill badge */}
          <div className="inline-block bg-white text-[#303360] text-[10px] sm:text-xs font-black tracking-widest uppercase px-4 py-1.5 rounded-full shadow-md">
            We're Here To Help
          </div>

          {/* Headline */}
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
            Frequently Asked Questions
          </h1>

          {/* Subcopy */}
          <p className="text-gray-300 text-sm sm:text-base font-normal max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about working with Analytics Clouds — services, pricing, timelines, reporting, and how we help your brand grow.
          </p>

        </div>
      </section>

      {/* 2. Breadcrumb bar */}
      <section id="faqs-breadcrumb-bar" className="bg-[#F5F5FA] border-b border-gray-100 py-3 text-left">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-xs font-semibold text-gray-500 flex items-center gap-2">
          <Link href="/" className="text-[#303360] hover:text-[#FE7146] transition-colors">
            Home
          </Link>
          <span className="text-gray-400 font-normal">&gt;</span>
          <span className="text-[#FE7146] font-bold">FAQs</span>
        </div>
      </section>

      {/* 3. FAQ Accordion (Main Content) */}
      <section id="faqs-content-section" className="py-16 sm:py-24 bg-white relative">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header metadata row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-6 mb-10">
            <div className="flex items-center gap-2 text-slate-500 font-semibold text-xs">
              <Clock size={14} className="text-[#FE7146]" />
              <span>Last Updated: July 2026</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 font-semibold text-xs">
              <ShieldCheck size={14} className="text-emerald-500" />
              <span>Answered by the Analytics Clouds Team</span>
            </div>
          </div>

          {/* Accordion List */}
          <div className="space-y-4">
            {faqItems.map((faq) => {
              const isOpen = openSection === faq.id;

              return (
                <div
                  key={faq.id}
                  id={`faq-item-${faq.id}`}
                  className={`border rounded-2xl transition-all duration-300 overflow-hidden bg-white ${
                    isOpen
                      ? "border-[#FE7146] shadow-md shadow-[#FE7146]/5"
                      : "border-gray-200 hover:border-gray-300 hover:bg-slate-50/50"
                  }`}
                >

                  {/* Clickable Header Row */}
                  <button
                    onClick={() => toggleSection(faq.id)}
                    className="w-full px-6 py-4.5 sm:py-5 flex items-center justify-between gap-4 text-left cursor-pointer focus:outline-none min-h-[52px]"
                    aria-expanded={isOpen}
                  >
                    <span className={`font-display font-black text-sm sm:text-base transition-colors ${
                      isOpen ? "text-[#303360]" : "text-[#303360]/85"
                    }`}>
                      {faq.title}
                    </span>

                    {/* Rotating chevron indicator */}
                    <div className={`shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 ${
                      isOpen
                        ? "border-[#FE7146]/20 bg-[#FFF1EC] text-[#FE7146]"
                        : "border-gray-200 bg-slate-50 text-slate-400"
                    }`}>
                      <ChevronDown
                        size={15}
                        className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                      />
                    </div>
                  </button>

                  {/* Expandable Body Panel with height-animation */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden border-t border-gray-100 bg-slate-50/20"
                      >
                        <div className="px-6 py-5 sm:py-6 text-gray-600 text-xs sm:text-sm font-normal leading-relaxed text-left whitespace-pre-wrap">
                          {faq.content}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. "Still Have Questions?" Closing Strip */}
      <section id="faqs-questions-strip" className="py-12 bg-[#F5F5FA] border-t border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">

          <div className="flex items-center gap-4 text-left">
            <div className="w-10 h-10 rounded-full bg-[#FFF1EC] text-[#FE7146] flex items-center justify-center shrink-0 shadow-sm">
              <HelpCircle size={20} />
            </div>
            <div>
              <h3 className="font-display font-black text-sm sm:text-base text-[#303360] leading-snug">
                Didn't find your answer here?
              </h3>
              <p className="text-gray-500 text-xs mt-0.5 font-medium">
                Ask us directly — our Noida growth team responds within 24 hours.
              </p>
            </div>
          </div>

          <Link href="/contact"
            className="w-full sm:w-auto bg-[#FE7146] hover:bg-[#e0562b] text-white font-extrabold text-xs px-6 py-3.5 rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-1.5"
          >
            <span>Contact Our Team</span>
            <ArrowRight size={14} />
          </Link>

        </div>
      </section>

    </div>
  );
}
