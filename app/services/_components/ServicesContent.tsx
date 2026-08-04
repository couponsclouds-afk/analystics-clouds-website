/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  Target,
  Share2,
  Code2,
  Mail,
  MessageSquare,
  Tv,
  TrendingUp,
  Layers,
  Users,
  Check,
  Zap,
  BarChart3,
  Cloud,
  ArrowUpRight,
  HelpCircle,
  Activity,
  Sparkles,
  ArrowRight,
  Award,
  Globe,
  LineChart,
  CheckCircle2
} from "lucide-react";

interface ServicesPageProps { }

// 8 Services Configuration
interface ServiceConfig {
  id: string;
  name: string;
  category: "PAID" | "ORGANIC & SOCIAL" | "DIRECT & CREATIVE";
  categoryLabel: string;
  collapseDesc: string;
  expandedDesc: string;
  capabilities: string[];
  metric: string;
  metricLabel: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  tileBg: string;
  borderHover: string;
  link?: string;
}

export function Services(props: ServicesPageProps) {
  const navigate = useRouter();
  // Motion settings
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  // State for interactive features
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const [highlightedServiceIds, setHighlightedServiceIds] = useState<string[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedMobileIndex, setSelectedMobileIndex] = useState<number | null>(null);

  // Refs for navigation
  const showcaseRef = useRef<HTMLDivElement>(null);

  const services: ServiceConfig[] = [
    {
      id: "performance-marketing",
      name: "Performance Marketing",
      category: "PAID",
      categoryLabel: "PAID",
      collapseDesc: "Data-driven campaigns focused on maximizing customer acquisition and clear ROI.",
      expandedDesc: "We engineer end-to-end paid marketing funnels. From laser-focused audience targeting to continuous bid optimization, we ensure every marketing rupee spent directly fuels scalable business growth.",
      capabilities: ["Paid Search & Social Strategy", "LTV & CAC Optimization", "Full-Funnel Multipliers"],
      metric: "4.2x",
      metricLabel: "Avg. ROAS Achieved",
      icon: <Target className="w-5 h-5 text-[#FE7146]" />,
      iconBg: "bg-orange-50",
      iconColor: "text-[#FE7146]",
      tileBg: "bg-[#FFF1EC]/30",
      borderHover: "hover:border-[#FE7146]/45",
      link: "/services/performance-marketing",
    },
    {
      id: "google-ads",
      name: "Google Ads",
      category: "PAID",
      categoryLabel: "PAID",
      collapseDesc: "Dominate search, shopping, and YouTube with precision-targeted high-intent campaigns.",
      expandedDesc: "Capture high-intent buyers exactly when they search for your products or services. Our certified specialists manage campaigns with bidding algorithms and custom-built high-converting landing pages.",
      capabilities: ["Search & Shopping Ads", "YouTube & Discovery Campaigns", "Smart Bidding Optimization"],
      metric: "-28%",
      metricLabel: "Average Cost-Per-Acquisition",
      icon: <TrendingUp className="w-5 h-5 text-indigo-600" />,
      iconBg: "bg-indigo-50",
      iconColor: "text-indigo-600",
      tileBg: "bg-[#F5F5FA]/40",
      borderHover: "hover:border-indigo-600/40",
      link: "/services/google-ads",
    },
    {
      id: "social-media-marketing",
      name: "Social Media Marketing",
      category: "ORGANIC & SOCIAL",
      categoryLabel: "ORGANIC & SOCIAL",
      collapseDesc: "Engage your audience and build communities across Instagram, Facebook, and LinkedIn.",
      expandedDesc: "We combine high-impact creative with surgical audience segmenting to scale your brand footprint. From thumb-stopping social content to influencer coordination and community management.",
      capabilities: ["Social Content Blueprint", "Surgical Ad Segmenting", "Active Community Engagement"],
      metric: "+180%",
      metricLabel: "Engagement Rate Increase",
      icon: <Share2 className="w-5 h-5 text-sky-500" />,
      iconBg: "bg-sky-50",
      iconColor: "text-sky-500",
      tileBg: "bg-[#F5F5FA]/40",
      borderHover: "hover:border-sky-500/40",
      link: "/services/social-media-marketing",
    },
    {
      id: "seo",
      name: "Search Engine Optimization (SEO)",
      category: "ORGANIC & SOCIAL",
      categoryLabel: "ORGANIC & SOCIAL",
      collapseDesc: "Rank higher on Google and secure long-term recurring organic traffic that converts.",
      expandedDesc: "A blend of technical architecture, on-page optimization, and premium editorial link-building that puts your brand in front of customers actively seeking answers, driving zero-cost recurring revenue.",
      capabilities: ["Technical Architecture Audit", "Keyword Domination Strategy", "Premium Link-Building"],
      metric: "+230%",
      metricLabel: "Avg. Organic Traffic Lift",
      icon: <Search className="w-5 h-5 text-indigo-600" />,
      iconBg: "bg-indigo-50",
      iconColor: "text-indigo-600",
      tileBg: "bg-[#F5F5FA]/40",
      borderHover: "hover:border-indigo-600/40",
      link: "/services/seo",
    },
    {
      id: "web-design",
      name: "Website Design & Development",
      category: "DIRECT & CREATIVE",
      categoryLabel: "DIRECT & CREATIVE",
      collapseDesc: "Responsive, ultra-fast, and custom-engineered sites designed to maximize conversions.",
      expandedDesc: "We don't build generic brochure sites. We engineer blazing-fast, visually striking web experiences optimized for performance, SEO-ready out-of-the-box, and coded to convert passive clicks into pipeline.",
      capabilities: ["UX/UI Design Systems", "Fast Next.js/React Build", "Conversion Rate Optimization"],
      metric: "98/100",
      metricLabel: "Google Lighthouse Speed Score",
      icon: <Code2 className="w-5 h-5 text-[#FE7146]" />,
      iconBg: "bg-orange-50",
      iconColor: "text-[#FE7146]",
      tileBg: "bg-[#FFF1EC]/30",
      borderHover: "hover:border-[#FE7146]/45",
      link: "/services/web-design-development",
    },
    {
      id: "display-native-ads",
      name: "Display & Native Ads",
      category: "PAID",
      categoryLabel: "PAID",
      collapseDesc: "Build massive brand awareness across premier web properties with contextual banner campaigns.",
      expandedDesc: "Capture your audience on their favorite news websites, blogs, and portals. We craft contextual native ads that blend seamlessly into editorial content, and visually captivating rich-media display banner ads.",
      capabilities: ["Contextual & Topic Targeting", "Rich-Media Creative Production", "Dynamic Re-targeting Strategy"],
      metric: "3.5x",
      metricLabel: "Brand Search Vol. Lift",
      icon: <Tv className="w-5 h-5 text-indigo-600" />,
      iconBg: "bg-indigo-50",
      iconColor: "text-indigo-600",
      tileBg: "bg-[#F5F5FA]/40",
      borderHover: "hover:border-indigo-600/40",
      link: "/services/display-native-ads",
    }
  ];

  // Helper to scroll to showcase and highlight matching cards
  const handleGroupAction = (group: "PAID" | "ORGANIC & SOCIAL" | "DIRECT & CREATIVE") => {
    setActiveGroup(group);

    // Find all services in this category
    const matchingIds = services.filter((s) => s.category === group).map((s) => s.id);
    setHighlightedServiceIds(matchingIds);

    // Smooth scroll
    showcaseRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

    // Fade highlight after 1.5s
    setTimeout(() => {
      setHighlightedServiceIds([]);
    }, 1500);
  };

  // Consultative Quiz Trigger
  const handleQuizChoice = (choice: "traffic" | "leads" | "website") => {
    let targets: string[] = [];
    let group: "PAID" | "ORGANIC & SOCIAL" | "DIRECT & CREATIVE" | null = null;

    if (choice === "traffic") {
      targets = ["seo", "google-ads", "display-native-ads"];
      group = "ORGANIC & SOCIAL";
    } else if (choice === "leads") {
      targets = ["performance-marketing", "google-ads", "sms-marketing"];
      group = "PAID";
    } else {
      targets = ["web-design"];
      group = "DIRECT & CREATIVE";
    }

    setActiveGroup(group);
    setHighlightedServiceIds(targets);
    showcaseRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

    setTimeout(() => {
      setHighlightedServiceIds([]);
    }, 2000);
  };

  // Math for Hub-and-Spoke diagram
  const radius = 140; // radius of spokes in px
  const spokesAngles = [0, 45, 90, 135, 180, 225, 270, 315];
  const spokesServices = [
    { name: "SEO", icon: <Search className="w-4 h-4 text-[#FE7146]" /> },
    { name: "Google Ads", icon: <TrendingUp className="w-4 h-4 text-white" /> },
    { name: "Social Media", icon: <Share2 className="w-4 h-4 text-white" /> },
    { name: "SMS", icon: <MessageSquare className="w-4 h-4 text-[#FE7146]" /> },
    { name: "Web Dev", icon: <Code2 className="w-4 h-4 text-[#FE7146]" /> },
    { name: "Email", icon: <Mail className="w-4 h-4 text-white" /> },
    { name: "Display Ads", icon: <Tv className="w-4 h-4 text-white" /> },
    { name: "Performance", icon: <Target className="w-4 h-4 text-[#FE7146]" /> }
  ];

  return (
    <div className="pt-24 bg-white selection:bg-[#FE7146] selection:text-white">

      {/* SECTION 1: HERO & Icon Constellation */}
      <section className="relative min-h-[85vh] flex items-center justify-center py-20 overflow-hidden bg-white border-b border-gray-100">

        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[radial-gradient(#F5F5FA_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-70"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#FFF1EC]/50 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[#F5F5FA]/70 blur-3xl"></div>

        {/* Ambient Floating Icon Constellation (Desktop only, hidden on mobile) */}
        {!prefersReducedMotion && (
          <div className="absolute inset-0 pointer-events-none hidden md:block overflow-hidden max-w-7xl mx-auto">
            {/* SEO Search icon floating left */}
            <motion.div
              className="absolute left-[10%] top-[25%] p-4 rounded-2xl bg-[#F5F5FA] border border-gray-100 shadow-xl flex items-center gap-2"
              animate={{ y: [0, -12, 12, 0], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
                <Search className="w-4 h-4 text-indigo-600" />
              </div>
              <span className="text-xs font-mono font-black text-[#303360]">SEO</span>
            </motion.div>

            {/* Performance Target icon floating right */}
            <motion.div
              className="absolute right-[8%] top-[20%] p-4 rounded-2xl bg-[#FFF1EC] border border-[#FE7146]/10 shadow-xl flex items-center gap-2"
              animate={{ y: [0, 15, -15, 0], rotate: [0, -4, 4, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-xs">
                <Target className="w-4 h-4 text-[#FE7146]" />
              </div>
              <span className="text-xs font-mono font-black text-[#303360]">PAID</span>
            </motion.div>

            {/* Web Dev Code icon floating bottom left */}
            <motion.div
              className="absolute left-[8%] bottom-[25%] p-4 rounded-2xl bg-[#FFF1EC] border border-[#FE7146]/10 shadow-xl flex items-center gap-2"
              animate={{ y: [0, -10, 10, 0], rotate: [0, 3, -3, 0] }}
              transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            >
              <div className="w-8 h-8 rounded-lg bg-[#FE7146]/10 flex items-center justify-center">
                <Code2 className="w-4 h-4 text-[#FE7146]" />
              </div>
              <span className="text-xs font-mono font-black text-[#303360]">WEB DEV</span>
            </motion.div>

            {/* Social Share icon floating bottom right */}
            <motion.div
              className="absolute right-[12%] bottom-[22%] p-4 rounded-2xl bg-[#F5F5FA] border border-gray-100 shadow-xl flex items-center gap-2"
              animate={{ y: [0, 12, -12, 0], rotate: [0, -5, 5, 0] }}
              transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            >
              <div className="w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center">
                <Share2 className="w-4 h-4 text-sky-500" />
              </div>
              <span className="text-xs font-mono font-black text-[#303360]">SOCIAL</span>
            </motion.div>

            

            {/* SMS Message icon floating right middle */}
            
          </div>
        )}

        {/* Hero Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFF1EC] border border-[#FE7146]/20 rounded-full">

            <span className="text-[10px] sm:text-xl font-mono font-black tracking-widest text-[#FE7146] uppercase">
              OUR SERVICES
            </span>
          </div>

          <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-[#303360] tracking-tight leading-none">
            Everything You Need to
            <span className="text-[#FE7146] relative inline-block">
              Grow
              <svg className="absolute -bottom-2 left-0 w-full h-2 text-[#FE7146]/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0,5 Q50,10 100,5" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round" />
              </svg>
            </span> Your Brand
          </h1>

          <p className="text-slate-600 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed font-normal pt-2">
            No juggling multiple agencies. Everything you need to grow your business, all in one place. We combine performance marketing, SEO, and creative design to deliver measurable results.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
              onClick={() => navigate.push('/contact')}
              className="w-full sm:w-auto bg-[#FE7146] hover:bg-[#FE7146]/95 text-white font-black text-base px-8 py-4 rounded-xl shadow-lg shadow-[#FE7146]/20 transition-all hover:scale-[1.03] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Get a Free Strategy Call</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <a
              href="#services-showcase"
              className="w-full sm:w-auto bg-slate-50 hover:bg-slate-100 text-[#303360] font-black text-base px-8 py-4 rounded-xl border border-gray-200/60 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Explore Capabilities</span>
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 2: SERVICE GROUPING STRIP (Orientation Aid) */}
      <section className="sticky top-[72px] z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 py-4 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="text-xs font-mono font-bold text-slate-400 tracking-wider">
              ORIENTATION FILTER:
            </span>

            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              {[
                { label: "PAID MEDIA", key: "PAID", count: "3 Services" },
                { label: "ORGANIC & SOCIAL", key: "ORGANIC & SOCIAL", count: "2 Services" },
                { label: "DIRECT & CREATIVE", key: "DIRECT & CREATIVE", count: "3 Services" }
              ].map((group) => {
                const isActive = activeGroup === group.key;
                return (
                  <button
                    key={group.key}
                    onClick={() => handleGroupAction(group.key as any)}
                    className={`px-4 py-2 rounded-xl text-xs font-mono font-black transition-all flex items-center gap-2 cursor-pointer border ${isActive
                      ? "bg-[#303360] text-white border-[#303360] shadow-md shadow-[#303360]/10"
                      : "bg-[#F5F5FA] text-slate-600 hover:text-[#303360] hover:bg-[#F5F5FA]/80 border-transparent"
                      }`}
                  >
                    <span>{group.label}</span>
                    <span className={`px-1.5 py-0.5 rounded-md text-[10px] ${isActive ? "bg-[#FE7146] text-white" : "bg-slate-200 text-slate-500 font-bold"}`}>
                      {group.count}
                    </span>
                  </button>
                );
              })}

              {activeGroup && (
                <button
                  onClick={() => {
                    setActiveGroup(null);
                    setHighlightedServiceIds([]);
                  }}
                  className="px-3 py-2 text-xs font-mono font-bold text-[#FE7146] hover:underline cursor-pointer"
                >
                  Clear filter
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: MAIN SERVICES SHOWCASE (Signature Interactive Element) */}
      <section id="services-showcase" ref={showcaseRef} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xl font-mono font-black text-[#FE7146] tracking-widest uppercase">
              EXPERT CAPABILITIES
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-[#303360] leading-tight tracking-tight">
              Explore Our <span className="text-[#FE7146]"> Services</span>
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              Select a service to see how we help businesses achieve measurable growth.
            </p>
          </div>

          {/* 8-Tile spotlight Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 relative">
            {services.map((service, index) => {
              // Highlight checking
              const isGroupHighlighted = highlightedServiceIds.length > 0;
              const isSelfHighlighted = highlightedServiceIds.includes(service.id);
              const isFilteredOut = isGroupHighlighted && !isSelfHighlighted;

              // Expand checking (desktop uses hoveredIndex, mobile uses selectedMobileIndex)
              const isExpanded = hoveredIndex === index || selectedMobileIndex === index;

              return (
                <div
                  key={service.id}
                  id={`card-${service.id}`}
                  className={`relative flex flex-col justify-between p-6 sm:p-8 rounded-3xl border transition-all duration-300 cursor-pointer h-full ${isExpanded
                    ? "ring-2 ring-[#FE7146] shadow-2xl bg-white scale-[1.02] border-[#FE7146] z-10"
                    : isFilteredOut
                      ? "opacity-30 scale-[0.98] border-gray-100 bg-gray-50/50"
                      : isGroupHighlighted && isSelfHighlighted
                        ? "ring-2 ring-[#FE7146] shadow-xl bg-[#FFF1EC]/30 border-[#FE7146] scale-[1.01] z-10"
                        : "border-gray-100 bg-slate-50/30 hover:bg-white hover:shadow-xl hover:scale-[1.01]"
                    }`}
                  onClick={() => service.link && navigate.push(service.link)}
                >
                  <div className="space-y-4">
                    {/* Header line: Monospace Group tag */}
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono font-black text-slate-400 bg-slate-100 px-2.5 py-1 rounded-md tracking-wider">
                        {service.categoryLabel}
                      </span>
                      {isExpanded && (
                        <span className="text-[10px] font-mono font-black text-[#FE7146] animate-pulse">
                          ACTIVE SPOTLIGHT
                        </span>
                      )}
                    </div>

                    {/* Icon and Title */}
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl ${service.iconBg} flex items-center justify-center border border-gray-100 shadow-xs`}>
                        {service.icon}
                      </div>
                      <h3 className="font-display font-extrabold text-lg text-[#303360] leading-snug">
                        {service.name}
                      </h3>
                    </div>

                    {/* Collapsed Description (Always visible) */}
                    <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed">
                      {service.collapseDesc}
                    </p>

                    {/* Smooth Height Expansion for details */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? "max-h-[350px] opacity-100 pt-4 border-t border-dashed border-gray-100" : "max-h-0 opacity-0 pointer-events-none"
                        }`}
                    >
                      <div className="space-y-4 pt-1">
                        <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-normal">
                          {service.expandedDesc}
                        </p>

                        {/* Capabilities bullets */}
                        <div className="space-y-2">
                          <span className="text-[10px] font-mono font-black text-[#303360] block tracking-wide uppercase">
                            CORE CAPABILITIES:
                          </span>
                          <ul className="space-y-1.5">
                            {service.capabilities.map((cap, cIdx) => (
                              <li key={cIdx} className="flex items-start gap-2 text-xs text-slate-600">
                                <Check className="w-3.5 h-3.5 text-[#FE7146] shrink-0 mt-0.5" />
                                <span>{cap}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Metric & CTA button inside expander */}
                        <div className="pt-4 flex items-center justify-between gap-2 border-t border-gray-100/60 mt-2">
                          <div>
                            <span className="block font-mono font-black text-xl text-[#FE7146] tracking-tight">
                              {service.metric}
                            </span>
                            <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider block leading-none pt-0.5">
                              {service.metricLabel}
                            </span>
                          </div>

                          {service.link ? (
                            <Link href={service.link}
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1 text-xs font-mono font-black text-[#303360] hover:text-[#FE7146] bg-slate-50 hover:bg-slate-100 py-2 px-3 rounded-xl border border-gray-200/50 transition-all cursor-pointer"
                            >
                              <span>Learn More</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </Link>
                          ) : (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate.push('/contact');
                              }}
                              className="inline-flex items-center gap-1 text-xs font-mono font-black text-[#FE7146] hover:text-white hover:bg-[#FE7146] bg-[#FFF1EC] py-2 px-3 rounded-xl border border-[#FE7146]/10 transition-all cursor-pointer"
                            >
                              <span>Audit Strategy</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Indicator to tap/hover if not expanded */}
                  {!isExpanded && (
                    <div className="pt-4 border-t border-gray-100/40 flex justify-between items-center text-slate-400 text-[11px] font-mono font-bold">
                      <span className="group-hover:text-[#FE7146] transition-colors uppercase">
                        Spotlight Details
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* SECTION 4: WHY ONE AGENCY, NOT EIGHT VENDORS (Differentiator Band) */}
      <section className="py-24 bg-[#303360] text-white relative overflow-hidden">

        {/* Geometric dark accents */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:16px_16px] opacity-80"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/[0.01] border border-white/[0.03] pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-white/[0.01] border border-white/[0.04] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

            {/* Left Col: Core Pitch & 4 Differentiators */}
            <div className="lg:col-span-6 space-y-10 text-left">
              <div className="space-y-4">
                <span className="text-xl font-mono font-black text-[#FE7146] tracking-widest uppercase block">
                  METHODOLOGY
                </span>
                <h2 className="font-display font-black text-3xl sm:text-5xl text-white leading-tight tracking-tight">
                  Our 4-Step <br />
                  <span className="text-[#FE7146]">Growth Protocol</span>
                </h2>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal max-w-xl">
                  A proven approach that helps your business attract more customers, improve performance, and achieve measurable growth.
                </p>
              </div>

              {/* 4 Differentiators */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                {[
                  {
                    title: "Discover Audit & Strategy",
                    desc: "We start by understanding your business, goals, current marketing performance, and competitors. Then we create a strategy tailored to your growth.",
                    icon: <Layers className="w-5 h-5 text-[#FE7146]" />
                  },
                  {
                    title: "Plan Channel & Campaign Planning",
                    desc: "Based on your goals, we choose the right mix of SEO, performance marketing, affiliate marketing, AI automation, and web solutions to maximize your results.",
                    icon: <Users className="w-5 h-5 text-indigo-400" />
                  },
                  {
                    title: "Execute Launch & Optimize",
                    desc: "Our team launches your campaigns, creates high-converting creatives and landing pages, and continuously optimizes performance to improve results.",
                    icon: <BarChart3 className="w-5 h-5 text-sky-400" />
                  },
                  {
                    title: "Measure & Scale Track, Improve & Grow",
                    desc: "We monitor campaign performance, share clear reports, identify new growth opportunities, and scale what delivers the best results.",
                    icon: <Zap className="w-5 h-5 text-[#FE7146]" />
                  }
                ].map((diff, dIdx) => (
                  <div key={dIdx} className="space-y-2 p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#FE7146]/20 transition-all">
                    <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center">
                      {diff.icon}
                    </div>
                    <h4 className="font-display font-extrabold text-[#FE7146] text-sm tracking-tight pt-1">
                      {diff.title}
                    </h4>
                    <p className="text-slate-300 text-xs leading-relaxed font-normal">
                      {diff.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Col: Custom Hub-and-Spoke Node Diagram */}
            <div className="lg:col-span-6 flex justify-center items-center">
              <div className="relative w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] flex items-center justify-center">

                {/* SVG Connecting lines with flowing particles */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                  {spokesAngles.map((angle, i) => {
                    const rad = (angle * Math.PI) / 180;
                    // Compute absolute positions inside a 100% box
                    const r = radius;
                    const x = Math.cos(rad) * r;
                    const y = Math.sin(rad) * r;

                    return (
                      <g key={i}>
                        {/* Connecting Line */}
                        <line
                          x1="50%"
                          y1="50%"
                          x2={`calc(50% + ${x}px)`}
                          y2={`calc(50% + ${y}px)`}
                          stroke="#FE7146"
                          strokeWidth="2"
                          strokeOpacity="0.25"
                          strokeDasharray="4 4"
                        />

                        {/* Pulsing Particle flowing inwards */}
                        {!prefersReducedMotion && (
                          <motion.circle
                            cx={`calc(50% + ${x}px)`}
                            cy={`calc(50% + ${y}px)`}
                            r="3.5"
                            fill="#FE7146"
                            animate={{
                              cx: [`calc(50% + ${x}px)`, "50%"],
                              cy: [`calc(50% + ${y}px)`, "50%"],
                              opacity: [0.1, 1, 0.2]
                            }}
                            transition={{
                              duration: 2.8,
                              repeat: Infinity,
                              delay: i * 0.35,
                              ease: "easeInOut"
                            }}
                          />
                        )}
                      </g>
                    );
                  })}
                </svg>

                {/* CENTRAL HUB NODE: Analytics Clouds */}
                <div className="absolute z-20 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white flex flex-col items-center justify-center border-4 border-[#FE7146] shadow-2xl shadow-[#FE7146]/40 text-[#303360] text-center select-none">
                  <Cloud className="w-8 h-8 text-[#FE7146] animate-bounce duration-[3000ms]" />
                  <span className="font-display font-black text-[9px] sm:text-[10px] tracking-wider uppercase leading-none mt-1">
                    ANALYTICS
                  </span>
                  <span className="font-display font-black text-[9px] sm:text-[10px] tracking-wider uppercase leading-none text-[#FE7146]">
                    CLOUDS
                  </span>
                  {/* Rotating border effect */}
                  <div className="absolute -inset-2.5 rounded-full border-2 border-dashed border-white/20 animate-spin duration-[20s]"></div>
                </div>

                {/* 8 SPOKE NODES around the central hub */}
                {spokesAngles.map((angle, i) => {
                  const rad = (angle * Math.PI) / 180;
                  const x = Math.cos(rad) * radius;
                  const y = Math.sin(rad) * radius;

                  const service = spokesServices[i];
                  // Alternating color profiles
                  const isOrangeNode = i % 2 === 0;

                  return (
                    <div
                      key={i}
                      className="absolute z-10 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 group"
                      style={{
                        left: `calc(50% + ${x}px)`,
                        top: `calc(50% + ${y}px)`
                      }}
                    >
                      {/* Node circle */}
                      <div className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all shadow-md ${isOrangeNode
                        ? "bg-[#FFF1EC] border-2 border-[#FE7146] text-[#FE7146] group-hover:bg-[#FE7146] group-hover:text-white"
                        : "bg-white/[0.07] border border-white/20 text-white group-hover:bg-white group-hover:text-[#303360]"
                        }`}>
                        {service.icon}
                      </div>

                      {/* Tooltip Label */}
                      <span className="opacity-70 group-hover:opacity-100 text-[8px] sm:text-[10px] font-mono font-bold tracking-tight text-slate-300 group-hover:text-[#FE7146] transition-colors whitespace-nowrap bg-[#303360]/90 px-1.5 py-0.5 rounded border border-white/5">
                        {service.name}
                      </span>
                    </div>
                  );
                })}

              </div>
            </div>

          </div>
        </div>
      </section>



      {/* SECTION 6: RESULTS SNAPSHOT (Proof Band with Counters) */}
      <section className="py-20 bg-[#F5F5FA]/80 border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { val: 500, suffix: "+", label: "Successful Campaigns", desc: "Delivered across search & social" },
              { val: 200, suffix: "+", label: "Happy Client Accounts", desc: "India & global brands scaled" },
              { val: 98, suffix: "%", label: "Client Retention Rate", desc: "Long-term engineering trust" },
              { val: 4.2, suffix: "x", label: "Avg. ROAS Achieved", desc: "Scale performance media buying" }
            ].map((stat, idx) => (
              <div key={idx} className="space-y-2 text-center md:text-left">
                <div className="font-display font-black text-4xl sm:text-5xl text-[#303360] tracking-tight leading-none flex items-baseline justify-center md:justify-start">
                  <span className="text-[#FE7146]">{stat.val}</span>
                  <span className="text-[#303360]">{stat.suffix}</span>
                </div>
                <h4 className="font-display font-extrabold text-sm text-[#303360] leading-snug">
                  {stat.label}
                </h4>
                <p className="text-slate-500 text-xs font-normal max-w-xs mx-auto md:mx-0">
                  {stat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: COMPARE & CHOOSE (Guided Quiz Helper) */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10">

          <div className="space-y-4">

            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#303360] tracking-tight">
              Not Sure Where To Start?
            </h2>
            <p className="text-slate-500 text-base max-w-xl mx-auto leading-relaxed font-normal">
              Tell us your biggest challenge, and we'll recommend the right solution to help your business grow.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <button
              onClick={() => handleQuizChoice("traffic")}
              className="p-6 bg-slate-50 hover:bg-white rounded-2xl border border-gray-100 hover:border-[#FE7146]/30 hover:shadow-lg transition-all text-center flex flex-col items-center justify-center gap-3 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-[#FE7146] group-hover:text-white transition-all">
                <Search className="w-5 h-5" />
              </div>
              <span className="font-display font-black text-[#303360] text-sm group-hover:text-[#FE7146] transition-colors">
                I need more traffic
              </span>
              <p className="text-[11px] text-slate-400 font-normal leading-relaxed">
                Boost your visibility with SEO and performance marketing.
              </p>
            </button>

            <button
              onClick={() => handleQuizChoice("leads")}
              className="p-6 bg-slate-50 hover:bg-white rounded-2xl border border-gray-100 hover:border-[#FE7146]/30 hover:shadow-lg transition-all text-center flex flex-col items-center justify-center gap-3 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#FE7146] flex items-center justify-center group-hover:bg-[#FE7146] group-hover:text-white transition-all">
                <Target className="w-5 h-5" />
              </div>
              <span className="font-display font-black text-[#303360] text-sm group-hover:text-[#FE7146] transition-colors">
                I need more leads and sales
              </span>
              <p className="text-[11px] text-slate-400 font-normal leading-relaxed">
                Reach the right audience with high-performing ad campaigns.
              </p>
            </button>

            <button
              onClick={() => handleQuizChoice("website")}
              className="p-6 bg-slate-50 hover:bg-white rounded-2xl border border-gray-100 hover:border-[#FE7146]/30 hover:shadow-lg transition-all text-center flex flex-col items-center justify-center gap-3 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#FFF1EC] text-[#FE7146] flex items-center justify-center group-hover:bg-[#FE7146] group-hover:text-white transition-all">
                <Code2 className="w-5 h-5" />
              </div>
              <span className="font-display font-black text-[#303360] text-sm group-hover:text-[#FE7146] transition-colors">
                I need a new website
              </span>
              <p className="text-[11px] text-slate-400 font-normal leading-relaxed">
                Build a fast, modern website designed to convert visitors into customers.
              </p>
            </button>
          </div>

        </div>
      </section>

    

      {/* SECTION 9: CTA BANNER (Custom Headline & Subcopy matching prompt instructions) */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

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
                Not Sure Which Service Fits Your Goals?
              </h2>
              <p className="text-orange-50 text-base sm:text-lg font-normal">
                Let's sit down for a customized audit. Our performance engineering team will map your existing funnels and craft a growth blueprint at zero cost.
              </p>
            </div>

            {/* Right: Solid white Button */}
            <div className="relative z-10 w-full lg:w-auto">
              <button
                onClick={() => navigate.push('/contact')}
                className="w-full lg:w-auto bg-white hover:bg-orange-50 text-[#FE7146] font-black text-base px-8 py-4 rounded-xl shadow-lg transition-all hover:scale-[1.03] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Talk to a Strategist</span>
                <TrendingUp size={18} />
              </button>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
