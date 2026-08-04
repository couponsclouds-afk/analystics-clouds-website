/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

"use client";

import { useState, useEffect, useRef } from "react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, useScroll, useTransform } from "motion/react";
import {
  Trophy,
  Users,
  Target,
  ArrowRight,
  Briefcase,
  TrendingUp,
  Eye,
  Gem,
  Check,
  Linkedin,
  Mail,
  Cloud,
  ArrowUpRight,
  Sparkles,
  Quote,
  ChevronDown
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
    <div ref={ref} className="inline-block font-mono">
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </div>
  );
}

// Delayed counter for hero section loads
function DelayedCounter({
  endValue,
  suffix = "",
  prefix = "",
  delay = 600,
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

interface AboutUsProps {}
export function AboutUs(props: AboutUsProps) {
  const navigate = useRouter();
  const teamSectionRef = useRef<HTMLDivElement>(null);
  const timelineContainerRef = useRef<HTMLDivElement>(null);

  // Scroll scrubbed progress tracking for vertical timeline
  const { scrollYProgress } = useScroll({
    target: timelineContainerRef,
    offset: ["start center", "end center"]
  });

  const timelineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const scrollToTeam = () => {
    if (teamSectionRef.current) {
      teamSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

 const milestones = [
  {
    year: "2020",
    icon: <Sparkles className="w-5 h-5" />,
    title: "Where It All Began",
    description: "Analytics Clouds was established in 2020 with a team of just five professionals specializing in affiliate marketing, Cost Per Lead (CPL) campaigns, and campaign delivery. Our journey started with our very first client, Keto. Delivering consistent results helped us build trust quickly, and before long, our portfolio expanded to 15 brands. Those early successes laid the foundation for the company we are today."
  },
  {
    year: "2021",
    icon: <Users className="w-5 h-5" />,
    title: "Building Stronger Partnerships",
    description: "As our reputation grew, so did our team. With nine talented professionals on board, we expanded our brand partnerships by nearly 20% and began working with some of India's leading companies, including Cars24, ACKO, and Policybazaar. This year also marked another important milestone as we expanded our capabilities to include Cost Per Install (CPI) campaigns, enabling us to deliver even more value to our clients."
  },
  {
    year: "2022",
    icon: <TrendingUp className="w-5 h-5" />,
    title: "Expanding Our Digital Ecosystem",
    description: "Growth isn't just about acquiring more clients, it's about creating better solutions. In 2022, our team grew to 14 members while our client portfolio reached 26 brands. During this period, we launched Coupons Clouds, our first coupon platform designed to connect shoppers with trusted deals while helping brands increase sales through affiliate partnerships. We also expanded into Cost Per Sale (CPS) campaigns and partnered with brands such as Motilal Oswal, Religare, Wakefit, and Let'sShave, strengthening our expertise across multiple performance marketing models."
  },
  {
    year: "2023",
    icon: <Trophy className="w-5 h-5" />,
    title: "Reaching New Markets",
    description: "By 2023, Analytics Clouds had evolved into a team of 17 professionals working with over 60 brands. We proudly collaborated with fast-growing names like mCaffeine, Dot & Key, and Cultsport, while also stepping into international performance marketing campaigns. Expanding beyond domestic markets allowed us to broaden our perspective and deliver scalable growth strategies for clients with global ambitions."
  },
  {
    year: "2024",
    icon: <Sparkles className="w-5 h-5" />,
    title: "Growing Beyond Performance Marketing",
    description: "With a team of 22 professionals and partnerships spanning more than 100 brands, 2024 became another defining chapter in our journey. We had the privilege of working with renowned brands including HyugaLife, Air India, IndiGo, and Ferns N Petals. During the same year, we launched Blogg4U, our content publishing platform focused on helping businesses improve their digital presence through informative, SEO-driven content and meaningful storytelling."
  },
  {
    year: "2025",
    icon: <Users className="w-5 h-5" />,
    title: "Strengthening Our Digital Network",
    description: "By 2025, Analytics Clouds had grown into a team of 26 passionate professionals serving over 120 brands across multiple industries. Our client portfolio continued to expand with brands such as As-It-Is Nutrition, Ace Blend, Bonkers Corner, FirstCry, and AJIO. To further strengthen our affiliate marketing ecosystem, we introduced CouponBazzar, another coupon platform built to help brands reach value-conscious shoppers while driving measurable sales growth."
  },
  {
    year: "Looking Ahead",
    icon: <TrendingUp className="w-5 h-5" />,
    title: "Looking Ahead",
    description: "Our journey has always been driven by one belief, digital success comes from combining strategy, creativity, technology, and data with a relentless focus on results. From a five-member startup to a growing digital marketing company working with more than 120 brands, Analytics Clouds continues to evolve with the changing digital landscape. Today, we help businesses grow through performance marketing, SEO, website development, social media, content marketing, affiliate marketing, email marketing, and data-driven digital solutions. While we've come a long way since 2020, we believe the most exciting part of our story is still being written."
  }
];

  const teamMembers = [
    {
      name: "Vineet Srivastava",
      role: "Founder & CEO ",
      image: "https://res.cloudinary.com/couponsbit/image/upload/v1785831096/1_j4ebnn.png",
      linkedin: "https://www.linkedin.com/in/vineet-srivastava-257561ab/",
      email: "vineet@analyticsclouds.com"
    },
    {
      name: "Deepika Arora",
      role: "Business Head",
      image: "https://res.cloudinary.com/couponsbit/image/upload/v1785831096/5_ksgpqv.png",
      linkedin: "https://www.linkedin.com/in/deepika-arora-4b1021b7/",
      email: "deepika@analyticsclouds.com"
    },
    {
      name: "Namita Srivastava",
      role: "Finance Manager",
      image: "https://res.cloudinary.com/couponsbit/image/upload/v1785831102/3_iy2buc.png",
      linkedin: "https://www.linkedin.com/in/namita-srivastava-241b31215",
      email: "finance@analyticsclouds.com"
    },
    {
      name: "Sagar Kumar",
      role: "Delivery Head",
      image: "https://res.cloudinary.com/couponsbit/image/upload/v1785831102/4_ph7dvc.png",
      linkedin: "https://www.linkedin.com/in/sagar-kumar-607476129/",
      email: "sagar@analyticsclouds.com"
    },
    {
      name: "Harshita Tiwari",
      role: "Affiliate Marketing & Sales Manager",
      image: "https://res.cloudinary.com/couponsbit/image/upload/v1785831101/2_qdaqxy.png",
      linkedin: "https://www.linkedin.com/in/harshita-tiwari-3458b6191/",
      email: "harshita.tiwari@analyticsclouds.com"
    }
  ];

  return (
    <div className="bg-white overflow-hidden">
      
      {/* 1. Hero — Real, Full-Width Photography (Consistent with Homepage Hero) */}
      <section className="relative min-h-[75vh] lg:min-h-[80vh] flex items-center justify-center pt-16 overflow-hidden bg-[#303360]">
        
        {/* Full-bleed background workspace photograph */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://res.cloudinary.com/couponsbit/image/upload/v1785831631/why-choose-home_hdrqsj.png"
            alt="Analytics Clouds Noida Creative Strategy HQ"
            className="w-full h-full object-cover object-center scale-105 filter brightness-90"
            referrerPolicy="no-referrer"
          />
          {/* Subtle navy scrim gradient ensuring outstanding contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#303360] via-[#303360]/90 to-[#303360]/40 sm:from-[#303360]/95 sm:via-[#303360]/85 sm:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#303360] via-[#303360]/50 to-transparent lg:hidden" />
        </div>

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column Content */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left">
              {/* Elegant Eyebrow */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-block font-mono text-xs font-semibold text-[#FE7146] tracking-wider uppercase bg-[#FFF1EC]/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#FE7146]/30"
              >
                ABOUT US
              </motion.div>

              {/* Display Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight font-display"
              >
                We're More Than Just Marketers. <br />
                We're{" "}
                <span className="text-[#FE7146] inline-block relative">
                  Growth Partners.
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
                At Analytics Clouds, we believe that true digital marketing is rooted in data-driven confidence and creative execution. We design custom solutions that align perfectly with your commercial goals.
              </motion.p>

              {/* Anchor Button to Meet the Team */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="pt-2"
              >
                <button
                  onClick={scrollToTeam}
                  className="bg-[#FE7146] hover:bg-[#e0562b] text-white font-extrabold px-8 py-4 rounded-xl shadow-lg shadow-[#FE7146]/25 hover:shadow-[#FE7146]/35 transition-all text-center flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  <span>Meet the Team</span>
                  <ChevronDown size={16} className="animate-bounce" />
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Our Story Section (Dark Navy Band with animated scroll-scrubbed timeline) */}
      <section className="py-24 bg-[#303360] text-gray-100 relative overflow-hidden">
        
        {/* Soft background glow lights */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FE7146]/5 rounded-full filter blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#FE7146]/5 rounded-full filter blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column Content */}
            <div className="lg:col-span-6 text-left space-y-6 lg:sticky lg:top-32">
              <span className="text-xs font-bold text-[#FE7146] tracking-widest uppercase font-mono block">
                OUR STORY
              </span>
              
              <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white leading-tight tracking-tight">
                A Passion for Performance. <br />
                A Commitment to <span className="text-[#FE7146]">Results</span>.
              </h2>

              <div className="w-16 h-1 bg-[#FE7146]/30 rounded my-6" />

              <div className="space-y-4 text-gray-300 text-sm sm:text-base font-normal leading-relaxed">
                <p>
                  Every successful business starts with a simple idea.

                </p>
                <p>
                  For Analytics Clouds, that idea was to help brands grow through performance-driven digital marketing backed by transparency, innovation, and measurable results. What began as a small team with ambitious goals has grown into a trusted digital growth partner serving more than 120 brands across diverse industries.

                </p>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => navigate.push('/contact')}
                  className="bg-transparent hover:bg-[#FE7146] text-white border-2 border-[#FE7146] hover:border-[#FE7146] font-black text-xs sm:text-sm px-8 py-4 rounded-xl shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  <span>Let's Grow Together →</span>
                </button>
              </div>
            </div>

            {/* Right Column: Scroll-Scrubbed Vertical Timeline */}
            <div className="lg:col-span-6 w-full relative" ref={timelineContainerRef}>
              
              {/* Dotted tracking background line */}
              <div className="absolute left-6 top-6 bottom-6 w-0 border-l-2 border-dotted border-white/20" />
              
              {/* Solid orange animated fill line */}
              <motion.div
                className="absolute left-6 top-6 bottom-6 w-[2px] bg-gradient-to-b from-[#FE7146] via-orange-400 to-[#FE7146] origin-top"
                style={{ height: timelineHeight }}
              />

              {/* Milestones list */}
              <div className="space-y-12 pl-14 sm:pl-16 text-left">
                {milestones.map((ms, i) => (
                  <motion.div
                    key={i}
                    className="relative group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                  >
                    {/* Floating Left Circle Icon Badge */}
                    <div className="absolute -left-14 sm:-left-16 top-0 w-12 h-12 flex items-center justify-center rounded-full bg-[#303360] border-2 border-white/20 text-[#FE7146] group-hover:text-white group-hover:border-[#FE7146] group-hover:bg-[#FE7146] transition-all duration-300 shadow-md">
                      {ms.icon}
                    </div>

                    {/* Meta content */}
                    <div className="space-y-1">
                      <span className="inline-block font-mono font-bold text-lg sm:text-xl text-[#FE7146] tracking-wider">
                        {ms.year}
                      </span>
                      <h4 className="text-white font-display font-extrabold text-base sm:text-lg leading-snug">
                        {ms.title}
                      </h4>
                      <p className="text-gray-400 text-xs sm:text-sm font-normal leading-relaxed max-w-md">
                        {ms.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 3. The Craft Statement (editorial breather section) */}
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
            <h2 className="font-display font-bold text-2xl sm:text-4xl text-[#303360] leading-snug tracking-tight max-w-3xl mx-auto">
              "We don't just run campaigns. <span className="text-[#FE7146]">We build long-term growth partners.</span>"
            </h2>
            <div className="h-0.5 w-16 bg-gradient-to-r from-[#FE7146] to-indigo-500 mx-auto mt-6" />
          </motion.div>
        </div>
      </section>

      {/* 4. Mission, Vision & Values Section */}
      <section className="py-24 bg-[#F5F5FA] relative border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold text-[#FE7146] tracking-widest uppercase font-mono block">
              WHAT DRIVES US
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#303360] leading-tight tracking-tight">
              Mission, Vision &amp; Values
            </h2>
          </div>

          {/* 3-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            
            {/* Mission Card */}
            <div className="bg-white border border-gray-100 p-8 sm:p-10 rounded-3xl flex flex-col items-start text-left hover:border-[#FE7146]/20 hover:shadow-2xl transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-[#FFF1EC] flex items-center justify-center text-[#FE7146] mb-8 shadow-sm">
                <Target size={28} />
              </div>
              <h3 className="font-display font-black text-xl sm:text-2xl text-[#303360] mb-4">
                Our Mission
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed">
                Our mission is to help businesses grow by delivering customized digital marketing, website development, and performance-driven solutions that attract the right audience, increase conversions, and create measurable business results.
              </p>
            </div>

            {/* Vision Card */}
            <div className="bg-white border border-gray-100 p-8 sm:p-10 rounded-3xl flex flex-col items-start text-left hover:border-indigo-200 hover:shadow-2xl transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-8 shadow-sm">
                <Eye size={28} />
              </div>
              <h3 className="font-display font-black text-xl sm:text-2xl text-[#303360] mb-4">
                Our Vision
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed">
                To become the most trusted digital growth partner, helping businesses of all sizes achieve sustainable success through innovative marketing, technology, and data-driven strategies. 
              </p>
            </div>

            {/* Values Card */}
            <div className="bg-white border border-gray-100 p-8 sm:p-10 rounded-3xl flex flex-col items-start text-left hover:border-emerald-200 hover:shadow-2xl transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-8 shadow-sm">
                <Gem size={28} />
              </div>
              <h3 className="font-display font-black text-xl sm:text-2xl text-[#303360] mb-6">
                Our Values
              </h3>
              
              {/* Checklist list */}
              <ul className="space-y-4 w-full">
                {[
                  { title: "Absolute Data Transparency", detail: "Real-time client dashboard access." },
                  { title: "Continuous Speed Optimization", detail: "Iterating code & budgets for raw speed." },
                  { title: "Story-Driven Collaboration", detail: "Honest, direct human partnerships." },
                  { title: "Uncompromising Performance", detail: "Sole focus on qualified acquisition values." }
                ].map((val, idx) => (
                  <li key={idx} className="flex gap-3 items-start text-slate-600">
                    <Check size={16} className="text-[#FE7146] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs sm:text-sm font-bold text-gray-800 block leading-tight">
                        {val.title}
                      </span>
                      <span className="text-[10px] text-gray-400 block mt-0.5">
                        {val.detail}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* 5. Meet the Team Section (Target of Hero scroll button) */}
      <section ref={teamSectionRef} className="py-24 bg-white relative border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold text-[#FE7146] tracking-widest uppercase font-mono block">
              MEET THE TEAM
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#303360] leading-tight tracking-tight">
              The Minds Behind Your <span className="text-[#FE7146]">Growth</span>
            </h2>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8 justify-center">
            {teamMembers.map((member, i) => (
              <motion.div
                key={i}
                className="bg-white border border-gray-100 rounded-2xl overflow-hidden group hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-300 flex flex-col h-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                {/* Photo container */}
                <div className="aspect-[4/5] w-full h-full overflow-hidden bg-slate-50 relative">
                  <img
                    src={member.image}
                    alt={`${member.name} - ${member.role}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Info and socials */}
                <div className="p-5 flex flex-col justify-between flex-grow text-left space-y-4">
                  <div>
                    <h4 className="font-display font-bold text-base text-[#303360] group-hover:text-[#FE7146] transition-colors leading-tight">
                      {member.name}
                    </h4>
                    <span className="text-xs text-slate-400 font-semibold block mt-1">
                      {member.role}
                    </span>
                  </div>

                  <div className="flex gap-2 pt-2 border-t border-gray-50">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} on LinkedIn`}
                      className="w-7 h-7 rounded-lg bg-slate-50 hover:bg-[#FFF1EC] text-slate-400 hover:text-[#FE7146] flex items-center justify-center transition-all duration-300 cursor-pointer"
                    >
                      <Linkedin size={13} />
                    </a>
                    <a
                      href={`mailto:${member.email}`}
                      aria-label={`Email ${member.name}`}
                      className="w-7 h-7 rounded-lg bg-slate-50 hover:bg-[#FFF1EC] text-slate-400 hover:text-[#FE7146] flex items-center justify-center transition-all duration-300 cursor-pointer"
                    >
                      <Mail size={13} />
                    </a>
                  </div>
                </div>

              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. Life at Analytics Clouds Teaser */}
      <section className="py-24 bg-[#FFF1EC]/10 relative border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left side: second candid team photo */}
            <div className="relative overflow-hidden rounded-2xl shadow-xl aspect-[16/10] lg:aspect-auto h-[350px]">
              <img
                src="https://res.cloudinary.com/couponsbit/image/upload/v1785831734/unnamed_wsozuk.webp"
                alt="Analytics Clouds company culture and team celebration"
                className="absolute inset-0 w-full h-full object-cover hover:scale-[1.02] transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Right side teaser copy */}
            <div className="text-left space-y-6">
              <span className="text-xs font-bold text-[#FE7146] tracking-widest uppercase font-mono block">
                // WORKPLACE CULTURE
              </span>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-[#303360] leading-tight tracking-tight">
                Our Culture Drives Our Campaigns
              </h2>
              <p className="text-slate-600 text-sm sm:text-base font-normal leading-relaxed">
                We believe exceptional work comes from teams that feel energized, valued, and empowered. From knowledge sharing hackathons to Friday collaboration lunches, we cultivate a workspace of high alignment and continuous learning.
              </p>
              
              <div className="pt-2">
                <Link href="/life-at-analytics-clouds"
                  className="inline-flex items-center gap-2 text-sm font-extrabold text-[#303360] hover:text-[#FE7146] transition-colors group"
                >
                  <span>See Life at Analytics Clouds</span>
                  <ArrowRight size={16} className="text-[#FE7146] group-hover:translate-x-1.5 transition-transform" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. CTA Banner */}
      <CtaBanner  />

    </div>
  );
}
