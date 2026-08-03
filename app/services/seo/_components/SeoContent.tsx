"use client";

import { useRouter } from "next/navigation";
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  ArrowUp,
  ArrowRight,
  TrendingUp,
  Check,
  ChevronDown,
  ChevronRight,
  Sparkles,
  Award,
  Users,
  ShieldCheck,
  Clock,
  ArrowUpRight,
  Activity,
  FileSpreadsheet,
  Globe,
  LineChart,
  HelpCircle,
  Database,
  SearchIcon,
  MessageSquare,
  CheckCircle2,
  Lock,
  Calendar
} from "lucide-react";
import { CtaBanner } from '@/components/CtaBanner';

// Intersection Observer Count Up Component for Stats
interface CountUpProps {
  end: number;
  suffix?: string;
  duration?: number;
}

function CountUp({ end, suffix = "", duration = 1500 }: CountUpProps) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTime: number | null = null;
          
          const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              setCount(end);
            }
          };
          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [end, duration]);

  return (
    <span ref={elementRef} className="font-mono font-black text-3xl sm:text-4xl lg:text-5xl text-[#FE7146]">
      {count}
      {suffix}
    </span>
  );
}

// Interfaces for What's Included Tabs
interface SeoTab {
  id: string;
  title: string;
  description: string;
  capabilities: string[];
  metric: string;
  metricLabel: string;
  stageName: string;
}

