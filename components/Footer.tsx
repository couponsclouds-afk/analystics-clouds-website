/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from "motion/react";
import {
  Cloud,
  Facebook,
  Linkedin,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  ArrowRight,
  Smile,
  Megaphone,
  Award,
  Heart,
  Send,
  ArrowUp,
  TrendingUp,
  Loader2,
  Check
} from "lucide-react";

// Scroll-triggered counter specifically for the Footer stats
function FooterCounter({
  endValue,
  suffix = "",
  prefix = ""
}: {
  endValue: number;
  suffix?: string;
  prefix?: string;
}) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number | null = null;
    const duration = 1500;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = progress * (2 - progress);
      const currentValue = Math.floor(easedProgress * endValue);

      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(endValue);
      }
    };

    requestAnimationFrame(animate);
  }, [hasStarted, endValue]);

  return (
    <div ref={ref} className="font-mono text-base sm:text-lg font-black text-white leading-tight">
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </div>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();
  const navigate = useRouter();

  // Newsletter states
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) return;

    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 3000);
    }, 1200);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleConsultationClick = () => {
    navigate.push("/contact");
  };

  const handleWorkClick = () => {
    navigate.push("/services");
  };

  return (
    <footer id="footer-redesign" className="bg-[#303360] text-gray-300 pt-12 pb-8 border-t border-white/5 relative overflow-hidden">
      
      {/* Decorative top border line */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#FE7146] via-amber-500 to-[#FE7146]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* 1. Integrated CTA Band (Top of Footer) */}
        <div className="bg-[#24264d] border border-white/10 rounded-3xl p-6 sm:p-8 lg:p-10 relative overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
          
          {/* Subtle background decorative layout mesh */}
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial-gradient from-[#FE7146]/10 via-transparent to-transparent opacity-40 pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 relative z-10 text-left">
            
            {/* Left side info */}
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#303360] border-2 border-[#FE7146] flex items-center justify-center shadow-[0_0_15px_rgba(254,113,70,0.2)] shrink-0">
                <TrendingUp className="w-6 h-6 text-[#FE7146]" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-display font-black text-xl sm:text-2xl text-white leading-tight tracking-tight">
                  Ready to <span className="text-[#FE7146]">Grow</span> Your Business?
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm font-normal">
                  Let's build data-driven strategies that bring real results.
                </p>
              </div>
            </div>

            {/* Right side buttons */}
            <div className="flex flex-col sm:flex-row gap-3.5 sm:items-center justify-start lg:justify-end shrink-0">
              <button
                onClick={handleConsultationClick}
                className="bg-[#FE7146] hover:bg-[#e0562b] text-white font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-lg shadow-[#FE7146]/15 hover:shadow-[#FE7146]/25 transition-all text-center flex items-center justify-center gap-1.5 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span>Get Free Consultation</span>
                <ArrowRight size={14} />
              </button>
              
              <button
                onClick={handleWorkClick}
                className="bg-transparent hover:bg-white/5 text-white border border-white/20 hover:border-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl transition-all text-center flex items-center justify-center gap-1.5 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span>View Our Work</span>
                <ArrowRight size={14} />
              </button>
            </div>

          </div>
        </div>

        {/* 2. Main Footer Body (4-Column Layout, 5:2:2.5:2.5 ratio —
            fractional widths live in the grid template itself) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[5fr_2fr_2.5fr_2.5fr] gap-8 lg:gap-12 text-left pt-6 pb-4">

          {/* Column 1 (Brand) */}
          <div className="space-y-6">
            <div className="space-y-3.5">
              <Link href="/" className="inline-flex items-center cursor-pointer">
                <img
                  src="https://res.cloudinary.com/dqjlffxja/image/upload/f_auto,q_auto/v1783792699/analystic-cloud-logo_k3b1fu.png"
                  alt="Analytics Clouds — Make Your Ideas Trending"
                  className="h-14 w-auto"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </Link>
              
              <p className="text-gray-400 text-xs sm:text-sm font-normal leading-relaxed">
                A performance-driven digital marketing agency helping brands grow with data, creativity and technology. We turn clicks into customers and data into growth.
              </p>

              {/* Follow Us Social Icons */}
              <div className="space-y-3">
                <h5 className="text-[10px] text-white font-bold tracking-widest uppercase">
                  FOLLOW US
                </h5>
                <div className="flex gap-2.5 pt-1">
                  {[
                    { icon: <Facebook size={14} />, color: "bg-[#1877F2]/10 hover:bg-[#1877F2] text-[#1877F2] hover:text-white" },
                    { icon: <Linkedin size={14} />, color: "bg-[#0A66C2]/10 hover:bg-[#0A66C2] text-[#0A66C2] hover:text-white" },
                    { icon: <Instagram size={14} />, color: "bg-[#E4405F]/10 hover:bg-[#E4405F] text-[#E4405F] hover:text-white" },
                    { icon: <Youtube size={14} />, color: "bg-[#FF0000]/10 hover:bg-[#FF0000] text-[#FF0000] hover:text-white" },
                    { icon: <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>, color: "bg-white/5 hover:bg-white text-gray-300 hover:text-black" }
                  ].map((soc, idx) => (
                    <button
                      key={idx}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-[1.1] hover:shadow-lg cursor-pointer ${soc.color}`}
                    >
                      {soc.icon}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Horizontal Divider */}
            <div className="h-px bg-white/5 w-full" />

            {/* 4-Item Stat Grid (2 columns of 2) */}
            <div className="grid grid-cols-2 gap-4">

              {/* Left column: Happy Clients + Successful Campaigns */}
              <div className="space-y-4">

                {/* Stat 1: Happy Clients */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#FFF1EC]/10 text-[#FE7146] flex items-center justify-center shrink-0">
                    <Smile size={16} />
                  </div>
                  <div className="text-left leading-none">
                    <FooterCounter endValue={200} suffix="+" />
                    <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider block mt-0.5">
                      Happy Clients
                    </span>
                  </div>
                </div>

                {/* Stat 2: Successful Campaigns */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0">
                    <Megaphone size={16} />
                  </div>
                  <div className="text-left leading-none">
                    <FooterCounter endValue={500} suffix="+" />
                    <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider block mt-0.5">
                      Successful Campaigns
                    </span>
                  </div>
                </div>

              </div>

              {/* Right column: Years of Experience + Client Satisfaction */}
              <div className="space-y-4">

                {/* Stat 3: Years of Experience */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                    <Award size={16} />
                  </div>
                  <div className="text-left leading-none">
                    <FooterCounter endValue={7} suffix="+" />
                    <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider block mt-0.5">
                      Years of Experience
                    </span>
                  </div>
                </div>

                {/* Stat 4: Client Satisfaction */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center shrink-0">
                    <Heart size={16} />
                  </div>
                  <div className="text-left leading-none">
                    <FooterCounter endValue={98} suffix="%" />
                    <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider block mt-0.5">
                      Client Satisfaction
                    </span>
                  </div>
                </div>

              </div>

            </div>

          </div>

          {/* Column 2 (Quick Links) */}
          <div className="space-y-4 text-left">
            <div className="space-y-1">
              <h4 className="text-white font-display font-black text-xs sm:text-sm tracking-wider uppercase">
                QUICK LINKS
              </h4>
              <div className="h-0.5 w-8 bg-[#FE7146] rounded" />
            </div>

            <ul className="space-y-2 text-xs sm:text-sm font-semibold">
              {[
                { label: "Home", path: "/" },
                { label: "About Us", path: "/about" },
                { label: "Services", path: "/services" },
                { label: "Life at Analytics Clouds", path: "/life-at-analytics-clouds" },
                { label: "Inventory", path: "/inventory" },
                { label: "Contact Us", path: "/contact" }
              ].map((link, idx) => (
                <li key={idx} className="border-b border-white/[0.02] last:border-0 pb-1.5 last:pb-0">
                  <Link href={link.path}
                    className="group flex items-center justify-between hover:text-[#FE7146] transition-colors py-1 cursor-pointer"
                  >
                    <span>{link.label}</span>
                    <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-[#FE7146]" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 (Our Services) */}
          <div className="space-y-4 text-left">
            <div className="space-y-1">
              <h4 className="text-white font-display font-black text-xs sm:text-sm tracking-wider uppercase">
                OUR SERVICES
              </h4>
              <div className="h-0.5 w-8 bg-[#FE7146] rounded" />
            </div>

            <ul className="space-y-2.5 text-xs sm:text-sm font-medium text-gray-400">
              {[
                { label: "Search Engine Optimization", path: "/services/seo" },
                { label: "Google Ads Campaign", path: "/services/google-ads" },
                { label: "Performance Marketing", path: "/services/performance-marketing" },
                { label: "Social Media Marketing", path: "/services/social-media-marketing" },
                { label: "Display & Native Ads", path: "/services/display-native-ads" },
                { label: "Web Design & Development", path: "/services/web-design-development" }
              ].map((svc, idx) => (
                <li key={idx}>
                  <Link href={svc.path}
                    className="hover:text-[#FE7146] transition-colors cursor-pointer block py-0.5"
                  >
                    {svc.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 (Contact Us) */}
          <div className="space-y-6 text-left">
            <div className="space-y-4">
              <div className="space-y-1">
                <h4 className="text-white font-display font-black text-xs sm:text-sm tracking-wider uppercase">
                  CONTACT US
                </h4>
                <div className="h-0.5 w-8 bg-[#FE7146] rounded" />
              </div>

              <ul className="space-y-3.5 text-xs text-gray-400">
                <li className="flex gap-2.5 items-start">
                  <MapPin size={16} className="text-[#FE7146] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">
                    <span className="text-gray-300 font-semibold block">Registered Office:</span>
                    917, Idgah Road, Gandhi Nagar, Unnao - 209801
                  </span>
                </li>
                <li className="flex gap-2.5 items-start">
                  <MapPin size={16} className="text-[#FE7146] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">
                    <span className="text-gray-300 font-semibold block">Office:</span>
                    B-101, 1st Floor, Tower-B, Noida One, Sector 62, Noida - 201309
                  </span>
                </li>
                <li className="flex gap-2.5 items-center">
                  <Phone size={15} className="text-[#FE7146] shrink-0" />
                  <a href="tel:+919997969967" className="hover:text-[#FE7146] transition-colors font-semibold">
                    +91 99979 69967
                  </a>
                </li>
                <li className="flex gap-2.5 items-center">
                  <Mail size={15} className="text-[#FE7146] shrink-0" />
                  <a href="mailto:sales@analyticsclouds.com" className="hover:text-[#FE7146] transition-colors">
                    sales@analyticsclouds.com
                  </a>
                </li>
              </ul>
            </div>

            {/* Newsletter form */}
            <div className="space-y-3">
              <h5 className="text-[10px] text-white font-bold tracking-widest uppercase">
                SUBSCRIBE TO OUR NEWSLETTER
              </h5>
              <p className="text-[11px] text-gray-400">
                Get the latest insights &amp; updates.
              </p>
              
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2" noValidate>
                <div className="relative flex-grow">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full bg-[#24264d] border border-white/10 rounded-xl py-2.5 px-3.5 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-[#FE7146] focus:ring-1 focus:ring-[#FE7146]"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={status === "loading" || status === "success"}
                  className="bg-[#FE7146] hover:bg-[#e0562b] disabled:bg-[#FE7146]/60 text-white w-10 h-10 rounded-xl flex items-center justify-center shrink-0 cursor-pointer shadow-md shadow-[#FE7146]/10 hover:scale-[1.05] active:scale-[0.95] transition-all"
                >
                  {status === "loading" ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : status === "success" ? (
                    <Check className="w-4 h-4 text-emerald-300" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </button>
              </form>
            </div>

          </div>

        </div>

      </div>

      {/* 4. Bottom Bar (Slightly deeper/darker navy shade for gentle depth) */}
      <div className="bg-[#1e2040] border-t border-white/5 mt-12 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-gray-400 font-semibold">
          
          {/* Copyright */}
          <div className="text-center md:text-left">
            <span>©2025 Analytics Clouds. All Rights Reserved.</span>
          </div>

          {/* Legal Links with dividers */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/privacy-policy" className="hover:text-white transition-colors cursor-pointer">Privacy Policy</Link>
            <span className="text-white/10 hidden sm:inline">|</span>
            <Link href="/terms-of-service" className="hover:text-white transition-colors cursor-pointer">Terms &amp; Conditions</Link>
            <span className="text-white/10 hidden sm:inline">|</span>
            <Link href="/faqs" className="hover:text-white transition-colors cursor-pointer">FAQs</Link>
          </div>

          {/* Back to Top */}
          <div>
            <button
              onClick={scrollToTop}
              className="bg-white/5 hover:bg-white/10 hover:text-white border border-white/10 py-2 px-4 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 group cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp size={12} className="group-hover:-translate-y-0.5 transition-transform text-[#FE7146]" />
            </button>
          </div>

        </div>
      </div>

    </footer>
  );
}
