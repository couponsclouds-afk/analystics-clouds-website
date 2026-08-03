/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  User,
  FileText,
  Briefcase,
  MessageSquare,
  Clock,
  ShieldCheck,
  Zap,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  Loader2,
  ChevronDown
} from "lucide-react";
import { CtaBanner } from '@/components/CtaBanner';

export function Contact() {
  const formSectionRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    service: "SEO Strategy",
    message: "",
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSending, setIsSending] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const getFieldError = (field: string) => {
    if (!touched[field]) return "";
    
    switch (field) {
      case "name":
        return !formData.name.trim() ? "Please enter your full name." : "";
      case "email":
        if (!formData.email.trim()) return "Please enter your email address.";
        if (!validateEmail(formData.email)) return "Please enter a valid email address.";
        return "";
      case "phone":
        return !formData.phone.trim() ? "Please enter your phone number." : "";
      case "subject":
        return !formData.subject.trim() ? "Please enter a message subject." : "";
      default:
        return "";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all as touched
    const allTouched = { name: true, email: true, phone: true, subject: true };
    setTouched(allTouched);

    const hasErrors =
      !formData.name.trim() ||
      !formData.email.trim() ||
      !validateEmail(formData.email) ||
      !formData.phone.trim() ||
      !formData.subject.trim();

    if (hasErrors) {
      return;
    }

    setIsSending(true);

    // Simulate sending message API
    setTimeout(() => {
      setIsSending(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const scrollToForm = () => {
    if (formSectionRef.current) {
      formSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div id="contact-page-container" className="bg-white text-[#333333] selection:bg-[#FE7146] selection:text-white">
      
      {/* 1. Hero — Real, Full-Width Photography (Consistent with Homepage/AboutUs) */}
      <section id="contact-hero" className="relative min-h-[45vh] sm:min-h-[50vh] lg:min-h-[55vh] flex items-center justify-center pt-16 overflow-hidden bg-[#303360]">
        
        {/* Full-bleed background team photograph */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://res.cloudinary.com/dqjlffxja/image/upload/v1783872960/contact-us-page_wbsfex.jpg"
            alt="Analytics Clouds Noida performance consulting squad"
            className="w-full h-full object-cover object-top filter brightness-90"
            referrerPolicy="no-referrer"
          />
          {/* Subtle navy scrim gradient ensuring outstanding contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#303360] via-[#303360]/90 to-[#303360]/40 sm:from-[#303360]/95 sm:via-[#303360]/85 sm:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#303360] via-[#303360]/50 to-transparent lg:hidden" />
        </div>

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            
            {/* Left Column Content */}
            <div className="lg:col-span-8 space-y-5 text-left">
              {/* Elegant Eyebrow */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-block font-mono text-xs font-semibold text-[#FE7146] tracking-wider uppercase bg-[#FFF1EC]/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#FE7146]/30"
              >
                // CONTACT US
              </motion.div>

              {/* Display Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight font-display"
              >
                Let's Build Something <br />
                <span className="text-[#FE7146] inline-block relative">
                  Amazing Together
                  <span className="absolute left-0 bottom-1 w-full h-1 bg-[#FE7146]/20 rounded" />
                </span>
              </motion.h1>

              {/* Subcopy */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-gray-200 text-sm sm:text-base font-normal leading-relaxed max-w-xl"
              >
                Have a question or ready to scale your campaigns? Reach out to our team of performance specialists and start your custom audit.
              </motion.p>

              {/* Anchor Button to Message Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="pt-2"
              >
                <button
                  onClick={scrollToForm}
                  className="bg-[#FE7146] hover:bg-[#e0562b] text-white font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-lg shadow-[#FE7146]/25 hover:shadow-[#FE7146]/35 transition-all text-center flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  <span>Send a Message</span>
                  <ChevronDown size={14} className="animate-bounce" />
                </button>
              </motion.div>
            </div>

           

          </div>
        </div>
      </section>

      {/* 2. Send Us a Message (Priortized clear form section directly below hero) */}
      <section ref={formSectionRef} className="py-24 bg-white relative scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left side: Recap + Direct Help Card */}
            <div className="lg:col-span-5 text-left space-y-8 lg:sticky lg:top-32">
              <div className="space-y-4">
                <span className="text-xs font-bold text-[#FE7146] tracking-widest uppercase font-mono block">
                  // ENGAGE WITH US
                </span>
                <h2 className="font-display font-black text-3xl sm:text-4xl text-[#303360] tracking-tight leading-tight">
                  We review every proposal individually.
                </h2>
                <p className="text-slate-600 text-sm sm:text-base font-normal leading-relaxed">
                  We don't do generic pitch decks. When you reach out, our performance leads inspect your acquisition architecture, benchmark your conversion metrics, and design a transparent strategic road-map. No sales fluff—just engineering-led growth plans.
                </p>
              </div>

              {/* Direct Assistance Card */}
              <div className="p-6 bg-[#303360] text-white rounded-3xl relative overflow-hidden shadow-xl max-w-md hover:scale-[1.01] transition-transform duration-300">
                <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-4 translate-y-4">
                  <Phone size={140} className="stroke-[1]" />
                </div>
                
                <div className="flex items-start gap-4 relative z-10">
                  <div className="w-11 h-11 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-[#FE7146] shrink-0">
                    <Phone size={20} className="fill-[#FE7146]/20" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] text-orange-200 font-extrabold uppercase tracking-widest leading-none">
                      Need Immediate Assistance?
                    </span>
                    <a
                      href="tel:+919997969967"
                      className="text-xl sm:text-2xl font-black text-white hover:text-[#FE7146] transition-colors mt-2"
                    >
                      +91 99979 69967
                    </a>
                    <div className="flex items-center gap-1.5 text-xs text-gray-300 mt-3 font-medium">
                      <Clock size={12} className="text-[#FE7146]" />
                      <span>Support Hours: Mon - Sat, 9 AM - 7 PM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side: High-End Contact Form Card */}
            <div className="lg:col-span-7 w-full">
              <div className="bg-white border border-gray-100 p-8 sm:p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 relative text-left">
                
                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="py-12 flex flex-col items-center justify-center text-center space-y-5"
                    >
                      <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-100/30">
                        <CheckCircle2 size={32} className="stroke-[2.5]" />
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="font-display font-black text-2xl sm:text-3xl text-[#303360]">
                          Message Received!
                        </h3>
                        <p className="text-slate-500 text-sm max-w-md leading-relaxed">
                          Thank you, <strong className="text-[#FE7146]">{formData.name}</strong>. Our Noida campaign managers have received your details. We will reach out to you at <strong className="text-[#303360]">{formData.email}</strong> within 2 hours.
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          setIsSubmitted(false);
                          setFormData({
                            name: "",
                            email: "",
                            phone: "",
                            subject: "",
                            service: "SEO Strategy",
                            message: "",
                          });
                          setTouched({});
                        }}
                        className="mt-4 border-2 border-gray-200 hover:border-[#303360] text-[#303360] font-bold text-xs px-6 py-3.5 rounded-xl hover:bg-gray-50 active:scale-[0.98] transition-all cursor-pointer"
                      >
                        Send Another Message
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      className="space-y-6"
                      noValidate
                    >
                      <div>
                        <h3 className="font-display font-black text-2xl text-[#303360]">
                          Send Us a Message
                        </h3>
                        <p className="text-slate-500 text-xs sm:text-sm mt-1">
                          Fill out the details below to start your digital growth strategy consultation.
                        </p>
                      </div>

                      {/* 2-Column Row 1: Name and Email */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        
                        {/* Name Input */}
                        <div className="space-y-1.5 text-left">
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                            Full Name <span className="text-[#FE7146]">*</span>
                          </label>
                          <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                              <User size={16} />
                            </span>
                            <input
                              type="text"
                              required
                              value={formData.name}
                              onBlur={() => handleBlur("name")}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              placeholder="e.g. Sanjay Nair"
                              className={`w-full bg-slate-50/50 border rounded-xl py-3.5 pl-11 pr-4 text-xs sm:text-sm font-medium focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#FE7146]/10 transition-all placeholder:text-gray-400 ${
                                getFieldError("name")
                                  ? "border-amber-400 focus:border-amber-500"
                                  : "border-gray-200 focus:border-[#FE7146]"
                              }`}
                            />
                          </div>
                          {getFieldError("name") && (
                            <p className="text-[11px] text-amber-600 font-medium pl-1">
                              {getFieldError("name")}
                            </p>
                          )}
                        </div>

                        {/* Email Input */}
                        <div className="space-y-1.5 text-left">
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                            Email Address <span className="text-[#FE7146]">*</span>
                          </label>
                          <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                              <Mail size={16} />
                            </span>
                            <input
                              type="email"
                              required
                              value={formData.email}
                              onBlur={() => handleBlur("email")}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              placeholder="e.g. sanjay@company.com"
                              className={`w-full bg-slate-50/50 border rounded-xl py-3.5 pl-11 pr-4 text-xs sm:text-sm font-medium focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#FE7146]/10 transition-all placeholder:text-gray-400 ${
                                getFieldError("email")
                                  ? "border-amber-400 focus:border-amber-500"
                                  : "border-gray-200 focus:border-[#FE7146]"
                              }`}
                            />
                          </div>
                          {getFieldError("email") && (
                            <p className="text-[11px] text-amber-600 font-medium pl-1">
                              {getFieldError("email")}
                            </p>
                          )}
                        </div>

                      </div>

                      {/* 2-Column Row 2: Phone and Subject */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        
                        {/* Phone Input */}
                        <div className="space-y-1.5 text-left">
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                            Phone Number <span className="text-[#FE7146]">*</span>
                          </label>
                          <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                              <Phone size={16} />
                            </span>
                            <input
                              type="tel"
                              required
                              value={formData.phone}
                              onBlur={() => handleBlur("phone")}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              placeholder="e.g. +91 99979 69967"
                              className={`w-full bg-slate-50/50 border rounded-xl py-3.5 pl-11 pr-4 text-xs sm:text-sm font-medium focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#FE7146]/10 transition-all placeholder:text-gray-400 ${
                                getFieldError("phone")
                                  ? "border-amber-400 focus:border-amber-500"
                                  : "border-gray-200 focus:border-[#FE7146]"
                              }`}
                            />
                          </div>
                          {getFieldError("phone") && (
                            <p className="text-[11px] text-amber-600 font-medium pl-1">
                              {getFieldError("phone")}
                            </p>
                          )}
                        </div>

                        {/* Subject Input */}
                        <div className="space-y-1.5 text-left">
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                            Subject <span className="text-[#FE7146]">*</span>
                          </label>
                          <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                              <FileText size={16} />
                            </span>
                            <input
                              type="text"
                              required
                              value={formData.subject}
                              onBlur={() => handleBlur("subject")}
                              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                              placeholder="e.g. Quote Request or Audit"
                              className={`w-full bg-slate-50/50 border rounded-xl py-3.5 pl-11 pr-4 text-xs sm:text-sm font-medium focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#FE7146]/10 transition-all placeholder:text-gray-400 ${
                                getFieldError("subject")
                                  ? "border-amber-400 focus:border-amber-500"
                                  : "border-gray-200 focus:border-[#FE7146]"
                              }`}
                            />
                          </div>
                          {getFieldError("subject") && (
                            <p className="text-[11px] text-amber-600 font-medium pl-1">
                              {getFieldError("subject")}
                            </p>
                          )}
                        </div>

                      </div>

                      {/* Dropdown: Service Needed */}
                      <div className="space-y-1.5 text-left">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                          What are you looking for?
                        </label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                            <Briefcase size={16} />
                          </span>
                          <select
                            value={formData.service}
                            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                            className="w-full bg-slate-50/50 border border-gray-200 rounded-xl py-3.5 pl-11 pr-4 text-xs sm:text-sm font-semibold focus:outline-none focus:bg-white focus:border-[#FE7146] focus:ring-2 focus:ring-[#FE7146]/10 transition-colors text-slate-700 appearance-none"
                          >
                            <option value="SEO Strategy">Search Engine Optimization (SEO)</option>
                            <option value="Performance Marketing">Performance Marketing (Google Ads)</option>
                            <option value="Social Media Marketing">Social Media Marketing</option>
                            <option value="Web Design & Development">Web Design & Development</option>
                            <option value="Analytics & CRO">Analytics & Conversion Optimization</option>
                          </select>
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Message Textarea */}
                      <div className="space-y-1.5 text-left">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                          Your Message / Requirements
                        </label>
                        <div className="relative">
                          <span className="absolute left-4 top-5 text-gray-400">
                            <MessageSquare size={16} />
                          </span>
                          <textarea
                            rows={4}
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            placeholder="Please share any specific goals or growth metrics you want to target..."
                            className="w-full bg-slate-50/50 border border-gray-200 rounded-xl py-3.5 pl-11 pr-4 text-xs sm:text-sm font-medium focus:outline-none focus:bg-white focus:border-[#FE7146] focus:ring-2 focus:ring-[#FE7146]/10 transition-all placeholder:text-gray-400 resize-none"
                          />
                        </div>
                      </div>

                      {/* Action Button & Privacy Notice */}
                      <div className="space-y-3.5">
                        <button
                          type="submit"
                          disabled={isSending}
                          className="w-full bg-[#FE7146] hover:bg-[#e0562b] disabled:bg-orange-300 text-white font-extrabold text-sm py-4 rounded-xl shadow-lg shadow-[#FE7146]/20 hover:shadow-[#FE7146]/30 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
                        >
                          {isSending ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              <span>Sending Message...</span>
                            </>
                          ) : (
                            <>
                              <span>Send Message</span>
                              <Send size={16} />
                            </>
                          )}
                        </button>

                        <p className="text-[11px] text-gray-400 text-center font-medium leading-normal max-w-md mx-auto">
                          We respect your privacy. Your data is 100% secure, processed in accordance with privacy laws, and will never be shared with third parties.
                        </p>
                      </div>

                    </motion.form>
                  )}
                </AnimatePresence>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Get in Touch + Map Band (Two-Column, Light Navy-Tint Background) */}
      <section id="location-map-section" className="py-20 sm:py-24 bg-[#F5F5FA] border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
            
            {/* Left Column: Get in Touch Info Panel */}
            <div className="lg:col-span-6 flex flex-col justify-between text-left space-y-8">
              <div className="space-y-4">
                <span className="inline-block text-xs font-bold text-[#FE7146] tracking-widest uppercase">
                  GET IN TOUCH
                </span>
                <h2 className="font-display font-black text-3xl sm:text-4xl text-[#303360] tracking-tight leading-snug">
                  Our Communications Hub
                </h2>
                <p className="text-[#333333] text-sm sm:text-base leading-relaxed text-gray-600">
                  Whether you prefer writing a formal email, picking up the phone for a quick discovery call, or scheduling an in-person meeting at our Noida One headquarters, we're ready to start.
                </p>
              </div>

              {/* Info Rows */}
              <div className="space-y-5 flex-grow pt-4">
                
                {/* Row 1: Address */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-[#303360] text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-[#303360] text-sm sm:text-base leading-tight">
                      Our Office Address
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1 leading-relaxed max-w-md">
                      <span className="font-semibold text-[#303360]">Office:</span> B-101, 1st Floor, Tower-B, Noida One, Sector 62, Noida - 201309
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1.5 leading-relaxed max-w-md">
                      <span className="font-semibold text-[#303360]">Registered Office:</span> 917, Idgah Road, Gandhi Nagar, Unnao - 209801
                    </p>
                  </div>
                </div>

                {/* Row 2: Phone */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-[#303360] text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                    <Phone size={18} />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-[#303360] text-sm sm:text-base leading-tight">
                      Direct Phone Lines
                    </h4>
                    <div className="flex flex-col sm:flex-row sm:gap-4 mt-1">
                      <a href="tel:+919997969967" className="text-xs sm:text-sm text-[#FE7146] font-bold hover:underline">
                        +91 99979 69967
                      </a>
                    </div>
                  </div>
                </div>

                {/* Row 3: Email */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-[#303360] text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                    <Mail size={18} />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-[#303360] text-sm sm:text-base leading-tight">
                      Official Correspondence
                    </h4>
                    <div className="flex flex-col sm:flex-row sm:gap-4 mt-1">
                      <a href="mailto:sales@analyticsclouds.com" className="text-xs sm:text-sm text-[#FE7146] font-bold hover:underline">
                        sales@analyticsclouds.com
                      </a>
                    </div>
                  </div>
                </div>

                {/* Row 4: Working Hours */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-[#303360] text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                    <Clock size={18} />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-[#303360] text-sm sm:text-base leading-tight">
                      Office Hours
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                      Monday - Saturday: 9:00 AM - 6:30 PM (IST)
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Column: Visually integrated Map Box with Glass Floating info card */}
            <div className="lg:col-span-6 relative w-full h-[320px] sm:h-[400px] lg:h-auto rounded-3xl overflow-hidden border border-gray-200/50 shadow-2xl flex items-stretch">
              
              {/* Google Map iframe with exact Noida One location search */}
              <iframe
                title="Analytics Clouds Noida HQ Google Map"
                src="https://maps.google.com/maps?q=Noida%20One,%20Sector%2062,%20Noida&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full min-h-[320px] lg:min-h-full border-none"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Glassmorphism absolute floating card */}
              <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-xs bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl shadow-xl border border-white/40 text-left z-10 transition-all duration-300 hover:bg-white">
                <div className="flex gap-2 items-center mb-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FE7146] animate-pulse" />
                  <h4 className="font-display font-extrabold text-[11px] text-[#303360] uppercase tracking-wider">
                    Noida HQ Office
                  </h4>
                </div>
                
                <p className="text-[11px] sm:text-xs text-gray-600 font-medium leading-relaxed">
                  B-101, 1st Floor, Tower-B, Noida One, Sector 62, Noida, Uttar Pradesh 201309
                </p>
                
                <a
                  href="https://maps.google.com/?q=Noida+One+Sector+62+Noida"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] text-[#FE7146] font-bold mt-2.5 inline-flex items-center gap-1 hover:underline"
                >
                  <span>View Larger Map</span>
                  <ArrowUpRight size={13} />
                </a>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 4. Our Offices Section (Noida, Gurugram, Jaipur) */}
      <section id="our-offices" className="py-20 sm:py-28 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-3">
            <span className="text-xs font-bold text-[#FE7146] tracking-widest uppercase font-sans">
              // OUR PRESENCE
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#303360] tracking-tight leading-tight">
              Our Offices
            </h2>
            <p className="text-gray-500 text-sm max-w-xl mx-auto">
              With dedicated strategy hubs across three key commercial locations in Northern India, we are positioned to fuel rapid brand growth.
            </p>
          </div>

          {/* 3-Column Office Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1: Noida (Orange) */}
            <div className="bg-white border border-gray-100 p-8 sm:p-10 rounded-3xl flex flex-col items-start text-left relative overflow-hidden shadow-sm hover:shadow-xl hover:border-orange-200 transition-all duration-300 group">
              
              {/* Noida custom skyline landmark line illustration inside the card */}
              <svg className="absolute right-0 bottom-0 w-28 h-28 text-orange-500 opacity-5 pointer-events-none group-hover:scale-105 transition-transform duration-500" viewBox="0 0 100 100" fill="currentColor">
                <rect x="15" y="35" width="16" height="55" />
                <rect x="36" y="15" width="22" height="75" />
                <rect x="63" y="45" width="18" height="45" />
                <circle cx="47" cy="30" r="3" fill="white" />
                <circle cx="47" cy="45" r="3" fill="white" />
                <circle cx="47" cy="60" r="3" fill="white" />
                <circle cx="23" cy="50" r="2.5" fill="white" />
                <circle cx="23" cy="65" r="2.5" fill="white" />
              </svg>

              <div className="w-12 h-12 rounded-2xl bg-[#FFF1EC] flex items-center justify-center text-[#FE7146] mb-8 shadow-sm animate-pulse">
                <MapPin size={24} />
              </div>

              <div className="space-y-1 mb-4">
                <h3 className="font-display font-black text-xl text-[#303360]">
                  Noida
                </h3>
                <span className="inline-block text-[10px] font-extrabold text-[#FE7146] tracking-widest uppercase bg-[#FFF1EC] px-2.5 py-1 rounded-full leading-none">
                  Head Office
                </span>
              </div>

              <p className="text-gray-600 text-xs sm:text-sm font-normal leading-relaxed mb-6 flex-grow max-w-xs relative z-10">
                Tower-B, Noida One, Sector 62, Noida, Uttar Pradesh 201309, India
              </p>

              <a
                href="https://maps.google.com/?q=Noida+One+Sector+62+Noida"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-[#FE7146] font-bold inline-flex items-center gap-1.5 hover:underline relative z-10"
              >
                <span>Get Directions</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Card 2: Gurugram (Purple/Indigo) */}
            <div className="bg-white border border-gray-100 p-8 sm:p-10 rounded-3xl flex flex-col items-start text-left relative overflow-hidden shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all duration-300 group">
              
              {/* Gurugram custom cyber hubs line illustration inside the card */}
              <svg className="absolute right-0 bottom-0 w-28 h-28 text-indigo-500 opacity-5 pointer-events-none group-hover:scale-105 transition-transform duration-500" viewBox="0 0 100 100" fill="currentColor">
                <polygon points="10,90 28,25 46,90" />
                <polygon points="38,90 58,5 78,90" />
                <polygon points="68,90 84,40 98,90" />
                <circle cx="58" cy="30" r="3" fill="white" />
                <circle cx="58" cy="50" r="3" fill="white" />
                <circle cx="28" cy="50" r="2.5" fill="white" />
              </svg>

              <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-8 shadow-sm">
                <MapPin size={24} />
              </div>

              <div className="space-y-1 mb-4">
                <h3 className="font-display font-black text-xl text-[#303360]">
                  Gurugram
                </h3>
                <span className="inline-block text-[10px] font-extrabold text-indigo-600 tracking-widest uppercase bg-indigo-50 px-2.5 py-1 rounded-full leading-none">
                  Cyber City Hub
                </span>
              </div>

              <p className="text-gray-600 text-xs sm:text-sm font-normal leading-relaxed mb-6 flex-grow max-w-xs relative z-10">
                Building 10C, Cyber City, DLF Phase 3, Sector 24, Gurugram, Haryana 122002
              </p>

              <a
                href="https://maps.google.com/?q=DLF+Cyber+City+Gurugram"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-[#FE7146] font-bold inline-flex items-center gap-1.5 hover:underline relative z-10"
              >
                <span>Get Directions</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Card 3: Jaipur (Green/Emerald) */}
            <div className="bg-white border border-gray-100 p-8 sm:p-10 rounded-3xl flex flex-col items-start text-left relative overflow-hidden shadow-sm hover:shadow-xl hover:border-emerald-200 transition-all duration-300 group">
              
              {/* Jaipur custom royal fort arches line illustration inside the card */}
              <svg className="absolute right-0 bottom-0 w-28 h-28 text-emerald-500 opacity-[0.06] pointer-events-none group-hover:scale-105 transition-transform duration-500" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M10,90 L10,55 C10,45 22,35 34,35 C46,35 55,45 55,55 L55,90" />
                <path d="M55,90 L55,45 C55,30 70,20 85,20 C100,20 95,30 95,45 L95,90" />
                <circle cx="34" cy="22" r="4" fill="currentColor" />
                <circle cx="85" cy="10" r="4" fill="currentColor" />
              </svg>

              <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-8 shadow-sm">
                <MapPin size={24} />
              </div>

              <div className="space-y-1 mb-4">
                <h3 className="font-display font-black text-xl text-[#303360]">
                  Jaipur
                </h3>
                <span className="inline-block text-[10px] font-extrabold text-emerald-600 tracking-widest uppercase bg-emerald-50 px-2.5 py-1 rounded-full leading-none">
                  Creative Center
                </span>
              </div>

              <p className="text-gray-600 text-xs sm:text-sm font-normal leading-relaxed mb-6 flex-grow max-w-xs relative z-10">
                4th Floor, Apex Tower, Lal Kothi, Tonk Road, Jaipur, Rajasthan 302015
              </p>

              <a
                href="https://maps.google.com/?q=Apex+Tower+Tonk+Road+Jaipur"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-[#FE7146] font-bold inline-flex items-center gap-1.5 hover:underline relative z-10"
              >
                <span>Get Directions</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

          </div>

        </div>
      </section>

      {/* 5. Shared CTA Banner (Visual Consistency Across Pages) */}
      <CtaBanner onContactClick={scrollToForm} />

    </div>
  );
}