export function Seo() {
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

  // 1. Hero SERP Simulation State
  const [typedQuery, setTypedQuery] = useState("");
  const [serpStep, setSerpStep] = useState(0); // 0: idle/typing, 1: reordering, 2: completed
  const targetQuery = "best performance marketing agency in noida";

  useEffect(() => {
    let timer: any;
    if (prefersReducedMotion) {
      setTypedQuery(targetQuery);
      setSerpStep(2);
      return;
    }

    // Phase 1: Type query
    let charIndex = 0;
    const typeInterval = setInterval(() => {
      if (charIndex < targetQuery.length) {
        setTypedQuery((prev) => prev + targetQuery.charAt(charIndex));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        // Phase 2: Start reordering after typing finishes
        timer = setTimeout(() => {
          setSerpStep(1);
          // Phase 3: Final state after 1.5s climb
          timer = setTimeout(() => {
            setSerpStep(2);
          }, 1800);
        }, 800);
      }
    }, 45);

    return () => {
      clearInterval(typeInterval);
      clearTimeout(timer);
    };
  }, [prefersReducedMotion]);

  // Restart SERP animation for playability
  const handleRestartSerp = () => {
    setTypedQuery("");
    setSerpStep(0);
    let charIndex = 0;
    const typeInterval = setInterval(() => {
      if (charIndex < targetQuery.length) {
        setTypedQuery((prev) => prev + targetQuery.charAt(charIndex));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          setSerpStep(1);
          setTimeout(() => {
            setSerpStep(2);
          }, 1800);
        }, 800);
      }
    }, 45);
  };

  // 3. What's Included vertical tabs state
  const [activeTab, setActiveTab] = useState("technical");
  const seoTabs: SeoTab[] = [
    {
      id: "technical",
      title: "Technical SEO Audit",
      description: "We identify and fix technical issues that may be preventing your website from ranking well in search engines. By improving your site's performance, speed, and crawlability, we help search engines understand your website better.",
      capabilities: [
        "Website Speed & Core Web Vitals Optimization",
        "XML Sitemap & Robots.txt Optimization",
        "Schema Markup for Rich Search Results",
        "Broken Links & Redirect Fixes",
        "Crawl Error Detection & Resolution",
        "Mobile-Friendly Performance Improvements"
      ],
      metric: "98/100",
      metricLabel: "Avg. Mobile Audit Speed",
      stageName: "Build a Strong Foundation for Better Rankings"
    },
    {
      id: "on-page",
      title: "On-Page Optimization",
      description: "We optimize your website's content and structure to help search engines understand your pages and encourage more people to click on your website.",
      capabilities: [
        "Meta Title & Description Optimization",
        "Heading Structure (H1–H6) Optimization",
        "Keyword Placement & Content Optimization",
        "Image Alt Text Optimization",
        "Internal Linking Strategy",
        "URL & Page Structure Improvements"
      ],
      metric: "+120%",
      metricLabel: "CTR Performance Lift",
      stageName: "Optimize Every Page for Better Rankings and More Clicks"
    },
    {
      id: "keyword",
      title: "Keyword Research & Strategy",
      description: "We research the keywords your customers are searching for, analyze your competitors, and build a strategy that helps your business attract qualified traffic and improve search rankings.",
      capabilities: [
        "Keyword Research Based on Search Intent",
        "Competitor Keyword Analysis",
        "High-Value Keyword Opportunities",
        "Long-Tail Keyword Strategy",
        "Content Planning for Better Rankings",
        "Keyword Mapping for Important Pages"
      ],
      metric: "1.4k+",
      metricLabel: "Transactional Terms Mapped",
      stageName: "Reach the Right Audience with the Right Keywords"
    },
    {
      id: "content",
      title: "Content Optimization",
      description: "We optimize your content to match what your audience is searching for, improve search rankings, and keep visitors engaged—helping turn more readers into customers.",
      capabilities: [
        "Search Intent & Content Optimization",
        "E-E-A-T Focused Content Structure",
        "Topic Cluster & Content Strategy",
        "Conversion-Focused Calls-to-Action (CTAs)",
        "Content Refresh & Performance Improvements",
        "Readability & User Experience Optimization"
      ],
      metric: "4m 12s",
      metricLabel: "Average Time-on-Page",
      stageName: "Create Content That Ranks and Converts"
    },
    {
      id: "link-building",
      title: "Link Building & Website Authority",
      description: "We help strengthen your website's authority by earning high-quality backlinks from trusted and relevant websites. This improves your search rankings and increases your online credibility.",
      capabilities: [
        "White-Hat Link Building",
        "Outreach to Relevant & Trusted Websites",
        "High-Quality Editorial Backlinks",
        "Anchor Text Optimization",
        "Backlink Profile Analysis",
        "Toxic Link Audit & Removal Recommendations"
      ],
      metric: "DA 70+",
      metricLabel: "Exclusive Partner Network",
      stageName: "Build Trust with High-Quality Backlinks"
    },
    {
      id: "local",
      title: "Local SEO & Google Business Profile",
      description: "We optimize your local online presence so customers can easily find your business in Google Search and Google Maps, helping you generate more calls, visits, and local leads.",
      capabilities: [
        "Google Business Profile Optimization",
        "Local Keyword Targeting",
        "Location-Specific Landing Pages",
        "Business Listings & NAP Consistency",
        "Customer Review Strategy",
        "Local Search Performance Monitoring"
      ],
      metric: "3.2x",
      metricLabel: "Map Pack Phone Calls Lift",
      stageName: "Get Found by Customers Near You"
    },
    {
      id: "analytics",
      title: "Analytics & Reporting",
      description: "We provide clear, easy-to-understand reports that show how your marketing is performing. Track traffic, rankings, leads, conversions, and revenue - all in one place.",
      capabilities: [
        "Google Analytics 4 Setup & Configuration",
        "Google Search Console Setup & Monitoring",
        "Keyword Ranking Tracking",
        "Traffic & Conversion Reports",
        "Lead & Revenue Performance Tracking"
       
      ],
      metric: "100%",
      metricLabel: "Attributed Revenue Reporting",
      stageName: "Track What Matters. Measure What Works."
    }
  ];

  // 4. Process Pipeline Scroll-Scrubbed Progress
  const [scrollProgress, setScrollProgress] = useState(0);
  const pipelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!pipelineRef.current) return;
      const rect = pipelineRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate scroll progress percentage relative to the process section
      const sectionHeight = rect.height;
      const elementTop = rect.top;
      
      // When the top enters the center of viewport to when bottom leaves the viewport
      const startTrigger = viewportHeight * 0.85;
      const endTrigger = viewportHeight * 0.25;
      
      let progress = (startTrigger - elementTop) / (sectionHeight + startTrigger - endTrigger);
      progress = Math.max(0, Math.min(progress, 1));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const pipelineSteps = [
    {
      num: "01",
      title: "Website Audit & Competitor Analysis",
      desc: "We review your website, identify SEO issues, and analyze your competitors to find opportunities that can improve your search performance.",
      status: "stage_01"
    },
    {
      num: "02",
      title: "Keyword Research & Strategy",
      desc: "We identify the keywords your customers are searching for and create a strategy to help your website attract more qualified traffic.",
      status: "stage_02"
    },
    {
      num: "03",
      title: "On-Page SEO Optimization",
      desc: "We optimize your website's content, page structure, metadata, and performance to improve search engine visibility and user experience.",
      status: "stage_03"
    },
    {
      num: "04",
      title: "Link Building & Authority Growth",
      desc: "We strengthen your website's credibility by earning high-quality backlinks and improving your online authority.",
      status: "stage_04"
    },
    {
      num: "05",
      title: "Monitor & Improve",
      desc: "SEO is an ongoing process. We track your website's performance, measure results, and continuously optimize your strategy to achieve long-term growth.",
      status: "stage_05"
    }
  ];

  // 5. Draggable/Scrubbable Traffic Growth Chart State
  const [activeChartClient, setActiveChartClient] = useState("fintech");
  const [scrubPercent, setScrubPercent] = useState(0.8); // Start at 80% progression
  const scrubberContainerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  // Growth Data Sets
  const clientDataMap: Record<string, {
    name: string;
    industry: string;
    timeline: { month: string; traffic: number; keywords: number; roas?: string; d_point: number }[]
  }> = {
    fintech: {
      name: "RupeeScale Fintech",
      industry: "Financial Services",
      timeline: [
        { month: "Month 1", traffic: 2400, keywords: 45, d_point: 100 },
        { month: "Month 2", traffic: 2900, keywords: 72, d_point: 110 },
        { month: "Month 3", traffic: 4100, keywords: 130, d_point: 140 },
        { month: "Month 4", traffic: 6800, keywords: 210, d_point: 190 },
        { month: "Month 5", traffic: 12400, keywords: 340, d_point: 280 },
        { month: "Month 6", traffic: 21800, keywords: 550, d_point: 380 },
        { month: "Month 7", traffic: 34500, keywords: 820, d_point: 510 },
        { month: "Month 8", traffic: 51200, keywords: 1200, d_point: 680 },
        { month: "Month 9", traffic: 73000, keywords: 1650, d_point: 850 },
        { month: "Month 10", traffic: 98400, keywords: 2200, d_point: 1000 }
      ]
    },
    ecommerce: {
      name: "UrbanGlow Apparel",
      industry: "D2C Fashion Retail",
      timeline: [
        { month: "Month 1", traffic: 8900, keywords: 110, d_point: 120 },
        { month: "Month 2", traffic: 9200, keywords: 145, d_point: 125 },
        { month: "Month 3", traffic: 13400, keywords: 260, d_point: 170 },
        { month: "Month 4", traffic: 19000, keywords: 480, d_point: 230 },
        { month: "Month 5", traffic: 28500, keywords: 710, d_point: 320 },
        { month: "Month 6", traffic: 42000, keywords: 1050, d_point: 460 },
        { month: "Month 7", traffic: 65000, keywords: 1540, d_point: 620 },
        { month: "Month 8", traffic: 98000, keywords: 2100, d_point: 800 },
        { month: "Month 9", traffic: 142000, keywords: 2850, d_point: 980 },
        { month: "Month 10", traffic: 184000, keywords: 3900, d_point: 1200 }
      ]
    },
    saas: {
      name: "ProSync Enterprise",
      industry: "B2B SaaS Platform",
      timeline: [
        { month: "Month 1", traffic: 1100, keywords: 30, d_point: 50 },
        { month: "Month 2", traffic: 1300, keywords: 55, d_point: 60 },
        { month: "Month 3", traffic: 1800, keywords: 90, d_point: 80 },
        { month: "Month 4", traffic: 3200, keywords: 160, d_point: 130 },
        { month: "Month 5", traffic: 5400, keywords: 280, d_point: 200 },
        { month: "Month 6", traffic: 8900, keywords: 410, d_point: 310 },
        { month: "Month 7", traffic: 13500, keywords: 680, d_point: 440 },
        { month: "Month 8", traffic: 21200, keywords: 990, d_point: 620 },
        { month: "Month 9", traffic: 32800, keywords: 1450, d_point: 840 },
        { month: "Month 10", traffic: 48500, keywords: 2100, d_point: 1100 }
      ]
    }
  };

  const selectedClientData = clientDataMap[activeChartClient];
  const maxDataIdx = selectedClientData.timeline.length - 1;
  const currentScrubIndex = Math.min(
    maxDataIdx,
    Math.max(0, Math.floor(scrubPercent * (maxDataIdx + 1)))
  );
  const currentDataPoint = selectedClientData.timeline[currentScrubIndex];

  // Drag logic for chart
  const handleScrubberMove = (clientX: number) => {
    if (!scrubberContainerRef.current) return;
    const rect = scrubberContainerRef.current.getBoundingClientRect();
    const positionX = clientX - rect.left;
    let newPercent = positionX / rect.width;
    newPercent = Math.max(0, Math.min(newPercent, 0.99));
    setScrubPercent(newPercent);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    handleScrubberMove(e.clientX);
    window.addEventListener("mousemove", handleMouseHoldMove);
    window.addEventListener("mouseup", handleMouseHoldUp);
  };

  const handleMouseHoldMove = (e: MouseEvent) => {
    if (!isDragging.current) return;
    handleScrubberMove(e.clientX);
  };

  const handleMouseHoldUp = () => {
    isDragging.current = false;
    window.removeEventListener("mousemove", handleMouseHoldMove);
    window.removeEventListener("mouseup", handleMouseHoldUp);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    handleScrubberMove(e.touches[0].clientX);
    window.addEventListener("touchmove", handleTouchHoldMove);
    window.addEventListener("touchend", handleTouchHoldEnd);
  };

  const handleTouchHoldMove = (e: TouchEvent) => {
    if (!isDragging.current) return;
    handleScrubberMove(e.touches[0].clientX);
  };

  const handleTouchHoldEnd = () => {
    isDragging.current = false;
    window.removeEventListener("touchmove", handleTouchHoldMove);
    window.removeEventListener("touchend", handleTouchHoldEnd);
  };

  // 9. FAQ State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const faqs = [
    {
      q: "How long until we start seeing real SEO ranking results?",
      a: "While code fixes and technical index corrections can yield minor crawl boosts within the first 14 days, substantial organic keyword leaps typically take 3 to 6 months of systematic content cluster scaling and white-hat domain authority backing. Organic growth is compounding: the results build slower but last permanently without ongoing ad spend."
    },
    {
      q: "Do you guarantee #1 rankings on Google?",
      a: "Any agency guaranteeing an exact #1 position for broad search terms is lying. Google's ranking algorithm updates continuously and factors in personalized search histories and geography. Instead, we guarantee rigorous white-hat methodology, comprehensive technical excellence, and transparent growth dashboards. We focus on ranking transaction-heavy intent terms that drive high-intent pipeline, not vanity traffic."
    },
    {
      q: "What is included in our monthly reporting?",
      a: "Every month, you receive a full multi-attribution dashboard tracking real business indicators: total organic sessions, transactional search term rankings, Google Search Console crawls, and exact attribution conversions (leads or sales). We review this with you on a direct growth call, detailing technical adjustments completed and next month's publishing pipeline."
    },
    {
      q: "Do you work with our existing website or rebuild it completely?",
      a: "We work with whatever performs best for your bottom-line. If your current stack is stable and fast, we will coordinate directly with your developer or write targeted fixes on your CMS (WordPress, Webflow, Shopify, etc.). However, if your speed score is under 40 and contains massive technical code bloat, we will propose an optimized visual build using Next.js/React to give you a structural head start."
    }
  ];

  return (
    <div className="pt-24 bg-white selection:bg-[#FE7146] selection:text-white">
      
      {/* SECTION 1: HERO - "The Climb" */}
      <section className="relative min-h-[90vh] flex items-center justify-center py-16 overflow-hidden bg-white border-b border-gray-100">
        {/* Subtle grid backdrop */}
        <div className="absolute inset-0 bg-[radial-gradient(#F5F5FA_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-75"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#FFF1EC]/50 blur-3xl -translate-y-1/3 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-[#F5F5FA]/80 blur-3xl translate-y-1/3 -translate-x-1/3"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-5 text-left space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFF1EC] border border-[#FE7146]/20 rounded-full">
                
                <span className="text-[12px] sm:text-xs font-mono font-black tracking-widest text-[#FE7146] uppercase">
                SEARCH ENGINE OPTIMIZATION
                </span>
              </div>

              <h1 className="font-display font-black text-4xl sm:text-5xl text-[#303360] tracking-tight leading-[1.1]">
                Be the <span className="text-[#FE7146] inline-flex items-center">
                  First
                  <ArrowUp className="w-8 h-8 sm:w-10 sm:h-10 ml-1 text-[#FE7146]" />
                  <span className="text-[#303360]">.</span>
                </span><br />
                Choice in Search.
              </h1>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal max-w-xl">
                From technical SEO and content strategy to high-quality backlinks, we help your business rank higher, reach the right audience, and grow organically.

              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                <button
                  onClick={() => navigate.push('/contact')}
                  className="w-full sm:w-auto bg-[#FE7146] hover:bg-[#FE7146]/95 text-white font-black text-sm px-8 py-4 rounded-xl shadow-lg shadow-[#FE7146]/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Get a Free SEO Audit</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                
              </div>
            </div>

            {/* Hero Right: SEO Dashboard Image */}
            <div className="lg:col-span-7 flex justify-center w-full">
              <div className="w-full relative">
                {/* Soft ambient glow behind the visual */}
                <div className="absolute -inset-3 bg-gradient-to-tr from-[#FE7146]/15 via-transparent to-indigo-400/10 rounded-[2rem] blur-2xl pointer-events-none" />
                <img
                  src="https://res.cloudinary.com/dqjlffxja/image/upload/f_auto,q_auto/v1783789168/seo-hero_skm8fk.jpg"
                  alt="Analytics Clouds SEO dashboard showing organic growth performance"
                  className="relative w-full h-auto rounded-3xl shadow-2xl border border-gray-100 bg-white"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: THE CRAFT STATEMENT (Breather section) */}
      <section className="py-28 bg-white overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          {/* Subtle quote icon backdrop */}
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[180px] font-serif font-black text-slate-50 select-none pointer-events-none -z-10 opacity-60">
            “
          </span>
          
          <blockquote className="space-y-6">
            <p className="font-display font-bold text-2xl sm:text-4xl text-[#303360] leading-relaxed tracking-tight max-w-3xl mx-auto">
              "Traffic that 
