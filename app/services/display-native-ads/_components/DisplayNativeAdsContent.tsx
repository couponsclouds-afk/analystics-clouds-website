/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Tv,
  ArrowRight,
  Check,
  ChevronDown,
  ChevronRight,
  Sparkles,
  Users,
  Clock,
  Percent,
  Search,
  HelpCircle,
  TrendingUp,
  Layers,
  Sparkle,
  Gauge,
  Workflow,
  CheckCircle2,
  AlertTriangle,
  Smartphone,
  ShieldCheck,
  Flame,
  ArrowUpRight,
  Eye,
  MousePointerClick,
  Monitor,
  Target,
  RefreshCw,
  Award,
  Lock,
  Compass,
  FileText
} from "lucide-react";

// CountUp component triggered by intersection observer
interface CountUpProps {
  end: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  duration?: number;
}

function CountUp({ end, suffix = "", prefix = "", decimals = 0, duration = 1200 }: CountUpProps) {
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
            const currentVal = progress * end;
            setCount(currentVal);
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
      {prefix}
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
}

// Interfaces for What's Included vertical tabs
interface ServiceTab {
  id: string;
  title: string;
  description: string;
  capabilities: string[];
  metric: string;
  metricLabel: string;
  channelTag: string;
}

import { useRouter } from "next/navigation";

