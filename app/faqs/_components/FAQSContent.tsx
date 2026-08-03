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
      content: `We are a full-service performance marketing agency covering the complete digital growth stack:

• Search Engine Optimization (SEO) — technical audits, content clusters, and authority link-building.
• Google Ads — search, shopping, YouTube, and display campaigns with smart bidding.
• Performance Marketing — full-funnel, multi-channel paid campaigns focused on ROI.
• Social Media Marketing — content pipelines, community building, and paid social.
• Email & SMS Marketing — automated journeys, segmentation, and retention flows.
• Display & Native Ads — programmatic brand campaigns across premium publishers.
• Web Design & Development — fast, conversion-focused websites built on React/Next.js.

Every engagement can be a single service or a combined growth program managed by one team.`
    },
    {
      id: "results-timeline",
      title: "2. How quickly will I see results?",
      content: `It depends on the channel:

• Paid campaigns (Google Ads, Meta, performance marketing) typically start generating measurable traffic and leads within the first 2-4 weeks, with optimization compounding after that.
• SEO is a compounding channel — technical fixes can produce crawl and indexing improvements within the first 14 days, but substantial organic ranking growth typically takes 3 to 6 months of consistent content and authority building.
• Email & SMS flows begin producing revenue as soon as automations go live on your existing audience.

We always set realistic channel-by-channel expectations during your free audit, before any commitment.`
    },
    {
      id: "pricing-model",
      title: "3. How does your pricing work?",
      content: `We work on transparent monthly retainers and fixed project pricing — no hidden fees.

• Ongoing services (SEO, ads management, social, email/SMS) are billed as a monthly retainer defined in your Statement of Work (SOW).
• One-time projects (website design & development, landing pages, audits) are quoted as fixed project fees with clear deliverables.
• Ad spend (Google, Meta, etc.) is separate from our management fee and is typically funded directly by you, so you always control your budget.

Exact pricing depends on scope, competition, and goals — request a free audit and we'll send a tailored proposal.`
    },
    {
      id: "reporting",
      title: "4. What reporting will I receive?",
      content: `Every month you receive a full multi-attribution performance dashboard tracking real business indicators — organic sessions, keyword rankings, ad spend efficiency (ROAS/CPA), leads or sales attributed per channel, and conversion trends.

We review this together on a monthly growth call, covering what was completed, what the data says, and the exact plan for the next cycle. You get direct access to your dashboards at all times — your data is never a black box.`
    },
    {
      id: "ad-budget",
      title: "5. Who controls and owns the ad accounts and budgets?",
      content: `You do. We build and manage campaigns inside ad accounts that belong to you (Google Ads, Meta Business Manager, LinkedIn Campaign Manager), so you retain full ownership of account history, pixels, and audiences even if we part ways.

Ad budgets are typically paid by you directly to the platforms — our management fee is separate. This keeps everything transparent: you can see every rupee of spend in your own account at any time.`
    },
    {
      id: "contracts",
      title: "6. Do I have to sign a long-term contract?",
      content: `No lock-ins. Ongoing services run on flexible monthly retainers governed by a Client Service Agreement, and either party can terminate with a standard 30-day written notice.

We believe retention should be earned by results, not enforced by contracts — which is why our client retention rate is 98%.`
    },
    {
      id: "ownership",
      title: "7. Who owns the creatives, content, and website code?",
      content: `You do. Once final invoices are cleared, you hold 100% ownership of all deliverables created for you — ad creatives, written copy, landing pages, Figma design files, and custom website code.

We can hand everything over neatly in a git repository or cloud folder. Analytics Clouds only retains rights to our internal methodologies and pre-existing tools.`
    },
    {
      id: "industries",
      title: "8. Which industries do you work with?",
      content: `We work with brands across SaaS, e-commerce, real estate, B2B services, FinTech, healthcare, EdTech, logistics, and D2C consumer brands — in Noida, across India, and internationally.

The playbooks differ by industry, but the engine is the same: data-driven targeting, conversion-focused creative, and transparent measurement. If you're unsure whether we're a fit for your niche, just ask — we'll tell you honestly.`
    },
    {
      id: "one-agency",
      title: "9. Why choose one agency instead of separate vendors for each channel?",
      content: `Because your channels don't operate in silos — your customers move between search, social, email, and your website constantly.

With one integrated team, your SEO insights feed your ad copy, your ad data informs your email segments, and your website is built to convert the traffic every channel sends. One strategy, one dashboard, one accountable partner — instead of eight vendors pointing fingers at each other.`
    },
    {
      id: "getting-started",
      title: "10. How do we get started?",
      content: `Simple — request a free audit. Here's what happens:

1. You reach out via our Contact page, phone, or email.
2. We run a free, no-obligation audit of your current digital presence (website, SEO, ads, socials).
3. We present a tailored growth roadmap with clear scope, timelines, and pricing.
4. Once you approve the Statement of Work, onboarding starts — most campaigns go live within the first 1-2 weeks.

There's zero commitment until you sign the SOW.`
    },
    {
      id: "locations",
      title: "11. Where are you located? Can we meet in person?",
      content: `Yes — we're always happy to meet over chai.

• Office: B-101, 1st Floor, Tower-B, Noida One, Sector 62, Noida - 201309
• Registered Office: 917, Idgah Road, Gandhi Nagar, Unnao - 209801

We serve clients across India and abroad remotely as well, with all reviews and growth calls available over video.`
    },
    {
      id: "contact-faq",
      title: "12. How can I contact the team?",
      content: `Reach us any way that's convenient:

• Email: sales@analyticsclouds.com
• Phone: +91 99979 69967
• Contact page: submit a query and our Noida team responds within 24 hours.

Support hours are Monday to Saturday, 9 AM - 7 PM IST.`
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
