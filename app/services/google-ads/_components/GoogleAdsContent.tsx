"use client";

import { useRouter } from "next/navigation";
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  TrendingUp,
  ArrowRight,
  ArrowDown,
  ArrowUp,
  Check,
  ChevronDown,
  ChevronRight,
  Sparkles,
  Award,
  Users,
  ShieldCheck,
  Clock,
  Target,
  BarChart3,
  MousePointerClick,
  CheckCircle2,
  Copy,
  Zap,
  Percent,
  Search,
  MessageSquare,
  BadgeAlert,
  HelpCircle
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
interface AdsTab {
  id: string;
  title: string;
  description: string;
  capabilities: string[];
  metric: string;
  metricLabel: string;
  stageName: string;
}

export function GoogleAds() {
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

  // 1. Hero Search-Ads Auction Animation State
  const [auctionStep, setAuctionStep] = useState(0); // 0: initial (low Quality Score, high CPC, lower pos), 1: transitioning, 2: completed (9/10, lower CPC, pos #1)
  
  useEffect(() => {
    if (prefersReducedMotion) {
      setAuctionStep(2);
      return;
    }

    const timer1 = setTimeout(() => {
      setAuctionStep(1);
      const timer2 = setTimeout(() => {
        setAuctionStep(2);
      }, 1500);
      return () => clearTimeout(timer2);
    }, 1200);

    return () => clearTimeout(timer1);
  }, [prefersReducedMotion]);

  const handleReplayAuction = () => {
    setAuctionStep(0);
    setTimeout(() => {
      setAuctionStep(1);
      setTimeout(() => {
        setAuctionStep(2);
      }, 1500);
    }, 400);
  };

  // 3. What's Included vertical tabs state
  const [activeTab, setActiveTab] = useState("strategy");
  const adsTabs: AdsTab[] = [
  {
    id: "strategy",
    title: "Campaign Strategy & Structure",
    description: "A successful Google Ads campaign starts with the right strategy. We organize your campaigns, keywords, and budgets to improve ad relevance, reach the right audience, and make every advertising dollar work harder.",
    capabilities: [
      "Google Ads Strategy & Planning",
      "Campaign & Ad Group Structure",
      "Competitor Analysis",
      "Budget Allocation",
      "Bid Strategy Setup",
      "Ongoing Campaign Optimization"
    ],
    metric: "100%",
    metricLabel: "Structured Ad Groups Alignment",
    stageName: "Build Campaigns That Deliver Better Results"
  },
  {
    id: "keyword",
    title: "Keyword Research & Targeting",
    description: "The right keywords connect your business with people who are actively searching for your products or services. We research high-intent keywords, organize them effectively, and continuously refine your targeting to improve campaign performance.",
    capabilities: [
      "Keyword Research & Analysis",
      "High-Intent Keyword Selection",
      "Match Type Optimization",
      "Negative Keyword Management",
      "Long-Tail Keyword Targeting",
      "Ongoing Search Query Optimization"
    ],
    metric: "94%",
    metricLabel: "Intent Term Purity Score",
    stageName: "Reach Customers with the Right Search Terms"
  },
  {
    id: "copy",
    title: "Ad Copy & Creative Testing",
    description: "The right message can make all the difference. We write compelling ad copy and continuously test headlines, descriptions, and creative elements to improve click-through rates and drive more conversions.",
    capabilities: [
      "Ad Copywriting",
      "Responsive Search Ad (RSA) Setup",
      "Headline & Description Testing",
      "Call-to-Action (CTA) Optimization",
      "Ad Extensions & Sitelinks",
      "Continuous Creative Optimization"
    ],
    metric: "1.4x",
    metricLabel: "Benchmark CTR Multiplier",
    stageName: "Create Ads That Get More Clicks"
  },
  {
    id: "bid",
    title: "Bid Strategy & Budget Management",
    description: "Managing your budget effectively is key to a successful Google Ads campaign. We continuously optimize bids and budgets to help you get the best possible results while reducing unnecessary ad spend.",
    capabilities: [
      "Smart Bid Strategy Setup",
      "Budget Planning & Allocation",
      "Bid Optimization",
      "Location & Time-Based Bid Adjustments",
      "Cost Control & Spend Monitoring",
      "Ongoing Campaign Optimization"
    ],
    metric: "24/7",
    metricLabel: "Pacing & Bid Monitoring",
    stageName: "Make Every Advertising Dollar Count"
  },
  {
    id: "landing",
    title: "Landing Page Optimization",
    description: "A great ad deserves a great landing page. We create fast, user-friendly landing pages that match your ads, deliver a seamless experience, and encourage visitors to take action.",
    capabilities: [
      "Custom Landing Page Design",
      "Ad-to-Page Message Alignment",
      "Mobile-Friendly Optimization",
      "Fast Page Speed",
      "Form & Call-to-Action (CTA) Optimization",
      "Conversion Rate Improvements"
    ],
    metric: "+42%",
    metricLabel: "Average Conversion Rate Jump",
    stageName: "Turn More Visitors into Customers"
  },
  {
    id: "tracking",
    title: "Conversion Tracking & Analytics",
    description: "Accurate tracking helps you understand what's working and where your marketing budget is delivering results. We set up reliable conversion tracking so every lead, sale, and important customer action is measured correctly.",
    capabilities: [
      "Google Ads Conversion Tracking",
      "Google Tag Manager Setup",
      "Google Analytics 4 (GA4) Integration",
      "Lead & Sales Tracking",
      "Event & Goal Configuration",
      "Performance Reporting"
    ],
    metric: "100%",
    metricLabel: "Accurate Conversion Attribution",
    stageName: "Track Every Lead and Conversion"
  },
  {
    id: "reporting",
    title: "Reporting & Optimization Sprints",
    description: "Completely transparent dashboards detailing actual conversions, cost-per-lead, cost-per-sale, and attributed brand lift.",
    capabilities: [
      "Looker Studio Real-Time Spend Feeds",
      "Bi-weekly Performance Optimization Sprints",
      "True ROI & Margin Revenue Breakdown",
      "Competitor Domain Bid Countermeasures"
    ],
    metric: "Zero",
    metricLabel: "Hidden Agency Markup Fees",
    stageName: "performance_review"
  }
];

  // 4. Process Pipeline scroll progress
  const [scrollProgress, setScrollProgress] = useState(0);
  const pipelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!pipelineRef.current) return;
      const rect = pipelineRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      const sectionHeight = rect.height;
      const elementTop = rect.top;
      
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
    title: "Account Audit & Research",
    desc: "We review your existing Google Ads account, analyze past performance, identify opportunities for improvement, and study your competitors to build a stronger strategy.",
    status: "stage_01"
  },
  {
    num: "02",
    title: "Campaign Setup",
    desc: "We create well-organized campaigns with the right keywords, ad groups, and ad copy to help your ads reach the right audience.",
    status: "stage_02"
  },
  {
    num: "03",
    title: "Landing Page Optimization",
    desc: "We align your landing pages with your ads to create a better user experience, improve conversions, and get more value from your ad spend.",
    status: "stage_03"
  },
  {
    num: "04",
    title: "Launch & Optimization",
    desc: "We launch your campaigns, set up conversion tracking, monitor performance, and make ongoing adjustments to improve results.",
    status: "stage_04"
  },
  {
    num: "05",
    title: "Scale & Improve",
    desc: "As your campaigns perform well, we increase your reach, test new ad creatives, and expand to additional Google advertising channels to drive more growth.",
    status: "stage_05"
  }
];

  // 5. Ad Copy Split-Test Showcase & Draggable Spend Chart
  const [activeAdSplit, setActiveAdSplit] = useState<"A" | "B">("A");
  const [scrubPercent, setScrubPercent] = useState(0.7); // 70% progress initially
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  // Spend Timeline Data
  const spendData = [
    { month: "Month 1", spend: 80000, clicks: 1400, conversions: 24, qs: 5, cpc: 57, d_point: 80 },
    { month: "Month 2", spend: 95000, clicks: 1850, conversions: 38, qs: 6, cpc: 51, d_point: 120 },
    { month: "Month 3", spend: 120000, clicks: 2600, conversions: 65, qs: 7, cpc: 46, d_point: 200 },
    { month: "Month 4", spend: 150000, clicks: 3900, conversions: 110, qs: 8, cpc: 38, d_point: 320 },
    { month: "Month 5", spend: 180000, clicks: 5400, conversions: 168, qs: 9, cpc: 33, d_point: 480 },
    { month: "Month 6", spend: 220000, clicks: 7100, conversions: 240, qs: 9, cpc: 31, d_point: 680 },
    { month: "Month 7", spend: 280000, clicks: 9500, conversions: 352, qs: 9, cpc: 29, d_point: 920 },
    { month: "Month 8", spend: 350000, clicks: 12800, conversions: 510, qs: 10, cpc: 27, d_point: 1200 }
  ];

  const maxDataIdx = spendData.length - 1;
  const currentScrubIndex = Math.min(
    maxDataIdx,
    Math.max(0, Math.floor(scrubPercent * (maxDataIdx + 1)))
  );
  const activeSpendPoint = spendData[currentScrubIndex];

  // Drag handlers
  const handleScrubberMove = (clientX: number) => {
    if (!chartContainerRef.current) return;
    const rect = chartContainerRef.current.getBoundingClientRect();
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

  // 6. Quality Score meters state (simulate on-scroll fill)
  const [qsProgress, setQsProgress] = useState(0);
  const qsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleQsScroll = () => {
      if (!qsRef.current) return;
      const rect = qsRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      if (rect.top <= viewportHeight * 0.85) {
        setQsProgress(1);
      }
    };
    window.addEventListener("scroll", handleQsScroll);
    handleQsScroll(); // check once immediately
    return () => window.removeEventListener("scroll", handleQsScroll);
  }, []);

  // 9. FAQ State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const faqs = [
    {
      q: "What is the recommended minimum ad budget for Google Ads?",
      a: "While Google has no strict minimums, we generally recommend starting with at least ₹45,000 to ₹60,000 per month. This allows us to capture enough click volume and conversion data within the first 30 days to train bidding algorithms and feed statistically relevant optimization cycles."
    },
    {
      q: "How does Analytics Clouds improve Quality Score?",
      a: "Quality Score is Google's rating of the relevance of your keywords, ad copy, and landing pages. We improve it by structuring campaigns into laser-focused thematic groups (STAGs) so that ads perfectly match search terms, rewriting ad headlines for higher expected CTR, and building custom, lightning-fast landing pages with synched hero headlines."
    },
    {
      q: "Do you manage Search, Display, and Shopping ads?",
      a: "Yes. Our team is fully Google Certified across the entire Google Ads network. We run high-intent Search and Shopping Campaigns, dynamic remarketing Display Ads, Performance Max (PMax) automation, and YouTube Video Campaigns to capture prospects at every stage of the funnel."
    },
    {
      q: "How soon will my business start seeing lead/sales results?",
      a: "Unlike SEO, Google Ads delivers instant traffic. Once campaigns are configured, approved, and launched, your ads will start displaying in search results immediately. Substantial conversions generally begin tracking on day one, and we refine bidding cost-efficiencies further over the first 2 to 4 weeks."
    }
  ];

  return (
    <div className="pt-24 bg-white selection:bg-[#FE7146] selection:text-white">
      
      {/* SECTION 1: HERO - "The Auction" */}
      <section className="relative min-h-[90vh] flex items-center justify-center py-16 overflow-hidden bg-white border-b border-gray-100">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#F5F5FA_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-75"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#FFF1EC]/50 blur-3xl -translate-y-1/3 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-[#F5F5FA]/80 blur-3xl translate-y-1/3 -translate-x-1/3"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Hero Left Info */}
            <div className="lg:col-span-5 text-left space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFF1EC] border border-[#FE7146]/20 rounded-full">
                
                <span className="text-[13px] sm:text-xm font-mono font-black tracking-widest text-[#FE7146] uppercase">
                  GOOGLE ADS STRATEGY
                </span>
              </div>

              <h1 className="font-display font-black text-4xl sm:text-5xl text-[#303360] tracking-tight leading-[1.1]">
                Reach Customers <br /><span className="text-[#FE7146]">Who Are Ready to Buy.</span>
              </h1>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal max-w-xl">
                Google Ads puts your business in front of people actively searching for your products or services. We create high-performing campaigns that drive qualified traffic, generate quality leads, and maximize your return on ad spend.

              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                <button
                  onClick={() => navigate.push('/contact')}
                  className="w-full sm:w-auto bg-[#FE7146] hover:bg-[#FE7146]/95 text-white font-black text-sm px-8 py-4 rounded-xl shadow-lg shadow-[#FE7146]/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Get a Free Ads Audit</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                
              </div>
            </div>

            {/* Hero Right: Google Ads Dashboard Image */}
            <div className="lg:col-span-7 flex justify-center w-full">
              <div className="w-full relative">
                {/* Soft ambient glow behind the visual */}
                <div className="absolute -inset-3 bg-gradient-to-tr from-[#FE7146]/15 via-transparent to-indigo-400/10 rounded-[2rem] blur-2xl pointer-events-none" />
                <img
                  src="https://res.cloudinary.com/dqjlffxja/image/upload/f_auto,q_auto/v1783790035/google-ads_dgueeu.jpg"
                  alt="Google Ads campaign performance dashboard"
                  className="relative w-full h-auto rounded-3xl shadow-2xl border border-gray-100 bg-white"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: THE CRAFT STATEMENT */}
      <section className="py-28 bg-white overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[180px] font-serif font-black text-slate-50 select-none pointer-events-none -z-10 opacity-60">
            “
          </span>
          <blockquote className="space-y-6">
            <p className="font-display font-bold text-2xl sm:text-4xl text-[#303360] leading-relaxed tracking-tight max-w-3xl mx-auto">
              "The highest bidder doesn't always win. <span className="text-[#FE7146] underline decoration-dashed decoration-2 underline-offset-8">The most relevant one does.</span>"
            </p>
            <cite className="block font-mono text-xs sm:text-sm font-bold text-slate-400 tracking-wider uppercase">
              — ANALYTICS CLOUDS GOOGLE ADS CREDO
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
              Everything You <span className="text-[#FE7146]">Google Ads Campaign Needs </span>
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              We manage every aspect of your Google Ads campaigns from keyword research and ad creation to bidding, landing page optimization, and performance tracking, so you get more qualified leads and better returns on your advertising budget. 
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Vertical Tab List */}
            <div className="lg:col-span-4 space-y-2">
              {adsTabs.map((tab) => {
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
                        {tab.id === "strategy" && <Target size={14} />}
                        {tab.id === "keyword" && <Search size={14} />}
                        {tab.id === "copy" && <Copy size={14} />}
                        {tab.id === "bid" && <Zap size={14} />}
                        {tab.id === "landing" && <Sparkles size={14} />}
                        {tab.id === "tracking" && <Percent size={14} />}
                        {tab.id === "reporting" && <BarChart3 size={14} />}
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
                {adsTabs.map((tab) => {
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

                      {/* Capabilities */}
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

      {/* SECTION 4: PROCESS - Animated Optimization Pipeline */}
      <section ref={pipelineRef} className="py-24 bg-white overflow-hidden border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xm font-mono font-black text-[#FE7146] tracking-widest uppercase">
              METHODICAL RIGOR
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-[#303360] leading-tight tracking-tight">
              Our Ad Campaign <span className="text-[#FE7146]">Optimization Loop</span>
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              We never launch and set-and-forget. We run continuous daily bid adjustments and dynamic search query cleanups to maximize margin growth.
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
                const stepThreshold = idx / (pipelineSteps.length - 1);
                const isStepActive = scrollProgress >= stepThreshold || prefersReducedMotion;

                return (
                  <div key={idx} className="group text-left space-y-4">
                    
                    {/* Circle Node */}
                    <div className="flex items-center gap-3 lg:block">
                      <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isStepActive
                          ? "bg-[#FE7146] text-white ring-4 ring-[#FE7146]/20 shadow-lg shadow-[#FE7146]/10"
                          : "bg-slate-100 text-slate-400 group-hover:bg-slate-200"
                      }`}>
                        <span className="font-mono font-black text-base">{step.num}</span>
                      </div>

                      {/* Connecting Line for mobile */}
                      <div className="h-[2px] bg-slate-100 flex-grow lg:hidden"></div>
                    </div>

                    {/* Content */}
                    <div className="space-y-2 pt-2">
                      <div className="flex justify-between items-center">
                        
                        {isStepActive && (
                          <span className="text-[9px] font-mono font-bold text-[#FE7146]">
                           
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

      

      {/* SECTION 6: QUALITY SCORE EXPLAINER (Meters fill in on scroll) */}
      <section ref={qsRef} className="py-24 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-xm font-mono font-black text-[#FE7146] tracking-widest uppercase">
              RELEVANCE BLUEPRINT
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-[#303360] leading-tight tracking-tight">
              Anatomy of the <span className="text-[#FE7146]">Quality Score</span>
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              Google ranks paid search results based on Ad Relevance, Landing Page integrity, and expected CTR. Higher scores mean cheaper, better placements.
            </p>
          </div>

          <div className="bg-[#303360] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-white/10 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#FE7146]/20 border border-[#FE7146]/30 flex items-center justify-center">
                <Sparkles size={16} className="text-[#FE7146]" />
              </div>
              <h3 className="font-display font-black text-lg text-white">
                How We Boost Quality Scores
              </h3>
            </div>

            <div className="space-y-6">
              {[
                {
                  label: "Ad Relevance Alignment",
                  percentage: "95%",
                  desc: "Aligning ad titles perfectly to matching intent clusters to maximize copy alignment.",
                  color: "bg-[#FE7146]"
                },
                {
                  label: "Landing Page Speed & Relevance",
                  percentage: "90%",
                  desc: "Building custom React landing pages with ultra-fast loads to drop bounce rates below 30%.",
                  color: "bg-[#FE7146]"
                },
                {
                  label: "Expected Click-Through Rate (CTR)",
                  percentage: "85%",
                  desc: "Continuous headline split testing to optimize CTR indices above standard benchmarks.",
                  color: "bg-[#FE7146]"
                }
              ].map((meter, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold">
                    <span className="text-slate-200">{meter.label}</span>
                    <span className="font-mono text-[#FE7146] font-black">{meter.percentage}</span>
                  </div>
                  
                  {/* Outer bar */}
                  <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full ${meter.color}`}
                      initial={{ width: "0%" }}
                      animate={{ width: qsProgress ? meter.percentage : "0%" }}
                      transition={{ duration: 1.2, ease: "easeOut", delay: idx * 0.15 }}
                    ></motion.div>
                  </div>

                  <p className="text-slate-400 text-xs leading-normal">
                    {meter.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      


      

      {/* SECTION 10: SHARED CTA BANNER */}
      <CtaBanner  />

    </div>
  );
}
