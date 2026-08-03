/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

"use client";

import React, { useState } from "react";
import Link from 'next/link';
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, ArrowRight, ShieldCheck, Clock, FileText, HelpCircle } from "lucide-react";

interface TermsSection {
  id: string;
  title: string;
  content: string;
}

export function TermsOfService() {
  const [openSection, setOpenSection] = useState<string | null>("acceptance");

  const termsSections: TermsSection[] = [
    {
      id: "acceptance",
      title: "1. Acceptance of Terms",
      content: `By accessing, browsing, or utilizing the website of Analytics Clouds ("Company," "we," "us," or "our") at analyticsclouds.com, or engaging our digital marketing and campaign management services, you agree to be bound by these Terms of Service ("Terms") and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site or our services.

The materials contained in this website are protected by applicable copyright and trademark law. Any dynamic client-specific campaign metrics, reports, and strategies provided directly by our campaign consultants are also subject to proprietary rights under specific Client Service Agreements.`
    },
    {
      id: "use-services",
      title: "2. Use of Our Website & Services",
      content: `Analytics Clouds grants you a non-exclusive, non-transferable, revocable license to access our online resources and website content for informational and prospective-client evaluation purposes only. Under this license, you must not:

• Modify, copy, distribute, or redistribute any of our strategic blog posts, case studies, website layouts, or proprietary campaign structures.
• Use the website materials for any commercial purpose or public display without prior written permission from Analytics Clouds.
• Attempt to decompile, reverse-engineer, crack, or probe any digital tools, tracking pixels, scripts, or custom dashboard layouts hosted on our platform.
• Remove any copyright or other proprietary notations from our materials.

Violation of these restrictions will automatically terminate your license to use our resources and may result in legal action.`
    },
    {
      id: "client-agreements",
      title: "3. Client Service Agreements & Scope of Work",
      content: `These general Website Terms of Service are supplemented by separate, legally binding Client Service Agreements (CSAs) and custom Statements of Work (SOWs) executed directly between Analytics Clouds and our active clients. 

In the event of a direct conflict between these generic Terms of Service and any custom SOW/CSA, the terms of the specific SOW/CSA shall govern and prevail with respect to that client relationship. The scope of deliverables, reporting schedules, organic search target lists, ad spend caps, and key performance indicators (KPIs) are managed exclusively through these custom agreements.`
    },
    {
      id: "billing-refunds",
      title: "4. Payments, Billing & Refunds",
      content: `For clients onboarded onto our digital marketing, Search Engine Optimization (SEO), or paid media performance services:

• Billing terms, recurring retainer fees, and invoicing cycles are clearly outlined in your customized, mutually signed SOW.
• All payments are due within the timeframe specified on each invoice, typically ten (10) business days from the invoice date.
• Ad spend budgets (e.g., Google Ads, Meta Ads campaigns) are typically funded directly by the client or pre-paid to Analytics Clouds to ensure uninterrupted campaign performance.
• Due to the nature of real-time search engine optimization, real-time ad slot auctions, and specialized creative labor, all payments made for services rendered, strategy consults, or completed campaign cycles are strictly non-refundable.`
    },
    {
      id: "intellectual-property",
      title: "5. Intellectual Property Rights",
      content: `The branding, logo designs, custom illustrations, copywriting, codebase, design frameworks, and interactive page layouts featured on our digital platforms are the exclusive intellectual property of Analytics Clouds and are protected under international copyright, trademark, and trade secret laws.

For active clients, intellectual property rights relating to custom ad creatives, written copy, landing pages, and campaign setups are governed by the specific terms of the active Client Service Agreement (CSA). Upon full and final payment of all outstanding invoices, rights to client-specific creative deliverables are transferred to the client, while Analytics Clouds retains rights to general methodologies, pre-existing codes, and internal operational tools.`
    },
    {
      id: "confidentiality",
      title: "6. Confidentiality",
      content: `We take your business privacy and campaign data security with the utmost seriousness. Both Analytics Clouds and the Client agree to hold in strict confidence all proprietary business details, ad-account performance logs, product launch secrets, strategy blueprints, and financial configurations shared during negotiations and active campaign management.

This obligation of confidentiality does not apply to information that is publicly known through no breach of this agreement, or that is required to be disclosed by a court of competent jurisdiction or government authority.`
    },
    {
      id: "third-party",
      title: "7. Third-Party Tools & Platforms",
      content: `Our performance marketing and search engine campaigns rely heavily on third-party channels, platforms, and analytics engines (including Google Ads, Google Analytics, Meta Ads, Semrush, Ahrefs, and LinkedIn Campaign Manager). 

You acknowledge and agree that:
• Analytics Clouds does not own, control, or guarantee the uptime, algorithmic updates, or targeting mechanics of these third-party platforms.
• We are not liable for sudden campaign interruptions, ad account suspensions, or reporting discrepancies caused by direct changes in third-party terms of service, algorithm updates, or API downtime.`
    },
    {
      id: "limitation-liability",
      title: "8. Limitation of Liability",
      content: `In no event shall Analytics Clouds, its directors, employees, or regional partners (in Noida, Gurugram, or Jaipur) be liable for any indirect, incidental, special, consequential, or punitive damages—including but not limited to loss of profits, organic traffic drops, temporary ad account flags, or data breaches—arising out of your use or inability to use this website or our strategic campaign recommendations.

Our total aggregate liability under any circumstance shall not exceed the total amount of fees, if any, paid by you directly to Analytics Clouds for the specific service cycle in question.`
    },
    {
      id: "termination",
      title: "9. Termination of Services",
      content: `Either party may terminate an active digital campaign or monthly SEO retainer in accordance with the termination clauses, notice periods (typically 30 days), and outstanding payment terms specified in the signed Client Service Agreement.

We reserve the right to immediately suspend or terminate your access to our tracking dashboards, website resources, or active campaigns if you violate these general Terms, engage in fraudulent behavior, or fail to clear approved invoices within the agreed terms.`
    },
    {
      id: "changes-terms",
      title: "10. Changes to These Terms",
      content: `Analytics Clouds reserves the right to revise, modify, or update these Terms of Service at any time without prior written notice to visitors. The date of the latest modification is always noted at the top of this page.

By continuing to access our website or utilize our growth campaigns after any such modifications are posted, you agree to be bound by the then-current version of these Terms of Service. We recommend checking this page periodically to remain informed of our current policies.`
    },
    {
      id: "contact-info",
      title: "11. Contact Us & Legal Correspondence",
      content: `If you have any questions, clarifications, or concerns regarding these Terms of Service, or require formal legal correspondence, please contact our administrative and compliance squad:

• Email: sales@analyticsclouds.com
• Phone: +91 99979 69967
• Registered Office: 917, Idgah Road, Gandhi Nagar, Unnao - 209801
• Office: B-101, 1st Floor, Tower-B, Noida One, Sector 62, Noida - 201309

Alternatively, you can submit an official query directly through our digital Contact page to receive a response from our Noida leadership team within 24 hours.`
    }
  ];

  const toggleSection = (id: string) => {
    setOpenSection(openSection === id ? null : id);
  };

  return (
    <div id="terms-of-service-page-container" className="bg-white text-[#333333] selection:bg-[#FE7146] selection:text-white">

      {/* 1. Hero Section (dark navy band, extends behind the fixed navbar — no white gap) */}
      <section id="terms-hero-section" className="bg-[#303360] text-white pt-28 pb-16 sm:pt-32 sm:pb-20 relative overflow-hidden">
        
        {/* Subtle background decoration (low opacity orange gradient and dots) */}
        <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
          <div className="absolute top-1/2 right-10 -translate-y-1/2 w-96 h-96 bg-[#FE7146] rounded-full filter blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          
          {/* Small pill badge */}
          <div className="inline-block bg-white text-[#303360] text-[10px] sm:text-xs font-black tracking-widest uppercase px-4 py-1.5 rounded-full shadow-md">
            Please Read Before Using Our Platform
          </div>

          {/* Headline */}
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
            Terms of Service
          </h1>

          {/* Subcopy */}
          <p className="text-gray-300 text-sm sm:text-base font-normal max-w-2xl mx-auto leading-relaxed">
            By accessing the Analytics Clouds website or using our data-driven growth solutions, you agree to comply with and be bound by the following legal guidelines.
          </p>

        </div>
      </section>

      {/* 2. Breadcrumb bar */}
      <section id="terms-breadcrumb-bar" className="bg-[#F5F5FA] border-b border-gray-100 py-3 text-left">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-xs font-semibold text-gray-500 flex items-center gap-2">
          <Link href="/" className="text-[#303360] hover:text-[#FE7146] transition-colors">
            Home
          </Link>
          <span className="text-gray-400 font-normal">&gt;</span>
          <span className="text-[#FE7146] font-bold">Terms of Service</span>
        </div>
      </section>

      {/* 3. Terms Accordion (Main Content) */}
      <section id="terms-content-section" className="py-16 sm:py-24 bg-white relative">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header metadata row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-6 mb-10">
            <div className="flex items-center gap-2 text-slate-500 font-semibold text-xs">
              <Clock size={14} className="text-[#FE7146]" />
              <span>Last Updated: July 2026</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 font-semibold text-xs">
              <ShieldCheck size={14} className="text-emerald-500" />
              <span>Active Compliance Version 2.4</span>
            </div>
          </div>

          {/* Accordion List */}
          <div className="space-y-4">
            {termsSections.map((sec) => {
              const isOpen = openSection === sec.id;
              
              return (
                <div
                  key={sec.id}
                  id={`accordion-item-${sec.id}`}
                  className={`border rounded-2xl transition-all duration-300 overflow-hidden bg-white ${
                    isOpen
                      ? "border-[#FE7146] shadow-md shadow-[#FE7146]/5"
                      : "border-gray-200 hover:border-gray-300 hover:bg-slate-50/50"
                  }`}
                >
                  
                  {/* Clickable Header Row */}
                  <button
                    onClick={() => toggleSection(sec.id)}
                    className="w-full px-6 py-4.5 sm:py-5 flex items-center justify-between gap-4 text-left cursor-pointer focus:outline-none min-h-[52px]"
                    aria-expanded={isOpen}
                  >
                    <span className={`font-display font-black text-sm sm:text-base transition-colors ${
                      isOpen ? "text-[#303360]" : "text-[#303360]/85"
                    }`}>
                      {sec.title}
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
                          {sec.content}
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
      <section id="terms-questions-strip" className="py-12 bg-[#F5F5FA] border-t border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center gap-4 text-left">
            <div className="w-10 h-10 rounded-full bg-[#FFF1EC] text-[#FE7146] flex items-center justify-center shrink-0 shadow-sm">
              <HelpCircle size={20} />
            </div>
            <div>
              <h3 className="font-display font-black text-sm sm:text-base text-[#303360] leading-snug">
                Have questions about these terms?
              </h3>
              <p className="text-gray-500 text-xs mt-0.5 font-medium">
                Our administrative squad is ready to assist with any legal or SLA clarifications.
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