export function DisplayNativeAds() {
  const navigate = useRouter();
  // Motion settings for reduced motion accessibility
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  // 1. HERO "Constellation Reach Map" state
  const [activeFrameIndex, setActiveFrameIndex] = useState(0);
  const [impressionsCount, setImpressionsCount] = useState(1842900);

  useEffect(() => {
    // Increment the active frame spotlight in sequence
    const intervalFrame = setInterval(() => {
      setActiveFrameIndex((prev) => (prev + 1) % 5);
    }, 1800);

    // Slowly increment the live impressions tracker
    const intervalImpressions = setInterval(() => {
      setImpressionsCount((prev) => prev + Math.floor(Math.random() * 8) + 1);
    }, 120);

    return () => {
      clearInterval(intervalFrame);
      clearInterval(intervalImpressions);
    };
  }, []);

  // 3. DISPLAY VS NATIVE TOGGLE Mode
  const [adFormatMode, setAdFormatMode] = useState<"display" | "native">("display");

  // 4. WHAT'S INCLUDED Tab list
  const [activeTab, setActiveTab] = useState("targeting");
  const serviceTabs: ServiceTab[] = [
  {
    id: "targeting",
    title: "Audience Research & Targeting",
    description: "Successful campaigns start with the right audience. We research customer behavior, interests, and online activity to ensure your ads reach people who are most likely to engage with your brand and take action.",
    capabilities: [
      "Audience Research & Analysis",
      "Interest & Behavior-Based Targeting",
      "Custom Audience Creation",
      "Location & Demographic Targeting",
      "Keyword & Contextual Targeting",
      "Ongoing Audience Optimization"
    ],
    metric: "94.2%",
    metricLabel: "Audience Target Match",
    channelTag: "Reach the People Most Likely to Convert"
  },
  {
    id: "display",
    title: "Display Ad Creative Design",
    description: "Great design makes people stop, notice, and take action. We create eye-catching display ads that reflect your brand, engage your audience, and encourage more clicks and conversions.",
    capabilities: [
      "Custom Display Banner Design",
      "Responsive Ad Creatives",
      "Animated Display Ads",
      "Brand-Aligned Visual Design",
      "High-Converting Call-to-Action (CTA) Design",
      "Creative Testing & Optimization"
    ],
    metric: "4.2x",
    metricLabel: "Average CTR Lift vs Static",
    channelTag: "Design Ads That Capture Attention"
  },
  {
    id: "native",
    title: "Native Advertising",
    description: "Native ads are designed to match the look and feel of the platform they appear on, making them feel more natural and engaging. We create high-quality sponsored content that attracts attention, builds trust, and encourages users to take action.",
    capabilities: [
      "Native Ad Strategy",
      "Sponsored Content Creation",
      "Platform-Specific Ad Formatting",
      "Content Discovery Campaigns",
      "Creative & Copy Optimization",
      "Campaign Performance Monitoring"
    ],
    metric: "+82%",
    metricLabel: "Higher Reader Engagement",
    channelTag: "Ads That Blend In and Get Noticed"
  },
  {
    id: "buying",
    title: "Programmatic Advertising",
    description: "Programmatic advertising uses smart technology to place your ads where they'll have the greatest impact. We manage your campaigns across trusted advertising networks to help you reach the right audience, maximize your budget, and improve campaign performance.",
    capabilities: [
      "Programmatic Campaign Setup",
      "Audience & Placement Targeting",
      "Real-Time Bid Management",
      "Premium Publisher Access",
      "Brand Safety Controls",
      "Performance Monitoring & Optimization"
    ],
    metric: "0.08s",
    metricLabel: "Average Bid Clearance Time",
    channelTag: "Reach the Right Audience at the Right Time"
  },
  {
    id: "retargeting",
    title: "Retargeting & Remarketing",
    description: "Stay in front of high-value shoppers. We engineer dynamic product display carousels that remind abandoners exactly what they left behind in their cart.",
    capabilities: [
      "Dynamic Product Feed Sync (DPA)",
      "Staggered Lifetime Frequency Curves",
      "Cross-Device Device Graph Pairing",
      "Loyalty Retention Reactivation Loops"
    ],
    metric: "6.1x",
    metricLabel: "Remarketing ROAS Average",
    channelTag: "recapture_funnel"
  },
  {
    id: "reporting",
    title: "Performance Reporting",
    description: "Know exactly how your advertising campaigns are performing with clear, transparent reports. We monitor the metrics that matter, helping you understand what's working, where your budget is going, and how your campaigns contribute to business growth.",
    capabilities: [
      "Campaign Performance Reports",
      "Impressions, Clicks & Conversion Tracking",
      "ROI & Advertising Spend Analysis",
      "Custom Performance Dashboards",
      "Multi-Channel Performance Insights",
      "Ongoing Reporting & Recommendations"
    ],
    metric: "100%",
    metricLabel: "Data Attribution Transparency",
    channelTag: "Track Every Campaign with Confidence"
  }
];

  // 5. PROCESS PIPELINE Scroll Scrubbed State
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
    title: "Research & Audience Planning",
    desc: "We identify your target audience, understand their online behavior, and choose the best platforms and placements for your campaigns.",
    status: "network_mapping"
  },
  {
    num: "02",
    title: "Creative Design",
    desc: "We create engaging display banners and native ads that reflect your brand, capture attention, and encourage users to take action.",
    status: "asset_engineering"
  },
  {
    num: "03",
    title: "Campaign Setup & Launch",
    desc: "We set up your campaigns with the right targeting, budget, and bidding strategy before launching them across trusted advertising platforms.",
    status: "real_time_bidding"
  },
  {
    num: "04",
    title: "Retarget & Reconnect",
    desc: "We re-engage visitors who have shown interest in your business with personalized ads that encourage them to return and convert.",
    status: "cohort_recapture"
  },
  {
    num: "05",
    title: "Monitor & Optimize",
    desc: "We continuously track campaign performance, refine targeting and budgets, and optimize your campaigns to improve results and maximize your return on investment.",
    status: "margin_maximization"
  }
];

  // 6. THE RETARGETING FUNNEL & SCRUBBABLE TIMELINE CHART
  const [funnelActive, setFunnelActive] = useState(false);
  const funnelSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setFunnelActive(true);
        }
      },
      { threshold: 0.25 }
    );
    if (funnelSectionRef.current) {
      observer.observe(funnelSectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // Draggable timeline state (6 Months progression)
  const [scrubPercent, setScrubPercent] = useState(0.4); // default 40%
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const timelineData = [
    { month: "Month 1: Launch", impressions: "500K", clicks: "4,200", conversions: "120", ctr: "0.84%", roas: "1.8x", desc: "Setting baseline targeting, pixel cookies, and programmatic bid algorithms." },
    { month: "Month 2: Scaling", impressions: "1.2M", clicks: "11,500", conversions: "410", ctr: "0.96%", roas: "2.4x", desc: "Introducing audience affinity expansion and HTML5 animated display modules." },
    { month: "Month 3: Retargeting", impressions: "1.8M", clicks: "24,600", conversions: "890", ctr: "1.37%", roas: "3.8x", desc: "Dynamic Remarketing campaigns activate, reclaiming abandoned checkouts instantly." },
    { month: "Month 4: Maturity", impressions: "2.5M", clicks: "38,200", conversions: "1,540", ctr: "1.53%", roas: "4.5x", desc: "Algorithmic placement filtering removes low-conversion editorial zones." },
    { month: "Month 5: Mastery", impressions: "3.1M", clicks: "52,100", conversions: "2,210", ctr: "1.68%", roas: "5.2x", desc: "Multi-device retargeting graph aligns users across desktop, tablets, and phones." },
    { month: "Month 6: Flagship Peak", impressions: "4.0M", clicks: "71,400", conversions: "3,180", ctr: "1.79%", roas: "6.1x", desc: "Maximum programmatic placement efficiency, delivering sustained top-tier ROAS." }
  ];

  const maxTimelineIdx = timelineData.length - 1;
  const activeTimelineIdx = Math.min(
    maxTimelineIdx,
    Math.max(0, Math.floor(scrubPercent * (maxTimelineIdx + 1)))
  );
  const activePoint = timelineData[activeTimelineIdx];

  const handleScrubberMove = (clientX: number) => {
    if (!chartContainerRef.current) return;
    const rect = chartContainerRef.current.getBoundingClientRect();
    const pos = clientX - rect.left;
    let percent = pos / rect.width;
    percent = Math.max(0, Math.min(percent, 0.99));
    setScrubPercent(percent);
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

  // 9. FAQ ACCORDION State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const faqs = [
    {
      q: "What is the difference between display and native ads?",
      a: "Display ads are highly visual, structured banner formats placed in designated spaces (such as sidebars or header billboards) on a webpage. They are designed to stand out. Native ads are designed to blend into the editorial environment, matching the typography, layout, and visual cards of the host content. They appear as 'sponsored' or 'promoted' articles within feeds, and typically achieve higher engagement."
    },
    {
      q: "How do you ensure brand-safe placements?",
      a: "We implement multi-layered safety filters within programmatic demand-side platforms (DSPs). We use strict negative-topic exclusions, monitor keyword associations, and audit real-time inventory to block adult, highly polarized, or low-quality clickbait media channels, keeping your brand in premium safe havens."
    },
    {
      q: "Do you handle retargeting for website visitors?",
      a: "Yes, retargeting is the engine of display ad ROI. We configure cookie pixels, custom parameters, and device charts to create tailored lists (e.g., users who browsed a product but didn't buy). We then deliver dynamic product display ads to remind them of those products as they browse other premier sites."
    },
    {
      q: "What ad formats and sizes do you design?",
      a: "We design all industry-standard Interactive Advertising Bureau (IAB) formats, including Leaderboards (728x90), Half Pages (300x600), Medium Rectangles (300x250), Billboards (970x250), Mobile Banners, and high-impact HTML5 responsive interactive units."
    }
  ];

  return (
    <div className="pt-24 bg-white selection:bg-[#FE7146] selection:text-white">
      
      {/* SECTION 1: HERO - "Everywhere, On Brand" */}
      <section className="relative min-h-[90vh] flex items-center justify-center py-16 overflow-hidden bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column Description */}
            <div className="lg:col-span-5 text-left space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFF1EC] border border-[#FE7146]/20 rounded-full">
             
                <span className="text-[10px] sm:text-xs font-mono font-black tracking-widest text-[#FE7146] uppercase">
                  DISPLAY & NATIVE ADS
                </span>
              </div>

              <h1 className="font-display font-black text-4xl sm:text-5xl text-[#303360] tracking-tight leading-[1.1]">
                Reach Your <span className="text-[#FE7146]">Audience</span> Wherever They Are
              </h1>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal max-w-xl">
                Get your brand in front of the right people across trusted websites, apps, and digital platforms. We create targeted display and native advertising campaigns that increase brand awareness, engagement, and conversions.

              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                <button
                  onClick={() => navigate.push('/contact')}
                  className="w-full sm:w-auto bg-[#FE7146] hover:bg-[#FE7146]/95 text-white font-black text-sm px-8 py-4 rounded-xl shadow-lg shadow-[#FE7146]/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Get a Free Reach Audit</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="#ad-toggle-section"
                  className="w-full sm:w-auto bg-slate-50 hover:bg-slate-100 text-[#303360] font-black text-sm px-8 py-4 rounded-xl border border-gray-200/60 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>See Ad Placements</span>
                </a>
              </div>
            </div>

            {/* Hero Right: Display & Native Ads Dashboard Image */}
            <div className="lg:col-span-7 flex justify-center w-full">
              <div className="w-full relative">
                <img
                  src="https://res.cloudinary.com/dqjlffxja/image/upload/f_auto,q_auto/v1783790036/DISPLAY_NATIVE_ADS_cnxqiq.jpg"
                  alt="Display and native ads reach dashboard"
                  className="relative w-full h-auto rounded-3xl"
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
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[180px] font-serif font-black text-slate-50 select-none pointer-events-none -z-10 opacity-60">
            “
          </span>
          <blockquote className="space-y-6">
            <p className="font-display font-bold text-2xl sm:text-4xl text-[#303360] leading-relaxed tracking-tight max-w-3xl mx-auto">
              "The most effective ads are the ones <span className="text-[#FE7146] underline decoration-dashed decoration-2 underline-offset-8">people choose to engage with. </span>"
            </p>
            <cite className="block font-mono text-xs sm:text-sm font-bold text-slate-400 tracking-wider uppercase">
              — ANALYTICS CLOUDS DESIGN PHILOSOPHY
            </cite>
          </blockquote>
        </div>
      </section>

      

      {/* SECTION 4: WHAT'S INCLUDED (Interactive tab explorer) */}
      <section className="py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xm font-mono font-black text-[#FE7146] tracking-widest uppercase">
              COMPLETE STACK
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-[#303360] leading-tight tracking-tight">
              Everything You Need to Run <span className="text-[#FE7146]">Successful Ad Campaigns</span>
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              We take care of everything from designing engaging ads and choosing the right audience to managing campaigns and optimizing performance.

            </p>
          </div>

          {/* DESKTOP VIEW: Sidebar Vertical Tabs */}
          <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Vertical Tabs list */}
            <div className="lg:col-span-4 space-y-2">
              {serviceTabs.map((tab) => {
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
                        {tab.id === "targeting" && <Target size={14} />}
                        {tab.id === "display" && <Tv size={14} />}
                        {tab.id === "native" && <FileText size={14} />}
                        {tab.id === "buying" && <Compass size={14} />}
                        {tab.id === "retargeting" && <RefreshCw size={14} />}
                        {tab.id === "reporting" && <Award size={14} />}
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

            {/* Right Content Panel */}
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                {serviceTabs.map((tab) => {
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
                      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-4">
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono font-black text-slate-400 tracking-wider">
                            {tab.channelTag}
                          </span>
                          <h3 className="font-display font-extrabold text-2xl text-[#303360]">
                            {tab.title}
                          </h3>
                        </div>

                       
                      </div>

                      <p className="text-slate-600 text-sm leading-relaxed font-normal">
                        {tab.description}
                      </p>

                      {/* Capabilities Grid */}
                      <div className="space-y-3 pt-2">
                        <span className="text-xs font-mono font-black text-[#303360] tracking-wide uppercase block">
                          What's Included
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

          {/* MOBILE VIEW: Collapsible Accordion List */}
          <div className="block lg:hidden space-y-4 text-left">
            {serviceTabs.map((tab) => {
              const isOpen = activeTab === tab.id;
              return (
                <div key={tab.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                  <button
                    onClick={() => setActiveTab(isOpen ? "" : tab.id)}
                    className="w-full p-4 flex items-center justify-between text-left cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono text-xs font-black ${
                        isOpen ? "bg-[#FFF1EC] text-[#FE7146]" : "bg-slate-100 text-slate-400"
                      }`}>
                        {tab.id === "targeting" && <Target size={14} />}
                        {tab.id === "display" && <Tv size={14} />}
                        {tab.id === "native" && <FileText size={14} />}
                        {tab.id === "buying" && <Compass size={14} />}
                        {tab.id === "retargeting" && <RefreshCw size={14} />}
                        {tab.id === "reporting" && <Award size={14} />}
                      </div>
                      <span className="text-sm font-extrabold text-[#303360] tracking-tight">
                        {tab.title}
                      </span>
                    </div>
                    <div className={`w-7 h-7 rounded-full bg-slate-50 flex items-center justify-center border border-gray-100 transition-transform ${
                      isOpen ? "rotate-180 text-[#FE7146]" : "text-[#303360]"
                    }`}>
                      <ChevronDown size={14} />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.22, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 pt-0 border-t border-gray-50 space-y-4">
                          <div className="flex items-center justify-between gap-4 pt-3">
                            <span className="text-[9px] font-mono font-black text-slate-400 tracking-wider">
                              SYSTEM_STAGE: {tab.channelTag}
                            </span>
                            <div className="px-2.5 py-1 bg-[#FFF1EC]/80 border border-[#FE7146]/10 rounded-xl flex items-center gap-1.5">
                              <span className="font-mono font-black text-xs text-[#FE7146]">
                                {tab.metric}
                              </span>
                              <span className="text-[8px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                                {tab.metricLabel}
                              </span>
                            </div>
                          </div>

                          <p className="text-slate-600 text-xs leading-relaxed font-normal">
                            {tab.description}
                          </p>

                          <div className="space-y-2 pt-1">
                            <span className="text-[9px] font-mono font-black text-[#303360] tracking-wide uppercase block">
                              SYSTEM CAPABILITIES:
                            </span>
                            <div className="grid grid-cols-1 gap-2">
                              {tab.capabilities.map((cap, capIdx) => (
                                <div key={capIdx} className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 border border-gray-100 text-xs text-slate-600">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-[#FE7146] shrink-0 mt-0.5" />
                                  <span className="leading-tight">{cap}</span>
                                </div>
                              ))}
                            </div>
                          </div>
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

      {/* SECTION 5: OUR PROCESS - Scroll Scrubbed Campaign Pipeline */}
      <section ref={pipelineRef} className="py-24 bg-white overflow-hidden border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xm font-mono font-black text-[#FE7146] tracking-widest uppercase">
              METHODICAL EXCELLENCE
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-[#303360] leading-tight tracking-tight">
              Our Elite 5-Step<span className="text-[#FE7146]"> Advertising Process </span>
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              A structured approach to planning, launching, and optimizing campaigns that deliver measurable results.
            </p>
          </div>

          {/* Timeline Pipeline */}
          <div className="relative pt-6">
            
            {/* Horizontal connection line */}
            <div className="absolute top-[36px] left-0 w-full h-[3px] bg-slate-100 hidden lg:block"></div>

            {/* Dynamic scroll-progress timeline */}
            <div
              className="absolute top-[36px] left-0 h-[3px] bg-[#FE7146] transition-all duration-150 hidden lg:block"
              style={{ width: `${scrollProgress * 100}%` }}
            ></div>

            {/* Steps Nodes */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 relative z-10">
              {pipelineSteps.map((step, idx) => {
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
                      
                      {/* Mobile line connection */}
                      <div className="h-[2px] bg-slate-100 flex-grow lg:hidden"></div>
                    </div>

                    {/* Step description */}
                    <div className="space-y-2 pt-2">
                      <div className="flex justify-between items-center">
                  
                        {isStepActive && (
                          <span className="text-[9px] font-mono font-bold text-[#FE7146] tracking-wider animate-pulse">
                           
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

      {/* SECTION 6: THE RETARGETING FUNNEL & SCRUBBABLE TIMELINE (Proof Moment) */}
      <section ref={funnelSectionRef} className="py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xm font-mono font-black text-[#FE7146] tracking-widest uppercase">
              STAYING ON THEIR RADAR
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-[#303360] leading-tight tracking-tight">
             From First Impression  <span className="text-[#FE7146]">to Final Conversion</span>
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              See how we turn interested visitors into loyal customers with smart advertising and remarketing.
            </p>
          </div>

          {/* Interactive Horizontal Funnel Diagram with flow dots */}
          <div className="bg-[#303360] rounded-3xl p-6 sm:p-10 border border-white/5 shadow-2xl relative overflow-hidden mb-12 max-w-5xl mx-auto text-left text-white">
            <div className="absolute inset-0 bg-[radial-gradient(rgba(254,113,70,0.04)_1px,transparent_1px)] [background-size:16px_16px]"></div>

            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-10 relative z-10">
              <div className="flex items-center gap-2">
                <Workflow className="w-4 h-4 text-[#FE7146] animate-pulse" />
                <span className="font-mono text-xs font-extrabold tracking-wider">RETARGETING_FLOW_DEVICES</span>
              </div>
              <span className="text-[9px] font-mono text-slate-400 uppercase bg-white/5 px-2 py-0.5 rounded">
                Telemetry: ACTIVE
              </span>
            </div>

            {/* Funnel diagram grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4 relative z-10">
              
              {/* Funnel Stage 1 */}
              <div className="bg-slate-950/40 p-4 rounded-2xl border border-white/5 space-y-2 relative flex flex-col justify-between">
                <div className="space-y-1">
                  <span className="font-mono text-[9px] text-[#FE7146] font-bold">STAGE 01</span>
                  <h4 className="font-display font-extrabold text-base">First Impression</h4>
                  <p className="text-slate-400 text-xs font-normal">
                  Your ad appears on trusted websites, apps, or digital platforms where your ideal audience is already spending time.
                  </p>
                </div>
                <div className="pt-4 border-t border-white/5 font-mono text-[10px] text-slate-400 flex items-center justify-between">
                  <span>Goal:</span>
                  <span className="text-[#FE7146] font-bold">Build awareness</span>
                </div>
              </div>

              {/* Funnel Stage 2 */}
              <div className="bg-slate-950/40 p-4 rounded-2xl border border-white/5 space-y-2 relative flex flex-col justify-between">
                <div className="space-y-1">
                  <span className="font-mono text-[9px] text-[#FE7146] font-bold">STAGE 02</span>
                  <h4 className="font-display font-extrabold text-base">Website Visit</h4>
                  <p className="text-slate-400 text-xs font-normal">
                    Interested users click your ad, visit your website, and explore your products or services.

                  </p>
                </div>
                <div className="pt-4 border-t border-white/5 font-mono text-[10px] text-slate-400 flex items-center justify-between">
                  <span>Goal: </span>
                  <span className="text-white font-bold">Generate interest</span>
                </div>
              </div>

              {/* Funnel Stage 3 */}
              <div className="bg-slate-950/40 p-4 rounded-2xl border border-white/5 space-y-2 relative flex flex-col justify-between">
                <div className="space-y-1">
                  <span className="font-mono text-[9px] text-[#FE7146] font-bold">STAGE 03</span>
                  <h4 className="font-display font-extrabold text-base">Retargeting</h4>
                  <p className="text-slate-400 text-xs font-normal">
                  Visitors who don't convert are shown personalized ads across the web, reminding them to return and complete their journey.
                  </p>
                </div>
                <div className="pt-4 border-t border-white/5 font-mono text-[10px] text-slate-400 flex items-center justify-between">
                  <span>Goal:</span>
                  <span className="text-[#FE7146] font-extrabold">Re-engage potential customers</span>
                </div>
              </div>

              {/* Funnel Stage 4 */}
              <div className="bg-slate-950/40 p-4 rounded-2xl border border-white/5 space-y-2 relative flex flex-col justify-between">
                <div className="space-y-1">
                  <span className="font-mono text-[9px] text-[#FE7146] font-bold">STAGE 04</span>
                  <h4 className="font-display font-extrabold text-base">Conversion</h4>
                  <p className="text-slate-400 text-xs font-normal">
                    The customer returns, completes the purchase or enquiry, and your campaign performance is tracked to measure results.
                  </p>
                </div>
                <div className="pt-4 border-t border-white/5 font-mono text-[10px] text-slate-400 flex items-center justify-between">
                  <span>Goal:</span>
                  <span className="text-emerald-400 font-extrabold">Drive conversions and maximize ROI</span>
                </div>
              </div>

            </div>

            {/* Small animated flow dots */}
            <div className="hidden md:flex justify-around items-center h-4 mt-6 relative z-10">
              <div className="w-full h-[1px] bg-gradient-to-r from-[#FE7146] to-transparent relative">
                <motion.div
                  initial={{ left: 0 }}
                  animate={funnelActive ? { left: "100%" } : { left: 0 }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
                  className="absolute w-2 h-2 rounded-full bg-[#FE7146] shadow-md shadow-[#FE7146]/50 -top-0.5"
                ></motion.div>
              </div>
            </div>

          </div>

       

        </div>
      </section>



    

      {/* SECTION 10: CTA BANNER (Custom styled adapted banner) */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-[#FE7146] rounded-3xl p-8 sm:p-12 lg:p-16 text-white relative overflow-hidden shadow-2xl shadow-[#FE7146]/30 flex flex-col lg:flex-row justify-between items-center gap-8 text-left">
            
            {/* Background vector underlays */}
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

            <div className="absolute right-10 bottom-0 opacity-10 pointer-events-none select-none hidden lg:block">
              <ArrowUpRight size={240} className="stroke-[1.5]" />
            </div>

            {/* Title & Copy */}
            <div className="space-y-4 max-w-2xl relative z-10">
              <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white leading-tight tracking-tight">
                Ready to Put Your Brand in Front of the Right Audience, Everywhere?
              </h2>
              <p className="text-orange-50 text-base sm:text-lg font-normal">
                Let us deploy premium programmatic native feeds and high-impact custom banner campaigns. Start your free reach audit with Analytics Clouds today.
              </p>
            </div>

            {/* Action button */}
            <div className="relative z-10 w-full lg:w-auto">
              <button
                onClick={() => navigate.push('/contact')}
                className="w-full lg:w-auto bg-white hover:bg-orange-50 text-[#FE7146] font-black text-base px-8 py-4 rounded-xl shadow-lg transition-all hover:scale-[1.03] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Get a Free Reach Audit</span>
                <TrendingUp size={18} />
              </button>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
