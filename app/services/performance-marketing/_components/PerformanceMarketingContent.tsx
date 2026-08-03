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
  Check,
  ChevronDown,
  ChevronRight,
  Sparkles,
  Award,
  Users,
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
  HelpCircle,
  TrendingDown,
  LineChart,
  Activity,
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
interface PerformanceTab {
  id: string;
  title: string;
  description: string;
  capabilities: string[];
  metric: string;
  metricLabel: string;
  channelTag: string;
}

// 1. HERO ANIMATED FUNNEL COMPONENT
function AnimatedFunnel() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [counters, setCounters] = useState({
    impressions: 1245042,
    clicks: 142518,
    leads: 8244,
    conversions: 1722,
    roas: 1.0,
  });

  // ROAS count-up triggers on load
  useEffect(() => {
    let startTimestamp: number | null = null;
    const duration = 1500;
    const targetRoas = 4.8;
    
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCounters((prev) => ({
        ...prev,
        roas: parseFloat((progress * targetRoas).toFixed(1)),
      }));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCounters((prev) => ({ ...prev, roas: targetRoas }));
      }
    };
    window.requestAnimationFrame(step);
  }, []);

  // Ambient counter increments
  useEffect(() => {
    const timer = setInterval(() => {
      setCounters((prev) => {
        const impAdd = Math.floor(Math.random() * 5) + 1;
        const clkAdd = Math.random() > 0.4 ? 1 : 0;
        const ldAdd = Math.random() > 0.85 ? 1 : 0;
        const convAdd = Math.random() > 0.96 ? 1 : 0;
        return {
          ...prev,
          impressions: prev.impressions + impAdd,
          clicks: prev.clicks + clkAdd,
          leads: prev.leads + ldAdd,
          conversions: prev.conversions + convAdd,
        };
      });
    }, 1200);

    return () => clearInterval(timer);
  }, []);

  // HTML5 Canvas for particles flow
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    // Particle representation
    interface Particle {
      x: number;
      y: number;
      size: number;
      speed: number;
      color: string;
      alpha: number;
      channel: "google" | "meta" | "display";
      targetX: number;
      stage: number; // 0: input to impressions, 1: impressions to clicks, 2: clicks to leads, 3: leads to conversions, 4: conversion burst
      progress: number;
    }

    const particles: Particle[] = [];
    const colors = {
      google: "#FE7146", // Primary Accent
      meta: "#303360",   // Deep Navy / Indigos
      display: "#8A90E5", // Light Indigo/Purple
    };

    // Define coordinate stages of the funnel relative to width and height
    const getStagesY = () => {
      return {
        sources: height * 0.08,
        impressions: height * 0.28,
        clicks: height * 0.50,
        leads: height * 0.72,
        conversions: height * 0.90,
      };
    };

    const getStagesWidth = () => {
      return {
        sources: width * 0.8,
        impressions: width * 0.7,
        clicks: width * 0.46,
        leads: width * 0.28,
        conversions: width * 0.15,
      };
    };

    // Generate a particle
    const spawnParticle = () => {
      const channels: ("google" | "meta" | "display")[] = ["google", "meta", "display"];
      const channel = channels[Math.floor(Math.random() * channels.length)];
      
      const stagesY = getStagesY();
      const stagesW = getStagesWidth();

      // Source positions
      let spawnX = width / 2;
      if (channel === "google") spawnX = width * 0.22;
      if (channel === "display") spawnX = width * 0.78;

      particles.push({
        x: spawnX,
        y: stagesY.sources,
        size: Math.random() * 2.2 + 2,
        speed: Math.random() * 0.006 + 0.005,
        color: colors[channel],
        alpha: 0.9,
        channel,
        targetX: width / 2 + (Math.random() - 0.5) * (stagesW.impressions * 0.8),
        stage: 0,
        progress: 0,
      });
    };

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const stagesY = getStagesY();
      const stagesW = getStagesWidth();

      // Draw standard glowing funnel guidelines (subtle background)
      ctx.strokeStyle = "rgba(48, 51, 96, 0.08)";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);

      // Left boundary of funnel
      ctx.beginPath();
      ctx.moveTo(width * 0.15, stagesY.sources);
      ctx.bezierCurveTo(
        width * 0.15, stagesY.impressions,
        width * 0.28, stagesY.clicks,
        width * 0.36, stagesY.leads
      );
      ctx.lineTo(width * 0.42, stagesY.conversions);
      ctx.stroke();

      // Right boundary of funnel
      ctx.beginPath();
      ctx.moveTo(width * 0.85, stagesY.sources);
      ctx.bezierCurveTo(
        width * 0.85, stagesY.impressions,
        width * 0.72, stagesY.clicks,
        width * 0.64, stagesY.leads
      );
      ctx.lineTo(width * 0.58, stagesY.conversions);
      ctx.stroke();

      ctx.setLineDash([]); // Reset line dash

      // Spawn particles
      if (Math.random() < 0.12 && particles.length < 90) {
        spawnParticle();
      }

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.progress += p.speed;

        if (p.progress >= 1) {
          p.progress = 0;
          p.stage += 1;

          if (p.stage > 3) {
            // Reached conversion! Remove particle
            particles.splice(i, 1);
            continue;
          }

          // Calculate new targets
          const nextY = p.stage === 1 ? stagesY.clicks : p.stage === 2 ? stagesY.leads : stagesY.conversions;
          const nextW = p.stage === 1 ? stagesW.clicks : p.stage === 2 ? stagesW.leads : stagesW.conversions;
          p.targetX = width / 2 + (Math.random() - 0.5) * (nextW * 0.7);
        }

        // Calculate position based on Bezier interpolation or linear step
        let startY = stagesY.sources;
        let endY = stagesY.impressions;
        let startX = width / 2;
        if (p.channel === "google") startX = width * 0.22;
        if (p.channel === "display") startX = width * 0.78;

        if (p.stage === 1) {
          startY = stagesY.impressions;
          endY = stagesY.clicks;
          startX = p.x; // smoothly continue
        } else if (p.stage === 2) {
          startY = stagesY.clicks;
          endY = stagesY.leads;
          startX = p.x;
        } else if (p.stage === 3) {
          startY = stagesY.leads;
          endY = stagesY.conversions;
          startX = p.x;
        }

        // Interpolate coordinates
        const currentY = startY + (endY - startY) * p.progress;
        const currentX = startX + (p.targetX - startX) * p.progress;

        // Draw particle
        ctx.beginPath();
        ctx.arc(currentX, currentY, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1.0;
        ctx.shadowBlur = 0; // Reset shadow

        // Keep track of coordinates to feed next stage calculations smoothly
        p.x = currentX;
        p.y = currentY;
      }

      // Draw Funnel Stages Horizontally
      const drawStageLabel = (y: number, w: number, title: string, count: string, color: string) => {
        // Horizontal bar representing the stage
        ctx.fillStyle = "rgba(48, 51, 96, 0.03)";
        ctx.fillRect(width / 2 - w / 2, y - 10, w, 20);

        // Stage dividing line
        ctx.strokeStyle = "rgba(48, 51, 96, 0.15)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(width / 2 - w / 2, y);
        ctx.lineTo(width / 2 + w / 2, y);
        ctx.stroke();
      };

      drawStageLabel(stagesY.impressions, stagesW.impressions, "IMPRESSIONS", "", "#303360");
      drawStageLabel(stagesY.clicks, stagesW.clicks, "CLICKS", "", "#303360");
      drawStageLabel(stagesY.leads, stagesW.leads, "LEADS", "", "#303360");
      drawStageLabel(stagesY.conversions, stagesW.conversions, "CONVERSIONS", "", "#FE7146");

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-[450px] sm:h-[500px] bg-slate-50 border border-slate-100 rounded-3xl p-6 shadow-xl relative overflow-hidden flex flex-col justify-between">
      
      {/* Top Channels Source Nodes */}
      <div className="flex justify-between items-center relative z-10 px-4">
        {/* Google Node */}
        <div className="flex flex-col items-center gap-1.5 bg-white/90 backdrop-blur border border-gray-100 px-3 py-1.5 rounded-2xl shadow-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FE7146] animate-pulse"></span>
          <span className="font-mono text-[9px] font-bold text-slate-500 uppercase tracking-wider">Google</span>
        </div>

        {/* Meta Node */}
        <div className="flex flex-col items-center gap-1.5 bg-white/90 backdrop-blur border border-gray-100 px-3 py-1.5 rounded-2xl shadow-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-[#303360] animate-pulse"></span>
          <span className="font-mono text-[9px] font-bold text-slate-500 uppercase tracking-wider">Meta / Paid</span>
        </div>

        {/* Display Node */}
        <div className="flex flex-col items-center gap-1.5 bg-white/90 backdrop-blur border border-gray-100 px-3 py-1.5 rounded-2xl shadow-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-[#8A90E5] animate-pulse"></span>
          <span className="font-mono text-[9px] font-bold text-slate-500 uppercase tracking-wider">Display</span>
        </div>
      </div>

      {/* Main interactive canvas rendering particles */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Floating Stage Counters (Overlaid precisely next to the funnel) */}
      <div className="absolute inset-0 flex flex-col justify-between py-10 pointer-events-none z-10 select-none">
        <div className="h-6"></div> {/* Offset source */}
        
        {/* Impressions overlay */}
        <div className="px-6 flex justify-between items-center w-full">
          <div className="bg-white/95 backdrop-blur shadow-sm border border-gray-100/80 px-2.5 py-1 rounded-xl flex items-center gap-2 pointer-events-auto">
            <span className="text-[10px] font-mono font-black text-slate-400">01</span>
            <span className="text-[10px] font-mono font-bold text-[#303360] uppercase tracking-wider">Impressions:</span>
            <span className="text-xs font-mono font-black text-slate-700">
              {counters.impressions.toLocaleString()}
            </span>
          </div>
          <span className="text-[9px] font-mono text-slate-300 font-bold tracking-widest hidden sm:inline">STAGE_VOLUME_MAX</span>
        </div>

        {/* Clicks overlay */}
        <div className="px-6 flex justify-between items-center w-full">
          <span className="text-[9px] font-mono text-slate-300 font-bold tracking-widest hidden sm:inline">CTR: 11.4%</span>
          <div className="bg-white/95 backdrop-blur shadow-sm border border-gray-100/80 px-2.5 py-1 rounded-xl flex items-center gap-2 pointer-events-auto">
            <span className="text-[10px] font-mono font-black text-slate-400">02</span>
            <span className="text-[10px] font-mono font-bold text-[#303360] uppercase tracking-wider">Clicks:</span>
            <span className="text-xs font-mono font-black text-slate-700">
              {counters.clicks.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Leads overlay */}
        <div className="px-6 flex justify-between items-center w-full">
          <div className="bg-white/95 backdrop-blur shadow-sm border border-gray-100/80 px-2.5 py-1 rounded-xl flex items-center gap-2 pointer-events-auto">
            <span className="text-[10px] font-mono font-black text-slate-400">03</span>
            <span className="text-[10px] font-mono font-bold text-[#303360] uppercase tracking-wider">Leads:</span>
            <span className="text-xs font-mono font-black text-slate-700">
              {counters.leads.toLocaleString()}
            </span>
          </div>
          <span className="text-[9px] font-mono text-slate-300 font-bold tracking-widest hidden sm:inline">CPL: ₹310</span>
        </div>

        {/* Conversions Spout and ROAS counter */}
        <div className="px-6 flex flex-col items-center gap-1.5 w-full">
          <div className="bg-white/95 backdrop-blur shadow-md border border-[#FE7146]/20 px-3 py-1.5 rounded-xl flex items-center gap-2 pointer-events-auto">
            <Sparkles className="w-3.5 h-3.5 text-[#FE7146] animate-spin" />
            <span className="text-[10px] font-mono font-bold text-[#FE7146] uppercase tracking-wider">Conversions:</span>
            <span className="text-xs font-mono font-black text-[#FE7146]">
              {counters.conversions.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Spout Bottom ROAS Indicator Box */}
      <div className="bg-[#303360] text-white rounded-2xl p-4 flex justify-between items-center relative z-10 border border-white/5 shadow-lg mt-auto">
        <div className="text-left">
          <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest block leading-none">
            TOTAL_FUNNEL_MULTIPLIER
          </span>
          <span className="text-sm font-display font-extrabold text-[#F5F5FA] mt-1 block">
            Combined ROI Metric
          </span>
        </div>
        <div className="flex flex-col items-end">
          <span className="font-mono font-black text-2xl text-[#FE7146] tracking-tight leading-none">
            {counters.roas}x
          </span>
          <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider mt-1 block">
            Average ROAS
          </span>
        </div>
      </div>

    </div>
  );
}

