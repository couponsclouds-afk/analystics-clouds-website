/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

"use client";

import { useState, FormEvent } from "react";
import { X, Send, CheckCircle2, Cloud, Sparkles } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
    service: "google-ads",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate sending form data
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Reset form after a few seconds or when closed
      setFormData({
        name: "",
        email: "",
        phone: "",
        website: "",
        service: "google-ads",
        message: "",
      });
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/60 backdrop-blur-md animate-fade-in-up">
      <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col relative max-h-[90vh]">
        
        {/* Header Section */}
        <div className="bg-[#FFF1EC] p-6 text-left relative flex justify-between items-start">
          <div className="space-y-1.5 max-w-[85%]">
            <div className="flex items-center gap-2">
              <Cloud className="w-5 h-5 text-[#FE7146] fill-[#FE7146]" />
              <span className="text-xs font-bold text-[#FE7146] tracking-wider uppercase font-sans">
                Grow Your Revenue
              </span>
            </div>
            <h3 className="font-display font-black text-xl sm:text-2xl text-navy">
              Book a Free Audit & Consultation
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Get an actionable, data-backed strategy built specifically for your brand.
            </p>
          </div>
          
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#303360] hover:bg-white/50 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 overflow-y-auto flex-1">
          {isSuccess ? (
            <div className="py-12 px-4 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center shadow-inner shadow-emerald-50">
                <CheckCircle2 size={32} />
              </div>
              <h4 className="font-display font-black text-2xl text-[#303360]">
                Proposal Request Received!
              </h4>
              <p className="text-sm text-slate-500 max-w-sm">
                Thank you for reaching out to **Analytics Clouds**. Our Noida team is already reviewing your website and will contact you within **2 business hours** with custom growth insights.
              </p>
              <button
                onClick={() => {
                  setIsSuccess(false);
                  onClose();
                }}
                className="bg-navy hover:bg-[#202242] text-white font-bold text-sm px-6 py-2.5 rounded-xl transition-all"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              {/* Form Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#303360] uppercase tracking-wider block">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full text-sm font-semibold text-[#303360] placeholder-gray-400 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:border-[#FE7146] focus:bg-white transition-all"
                  />
                </div>

                {/* Work Email */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#303360] uppercase tracking-wider block">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full text-sm font-semibold text-[#303360] placeholder-gray-400 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:border-[#FE7146] focus:bg-white transition-all"
                  />
                </div>

                {/* Phone Number */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#303360] uppercase tracking-wider block">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 99979 69967"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full text-sm font-semibold text-[#303360] placeholder-gray-400 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:border-[#FE7146] focus:bg-white transition-all"
                  />
                </div>

                {/* Website URL */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#303360] uppercase tracking-wider block">
                    Website URL *
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://yourbrand.com"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="w-full text-sm font-semibold text-[#303360] placeholder-gray-400 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:border-[#FE7146] focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Service of Interest */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#303360] uppercase tracking-wider block">
                  Service of Interest *
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full text-sm font-semibold text-[#303360] bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:border-[#FE7146] focus:bg-white transition-all"
                >
                  <option value="seo">Search Engine Optimization (SEO)</option>
                  <option value="google-ads">Performance Marketing (Google Ads)</option>
                  <option value="social-media">Social Media Marketing</option>
                  <option value="web-dev">Web Design & Development</option>
                  <option value="analytics-cro">Analytics & Conversion Optimization</option>
                </select>
              </div>

              {/* Project Brief */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#303360] uppercase tracking-wider block">
                  Briefly describe your goals
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us about your current challenges, target audience, and monthly budget..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full text-sm font-semibold text-[#303360] placeholder-gray-400 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:border-[#FE7146] focus:bg-white transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#FE7146] hover:bg-[#e0562b] disabled:bg-orange-300 text-white font-extrabold text-base py-3.5 rounded-xl shadow-lg shadow-[#FE7146]/25 hover:shadow-[#FE7146]/35 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span>Submit Request for Audit</span>
                      <Send size={16} />
                    </>
                  )}
                </button>
              </div>

              {/* Secure Info footer */}
              <p className="text-[10px] text-center text-slate-400 font-medium flex items-center justify-center gap-1">
                <Sparkles size={12} className="text-amber-400" />
                <span>Your information is protected by industry standard SSL. We do not sell data.</span>
              </p>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
