"use client";

import { useRouter } from "next/navigation";
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  MessageSquare,
  ArrowRight,
  Check,
  ChevronDown,
  ChevronRight,
  Sparkles,
  Users,
  Clock,
  Zap,
  Percent,
  Search,
  HelpCircle,
  TrendingUp,
  Inbox,
  Send,
  Split,
  MousePointerClick,
  Layers,
  Sparkle,
  Gauge,
  Workflow,
  CheckCircle2,
  AlertTriangle,
  Smartphone,
  ShieldCheck,
  ZapOff,
  Flame,
  ArrowUpRight,
  BarChart3
} from "lucide-react";
import { CtaBanner } from '@/components/CtaBanner';

// CountUp Component triggered by Intersection Observer
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

// Interfaces for What's Included Tabs
interface SmsTab {
  id: string;
  title: string;
  description: string;
  capabilities: string[];
  metric: string;
  metricLabel: string;
  channelTag: string;
}

export function SmsMarketing() {
  const navigate = useRouter();
  // Motion setting for reduced motion accessibility
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  // 1. HERO "Sent. Delivered. Read." lock-screen notifications state
  const [heroStep, setHeroStep] = useState<"none" | "sent" | "delivered" | "read">("none");
  const [heroLoopKey, setHeroLoopKey] = useState(0);

  useEffect(() => {
    // Sequence of live phone lockscren state updates
    setHeroStep("none");
    
    const tSent = setTimeout(() => {
      setHeroStep("sent");
    }, 400);

    const tDelivered = setTimeout(() => {
      setHeroStep("delivered");
    }, 1200);

    const tRead = setTimeout(() => {
      setHeroStep("read");
    }, 2000);

    // Ambient loop: restart notification animation every 9 seconds
    const tLoop = setTimeout(() => {
      setHeroLoopKey(prev => prev + 1);
    }, 9000);

    return () => {
      clearTimeout(tSent);
      clearTimeout(tDelivered);
      clearTimeout(tRead);
      clearTimeout(tLoop);
    };
  }, [heroLoopKey]);

  // 3. What's Included vertical tabs state
  const [activeTab, setActiveTab] = useState("strategy");
  const smsTabs: SmsTab[] = [
    {
      id: "strategy",
      title: "Strategy & TRAI Compliance Setup",
      description: "Avoid heavy penalties and blocked routes. We configure compliant, DLT-registered headers, verify opt-in audits, manage strict DND (Do Not Disturb) suppression lists, and ensure complete legal protection.",
      capabilities: [
        "DLT Header & Template Registration",
        "Dual-Opt-In High-Conversion Widgets",
        "Dynamic Indian DND Registry Scrubbing",
        "Transactional vs Promotional Split-Tunneling"
      ],
      metric: "100%",
      metricLabel: "TRAI Audit Compliance",
      channelTag: "carrier_governance"
    },
    {
      id: "copywriting",
      title: "Concise Copywriting & Character Craft",
      description: "Every character matters in 160-limit SMS boxes. We write powerful direct-response copies that maintain high brand status without resorting to clickbait, paired with personalized variables.",
      capabilities: [
        "Ultra-Compelling Call-to-Action Snippets",
        "Character-Optimized Direct-Response Wording",
        "Dynamic Custom Token Integration",
        "Clean, Shortened URL redirection links"
      ],
      metric: "9.6%",
      metricLabel: "Avg Click-Through Rate",
      channelTag: "linguistic_compression"
    },
    {
      id: "segmentation",
      title: "Behavioral Segmentation & Timing",
      description: "Do not wake customers up at 3:00 AM. We calculate custom time-zone matrices and buy-behavior signals to deliver messages exactly when conversion probabilities spike.",
      capabilities: [
        "Local State Time-Zone Locking",
        "Purchase Pattern Sequence Clusters",
        "Quiet-Hours Lockout Restraints",
        "High-Probability Impulse buying windows"
      ],
      metric: "+42%",
      metricLabel: "Spike in Conversion Odds",
      channelTag: "temporal_sequencing"
    },
    {
      id: "triggers",
      title: "Automated Triggers — Cart Abandonment",
      description: "Email gets ignored; SMS gets opened. We connect automated cart alerts, renewal notices, and dynamic payment links to secure checkout completions in real time.",
      capabilities: [
        "Cart Abandonment 15-Min Dynamic Triggers",
        "Smart Double-Take Purchase Recoveries",
        "Post-Purchase Replenishment Loops",
        "Secure Checkout Link Embed Auto-Fills"
      ],
      metric: "14x",
      metricLabel: "ROI Attributed to Flows",
      channelTag: "automated_impulse"
    },
    {
      id: "campaigns",
      title: "Flash Sales & Time-Sensitive Campaigns",
      description: "When stock is low or the deadline is hours away, SMS gets immediate action. We manage high-speed broadcast tunnels that reach 100k+ subscribers simultaneously.",
      capabilities: [
        "High-Concurrency Direct Route Pipes",
        "Scarcity Countdown Dynamic Campaigns",
        "VIP-Only Flash Sale Access Systems",
        "Real-time Inventory Link synchronizations"
      ],
      metric: "28 Min",
      metricLabel: "Average Flash Sale Sellout",
      channelTag: "realtime_concurrency"
    },
    {
      id: "analytics",
      title: "Analytics & Attribution Logs",
      description: "Track every single rupee spent. We tie UTM links to specific carrier deliveries, allowing you to audit your absolute return on ad spend (ROAS) and margins clearly.",
      capabilities: [
        "UTM Redirection Tracking Frameworks",
        "True ROI Revenue Attribution Mapping",
        "Dynamic Opt-out Rate degradation lines",
        "Multi-Carrier Performance Auditing logs"
      ],
      metric: "18.4x",
      metricLabel: "Average Campaign ROAS",
      channelTag: "absolute_accounting"
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
      title: "Audit & Opt-In Strategy",
      desc: "Deep analysis of existing numbers, opt-in compliance hygiene, and setting up strict DND filters before sending a single message.",
      status: "compliance_audit"
    },
    {
      num: "02",
      title: "Message & Offer Design",
      desc: "Writing character-constrained direct copy, registering templates in DLT portals, and preparing personalized dynamic variables.",
      status: "dlt_template_build"
    },
    {
      num: "03",
      title: "Segmentation & Scheduling",
      desc: "Clustering lists by purchase behavior and setting up precision-timing locks to protect quiet hours and DND blocks.",
      status: "timing_segmentation"
    },
    {
      num: "04",
      title: "Send & Monitor",
      desc: "Routing messages through high-capacity direct operator gateways, monitoring live delivery metrics and bounce drops.",
      status: "gateway_concurrency"
    },
    {
      num: "05",
      title: "Analyze & Optimize",
      desc: "Auditing UTM attribution revenue logs, calculating return on ad spend, and updating automated triggers on customer actions.",
      status: "margin_reinvestment"
    }
  ];

  // 5. THE SPEED RACE (Signature interactive element)
  const [raceTriggered, setRaceTriggered] = useState(false);
  const raceSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setRaceTriggered(true);
        }
      },
      { threshold: 0.25 }
    );
    if (raceSectionRef.current) {
      observer.observe(raceSectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // Draggable, scrubbable chart state (by hour, to show rapid same-day response)
  const [scrubPercent, setScrubPercent] = useState(0.4); // default 40%
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const rapidCampaignData = [
    { time: "05 Mins After", ctr: 12.4, conversions: 28, revenue: 14000 },
    { time: "15 Mins After", ctr: 22.8, conversions: 54, revenue: 31000 },
    { time: "30 Mins After", ctr: 31.2, conversions: 89, revenue: 56000 },
    { time: "45 Mins After", ctr: 34.6, conversions: 112, revenue: 78000 },
    { time: "01 Hour After", ctr: 36.1, conversions: 128, revenue: 94000 },
    { time: "02 Hours After", ctr: 37.4, conversions: 142, revenue: 112000 },
    { time: "04 Hours After", ctr: 38.0, conversions: 149, revenue: 124000 },
    { time: "08 Hours After", ctr: 38.2, conversions: 151, revenue: 131000 },
  ];

  const maxTimelineIdx = rapidCampaignData.length - 1;
  const activeTimelineIdx = Math.min(
    maxTimelineIdx,
    Math.max(0, Math.floor(scrubPercent * (maxTimelineIdx + 1)))
  );
  const activeTimelinePoint = rapidCampaignData[activeTimelineIdx];

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

  // 6. MESSAGE CRAFTING SHOWCASE (As if typing live)
  const [typedMessage, setTypedMessage] = useState("");
  const [composerIndex, setComposerIndex] = useState(0);
  const sampleMessage = "FLASH SALE! ⚡ Get 25% off our premium winter jackets. Use code WINTER25. Only valid for 3 hours! Order here: t.co/jackets25 - Reply STOP to opt-out";

  useEffect(() => {
    setTypedMessage("");
    let charIdx = 0;
    const interval = setInterval(() => {
      if (charIdx < sampleMessage.length) {
        setTypedMessage(sampleMessage.slice(0, charIdx + 1));
        charIdx++;
      } else {
        clearInterval(interval);
        // Loop restart typing simulation after 8 seconds
        const timeout = setTimeout(() => {
          setComposerIndex(prev => prev + 1);
        }, 8000);
        return () => clearTimeout(timeout);
      }
    }, 35);

    return () => clearInterval(interval);
  }, [composerIndex]);

  // 9. FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const faqs = [
    {
      q: "Is SMS marketing compliant with Indian regulations (TRAI/DND)?",
      a: "Yes, fully. We manage the entire legal DLT registration lifecycle for you. We configure your transactional/promotional templates inside airline/telecom-grade operator dashboards, run automatic checks against the NDNC (National Do Not Call) registry, and strictly implement TRAI compliance to protect your brand from warnings or fines."
    },
    {
      q: "How do customers opt in?",
      a: "Compliance requires active permission. We build secure, compliant opt-in capture forms on your checkout page, custom subscription footer blocks, or text-to-join keywords (e.g. \"Text SHIRTS to 56161\"). Every method uses dual opt-in parameters to log clear authorization timestamps."
    },
    {
      q: "What's a good use case for SMS vs. email?",
      a: "SMS is designed for immediate velocity. Best use cases include flash sales (3-hour limits), checkout abandonment reminders (sent 15-30 minutes after abandonment), post-purchase order tracking links, time-sensitive VIP product drops, and restock alerts. Email remains ideal for long-form brand storytelling, newsletters, and complex onboarding instructions."
    },
    {
      q: "How many messages can we send per month?",
      a: "Our carrier tunnels can handle from 10,000 to over 10 million messages monthly. We scale route pipes dynamically to maintain concurrency. Your packages include dedicated custom routes with top-tier operators (Airtel, Jio, Vi) to guarantee absolute deliverability at any volume."
    }
  ];

  return (
    <div className="pt-24 bg-white selection:bg-[#FE7146] selection:text-white">
      
      {/* SECTION 1: HERO - "Sent. Delivered. Read." */}
      <section className="relative min-h-[90vh] flex items-center justify-center py-16 overflow-hidden bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column Description */}
            <div className="lg:col-span-5 text-left space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFF1EC] border border-[#FE7146]/20 rounded-full">
                <MessageSquare className="w-3.5 h-3.5 text-[#FE7146]" />
                <span className="text-[10px] sm:text-xs font-mono font-black tracking-widest text-[#FE7146] uppercase">
                  // SMS MARKETING
                </span>
              </div>

              <h1 className="font-display font-black text-4xl sm:text-5xl text-[#303360] tracking-tight leading-[1.1]">
                The Message That Gets Read in <span className="text-[#FE7146]">Seconds</span>, Not Days.
              </h1>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal max-w-xl">
                Immediate mobile reach with over 98% open rates. We create highly targeted SMS campaigns, automated flows, and TRAI-compliant broadcast pipelines that drive instant checkout action.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                <button
                  onClick={() => navigate.push('/contact')}
                  className="w-full sm:w-auto bg-[#FE7146] hover:bg-[#FE7146]/95 text-white font-black text-sm px-8 py-4 rounded-xl shadow-lg shadow-[#FE7146]/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Get a Free SMS Strategy Call</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="#speed-race"
                  className="w-full sm:w-auto bg-slate-50 hover:bg-slate-100 text-[#303360] font-black text-sm px-8 py-4 rounded-xl border border-gray-200/60 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>See Delivery Speed</span>
                </a>
              </div>
            </div>

            {/* Hero Right: SMS Marketing Dashboard Image */}
            <div className="lg:col-span-7 flex justify-center w-full">
              <div className="w-full relative">
                <img
                  src="https://res.cloudinary.com/dqjlffxja/image/upload/f_auto,q_auto/v1783790036/SMS_MARKETING_qzhoig.jpg"
                  alt="SMS marketing campaign dashboard"
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
              "Email waits for a good moment. <span className="text-[#FE7146] underline decoration-dashed decoration-2 underline-offset-8">SMS creates one.</span>"
            </p>
            <cite className="block font-mono text-xs sm:text-sm font-bold text-slate-400 tracking-wider uppercase">
              — ANALYTICS CLOUDS DISCIPLINE STATEMENT
            </cite>
          </blockquote>
        </div>
      </section>

      {/* SECTION 3: WHAT'S INCLUDED (Interactive tab explorer) */}
      <section className="py-24 bg-[#F5F5FA]/50 border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-mono font-black text-[#FE7146] tracking-widest uppercase">
              // COMPLETE STACK
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-[#303360] leading-tight tracking-tight">
              An End-to-End <span className="text-[#FE7146]">Mobile Solution</span>
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              We manage every aspect of SMS outreach, from DLT template submissions and opt-out filters to character constraint design and margin mapping.
            </p>
          </div>

          {/* DESKTOP VIEW: Sidebar Vertical Tabs */}
          <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Vertical Tabs list */}
            <div className="lg:col-span-4 space-y-2">
              {smsTabs.map((tab) => {
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
                        {tab.id === "strategy" && <ShieldCheck size={14} />}
                        {tab.id === "copywriting" && <Layers size={14} />}
                        {tab.id === "segmentation" && <Clock size={14} />}
                        {tab.id === "triggers" && <Zap size={14} />}
                        {tab.id === "campaigns" && <Flame size={14} />}
                        {tab.id === "analytics" && <BarChart3 size={14} />}
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
                {smsTabs.map((tab) => {
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
                            SYSTEM_STAGE: {tab.channelTag}
                          </span>
                          <h3 className="font-display font-extrabold text-2xl text-[#303360]">
                            {tab.title}
                          </h3>
                        </div>

                        {/* Visual metric badge */}
                        <div className="p-3 bg-[#FFF1EC]/50 border border-[#FE7146]/15 rounded-2xl flex flex-col items-center sm:items-end">
                          <span className="font-mono font-black text-xl sm:text-2xl text-[#FE7146] leading-none">
                            {tab.metric}
                          </span>
                          <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest leading-none pt-1 text-center">
                            {tab.metricLabel}
                          </span>
                        </div>
                      </div>

                      <p className="text-slate-600 text-sm leading-relaxed font-normal">
                        {tab.description}
                      </p>

                      {/* Capabilities Grid */}
                      <div className="space-y-3 pt-2">
                        <span className="text-xs font-mono font-black text-[#303360] tracking-wide uppercase block">
                          SYSTEM CAPABILITIES:
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
            {smsTabs.map((tab) => {
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
                        {tab.id === "strategy" && <ShieldCheck size={14} />}
                        {tab.id === "copywriting" && <Layers size={14} />}
                        {tab.id === "segmentation" && <Clock size={14} />}
                        {tab.id === "triggers" && <Zap size={14} />}
                        {tab.id === "campaigns" && <Flame size={14} />}
                        {tab.id === "analytics" && <BarChart3 size={14} />}
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

      {/* SECTION 4: PROCESS - Scroll Scrubbed Optimization Pipeline */}
      <section ref={pipelineRef} className="py-24 bg-white overflow-hidden border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-mono font-black text-[#FE7146] tracking-widest uppercase">
              // METHODICAL COMPLIANCE
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-[#303360] leading-tight tracking-tight">
              An Elite Broadcast <span className="text-[#FE7146]">Delivery Sequence</span>
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              We treat mobile outreach as an extreme science. Our 5-stage setup guarantees deliverability pre-approval prior to any broadcasts.
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
                        <span className="text-[9px] font-mono font-bold text-slate-400">
                          {step.status}
                        </span>
                        {isStepActive && (
                          <span className="text-[9px] font-mono font-bold text-[#FE7146] tracking-wider animate-pulse">
                            ACTIVE_PASS
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

      {/* SECTION 5: THE SPEED RACE (Signature interactive element) */}
      <section id="speed-race" ref={raceSectionRef} className="py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-mono font-black text-[#FE7146] tracking-widest uppercase">
              // WHY SMS WINS ON SPEED
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-[#303360] leading-tight tracking-tight">
              The Fastest Way to <span className="text-[#FE7146]">Reach a Customer</span>
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              Emails sit unanswered for hours. SMS bypasses filters to command immediate, focused attention within minutes of being received.
            </p>
          </div>

          {/* Interactive Tracks Layout */}
          <div className="bg-[#303360] rounded-3xl p-6 sm:p-8 border border-white/5 shadow-2xl relative overflow-hidden mb-12 max-w-5xl mx-auto text-left text-white">
            <div className="absolute inset-0 bg-[radial-gradient(rgba(254,113,70,0.04)_1px,transparent_1px)] [background-size:16px_16px]"></div>

            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-8 relative z-10">
              <div className="flex items-center gap-2">
                <Gauge className="w-4 h-4 text-[#FE7146] animate-pulse" />
                <span className="font-mono text-xs font-extrabold tracking-wider">SPEED_RACER: ENGAGEMENT_VELOCITY</span>
              </div>
              <span className="text-[9px] font-mono text-slate-400 uppercase bg-white/5 px-2 py-0.5 rounded">
                Telemetry: Calibrated
              </span>
            </div>

            <div className="space-y-8 relative z-10">
              
              {/* SMS Race Track */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-slate-300">
                  <span className="font-black">SMS TRANSMISSION</span>
                  <span className="font-bold text-[#FE7146]">Completed in 00:04s (90% read within 3 mins)</span>
                </div>
                
                {/* Track Lane */}
                <div className="h-8 bg-slate-950/80 rounded-xl relative border border-white/5 overflow-hidden flex items-center">
                  {/* Progress Glow Grid */}
                  <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#FE7146]/20 to-[#FE7146]/5 rounded-xl transition-all duration-1000"
                    style={{ width: raceTriggered ? "100%" : "0%" }}
                  ></div>
                  
                  {/* Moving Token */}
                  <motion.div
                    initial={{ x: 0 }}
                    animate={raceTriggered ? { x: "94%" } : { x: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="absolute z-20 w-8 h-6 bg-[#FE7146] rounded-lg flex items-center justify-center text-xs font-mono font-black text-white shadow-lg shadow-[#FE7146]/40"
                    style={{ left: "1%" }}
                  >
                    <span>SMS</span>
                  </motion.div>

                  {/* Milestones */}
                  <div className="absolute right-4 text-[9px] font-mono text-[#FE7146] font-bold animate-pulse">
                    98% Opened
                  </div>
                </div>
              </div>

              {/* Email Race Track */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-slate-300">
                  <span className="font-black">EMAIL TRANSMISSION</span>
                  <span className="text-slate-400">Avg. open time: 6+ Hours (18% avg. open rate)</span>
                </div>
                
                {/* Track Lane */}
                <div className="h-8 bg-slate-950/80 rounded-xl relative border border-white/5 overflow-hidden flex items-center">
                  {/* Progress Glow Grid */}
                  <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-indigo-500/10 to-indigo-500/5 rounded-xl transition-all duration-3000"
                    style={{ width: raceTriggered ? "42%" : "0%" }}
                  ></div>
                  
                  {/* Moving Token */}
                  <motion.div
                    initial={{ x: 0 }}
                    animate={raceTriggered ? { x: "42%" } : { x: 0 }}
                    transition={{ duration: 3.5, ease: "easeInOut" }}
                    className="absolute z-20 w-8 h-6 bg-slate-700 rounded-lg flex items-center justify-center text-xs font-mono text-white text-opacity-80"
                    style={{ left: "1%" }}
                  >
                    <span>MAIL</span>
                  </motion.div>

                  {/* Milestones */}
                  <div className="absolute right-4 text-[9px] font-mono text-slate-500">
                    Waiting in Inbox
                  </div>
                </div>
              </div>

            </div>

            <div className="mt-8 pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 text-[10px] font-mono text-slate-400">
              <span>*Data modeled from standard Analytics Clouds commercial benchmarks</span>
              <button
                onClick={() => {
                  setRaceTriggered(false);
                  setTimeout(() => setRaceTriggered(true), 200);
                }}
                className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded text-slate-300 font-extrabold uppercase text-[9px] cursor-pointer"
              >
                Restart Race Simulation
              </button>
            </div>

          </div>

          {/* Draggable Same-Day Flash Sale Growth Scrubber */}
          <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xl max-w-5xl mx-auto text-left space-y-6">
            
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-4">
              <div className="space-y-1">
                <span className="text-xs font-mono font-black text-[#FE7146] uppercase">
                  // CAMPAIGN ACCELERATOR CHART
                </span>
                <h3 className="font-display font-black text-xl text-[#303360]">
                  Interactive Same-Day Performance Scrubber
                </h3>
              </div>
              <p className="text-slate-500 text-xs sm:text-sm max-w-md">
                Drag the slider track below to trace how conversions and Click-Through Rates spike immediately in the first hours after sending SMS campaigns.
              </p>
            </div>

            {/* Draggable interactive scrubber container */}
            <div
              ref={chartContainerRef}
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
              className="h-32 bg-white rounded-2xl border border-gray-100 shadow-inner relative overflow-hidden select-none cursor-ew-resize"
            >
              {/* Background Chart Grid Bars */}
              <div className="absolute inset-0 flex items-end justify-between px-6 pointer-events-none">
                {rapidCampaignData.map((d, i) => (
                  <div
                    key={i}
                    className="w-10 rounded-t-lg transition-all duration-300"
                    style={{
                      height: `${(d.conversions / 160) * 100}%`,
                      backgroundColor: i <= activeTimelineIdx ? "#FFF1EC" : "#F1F5F9",
                      border: i <= activeTimelineIdx ? "1px solid #FE7146" : "1px solid #E2E8F0"
                    }}
                  ></div>
                ))}
              </div>

              {/* Glowing vertical scrubber bar */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-[#FE7146] shadow-[0_0_12px_#FE7146] pointer-events-none"
                style={{ left: `${scrubPercent * 100}%` }}
              >
                {/* Drag handle */}
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#FE7146] border-2 border-white flex items-center justify-center shadow-lg pointer-events-auto cursor-ew-resize">
                  <div className="flex items-center gap-0.5">
                    <ChevronDown size={10} className="text-white rotate-90" />
                    <ChevronDown size={10} className="text-white -rotate-90" />
                  </div>
                </div>
              </div>

            </div>

            {/* Displaying Live Updates */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-2">
              
              <div className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm space-y-1">
                <span className="text-[10px] font-mono text-slate-400 font-bold uppercase block">Elapsed Time</span>
                <span className="font-mono font-black text-[#303360] text-xl">
                  {activeTimelinePoint.time}
                </span>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm space-y-1">
                <span className="text-[10px] font-mono text-slate-400 font-bold uppercase block">Click-Through Rate</span>
                <span className="font-mono font-black text-[#FE7146] text-xl">
                  {activeTimelinePoint.ctr}%
                </span>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm space-y-1">
                <span className="text-[10px] font-mono text-slate-400 font-bold uppercase block">Conversions Secured</span>
                <span className="font-mono font-black text-[#303360] text-xl">
                  {activeTimelinePoint.conversions} Orders
                </span>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm space-y-1">
                <span className="text-[10px] font-mono text-slate-400 font-bold uppercase block">Revenue Attributed</span>
                <span className="font-mono font-black text-emerald-500 text-xl">
                  ₹{activeTimelinePoint.revenue.toLocaleString()}
                </span>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* SECTION 6: MESSAGE CRAFTING SHOWCASE (Typing SMS simulation) */}
      <section className="py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-5xl mx-auto">
            
            {/* Left Content Column */}
            <div className="lg:col-span-6 text-left space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFF1EC] rounded-full">
                <Sparkle size={14} className="text-[#FE7146]" />
                <span className="text-[10px] font-mono font-black tracking-wider text-[#FE7146] uppercase">
                  // MESSAGE COMPOSITION CRAFT
                </span>
              </div>
              <h3 className="font-display font-black text-3xl text-[#303360] leading-tight">
                Perfecting the <span className="text-[#FE7146]">160-Character Box</span>
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                In SMS, every whitespace and punctuation counts. We construct direct-response copy that balances compliance opt-out links, clear tracking codes, and personalization variables without looking cheap or spammy.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-2 text-xs text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-[#FE7146] shrink-0 mt-0.5" />
                  <span><strong>Personalization Variables</strong>: We sync store variables to address users directly.</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-[#FE7146] shrink-0 mt-0.5" />
                  <span><strong>Clear Call-To-Action</strong>: Short t.co brand redirects maximize character limits.</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-[#FE7146] shrink-0 mt-0.5" />
                  <span><strong>Opt-out Protection</strong>: Strictly required STOP protocols included inside every send.</span>
                </div>
              </div>
            </div>

            {/* Right Interactive Composer Box Column */}
            <div className="lg:col-span-6 w-full flex justify-center">
              <div className="w-full max-w-md bg-[#303360] rounded-3xl p-5 shadow-2xl border border-white/10 text-left">
                
                {/* Simulated SMS Editor Panel Header */}
                <div className="flex items-center justify-between border-b border-white/5 pb-3.5 mb-4 font-mono text-[9px] text-slate-400">
                  <span>DLT_GATEWAY: COMPOSER</span>
                  <span>TEMPLATE_ID: #48109</span>
                </div>

                {/* Textarea simulation */}
                <div className="bg-slate-950/70 border border-white/10 rounded-2xl p-4 h-36 font-mono text-xs text-slate-200 overflow-y-auto relative">
                  <span>{typedMessage}</span>
                  <span className="inline-block w-1.5 h-3.5 bg-[#FE7146] ml-0.5 animate-pulse"></span>
                </div>

                {/* Character counts and status details */}
                <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3.5 text-xs">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono text-slate-400 uppercase block leading-none">Characters</span>
                    <span className="font-mono font-black text-white">
                      {typedMessage.length} / 160 Characters
                    </span>
                  </div>

                  <div className="space-y-0.5 text-right">
                    <span className="text-[10px] font-mono text-slate-400 uppercase block leading-none">Purity Index</span>
                    <span className="font-mono font-bold text-emerald-400">
                      100% (No SPAM triggers)
                    </span>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 7: WHY CHOOSE US FOR SMS MARKETING (Split stats/differentiators) */}
      <section className="py-24 bg-[#303360] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(254,113,70,0.06)_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-80"></div>
        <div className="absolute top-1/2 left-1/3 w-[600px] h-[600px] rounded-full bg-[#FE7146]/5 blur-3xl -translate-y-1/2 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Differentiators (Column span 7) */}
            <div className="lg:col-span-7 text-left space-y-8">
              <div className="space-y-4">
                <span className="text-xs font-mono font-black text-[#FE7146] tracking-widest uppercase block">
                  // THE MOBILE EDGE
                </span>
                <h3 className="font-display font-black text-3xl sm:text-5xl text-white leading-tight tracking-tight">
                  High-Throughput SMS <span className="text-[#FE7146]">Engineered to Convert</span>
                </h3>
                <p className="text-slate-300 text-sm sm:text-base font-normal max-w-xl">
                  We built our framework around deep operator routing relationships, maximizing delivery rates while remaining completely within regulatory boundaries.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-[#FE7146]/10 border border-[#FE7146]/20 flex items-center justify-center text-[#FE7146]">
                    <ShieldCheck size={20} />
                  </div>
                  <h4 className="font-display font-black text-base text-white">Compliance-First Setup</h4>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal">
                    Complete DLT template registrations and DND scrub protocols to secure your route placements.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-[#FE7146]/10 border border-[#FE7146]/20 flex items-center justify-center text-[#FE7146]">
                    <Gauge size={20} />
                  </div>
                  <h4 className="font-display font-black text-base text-white">Operator-Direct Gateways</h4>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal">
                    Avoid intermediary lag delays. We route campaigns directly to primary telecom pipelines.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-[#FE7146]/10 border border-[#FE7146]/20 flex items-center justify-center text-[#FE7146]">
                    <Zap size={20} />
                  </div>
                  <h4 className="font-display font-black text-base text-white">Automated Trigger Hubs</h4>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal">
                    Instantly deliver cart reminders and VIP drops timed precisely to local purchase triggers.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-[#FE7146]/10 border border-[#FE7146]/20 flex items-center justify-center text-[#FE7146]">
                    <Layers size={20} />
                  </div>
                  <h4 className="font-display font-black text-base text-white">Compressed Copywriting</h4>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal">
                    Unlocking maximum emotional hook within characters limitations without looking cheap.
                  </p>
                </div>

              </div>
            </div>

            {/* Right Stats Grid (Column span 5) */}
            <div className="lg:col-span-5 w-full">
              <div className="grid grid-cols-2 gap-4">
                
                {/* Stat 1 */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center space-y-2 hover:border-[#FE7146]/40 transition-colors group">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block">Average Open Rate</span>
                  <div className="flex items-baseline justify-center gap-0.5">
                    <CountUp end={98} suffix="%" />
                  </div>
                  <p className="text-slate-300 text-[10px]">Read within 5 mins</p>
                </div>

                {/* Stat 2 */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center space-y-2 hover:border-[#FE7146]/40 transition-colors group">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block">Average ROAS</span>
                  <div className="flex items-baseline justify-center gap-0.5">
                    <CountUp end={18.4} decimals={1} suffix="x" />
                  </div>
                  <p className="text-slate-300 text-[10px]">Attributed on campaigns</p>
                </div>

                {/* Stat 3 */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center space-y-2 hover:border-[#FE7146]/40 transition-colors group">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block">Broadcast Concurrency</span>
                  <div className="flex items-baseline justify-center gap-0.5">
                    <CountUp end={100} suffix="k+" />
                  </div>
                  <p className="text-slate-300 text-[10px]">Messages / Minute</p>
                </div>

                {/* Stat 4 */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center space-y-2 hover:border-[#FE7146]/40 transition-colors group">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block">Client Retention</span>
                  <div className="flex items-baseline justify-center gap-0.5">
                    <CountUp end={94} suffix="%" />
                  </div>
                  <p className="text-slate-300 text-[10px]">Strategic partnership</p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 8: PRICING / PACKAGES */}
      <section className="py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-mono font-black text-[#FE7146] tracking-widest uppercase">
              // PREDICTABLE INVESTMENTS
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-[#303360] leading-tight tracking-tight">
              Honest Plans, <span className="text-[#FE7146]">Zero Hidden Fees</span>
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              Transparent packages tailored to your list size and monthly broadcast requirements. All plans include DLT configuration and full strategy support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-5xl mx-auto">
            
            {/* Starter Plan */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/60 shadow-md flex flex-col justify-between text-left relative overflow-hidden">
              <div className="space-y-4">
                <span className="font-mono text-xs text-slate-400 font-extrabold tracking-wider uppercase block">
                  Starter Pack
                </span>
                <h3 className="font-display font-black text-2xl text-[#303360]">Starter</h3>
                <p className="text-slate-500 text-xs">Ideal for growing brands looking to secure opt-in list compliance.</p>
                
                <div className="py-4 border-t border-b border-gray-100 space-y-1">
                  <span className="text-slate-400 text-xs">Starting from</span>
                  <div className="font-mono font-black text-[#303360] text-3xl">
                    ₹15,000<span className="text-xs font-normal text-slate-400">/mo</span>
                  </div>
                </div>

                <ul className="space-y-3 pt-2 text-xs text-slate-600">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#FE7146]" />
                    <span>Up to 10,000 subscribers list</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#FE7146]" />
                    <span>DLT Template Setup & Compliance</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#FE7146]" />
                    <span>Cart Abandonment trigger flow</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#FE7146]" />
                    <span>Monthly optimization review</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => navigate.push('/contact')}
                  className="w-full py-3 bg-[#303360] hover:bg-[#303360]/95 text-white text-xs font-black rounded-xl transition-all uppercase tracking-wider cursor-pointer"
                >
                  Select Starter Plan
                </button>
              </div>
            </div>

            {/* Growth Plan - Featured */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#FE7146] shadow-xl flex flex-col justify-between text-left relative overflow-hidden scale-[1.03]">
              
              {/* Pulsing featured badge */}
              <div className="absolute top-4 right-4 bg-[#FE7146] text-white font-mono text-[9px] font-black uppercase px-2.5 py-1 rounded-full tracking-wider animate-pulse">
                Most Popular
              </div>

              <div className="space-y-4">
                <span className="font-mono text-xs text-[#FE7146] font-extrabold tracking-wider uppercase block">
                  Scale Operations
                </span>
                <h3 className="font-display font-black text-2xl text-[#303360]">Growth</h3>
                <p className="text-slate-500 text-xs font-normal">Our flagship package designed to maximize revenue share attribution.</p>
                
                <div className="py-4 border-t border-b border-gray-100 space-y-1">
                  <span className="text-slate-400 text-xs">Starting from</span>
                  <div className="font-mono font-black text-[#FE7146] text-3xl">
                    ₹35,000<span className="text-xs font-normal text-slate-400">/mo</span>
                  </div>
                </div>

                <ul className="space-y-3 pt-2 text-xs text-slate-600">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#FE7146]" />
                    <span>Up to 50,000 subscribers list</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#FE7146]" />
                    <span>Complete Multi-Branch Automations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#FE7146]" />
                    <span>Weekly Flash Sales campaign management</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#FE7146]" />
                    <span>Advanced A/B Copy testing splits</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#FE7146]" />
                    <span>Dedicated operator route setups</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => navigate.push('/contact')}
                  className="w-full py-3 bg-[#FE7146] hover:bg-[#FE7146]/95 text-white text-xs font-black rounded-xl shadow-md shadow-[#FE7146]/20 transition-all uppercase tracking-wider cursor-pointer"
                >
                  Select Growth Plan
                </button>
              </div>
            </div>

            {/* Scale Plan */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/60 shadow-md flex flex-col justify-between text-left relative overflow-hidden">
              <div className="space-y-4">
                <span className="font-mono text-xs text-slate-400 font-extrabold tracking-wider uppercase block">
                  Enterprise Reach
                </span>
                <h3 className="font-display font-black text-2xl text-[#303360]">Scale</h3>
                <p className="text-slate-500 text-xs font-normal">Custom operator routing for massive corporate and commerce lists.</p>
                
                <div className="py-4 border-t border-b border-gray-100 space-y-1">
                  <span className="text-slate-400 text-xs">Starting from</span>
                  <div className="font-mono font-black text-[#303360] text-3xl">
                    ₹75,000<span className="text-xs font-normal text-slate-400">/mo</span>
                  </div>
                </div>

                <ul className="space-y-3 pt-2 text-xs text-slate-600">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#FE7146]" />
                    <span>Unlimited subscriber lists</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#FE7146]" />
                    <span>Dedicated SLA route concurrency locks</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#FE7146]" />
                    <span>Enterprise ERP/CRM webhooks pipeline</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#FE7146]" />
                    <span>24/7 Priority Emergency support line</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => navigate.push('/contact')}
                  className="w-full py-3 bg-[#303360] hover:bg-[#303360]/95 text-white text-xs font-black rounded-xl transition-all uppercase tracking-wider cursor-pointer"
                >
                  Request Scale Call
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 9: FAQ (Accordion list) */}
      <section className="py-24 bg-[#F5F5FA]/50 border-t border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-mono font-black text-[#FE7146] tracking-widest uppercase">
              // REASSURANCE
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-[#303360] leading-tight tracking-tight">
              Frequently Asked <span className="text-[#FE7146]">Questions</span>
            </h2>
          </div>

          <div className="space-y-4 text-left">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-gray-200/60 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 flex items-center justify-between text-left cursor-pointer transition-colors hover:bg-slate-50/40"
                  >
                    <span className="text-sm sm:text-base font-extrabold text-[#303360] tracking-tight pr-6">
                      {faq.q}
                    </span>
                    <div className={`w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center border border-gray-100 transition-transform text-[#FE7146] ${
                      isOpen ? "rotate-180" : ""
                    }`}>
                      <ChevronDown size={16} />
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
                        <div className="p-5 pt-0 border-t border-gray-50 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                          {faq.a}
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

      {/* SECTION 10: CTA BANNER (Shared style) */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#FE7146] rounded-3xl p-8 sm:p-12 lg:p-16 text-center text-white relative overflow-hidden shadow-2xl">
            
            {/* Grid graphic background */}
            <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.15)_1.5px,transparent_1.5px)] [background-size:20px_20px] opacity-70"></div>
            
            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              <span className="text-xs font-mono font-black tracking-widest text-white/90 uppercase block">
                // IMMEDIATE VELOCITY
              </span>
              <h2 className="font-display font-black text-3xl sm:text-5xl text-white leading-none tracking-tight">
                Ready to Reach Customers in Seconds, Not Days?
              </h2>
              <p className="text-white/90 text-sm sm:text-base font-normal max-w-xl mx-auto">
                Schedule a compliance and opt-in diagnostic session with our mobile team. We will structure registered templates for immediate conversion scaling.
              </p>
              
              <div className="pt-4">
                <button
                  onClick={() => navigate.push('/contact')}
                  className="bg-white hover:bg-slate-50 text-[#FE7146] font-black text-sm px-8 py-4 rounded-xl shadow-lg shadow-black/10 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer inline-flex items-center gap-2"
                >
                  <span>Get a Free SMS Strategy Call</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
