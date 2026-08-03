/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Mail,
  ArrowRight,
  Check,
  ChevronDown,
  ChevronRight,
  Sparkles,
  Users,
  Clock,
  Target,
  BarChart3,
  CheckCircle2,
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
  Workflow
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
interface EmailTab {
  id: string;
  title: string;
  description: string;
  capabilities: string[];
  metric: string;
  metricLabel: string;
  channelTag: string;
}

import { useRouter } from "next/navigation";

export function EmailMarketing() {
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

  // 1. HERO "The Inbox, Working" State & Typing loop
  const [inboxSubject, setInboxSubject] = useState("");
  const [inboxPulse, setInboxPulse] = useState(false);
  const [inboxOpenRate, setInboxOpenRate] = useState(12);
  const [inboxClickRate, setInboxClickRate] = useState(1.5);
  const [inboxDelivered, setInboxDelivered] = useState(92.0);
  const [inboxKey, setInboxKey] = useState(0); // Trigger reload of typing effect

  const fullSubject = "Your cart is waiting: Get 15% off before midnight";

  useEffect(() => {
    // Sequence of animations on interval loop to feel live
    let currentIdx = 0;
    setInboxSubject("");
    setInboxPulse(true);
    setInboxOpenRate(12);
    setInboxClickRate(1.5);
    setInboxDelivered(92.0);

    const pulseTimeout = setTimeout(() => setInboxPulse(false), 1200);

    // Subject lines typing
    const typingInterval = setInterval(() => {
      if (currentIdx < fullSubject.length) {
        setInboxSubject(fullSubject.slice(0, currentIdx + 1));
        currentIdx++;
      } else {
        clearInterval(typingInterval);
        
        // Count up stats
        let startTimestamp: number | null = null;
        const countDuration = 800;
        const step = (timestamp: number) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / countDuration, 1);
          setInboxOpenRate(parseFloat((12 + progress * (46 - 12)).toFixed(0)));
          setInboxClickRate(parseFloat((1.5 + progress * (8.4 - 1.5)).toFixed(1)));
          setInboxDelivered(parseFloat((92.0 + progress * (99.8 - 92.0)).toFixed(1)));

          if (progress < 1) {
            window.requestAnimationFrame(step);
          }
        };
        window.requestAnimationFrame(step);
      }
    }, 40);

    // Ambient loop: restart every 10 seconds
    const loopInterval = setInterval(() => {
      setInboxKey(prev => prev + 1);
    }, 10000);

    return () => {
      clearTimeout(pulseTimeout);
      clearInterval(typingInterval);
      clearInterval(loopInterval);
    };
  }, [inboxKey]);

  // 3. What's Included vertical tabs state
  const [activeTab, setActiveTab] = useState("strategy");
  const emailTabs: EmailTab[] = [
    {
      id: "strategy",
      title: "Strategy & List Segmentation",
      description: "We split your list by purchase behavior, engagement tier, and custom zero-party quiz data. No more generic blasts; every subscriber receives messages keyed to their exact brand lifecycle.",
      capabilities: [
        "RFM (Recency, Frequency, Monetary) Clustering",
        "Zero-Party Preference Profile Captures",
        "Dynamic Engagement Segment Pruning",
        "Predictive Unsubscribe Churn Deflection"
      ],
      metric: "99.2%",
      metricLabel: "Segmentation Accuracy",
      channelTag: "list_demographics"
    },
    {
      id: "design",
      title: "Email Design & Copywriting",
      description: "Lightweight, dark-mode adaptive templates built for immediate reading. We pair conversion-oriented direct-response copy with highly polished typography and clear hero CTAs.",
      capabilities: [
        "Bulletproof Responsive HTML Coding",
        "Dark-Mode Contrast & Image Optimization",
        "Direct-Response Persuasive Copywriting",
        "Polished SVG-First Media Components"
      ],
      metric: "4.8x",
      metricLabel: "Design Click-to-Open Ratio",
      channelTag: "visual_persuasion"
    },
    {
      id: "automation",
      title: "Automation & Drip Campaigns",
      description: "Set and forget subscriber lifecycles. We map multi-tier triggers spanning welcome series, browse/cart abandonments, post-purchase instructions, and winbacks.",
      capabilities: [
        "Multi-Branch Behavioral Workflows",
        "Smart Wait-Step Time Delay Intervals",
        "Dynamic Product Recommendation Feeds",
        "SMS/Push Cross-Channel Synchronization"
      ],
      metric: "62%",
      metricLabel: "Automated Attribution Share",
      channelTag: "lifecycle_automations"
    },
    {
      id: "testing",
      title: "Continuous A/B Testing",
      description: "We test relentlessly. From subject line hooks and preview text headers to send times and CTA button placements, every campaign produces structured behavioral insights.",
      capabilities: [
        "Statistical Significance Verification",
        "Multi-Armed Bandit Subject Testing",
        "A/B/C Body Copy and Visual Layout Split-Tests",
        "Dynamic Send-Time Optimization Blocks"
      ],
      metric: "+34%",
      metricLabel: "CTR Performance Boost",
      channelTag: "scientific_testing"
    },
    {
      id: "deliverability",
      title: "Deliverability Optimization",
      description: "Avoid the dreaded spam folder. We configure rigorous SPF, DKIM, DMARC, and BIMI records, manage clean domain reputation pools, and execute active list hygiene scripts.",
      capabilities: [
        "Technical DNS Records Setup & Audits",
        "Inbox Placement Seed-List Tracking",
        "Spam-Filter Trigger Word Screening",
        "Hard-Bounce Cleanup & Opt-out Purity"
      ],
      metric: "99.8%",
      metricLabel: "Average Placement Score",
      channelTag: "reputation_monitoring"
    },
    {
      id: "newsletter",
      title: "Newsletter Management",
      description: "Build an active, loyal publication asset. We produce high-value weekly newsletters that subscribers genuinely open, creating permanent organic brand equity.",
      capabilities: [
        "Cohesive Editorial Content Strategy",
        "Sponsorship and Co-marketing Integrations",
        "Subscriber Acquisition Popups Setup",
        "Interactive Reader Feedback Surveys"
      ],
      metric: "48%",
      metricLabel: "Consistent Open Rates",
      channelTag: "editorial_broadcasts"
    },
    {
      id: "reporting",
      title: "Analytics & Reporting",
      description: "Clear attribution logs. We integrate with Shopify, Salesforce, or Google Analytics to map campaign revenue back to specific flows, lists, and newsletters.",
      capabilities: [
        "Dynamic Revenue-per-Recipient Graphs",
        "Detailed Offline Lifetime Value Maps",
        "Flow Health Degradation Alerts",
        "Attribution Integrity Auditing blocks"
      ],
      metric: "100%",
      metricLabel: "Margin Integrity",
      channelTag: "revenue_attribution"
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
      title: "Audit & List Strategy",
      desc: "Reputation screening, historical segmentation diagnosis, and deep list health scrubs to prune inactive emails.",
      status: "reputation_audit"
    },
    {
      num: "02",
      title: "Design & Copy",
      desc: "Visual mockup assets coding, dark-mode rendering verifications, and high-impact subject line matrices.",
      status: "creative_rendering"
    },
    {
      num: "03",
      title: "Automation Build",
      desc: "Pixel logic deployment, database trigger synchronizations, and smart delay timers sequencing.",
      status: "workflow_integration"
    },
    {
      num: "04",
      title: "Test & Launch",
      desc: "Litmus compatibility check, subject line bandit test setup, and seed-list placement tracking.",
      status: "inbox_seeding"
    },
    {
      num: "05",
      title: "Analyze & Optimize",
      desc: "Attributed margin accounting, automatic list purging, and dynamic flow split optimizations.",
      status: "revenue_scale"
    }
  ];

  // 5. Automation Flow Visualizer & Scrubber Chart State
  const [scrubPercent, setScrubPercent] = useState(0.6); // default 60%
  const [activeStepId, setActiveStepId] = useState("trigger"); // currently glowing node id
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  // Timeline attributed results data
  const growthTimelineData = [
    { month: "Month 1", openRate: 24, ctr: 2.8, revenue: 35000 },
    { month: "Month 2", openRate: 28, ctr: 3.4, revenue: 58000 },
    { month: "Month 3", openRate: 33, ctr: 4.1, revenue: 84000 },
    { month: "Month 4", openRate: 38, ctr: 4.8, revenue: 115000 },
    { month: "Month 5", openRate: 41, ctr: 5.5, revenue: 165000 },
    { month: "Month 6", openRate: 44, ctr: 6.2, revenue: 210000 },
    { month: "Month 7", openRate: 46, ctr: 7.0, revenue: 260000 },
    { month: "Month 8", openRate: 49, ctr: 7.6, revenue: 312000 },
  ];

  const maxTimelineIdx = growthTimelineData.length - 1;
  const activeTimelineIdx = Math.min(
    maxTimelineIdx,
    Math.max(0, Math.floor(scrubPercent * (maxTimelineIdx + 1)))
  );
  const activeTimelinePoint = growthTimelineData[activeTimelineIdx];

  // Draggable Scrubber Logic
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

  // Flow Nodes representation for animation loops
  useEffect(() => {
    const steps = ["trigger", "email1", "wait", "email2", "branch", "email3a", "email3b"];
    let i = 0;
    const interval = setInterval(() => {
      setActiveStepId(steps[i]);
      i = (i + 1) % steps.length;
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  // 9. FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const faqs = [
    {
      q: "Do you provide the email list, or do we?",
      a: "We never provide or rent third-party lists, as cold-email blasts violate SPAM regulations, harm domain deliverability, and drive poor ROI. Instead, we audit your existing customer base, opt-in records, and configure high-converting capture boxes on your website to organically build a compliant database of warm prospects."
    },
    {
      q: "Which email platforms do you work with?",
      a: "We are platform-agnostic specialists. We build and optimize environments inside Klaviyo, Mailchimp, ActiveCampaign, HubSpot, Salesforce Marketing Cloud, and Braze. We handle everything from complete platform migrations to DNS record updates and webhook API configurations."
    },
    {
      q: "How do you ensure emails don't land in spam?",
      a: "We implement a strict technical hygiene protocol. We set up SPF, DKIM, and DMARC alignments, and optimize BIMI branding records. We execute automated daily list scrubs to suppress hard bounces, screen subject lines against spam-filter algorithms, and warm up sending IPs incrementally on strict schedules."
    },
    {
      q: "Can you set up automations for an existing store/website?",
      a: "Absolutely. We specialize in deep integrations with Shopify, WooCommerce, Magento, and custom React applications. We synchronize live browser pixels, checkout event models, and customer purchase histories to deploy multi-tiered, trigger-based flows instantly."
    }
  ];

  return (
    <div className="pt-24 bg-white selection:bg-[#FE7146] selection:text-white">
      
      {/* SECTION 1: HERO - "The Inbox, Working" */}
      <section className="relative min-h-[90vh] flex items-center justify-center py-16 overflow-hidden bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Info Column */}
            <div className="lg:col-span-5 text-left space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFF1EC] border border-[#FE7146]/20 rounded-full">
                <Mail className="w-3.5 h-3.5 text-[#FE7146]" />
                <span className="text-[10px] sm:text-xs font-mono font-black tracking-widest text-[#FE7146] uppercase">
                  // EMAIL MARKETING
                </span>
              </div>

              <h1 className="font-display font-black text-4xl sm:text-5xl text-[#303360] tracking-tight leading-[1.1]">
                The Channel You Own.<br />
                The Results You Can <span className="text-[#FE7146]">Predict.</span>
              </h1>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal max-w-xl">
                Bypass social algorithm locks and pay-to-play click loops. We design conversion-focused email segments and automated journeys that generate sustainable margin growth on autopilot.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                <button
                  onClick={() => navigate.push('/contact')}
                  className="w-full sm:w-auto bg-[#FE7146] hover:bg-[#FE7146]/95 text-white font-black text-sm px-8 py-4 rounded-xl shadow-lg shadow-[#FE7146]/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Get a Free Email Audit</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="#automation-flows"
                  className="w-full sm:w-auto bg-slate-50 hover:bg-slate-100 text-[#303360] font-black text-sm px-8 py-4 rounded-xl border border-gray-200/60 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>See Automation Flows</span>
                </a>
              </div>
            </div>

            {/* Hero Right: Email Marketing Dashboard Image */}
            <div className="lg:col-span-7 flex justify-center w-full">
              <div className="w-full relative">
                <img
                  src="https://res.cloudinary.com/dqjlffxja/image/upload/f_auto,q_auto/v1783790036/EMAIL_MARKETING_ssxzcr.jpg"
                  alt="Email marketing campaign dashboard"
                  className="relative w-full h-auto rounded-3xl"
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
              "The best email isn't the loudest. <span className="text-[#FE7146] underline decoration-dashed decoration-2 underline-offset-8">It's the one sent at the right moment.</span>"
            </p>
            <cite className="block font-mono text-xs sm:text-sm font-bold text-slate-400 tracking-wider uppercase">
              — ANALYTICS CLOUDS LUMINARY ESSENTIAL
            </cite>
          </blockquote>
        </div>
      </section>

      {/* SECTION 3: WHAT'S INCLUDED */}
      <section className="py-24 bg-[#F5F5FA]/50 border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-mono font-black text-[#FE7146] tracking-widest uppercase">
              // COMPLETE OVERWATCH
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-[#303360] leading-tight tracking-tight">
              An Integrated <span className="text-[#FE7146]">Retention Protocol</span>
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              We coordinate technical DNS alignment, visual design grids, direct copywriting structures, and customer lifecycle triggers.
            </p>
          </div>

          {/* DESKTOP VIEW: Sidebar Vertical Tabs */}
          <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Vertical Tabs list */}
            <div className="lg:col-span-4 space-y-2">
              {emailTabs.map((tab) => {
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
                        {tab.id === "strategy" && <Users size={14} />}
                        {tab.id === "design" && <Inbox size={14} />}
                        {tab.id === "automation" && <Send size={14} />}
                        {tab.id === "testing" && <Split size={14} />}
                        {tab.id === "deliverability" && <Gauge size={14} />}
                        {tab.id === "newsletter" && <Layers size={14} />}
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

            {/* Right Content Panel */}
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                {emailTabs.map((tab) => {
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
            {emailTabs.map((tab) => {
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
                        {tab.id === "strategy" && <Users size={14} />}
                        {tab.id === "design" && <Inbox size={14} />}
                        {tab.id === "automation" && <Send size={14} />}
                        {tab.id === "testing" && <Split size={14} />}
                        {tab.id === "deliverability" && <Gauge size={14} />}
                        {tab.id === "newsletter" && <Layers size={14} />}
                        {tab.id === "reporting" && <BarChart3 size={14} />}
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
              // METHODICAL RIGOR
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-[#303360] leading-tight tracking-tight">
              Campaign Deployment <span className="text-[#FE7146]">Structured Lifecycle</span>
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              We treat list health and inbox placements as a rigorous sequence. Our 5-stage setup guarantees reputation alignment prior to full launches.
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

      {/* SECTION 5: AUTOMATION FLOW VISUALIZER (Signature interactive moment) */}
      <section id="automation-flows" className="py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-mono font-black text-[#FE7146] tracking-widest uppercase">
              // IT RUNS ITSELF
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-[#303360] leading-tight tracking-tight">
              See an <span className="text-[#FE7146]">Automation Flow</span> in Action
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              We build branch-logic loops that dynamically adapt to customer signals. Trace a customer's journey as they abandon a checkout and return with a discount.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch max-w-6xl mx-auto">
            
            {/* Left Flowchart Interactive Block (Column span 7) */}
            <div className="lg:col-span-7 bg-[#303360] text-white rounded-3xl p-6 sm:p-8 border border-white/5 shadow-2xl relative overflow-hidden flex flex-col justify-between">
              <div className="absolute inset-0 bg-[radial-gradient(rgba(254,113,70,0.05)_1px,transparent_1px)] [background-size:16px_16px]"></div>
              
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6 relative z-10">
                <div className="flex items-center gap-2">
                  <Workflow className="w-4 h-4 text-[#FE7146] animate-spin" />
                  <span className="font-mono text-xs font-extrabold tracking-wider">RETENTION_PIPELINE_ENGINE</span>
                </div>
                <span className="text-[9px] font-mono text-slate-400 uppercase bg-white/5 px-2 py-0.5 rounded">
                  Status: Running
                </span>
              </div>

              {/* Dynamic Diagram Grid Map */}
              <div className="space-y-5 relative z-10">
                
                {/* Stage 1 Trigger */}
                <div className="flex items-center gap-4">
                  <div className={`p-3.5 rounded-2xl text-xs font-mono font-black transition-all ${
                    activeStepId === "trigger"
                      ? "bg-[#FE7146] text-white scale-[1.03] shadow-lg shadow-[#FE7146]/20"
                      : "bg-white/5 text-slate-300 border border-white/10"
                  }`}>
                    <Zap className="w-4 h-4 inline mr-1.5" />
                    <span>Cart Abandoned Trigger</span>
                  </div>
                  <div className="h-0.5 flex-grow border-t-2 border-dashed border-white/10 relative">
                    <span className={`absolute top-1/2 left-0 w-2 h-2 rounded-full bg-[#FE7146] -translate-y-1/2 ${
                      activeStepId === "trigger" ? "animate-ping left-[80%]" : "hidden"
                    }`}></span>
                  </div>
                </div>

                {/* Stage 2 Welcome mail */}
                <div className="flex items-center gap-4">
                  <div className={`p-3.5 rounded-2xl text-xs font-mono font-black transition-all ${
                    activeStepId === "email1"
                      ? "bg-[#FE7146] text-white scale-[1.03] shadow-lg shadow-[#FE7146]/20"
                      : "bg-white/5 text-slate-300 border border-white/10"
                  }`}>
                    <Mail className="w-4 h-4 inline mr-1.5" />
                    <span>Email 1: Friendly Reminder</span>
                  </div>
                  <div className="h-0.5 flex-grow border-t-2 border-dashed border-white/10 relative">
                    <span className={`absolute top-1/2 left-0 w-2 h-2 rounded-full bg-[#FE7146] -translate-y-1/2 ${
                      activeStepId === "email1" ? "animate-ping left-[80%]" : "hidden"
                    }`}></span>
                  </div>
                </div>

                {/* Stage 3 Wait state & branch */}
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-4">
                    <div className={`p-3 rounded-2xl text-[11px] font-mono font-black text-center transition-all ${
                      activeStepId === "wait"
                        ? "bg-[#FE7146] text-white scale-[1.03] shadow-lg shadow-[#FE7146]/20"
                        : "bg-white/5 text-slate-300 border border-white/10"
                    }`}>
                      <Clock className="w-3.5 h-3.5 inline mr-1" />
                      <span>Wait 2 Days</span>
                    </div>
                  </div>
                  <div className="col-span-2 flex items-center justify-center">
                    <div className="h-[2px] w-full bg-white/10"></div>
                  </div>
                  <div className="col-span-6">
                    <div className={`p-3 rounded-2xl text-[11px] font-mono font-black text-center transition-all ${
                      activeStepId === "branch"
                        ? "bg-[#FE7146] text-white scale-[1.03] shadow-lg shadow-[#FE7146]/20"
                        : "bg-white/5 text-slate-300 border border-white/10"
                    }`}>
                      <Split className="w-3.5 h-3.5 inline mr-1" />
                      <span>Branch: Opened?</span>
                    </div>
                  </div>
                </div>

                {/* Split branching lines */}
                <div className="grid grid-cols-2 gap-4 pt-1">
                  
                  {/* Left branch */}
                  <div className="space-y-3">
                    <div className="h-5 border-l-2 border-r-0 border-dashed border-white/10 mx-auto w-1 text-center relative">
                      <span className="text-[8px] font-mono text-slate-400 absolute -top-1.5 -left-4">YES</span>
                      <span className={`absolute left-[-2px] top-1/2 w-2.5 h-2.5 rounded-full bg-[#FE7146] ${
                        activeStepId === "branch" ? "animate-ping top-[80%]" : "hidden"
                      }`}></span>
                    </div>
                    <div className={`p-3 rounded-2xl text-[10px] font-mono font-black text-center transition-all ${
                      activeStepId === "email3a"
                        ? "bg-[#FE7146] text-white scale-[1.03]"
                        : "bg-white/5 text-slate-300 border border-white/10"
                    }`}>
                      <span>Email 2A: Social Proof Review</span>
                    </div>
                  </div>

                  {/* Right branch */}
                  <div className="space-y-3">
                    <div className="h-5 border-l-2 border-r-0 border-dashed border-white/10 mx-auto w-1 text-center relative">
                      <span className="text-[8px] font-mono text-slate-400 absolute -top-1.5 -left-3">NO</span>
                      <span className={`absolute left-[-2px] top-1/2 w-2.5 h-2.5 rounded-full bg-[#FE7146] ${
                        activeStepId === "branch" ? "animate-ping top-[80%]" : "hidden"
                      }`}></span>
                    </div>
                    <div className={`p-3 rounded-2xl text-[10px] font-mono font-black text-center transition-all ${
                      activeStepId === "email3b"
                        ? "bg-[#FE7146] text-white scale-[1.03]"
                        : "bg-white/5 text-slate-300 border border-white/10"
                    }`}>
                      <span>Email 2B: 15% Incentive Block</span>
                    </div>
                  </div>

                </div>

              </div>

              {/* Status Footer indicator */}
              <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-slate-400 relative z-10">
                <span>CONVERSION_BURST: ENABLED</span>
                <span className="text-emerald-400 animate-pulse">● Live Engine Running</span>
              </div>
            </div>

            {/* Right Attributed Growth Chart (Column span 5) */}
            <div className="lg:col-span-5 flex flex-col justify-between bg-slate-50 border border-gray-100 rounded-3xl p-6 sm:p-8 text-left shadow-md">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#FFF1EC] border border-[#FE7146]/10 rounded-full">
                  <span className="w-1.5 h-1.5 bg-[#FE7146] rounded-full"></span>
                  <span className="text-[9px] font-mono font-black text-[#FE7146] uppercase">ATTRIBUTION_LEDGER</span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-display font-extrabold text-xl text-[#303360]">
                    Attributed Growth Scrubber
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Drag the playhead handle to track retention yield increases across months of ongoing deliverability scrubs and testing.
                  </p>
                </div>

                {/* Readout parameters block */}
                <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm space-y-3.5 mt-2">
                  <div className="flex justify-between items-center border-b border-gray-50 pb-2">
                    <span className="font-mono text-xs font-black text-[#303360] uppercase">
                      {activeTimelinePoint.month}
                    </span>
                    <span className="text-[9px] font-mono text-slate-400 font-bold">
                      DELIVERY: 99.8%
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[8px] font-mono text-slate-400 block uppercase font-bold">Avg. Open Rate</span>
                      <span className="font-mono text-lg font-black text-[#303360]">
                        {activeTimelinePoint.openRate}%
                      </span>
                    </div>
                    <div>
                      <span className="text-[8px] font-mono text-slate-400 block uppercase font-bold">Attributed Click Rate</span>
                      <span className="font-mono text-lg font-black text-[#303360]">
                        {activeTimelinePoint.ctr}%
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-gray-50 flex items-center justify-between">
                    <span className="text-[9px] font-mono text-slate-400 font-bold uppercase">Attributed Revenue</span>
                    <span className="font-mono text-sm font-black text-[#FE7146]">
                      ₹{(activeTimelinePoint.revenue / 1000).toFixed(0)}K
                    </span>
                  </div>
                </div>

                {/* Draggable Scrubber track */}
                <div className="pt-6">
                  <div
                    ref={chartContainerRef}
                    onMouseDown={handleMouseDown}
                    onTouchStart={handleTouchStart}
                    className="relative h-6 bg-slate-200/60 rounded-full border border-gray-200 cursor-ew-resize flex items-center"
                  >
                    {/* Fill line progress */}
                    <div
                      className="absolute left-0 top-0 h-full bg-[#FFF1EC] rounded-l-full"
                      style={{ width: `${scrubPercent * 100}%` }}
                    ></div>

                    {/* Timeline labels mapped */}
                    <div className="absolute inset-x-0 top-0 h-full flex justify-between px-3 items-center pointer-events-none">
                      <span className="text-[8px] font-mono font-bold text-slate-400">M1</span>
                      <span className="text-[8px] font-mono font-bold text-slate-400">M4</span>
                      <span className="text-[8px] font-mono font-bold text-slate-400">M8</span>
                    </div>

                    {/* Dragger circle handle */}
                    <div
                      className="absolute w-8 h-8 rounded-full bg-white border-2 border-[#FE7146] shadow-md flex items-center justify-center -ml-4 transition-transform duration-75 active:scale-110 cursor-grab"
                      style={{ left: `${scrubPercent * 100}%` }}
                    >
                      <ChevronRight className="w-4 h-4 text-[#FE7146] -mr-1" />
                    </div>

                  </div>
                  <div className="text-center mt-2">
                    <span className="text-[8px] font-mono text-slate-400 uppercase tracking-widest font-bold">
                      ← Slide handle left or right to inspect →
                    </span>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 6: SUBJECT LINE A/B TEST SHOWCASE */}
      <section className="py-20 bg-[#F5F5FA]/50 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FFF1EC] border border-[#FE7146]/10 rounded-full">
            <Split className="w-3.5 h-3.5 text-[#FE7146]" />
            <span className="text-[10px] font-mono font-black tracking-widest text-[#FE7146] uppercase">
              A/B TEST CASE STUDY
            </span>
          </div>
          
          <div className="space-y-2">
            <h2 className="font-display font-black text-2xl sm:text-3xl text-[#303360] tracking-tight">
              Relentless Split Testing is the Secret to Return-on-Investment
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm max-w-2xl mx-auto">
              We never guess what hooks click. We run scientific multi-armed bandit scenarios on subject text lines to maximize click attribution values.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto pt-4 text-left">
            
            {/* Variant A */}
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
              <span className="absolute top-2 right-3 text-[10px] font-mono font-extrabold text-slate-400">VARIANT_A</span>
              <div className="space-y-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-slate-300"></span>
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">Subject:</span>
                </div>
                <p className="text-xs font-mono font-bold text-slate-600 truncate">
                  "Check out our new season product line drops now!"
                </p>
                <div className="pt-3 border-t border-gray-50 flex items-center justify-between">
                  <span className="text-[9px] font-mono text-slate-400">Open Rate:</span>
                  <span className="text-xs font-mono font-extrabold text-slate-600">18.2%</span>
                </div>
              </div>
            </div>

            {/* Variant B - Winner */}
            <div className="bg-white p-5 rounded-2xl border-2 border-[#FE7146] shadow-md relative overflow-hidden">
              <span className="absolute top-2 right-3 text-[9px] font-mono font-black text-[#FE7146] bg-[#FFF1EC] px-1.5 rounded">WINNER</span>
              <div className="space-y-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#FE7146] animate-pulse"></span>
                  <span className="text-[10px] font-mono font-bold text-[#FE7146] uppercase">Subject:</span>
                </div>
                <p className="text-xs font-mono font-bold text-[#303360] truncate">
                  "Only 3 left in stock: Your summer cart is expiring"
                </p>
                <div className="pt-3 border-t border-gray-50 flex items-center justify-between">
                  <span className="text-[9px] font-mono text-slate-400">Open Rate:</span>
                  <span className="text-xs font-mono font-extrabold text-[#FE7146]">+44.6% open rates</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 7: WHY CHOOSE US FOR EMAIL MARKETING - Split Stat / Differentiator Band */}
      <section className="py-24 bg-[#303360] text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.02)_1.5px,transparent_1.5px)] [background-size:24px_24px]"></div>
        <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] rounded-full bg-[#FE7146]/5 blur-3xl -translate-y-1/2"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Differentiators Column */}
            <div className="text-left space-y-8">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
                  <Inbox className="w-3.5 h-3.5 text-[#FE7146]" />
                  <span className="text-[10px] sm:text-xs font-mono font-black tracking-widest text-[#FE7146] uppercase">
                    // CORE CAPABILITIES
                  </span>
                </div>
                <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tight leading-tight">
                  No Spam Blasts.<br /> Just clean, <span className="text-[#FE7146]">scalable flow math.</span>
                </h2>
                <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-normal">
                  We run email like a direct financial asset. We scrub bad entries, configure precise technical deliverability records, and design custom conversion loops.
                </p>
              </div>

              {/* Icons list cards */}
              <div className="space-y-4">
                
                {/* 1 */}
                <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#FE7146] shrink-0 border border-white/10">
                    <Users size={18} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-display font-extrabold text-sm text-white">Segmentation-First Strategy</h4>
                    <p className="text-xs text-slate-400 leading-normal">
                      We target exact behavioral buyer groupings, preventing list degradation and unsubscribe spikes.
                    </p>
                  </div>
                </div>

                {/* 2 */}
                <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#FE7146] shrink-0 border border-white/10">
                    <Gauge size={18} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-display font-extrabold text-sm text-white">Deliverability-Focused Setup</h4>
                    <p className="text-xs text-slate-400 leading-normal">
                      Rigorous technical DNS audits, SPF validations, and spam-screen sweeps to maximize placement.
                    </p>
                  </div>
                </div>

                {/* 3 */}
                <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#FE7146] shrink-0 border border-white/10">
                    <Split size={18} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-display font-extrabold text-sm text-white">Continuous A/B Testing</h4>
                    <p className="text-xs text-slate-400 leading-normal">
                      Constant multi-armed subject-line optimizations to scale margins dynamically on schedules.
                    </p>
                  </div>
                </div>

                {/* 4 */}
                <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#FE7146] shrink-0 border border-white/10">
                    <Zap size={18} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-display font-extrabold text-sm text-white">Full-Funnel Automation Design</h4>
                    <p className="text-xs text-slate-400 leading-normal">
                      Custom, branch-logic sequences spanning abandonments, winbacks, and loyalty collections.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Right 2x2 Stats Grid Column */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Stat 1 */}
              <div className="bg-white/5 border border-white/10 hover:border-[#FE7146]/30 p-6 sm:p-8 rounded-3xl text-left transition-all hover:scale-[1.02] duration-300 relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FE7146]/0 via-[#FE7146]/0 to-[#FE7146]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="space-y-2">
                  <CountUp end={38.4} suffix="%" decimals={1} />
                  <h4 className="font-display font-extrabold text-sm text-white">Avg. Open Rate Achieved</h4>
                  <p className="text-xs text-slate-400 leading-normal font-normal">
                    Industry average hovers at a static 18.5%. Our testing loops push higher attention capturing.
                  </p>
                </div>
              </div>

              {/* Stat 2 */}
              <div className="bg-white/5 border border-white/10 hover:border-[#FE7146]/30 p-6 sm:p-8 rounded-3xl text-left transition-all hover:scale-[1.02] duration-300 relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FE7146]/0 via-[#FE7146]/0 to-[#FE7146]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="space-y-2">
                  <CountUp end={5.8} suffix="%" decimals={1} />
                  <h4 className="font-display font-extrabold text-sm text-white">Avg. Click-Through Rate</h4>
                  <p className="text-xs text-slate-400 leading-normal font-normal">
                    Higher clicking yields due to direct responsive grid alignments and high-intent copy loops.
                  </p>
                </div>
              </div>

              {/* Stat 3 */}
              <div className="bg-white/5 border border-white/10 hover:border-[#FE7146]/30 p-6 sm:p-8 rounded-3xl text-left transition-all hover:scale-[1.02] duration-300 relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FE7146]/0 via-[#FE7146]/0 to-[#FE7146]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="space-y-2">
                  <CountUp end={1.2} suffix="M+" decimals={1} />
                  <h4 className="font-display font-extrabold text-sm text-white">Emails Delivered Monthly</h4>
                  <p className="text-xs text-slate-400 leading-normal font-normal">
                    Secure programmatic pipelines scaled perfectly under strict IP warming safety rules.
                  </p>
                </div>
              </div>

              {/* Stat 4 */}
              <div className="bg-white/5 border border-white/10 hover:border-[#FE7146]/30 p-6 sm:p-8 rounded-3xl text-left transition-all hover:scale-[1.02] duration-300 relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FE7146]/0 via-[#FE7146]/0 to-[#FE7146]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="space-y-2">
                  <CountUp end={96} suffix="%" />
                  <h4 className="font-display font-extrabold text-sm text-white">Client Retention Rate</h4>
                  <p className="text-xs text-slate-400 leading-normal font-normal">
                    Our clients scale with us. Attribution reports provide clear margin accounting logs.
                  </p>
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
              // TRANSPARENT PACKAGES
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-[#303360] leading-tight tracking-tight">
              Honest, <span className="text-[#FE7146]">ROI-Focused Pricing</span>
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              No hidden fees. Pick a tier mapped perfectly to your current list size and monthly volume.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start max-w-6xl mx-auto">
            
            {/* Tier 1: Starter */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl space-y-6 text-left hover:border-gray-200 transition-all">
              <div className="space-y-2">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block">
                  CAP_LIMIT: UP TO 10,000 LIST
                </span>
                <h3 className="font-display font-extrabold text-2xl text-[#303360]">Email Starter</h3>
                <p className="text-xs text-slate-500 leading-normal">
                  Ideal for growing stores and localized businesses needing automated workflows setup.
                </p>
              </div>

              <div className="border-t border-b border-gray-50 py-4">
                <span className="text-xs font-mono text-slate-400 uppercase">Pricing from</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="font-mono font-black text-3xl text-[#303360]">₹25,000</span>
                  <span className="text-xs font-mono text-slate-400">/ month</span>
                </div>
              </div>

              <ul className="space-y-3">
                {[
                  "Welcome Journey flow design",
                  "Cart Abandonment sequence setup",
                  "Up to 4 monthly editorial campaigns",
                  "Standard list cleanup scrubs",
                  "Looker Studio monthly report updates"
                ].map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-600">
                    <Check className="w-4 h-4 text-[#FE7146] shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => navigate.push('/contact')}
                className="w-full bg-slate-50 hover:bg-slate-100 text-[#303360] font-black text-xs py-3.5 rounded-xl border border-gray-100 transition-all cursor-pointer text-center"
              >
                Get Started
              </button>
            </div>

            {/* Tier 2: Growth (Elevated Middle) */}
            <div className="bg-white p-8 rounded-3xl border-2 border-[#FE7146] shadow-2xl space-y-6 text-left relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-[#FE7146] text-white text-[9px] font-mono font-black px-2.5 py-1 rounded-full uppercase tracking-wider animate-pulse">
                Most Popular
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-mono font-bold text-[#FE7146] uppercase tracking-widest block">
                  CAP_LIMIT: UP TO 50,000 LIST
                </span>
                <h3 className="font-display font-extrabold text-2xl text-[#303360]">Retention Growth</h3>
                <p className="text-xs text-slate-500 leading-normal">
                  Perfect for established brands needing ongoing list splits, behavior branches, and campaigns.
                </p>
              </div>

              <div className="border-t border-b border-gray-50 py-4">
                <span className="text-xs font-mono text-[#FE7146] uppercase">Pricing from</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="font-mono font-black text-4xl text-[#FE7146]">₹45,000</span>
                  <span className="text-xs font-mono text-slate-400">/ month</span>
                </div>
              </div>

              <ul className="space-y-3">
                {[
                  "Advanced multi-branch checkout flows",
                  "RFM loyalty & lapsed segments triggers",
                  "Up to 8 monthly campaign newsletters",
                  "RELENTLESS subject line split tests",
                  "Technical deliverability record setups",
                  "Looker Studio bi-weekly reporting runs"
                ].map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-600">
                    <Check className="w-4 h-4 text-[#FE7146] shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => navigate.push('/contact')}
                className="w-full bg-[#FE7146] hover:bg-[#FE7146]/95 text-white font-black text-xs py-3.5 rounded-xl shadow-lg shadow-[#FE7146]/15 transition-all cursor-pointer text-center"
              >
                Inquire For Growth
              </button>
            </div>

            {/* Tier 3: Scale */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl space-y-6 text-left hover:border-gray-200 transition-all">
              <div className="space-y-2">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block">
                  CAP_LIMIT: 50,000+ LIST
                </span>
                <h3 className="font-display font-extrabold text-2xl text-[#303360]">Enterprise Scale</h3>
                <p className="text-xs text-slate-500 leading-normal">
                  Designed for high-volume stores needing dedicated IP reputation monitors and custom webhooks.
                </p>
              </div>

              <div className="border-t border-b border-gray-50 py-4">
                <span className="text-xs font-mono text-slate-400 uppercase">Pricing from</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="font-mono font-black text-3xl text-[#303360]">₹85,000</span>
                  <span className="text-xs font-mono text-slate-400">/ month</span>
                </div>
              </div>

              <ul className="space-y-3">
                {[
                  "Omnipresent SMS / Email synced campaigns",
                  "Dynamic zero-party quiz branch workflows",
                  "Unlimited newsletter editorial broadcasts",
                  "Dedicated IP reputation warms & audits",
                  "Custom Shopify custom webhook mappings",
                  "Dedicated senior account strategist blocks"
                ].map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-600">
                    <Check className="w-4 h-4 text-[#FE7146] shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => navigate.push('/contact')}
                className="w-full bg-slate-50 hover:bg-slate-100 text-[#303360] font-black text-xs py-3.5 rounded-xl border border-gray-100 transition-all cursor-pointer text-center"
              >
                Inquire For Scale
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 9: FAQ */}
      <section className="py-24 bg-[#F5F5FA]/50 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-mono font-black text-[#FE7146] tracking-widest uppercase">
              // ANSWERS & DOCUMENTATION
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-[#303360] tracking-tight leading-tight">
              Frequently Asked <span className="text-[#FE7146]">Inquiries</span>
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm">
              Clear technical responses regarding our retentive list setups and email marketing strategies.
            </p>
          </div>

          <div className="space-y-3 max-w-3xl mx-auto">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className="bg-white rounded-2xl border border-gray-150 overflow-hidden shadow-sm">
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 flex items-center justify-between text-left cursor-pointer hover:bg-slate-50 transition-colors"
                  >
                    <span className="text-sm sm:text-base font-extrabold text-[#303360] tracking-tight pr-6">
                      {faq.q}
                    </span>
                    <div className={`w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center border border-gray-100 shrink-0 transition-transform ${
                      isOpen ? "rotate-180 text-[#FE7146]" : "text-slate-400"
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
                        <div className="p-5 pt-0 border-t border-gray-100 text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
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

      {/* SECTION 10: CTA BANNER */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#FE7146] rounded-3xl p-8 sm:p-12 text-center text-white relative overflow-hidden shadow-xl shadow-[#FE7146]/20">
            <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1.5px,transparent_1.5px)] [background-size:20px_20px] opacity-75"></div>
            <div className="absolute -top-1/2 -right-1/4 w-[400px] h-[400px] rounded-full bg-white/5 blur-3xl"></div>
            
            <div className="max-w-2xl mx-auto space-y-6 relative z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full border border-white/20">
                <Sparkles className="w-3.5 h-3.5 text-white animate-spin" />
                <span className="text-[10px] font-mono tracking-widest font-black text-white uppercase">
                  ZERO_RISK_AUDIT
                </span>
              </div>
              
              <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tight leading-none text-white">
                Ready to Turn Your Email List Into Predictable Revenue?
              </h2>
              
              <p className="text-white/80 text-xs sm:text-sm leading-relaxed font-normal">
                Let us audit your current flows, deliverability records, and segmentation splits. We will present you with three concrete margin leaks we can fix in your welcome path.
              </p>

              <div className="pt-2 flex justify-center">
                <button
                  onClick={() => navigate.push('/contact')}
                  className="bg-white hover:bg-slate-50 text-[#FE7146] font-black text-xs sm:text-sm px-8 py-4 rounded-xl shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer uppercase tracking-wider"
                >
                  Get a Free Email Audit
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
