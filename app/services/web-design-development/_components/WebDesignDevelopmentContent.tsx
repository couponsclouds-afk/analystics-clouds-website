"use client";

import { useRouter } from "next/navigation";
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { 
  Laptop, 
  Smartphone, 
  Search, 
  Zap, 
  LifeBuoy, 
  Code2, 
  ShieldCheck, 
  Check, 
  ChevronDown, 
  ArrowRight, 
  ChevronRight, 
  Sparkles, 
  Star, 
  Palette, 
  ShoppingCart, 
  Layers, 
  Monitor, 
  Cpu, 
  ArrowUpRight,
  TrendingUp,
  HelpCircle,
  Database,
  RefreshCw,
  Sliders,
  Terminal,
  Activity,
  Award,
  Globe
} from "lucide-react";
import { CtaBanner } from '@/components/CtaBanner';

// Intersection Observer Count Up Component for Why Choose Us Stats
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
    <span ref={elementRef} className="font-mono font-black text-3xl sm:text-4xl text-[#FE7146]">
      {count}
      {suffix}
    </span>
  );
}

// Before/After Image Slider Component
interface BeforeAfterProps {
  beforeImg: string;
  afterImg: string;
  beforeLabel?: string;
  afterLabel?: string;
}

function BeforeAfterSlider({ beforeImg, afterImg, beforeLabel = "BEFORE (2022)", afterLabel = "AFTER REDESIGN" }: BeforeAfterProps) {
  const [sliderPos, setSliderPos] = useState(50); // percentage 0-100
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) handleMove(e.touches[0].clientX);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (e.buttons === 1 || isDragging) {
      handleMove(e.clientX);
    }
  };

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleMove(e.clientX);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener("mouseup", handleMouseUp);
    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-video sm:aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl select-none cursor-ew-resize border border-gray-200 bg-slate-900"
      onMouseMove={onMouseMove}
      onTouchMove={onTouchMove}
      onMouseDown={onMouseDown}
    >
      {/* After Image (Full Background) */}
      <img 
        src={afterImg} 
        alt="After Redesign" 
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        referrerPolicy="no-referrer"
      />
      <div className="absolute top-4 right-4 bg-[#FE7146] text-white text-[9px] font-mono font-black tracking-widest px-2.5 py-1 rounded shadow-md z-20">
        {afterLabel}
      </div>

      {/* Before Image (Left Clipped Overlay) — clip-path keeps the image at
          full container size (no squish on first render or window resize) */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none z-10"
        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
      >
        <img
          src={beforeImg}
          alt="Before Design"
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4 bg-slate-800 text-gray-300 text-[9px] font-mono font-black tracking-widest px-2.5 py-1 rounded shadow-md">
          {beforeLabel}
        </div>
      </div>

      {/* Drag handle line & circle */}
      <div 
        className="absolute inset-y-0 z-30 pointer-events-none flex items-center justify-center"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="absolute inset-y-0 w-0.5 bg-[#FE7146] shadow-xl" />
        <div className="w-10 h-10 rounded-full bg-[#FE7146] text-white shadow-lg border-2 border-white flex items-center justify-center -translate-x-1/2 cursor-ew-resize">
          <Sliders className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}