<span className="text-[#FE7146] underline decoration-dashed decoration-2 underline-offset-8"> converts is better</span> than traffic that just visits."
            </p>
            <cite className="block font-mono text-xs sm:text-sm font-bold text-slate-400 tracking-wider uppercase">
              — ANALYTICS CLOUDS SEO PHILOSOPHY
            </cite>
          </blockquote>
        </div>
      </section>

      {/* SECTION 3: WHAT'S INCLUDED (Interactive tab/showcase) */}
      <section className="py-24 bg-[#F5F5FA]/50 border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xm font-mono font-black text-[#FE7146] tracking-widest uppercase">
              COMPLETE STACK
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-[#303360] leading-tight tracking-tight">
              What's Included in Our <span className="text-[#FE7146]">SEO Engine</span>
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              Everything you need to improve your search rankings, attract the right audience, and grow your organic traffic from technical SEO and keyword research to content optimization and quality link building. 
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Vertical Tab List */}
            <div className="lg:col-span-4 space-y-2">
              {seoTabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    onMouseEnter={() => !prefersReducedMotion && setActiveTab(tab.id)}
                    className={`w-full text-left p-4 rounded-2xl transition-all flex items-center justify-between border cursor-pointer ${
                      isActive
                        ? "bg-white border-[#FE7146] text-[#303360] shadow-md shadow-[#FE7146]/5"
                        : "bg-transparent border-transparent text-slate-500 hover:bg-white hover:border-gray-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono text-xs font-black transition-colors ${
                        isActive ? "bg-[#FFF1EC] text-[#FE7146]" : "bg-slate-100 text-slate-400"
                      }`}>
                        {tab.id === "technical" && <Database size={14} />}
                        {tab.id === "on-page" && <Sparkles size={14} />}
                        {tab.id === "keyword" && <Search size={14} />}
                        {tab.id === "content" && <FileSpreadsheet size={14} />}
                        {tab.id === "link-building" && <Globe size={14} />}
                        {tab.id === "local" && <Clock size={14} />}
                        {tab.id === "analytics" && <Activity size={14} />}
                      </div>
                      <span className="text-sm font-extrabold tracking-tight">
                        {tab.title}
                      </span>
                    </div>
                    <ChevronRight size={16} className={`text-[#FE7146] transition-transform ${isActive ? "translate-x-1" : "opacity-0"}`} />
                  </button>
                );
              })}
            </div>

            {/* Right Tab Content Panel */}
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                {seoTabs.map((tab) => {
                  if (tab.id !== activeTab) return null;
                  return (
                    <motion.div
                      key={tab.id}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -12 }}
                      transition={{ duration: 0.22 }}
                      className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xl space-y-6 text-left"
                    >
                      {/* Segment header */}
                      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-4">
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono font-black text-slate-400 tracking-wider">
                            {tab.stageName}
                          </span>
                          <h3 className="font-display font-extrabold text-2xl text-[#303360]">
                            {tab.title}
                          </h3>
                        </div>

                      
                      </div>

                      <p className="text-slate-600 text-sm leading-relaxed font-normal">
                        {tab.description}
                      </p>

                      {/* Bullet Capabilities list */}
                      <div className="space-y-3 pt-2">
                        <span className="text-xs font-mono font-black text-[#303360] tracking-wide uppercase block">
                          SYSTEM DELIVERABLES:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {tab.capabilities.map((cap, capIdx) => (
                            <div key={capIdx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-gray-100 text-xs text-slate-600">
                              <CheckCircle2 className="w-4 h-4 text-[#FE7146] shrink-0 mt-0.5" />
                              <span className="font-medium leading-tight">{cap}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 4: OUR PROCESS - Animated Growth Pipeline */}
      <section ref={pipelineRef} className="py-24 bg-white overflow-hidden border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xm font-mono font-black text-[#FE7146] tracking-widest uppercase">
              RIGOROUS FLOW
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-[#303360] leading-tight tracking-tight">
              Our Structured <span className="text-[#FE7146]">SEO Pipeline</span>
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              We follow a structured SEO process, making improvements step by step to help your website achieve better search rankings and long-term growth. 

            </p>
          </div>

          {/* Horizontal / Vertical Pipeline timeline */}
          <div className="relative pt-6">
            
            {/* Background line */}
            <div className="absolute top-[36px] left-0 w-full h-[3px] bg-slate-100 hidden lg:block"></div>

            {/* Scroll Scrubbed Active Progress Line */}
            <div
              className="absolute top-[36px] left-0 h-[3px] bg-[#FE7146] transition-all duration-150 hidden lg:block"
              style={{ width: `${scrollProgress * 100}%` }}
            ></div>

            {/* Steps Container */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 relative z-10">
              {pipelineSteps.map((step, idx) => {
                // Determine step activation state based on progress percent
                const stepThreshold = idx / (pipelineSteps.length - 1);
                const isStepActive = scrollProgress >= stepThreshold || prefersReducedMotion;

                return (
                  <div key={idx} className="group text-left space-y-4">
                    
                    {/* Circle Node indicator */}
                    <div className="flex items-center gap-3 lg:block">
                      <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isStepActive
                          ? "bg-[#FE7146] text-white ring-4 ring-[#FE7146]/20 shadow-lg shadow-[#FE7146]/10"
                          : "bg-slate-100 text-slate-400 group-hover:bg-slate-200"
                      }`}>
                        <span className="font-mono font-black text-base">{step.num}</span>
                      </div>

                      {/* Connecting Line for mobile views */}
                      <div className="h-[2px] bg-slate-100 flex-grow lg:hidden"></div>
                    </div>

                    {/* Step Content */}
                    <div className="space-y-2 pt-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] font-mono font-bold text-slate-400">
                          {step.status}
                        </span>
                        {isStepActive && (
                          <span className="text-[9px] font-mono font-bold text-[#FE7146]">
                            ACTIVE
                          </span>
                        )}
                      </div>
                      <h4 className="font-display font-extrabold text-base text-[#303360] leading-tight group-hover:text-[#FE7146] transition-colors">
                        {step.title}
                      </h4>
                      <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-normal">
                        {step.desc}
                      </p>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      

      {/* SECTION 6: KEYWORD RANKING SHOWCASE (Before -> After comparisons) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xm font-mono font-black text-[#FE7146] tracking-widest uppercase">
              INDEX AUDITS
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-[#303360] leading-tight tracking-tight">
              Real Keyword <span className="text-[#FE7146]">Climbs</span>
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              We target high-volume transaction intent keywords. Here is a handful of real positions claimed for our Noida/international clients.
            </p>
          </div>

          <div className="max-w-3xl mx-auto bg-white border border-gray-100 rounded-3xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left font-sans border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-gray-100 font-mono text-[10px] sm:text-xs text-slate-400 font-black tracking-wider uppercase">
                    <th className="p-4 sm:p-5">KEYWORD PHRASE</th>
                    <th className="p-4 sm:p-5">START POSITION</th>
                    <th className="p-4 sm:p-5 text-center">CLIMB</th>
                    <th className="p-4 sm:p-5">END POSITION</th>
                    
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100/60 text-xs sm:text-sm font-semibold text-[#303360]">
                  {[
                    { phrase: "best performance marketing agency in noida", start: "POS #24", end: "POS #1", climb: "▲ +23", vol: "2,400/mo" },
                    { phrase: "no-code web design noida", start: "POS #45", end: "POS #2", climb: "▲ +43", vol: "850/mo" },
                    { phrase: "fintech billing software scale", start: "POS #84", end: "POS #3", climb: "▲ +81", vol: "3,100/mo" },
                    { phrase: "luxury apparel direct marketing", start: "POS #19", end: "POS #1", climb: "▲ +18", vol: "1,200/mo" },
                    { phrase: "b2b real-time attribution platforms", start: "POS #62", end: "POS #2", climb: "▲ +60", vol: "950/mo" }
                  ].map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-[#FFF1EC]/20 transition-all">
                      <td className="p-4 sm:p-5 font-bold">{row.phrase}</td>
                      <td className="p-4 sm:p-5 text-slate-400 font-normal">{row.start}</td>
                      <td className="p-4 sm:p-5 text-center">
                        <span className="px-2 py-0.5 rounded-md bg-green-50 text-green-600 font-mono text-[10px] font-black inline-block">
                          {row.climb}
                        </span>
                      </td>
                      <td className="p-4 sm:p-5 text-[#FE7146] font-mono font-black text-sm">{row.end}</td>
                      
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </section>

    

      

      

      {/* SECTION 10: CTA BANNER */}
      <section id="elevated-cta">
        <CtaBanner  />
      </section>

    </div>
  );
}