export function PerformanceMarketing() {
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

  // 3. What's Included vertical tabs state
  const [activeTab, setActiveTab] = useState("strategy");
  const performanceTabs: PerformanceTab[] = [
    {
      id: "strategy",
      title: "Campaign Strategy & Planning",
      description: "Every successful campaign starts with a clear plan. We analyze your business, audience, competitors, and goals to create a performance marketing strategy that maximizes your budget and drives measurable growth.",
      capabilities: [
        "Campaign & Competitor Analysis",
         "Multi-Channel Media Planning",
          "Budget Planning & Allocation",
           "Audience Research & Targeting",
            "Keyword & Negative Keyword Strategy",
            "Conversion Tracking & Goal Setup"
       
      ],
      metric: "99.4%",
      metricLabel: "Audit Discovery Accuracy",
      channelTag: "Build a Strategy That Delivers Results"
    },
    {
      id: "search",
      title: "Google Ads Management",
      description: "We create and manage Google Ads campaigns that connect your business with people actively searching for your products or services. Our team continuously optimizes your campaigns to generate more leads, increase conversions, and maximize your return on ad spend.",
      capabilities: [
        "Google Search Campaign Setup & Management",
        "Keyword Research & Selection",
        "Ad Copy Creation & Optimization",
        "Negative Keyword Management",
        "Bid & Budget Optimization",
        "Ad Extensions & Performance Enhancements",
        "Conversion Tracking & Campaign Monitoring"
        
      ],
      metric: "-28%",
      metricLabel: "Average CPA Reduction",
      channelTag: "Reach Customers Who Are Ready to Buy"
    },
    {
  id: "social",
  title: "Paid Social Advertising (Meta & LinkedIn)",
  description: "We create and manage high-performing ad campaigns on Facebook, Instagram, and LinkedIn to help you reach the right audience, generate quality leads, and grow your business.",
  capabilities: [
    "Meta (Facebook & Instagram) Ad Management",
    "LinkedIn Advertising for B2B Growth",
    "Audience Research & Targeting",
    "Creative Ad Design & Copywriting",
    "Lead Generation Campaigns",
    "Campaign Optimization & A/B Testing",
    "Conversion Tracking & Performance Reporting"
  ],
  metric: "3.8x",
  metricLabel: "Meta Campaign ROAS",
  channelTag: "Reach the Right Audience. Drive More Conversions."
},
    {
    id: "display",
    title: "Display & Programmatic Advertising",
    description: "Reconnect with potential customers across websites, apps, and YouTube through targeted display and remarketing campaigns. We help keep your brand in front of the right audience until they're ready to take action.",
    capabilities: [
      "Display Advertising Campaigns",
      "YouTube Video Advertising",
      "Remarketing & Retargeting Campaigns",
      "Audience Segmentation & Targeting",
      "Contextual & Interest-Based Targeting",
      "Campaign Optimization & Performance Monitoring"
    ],
    metric: "+150%",
    metricLabel: "Attributed Conversion Lift",
    channelTag: "Stay Visible. Stay Top of Mind."
  },
  {
    id: "cro",
    title: "Conversion Rate Optimization (CRO)",
    description: "Getting traffic is only half the job. We optimize your landing pages and website experience to help more visitors take action—whether it's filling out a form, making a purchase, or booking a consultation.",
    capabilities: [
      "Landing Page Design & Optimization",
      "A/B Testing for Better Performance",
      "User Experience (UX) Improvements",
      "Form & Checkout Optimization",
      "Mobile Performance Optimization",
      "Heatmap & Visitor Behavior Analysis"
    ],
    metric: "+42%",
    metricLabel: "Form Submission Boost",
    channelTag: "Turn More Visitors into Customers"
  },
  {
    id: "bid",
    title: "Budget & Bid Management",
    description: "We continuously monitor and optimize your campaign budgets and bids to ensure your ad spend is focused on the campaigns that deliver the best results.",
    capabilities: [
      "Budget Planning & Allocation",
      "Bid Strategy Optimization",
      "Cost-Per-Click (CPC) Management",
      "Campaign Performance Monitoring",
      "Budget Reallocation for Better ROI",
      "Ongoing Bid & Budget Adjustments"
    ],
    metric: "24/7",
    metricLabel: "Algorithmic Tracking",
    channelTag: "Make Every Advertising Dollar Count"
  },
  {
    id: "reporting",
    title: "Performance Reporting",
    description: "Know exactly how your campaigns are performing with transparent reports and easy-to-understand dashboards. We track the metrics that matter so you can make informed decisions and grow with confidence.",
    capabilities: [
      "Custom Performance Dashboards",
      "Lead, Conversion & ROI Tracking",
      "Campaign Performance Reports",
      "CRM & Analytics Integration",
      "Strategy Review Meetings",
      "Actionable Insights & Recommendations"
    ],
    metric: "100%",
    metricLabel: "Attribution Transparency",
    channelTag: "Clear Reports. Real Business Insights."
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
    title: "Audit & Goal Setting",
    desc: "We review your current campaigns, understand your business goals, and identify opportunities to improve performance and reduce unnecessary ad spend.",
    status: "lead_validation"
  },
  {
    num: "02",
    title: "Campaign Strategy",
    desc: "We choose the right marketing channels, define your target audience, and allocate your budget where it can deliver the best results.",
    status: "allocation_matrix"
  },
  {
    num: "03",
    title: "Campaign Launch",
    desc: "We set up your campaigns, create compelling ad creatives, implement tracking, and launch everything with performance in mind.",
    status: "pixel_integration"
  },
  {
    num: "04",
    title: "Monitor & Optimize",
    desc: "We continuously monitor campaign performance, test different ad creatives, refine targeting, and optimize bids to improve results.",
    status: "pacing_optimization"
  },
  {
    num: "05",
    title: "Scale & Grow",
    desc: "Once we identify what's working, we increase your budget on high-performing campaigns, expand your reach, and continue optimizing for long-term growth.",
    status: "scale_expansion"
  }
];

  // 5. Live Campaign Command Center Dashboard switcher and Draggable Chart state
  const [activeChannel, setActiveChannel] = useState<"google" | "meta" | "display">("google");
  const [scrubPercent, setScrubPercent] = useState(0.7); // default 70%
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  // Channels specific timeline data
  const channelDataMap = {
    google: [
      { month: "Month 1", spend: 45000, roas: 3.2, cpa: 480, conversions: 94, revenue: 144000, graphPct: 20 },
      { month: "Month 2", spend: 60000, roas: 3.5, cpa: 440, conversions: 136, revenue: 210000, graphPct: 30 },
      { month: "Month 3", spend: 85000, roas: 3.9, cpa: 410, conversions: 207, revenue: 331500, graphPct: 45 },
      { month: "Month 4", spend: 110000, roas: 4.2, cpa: 390, conversions: 282, revenue: 462000, graphPct: 58 },
      { month: "Month 5", spend: 150000, roas: 4.4, cpa: 360, conversions: 416, revenue: 660000, graphPct: 70 },
      { month: "Month 6", spend: 180000, roas: 4.6, cpa: 340, conversions: 529, revenue: 828000, graphPct: 82 },
      { month: "Month 7", spend: 220000, roas: 4.7, cpa: 330, conversions: 654, revenue: 1034000, graphPct: 92 },
      { month: "Month 8", spend: 280000, roas: 4.8, cpa: 310, conversions: 864, revenue: 1344000, graphPct: 100 },
    ],
    meta: [
      { month: "Month 1", spend: 35000, roas: 2.8, cpa: 380, conversions: 92, revenue: 98000, graphPct: 18 },
      { month: "Month 2", spend: 50000, roas: 3.0, cpa: 350, conversions: 142, revenue: 150000, graphPct: 28 },
      { month: "Month 3", spend: 70000, roas: 3.3, cpa: 330, conversions: 212, revenue: 231000, graphPct: 40 },
      { month: "Month 4", spend: 100000, roas: 3.5, cpa: 310, conversions: 322, revenue: 350000, graphPct: 55 },
      { month: "Month 5", spend: 130000, roas: 3.7, cpa: 290, conversions: 448, revenue: 481000, graphPct: 68 },
      { month: "Month 6", spend: 160000, roas: 3.8, cpa: 280, conversions: 571, revenue: 608000, graphPct: 80 },
      { month: "Month 7", spend: 200000, roas: 3.9, cpa: 270, conversions: 722, revenue: 780000, graphPct: 90 },
      { month: "Month 8", spend: 250000, roas: 4.0, cpa: 260, conversions: 961, revenue: 1000000, graphPct: 100 },
    ],
    display: [
      { month: "Month 1", spend: 20000, roas: 1.8, cpa: 620, conversions: 32, revenue: 36000, graphPct: 15 },
      { month: "Month 2", spend: 30000, roas: 2.0, cpa: 580, conversions: 51, revenue: 60000, graphPct: 24 },
      { month: "Month 3", spend: 40000, roas: 2.2, cpa: 550, conversions: 75, revenue: 88000, graphPct: 35 },
      { month: "Month 4", spend: 55000, roas: 2.4, cpa: 510, conversions: 112, revenue: 132000, graphPct: 48 },
      { month: "Month 5", spend: 75000, roas: 2.6, cpa: 480, conversions: 168, revenue: 195000, graphPct: 62 },
      { month: "Month 6", spend: 95000, roas: 2.7, cpa: 450, conversions: 228, revenue: 256500, graphPct: 75 },
      { month: "Month 7", spend: 120000, roas: 2.8, cpa: 430, conversions: 302, revenue: 336000, graphPct: 88 },
      { month: "Month 8", spend: 150000, roas: 3.0, cpa: 410, conversions: 408, revenue: 450000, graphPct: 100 },
    ],
  };

  const currentChannelData = channelDataMap[activeChannel];
  const maxIdx = currentChannelData.length - 1;
  const activeScrubIdx = Math.min(
    maxIdx,
    Math.max(0, Math.floor(scrubPercent * (maxIdx + 1)))
  );
  const activePoint = currentChannelData[activeScrubIdx];

  // Dragger handlers
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

  // 6. Channel Mix Snapshot State (simulated trigger on scroll)
  const [mixVisible, setMixVisible] = useState(false);
  const mixRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMixVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    if (mixRef.current) {
      observer.observe(mixRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const channelMixes = [
    { name: "Paid Search (High-Intent Conversion)", share: 45, color: "bg-[#FE7146]" },
    { name: "Paid Social (Audience Nurture & Lead Gen)", share: 35, color: "bg-[#303360]" },
    { name: "Display & YouTube (Recapture & Remarketing)", share: 20, color: "bg-[#8A90E5]" },
  ];

  // 9. FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const faqs = [
    {
      q: "What is the minimum ad budget you recommend?",
      a: "While we scale campaigns spending upwards of 20 lakhs per month, we recommend starting with a minimum overall ad budget of ₹50,000 to ₹75,000 per month. This baseline ensures we gather adequate data to train machine learning bid algorithms, execute conversion rate tests, and capture meaningful volumes inside our primary thematic ad groups."
    },
    {
      q: "Which channels will you use for my business?",
      a: "Every industry demands a unique channel mix. For immediate transactional conversions, we prioritize high-intent Google Search and Shopping. For audience-building, visual education, and social leads, we use Meta Ads (Instagram & Facebook). For long-cycle products, we deploy a programmatic Display retargeting mesh."
    },
    {
      q: "How is performance reported?",
      a: "Total attribution transparency. You receive access to a live, custom Looker Studio dashboard that updates continuously with live API integrations. We map cost-per-click and impressions directly to CRM events, so you see exactly how many rupees were spent and the precise volume of generated profit margin."
    },
    {
      q: "How soon can I expect results?",
      a: "Paid channels deliver instant traffic. The moment pixel tags are verified, ad assets approved, and bids activated, your ads go live immediately. Leads and transactions generally populate on Day 1. However, the first 14 to 30 days are crucial for budget arbitrage and search query scrubs to dial in cost-efficiencies."
    }
  ];

  return (
    <div className="pt-24 bg-white selection:bg-[#FE7146] selection:text-white">
      
      {/* SECTION 1: HERO - "The Funnel, Live" */}
      <section className="relative min-h-[90vh] flex items-center justify-center py-16 overflow-hidden bg-white border-b border-gray-100">
        <div className="absolute inset-0 bg-[radial-gradient(#F5F5FA_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-75"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#FFF1EC]/50 blur-3xl -translate-y-1/3 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-[#F5F5FA]/80 blur-3xl translate-y-1/3 -translate-x-1/3"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Info Column */}
            <div className="lg:col-span-5 text-left space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFF1EC] border border-[#FE7146]/20 rounded-full">
            
                <span className="text-[13px] sm:text-xs font-mono font-black tracking-widest text-[#FE7146] uppercase">
                PERFORMANCE MARKETING
                </span>
              </div>

              <h1 className="font-display font-black text-4xl sm:text-5xl text-[#303360] tracking-tight leading-[1.1]">
               Every Click Counts.<br />
                Every Conversion <span className="text-[#FE7146]">Matters.</span>
              </h1>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal max-w-xl">
                We create and manage data-driven campaigns across Google, Meta, and other leading platforms to help you reach the right audience, generate quality leads, and maximize your return on ad spend.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                <button
                  onClick={() => navigate.push('/contact')}
                  className="w-full sm:w-auto bg-[#FE7146] hover:bg-[#FE7146]/95 text-white font-black text-sm px-8 py-4 rounded-xl shadow-lg shadow-[#FE7146]/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Get a Free Growth Audit</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="#command-center"
                  className="w-full sm:w-auto bg-slate-50 hover:bg-slate-100 text-[#303360] font-black text-sm px-8 py-4 rounded-xl border border-gray-200/60 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>See Channel Performance</span>
                </a>
              </div>
            </div>

            {/* Hero Right: Performance Marketing Dashboard Image */}
            <div className="lg:col-span-7 flex justify-center w-full">
              <div className="w-full relative">
                {/* Soft ambient glow behind the visual */}
                <div className="absolute -inset-3 bg-gradient-to-tr from-[#FE7146]/15 via-transparent to-indigo-400/10 rounded-[2rem] blur-2xl pointer-events-none" />
                <img
                  src="https://res.cloudinary.com/dqjlffxja/image/upload/f_auto,q_auto/v1783790035/performance-marketing_pscnb3.jpg"
                  alt="Performance marketing funnel and channel dashboard"
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
              "We focus on growth,<span className="text-[#FE7146] underline decoration-dashed decoration-2 underline-offset-8"> not vanity metrics. </span>"
            </p>
            <cite className="block font-mono text-xs sm:text-sm font-bold text-slate-400 tracking-wider uppercase">
              — ANALYTICS CLOUDS PERFORMANCE CREDO
            </cite>
          </blockquote>
        </div>
      </section>

      {/* SECTION 3: WHAT'S INCLUDED */}
      <section className="py-24 bg-[#F5F5FA]/50 border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xm font-mono font-black text-[#FE7146] tracking-widest uppercase">
              COMPLETE OVERWATCH
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-[#303360] leading-tight tracking-tight">
              A Complete Customer  <span className="text-[#FE7146]">Acquisition Strategy</span>
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              We bring together creative design, compelling copy, and data-driven campaigns to attract the right audience and deliver measurable business growth.

            </p>
          </div>

          {/* DESKTOP VIEW: Sidebar Vertical Tabs */}
          <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Vertical Tabs list */}
            <div className="lg:col-span-4 space-y-2">
              {performanceTabs.map((tab) => {
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
                        {tab.id === "strategy" && <Layers size={14} />}
                        {tab.id === "search" && <Search size={14} />}
                        {tab.id === "social" && <Users size={14} />}
                        {tab.id === "display" && <Sparkle size={14} />}
                        {tab.id === "cro" && <Workflow size={14} />}
                        {tab.id === "bid" && <Gauge size={14} />}
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
                {performanceTabs.map((tab) => {
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
            {performanceTabs.map((tab) => {
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
                        {tab.id === "strategy" && <Layers size={14} />}
                        {tab.id === "search" && <Search size={14} />}
                        {tab.id === "social" && <Users size={14} />}
                        {tab.id === "display" && <Sparkle size={14} />}
                        {tab.id === "cro" && <Workflow size={14} />}
                        {tab.id === "bid" && <Gauge size={14} />}
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
            <span className="text-xm font-mono font-black text-[#FE7146] tracking-widest uppercase">
              METHODICAL RIGOR
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-[#303360] leading-tight tracking-tight">
             Our Performance <span className="text-[#FE7146]">Marketing Process</span>
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              We follow a proven process to plan, launch, optimize, and scale your campaigns for maximum return on your advertising investment.

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
                            MONITORED
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

     

      {/* SECTION 6: CHANNEL MIX SNAPSHOT */}
      <section ref={mixRef} className="py-20 bg-slate-50 border-b border-gray-100 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 mb-12">
            <span className="text-xm font-mono font-black text-[#FE7146] tracking-widest uppercase block">
              BALANCED DIVERSIFICATION
            </span>
            <h3 className="font-display font-black text-2xl sm:text-3xl text-[#303360] tracking-tight">
              Optimal Budget Allocation Ratio
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm">
              We never pool your capital into a single basket. We diversify budgets based on funnel contribution velocities.
            </p>
          </div>

          <div className="space-y-6 bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-md text-left">
            
            {/* Split chips representation bar */}
            <div className="h-8 rounded-full overflow-hidden flex w-full border border-gray-200">
              {channelMixes.map((mix, idx) => {
                const initialWidth = mixVisible ? `${mix.share}%` : "0%";
                return (
                  <div
                    key={idx}
                    className={`${mix.color} h-full transition-all duration-1000 ease-out`}
                    style={{ width: initialWidth }}
                    title={`${mix.name}: ${mix.share}%`}
                  ></div>
                );
              })}
            </div>

            {/* Legend chips detailed lists */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {channelMixes.map((mix, idx) => (
                <div key={idx} className="space-y-1 bg-slate-50/50 p-3.5 rounded-2xl border border-gray-100">
                  <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${mix.color} shrink-0`}></span>
                    <span className="font-mono font-black text-sm text-[#303360]">
                      {mix.share}%
                    </span>
                  </div>
                  <h5 className="font-display font-bold text-xs text-slate-700 leading-tight">
                    {mix.name}
                  </h5>
                  <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider block">
                    STAGE_PROPORTION_RATIO
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
