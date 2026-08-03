/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

"use client";

import { useState, useEffect, useRef } from "react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from "motion/react";
import {
  Search,
  Target,
  Share2,
  Code2,
  Tv,
  TrendingUp,
  ArrowRight,
  Database,
  Award,
  CheckCircle,
  Users,
  ChevronRight,
  Sparkles,
  Zap,
  BarChart2,
  Star,
  Quote
} from "lucide-react";
import { CtaBanner } from '@/components/CtaBanner';

// Intersection Observer Counter for counting up once when scrolled into view
function ScrollCounter({
  endValue,
  suffix = "",
  prefix = "",
  delay = 0,
  duration = 1500
}: {
  endValue: number;
  suffix?: string;
  prefix?: string;
  delay?: number;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          // Wait for custom delay before triggering
          setTimeout(() => {
            setHasStarted(true);
          }, delay);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [hasStarted, delay]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number | null = null;
    const startValue = 0;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing: easeOutQuad
      const easedProgress = progress * (2 - progress);
      const currentValue = Math.floor(startValue + easedProgress * (endValue - startValue));

      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(endValue);
      }
    };

    requestAnimationFrame(animate);
  }, [hasStarted, endValue, duration]);

  return (
    <div ref={ref} className="inline-block">
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </div>
  );
}

