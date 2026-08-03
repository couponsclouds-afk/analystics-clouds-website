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
  Sparkles,
  Users,
  Clock,
  Zap,
  Percent,
  Search,
  HelpCircle,
  TrendingUp,
  Mail,
  Heart,
  Share2,
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
  Video,
  Layers,
  Award,
  Eye,
  Rocket,
  ArrowUpRight,
  Calendar,
  ThumbsUp,
  Flame,
  CheckCircle2,
  ChevronRight,
  Plus
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

export function Services() {
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

  // 1. HERO LIVE-TICKING STATE
  const [likes, setLikes] = useState(1420);
  const [comments, setComments] = useState(243);
  const [shares, setShares] = useState(112);
  const [followers, setFollowers] = useState(12400);
  const [activePlatform, setActivePlatform] = useState(0); // 0: Instagram, 1: LinkedIn, 2: Facebook, 3: X/Twitter

  const platforms = [
    { name: "Instagram", icon: <Instagram className="w-4 h-4 text-[#E4405F]" />, handle: "@analytics_clouds_in" },
    { name: "LinkedIn", icon: <Linkedin className="w-4 h-4 text-[#0A66C2]" />, handle: "company/analytics-clouds" },
    { name: "Facebook", icon: <Facebook className="w-4 h-4 text-[#1877F2]" />, handle: "AnalyticsCloudsIndia" },
    { name: "Twitter", icon: <Twitter className="w-4 h-4 text-[#1DA1F2]" />, handle: "@AnalyticsClouds" }
  ];

  // Live counters ambient loop
  useEffect(() => {
    const counterInterval = setInterval(() => {
      setLikes(prev => prev + Math.floor(Math.random() * 3) + 1);
      if (Math.random() > 0.6) setComments(prev => prev + 1);
      if (Math.random() > 0.8) setShares(prev => prev + 1);
      if (Math.random() > 0.5) setFollowers(prev => prev + Math.floor(Math.random() * 2) + 1);
    }, 2800);

    const platformInterval = setInterval(() => {
      setActivePlatform(prev => (prev + 1) % platforms.length);
    }, 4000);

    return () => {
      clearInterval(counterInterval);
      clearInterval(platformInterval);
    };
  }, []);

  // 3. WHAT'S INCLUDED STATE
  const [selectedIncludeTab, setSelectedIncludeTab] = useState("strategy");
  const includesData = [
  {
    id: "strategy",
    title: "Social Media Strategy & Audit",
    description: "A successful social media presence starts with a clear strategy. We evaluate your existing social channels, understand your audience and competitors, and create a customized plan to help your brand grow.",
    capabilities: [
      "Social Media Audit",
      "Competitor Analysis",
      "Audience Research",
      "Platform Selection & Strategy",
      "Profile & Bio Optimization",
      "Content Planning Roadmap"
    ],
    metric: "100%",
    metricLabel: "Custom Blueprint",
    stageName: "Build a Strategy That Supports Your Business Goals"
  },
  {
    id: "creation",
    title: "Content Creation & Design",
    description: "Great content helps your brand stand out on social media. We create engaging visuals, compelling copy, and platform-specific content that connects with your audience and encourages meaningful engagement.",
    capabilities: [
      "Social Media Content Creation",
      "Custom Graphic Design",
      "Post Captions & Copywriting",
      "Carousel Posts & Infographics",
      "Branded Templates",
      "Consistent Brand Voice & Visual Identity"
    ],
    metric: "4K+",
    metricLabel: "Assets Produced",
    stageName: "Create Content That Captures Attention"
  },
  {
    id: "video",
    title: "Reels & Short-Form Videos",
    description: "Short-form videos are one of the most effective ways to reach and engage your audience. We create scroll-stopping Reels, Shorts, and TikTok videos that showcase your brand, increase visibility, and encourage meaningful engagement.",
    capabilities: [
      "Reels & Short-Form Video Creation",
      "Script Writing & Storyboarding",
      "Video Editing & Motion Graphics",
      "Captions, Music & Visual Effects",
      "Platform-Specific Video Optimization",
      "Creative Performance Improvements"
    ],
    metric: "3.2x",
    metricLabel: "Higher Reach Rate",
    stageName: "Create Videos That Capture Attention"
  },
  {
    id: "community",
    title: "Community Management",
    description: "Social media is about more than posting content - it's about building relationships. We engage with your audience, respond to messages and comments, manage conversations, and help create a loyal community around your brand.",
    capabilities: [
      "Comment & Message Management",
      "Community Engagement",
      "Customer Support on Social Media",
      "Review & Reputation Management",
      "Brand Sentiment Monitoring",
      "Community Performance Reports"
    ],
    metric: "15Mins",
    metricLabel: "Avg Response Time",
    stageName: "Build Meaningful Relationships with Your Audience"
  },
  {
    id: "influencer",
    title: "Influencer Marketing",
    description: "Reach new audiences and build trust through authentic influencer partnerships. We help you find the right creators, manage collaborations, and track campaign performance to maximize your brand's reach and results.",
    capabilities: [
      "Influencer Discovery & Selection",
      "Audience & Profile Verification",
      "Campaign Planning & Management",
      "Collaboration Coordination",
      "Performance Tracking",
      "ROI Reporting"
    ],
    metric: "250+",
    metricLabel: "Partner Network",
    stageName: "Partner with Influencers Who Fit Your Brand"
  },
  {
    id: "amplification",
    title: "Paid Social Advertising",
    description: "Organic content builds awareness, but paid social advertising helps you reach more of the right people. We promote your best-performing content to targeted audiences, helping you increase visibility, generate quality leads, and drive measurable business results.",
    capabilities: [
      "Paid Social Campaign Setup",
      "Audience Targeting",
      "Content Promotion",
      "Ad Copy & Creative Testing",
      "Campaign Performance Optimization",
      "ROI Tracking & Reporting"
    ],
    metric: "4.8x",
    metricLabel: "Average Ad ROAS",
    stageName: "Expand Your Reach with Targeted Social Ads"
  },
  {
    id: "analytics",
    title: "Analytics & Reporting",
    description: "Understand how your social media efforts contribute to your business goals. We provide clear reports and actionable insights that help you track growth, measure engagement, and make informed marketing decisions.",
    capabilities: [
      "Social Media Performance Reports",
      "Reach & Engagement Tracking",
      "Website Traffic & Conversion Insights",
      "Audience Growth Analysis",
      "Monthly Performance Reviews",
      "Strategy & Optimization Recommendations"
    ],
    metric: "100%",
    metricLabel: "Transparent Data",
    stageName: "Measure Your Social Media Performance"
  }
];

  // 4. PIPELINE STATE (ambient animation fallback for scroll scrub)
 const pipelineStages = [
  { num: "01", name: "Strategy & Planning", desc: "We understand your business goals, review your current social media presence, and create a strategy tailored to your brand.", status: "stage_ready" },
  { num: "02", name: "Content Planning", desc: "We prepare a content calendar with creative ideas, post topics, and publishing schedules to keep your social media consistent.", status: "in_review" },
  { num: "03", name: "Content Creation", desc: "Our team designs visuals, writes engaging captions, and creates videos that reflect your brand and connect with your audience.", status: "approved" },
  { num: "04", name: "Publish & Engage", desc: "We publish content at the right time, monitor audience interactions, and respond to comments and messages to keep your community active.", status: "published" },
  { num: "05", name: "Track & Improve", desc: "We analyze content performance, measure key metrics, and continuously refine the strategy to achieve better results over time.", status: "trending" }
];

  // 5. CONTENT MIX EXPLORER STATE & TIMELINE DRAGGER STATE
  const [activeFormat, setActiveFormat] = useState("reels");
  const formats = {
    reels: {
      title: "Reels & Shorts",
      accent: "Highest Algorithmic Reach",
      desc: "Captivating visual pacing, dynamic subtitles, and instant hooks tailored for continuous autoplay attention.",
      stats: [
        { val: "3.2x", label: "Higher average reach" },
        { val: "18.4%", label: "Average engagement" },
        { val: "68%", label: "Viewer retention (first 3s)" }
      ],
      previewTitle: "5 Noida Street Food Spots",
      previewLikes: "3.4K Likes",
      icon: <Video className="w-5 h-5 text-white" />
    },
    carousels: {
      title: "Educational Carousels",
      accent: "Maximum Saves & Shares",
      desc: "Step-by-step visual value cards that encourage swipe-throughs, triggering platform algorithms to double-exposure.",
      stats: [
        { val: "2.1x", label: "More saves than static" },
        { val: "14.2%", label: "Swipe-through rate" },
        { val: "1.8x", label: "Comment section depth" }
      ],
      previewTitle: "How Noida Startups Scale ROI",
      previewLikes: "1.9K Likes",
      icon: <Layers className="w-5 h-5 text-white" />
    },
    static: {
      title: "Static Brand Posts",
      accent: "Editorial Identity Cards",
      desc: "Bold display layouts, high-contrast imagery, and distinct branded templates that solidify premium positioning.",
      stats: [
        { val: "100%", label: "Brand-guideline compliant" },
        { val: "95%", label: "Visual recall rating" },
        { val: "4.5%", label: "Core click-to-profile rate" }
      ],
      previewTitle: "Analytics Clouds is Hiring",
      previewLikes: "852 Likes",
      icon: <Award className="w-5 h-5 text-white" />
    },
    stories: {
      title: "Direct Conversion Stories",
      accent: "Instant Web Clicks & Sales",
      desc: "Raw, behind-the-scenes content, interactive poll stickers, and daily direct-response links that convert interest to DMs.",
      stats: [
        { val: "12.8%", label: "Poll sticker interaction" },
        { val: "6.5%", label: "Direct link-click rate" },
        { val: "3.4x", label: "Inbound sales DM lift" }
      ],
      previewTitle: "Free Social Audit (Link Below)",
      previewLikes: "Poll: Ready to Grow? (94% Yes)",
      icon: <Flame className="w-5 h-5 text-white" />
    }
  };

  // Draggable playhead growth chart state
  const [scrubPosition, setScrubPosition] = useState(50); // percentage 0 - 100
  const dragContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Compute stats based on drag position
  const getScrubStats = (pos: number) => {
    // scale from Month 1 to Month 6
    const fraction = pos / 100;
    const baseMonth = 1;
    const maxMonth = 6;
    const currentMonth = Math.min(maxMonth, Math.max(baseMonth, Math.round(baseMonth + fraction * (maxMonth - baseMonth))));
    
    // curve for follower counts (exponential-ish)
    const baseFollowers = 2400;
    const maxFollowers = 34500;
    const curFollowers = Math.round(baseFollowers + Math.pow(fraction, 1.5) * (maxFollowers - baseFollowers));

    // engagement rate (starts high, dips slightly as audience scales, then stabilizes)
    const baseEng = 8.4;
    const minEng = 5.2;
    const maxEng = 7.8;
    let curEng = 8.4;
    if (fraction < 0.4) {
      curEng = baseEng - (baseEng - minEng) * (fraction / 0.4);
    } else {
      curEng = minEng + (maxEng - minEng) * ((fraction - 0.4) / 0.6);
    }

    // Reach count
    const curReach = Math.round((curFollowers * curEng * 3.8) / 100) * 10;

    return {
      month: currentMonth,
      followers: curFollowers.toLocaleString(),
      engagement: curEng.toFixed(1) + "%",
      reach: curReach.toLocaleString() + "+"
    };
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragMove = (clientX: number) => {
    if (!dragContainerRef.current) return;
    const rect = dragContainerRef.current.getBoundingClientRect();
    const relativeX = clientX - rect.left;
    const percentage = Math.min(100, Math.max(0, (relativeX / rect.width) * 100));
    setScrubPosition(percentage);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handleDragMove(e.clientX);
      }
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches[0]) {
        handleDragMove(e.touches[0].clientX);
      }
    };

    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchend", handleMouseUp);
    window.addEventListener("touchmove", handleTouchMove);

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchend", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [isDragging]);

  const scrubStats = getScrubStats(scrubPosition);

  // 9. FAQ ACCORDION STATE
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const faqs = [
    {
      q: "How many posts do you create per month?",
      a: "Depending on your selected tier (Starter, Growth, or Scale), we publish between 12 to 24+ highly customized content pieces per month. This content is curated across formats, blending educational carousel cards, high-impact static templates, and performance-driven vertical video reels designed specifically for social media engagement."
    },
    {
      q: "Do you handle community replies/DMs?",
      a: "Yes! Active engagement is critical to driving Noida sales. For our Growth and Scale packages, we provide daily community management. This includes replying to public comment threads, answering inbound inquiries, and routing hot purchase leads directly to your internal CRM or sales inbox."
    },
    {
      q: "Can you work with our existing brand guidelines?",
      a: "Absolutely. During our initial onboarding phase, we digest your corporate typography systems, HEX palettes, and brand voice documentations. If you do not have solid brand guidelines yet, our creative studio can construct a polished visual style deck to establish a consistent, professional feed presence."
    },
    {
      q: "Do you run paid social ads too, or only organic?",
      a: "We do both. While organic builds real trust and high-retention audiences, we frequently pairing it with Paid Social Amplification. By boosting your highest-converting organic assets, we extend reach to hyper-targeted lookalike segments, driving scalable Noida leads and maximizing your absolute ROI."
    }
  ];

  return (
    <div className="pt-20 bg-white">
      
      {/* 1. HERO — "The Feed, Alive" */}
      <section className="relative py-16 sm:py-24 bg-white border-b border-gray-100 overflow-hidden">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Hero Left Info */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <span className="font-mono text-xm font-bold text-[#FE7146] tracking-widest uppercase block">
                SOCIAL MEDIA MARKETING
              </span>
              <h1 className="font-display font-black text-4xl sm:text-5xl text-[#303360] leading-tight tracking-tight">
                Content That Gets Seen.<br />
              </h1>
              <p className="text-slate-600 text-base sm:text-lg max-w-2xl font-normal leading-relaxed">
                Social media is more than likes and followers, it's about building meaningful connections with your audience. We create engaging content, manage your social presence, and grow communities that increase brand awareness, build trust, and generate real business opportunities. 

              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <button
                  onClick={() => navigate.push('/contact')}
                  className="bg-[#FE7146] hover:bg-[#e0562b] text-white font-black text-sm px-7 py-4 rounded-xl shadow-lg shadow-[#FE7146]/20 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Get a Free Social Audit</span>
                  <ArrowRight size={16} />
                </button>
                <a
                  href="#included"
                  className="bg-slate-50 hover:bg-slate-100 border border-gray-200/60 text-[#303360] font-bold text-sm px-7 py-4 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <span>See Our Content Work</span>
                </a>
              </div>

              {/* Status Indicator */}
              <div className="flex items-center gap-3 pt-6">
                <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 border border-gray-200 rounded-lg">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="w-2 h-2 rounded-full bg-emerald-500 absolute" />
                  <span className="font-mono text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1.5">
                    status: trending
                  </span>
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  Currently managing <span className="text-[#303360] font-bold">2.4M+</span> impressions across channels.
                </div>
              </div>
            </div>

            {/* Hero Right: Social Media Marketing Dashboard Image */}
            <div className="lg:col-span-7 flex justify-center w-full">
              <div className="w-full relative">
                <img
                  src="https://res.cloudinary.com/dqjlffxja/image/upload/f_auto,q_auto/v1783790035/Social_Media_Marketing_hyks9d.jpg"
                  alt="Social media marketing engagement dashboard"
                  className="relative w-full h-auto rounded-3xl"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. THE CRAFT STATEMENT (Breather Section) */}
      <section className="py-20 sm:py-28 bg-white border-b border-gray-50 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="font-mono text-[16px] font-black text-[#FE7146] tracking-widest uppercase block mb-4">
            OUR SOCIAL PHILOSOPHY
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#303360] leading-snug">
            "Followers may grow your numbers.<br className="hidden sm:block" />
            <span className="text-[#FE7146]"> Community grows your business." </span>"
          </h2>
          <div className="mt-8 w-16 h-1 bg-[#FE7146] mx-auto rounded" />
          <p className="mt-6 text-gray-500 text-sm max-w-xl mx-auto leading-relaxed">
            We believe meaningful engagement matters more than vanity metrics. That's why we create content that encourages conversations, builds trust, and inspires actions like comments, shares, saves, profile visits, and direct messages. 

          </p>
        </div>
      </section>

      {/* 3. WHAT'S INCLUDED (Interactive Tab Showcase) */}
      <section id="included" className="py-16 sm:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="font-mono text-xm font-black text-[#FE7146] tracking-widest uppercase block">
              FLAGSHIP CAPABILITIES
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-[#303360] tracking-tight">
              Our Social Media Services 
            </h2>
            <p className="text-gray-500 text-sm sm:text-base">
              Our team of content creators, designers, strategists, and community managers works together to create engaging content, grow your audience, and strengthen your brand across every social platform. 

            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Vertical Tabs (Full viewport scroll on mobile, tab stack on desktop) */}
            <div className="lg:col-span-4 flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 gap-2.5 shrink-0 scrollbar-none">
              {includesData.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedIncludeTab(tab.id)}
                  className={`px-5 py-4 rounded-xl text-left font-display font-black text-xs sm:text-sm tracking-wide uppercase transition-all duration-200 cursor-pointer whitespace-nowrap lg:whitespace-normal flex items-center justify-between gap-3 shrink-0 ${
                    selectedIncludeTab === tab.id
                      ? "bg-[#303360] text-white shadow-md scale-[1.02] lg:translate-x-2"
                      : "bg-white text-[#303360] hover:bg-white/80 border border-gray-100"
                  }`}
                >
                  <span>{tab.title}</span>
                  <ChevronRight size={16} className={`hidden lg:block transition-transform ${selectedIncludeTab === tab.id ? "translate-x-1" : "opacity-30"}`} />
                </button>
              ))}
            </div>

            {/* Right Display Panel */}
            <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-xl text-left relative overflow-hidden min-h-[380px]">
              
              {/* Highlight background element */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFF1EC] opacity-50 rounded-full blur-3xl pointer-events-none" />

              <AnimatePresence mode="wait">
                {includesData.map((tab) => {
                  if (tab.id !== selectedIncludeTab) return null;
                  return (
                    <motion.div
                      key={tab.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-6"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-5">
                        <div>
                           <span className="text-[10px] font-mono font-black text-slate-400 tracking-wider mb-2 block">
                            {tab.stageName}
                          </span>
                          
                          <h3 className="font-display font-black text-2xl text-[#303360]">
                            {tab.title}
                          </h3>
                        </div>

                        
                      </div>

                      <p className="text-gray-600 text-sm leading-relaxed font-medium">
                        {tab.description}
                      </p>

                      <div className="space-y-3.5 pt-2">
                        <h4 className="font-display font-black text-xm text-[#303360] uppercase tracking-wider">
                          Key Capabilities:
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {tab.capabilities.map((cap, idx) => (
                            <div key={idx} className="flex items-start gap-2.5">
                              <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-100">
                                <Check size={11} className="stroke-[3]" />
                              </div>
                              <span className="text-[14px] text-slate-500 font-medium leading-tight">
                                {cap}
                              </span>
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

      {/* 4. OUR SOCIAL PROCESS — horizontal/vertical pipeline */}
      <section className="py-16 sm:py-24 bg-white overflow-hidden border-b border-gray-50 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl space-y-4 mb-16">
            <span className="font-mono text-xm font-black text-[#FE7146] tracking-widest uppercase block">
              PRODUCTION WORKFLOW
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-[#303360] tracking-tight">
            How We Manage Your Social Media

            </h2>
            <p className="text-gray-500 text-xm">
              A structured approach to planning, creating, publishing, and improving content that helps your brand grow.
            </p>
          </div>

          {/* Process Grid (Collapsable vertical on mobile) */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-4 relative">
            
            {/* Background progress connector bar for desktop */}
            <div className="hidden md:block absolute top-12 left-1/10 right-1/10 h-0.5 bg-gray-100 -z-10">
              <div className="w-4/5 h-full bg-[#FE7146]" /> {/* Mock scrub state fill */}
            </div>

            {pipelineStages.map((stage, idx) => (
              <div
                key={idx}
                className="bg-slate-50 hover:bg-white rounded-2xl p-5 border border-slate-100 hover:border-orange-100 hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-300 relative group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xm font-black text-gray-300 group-hover:text-[#FE7146] transition-colors">
                      {stage.num}
                    </span>
                    
                  </div>
                  <h4 className="font-display font-black text-xm text-[#303360] group-hover:text-[#FE7146] transition-colors leading-tight mb-2">
                    {stage.name}
                  </h4>
                  <p className="text-[12px] text-gray-500 font-medium leading-relaxed">
                    {stage.desc}
                  </p>
                </div>

               
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* 5. CONTENT MIX EXPLORER & DRAGGABLE TIMELINE GROWTH CHART (Signature Section) */}
      <section className="py-16 sm:py-24 bg-slate-50 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
           
            <h2 className="font-display font-black text-3xl sm:text-4xl text-[#303360] tracking-tight">
              Every Format, Done Right.
            </h2>
            <p className="text-gray-500 text-xm">
              We produce custom, platform-native content formats structured specifically to win visual exposure and maximize conversion actions.
            </p>
          </div>

          {/* Interactive Format Switcher Row */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {Object.keys(formats).map((key) => (
              <button
                key={key}
                onClick={() => setActiveFormat(key)}
                className={`px-5 py-3.5 rounded-xl font-display font-black text-xs uppercase tracking-wide transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                  activeFormat === key
                    ? "bg-[#FE7146] text-white shadow-lg shadow-[#FE7146]/20 scale-105"
                    : "bg-white text-[#303360] hover:bg-slate-100 border border-gray-100"
                }`}
              >
                <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 ${activeFormat === key ? "bg-white/20" : "bg-orange-50 text-[#FE7146]"}`}>
                  {React.cloneElement(formats[key as keyof typeof formats].icon, { className: `w-3 h-3 ${activeFormat === key ? "text-white" : "text-[#FE7146]"}` })}
                </div>
                <span>{formats[key as keyof typeof formats].title}</span>
              </button>
            ))}
          </div>

          {/* Format Detail Grid Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-xl mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left format text and metric chips */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <span className="font-mono text-[10px] font-black text-[#FE7146] tracking-widest uppercase block mb-1">
                    {formats[activeFormat as keyof typeof formats].accent}
                  </span>
                  <h3 className="font-display font-black text-2xl text-[#303360]">
                    {formats[activeFormat as keyof typeof formats].title}
                  </h3>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed font-medium">
                  {formats[activeFormat as keyof typeof formats].desc}
                </p>

                {/* Stat Chips list */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                  {formats[activeFormat as keyof typeof formats].stats.map((st, i) => (
                    <div key={i} className="text-left leading-tight">
                      <span className="font-mono text-2xl sm:text-3xl font-black text-[#FE7146] block">
                        {st.val}
                      </span>
                      <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider block">
                        {st.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right format mock smartphone preview (Stylized matching on-brand colors) */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-[240px] bg-[#303360] rounded-[36px] p-3 shadow-xl border-2 border-slate-200 relative overflow-hidden">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-4 bg-slate-200/20 rounded-b-xl z-20" />

                  <div className="bg-slate-900 rounded-[28px] text-white min-h-[340px] p-3 flex flex-col justify-between relative overflow-hidden text-left">
                    
                    {/* Visual format elements */}
                    <div className="flex items-center justify-between z-10">
                      <span className="text-[8px] font-mono font-bold px-2 py-0.5 bg-[#FE7146] rounded-md uppercase">
                        {activeFormat} preview
                      </span>
                      <span className="text-[9px] font-bold text-white/50">Analytics Clouds</span>
                    </div>

                    {/* Styled design layout vector based on format */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />
                    
                    {/* Format graphic placeholder element */}
                    <div className="my-auto text-center py-8 z-10">
                      {activeFormat === "reels" && (
                        <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mx-auto flex items-center justify-center animate-pulse">
                          <Video className="w-6 h-6 text-white" />
                        </div>
                      )}
                      {activeFormat === "carousels" && (
                        <div className="flex gap-2 justify-center">
                          <div className="w-10 h-14 rounded-lg bg-white/10 border border-white/20 rotate-[-8deg] flex items-center justify-center font-bold text-[10px] shrink-0">1</div>
                          <div className="w-10 h-14 rounded-lg bg-[#FE7146] shadow-lg z-10 flex items-center justify-center font-bold text-[10px] shrink-0">2</div>
                          <div className="w-10 h-14 rounded-lg bg-white/10 border border-white/20 rotate-[8deg] flex items-center justify-center font-bold text-[10px] shrink-0">3</div>
                        </div>
                      )}
                      {activeFormat === "static" && (
                        <div className="w-16 h-16 rounded-xl bg-white/10 border border-white/20 mx-auto flex items-center justify-center font-display font-black text-xl text-[#FE7146]">
                          AC
                        </div>
                      )}
                      {activeFormat === "stories" && (
                        <div className="w-20 bg-white/10 border border-white/20 rounded-xl p-2 mx-auto space-y-1.5 shadow-lg">
                          <div className="h-1 bg-[#FE7146] rounded" />
                          <div className="h-4 bg-white/5 rounded flex items-center justify-center text-[7px] font-bold text-[#FE7146]">CURIOUS?</div>
                          <div className="h-2.5 bg-[#FE7146] rounded text-[6px] font-extrabold flex items-center justify-center">SWIPE UP ↗</div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-1.5 z-10 pt-2 border-t border-white/10">
                      <h5 className="font-display font-black text-xs truncate">
                        {formats[activeFormat as keyof typeof formats].previewTitle}
                      </h5>
                      <div className="flex items-center gap-2 text-[9px] text-white/70">
                        <span className="flex items-center gap-0.5"><ThumbsUp size={10} className="text-[#FE7146]" /> {formats[activeFormat as keyof typeof formats].previewLikes}</span>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

            </div>
          </div>

        

        </div>
      </section>

     

      {/* 10. CTA BANNER (Shared Orange Band style, adapted headline) */}
      <CtaBanner  />

    </div>
  );
}
