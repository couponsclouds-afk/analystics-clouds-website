/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from "motion/react";
import {
  Menu,
  X,
  ChevronDown,
  Cloud,
  ArrowRight,
  TrendingUp,
  Search,
  Target,
  Megaphone,
  Layout,
  Rocket,
  Smile,
  Award,
  Heart,
  Globe,
  Compass,
  FileText,
  UserCheck,
  ShieldAlert,
  FolderOpen
} from "lucide-react";

interface NavbarProps {}

export function Navbar(props: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = usePathname();
  const navigate = useRouter();

  // Hover states with intent delay for desktop
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const servicesTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const resourcesTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Mobile Accordion states
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current);
      if (resourcesTimeoutRef.current) clearTimeout(resourcesTimeoutRef.current);
    };
  }, []);

  // Reset and close dropdowns on page transition
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsOpen(false);
    setIsServicesOpen(false);
    setIsResourcesOpen(false);
    setMobileServicesOpen(false);
    setMobileResourcesOpen(false);
  }, [location]);

  // Handle Desktop Services Hover Intent
  const handleServicesEnter = () => {
    if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current);
    if (resourcesTimeoutRef.current) clearTimeout(resourcesTimeoutRef.current);
    setIsResourcesOpen(false); // Close other dropdowns
    servicesTimeoutRef.current = setTimeout(() => {
      setIsServicesOpen(true);
    }, 150);
  };

  const handleServicesLeave = () => {
    if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current);
    servicesTimeoutRef.current = setTimeout(() => {
      setIsServicesOpen(false);
    }, 200);
  };

  // Handle Desktop Resources Hover Intent
  const handleResourcesEnter = () => {
    if (resourcesTimeoutRef.current) clearTimeout(resourcesTimeoutRef.current);
    if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current);
    setIsServicesOpen(false); // Close other dropdowns
    resourcesTimeoutRef.current = setTimeout(() => {
      setIsResourcesOpen(true);
    }, 150);
  };

  const handleResourcesLeave = () => {
    if (resourcesTimeoutRef.current) clearTimeout(resourcesTimeoutRef.current);
    resourcesTimeoutRef.current = setTimeout(() => {
      setIsResourcesOpen(false);
    }, 200);
  };

  // 8 Core Services structured into two columns of 4
  const servicesList = [
    {
      title: "SEO Strategy",
      description: "Improve rankings and drive organic traffic that converts.",
      path: "/services/seo",
      icon: <Search className="w-4 h-4" />,
      colorClass: "bg-orange-50 text-[#FE7146] hover:bg-[#FFF1EC]"
    },
    {
      title: "Google Ads Campaigns",
      description: "High-performing ad campaigns that deliver maximum ROI.",
      path: "/services/google-ads",
      icon: <Target className="w-4 h-4" />,
      colorClass: "bg-blue-50 text-[#0A66C2] hover:bg-[#EBF3FF]"
    },
    {
      title: "Performance Marketing",
      description: "Data-driven campaigns across channels for real growth.",
      path: "/services/performance-marketing",
      icon: <TrendingUp className="w-4 h-4" />,
      colorClass: "bg-purple-50 text-[#9333EA] hover:bg-[#F3E8FF]"
    },
    {
      title: "Social Media Marketing",
      description: "Build community, scale reach, and boost engagement.",
      path: "/services/social-media-marketing",
      icon: <Heart className="w-4 h-4" />,
      colorClass: "bg-rose-50 text-[#E4405F] hover:bg-[#FFF0F2]"
    },
    {
      title: "Display & Native Ads",
      description: "Boost brand visibility and drive quality traffic.",
      path: "/services/display-native-ads",
      icon: <Megaphone className="w-4 h-4" />,
      colorClass: "bg-indigo-50 text-[#4F46E5] hover:bg-[#EEF2FF]"
    },
    {
      title: "Web Design & Development",
      description: "Beautiful, responsive websites built for performance.",
      path: "/services/web-design-development",
      icon: <Layout className="w-4 h-4" />,
      colorClass: "bg-cyan-50 text-[#0D9488] hover:bg-[#ECFEFF]"
    }
  ];

  const resourcesList = [
    {
      title: "Blog & Insights",
      description: "Expert tips, trends & Noida industry guides.",
      path: "/blog",
      icon: <Compass className="w-4 h-4 text-[#FE7146]" />
    },
    {
      title: "Case Studies",
      description: "View our real campaigns and results.",
      path: "/services",
      icon: <FolderOpen className="w-4 h-4 text-indigo-500" />
    },
    {
      title: "Life at Analytics Clouds",
      description: "Our culture, careers and team vibes.",
      path: "/life-at-analytics-clouds",
      icon: <UserCheck className="w-4 h-4 text-emerald-500" />
    },
    {
      title: "About Our Agency",
      description: "Meet the Noida campaign specialist leads.",
      path: "/about-us",
      icon: <Award className="w-4 h-4 text-amber-500" />
    },
    {
      title: "Privacy Policy",
      description: "How we process and protect your data.",
      path: "/privacy-policy",
      icon: <ShieldAlert className="w-4 h-4 text-rose-500" />
    },
    {
      title: "Terms & Conditions",
      description: "Standard terms for digital marketing services.",
      path: "/terms-of-service",
      icon: <FileText className="w-4 h-4 text-cyan-500" />
    }
  ];

  return (
    <header
      id="global-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "py-2 shadow-lg border-b border-white/5 bg-[#303360]/95 backdrop-blur-md"
          : location === "/"
          ? "py-3 bg-transparent border-b border-transparent"
          : "py-3 bg-[#303360] border-b border-white/5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">
          
          {/* Logo on Left */}
          <Link href="/" className="flex items-center cursor-pointer shrink-0">
            <img
              src="https://res.cloudinary.com/dqjlffxja/image/upload/f_auto,q_auto/v1783792699/analystic-cloud-logo_k3b1fu.png"
              alt="Analytics Clouds — Make Your Ideas Trending"
              className="h-11 sm:h-12 w-auto"
              referrerPolicy="no-referrer"
            />
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7">
            
            {/* About Us link */}
            <Link href="/about"
              className={`relative py-2 text-[13px] font-bold tracking-wide uppercase transition-colors group ${
                location === "/about" ? "text-[#FE7146]" : "text-white/90 hover:text-[#FE7146]"
              }`}
            >
              <span>About Us</span>
              <span
                className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#FE7146] transition-transform duration-200 ${
                  location === "/about" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                } origin-center`}
              />
            </Link>

            {/* Services Dropdown (Mega-menu trigger) */}
            <div
              className="relative py-2"
              onMouseEnter={handleServicesEnter}
              onMouseLeave={handleServicesLeave}
            >
              <Link href="/services"
                className={`text-[13px] font-bold tracking-wide uppercase transition-colors flex items-center gap-1.5 group ${
                  isServicesOpen || location === "/services" || servicesList.some(s => location === s.path)
                    ? "text-[#FE7146]"
                    : "text-white/90 hover:text-[#FE7146]"
                }`}
              >
                <span>Services</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${
                    isServicesOpen ? "rotate-180 text-[#FE7146]" : "text-white/50"
                  }`}
                />
              </Link>
              
              {/* Invisible bridge to prevent pointer gap issues */}
              {isServicesOpen && <div className="absolute left-0 right-0 h-4 top-full" />}

              {/* SERVICES MEGA-MENU */}
              <AnimatePresence>
                {isServicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute -left-[300px] xl:-left-[350px] top-full mt-2 w-[850px] xl:w-[960px] bg-white rounded-3xl shadow-2xl border border-gray-100/50 overflow-hidden text-left z-50 p-6 flex flex-col gap-6"
                  >
                    
                    {/* Grid containing Left Promo and Right Service Cards */}
                    <div className="grid grid-cols-12 gap-6">
                      
                      {/* Left Promo Panel (Light orange tint `#FFF1EC` card) */}
                      <div className="col-span-4 bg-[#FFF1EC] rounded-2xl p-5 flex flex-col justify-between border border-orange-100/30">
                        <div className="space-y-4">
                          <span className="font-mono text-[9px] font-black text-[#FE7146] tracking-widest uppercase block">
                            // WHAT WE DO
                          </span>
                          <h3 className="font-display font-black text-xl text-[#303360] leading-tight">
                            Complete Digital Marketing <span className="text-[#FE7146]">Solutions</span>
                          </h3>
                          <p className="text-[#333333] text-[11px] leading-relaxed font-medium text-slate-600">
                            From strategy to execution, we deliver data-driven marketing campaigns that fuel Noida business expansion.
                          </p>

                          {/* Simplified analytics-chart visual */}
                          <div className="relative bg-white/90 border border-orange-100 rounded-xl p-3 shadow-sm h-28 flex items-center justify-between gap-3 mt-4">
                            {/* Pie Chart SVG */}
                            <div className="w-12 h-12 relative shrink-0">
                              <svg viewBox="0 0 36 36" className="w-full h-full">
                                <path
                                  className="text-[#303360]/10"
                                  strokeWidth="3.5"
                                  stroke="currentColor"
                                  fill="none"
                                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                />
                                <path
                                  className="text-[#FE7146]"
                                  strokeWidth="3.5"
                                  strokeDasharray="72, 100"
                                  strokeLinecap="round"
                                  stroke="currentColor"
                                  fill="none"
                                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                />
                                <circle cx="18" cy="18" r="10" className="fill-white" />
                              </svg>
                              <div className="absolute inset-0 flex items-center justify-center text-[9px] font-black text-[#303360]">
                                72%
                              </div>
                            </div>

                            {/* Line Graph SVG */}
                            <div className="flex-grow h-12">
                              <svg viewBox="0 0 100 40" className="w-full h-full">
                                <defs>
                                  <linearGradient id="chart-nav-grad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#FE7146" stopOpacity="0.2" />
                                    <stop offset="100%" stopColor="#FE7146" stopOpacity="0" />
                                  </linearGradient>
                                </defs>
                                <path
                                  d="M0,35 Q15,10 30,25 T60,5 T100,18 L100,40 L0,40 Z"
                                  fill="url(#chart-nav-grad)"
                                />
                                <path
                                  d="M0,35 Q15,10 30,25 T60,5 T100,18"
                                  fill="none"
                                  stroke="#FE7146"
                                  strokeWidth="2.5"
                                  strokeLinecap="round"
                                />
                                <circle cx="30" cy="25" r="2.5" fill="#303360" />
                                <circle cx="60" cy="5" r="2.5" fill="#FE7146" />
                              </svg>
                            </div>

                            {/* Overlapping Stat Chip */}
                            <div className="absolute -bottom-1 -right-1 bg-[#303360] text-white text-[9px] font-mono font-bold px-2 py-0.5 rounded-md border border-white/10 shadow-md flex items-center gap-1">
                              <TrendingUp size={9} className="text-[#FE7146]" />
                              <span>+24% ROI</span>
                            </div>
                          </div>
                        </div>

                        <Link href="/services"
                          className="mt-5 w-full bg-[#FE7146] hover:bg-[#e0562b] text-white font-extrabold text-[11px] py-3 px-4 rounded-xl shadow-md shadow-[#FE7146]/20 hover:shadow-[#FE7146]/30 transition-all flex items-center justify-center gap-1.5 cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
                        >
                          <span>View All Services</span>
                          <ArrowRight size={13} />
                        </Link>
                      </div>

                      {/* Right Service Columns (8 Services in 2 columns of 4) */}
                      <div className="col-span-8 grid grid-cols-2 gap-x-6 gap-y-1">
                        {servicesList.map((svc, i) => (
                          <Link
                            key={i}
                            href={svc.path}
                            className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-slate-50 transition-all duration-200 group border-b border-gray-50 last-of-type:border-b-0"
                          >
                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-sm transition-transform duration-200 group-hover:scale-110 ${svc.colorClass}`}>
                              {svc.icon}
                            </div>
                            <div className="space-y-1 text-left">
                              <h4 className="font-display font-black text-xs text-[#303360] group-hover:text-[#FE7146] transition-colors leading-snug">
                                {svc.title}
                              </h4>
                              <p className="text-[10px] text-gray-500 font-medium leading-relaxed max-w-[240px]">
                                {svc.description}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>

                    </div>

                    {/* Bottom Strip of the Dropdown (Custom solution nudge & cred stats) */}
                    <div className="border-t border-gray-100 pt-5 flex items-center justify-between bg-gray-50/50 -mx-6 -mb-6 px-6 py-4 rounded-b-3xl">
                      
                      {/* Left Solution Nudge */}
                      <Link href="/contact" className="flex items-center gap-2.5 group">
                        <div className="w-8 h-8 rounded-full bg-[#FFF1EC] text-[#FE7146] flex items-center justify-center shrink-0">
                          <Rocket size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </div>
                        <div className="text-left">
                          <h5 className="font-display font-bold text-xs text-[#303360] group-hover:text-[#FE7146] transition-colors">
                            Need a Custom Solution?
                          </h5>
                          <p className="text-[10px] text-gray-400 font-medium">
                            Let's talk and sketch out your tailored performance roadmap.
                          </p>
                        </div>
                      </Link>

                      {/* Right Stats family */}
                      <div className="flex items-center gap-6 text-left">
                        {[
                          { icon: <Smile size={13} className="text-[#FE7146]" />, label: "Happy Clients", count: "200+" },
                          { icon: <Award size={13} className="text-indigo-500" />, label: "Exp Hub", count: "7+ Yrs" },
                          { icon: <Heart size={13} className="text-emerald-500" />, label: "Success Rate", count: "98%" }
                        ].map((stat, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-100">
                              {stat.icon}
                            </div>
                            <div className="leading-none text-left">
                              <span className="text-[11px] font-black text-[#303360] block">{stat.count}</span>
                              <span className="text-[9px] text-gray-400 font-semibold">{stat.label}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                    </div>

                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Life at Analytics Clouds link */}
            <Link href="/life-at-analytics-clouds"
              className={`relative py-2 text-[13px] font-bold tracking-wide uppercase transition-colors group ${
                location === "/life-at-analytics-clouds" ? "text-[#FE7146]" : "text-white/90 hover:text-[#FE7146]"
              }`}
            >
              <span>Life at Analytics Clouds</span>
              <span
                className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#FE7146] transition-transform duration-200 ${
                  location === "/life-at-analytics-clouds" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                } origin-center`}
              />
            </Link>

            {/* Inventory link */}
            <Link href="/inventory"
              className={`relative py-2 text-[13px] font-bold tracking-wide uppercase transition-colors group ${
                location === "/inventory" ? "text-[#FE7146]" : "text-white/90 hover:text-[#FE7146]"
              }`}
            >
              <span>Inventory</span>
              <span
                className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#FE7146] transition-transform duration-200 ${
                  location === "/inventory" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                } origin-center`}
              />
            </Link>

            {/* Sign Up dropdown (Publisher / Advertiser) */}
            <div className="relative py-2 group">
              <button
                type="button"
                className="text-[13px] font-bold tracking-wide uppercase transition-colors flex items-center gap-1.5 text-white/90 hover:text-[#FE7146] cursor-pointer"
              >
                <span>Sign Up</span>
                <ChevronDown size={14} className="text-white/50 transition-transform duration-200 group-hover:rotate-180" />
              </button>

              <div className="absolute left-0 top-full w-56 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="bg-white rounded-2xl shadow-2xl border border-gray-100/50 overflow-hidden text-left">
                  <a
                    href="https://analytics.trackier.io/register.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-5 py-3.5 text-xs font-bold text-[#303360] hover:bg-slate-50 hover:text-[#FE7146] transition-colors"
                  >
                    Sign up as Publisher
                  </a>
                  <a
                    href="https://analytics.trackier.io/advertiser/register.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-5 py-3.5 text-xs font-bold text-[#303360] hover:bg-slate-50 hover:text-[#FE7146] transition-colors border-t border-gray-50"
                  >
                    Sign up as Advertiser
                  </a>
                </div>
              </div>
            </div>

          </nav>

          {/* Solid orange Get In Touch button on right */}
          <div className="hidden lg:block shrink-0">
            <Link href="/contact"
              className="bg-[#FE7146] hover:bg-[#e0562b] text-white font-extrabold text-[12px] px-5 py-3 rounded-xl shadow-lg shadow-[#FE7146]/20 hover:shadow-[#FE7146]/30 transition-all flex items-center justify-center gap-1.5 hover:scale-[1.03] active:scale-[0.97] cursor-pointer"
            >
              <span>Get In Touch</span>
              <ArrowRight size={13} className="animate-pulse" />
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-xl text-white hover:bg-white/10 transition-colors shrink-0"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

        </div>
      </div>

      {/* MOBILE FULL-HEIGHT MENU OVERLAY (Slide-in) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-2xl border-b border-gray-100 overflow-y-auto max-h-[85vh] text-left z-40"
          >
            <div className="p-5 space-y-4">
              
              {/* Home */}
              <Link href="/"
                className={`block w-full px-4 py-3 rounded-xl text-xs font-black tracking-wider uppercase transition-colors ${
                  location === "/" ? "text-[#FE7146] bg-[#FFF1EC]" : "text-[#303360] hover:bg-gray-50"
                }`}
              >
                Home
              </Link>

              {/* About Us */}
              <Link href="/about"
                className={`block w-full px-4 py-3 rounded-xl text-xs font-black tracking-wider uppercase transition-colors ${
                  location === "/about" ? "text-[#FE7146] bg-[#FFF1EC]" : "text-[#303360] hover:bg-gray-50"
                }`}
              >
                About Us
              </Link>

              {/* Services Accordion Section */}
              <div className="border border-gray-100 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className="w-full flex justify-between items-center px-4 py-3 bg-slate-50/50 text-xs font-black tracking-wider uppercase text-[#303360]"
                >
                  <span>Services</span>
                  <ChevronDown size={14} className={`transition-transform duration-200 ${mobileServicesOpen ? "rotate-180 text-[#FE7146]" : ""}`} />
                </button>
                
                {mobileServicesOpen && (
                  <div className="bg-white p-2 divide-y divide-gray-50">
                    {servicesList.map((svc, i) => (
                      <Link
                        key={i}
                        href={svc.path}
                        className="flex items-center gap-3 py-2.5 px-3 rounded-xl hover:bg-slate-50 transition-colors"
                      >
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 shadow-sm ${svc.colorClass}`}>
                          {React.cloneElement(svc.icon, { className: "w-3.5 h-3.5" })}
                        </div>
                        <span className="text-xs font-bold text-[#303360]">{svc.title}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Life at Analytics Clouds */}
              <Link href="/life-at-analytics-clouds"
                className={`block w-full px-4 py-3 rounded-xl text-xs font-black tracking-wider uppercase transition-colors ${
                  location === "/life-at-analytics-clouds" ? "text-[#FE7146] bg-[#FFF1EC]" : "text-[#303360] hover:bg-gray-50"
                }`}
              >
                Life at Analytics Clouds
              </Link>

              {/* Inventory */}
              <Link href="/inventory"
                className={`block w-full px-4 py-3 rounded-xl text-xs font-black tracking-wider uppercase transition-colors ${
                  location === "/inventory" ? "text-[#FE7146] bg-[#FFF1EC]" : "text-[#303360] hover:bg-gray-50"
                }`}
              >
                Inventory
              </Link>

              {/* Sign Up as Publisher */}
              <a
                href="https://analytics.trackier.io/register.html"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full px-4 py-3 rounded-xl text-xs font-black tracking-wider uppercase transition-colors text-[#303360] hover:bg-gray-50"
              >
                Sign up as Publisher
              </a>

              {/* Sign Up as Advertiser */}
              <a
                href="https://analytics.trackier.io/advertiser/register.html"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full px-4 py-3 rounded-xl text-xs font-black tracking-wider uppercase transition-colors text-[#303360] hover:bg-gray-50"
              >
                Sign up as Advertiser
              </a>

              {/* Get In Touch Full-Width Button */}
              <div className="pt-3">
                <Link href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="w-full bg-[#FE7146] hover:bg-[#e0562b] text-white font-extrabold text-xs py-3.5 rounded-xl shadow-lg shadow-[#FE7146]/20 transition-all flex items-center justify-center gap-2"
                >
                  <span>Get In Touch</span>
                  <ArrowRight size={14} />
                </Link>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
}