// Counter that triggers on load with a delay
function DelayedCounter({
  endValue,
  suffix = "",
  prefix = "",
  delay = 500,
  duration = 1500
}: {
  endValue: number;
  suffix?: string;
  prefix?: string;
  delay?: number;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const [shouldStart, setShouldStart] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldStart(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!shouldStart) return;

    let startTime: number | null = null;
    const startValue = 0;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      const easedProgress = progress * (2 - progress);
      const currentValue = Math.floor(startValue + easedProgress * (endValue - startValue));

      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(endValue);
      }
    };

    requestAnimationFrame(animate);
  }, [shouldStart, endValue, duration]);

  return (
    <span className="font-mono">
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

interface HomeProps {}
export function Home(props: HomeProps) {
  const navigate = useRouter();
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  // Testimonial slider: 3 cards per view on desktop (lg+), 1 on mobile
  const [testimonialItemsPerView, setTestimonialItemsPerView] = useState(1);
  const [activeTestimonialSlide, setActiveTestimonialSlide] = useState(0);
  const [isTestimonialPaused, setIsTestimonialPaused] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    const updateItemsPerView = () => setTestimonialItemsPerView(mql.matches ? 3 : 1);
    updateItemsPerView();
    mql.addEventListener("change", updateItemsPerView);
    return () => mql.removeEventListener("change", updateItemsPerView);
  }, []);

  // 8 services with descriptive icons, details, metrics, and matching routes
  const services = [
    {
      title: "Search Engine Optimization (SEO)",
      icon: <Search className="w-5 h-5 text-[#FE7146]" />,
      bg: "bg-[#FFF1EC]",
      desc: "Rank higher on Google and secure high-value organic traffic that actively converts.",
      metric: "+230% Organic Traffic",
      path: "/services/seo"
    },
    {
      title: "Performance Marketing (Google Ads)",
      icon: <Target className="w-5 h-5 text-indigo-600" />,
      bg: "bg-indigo-50",
      desc: "Drive targeted high-intent leads with search, shopping, and optimized campaigns.",
      metric: "4.8x Average ROAS",
      path: "/services/google-ads"
    },
    {
      title: "Social Media Marketing",
      icon: <Share2 className="w-5 h-5 text-sky-500" />,
      bg: "bg-sky-50",
      desc: "Build community and scale social sales across Instagram, Facebook, and LinkedIn.",
      metric: "+180% Engagement",
      path: "/services/performance-marketing" // links to related performance marketing
    },
    {
      title: "Web Design & Development",
      icon: <Code2 className="w-5 h-5 text-emerald-600" />,
      bg: "bg-emerald-50",
      desc: "Speed-optimized, conversion-focused websites engineered for seamless UX.",
      metric: "98+ PageSpeed Score",
      path: "/services/web-design-development"
    },
    {
      title: "Display & Native Ads",
      icon: <Tv className="w-5 h-5 text-amber-600" />,
      bg: "bg-amber-50",
      desc: "Build highly contextual visual awareness across top online publications.",
      metric: "0.8% Average CTR",
      path: "/services/display-native-ads"
    },
    {
      title: "Performance Marketing (Full-Suite)",
      icon: <TrendingUp className="w-5 h-5 text-rose-600" />,
      bg: "bg-rose-50",
      desc: "Holistic marketing strategy integrating multi-channel attribution and scaling.",
      metric: "40% Lower CPA",
      path: "/services/performance-marketing"
    }
  ];

  // Client industry badges marquee
  const industries = [
    "Healthcare",
    "EdTech",
    "E-commerce",
    "SaaS",
    "Real Estate",
    "B2B Services",
    "FinTech",
    "Logistics"
  ];

  // Why Choose Us differentiators
  const differentiators = [
    {
      icon: <Database className="w-5 h-5 text-[#FE7146]" />,
      title: "Data-Driven Strategy",
      desc: "We analyze cold, hard market data instead of relying on emotional guesses to align your marketing budget."
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-[#FE7146]" />,
      title: "ROI-Focused Approach",
      desc: "Every creative asset and media buy is aggressively optimized to maximize customer acquisition value."
    },
    {
      icon: <Award className="w-5 h-5 text-[#FE7146]" />,
      title: "Experienced, Certified Team",
      desc: "Experienced professionals in campaign management, data analysis, and design."
    },
    {
      icon: <CheckCircle className="w-5 h-5 text-[#FE7146]" />,
      title: "Transparent Reporting",
      desc: "Live performance dashboards and weekly review calls keep you updated on actual conversion stats."
    }
  ];

  // Why Choose Us stats
  const stats = [
    { value: 200, suffix: "+", label: "Happy Clients", desc: "Across India" },
    { value: 500, suffix: "+", label: "Campaigns Delivered", desc: "High-yield funnels" },
    { value: 98, suffix: "%", label: "Client Retention Rate", desc: "Long-term partnerships" },
    { value: 7, suffix: "+", label: "Years of Experience", desc: "Proven track record" }
  ];

  // Photography-forward Case Studies
  const caseStudies = [
    {
      category: "SEO",
      categoryBg: "bg-indigo-50 text-indigo-700",
      title: "How We Increased Organic Traffic by 230% for a Healthcare Brand",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
      headlineResult: "+230% Organic Traffic",
      metrics: ["2.1k Keywords Ranked", "45% Lower CPA"],
      path: "/services/seo"
    },
    {
      category: "Google Ads",
      categoryBg: "bg-orange-50 text-[#FE7146]",
      title: "Generated 4X More Lead Conversions for an EduTech Platform",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
      headlineResult: "4X Leads Delivered",
      metrics: ["42% CTR Lift", "3.2x Campaign ROI"],
      path: "/services/google-ads"
    },
    {
      category: "Social Media",
      categoryBg: "bg-pink-50 text-pink-700",
      title: "Boosted Social Engagement by 180% for an E-commerce Brand",
      image: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=800&q=80",
      headlineResult: "+180% Engagement",
      metrics: ["2.5x Revenue Growth", "30k+ New Followers"],
      path: "/services/performance-marketing"
    }
  ];

  // Testimonials with outcome-specific quotes
  const testimonials = [
    {
      quote: "Analytics Clouds has consistently proven to be one of our top-performing partners, driving significant business outcomes for us at Just herbs (Marico). Specially, working with Sanjeev as our point of contact has been a true value-add he's proactive, detail-oriented, and always focused on delivering results. His ability to understand our goals and align the team accordingly has made our collaboration smooth and impactful.",
      author: "Chandan Choudhary",
      role: "Marketing Head",
      company: "Just Herbs",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80"
    },
    {
      quote: "Heartfelt congratulations on reaching an incredible milestone — 5 years of innovation, growth, and impact! Your dedication to delivering quality, building strong partnerships, and pushing boundaries in your field has set a great example for others in the industry. Wishing the entire team at Analytics Clouds continued success and many more milestones ahead! Sanjeev has been one of the best colleagues to interact with and truly understand both sides of the business. Together, we have contributed greatly for each other's business goals and hope to continue this relationship for many more years to come.",
      author: "Manish Raj",
      role: "Business Development Manager",
      company: "CosIQ",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80"
    },
    {
      quote: "Working with Deepika was an extremely great experience. She communicated professionally, quickly, and effectively from the start. She displayed a thorough understanding of their product and was always prepared to go the extra mile to help us.",
      author: "Madhav",
      role: "CEO",
      company: "The Man company",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80"
    },
    {
      quote: "It's nice working with Analytics Clouds as our affiliate Partner Secondly. When we started things were a little complicated. But, the organization managed so well at that time to make this smooth. So, Hats off to the entire Analytics Clouds team Good Luck and best wishes for mutual future growth.",
      author: "Sahil Chawla",
      role: "Business Development Manager",
      company: "GNC",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80"
    },
    {
      quote: "Heartfelt congratulations on reaching an incredible milestone — 5 years of innovation, growth, and impact! It's truly inspiring to see how far Analytics Clouds has come. Your dedication to delivering quality, building strong partnerships, and pushing boundaries in your field has set a great example for others in the industry. We are proud to be associated with you and value the partnership we share. Here's to many more years of collaboration, achievements, and mutual growth. Wishing the entire team at Analytics Clouds continued success and many more milestones ahead!.",
      author: "Aman",
      role: "CEO",
      company: "Kent RO",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80"
    },{
      quote: "It has been a pleasure working with your company in the past 3 years! Sanjeev has been one of the best colleagues to interact with and truly understand both sides of the business. Together, we have contributed greatly for each other's business goals and hope to continue this relationship for many more years to come. Onwards and upwards!.",
      author: "Madhav",
      role: "Marketing Head",
      company: "Tax buddy",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80"
    },
    {
      quote: "Congratulations to you and the entire Analytics Clouds team on completing 5 incredible years! Working with you has been an absolute pleasure. Your proactive approach, prompt support, and clear understanding of our requirements have made coordination smooth and effective. You've always ensured that things move forward seamlessly, and that's been a big part of why our collaboration with Analytics Clouds has been so successful. Analytics Clouds has played a valuable role in helping us derive meaningful insights and optimize our campaigns more efficiently. Your team's support and expertise have truly made a difference. Wishing you and the team continued success and many more milestones ahead!.",
      author: "Madhav",
      role: "CEO",
      company: "Foxtale",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80"
    },
    {
      quote: "As an affiliate partner focused on performance marketing, I am thoroughly impressed with Analytics Clouds. Their team combines deep expertise in digital strategy with a results-driven approach, consistently delivering measurable growth and high ROI for our campaigns. Their focus on data-driven performance marketing ensures that every campaign is optimized for conversions, not just clicks, helping us turn more visitors into loyal customers. The team's professionalism, creative thinking, and commitment to partner success make them a top choice for any brand seeking to scale with performance-based affiliate marketing. I highly recommend Analytics Clouds to anyone looking for a reliable, innovative, and growth-oriented affiliate partner in the performance marketing space.",
      author: "Madhav",
      role: "CEO",
      company: "Nua Woman",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80"
    },
    {
      quote: "The team at Analytics Cloud are more like a growth partner their proactive approach and strong affiliate network helped us reach the right audiences and drive consistent results. Congratulations on completing 5 years.",
      author: "Rahul Maheshwari",
      role: "Marketing Head",
      company: "Salty",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80"
    },
    {
      quote: "The team at Analytics Cloud are more like a growth partner, their proactive approach and strong affiliate network helped us reach the right audiences and drive consistent results. Congratulations on completing 5 years.",
      author: "Salty",
      role: "Marketing Head",
      company: "Salty",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80"
    },
    {
      quote: "Working with Analytics Cloud on the Jockey campaign has been a smooth and result-driven experience. Their team effectively utilized affiliate channels like cashback sites and Telegram to drive quality traffic and conversions. Communication was clear, timely, and professional throughout. We look forward to continuing this successful partnership.",
      author: "",
      role: "Marketing Head",
      company: "Philona Choudhary",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80"
    },
    {
      quote: "Your expertise and dedication have been invaluable. Here's to many more years of growth, innovation, and success! Thank you for your hard work and commitment. We look forward to continued collaboration and success.",
      author: "Ministry of Nuts",
      role: "Marketing Head",
      company: "Ministry of Nuts",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80"
    }
  ];

  // Group testimonials into pages of `testimonialItemsPerView` cards each
  const testimonialSlides: (typeof testimonials)[] = [];
  for (let i = 0; i < testimonials.length; i += testimonialItemsPerView) {
    testimonialSlides.push(testimonials.slice(i, i + testimonialItemsPerView));
  }
  const totalTestimonialSlides = testimonialSlides.length;

  useEffect(() => {
    setActiveTestimonialSlide((prev) => (prev >= totalTestimonialSlides ? 0 : prev));
  }, [totalTestimonialSlides]);

  useEffect(() => {
    if (isTestimonialPaused || totalTestimonialSlides <= 1) return;
    const timer = setInterval(() => {
      setActiveTestimonialSlide((prev) => (prev + 1) % totalTestimonialSlides);
    }, 5000);
    return () => clearInterval(timer);
  }, [isTestimonialPaused, totalTestimonialSlides]);

  const goToTestimonialSlide = (index: number) => {
    setActiveTestimonialSlide(((index % totalTestimonialSlides) + totalTestimonialSlides) % totalTestimonialSlides);
  };

  // Blog Insights
  const blogPosts = [
    {
      category: "SEO",
      date: "July 10, 2026",
      title: "10 Proven SEO Strategies to Rank Higher on Google in 2026",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&h=400&q=80"
    },
    {
      category: "Google Ads",
      date: "July 8, 2026",
      title: "Google Ads vs Facebook Ads: Which is Better for Your Business?",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&h=400&q=80"
    },
    {
      category: "Content Marketing",
      date: "July 5, 2026",
      title: "How to Create SEO-Friendly Content That Ranks & Converts",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&h=400&q=80"
    }
  ];

  return (
    <div className="bg-white overflow-hidden">
      {/* 1. Hero — Real, Full-Width Photography */}
      <section className="relative min-h-[80vh] lg:min-h-[85vh] flex items-center justify-center pt-16 overflow-hidden bg-[#303360]">
        {/* Full-bleed background photograph */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://res.cloudinary.com/dqjlffxja/image/upload/v1783866909/firsrt-try_lpqjzv.jpg"
            
            alt="Analytics Clouds Campaign Strategy Team"
            className="w-full h-full object-cover object-center scale-105 filter brightness-95"
            referrerPolicy="no-referrer"
          />
          {/* Subtle navy gradient scrim ensuring deep contrast and complete legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#303360] via-[#303360]/85 to-[#303360]/30 sm:from-[#303360]/95 sm:via-[#303360]/80 sm:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#303360] via-[#303360]/40 to-transparent lg:hidden" />
        </div>

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left side content overlaid on scrim */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-6 text-left">
              {/* Eyebrow tag */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-block font-mono text-xs font-semibold text-[#FE7146] tracking-wider uppercase bg-[#FFF1EC]/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#FE7146]/30"
              >
                DIGITAL & PERFORMANCE MARKETING
              </motion.div>

              {/* Clamp-based headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-6xl sm:text-6xl lg:text-6xl font-black text-white leading-[1.2] tracking-tight font-display"
              >
                Make Your Ideas{" "}
                <span className="text-[#FE7146] inline-block relative">
                  Trending.
                  <span className="absolute left-0 bottom-1 w-full h-1 bg-[#FE7146]/20 rounded" />
                </span> 
              </motion.h1>

              {/* Subcopy */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-gray-200 text-base sm:text-lg font-normal leading-relaxed max-w-xl"
              >
                Analytics Clouds is a full-service digital growth partner helping businesses scale through SEO, performance marketing, AI-powered automation, web experiences, and data-driven strategies that deliver measurable business results.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
              >
                <button
  onClick={() => navigate.push("/contact")}
  className="bg-[#FE7146] hover:bg-[#e0562b] text-white font-extrabold px-8 py-4 rounded-xl shadow-lg shadow-[#FE7146]/25 hover:shadow-[#FE7146]/35 transition-all text-center flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
>
  <span>Get a Free Growth Audit</span>
  <TrendingUp size={18} />
</button> 

                <button
                  onClick={() => navigate.push("/services")}
                  className="border-2 border-white/60 hover:border-white text-white font-bold px-8 py-4 rounded-xl transition-all text-center flex items-center justify-center gap-2 hover:bg-white/10 active:scale-[0.98] cursor-pointer"
                >
                  <span>Explore Our Work</span>
                  <ArrowRight size={18} className="text-[#FE7146]" />
                </button>
              </motion.div>
            </div>

          </div>
        </div>

        {/* Slow horizontal drifting marquee at the bottom fold */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#303360]/90 backdrop-blur-sm border-t border-white/5 py-4 overflow-hidden z-20">
          <style>{`
            @keyframes marquee {
              0% { transform: translateX(0%); }
              100% { transform: translateX(-50%); }
            }
            .animate-marquee {
              animation: marquee 35s linear infinite;
            }
          `}</style>
          
          <div className="flex w-[200%] animate-marquee whitespace-nowrap hover:[animation-play-state:paused] cursor-pointer">
            <div className="flex gap-16 justify-around items-center w-1/2">
              {industries.map((ind, i) => (
                <div key={i} className="flex items-center gap-3 text-white/70 font-display font-medium text-sm">
                  <span className="text-[#FE7146] font-bold">//</span>
                  <span>{ind} Solutions</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                </div>
              ))}
            </div>
            <div className="flex gap-16 justify-around items-center w-1/2">
              {industries.map((ind, i) => (
                <div key={`dup-${i}`} className="flex items-center gap-3 text-white/70 font-display font-medium text-sm">
                  <span className="text-[#FE7146] font-bold">//</span>
                  <span>{ind} Solutions</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. The Craft Statement (editorial breather section) */}
      <section className="bg-white py-20 sm:py-28 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <Quote size={40} className="mx-auto text-orange-200" />
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#303360] leading-snug tracking-tight max-w-3xl mx-auto">
              "Marketing isn't about being loud. It's about being{" "}
              <span className="text-[#FE7146]">found by the right people, at the right time.</span>"
            </h2>
            <div className="h-0.5 w-16 bg-gradient-to-r from-[#FE7146] to-indigo-500 mx-auto mt-6" />
          </motion.div>
        </div>
      </section>

      {/* 3. Services — Expand-on-Interaction Preview */}
      <section className="py-24 bg-[#F5F5FA] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xl font-bold text-[#FE7146] tracking-widest uppercase font-mono block">
              WHAT WE DO
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#303360] leading-tight tracking-tight">
              Every Solution. One Team.
            </h2>
            <p className="text-[#333333]/70 text-base max-w-xl mx-auto font-normal">
              Explore how each service contributes to your growth journey.
            </p>
          </div>

          {/* Interactive expand-on-hover service tiles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc, i) => {
              const isAnyHovered = hoveredService !== null;
              const isThisHovered = hoveredService === i;

              return (
                <div
                  key={i}
                  onMouseEnter={() => setHoveredService(i)}
                  onMouseLeave={() => setHoveredService(null)}
                  onClick={() => setHoveredService(hoveredService === i ? null : i)}
                  className={`relative overflow-hidden cursor-pointer bg-white p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between h-[270px] ${
                    isThisHovered
                      ? "border-[#FE7146]/30 shadow-2xl scale-[1.03] z-10"
                      : isAnyHovered
                      ? "border-gray-100 opacity-60 scale-[0.98] blur-[0.5px]"
                      : "border-gray-100 shadow-md"
                  }`}
                >
                  <div className="space-y-4 text-left">
                    {/* Icon container */}
                    <div className={`w-10 h-10 rounded-xl ${svc.bg} flex items-center justify-center transition-transform duration-300 ${isThisHovered ? "scale-110" : ""}`}>
                      {svc.icon}
                    </div>

                    {/* Title */}
                    <h3 className="font-display font-bold text-[#303360] text-base leading-snug group-hover:text-[#FE7146] transition-colors">
                      {svc.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed line-clamp-3">
                      {svc.desc}
                    </p>
                  </div>

                  {/* Expandable Section with short metric and link */}
                  <div className="pt-4 border-t border-gray-50 flex flex-col space-y-2 text-left">
                    {/* Smooth height and opacity expand */}
                    <div className={`transition-all duration-300 overflow-hidden ${isThisHovered ? "max-h-16 opacity-100" : "max-h-0 opacity-0"}`}>
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 font-mono bg-emerald-50 px-2.5 py-1 rounded-md w-fit mb-2">
                        <Zap size={12} className="fill-emerald-600" />
                        <span>{svc.metric}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <Link href={svc.path}
                        className="inline-flex items-center gap-1 text-xs font-extrabold text-[#FE7146] hover:gap-2 transition-all"
                      >
                        <span>Learn More</span>
                        <ArrowRight size={14} />
                      </Link>
                      <ChevronRight size={14} className={`text-slate-300 transition-transform ${isThisHovered ? "rotate-90 text-[#FE7146]" : ""}`} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Suffix hub link */}
          <div className="text-center mt-12">
            <Link href="/services"
              className="inline-flex items-center gap-2 text-sm font-extrabold text-[#303360] hover:text-[#FE7146] transition-colors"
            >
              <span>View All Services</span>
              <ArrowRight size={16} className="text-[#FE7146]" />
            </Link>
          </div>

        </div>
      </section>

      {/* 4. Why Choose Us — photography + stats */}
      <section className="relative bg-[#303360] text-white overflow-hidden min-h-[600px] flex items-stretch">
        <div className="grid grid-cols-1 lg:grid-cols-12 w-full">
          
          {/* Left Column: Second Real Photograph with scrim */}
          <div className="lg:col-span-5 relative min-h-[350px] lg:min-h-full overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85"
              alt="Analytics Clouds client and campaign team meeting"
              className="absolute inset-0 w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {/* Scrim overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#303360] hidden lg:block" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#303360] to-transparent lg:hidden" />
          </div>

          {/* Right Column: Navy Background & Stats + Differentiators */}
          <div className="lg:col-span-7 py-20 px-6 sm:px-12 lg:px-16 flex flex-col justify-center space-y-12 text-left relative z-10">
            <div className="space-y-4">
              <span className="text-xl font-bold text-[#FE7146] tracking-widest uppercase font-mono block">
                WHY CHOOSE US
              </span>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-white leading-tight tracking-tight">
                We Build Growth That Lasts.
              </h2>
              <p className="text-gray-300 text-sm sm:text-base font-normal max-w-xl">
                We create impactful campaigns and optimize them with data to maximize your return on ad spend.
              </p>
            </div>

            {/* Differentiators */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {differentiators.map((diff, i) => (
                <div key={i} className="flex gap-4 items-start group">
                  <div className="p-3 bg-white/10 rounded-xl group-hover:bg-[#FE7146]/20 transition-colors shrink-0">
                    {diff.icon}
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-display font-bold text-white text-sm sm:text-base">
                      {diff.title}
                    </h3>
                    <p className="text-gray-300 text-xs sm:text-sm font-normal leading-relaxed">
                      {diff.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* 2x2 Stat Cards Grid */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="bg-white/5 backdrop-blur-sm p-5 rounded-2xl border border-white/10 hover:border-[#FE7146]/40 transition-all duration-300 text-left hover:bg-gradient-to-br hover:from-white/10 hover:to-[#FE7146]/5 hover:shadow-lg"
                >
                  <div className="space-y-1">
                    <div className="text-2xl sm:text-3xl font-mono font-black text-[#FE7146] tracking-tight">
                      <ScrollCounter endValue={stat.value} suffix={stat.suffix} delay={100 * i} />
                    </div>
                    <div className="font-display font-bold text-sm text-white">
                      {stat.label}
                    </div>
                    <div className="text-[11px] text-gray-400 font-medium">
                      {stat.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 5. Real Results — Case Studies */}
      {/* <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
   
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold text-[#FE7146] tracking-widest uppercase font-mono block">
    
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#303360] leading-tight tracking-tight">
              Real Results. Real Impact.
            </h2>
            <p className="text-[#333333]/70 text-base max-w-xl mx-auto font-normal">
              Explore concrete examples of how our performance strategies drive massive revenue and customer pipeline growths.
            </p>
          </div>


          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {caseStudies.map((cs, i) => (
              <div
                key={i}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#FE7146]/20 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between text-left"
              >
                <div>
          
                  <div className="h-52 overflow-hidden relative">
                    <img
                      src={cs.image}
                      alt={cs.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <span className={`absolute top-4 left-4 text-[11px] font-bold font-mono uppercase tracking-wider px-3 py-1 rounded-md ${cs.categoryBg}`}>
                      {cs.category}
                    </span>
                  </div>

                  <div className="p-6 space-y-4">
      
                    <div className="flex items-center gap-2 text-emerald-600 font-mono font-black text-lg">
                      <Zap size={16} className="fill-emerald-600" />
                      <span>{cs.headlineResult}</span>
                    </div>

        
                    <h3 className="font-display font-bold text-lg text-[#303360] leading-snug group-hover:text-[#FE7146] transition-colors line-clamp-2">
                      {cs.title}
                    </h3>

     
                    <div className="flex flex-wrap gap-2 pt-2">
                      {cs.metrics.map((metric, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] font-semibold text-slate-500 bg-[#F5F5FA] px-2.5 py-1 rounded-full border border-gray-100"
                        >
                          {metric}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

              
                <div className="px-6 pb-6 pt-2">
                  <Link href={cs.path}
                    className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#FE7146] hover:gap-2.5 transition-all"
                  >
                    <span>View Case Study</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section> */}

      {/* 6. What Our Clients Say (Testimonials) */}
      <section className="py-24 bg-[#FFF1EC]/20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xl font-bold text-[#FE7146] tracking-widest uppercase font-mono block">
              TESTIMONIALS
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#303360] leading-tight tracking-tight">
              What Our Clients Say
            </h2>
            <p className="text-[#333333]/70 text-base max-w-xl mx-auto font-normal">
              Real growth stories from businesses that achieved results with us.
            </p>
          </div>

          {/* Testimonial Slider */}
          <div
            className="relative"
            onMouseEnter={() => setIsTestimonialPaused(true)}
            onMouseLeave={() => setIsTestimonialPaused(false)}
          >
            <div className="overflow-hidden">
              <motion.div
                className="flex"
                animate={{ x: `-${activeTestimonialSlide * 100}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {testimonialSlides.map((slide, slideIndex) => (
                  <div key={slideIndex} className="w-full shrink-0">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-1">
                      {slide.map((test, i) => (
                        <div
                          key={i}
                          className="bg-white p-8 rounded-2xl border border-gray-100 shadow-md flex flex-col justify-between hover:shadow-xl hover:border-[#FE7146]/10 transition-all duration-300 text-left"
                        >
                          <div className="space-y-6">
                            {/* Quotes Icon */}
                            <Quote size={28} className="text-[#FE7146] opacity-35" />

                            {/* Quote Body */}
                            <p className="text-slate-600 text-sm leading-relaxed italic">
                              "{test.quote}"
                            </p>
                          </div>

                          {/* Author Info */}
                          <div className="flex items-center gap-4 pt-6 mt-6 border-t border-gray-50">
                            <div>

                              <p className="text-[15px] text-slate-500 font-medium">
                                <strong className="text-[#333333] font-semibold">{test.company}</strong>
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Dot Indicators */}
            {totalTestimonialSlides > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                {testimonialSlides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goToTestimonialSlide(i)}
                    aria-label={`Go to testimonial slide ${i + 1}`}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      activeTestimonialSlide === i ? "w-8 bg-[#FE7146]" : "w-2.5 bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

        </div>
      </section>

      {/* 7. Latest Insights (Blog Preview) */}
      {/* <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
    
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold text-[#FE7146] tracking-widest uppercase font-mono block">
              // LATEST INSIGHTS
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#303360] leading-tight tracking-tight">
              Marketing Strategy Decoded
            </h2>
            <p className="text-[#333333]/70 text-base max-w-xl mx-auto font-normal">
              Practical guides and actionable insights from our senior performance strategists.
            </p>
          </div>

        
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, i) => (
              <div
                key={i}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between text-left"
              >
                <div>
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-[10px] font-bold font-mono text-[#303360] uppercase px-2.5 py-1 rounded-md shadow-sm border border-gray-100">
                      {post.category}
                    </span>
                  </div>

                  <div className="p-6 space-y-2">
                    <span className="text-[10px] text-slate-400 font-mono font-medium block">
                      {post.date}
                    </span>
                    <h3 className="font-display font-bold text-base text-[#303360] leading-snug group-hover:text-[#FE7146] transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2">
                  <Link href="/blog"
                    className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#FE7146] hover:gap-2.5 transition-all"
                  >
                    <span>Read More</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          
          <div className="text-center mt-12">
            <Link href="/blog"
              className="inline-flex items-center gap-2 text-sm font-extrabold text-[#303360] hover:text-[#FE7146] transition-colors"
            >
              <span>View All Articles</span>
              <ArrowRight size={16} className="text-[#FE7146]" />
            </Link>
          </div>

        </div>
      </section> */}

      {/* 8. CTA Banner (Shared global style component) */}
      <CtaBanner  />
    </div>
  );
}
