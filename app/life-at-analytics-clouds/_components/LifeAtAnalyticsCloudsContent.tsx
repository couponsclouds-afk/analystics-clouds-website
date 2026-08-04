/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Users,
  Heart,
  Award,
  Sparkles,
  MapPin,
  Clock,
  BookOpen,
  Briefcase,
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  ChevronDown,
  ChevronLeft,
  Send,
  CheckCircle2,
  PartyPopper,
  MessageSquare,
  Coffee,
  Gamepad2,
  Zap,
  Home,
  Coins,
  HeartHandshake,
  X,
  Loader2,
  Paperclip,
  Compass
} from "lucide-react";

export function LifeAtAnalyticsClouds() {
  // Job openings list
  const openRoles = [
    {
      id: 1,
      title: "Senior SEO Strategist",
      department: "SEO & Content Strategy",
      location: "Noida Hub (Sector 62)",
      type: "Full-Time",
      experience: "3-5 Years",
      salary: "₹8L - ₹14L per annum",
      about: "We are seeking a seasoned SEO wizard who lives and breathes organic growth. You will take complete charge of SEO audits, keyword mapping, technical SEO, and link-building strategies for leading D2C and SaaS brands.",
      requirements: [
        "Proven track record of scaling organic traffic by 3x+ for clients.",
        "Deep expertise in technical SEO, site speed audits, schema markup, and crawlability optimization.",
        "Proficient in Semrush, Ahrefs, Screaming Frog, GSC, and Google Analytics.",
        "Excellent communication and team leadership skills to mentor junior executives."
      ],
      responsibilities: [
        "Formulate and execute end-to-end SEO blueprints for high-value client portfolios.",
        "Conduct rigorous technical site audits and collaborate with dev teams for seamless implementation.",
        "Monitor daily keyword tracking, CTR metrics, and organic conversion pipelines.",
        "Lead monthly organic strategy reviews and performance presentations with clients."
      ]
    },
    {
      id: 2,
      title: "Performance Marketing Specialist",
      department: "Paid Media Strategy",
      location: "Noida HQ / Hybrid",
      type: "Full-Time",
      experience: "2-4 Years",
      salary: "₹6L - ₹10L per annum",
      about: "Join our high-performing Paid Ads squad. We manage high-budget campaigns on Google Search, Performance Max, Meta, and LinkedIn. You will optimize campaigns with scientific rigor, looking at real-time dashboards to scale ROI.",
      requirements: [
        "Hands-on experience managing over ₹5L+ monthly ad spend with high ROAS.",
        "Proficiency in Meta Ads Manager, Google Ads, Google Tag Manager, and custom pixels.",
        "Strong analytical mindset with ability to spot trends in Excel and Google Sheets.",
        "Experience with creative asset testing and copywriting high-converting ad copy."
      ],
      responsibilities: [
        "Structure, deploy, and continuously optimize paid search and paid social campaigns.",
        "Conduct rapid A/B testing on ad copies, visual creatives, and customized landing pages.",
        "Set up advanced conversion tracking, attribution funnels, and UTM parameters.",
        "Report daily performance metrics, focusing on CPL, CPA, CAC, and overall ROAS."
      ]
    },
    {
      id: 3,
      title: "Social Media Content Creator",
      department: "Creative & Branding",
      location: "Jaipur Creative Center",
      type: "Full-Time",
      experience: "1-3 Years",
      salary: "₹4L - ₹7L per annum",
      about: "We are looking for a creative, energetic storyteller who knows what makes content go viral on Instagram Reels, YouTube Shorts, and LinkedIn. You will design, shoot, and script content that highlights brand personality.",
      requirements: [
        "A stunning creative portfolio of video edits, posts, or personal content channels.",
        "Proficiency in CapCut, Premiere Pro, Canva, or Figma.",
        "Deep understanding of current social trends, soundbites, and algorithm behaviors.",
        "Confidence in front of the camera and an engaging verbal tone."
      ],
      responsibilities: [
        "Ideate, storyboard, and script 10-15 short-form video assets weekly.",
        "Shoot high-quality content inside our creative spaces and edit with engaging visuals.",
        "Manage social communities, engage with comments, and draft witty captions.",
        "Collaborate with the paid ads squad to design fresh performance creative concepts."
      ]
    },
    {
      id: 4,
      title: "Frontend UI/UX Developer",
      department: "Product & Engineering",
      location: "Noida Hub",
      type: "Full-Time",
      experience: "2-3 Years",
      salary: "₹7L - ₹12L per annum",
      about: "We build gorgeous, high-performance websites and interactive marketing funnels. You will turn UI mockups into pristine, responsive React/Tailwind web apps with buttery-smooth animations.",
      requirements: [
        "Expert knowledge of React, TypeScript, Tailwind CSS, and bundlers like Vite.",
        "Familiarity with animation libraries such as Motion (Framer Motion).",
        "Stellar attention to detail—you care about typography, micro-interactions, and perfect alignment.",
        "Solid understanding of web performance optimization (Core Web Vitals)."
      ],
      responsibilities: [
        "Develop responsive and accessible web applications, landings, and client dashboards.",
        "Implement stunning layout transitions and interactive UI details.",
        "Optimize sites for maximum speed, accessibility, and search crawler indexability.",
        "Work closely with our conversion rate optimization (CRO) leads to design fast A/B tests."
      ]
    }
  ];

  // Employee voices
  const testimonials = [
    {
      name: "Ananya Sen",
      role: "Performance Lead",
      tenure: "3 years at Analytics Clouds",
      image: "https://res.cloudinary.com/couponsbit/image/upload/v1785831447/WhatsApp_Image_2026-07-09_at_4.36.26_PM_xo3zxi.jpg",
      quote: "Starting as a junior analyst, I was given absolute freedom to run budgets. In 3 years, I've scaled client ad spend by 10x and now lead a team of 5 talented specialists. The lack of micromanagement is real—if you show results, you own the channel and chart your own growth path."
    },
    {
      name: "Rohan Mehta",
      role: "Senior SEO Strategist",
      tenure: "2 years at Analytics Clouds",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&h=200&q=80",
      quote: "What I love most is our dedicated learning budget. If there's a premium masterclass, an industry conference, or a specialized SEO tool I need to test, there is zero red tape. We are encouraged to run real-world search experiments rather than just following dry theoretical textbooks."
    },
    {
      name: "Meera Nair",
      role: "Content & Copywriter Lead",
      tenure: "1.5 years at Analytics Clouds",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&h=200&q=80",
      quote: "Our 'Work Hard, Chai Harder' motto is literally how we live! The creative energy here is incredibly infectious, especially during brainstorming sessions. We throw bold ideas at the whiteboards over hot samosas and tapri tea, and the best idea always wins."
    },
    {
      name: "Devansh Sharma",
      role: "Frontend UI/UX Developer",
      tenure: "1 year at Analytics Clouds",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80",
      quote: "I was amazed by the collaboration between engineering and marketing here. We don't just write code; we design dynamic conversion paths that directly boost organic CTR and drop CPA by 40%. Seeing your code directly drive millions in client sales is extremely rewarding."
    }
  ];

  // Culture values
  const cultureValues = [
    {
      icon: <PartyPopper className="w-6 h-6 text-[#FE7146]" />,
      iconBg: "bg-[#FFF1EC]",
      title: "We Celebrate Wins — Big or Small",
      desc: "From a minor SEO ranking jump to a 10X ROI campaign victory, we ring the Noida office brass bell, throw digital confetti, and make sure excellent work gets the recognition it deserves."
    },
    {
      icon: <Users className="w-6 h-6 text-indigo-600" />,
      iconBg: "bg-indigo-50",
      title: "Ideas Over Hierarchy",
      desc: "A stellar ad angle, design concept, or automation script can come from an intern or a director. We don't care about job titles; we care about data, creativity, and impact."
    },
    {
      icon: <Zap className="w-6 h-6 text-amber-500" />,
      iconBg: "bg-amber-50",
      title: "Fail Fast, Learn Faster",
      desc: "We don't fear mistakes; we fear stagnation. Run the experiment, audit the data, optimize, and share the lessons. Every single failed ad set is just a stepping stone to a scaled winner."
    },
    {
      icon: <Coffee className="w-6 h-6 text-emerald-600" />,
      iconBg: "bg-emerald-50",
      title: "Work Hard, Chai Harder",
      desc: "Noida One runs on hot tapri chai and double-shot espresso. We find that the most creative strategic breakthroughs happen with a warm cup of tea in hand and some fresh samosas on the table."
    },
    {
      icon: <Gamepad2 className="w-6 h-6 text-rose-500" />,
      iconBg: "bg-rose-50",
      title: "Absolute Fun Fridays",
      desc: "Every single week ends with team multiplayer gaming, custom trivia challenges, snacks, and lots of laughter. We believe a team that laughs together, smashes organic and paid KPIs together."
    },
    {
      icon: <Compass className="w-6 h-6 text-sky-600" />,
      iconBg: "bg-sky-50",
      title: "Own It, Scale It",
      desc: "No micromanagement here. You get complete ownership over your funnels, client campaigns, and creative ideas. We trust your expertise, give you the resources, and reward the outcome."
    }
  ];

  // Perks & benefits
  const perks = [
    {
      icon: <Clock className="w-5 h-5 text-amber-600" />,
      iconBg: "bg-amber-100/60",
      title: "Flexible Hours",
      desc: "Work during your peak creative energy windows. We care about campaign impact, not punch-in cards."
    },
    {
      icon: <BookOpen className="w-5 h-5 text-blue-600" />,
      iconBg: "bg-blue-100/60",
      title: "Learning Budget",
      desc: "Get 100% sponsored digital marketing masterclasses, SEO certifications, and technical coding courses."
    },
    {
      icon: <HeartHandshake className="w-5 h-5 text-rose-600" />,
      iconBg: "bg-rose-100/60",
      title: "Comprehensive Health",
      desc: "Complete medical insurance coverage for you and your family to keep you secure and worry-free."
    },
    {
      icon: <Sparkles className="w-5 h-5 text-violet-600" />,
      iconBg: "bg-violet-100/60",
      title: "Festive Celebrations",
      desc: "Epic Diwali, Holi, and Christmas office decorations, custom hampers, and themed corporate parties."
    },
    {
      icon: <Coins className="w-5 h-5 text-emerald-600" />,
      iconBg: "bg-emerald-100/60",
      title: "Performance Bonuses",
      desc: "Generous, uncapped quarterly bonuses tied directly to the scale and retention of your ad accounts."
    },
    {
      icon: <MapPin className="w-5 h-5 text-teal-600" />,
      iconBg: "bg-teal-100/60",
      title: "Annual Team Retreats",
      desc: "Pack your bags! We host yearly team trips to places like Goa, Rishikesh, and Jaipur to relax and reboot."
    },
    {
      icon: <Coffee className="w-5 h-5 text-orange-600" />,
      iconBg: "bg-orange-100/60",
      title: "Free Meals & Snacks",
      desc: "A fully stocked office pantry with fresh fruit, noodles, cold drinks, samosas, and endless tea and coffee."
    },
    {
      icon: <Home className="w-5 h-5 text-indigo-600" />,
      iconBg: "bg-indigo-100/60",
      title: "Hybrid Work Setup",
      desc: "Coordinate with your team lead for structured work-from-home options to support balanced lifestyles."
    }
  ];

  // Gallery images for "A Day in the Life"
  const galleryImages = [
    {
      src: "https://res.cloudinary.com/couponsbit/image/upload/v1785831447/WhatsApp_Image_2026-07-09_at_4.36.26_PM_xo3zxi.jpg",
      caption: "Spontaneous whiteboard session over campaign parameters",
      aspect: "row-span-2 col-span-1 h-[420px] md:h-full"
    },
    {
      src: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=800&h=500&q=80",
      caption: "Weekly content brainstorm in Noida conference room",
      aspect: "col-span-1 md:col-span-2 h-[200px] md:h-[240px]"
    },
    {
      src: "https://images.unsplash.com/photo-1542744173-8e0856011213?auto=format&fit=crop&w=500&h=500&q=80",
      caption: "Reviewing performance marketing metrics together",
      aspect: "col-span-1 h-[200px] md:h-[240px]"
    },
    {
      src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&h=500&q=80",
      caption: "Relaxing and laughing in our DLF Noida breakroom",
      aspect: "col-span-1 h-[200px] md:h-[220px]"
    },
    {
      src: "https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?auto=format&fit=crop&w=500&h=700&q=80",
      caption: "Ananya mapping out next month's organic SEO roadmap",
      aspect: "row-span-2 col-span-1 h-[420px] md:h-full"
    },
    {
      src: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&h=500&q=80",
      caption: "Celebrating a 500% ROI milestone with team lunch",
      aspect: "col-span-1 md:col-span-2 h-[200px] md:h-[220px]"
    }
  ];

  // Component states
  const [expandedRole, setExpandedRole] = useState<number | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("General Application");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form states
  const [applyForm, setApplyForm] = useState({
    name: "",
    email: "",
    phone: "",
    portfolio: "",
    experience: "Entry Level",
    resumeUrl: "",
    message: ""
  });
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const getFieldError = (field: string) => {
    if (!touched[field]) return "";
    switch (field) {
      case "name":
        return !applyForm.name.trim() ? "Full name is required." : "";
      case "email":
        if (!applyForm.email.trim()) return "Email address is required.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(applyForm.email)) {
          return "Please enter a valid email address.";
        }
        return "";
      case "phone":
        return !applyForm.phone.trim() ? "Phone number is required." : "";
      default:
        return "";
    }
  };

  const openApplyModal = (roleTitle: string) => {
    setSelectedRole(roleTitle);
    setIsModalOpen(true);
    setIsSubmitted(false);
  };

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, phone: true });

    if (!applyForm.name.trim() || !applyForm.email.trim() || !applyForm.phone.trim() || getFieldError("email")) {
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const handlePrevTestimonial = () => {
    setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNextTestimonial = () => {
    setActiveTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const scrollToOpenings = () => {
    const section = document.getElementById("open-positions-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div id="life-at-analytics-clouds-container" className="bg-white text-[#333333] selection:bg-[#FE7146] selection:text-white">
      
      {/* 1. Hero Section - Photo Forward Team Collage */}
      <section id="careers-hero" className="relative min-h-[75vh] flex items-center justify-center overflow-hidden">
        
        {/* Absolute Background image with dark/orange filter overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://res.cloudinary.com/couponsbit/image/upload/v1785830516/life-at-analytics-clouds-hero_vhol82.png"
            alt="Analytics Clouds Noida Team"
            className="w-full h-full object-cover scale-[1.01]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#303360]/95 via-[#303360]/85 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#303360] via-transparent to-transparent" />
          {/* Custom vector pattern inside the background */}
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(#FE7146_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-20 hidden md:block" />
        </div>

        {/* Hero content container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-28 sm:pt-32 pb-12 sm:pb-16 text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left side: Heading */}
            <div className="lg:col-span-8 space-y-6 sm:space-y-8">
              
              <div className="inline-flex items-center gap-2 bg-[#FFF1EC] border border-[#FE7146]/20 px-3.5 py-1.5 rounded-full shadow-sm">
              
                <span className="text-[11px] font-bold text-[#FE7146] tracking-widest uppercase">
                  LIFE AT ANALYTICS CLOUDS
                </span>
              </div>

              <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-7xl text-white leading-[1.05] tracking-tight">
                Where Great People <br />
                Do <span className="text-[#FE7146] relative inline-block">
                  Great Work
                  <span className="absolute left-0 bottom-2 w-full h-1.5 bg-[#FE7146]/20 rounded-full" />
                </span>
              </h1>

              <p className="text-gray-200 text-base sm:text-lg font-normal leading-relaxed max-w-2xl">
                Join our elite squad of digital strategists, paid campaign leads, and growth engineers in Noida. We combine deep data analytics with relentless creative freedom to scale India's finest digital brands.
              </p>

              {/* See open roles button */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <button
                  onClick={scrollToOpenings}
                  className="bg-[#FE7146] hover:bg-[#e0562b] text-white font-black text-sm px-8 py-4 rounded-xl shadow-lg shadow-[#FE7146]/30 transition-all hover:scale-[1.02] active:scale-[0.98] inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>See Open Roles</span>
                  <ArrowRight size={16} />
                </button>
                <a
                  href="#why-analytics-clouds"
                  className="border border-white/20 hover:border-white text-white font-bold text-sm px-6 py-4 rounded-xl backdrop-blur-xs hover:bg-white/5 transition-all inline-flex items-center justify-center gap-1.5"
                >
                  Learn About Culture
                </a>
              </div>

              {/* Personality Stat row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-8 border-t border-white/10 max-w-3xl">
                
                {/* Stat 1 */}
                <div className="flex flex-col text-left">
                  <span className="font-display font-black text-2xl sm:text-3xl text-[#FE7146]">
                    50+
                  </span>
                  <span className="text-xs text-gray-300 font-medium mt-1">
                    Growth Experts
                  </span>
                </div>

                {/* Stat 2 */}
                <div className="flex flex-col text-left">
                  <span className="font-display font-black text-2xl sm:text-3xl text-[#FE7146]">
                    26
                  </span>
                  <span className="text-xs text-gray-300 font-medium mt-1">
                    Average Age
                  </span>
                </div>

                {/* Stat 3 */}
                <div className="flex flex-col text-left">
                  <span className="font-display font-black text-2xl sm:text-3xl text-[#FE7146]">
                    3
                  </span>
                  <span className="text-xs text-gray-300 font-medium mt-1">
                    Regional Hubs
                  </span>
                </div>

                {/* Stat 4 */}
                <div className="flex flex-col text-left">
                  <span className="font-display font-black text-2xl sm:text-3xl text-[#FE7146]">
                    100%
                  </span>
                  <span className="text-xs text-gray-300 font-medium mt-1">
                    Fun Fridays
                  </span>
                </div>

              </div>

            </div>

          

          </div>
        </div>
      </section>

      {/* 2. Our Culture & Values - icon + punchy description */}
      <section id="why-analytics-clouds" className="py-20 sm:py-28 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4">
            <span className="text-xs font-bold text-[#FE7146] tracking-widest uppercase bg-[#FFF1EC] px-3.5 py-1.5 rounded-full">
              OUR CULTURE
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#303360] tracking-tight leading-tight">
              Values Written in <span className="text-[#FE7146]">Casual Voice</span>
            </h2>
            <p className="text-[#333333] text-sm sm:text-base leading-relaxed text-gray-500 max-w-xl mx-auto">
              We skip the boring corporate manuals and standard jargon. Here is how we actually collaborate, push boundaries, and operate daily inside our offices.
            </p>
          </div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cultureValues.map((val, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-100 p-8 rounded-3xl shadow-xs hover:shadow-xl hover:border-[#FE7146]/20 transition-all duration-300 text-left flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className={`w-12 h-12 rounded-2xl ${val.iconBg} flex items-center justify-center shrink-0`}>
                    {val.icon}
                  </div>
                  <h3 className="font-display font-black text-lg text-[#303360]">
                    {val.title}
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm font-normal leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. A Day in the Life - Masonry / Asymmetric Gallery with hover zoom */}
      <section id="gallery-section" className="py-20 sm:py-28 bg-[#F5F5FA] border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4">
            <span className="text-xs font-bold text-[#FE7146] tracking-widest uppercase">
              A DAY IN THE LIFE
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#303360] tracking-tight leading-tight">
              Moments That Make Us <span className="text-[#FE7146]">Who We Are</span>
            </h2>
            <p className="text-[#333333] text-sm sm:text-base leading-relaxed text-gray-500 max-w-xl mx-auto">
              Real candids, actual brainstorm boards, game nights, and shared samosas. Peek inside our daily routines and celebrations.
            </p>
          </div>

          {/* Asymmetric Masonry Photo Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {galleryImages.map((img, idx) => (
              <div
                key={idx}
                className={`relative group rounded-3xl overflow-hidden shadow-md border border-gray-100/50 ${img.aspect}`}
              >
                <img
                  src={img.src}
                  alt={img.caption}
                  className="w-full h-full object-cover group-hover:scale-[1.04] transition-all duration-700 select-none pointer-events-none"
                  referrerPolicy="no-referrer"
                />
                
               

                {/* Mobile static caption band (always visible on small screens) */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 md:hidden text-left">
                  <p className="font-sans font-semibold text-white text-xs">
                    {img.caption}
                  </p>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

   

      {/* 5. Perks & Benefits - Grid of cards */}
      <section id="perks" className="py-20 sm:py-28 bg-[#F5F5FA] border-y border-gray-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4">
            <span className="text-xs font-bold text-[#FE7146] tracking-widest uppercase">
              WHY YOU'LL LOVE IT HERE
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#303360] tracking-tight leading-tight">
              Perks That Power <span className="text-[#FE7146]">Your Best Work</span>
            </h2>
            <p className="text-[#333333] text-sm sm:text-base leading-relaxed text-gray-500 max-w-xl mx-auto">
              Our compensation packages and creative perks are structured to keep you energized, growing, and completely secure.
            </p>
          </div>

          {/* Perks Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {perks.map((perk, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-100/80 p-6 sm:p-8 rounded-3xl shadow-xs hover:shadow-lg transition-all duration-300 text-left flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className={`w-10 h-10 rounded-xl ${perk.iconBg} flex items-center justify-center shrink-0`}>
                    {perk.icon}
                  </div>
                  <h4 className="font-display font-bold text-[#303360] text-sm sm:text-base leading-tight">
                    {perk.title}
                  </h4>
                  <p className="text-gray-500 text-xs sm:text-sm font-normal leading-relaxed">
                    {perk.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. Open Positions - Accordion / Job List with Apply trigger */}
      <section id="open-positions-section" className="py-20 sm:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4">
            <span className="text-xs font-bold text-[#FE7146] tracking-widest uppercase bg-[#FFF1EC] px-3.5 py-1.5 rounded-full">
              JOIN US
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#303360] tracking-tight leading-tight">
              We're Hiring — <span className="text-[#FE7146]">Come Build With Us</span>
            </h2>
            <p className="text-gray-500 text-sm max-w-lg mx-auto">
              Choose your track and start your journey. Click any opening below to explore key details, requirements, and apply instantly.
            </p>
          </div>

          {/* Job List Accordion Container */}
          <div className="space-y-4 text-left">
            {openRoles.map((role) => {
              const isExpanded = expandedRole === role.id;
              return (
                <div
                  key={role.id}
                  className={`border rounded-2xl transition-all duration-300 overflow-hidden bg-white ${
                    isExpanded
                      ? "border-[#FE7146] shadow-md shadow-[#FE7146]/5"
                      : "border-gray-200/80 hover:border-gray-300 shadow-xs"
                  }`}
                >
                  
                  {/* Accordion Trigger Header */}
                  <button
                    onClick={() => setExpandedRole(isExpanded ? null : role.id)}
                    className="w-full px-6 py-5 sm:py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-left cursor-pointer"
                  >
                    <div className="space-y-1.5 flex-grow">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-extrabold text-[#FE7146] bg-[#FFF1EC] px-2.5 py-0.5 rounded-md tracking-wider uppercase">
                          {role.department}
                        </span>
                        <span className="text-[10px] font-bold text-[#303360] bg-slate-100 px-2.5 py-0.5 rounded-md uppercase">
                          {role.type}
                        </span>
                      </div>
                      
                      <h3 className="font-display font-black text-lg sm:text-xl text-[#303360]">
                        {role.title}
                      </h3>
                      
                      {/* Location and Info row */}
                      <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-gray-500 font-medium">
                        <span className="flex items-center gap-1">
                          <MapPin size={13} className="text-gray-400" />
                          {role.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={13} className="text-gray-400" />
                          Exp: {role.experience}
                        </span>
                      </div>
                    </div>

                    {/* Expand indicator button */}
                    <div className="self-end sm:self-center shrink-0 w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-slate-400 hover:text-[#FE7146] transition-colors bg-slate-50">
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                      />
                    </div>

                  </button>

                  {/* Accordion Expandable Content Panel */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden border-t border-gray-100 bg-slate-50/40"
                      >
                        <div className="p-6 sm:p-8 space-y-6 text-sm">
                          
                          {/* Role Overview */}
                          <div className="space-y-2">
                            <h4 className="font-display font-black text-[#303360] text-sm uppercase tracking-wider">
                              Role Overview
                            </h4>
                            <p className="text-gray-600 leading-relaxed font-medium">
                              {role.about}
                            </p>
                          </div>

                          {/* 2-Column Responsibilities and Requirements */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 pt-2">
                            
                            {/* Key Responsibilities */}
                            <div className="space-y-3">
                              <h4 className="font-display font-black text-[#303360] text-sm uppercase tracking-wider">
                                Key Responsibilities
                              </h4>
                              <ul className="space-y-2.5">
                                {role.responsibilities.map((res, i) => (
                                  <li key={i} className="flex gap-2 items-start text-gray-500 font-medium leading-normal">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#FE7146] shrink-0 mt-1.5" />
                                    <span>{res}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Who You Are / Requirements */}
                            <div className="space-y-3">
                              <h4 className="font-display font-black text-[#303360] text-sm uppercase tracking-wider">
                                Who You Are
                              </h4>
                              <ul className="space-y-2.5">
                                {role.requirements.map((req, i) => (
                                  <li key={i} className="flex gap-2 items-start text-gray-500 font-medium leading-normal">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#FE7146] shrink-0 mt-1.5" />
                                    <span>{req}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                          </div>

                          {/* Footer details & CTA inside accordion */}
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-gray-100 text-xs">
                            <div className="space-y-1">
                              <span className="text-gray-400 font-medium block">ESTIMATED COMPENSATION</span>
                              <span className="font-bold text-[#303360] text-sm">{role.salary}</span>
                            </div>
                            
                            <button
                              onClick={() => openApplyModal(role.title)}
                              className="bg-[#FE7146] hover:bg-[#e0562b] text-white font-black text-xs px-6 py-3.5 rounded-xl transition-all shadow-sm shadow-[#FE7146]/20 cursor-pointer flex items-center gap-1.5"
                            >
                              <span>Apply Instantly</span>
                              <ArrowRight size={14} />
                            </button>
                          </div>

                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              );
            })}
          </div>

          {/* General Application Callbox */}
          <div className="mt-12 bg-[#FFF1EC]/50 border border-[#FE7146]/10 p-6 sm:p-8 rounded-3xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 text-left">
            <div className="space-y-1">
              <h4 className="font-display font-extrabold text-base text-[#303360]">
                Don't See Your Role Listed Above?
              </h4>
              <p className="text-xs sm:text-sm text-gray-500 font-medium max-w-lg">
                We are always hunting for stars. Send a general application and our team will hold your resume for upcoming expansions.
              </p>
            </div>
            <button
              onClick={() => openApplyModal("General Application")}
              className="bg-white border-2 border-gray-200 hover:border-[#303360] hover:bg-slate-50 text-[#303360] font-black text-xs px-5 py-3 rounded-xl transition-all shrink-0 cursor-pointer"
            >
              Send Your Resume
            </button>
          </div>

        </div>
      </section>

      {/* 7. Careers-Adapted Orange CTA Banner */}
      <section id="careers-cta" className="py-16 sm:py-20 bg-white border-t border-gray-100">
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

            {/* Growth Arrow pointing up-right */}
            <div className="absolute right-10 bottom-0 opacity-10 pointer-events-none select-none hidden lg:block">
              <ArrowUpRight size={240} className="stroke-[1.5]" />
            </div>

            {/* Left copy */}
            <div className="space-y-4 max-w-2xl relative z-10">
              <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white leading-tight tracking-tight">
                Ready to Build Your Career With Us?
              </h2>
              <p className="text-orange-50 text-base sm:text-lg font-normal">
                Join our mission to craft the future of performance-driven digital marketing. Let's create something extraordinary together.
              </p>
            </div>

            {/* Right button */}
            <div className="relative z-10 w-full lg:w-auto flex flex-col sm:flex-row gap-4">
              <button
                onClick={scrollToOpenings}
                className="bg-white hover:bg-orange-50 text-[#FE7146] font-black text-base px-8 py-4 rounded-xl shadow-lg transition-all hover:scale-[1.03] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>View All Openings</span>
                <ArrowRight size={18} />
              </button>
              <button
                onClick={() => openApplyModal("General Application")}
                className="bg-transparent border border-white/40 hover:border-white text-white font-bold text-base px-6 py-4 rounded-xl hover:bg-white/5 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Send Resume</span>
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* 8. Fully Functional Interactive Job Application Modal/Popup */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            
            {/* Dark glass overlay background */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-[#303360]/60 backdrop-blur-xs"
            />

            {/* Modal Body card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white w-full max-w-lg rounded-3xl border border-gray-100 shadow-2xl relative z-10 overflow-hidden text-left"
            >
              
              {/* Header block */}
              <div className="bg-[#303360] p-6 text-white relative">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute right-4 top-4 text-white/70 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                  aria-label="Close application form"
                >
                  <X size={20} />
                </button>
                <span className="text-[10px] font-black tracking-widest text-[#FE7146] uppercase block mb-1">
                  APPLY ONLINE
                </span>
                <h3 className="font-display font-extrabold text-xl">
                  {selectedRole}
                </h3>
                <p className="text-gray-300 text-xs mt-1">
                  Submit your application to Noida HR team and schedule a review.
                </p>
              </div>

              {/* Form Content */}
              <div className="p-6 sm:p-8">
                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-10 text-center space-y-4"
                    >
                      <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-lg shadow-emerald-100/30">
                        <CheckCircle2 size={28} className="stroke-[2.5]" />
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-display font-black text-xl text-[#303360]">
                          Application Received!
                        </h4>
                        <p className="text-gray-500 text-xs leading-relaxed max-w-sm mx-auto">
                          Thank you for applying, <strong className="text-[#FE7146]">{applyForm.name}</strong>. Our Noida Talent Acquisition squad has received your documents. We will review your profile and reach out at <strong className="text-[#303360]">{applyForm.email}</strong> within 3 business days.
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          setIsModalOpen(false);
                          setApplyForm({
                            name: "",
                            email: "",
                            phone: "",
                            portfolio: "",
                            experience: "Entry Level",
                            resumeUrl: "",
                            message: ""
                          });
                          setTouched({});
                        }}
                        className="bg-[#303360] hover:bg-[#25284b] text-white font-bold text-xs px-6 py-3 rounded-xl transition-colors cursor-pointer"
                      >
                        Close Window
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleApplySubmit}
                      className="space-y-4"
                      noValidate
                    >
                      {/* Name field */}
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-500 uppercase block">
                          Full Name <span className="text-[#FE7146]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={applyForm.name}
                          onBlur={() => handleBlur("name")}
                          onChange={(e) => setApplyForm({ ...applyForm, name: e.target.value })}
                          placeholder="e.g. Priyan Sharma"
                          className={`w-full bg-slate-50 border rounded-xl py-3 px-4 text-xs font-semibold focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#FE7146]/10 transition-all ${
                            getFieldError("name") ? "border-red-400 focus:border-red-500" : "border-gray-200 focus:border-[#FE7146]"
                          }`}
                        />
                        {getFieldError("name") && (
                          <span className="text-[10px] text-red-500 font-bold pl-1">{getFieldError("name")}</span>
                        )}
                      </div>

                      {/* 2-Column Email & Phone */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        
                        {/* Email field */}
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-500 uppercase block">
                            Email Address <span className="text-[#FE7146]">*</span>
                          </label>
                          <input
                            type="email"
                            required
                            value={applyForm.email}
                            onBlur={() => handleBlur("email")}
                            onChange={(e) => setApplyForm({ ...applyForm, email: e.target.value })}
                            placeholder="e.g. priyan@gmail.com"
                            className={`w-full bg-slate-50 border rounded-xl py-3 px-4 text-xs font-semibold focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#FE7146]/10 transition-all ${
                              getFieldError("email") ? "border-red-400 focus:border-red-500" : "border-gray-200 focus:border-[#FE7146]"
                            }`}
                          />
                          {getFieldError("email") && (
                            <span className="text-[10px] text-red-500 font-bold pl-1">{getFieldError("email")}</span>
                          )}
                        </div>

                        {/* Phone field */}
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-500 uppercase block">
                            Phone Number <span className="text-[#FE7146]">*</span>
                          </label>
                          <input
                            type="tel"
                            required
                            value={applyForm.phone}
                            onBlur={() => handleBlur("phone")}
                            onChange={(e) => setApplyForm({ ...applyForm, phone: e.target.value })}
                            placeholder="e.g. +91 99979 69967"
                            className={`w-full bg-slate-50 border rounded-xl py-3 px-4 text-xs font-semibold focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#FE7146]/10 transition-all ${
                              getFieldError("phone") ? "border-red-400 focus:border-red-500" : "border-gray-200 focus:border-[#FE7146]"
                            }`}
                          />
                          {getFieldError("phone") && (
                            <span className="text-[10px] text-red-500 font-bold pl-1">{getFieldError("phone")}</span>
                          )}
                        </div>

                      </div>

                      {/* 2-Column Resume Link & Experience Selection */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        
                        {/* Resume field */}
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-500 uppercase block">
                            Resume Link (Google Drive / PDF)
                          </label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                              <Paperclip size={14} />
                            </span>
                            <input
                              type="url"
                              value={applyForm.resumeUrl}
                              onChange={(e) => setApplyForm({ ...applyForm, resumeUrl: e.target.value })}
                              placeholder="Share cloud storage URL"
                              className="w-full bg-slate-50 border border-gray-200 rounded-xl py-3 pl-9 pr-4 text-xs font-semibold focus:outline-none focus:bg-white focus:border-[#FE7146] focus:ring-2 focus:ring-[#FE7146]/10 transition-colors"
                            />
                          </div>
                        </div>

                        {/* Experience Selection */}
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-500 uppercase block">
                            Professional Experience
                          </label>
                          <select
                            value={applyForm.experience}
                            onChange={(e) => setApplyForm({ ...applyForm, experience: e.target.value })}
                            className="w-full bg-slate-50 border border-gray-200 rounded-xl py-3 px-4 text-xs font-semibold focus:outline-none focus:bg-white focus:border-[#FE7146] text-slate-700 appearance-none"
                          >
                            <option value="Entry Level">Entry Level (0-1 Years)</option>
                            <option value="Mid Level">Mid Level (2-4 Years)</option>
                            <option value="Senior Level">Senior Level (5+ Years)</option>
                          </select>
                        </div>

                      </div>

                      {/* Portfolio link */}
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-500 uppercase block">
                          Portfolio URL or LinkedIn Profile
                        </label>
                        <input
                          type="url"
                          value={applyForm.portfolio}
                          onChange={(e) => setApplyForm({ ...applyForm, portfolio: e.target.value })}
                          placeholder="e.g. linkedin.com/in/username"
                          className="w-full bg-slate-50 border border-gray-200 rounded-xl py-3 px-4 text-xs font-semibold focus:outline-none focus:bg-white focus:border-[#FE7146] focus:ring-2 focus:ring-[#FE7146]/10 transition-all"
                        />
                      </div>

                      {/* Message details */}
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-500 uppercase block">
                          Introduce Yourself (Cover Note)
                        </label>
                        <textarea
                          rows={3}
                          value={applyForm.message}
                          onChange={(e) => setApplyForm({ ...applyForm, message: e.target.value })}
                          placeholder="Briefly describe why you are excited to scale brand growth with Analytics Clouds Noida..."
                          className="w-full bg-slate-50 border border-gray-200 rounded-xl py-3 px-4 text-xs font-semibold focus:outline-none focus:bg-white focus:border-[#FE7146] focus:ring-2 focus:ring-[#FE7146]/10 transition-all resize-none"
                        />
                      </div>

                      {/* Submit Application Button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#FE7146] hover:bg-[#e0562b] disabled:bg-orange-300 text-white font-black text-xs py-4 rounded-xl transition-all shadow-md shadow-[#FE7146]/20 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01] active:scale-[0.99] mt-2"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Submitting to HR...</span>
                          </>
                        ) : (
                          <>
                            <span>Submit Application</span>
                            <Send size={14} />
                          </>
                        )}
                      </button>

                    </motion.form>
                  )}
                </AnimatePresence>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