interface WebDesignDevelopmentProps {}
export function WebDesignDevelopment(props: WebDesignDevelopmentProps) {
  const navigate = useRouter();
  // 1. Hero Mockup Self-Building Sequence States:
  // "init" -> "wireframe" -> "skeleton" -> "resolved"
  const [buildStep, setBuildStep] = useState<"wireframe" | "skeleton" | "resolved">("wireframe");
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);

  useEffect(() => {
    // Add logs progressively to simulate real compile steps
    const logs = [
      "// INITIALIZING STACK BUILDER v4.8...",
      "Connecting to Noida Sector 62 server nodes... Connected.",
      "Loading Tailwind Design System v4.0...",
      "Importing font weights [Space Grotesk, Inter]... Done.",
      "Parsing content hierarchies & journeys... Done.",
      "Synthesizing visual layers & performance targets...",
      "Optimizing media layers & Lighthouse targets... Ready ✓"
    ];

    let currentLogIndex = 0;
    const logInterval = setInterval(() => {
      if (currentLogIndex < logs.length) {
        // Capture the log before the async state updater runs — reading
        // logs[currentLogIndex] inside the updater races with the increment
        // below and ends up pushing undefined, crashing the render.
        const nextLog = logs[currentLogIndex];
        currentLogIndex++;
        setTerminalLogs((prev) => [...prev, nextLog]);
      } else {
        clearInterval(logInterval);
      }
    }, 450);

    const wireframeTimer = setTimeout(() => {
      setBuildStep("skeleton");
    }, 1500);

    const skeletonTimer = setTimeout(() => {
      setBuildStep("resolved");
    }, 3200);

    return () => {
      clearInterval(logInterval);
      clearTimeout(wireframeTimer);
      clearTimeout(skeletonTimer);
    };
  }, []);

  // 2. Interactive "What We Offer" Tabs
  const [activeOfferTab, setActiveOfferTab] = useState<number>(0);

  const subServices = [
  {
    stageName: "Create a Better Experience for Every Visitor",
    title: "UI/UX Design",
    tagline: "Conversion Architecture First",
    description: "A great website is easy to navigate and enjoyable to use. We design intuitive layouts and user journeys that help visitors find what they need, stay engaged, and take action.",
    icon: <Palette className="w-5 h-5" />,
    bullets: [
      "Custom UI/UX Design",
      "Wireframes & Page Layouts",
      "Website Structure & Sitemap Planning",
      "User Journey Mapping",
      "Mobile-Responsive Design",
      "Conversion-Focused User Experience"
    ],
    mockupBg: "bg-indigo-900/40",
    mockupVisual: (
      <div className="w-full h-full p-4 flex flex-col justify-between text-white font-mono text-[10px]">
        <div className="flex justify-between items-center border-b border-white/10 pb-2">
          <span>[Figma wireframe_v2]</span>
          <span className="w-2 h-2 rounded-full bg-[#FE7146] animate-pulse" />
        </div>
        <div className="grid grid-cols-12 gap-2 my-2 flex-grow">
          <div className="col-span-4 border border-dashed border-white/30 rounded p-2 flex flex-col justify-between">
            <span className="text-gray-400">// sidebar_nav</span>
            <div className="space-y-1">
              <div className="h-1 bg-white/20 rounded w-full" />
              <div className="h-1 bg-white/20 rounded w-5/6" />
              <div className="h-1 bg-[#FE7146]/40 rounded w-4/5" />
            </div>
          </div>
          <div className="col-span-8 border border-dashed border-white/30 rounded p-2 flex flex-col justify-between">
            <div className="flex justify-between">
              <span className="text-gray-400">// main_hero</span>
              <span className="text-emerald-400">[960px]</span>
            </div>
            <div className="h-4 bg-white/10 rounded w-full flex items-center justify-center text-[8px] text-[#FE7146] font-bold">
              BesTone Display Headline
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="h-8 bg-white/5 rounded border border-white/10" />
              <div className="h-8 bg-white/5 rounded border border-white/10" />
            </div>
          </div>
        </div>
        <div className="text-[8px] text-gray-400 text-center">
          Click to style canvas layout parameters
        </div>
      </div>
    )
  },
  {
    stageName: "Build Websites That Work on Every Device",
    title: "Responsive Web Development",
    tagline: "Fluid Performance Code",
    description: "Your website should look great and perform smoothly on every screen. We build fast, responsive websites that deliver a seamless experience across desktops, tablets, and mobile devices.",
    icon: <Laptop className="w-5 h-5" />,
    bullets: [
      "Custom Website Development",
      "Responsive Design for All Devices",
      "Fast & Clean Code",
      "SEO-Friendly Website Structure",
      "High-Performance Pages",
      "Scalable Development"
    ],
    mockupBg: "bg-emerald-900/40",
    mockupVisual: (
      <div className="w-full h-full p-4 flex flex-col justify-between text-white font-mono text-[9px]">
        <div className="flex justify-between items-center border-b border-white/10 pb-2">
          <span className="text-emerald-400">Layout.tsx — TypeScript</span>
          <span className="text-gray-400">1.2kb minified</span>
        </div>
        <div className="flex-grow py-3 space-y-1.5 text-left font-mono text-[8px] text-gray-300">
          <p><span className="text-purple-400">import</span> {"{ motion }"} <span className="text-purple-400">from</span> <span className="text-orange-300">&quot;motion/react&quot;</span>;</p>
          <p><span className="text-blue-400">export function</span> <span className="text-yellow-300">Navbar</span>() {"{"}</p>
          <p className="pl-4"><span className="text-blue-400">return</span> (</p>
          <p className="pl-8 text-gray-500">&lt;<span className="text-red-400">motion.nav</span> className=<span className="text-orange-300">&quot;w-full sticky top-0&quot;</span></p>
          <p className="pl-12 text-gray-500">animate={"{{ y: 0, opacity: 1 }}"}&gt;</p>
          <p className="pl-8 text-gray-500">...</p>
        </div>
        <div className="flex items-center gap-1 bg-emerald-500/20 text-emerald-300 p-1.5 rounded text-[8px] justify-center">
          <Activity className="w-3 h-3 text-emerald-400 animate-pulse" />
          <span>Compiled successfully. Node active on port 3000.</span>
        </div>
      </div>
    )
  },
  {
    stageName: "Build Online Stores That Drive More Sales",
    title: "E-Commerce Website Development",
    tagline: "High-Velocity Retail Stores",
    description: "A successful online store should be fast, easy to navigate, and simple to shop. We build custom e-commerce websites that deliver a smooth shopping experience, helping you increase conversions and reduce cart abandonment.",
    icon: <ShoppingCart className="w-5 h-5" />,
    bullets: [
      "Custom E-Commerce Website Development",
      "Shopify & WooCommerce Development",
      "Product Catalog & Category Setup",
      "Optimized Checkout Experience",
      "Payment Gateway Integration"
    ],
    mockupBg: "bg-amber-950/40",
    mockupVisual: (
      <div className="w-full h-full p-4 flex flex-col justify-between text-white">
        <div className="flex justify-between items-center border-b border-white/10 pb-2 font-mono text-[9px]">
          <span>Shopify Engine V2</span>
          <span className="text-[#FE7146]">Cart (3 items)</span>
        </div>
        <div className="grid grid-cols-2 gap-2 my-2">
          <div className="bg-white/5 rounded-lg p-2 border border-white/5 space-y-2">
            <div className="h-10 bg-gradient-to-tr from-[#FE7146]/20 to-amber-500/20 rounded relative flex items-center justify-center text-[8px] font-bold">
              PRODUCT IMAGE
            </div>
            <div className="h-1 bg-white/20 rounded w-3/4" />
            <div className="flex justify-between items-center">
              <span className="text-[8px] text-[#FE7146] font-bold">₹2,999</span>
              <span className="text-[7px] bg-white/10 px-1 py-0.5 rounded text-gray-300 font-mono">ADD</span>
            </div>
          </div>
          <div className="bg-white/5 rounded-lg p-2 border border-white/5 space-y-2">
            <div className="h-10 bg-gradient-to-tr from-[#FE7146]/20 to-amber-500/20 rounded relative flex items-center justify-center text-[8px] font-bold">
              PRODUCT IMAGE
            </div>
            <div className="h-1 bg-white/20 rounded w-3/4" />
            <div className="flex justify-between items-center">
              <span className="text-[8px] text-[#FE7146] font-bold">₹4,499</span>
              <span className="text-[7px] bg-[#FE7146] px-1 py-0.5 rounded text-white font-mono">ADDED</span>
            </div>
          </div>
        </div>
        <div className="h-5 bg-emerald-500/90 text-white font-bold rounded flex items-center justify-center text-[8px] shadow-lg">
          PROCEED TO CHECKOUT (₹7,498)
        </div>
      </div>
    )
  },
  {
    stageName: "Turn More Visitors into Customers",
    title: "Landing Page Design",
    tagline: "Engineered PPC Match",
    description: "A great landing page helps turn clicks into leads. We design fast, focused landing pages that match your marketing campaigns and encourage visitors to take action.",
    icon: <TrendingUp className="w-5 h-5" />,
    bullets: [
      "Custom Landing Page Design",
      "Campaign-Specific Landing Pages",
      "Mobile-Friendly Layouts",
      "Clear Calls-to-Action (CTAs)",
      "Lead Capture Forms",
      "Performance Tracking"
    ],
    mockupBg: "bg-red-950/40",
    mockupVisual: (
      <div className="w-full h-full p-4 flex flex-col justify-between text-white text-left">
        <div className="space-y-1">
          <span className="text-[7px] font-mono font-bold text-[#FE7146] tracking-wider uppercase">GOOGLE CAMPAIGN LP</span>
          <h4 className="text-xs font-black leading-tight">Scale Your Noida Leads Today</h4>
        </div>
        <div className="bg-white/5 border border-white/10 p-2.5 rounded-lg space-y-2 my-2">
          <div className="h-1 bg-white/25 rounded w-1/3" />
          <div className="grid grid-cols-2 gap-1.5">
            <div className="h-4 bg-white/5 border border-white/10 rounded" />
            <div className="h-4 bg-white/5 border border-white/10 rounded" />
          </div>
          <div className="h-5 bg-[#FE7146] rounded flex items-center justify-center text-[8px] font-bold text-white shadow-md">
            CLAIM MY DEMO
          </div>
        </div>
        <div className="flex items-center gap-1 justify-center text-[7px] text-gray-400 font-mono">
          <span>⚡ Conversions optimized (+24.8% avg.)</span>
        </div>
      </div>
    )
  },
  {
    stageName: "Give Your Website a Fresh Start",
    title: "Website Redesign & Modernization",
    tagline: "Re-Architecting Slow Assets",
    description: "An outdated website can slow down your business. We redesign and upgrade existing websites to improve speed, user experience, and overall performance while giving your brand a modern, professional look.",
    icon: <Layers className="w-5 h-5" />,
    bullets: [
      "Website Redesign",
      "Performance & Speed Improvements",
      "Modern UI/UX Upgrades",
      "Mobile-Friendly Optimization",
      "SEO-Friendly Website Structure",
      "Content & Navigation Improvements"
    ],
    mockupBg: "bg-sky-950/40",
    mockupVisual: (
      <div className="w-full h-full p-4 flex flex-col justify-center items-center text-white space-y-3">
        <div className="flex items-center gap-3">
          <div className="text-center">
            <span className="text-[8px] text-gray-400 block font-mono">OLD SITE SPEED</span>
            <span className="text-base font-black text-red-500">42/100</span>
          </div>
          <div className="text-xl text-gray-400">→</div>
          <div className="text-center">
            <span className="text-[8px] text-[#FE7146] block font-mono">NEW NEXT.JS SPEED</span>
            <span className="text-base font-black text-emerald-400">99/100</span>
          </div>
        </div>
        <div className="w-full bg-white/5 border border-white/10 p-2 rounded-lg space-y-1.5 text-left">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-[8px] font-mono text-gray-300">Images optimized to WebP format</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-[8px] font-mono text-gray-300">Removed 18 unused visual plugins</span>
          </div>
        </div>
      </div>
    )
  },
  {
    stageName: "Stage 06",
    title: "Uptime Support & Maintenance",
    tagline: "Continuous Secure Supervision",
    description: "Proactive 24/7 uptime monitoring, server performance tune-ups, weekly critical security updates, and automated remote database backups.",
    icon: <LifeBuoy className="w-5 h-5" />,
    bullets: [
      "Consistent daily remote server backups",
      "Proactive plugin & platform secure patching",
      "Instant critical alert team notification",
      "Continuous layout adjustments as requested"
    ],
    mockupBg: "bg-purple-950/40",
    mockupVisual: (
      <div className="w-full h-full p-4 flex flex-col justify-between text-white font-mono text-[9px]">
        <div className="flex justify-between items-center border-b border-white/10 pb-2">
          <span>Uptime_Monitor_Core</span>
          <span className="text-emerald-400">LIVE</span>
        </div>
        <div className="py-2 space-y-1">
          <div className="flex justify-between text-[8px] text-gray-300">
            <span>Main server ping:</span>
            <span className="text-emerald-400">14ms (Optimal)</span>
          </div>
          <div className="flex justify-between text-[8px] text-gray-300">
            <span>Secure SSL expiry:</span>
            <span className="text-emerald-400">Active (344 days remaining)</span>
          </div>
          <div className="flex justify-between text-[8px] text-gray-300">
            <span>Daily backup index:</span>
            <span className="text-emerald-400">Stored at 04:00 AM</span>
          </div>
        </div>
        <div className="h-6 bg-indigo-500/20 border border-indigo-400/30 rounded flex items-center justify-center text-[8px] text-indigo-300">
          ✓ 100% Core systems operational
        </div>
      </div>
    )
  }
];

  // Mobile accordion sets activeOfferTab to -1 when fully collapsed; the
  // desktop panel must still render a valid service after a viewport resize.
  const activeService = subServices[activeOfferTab] ?? subServices[0];

  // 3. Before/After Interactive State
  const [activeSliderProject, setActiveSliderProject] = useState<"saas" | "ecomm">("saas");

  const sliderProjects = {
    saas: {
      before: "https://res.cloudinary.com/couponsbit/image/upload/v1785911024/1_nhagzp.png",
      after: "https://res.cloudinary.com/couponsbit/image/upload/v1785911025/2_jrkkxl.png",
      beforeLabel: "LEGACY SAAS PORTAL (2023)",
      afterLabel: "ANALYTICS CLOUDS NEXT.JS BUILD"
    },
    ecomm: {
      before: "https://res.cloudinary.com/couponsbit/image/upload/v1785911024/3_dghkva.png",
      after: "https://res.cloudinary.com/couponsbit/image/upload/v1785911024/4_uecuyr.png",
      beforeLabel: "LEGACY STORE (SLOW COMPILATION)",
      afterLabel: "HIGH-CONVERTING FAST CHECOUT STORE"
    }
  };

  // 4. Featured Work Asymmetric Grid Items
  const portfolioItems = [
    {
      id: 1,
      title: "ScribeFlow SaaS Marketing Platform",
      client: "ScribeFlow Solutions",
      result: "+148% Conversions",
      description: "An elegant dark marketing system built with Framer Motion scroll indicators, interactive chart widgets, and immediate lead routing.",
      category: "SaaS App Development",
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      colSpan: "lg:col-span-8"
    },
    {
      id: 2,
      title: "Velvet Threads Boutique Hub",
      client: "Velvet Threads India",
      result: "42% Checkout Drop",
      description: "A luxury lifestyle e-commerce setup optimized for mobile with instantaneous filters, visual layout blocks, and frictionless multi-payment steps.",
      category: "Luxury E-Commerce",
      img: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80",
      colSpan: "lg:col-span-4"
    },
    {
      id: 3,
      title: "ArchStudio Editorial Portfolio",
      client: "ArchStudio Noida",
      result: "98 PageSpeed Score",
      description: "A visual architectural showreel project focused on micro-interactions, responsive grid shifts, and minimalist display typography.",
      category: "Creative Showcase",
      img: "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?auto=format&fit=crop&w=800&q=80",
      colSpan: "lg:col-span-4"
    },
    {
      id: 4,
      title: "FinTech Hub API Dashboard",
      client: "Noida Capital Partners",
      result: "99.99% Core Uptime",
      description: "A fast portal engineered on Node.js to track real-time transactional payloads, with schema compliance checks and instant custom reporting.",
      category: "Enterprise Web App",
      img: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
      colSpan: "lg:col-span-8"
    }
  ];

  // 5. FAQ Accordion Items
  const faqItems = [
    {
      question: "How long does a custom website project take to design & develop?",
      answer: "A standard corporate or marketing website (5-10 pages) is built from initial strategy to deployment in 3 to 5 weeks. More complex systems, bespoke React/Next.js platforms, or custom headless e-commerce architectures can take 6 to 10 weeks depending on custom visual parameters and database requirements."
    },
    {
      question: "Are your layouts genuinely mobile-friendly and search-optimized?",
      answer: "Absolutely. Mobile responsiveness and semantic SEO are fundamental elements of our development stack. Every layout aligns to strict viewport metrics, utilizes optimized WebP imagery, loads critical CSS on priority, and features custom schema markup to crawl, index, and rank high on search engines."
    },
    {
      question: "Do you handle custom hosting setup, SSL certificates, and domain routing?",
      answer: "Yes, we handle all the technical details. We assist in deploying your applications on high-speed servers (AWS, Vercel, Netlify, or custom cloud services), configure bulletproof SSL certificates, and route your domain nodes correctly with zero stress to your team."
    },
    {
      question: "Who retains the ultimate ownership of the custom code and Figma files?",
      answer: "You do. Once the final invoice is processed, you hold 100% ownership of all custom Figma files, React design systems, custom code structures, and assets. We can package everything neatly inside a secure git repository or cloud folder for your records."
    }
  ];

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div id="elevated-web-dev-root" className="pt-20 bg-white text-[#333333] selection:bg-[#FE7146] selection:text-white overflow-hidden">
      
      {/* SECTION 1: Interactive Hero - "The Build" */}
      <section id="elevated-hero" className="relative bg-white border-b border-gray-100 py-16 sm:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column Content */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-mono font-bold tracking-widest text-[#FE7146] bg-[#FFF1EC] uppercase">
                
                WEB DESIGN &amp; DEVELOPMENT
              </span>

              <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-[#303360] tracking-tight leading-tight">
                We Design. We Build. <br />
                We Ship Websites That <span className="text-[#FE7146] relative inline-block">
                  Perform
                  <span className="absolute bottom-1.5 left-0 w-full h-1 bg-[#FE7146]/20 rounded-full" />
                </span>
              </h1>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl font-normal">
                Your website is more than an online presence, it's your most valuable marketing tool. We design and develop fast, user-friendly, and conversion-focused websites that help you attract visitors, build trust, and turn them into customers.

              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => navigate.push('/contact')}
                  className="bg-[#FE7146] hover:bg-[#e0562b] text-white font-black text-xs sm:text-sm px-8 py-4 rounded-xl shadow-lg shadow-[#FE7146]/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer text-center"
                >
                  Consult Our Developers
                </button>
                <a
                  href="#before-after-redesign"
                  className="bg-white hover:bg-slate-50 border border-gray-200 text-[#303360] font-black text-xs sm:text-sm px-8 py-4 rounded-xl shadow-sm hover:border-gray-300 transition-colors text-center inline-flex items-center justify-center gap-1.5"
                >
                  <span>See Redesigns</span>
                  <ArrowRight size={14} className="text-[#303360]" />
                </a>
              </div>
            </div>

            {/* Hero Right: Web Design & Development Image */}
            <div className="lg:col-span-7 flex justify-center w-full">
              <div className="w-full relative">
                <img
                  src="https://res.cloudinary.com/dqjlffxja/image/upload/f_auto,q_auto/v1783790038/web_development_bcn2zq.jpg"
                  alt="Web design and development project dashboard"
                  className="relative w-full h-auto rounded-3xl"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Beneath the fold stack scrolling marquee */}
        <div className="mt-16 border-t border-b border-gray-100 bg-white py-6 relative overflow-hidden select-none">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          
          <div className="flex gap-16 animate-infinite-scroll w-max whitespace-nowrap">
            {[
              "React / Next.js", "Tailwind CSS", "WordPress Engine", "Shopify Stores", 
              "TypeScript Support", "Figma Design Studio", "Node.js Gateways", "Webflow Custom",
              "React / Next.js", "Tailwind CSS", "WordPress Engine", "Shopify Stores", 
              "TypeScript Support", "Figma Design Studio", "Node.js Gateways", "Webflow Custom"
            ].map((stack, idx) => (
              <span 
                key={idx} 
                className="font-mono text-xs font-bold text-slate-400 tracking-wider uppercase inline-flex items-center gap-2 hover:text-[#FE7146] transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#FE7146]/60" />
                {stack}
              </span>
            ))}
          </div>
        </div>

      </section>

      {/* SECTION 2: The Craft Statement (whitespace breather) */}
      <section id="craft-statement" className="py-24 sm:py-32 bg-white relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <p className="text-[#FE7146] font-mono font-bold text-xm uppercase tracking-widest">
            DESIGN PHILOSOPHY
          </p>
          <blockquote className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#303360] tracking-tight leading-relaxed max-w-4xl mx-auto">
            &quot;Good design gets noticed. <br />
            <span className="text-[#FE7146]">Great design gets results.</span>&quot;
          </blockquote>
          <p className="text-gray-400 text-xs sm:text-sm max-w-lg mx-auto font-normal leading-relaxed pt-2">
            We believe great design should do more than look good - it should deliver results. Every website we create is designed to capture attention, engage visitors, and encourage them to take action. 
          </p>
        </div>
      </section>

      {/* SECTION 3: What We Offer (Interactive tab mockup showcase) */}
      <section id="what-we-offer-tabs" className="py-20 sm:py-28 bg-slate-50 border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-16">
          
          <div className="space-y-3 max-w-3xl mx-auto">
            <span className="text-xm font-black text-[#FE7146] tracking-widest uppercase font-mono">
              CORE SERVICES
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#303360] tracking-tight mt-3">
              End-to-End Website Development
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed font-normal">
              From planning and design to development and optimization, we handle every stage of your website project to deliver a fast, user-friendly, and results-driven digital experience.
            </p>
          </div>

          {/* Desktop/Tablet Tabbed Layout */}
          <div className="hidden md:grid grid-cols-12 gap-8 items-stretch text-left">
            
            {/* Left Column: Vertical tab list */}
            <div className="col-span-5 space-y-3 flex flex-col justify-center">
              {subServices.map((svc, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveOfferTab(idx)}
                  onMouseEnter={() => setActiveOfferTab(idx)}
                  className={`w-full p-4.5 rounded-2xl border text-left transition-all duration-300 flex items-start gap-4 cursor-pointer group ${
                    activeOfferTab === idx
                      ? "bg-white border-[#FE7146]/20 shadow-lg shadow-orange-100/10 scale-[1.01]"
                      : "bg-transparent border-transparent hover:bg-white/50"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    activeOfferTab === idx
                      ? "bg-[#FFF1EC] text-[#FE7146]"
                      : "bg-slate-200/50 text-[#303360] group-hover:bg-[#FFF1EC] group-hover:text-[#FE7146]"
                  }`}>
                    {svc.icon}
                  </div>
                  <div className="space-y-1">
                    <h4 className={`font-display font-bold text-sm sm:text-base transition-colors ${
                      activeOfferTab === idx ? "text-[#FE7146]" : "text-[#303360]"
                    }`}>
                      {svc.title}
                    </h4>
                    <p className="text-slate-400 text-xs font-mono font-medium leading-none">
                      {svc.tagline}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            {/* Right Column: Visual Preview Card */}
            <div className="col-span-7 flex flex-col justify-between bg-white border border-gray-100 rounded-3xl p-8 shadow-xl relative overflow-hidden">
              <div className="space-y-4 relative z-10">
                <span className="text-[9px] font-mono font-bold text-[#FE7146] bg-[#FFF1EC] px-2.5 py-1 rounded-md uppercase">
                  {activeService.stageName}
                </span>
                
                
                <h3 className="font-display font-extrabold text-2xl text-[#303360] mt-3">
                  {activeService.title}
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed">
                  {activeService.description}
                </p>

                {/* Sub features bullet row */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  {activeService.bullets.map((b, bIdx) => (
                    <div key={bIdx} className="flex gap-2 items-center text-xs text-slate-600 font-medium">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Graphical representation preview slot */}
              <div className="mt-8 relative z-10">
                <div className="bg-[#303360] rounded-2xl border border-white/10 shadow-lg overflow-hidden">
                  <div className="bg-[#24274c] px-3 py-2 flex items-center gap-1.5 border-b border-white/5">
                    <span className="w-2 h-2 rounded-full bg-red-400" />
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  </div>
                  <div className={`p-4 min-h-[160px] ${activeService.mockupBg} flex items-center justify-center`}>
                    {activeService.mockupVisual}
                  </div>
                </div>
              </div>

              {/* Subtle visual glow underlay */}
              <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-orange-100/50 rounded-full filter blur-3xl pointer-events-none -z-10" />
            </div>

          </div>

          {/* Mobile Collapsible Accordion (replaces complex tabs) */}
          <div className="md:hidden space-y-4 text-left">
            {subServices.map((svc, idx) => (
              <div 
                key={idx} 
                className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setActiveOfferTab(activeOfferTab === idx ? -1 : idx)}
                  className="w-full p-5 flex items-center justify-between gap-4 text-left cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#FFF1EC] text-[#FE7146] flex items-center justify-center shrink-0">
                      {svc.icon}
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-sm text-[#303360]">{svc.title}</h4>
                      <p className="text-[10px] text-slate-400 font-mono">{svc.tagline}</p>
                    </div>
                  </div>
                  <ChevronDown size={16} className={`text-[#303360] transition-transform ${activeOfferTab === idx ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {activeOfferTab === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-gray-50 bg-slate-50/50"
                    >
                      <div className="p-5 space-y-4">
                        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                          {svc.description}
                        </p>
                        
                        <div className="space-y-2">
                          {svc.bullets.map((b, bIdx) => (
                            <div key={bIdx} className="flex gap-2 items-center text-xs text-slate-600 font-medium">
                              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                              <span>{b}</span>
                            </div>
                          ))}
                        </div>

                        <div className="bg-[#303360] rounded-xl overflow-hidden border border-white/5">
                          <div className={`p-4 min-h-[120px] ${svc.mockupBg} flex items-center justify-center`}>
                            {svc.mockupVisual}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 4: Our Process pipeline */}
      <section id="build-pipeline" className="py-20 sm:py-28 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-16">
          
          <div className="space-y-3 max-w-3xl mx-auto">
            <span className="text-xm font-black text-[#FE7146] tracking-widest uppercase font-mono">
              BUILD ROADMAP
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#303360] tracking-tight mt-3">
              Our 5-Step Website Development Process
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed font-normal">
              From planning to launch, we follow a proven process to build fast, user-friendly, and high-performing websites.

            </p>
          </div>

          {/* Sequential Timeline Pipeline wrapper */}
          <div className="relative">
            
            {/* Horizontal timeline track (Large screens) */}
            <div className="absolute top-[40px] left-10 right-10 h-1 bg-slate-100 hidden lg:block z-0">
              <div className="absolute inset-y-0 left-0 w-3/4 bg-gradient-to-r from-[#FE7146] to-indigo-500 rounded-full" />
            </div>

            {/* Steps Row */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
              {[
  { 
    step: "stage_01", 
    label: "Strategy & Planning", 
    desc: "We learn about your business, understand your goals, and plan your website structure to create the best experience for your visitors.", 
    icon: <Sliders className="w-5 h-5 text-[#FE7146]" /> 
  },
  { 
    step: "stage_02", 
    label: "Wireframing & Design", 
    desc: "We create page layouts and user journeys that make your website easy to navigate and visually engaging.", 
    icon: <Palette className="w-5 h-5 text-[#FE7146]" /> 
  },
  { 
    step: "stage_03", 
    label: "UI/UX Design", 
    desc: "We design a modern, on-brand interface with the right colors, typography, and visuals to create a professional first impression.", 
    icon: <Layers className="w-5 h-5 text-[#FE7146]" /> 
  },
  { 
    step: "stage_04", 
    label: "Website Development", 
    desc: "Our developers build a fast, responsive, and secure website that works seamlessly across all devices.", 
    icon: <Code2 className="w-5 h-5 text-[#FE7146]" /> 
  },
  { 
    step: "stage_05", 
    label: "Testing & Launch", 
    desc: "Before your website goes live, we test its speed, functionality, mobile responsiveness, and SEO to ensure everything performs flawlessly.", 
    icon: <Award className="w-5 h-5 text-[#FE7146]" /> 
  }
].map((item, idx) => (
                <div key={idx} className="flex flex-row md:flex-col items-start md:items-center text-left md:text-center gap-4 md:gap-5 group">
                  
                  {/* Step bubble */}
                  <div className="shrink-0 w-[72px] h-[72px] rounded-full bg-white border-2 border-slate-200 text-slate-500 group-hover:border-[#FE7146] group-hover:text-[#FE7146] font-mono font-black text-xs flex flex-col items-center justify-center transition-all duration-300 shadow-sm relative z-20">
                    <span className="text-[9px] text-[#FE7146]/80 tracking-widest">{item.step}</span>
                    <div className="mt-0.5">{item.icon}</div>
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-display font-extrabold text-sm sm:text-base text-[#303360]">
                      {item.label}
                    </h3>
                    <p className="text-slate-500 text-xs sm:text-sm font-normal leading-relaxed max-w-xs mx-auto">
                      {item.desc}
                    </p>
                  </div>

                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 7: Tech Stack - "Under the Hood" */}
      <section id="under-the-hood" className="py-20 sm:py-28 bg-[#303360] text-white relative overflow-hidden text-left">
        {/* Abstract dot indicators */}
        <div className="absolute inset-0 z-0 opacity-5 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />
          <div className="absolute bottom-0 right-0 w-[40rem] h-[40rem] bg-[#FE7146] rounded-full filter blur-3xl opacity-20" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            
            {/* Left Header info */}
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xm font-black text-[#FE7146] tracking-widest uppercase font-mono">
                SYSTEM UNDER THE HOOD
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight leading-tight mt-3">
                Our Front-End &amp; Back-End Tech Integration Stacks
              </h2>
              <p className="text-gray-300 text-sm font-normal leading-relaxed">
                We design and engineer bespoke web setups utilizing clean modular coding environments. Zero visual templates, minimal asset bloat, absolute performance index.
              </p>

              {/* Monospace terminal logs */}
              <div className="bg-slate-950 border border-white/10 p-4 rounded-xl space-y-2 font-mono text-[9px] text-gray-300 shadow-inner">
                <div className="flex items-center gap-1.5 border-b border-white/5 pb-1 text-[#FE7146] font-bold">
                  <Terminal size={12} />
                  <span>SPEED_AUDIT_LOGS</span>
                </div>
                <div className="flex justify-between">
                  <span>Avg. Lighthouse Speed Score:</span>
                  <span className="text-emerald-400">98/100</span>
                </div>
                <div className="flex justify-between">
                  <span>Average Layout Load Time:</span>
                  <span className="text-emerald-400">&lt;1.4s</span>
                </div>
                <div className="flex justify-between">
                  <span>Core Web Vitals Index:</span>
                  <span className="text-emerald-400">PASSED ✓</span>
                </div>
              </div>
            </div>

            {/* Right Badge Grid */}
            <div className="lg:col-span-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { name: "React / Next.js", code: "NextJS v15", icon: <Code2 className="w-5 h-5 text-[#FE7146]" /> },
                  { name: "Tailwind CSS", code: "Tailwind v4.0", icon: <Palette className="w-5 h-5 text-[#FE7146]" /> },
                  { name: "TypeScript", code: "Strict Types", icon: <Cpu className="w-5 h-5 text-[#FE7146]" /> },
                  { name: "Figma Studio", code: "Vector Frames", icon: <Monitor className="w-5 h-5 text-[#FE7146]" /> },
                  { name: "Shopify Engine", code: "Headless Retail", icon: <ShoppingCart className="w-5 h-5 text-[#FE7146]" /> },
                  { name: "Node.js Server", code: "API Gateways", icon: <Database className="w-5 h-5 text-[#FE7146]" /> }
                ].map((stack, idx) => (
                  <div
                    key={idx}
                    className="p-5 bg-white/5 border border-white/10 rounded-2xl flex flex-col items-start space-y-3 hover:bg-white/10 hover:border-[#FE7146]/30 transition-all duration-300"
                  >
                    <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white">
                      {stack.icon}
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-black text-white leading-tight">
                        {stack.name}
                      </h4>
                      <p className="text-[9px] text-[#FE7146] font-mono mt-0.5 font-bold uppercase tracking-wider">
                        {stack.code}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 5: Before/After Redesign Showcase (draggable slider) */}
      <section id="before-after-redesign" className="py-20 sm:py-28 bg-slate-50 border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-16">
          
          <div className="space-y-3 max-w-3xl mx-auto">
            <span className="text-xm font-black text-[#FE7146] tracking-widest uppercase font-mono">
              TRANSFORMATIONS
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#303360] tracking-tight mt-3">
              Drag to Compare: Old Cluttered Design vs. High-Velocity Redesign
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed font-normal">
              Slide the central handle left and right to inspect how we transform slow, template-heavy layouts into pristine, premium Next.js platforms.
            </p>
          </div>

          {/* Interactive Slider Container */}
          <div className="max-w-4xl mx-auto space-y-6">
            
            {/* Project switch buttons */}
            <div className="flex gap-2 justify-center">
              <button
                onClick={() => setActiveSliderProject("saas")}
                className={`px-4 py-2 rounded-xl text-xm font-bold font-mono transition-colors cursor-pointer ${
                  activeSliderProject === "saas"
                    ? "bg-[#FE7146] text-white"
                    : "bg-white hover:bg-slate-100 border border-gray-200 text-slate-500"
                }`}
              >
                SAAS PLATFORM REDESIGN
              </button>
              <button
                onClick={() => setActiveSliderProject("ecomm")}
                className={`px-4 py-2 rounded-xl text-xm font-bold font-mono transition-colors cursor-pointer ${
                  activeSliderProject === "ecomm"
                    ? "bg-[#FE7146] text-white"
                    : "bg-white hover:bg-slate-100 border border-gray-200 text-slate-500"
                }`}
              >
                E-COMMERCE HUB REDESIGN
              </button>
            </div>

            {/* Slider visual element */}
            <BeforeAfterSlider 
              beforeImg={sliderProjects[activeSliderProject].before}
              afterImg={sliderProjects[activeSliderProject].after}
              beforeLabel={sliderProjects[activeSliderProject].beforeLabel}
              afterLabel={sliderProjects[activeSliderProject].afterLabel}
            />

            <p className="text-slate-400 text-[10px] font-mono leading-none">
              💡 Touch and drag the orange handle indicator left or right to explore layout details.
            </p>
          </div>

        </div>
      </section>

      

      

      

     

      {/* SECTION 11: CTA Banner */}
      <section id="elevated-cta">
        <CtaBanner  />
      </section>

    </div>
  );
}
