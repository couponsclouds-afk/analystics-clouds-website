/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

"use client";

import React, { useState } from "react";
import Link from 'next/link';
import { motion, AnimatePresence } from "motion/react";
import { 
  ChevronDown, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  HelpCircle, 
  Lock, 
  Eye, 
  Database,
  CheckCircle2
} from "lucide-react";

interface PolicySection {
  id: string;
  title: string;
  content: string;
}

export function PrivacyPolicy() {
  const [openSection, setOpenSection] = useState<string | null>("info-collect");

  const policySections: PolicySection[] = [
    {
      id: "info-collect",
      title: "1. Information We Collect",
      content: `At Analytics Clouds, we collect information to deliver performance-driven digital marketing campaign optimizations and maintain high-fidelity website performance. This information includes:

• Personal Identifiers: When you fill out our contact form, subscribe to our insights newsletter, or schedule a growth consultation, we collect your name, business email address, phone number, company name, and specific campaign objectives.
• Automated Usage & Technical Data: Our servers automatically collect technical footprints when you visit our site, such as your IP address, browser type, geographic location (city/country), referral URLs, and interactions with our case study links.
• Client campaign configurations: For onboarded client partnerships, we manage authorized ad account IDs, targeting criteria, and historical creative metrics under strict consent and API permissions.`
    },
    {
      id: "how-use",
      title: "2. How We Use Your Information",
      content: `The metrics and contact information we collect are utilized to accelerate your marketing outcomes and build high-ROI campaigns:

• Tailoring SEO and PPC Strategies: To understand your digital footprint, audit your keyword rankings, and build target list suggestions for your specific niche.
• Communication & Consultation: To respond directly to growth inquiries, transmit weekly campaign status logs, and arrange strategy syncs.
• Analytics & Continuous Optimization: To analyze user flow on our own digital properties, optimizing our content layout and reducing page-load latency.
• Compliance & Security: To detect, investigate, and prevent fraudulent ad clicks, spam submissions, or malicious scanning attempts.`
    },
    {
      id: "cookies-tracking",
      title: "3. Cookies & Tracking Technologies",
      content: `We deploy cookies, tracking pixels, and clear web beacons to measure the conversion velocity of our campaigns and personalize your browsing experience:

• Essential Cookies: Required to maintain session state and run our interactive ROI estimators and navigation frameworks.
• Analytics Cookies: We utilize Google Analytics, Semrush analytics scripts, and Hotjar heatmaps to study visitor interactions, helping us refine our content clarity.
• Retargeting Pixels: We host retargeting pixels (such as Google Ads and Meta Ads tags) to show personalized digital marketing strategy ads to previous visitors on partner networks.

You can modify your browser preferences to reject cookies entirely, though this may prevent some interactive features of our service from operating at full capacity.`
    },
    {
      id: "data-sharing",
      title: "4. Data Sharing with Third Parties",
      content: `We strictly guard your private information. We do not sell, rent, or lease your contact information or campaign specifications to third-party data brokers. We share data only with:

• Authorized Service Providers: Cloud hosting platforms, CRM systems (such as HubSpot or Salesforce), and transactional email relay systems necessary to process your consultation queries.
• Advertising & Analytics Engines: Standard ad bidding channels (Google, Meta, LinkedIn) as requested by our active clients to map conversions and configure automated bid adjustments.
• Legal Compulsion: If required to do so by a court of competent jurisdiction, legal process, or compliance authorities based in Noida, Delhi NCR, or corresponding international jurisdictions.`
    },
    {
      id: "client-confidentiality",
      title: "5. Client Campaign Data & Confidentiality",
      content: `As a trusted digital growth agency, we maintain absolute separation between different client ad campaigns, audience targets, and search engine strategies. 

Our engineers and performance marketing specialists operate under strict internal non-disclosure agreements (NDAs). Client ad budgets, customer email lists provided for custom audience matching, and sales pipeline values are treated as highly confidential business assets and are never cross-referenced or utilized to benefit competing ad accounts.`
    },
    {
      id: "data-security",
      title: "6. Data Security Measures",
      content: `We implement physical, administrative, and industry-standard technical safeguards to protect your personal identifiers and campaign analytics. 

This includes:
• Enforced SSL/TLS 1.3 encryption on all web domains and API payloads.
• Multi-Factor Authentication (MFA) protocols on all internal ad-account managers and client reporting repositories.
• Periodic access-level audits and immediate termination of access tokens for off-boarded personnel.

While we take rigorous measures, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute data security.`
    },
    {
      id: "your-rights",
      title: "7. Your Rights & Choices",
      content: `You possess complete sovereignty over the personal data you share with Analytics Clouds:

• Right to Access: You can request a digital file of all personal contact information we maintain about you.
• Right to Rectification: You can ask us to update or correct any inaccurate email addresses, phone coordinates, or company names.
• Right to Erasure ('Right to be Forgotten'): You can request that we completely delete your lead-generation records and consultation histories from our operational CRMs.
• Marketing Opt-Out: Every informational email newsletter we send includes a one-click 'unsubscribe' link to immediately cease commercial correspondence.`
    },
    {
      id: "data-retention",
      title: "8. Data Retention Policies",
      content: `We retain collected data only for as long as is necessary to fulfill the objectives outlined in this Privacy Policy:

• Contact details from our prospective lead forms are securely stored for up to 24 months from the date of last active correspondence, unless deletion is requested earlier.
• Client billing metrics, project reports, and contract archives are kept longer to satisfy Noida-based municipal tax requirements, corporate records, and legal dispute statutes.
• Anonymous technical cookies expire automatically based on browser configurations or within 180 days.`
    },
    {
      id: "children-privacy",
      title: "9. Children's Privacy",
      content: `Analytics Clouds operates strictly as a business-to-business (B2B) digital marketing and search marketing agency. Our web properties and consulting resources are not structured or intended for children under the age of 13.

We do not knowingly collect or solicit personal information from minors. If you believe a child has provided us with personal data, please reach out to us at sales@analyticsclouds.com so we can purge the information immediately.`
    },
    {
      id: "policy-changes",
      title: "10. Changes to This Privacy Policy",
      content: `We periodically update this policy to align with new regional digital laws, cookie tracking mandates (such as GDPR or Indian digital privacy acts), and changes in ad platform API terms. 

When modifications are applied, we will update the "Last Updated" date at the top of this page. Your continued use of our agency website and performance solutions following these changes constitutes your formal acceptance of the revised privacy framework.`
    },
    {
      id: "contact-privacy",
      title: "11. Contact Us & Data Protection Officer",
      content: `If you wish to execute any of your data rights, request complete lead erasure, or raise inquiries regarding our cookie tracking policies, please communicate directly with our Noida compliance team:

• Email: sales@analyticsclouds.com
• Phone: +91 99979 69967
• Registered Office: 917, Idgah Road, Gandhi Nagar, Unnao - 209801
• Office: B-101, 1st Floor, Tower-B, Noida One, Sector 62, Noida - 201309

We are committed to addressing all legitimate privacy requests within 48 business hours.`
    }
  ];

  const toggleSection = (id: string) => {
    setOpenSection(openSection === id ? null : id);
  };

  return (
    <div id="privacy-policy-page-container" className="bg-white text-[#333333] selection:bg-[#FE7146] selection:text-white">

      {/* 1. Hero Section (dark navy band, extends behind the fixed navbar — no white gap) */}
      <section id="privacy-hero-section" className="bg-[#303360] text-white pt-28 pb-16 sm:pt-32 sm:pb-20 relative overflow-hidden">
        
        {/* Subtle background decoration (low opacity orange gradient and dots) */}
        <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
          <div className="absolute top-1/2 right-10 -translate-y-1/2 w-96 h-96 bg-[#FE7146] rounded-full filter blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          
          {/* Small pill badge */}
          <div className="inline-block bg-white text-[#303360] text-[10px] sm:text-xs font-black tracking-widest uppercase px-4 py-1.5 rounded-full shadow-md">
            Your Privacy Matters to Us
          </div>

          {/* Headline */}
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
            Privacy Policy
          </h1>

          {/* Subcopy */}
          <p className="text-gray-300 text-sm sm:text-base font-normal max-w-2xl mx-auto leading-relaxed">
            Learn how Analytics Clouds handles, secures, and respects your business metrics, personal identifiers, and user preferences on our platform.
          </p>

        </div>
      </section>

      {/* 2. Breadcrumb bar */}
      <section id="privacy-breadcrumb-bar" className="bg-[#F5F5FA] border-b border-gray-100 py-3 text-left">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-xs font-semibold text-gray-500 flex items-center gap-2">
          <Link href="/" className="text-[#303360] hover:text-[#FE7146] transition-colors">
            Home
          </Link>
          <span className="text-gray-400 font-normal">&gt;</span>
          <span className="text-[#FE7146] font-bold">Privacy Policy</span>
        </div>
      </section>

      {/* 3. Quick Trust Summary (new element, above the accordion) */}
      <section id="privacy-trust-summary" className="py-12 bg-white border-b border-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1 */}
            <div className="border border-gray-100 rounded-2xl p-5 bg-[#F5F5FA]/40 hover:shadow-md hover:shadow-slate-100 transition-all text-left flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#FFF1EC] text-[#FE7146] flex items-center justify-center shrink-0 shadow-sm">
                <Lock size={18} />
              </div>
              <div className="space-y-1">
                <h4 className="font-display font-black text-xs sm:text-sm text-[#303360]">
                  Never Sell Data
                </h4>
                <p className="text-gray-500 text-[11px] leading-relaxed">
                  We strictly never rent or sell client campaign data or email lead lists. Period.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="border border-gray-100 rounded-2xl p-5 bg-[#F5F5FA]/40 hover:shadow-md hover:shadow-slate-100 transition-all text-left flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#FFF1EC] text-[#FE7146] flex items-center justify-center shrink-0 shadow-sm">
                <Eye size={18} />
              </div>
              <div className="space-y-1">
                <h4 className="font-display font-black text-xs sm:text-sm text-[#303360]">
                  Full Preferences
                </h4>
                <p className="text-gray-500 text-[11px] leading-relaxed">
                  You possess absolute sovereignty to request logs, rectifications, or erasure.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="border border-gray-100 rounded-2xl p-5 bg-[#F5F5FA]/40 hover:shadow-md hover:shadow-slate-100 transition-all text-left flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#FFF1EC] text-[#FE7146] flex items-center justify-center shrink-0 shadow-sm">
                <Database size={18} />
              </div>
              <div className="space-y-1">
                <h4 className="font-display font-black text-xs sm:text-sm text-[#303360]">
                  Secure Handling
                </h4>
                <p className="text-gray-500 text-[11px] leading-relaxed">
                  Protected with SSL/TLS encryption, automated backups, and restricted access.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Privacy Accordion (Main Content) */}
      <section id="privacy-content-section" className="py-16 sm:py-20 bg-white relative">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header metadata row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-6 mb-10">
            <div className="flex items-center gap-2 text-slate-500 font-semibold text-xs">
              <Clock size={14} className="text-[#FE7146]" />
              <span>Last Updated: July 2026</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 font-semibold text-xs">
              <CheckCircle2 size={14} className="text-emerald-500" />
              <span>Fully Compliant & Validated</span>
            </div>
          </div>

          {/* Accordion List */}
          <div className="space-y-4">
            {policySections.map((sec) => {
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

      {/* 5. "Still Have Questions?" Closing Strip */}
      <section id="privacy-questions-strip" className="py-12 bg-[#F5F5FA] border-t border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center gap-4 text-left">
            <div className="w-10 h-10 rounded-full bg-[#FFF1EC] text-[#FE7146] flex items-center justify-center shrink-0 shadow-sm">
              <HelpCircle size={20} />
            </div>
            <div>
              <h3 className="font-display font-black text-sm sm:text-base text-[#303360] leading-snug">
                Have questions about your data or privacy?
              </h3>
              <p className="text-gray-500 text-xs mt-0.5 font-medium">
                Our administration and compliance team is ready to answer any questions.
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
