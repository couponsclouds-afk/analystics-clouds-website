"use client";

import { ReactNode } from "react";
import { motion } from "motion/react";
import {
  ShieldCheck,
  RefreshCw,
  TrendingUp,
  Plug,
  ExternalLink,
  ArrowRight,
  Wallet,
  ChevronDown,
} from "lucide-react";

interface InventoryItem {
  name: string;
  domain: string;
  da: number;
  relevance: "High" | "Medium";
  gradient: string;
  // Optional properties for extended inventory cards
  status?: string;
  cashbackRate?: string;
  title?: string;
  desc?: string;
  icon?: ReactNode;
}

const cashbackInventories = [
  {
    name: "CouponsClouds",
    domain: "couponsclouds.com",
    da: 48,
    relevance: "High",
    status: "ACTIVE OFFER",
    // Apni exact screenshot/image URL yahan daalein:
    image: "https://res.cloudinary.com/couponsbit/image/upload/v1785758795/couponsclouds-website_eysguh.webp",
    desc: "A trusted coupon and cashback platform offering verified discount codes across top Indian brands. Drives high-intent traffic from deal-seekers actively looking to save on purchases.",
  },
  {
    name: "Couponsbit",
    domain: "couponsbit.us",
    da: 41,
    relevance: "Medium",
    status: "ACTIVE OFFER",
    image: "https://res.cloudinary.com/couponsbit/image/upload/v1785759379/couponsbit-website_hj8kkf.webp",
    desc: "A fast-growing coupon aggregation platform curating live promo codes and deals for international shoppers, connecting brands with cost-conscious online buyers.",
  },
  {
    name: "Blogg4u",
    domain: "blogg4u.com",
    da: 44,
    relevance: "Medium",
    status: "ACTIVE OFFER",
    image: "https://res.cloudinary.com/couponsbit/image/upload/v1785759430/blog4u-image_guxzkg.webp",
    desc: "A content and deals publishing platform blending shopping guides, brand roundups, and blog-style promotions to engage a highly-read Indian audience.",
  },
];



const features = [
  {
    icon: <ShieldCheck className="w-5 h-5" />,
    title: "Verified Publishers",
    desc: "Every website in our network is carefully reviewed to ensure quality, relevance, and brand safety.",
    color: "text-indigo-500",
    bg: "bg-indigo-50",
  },
  {
    icon: <RefreshCw className="w-5 h-5" />,
    title: "Regularly Updated",
    desc: "Our publisher network is continuously expanded and maintained to deliver the best opportunities for your campaigns.",
    color: "text-[#FE7146]",
    bg: "bg-[#FFF1EC]",
  },
  {
    icon: <TrendingUp className="w-5 h-5" />,
    title: "Performance-Driven",
    desc: "Partner with trusted publishers that help increase visibility, attract qualified audiences, and support your marketing goals.",
    color: "text-emerald-500",
    bg: "bg-emerald-50",
  },
  {
    icon: <Plug className="w-5 h-5" />,
    title: "Campaign Ready",
    desc: "Launch your campaigns quickly with a network that's built for seamless collaboration and measurable results.",
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
];

interface InventoryProps {}

export function Inventory(props: InventoryProps) {
  const scrollToForm = () => {
    const target = document.getElementById("contact-form");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-white text-[#333333] selection:bg-[#FE7146] selection:text-white">
      {/* ----------------- Hero Section ----------------- */}
      <section
        id="contact-hero"
        className="relative min-h-[45vh] sm:min-h-[50vh] lg:min-h-[55vh] flex items-center justify-center pt-16 overflow-hidden bg-[#303360]"
      >
        <div className="absolute inset-0 z-0">
          <img
            src="https://res.cloudinary.com/dqjlffxja/image/upload/v1783872960/contact-us-page_wbsfex.jpg"
            alt="Analytics Clouds Noida performance consulting squad"
            className="w-full h-full object-cover object-top filter brightness-90"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#303360] via-[#303360]/90 to-[#303360]/40 sm:from-[#303360]/95 sm:via-[#303360]/85 sm:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#303360] via-[#303360]/50 to-transparent lg:hidden" />
        </div>

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 space-y-5 text-left">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-block font-mono text-xs font-semibold text-[#FE7146] tracking-wider uppercase bg-[#FFF1EC]/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#FE7146]/30"
              >
                INVENTORY
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight font-display"
              >
                Let's Grow Your <br />
                <span className="text-[#FE7146] inline-block relative">
                  Business Together
                  <span className="absolute left-0 bottom-1 w-full h-1 bg-[#FE7146]/20 rounded" />
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-gray-200 text-sm sm:text-base font-normal leading-relaxed max-w-xl"
              >
                Whether you're looking to generate more leads, increase sales, or strengthen your digital presence, our team is here to help. Let's discuss your goals and create a strategy that delivers measurable results.
              </motion.p>

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

      {/* ----------------- Consolidated Inventories Section ----------------- */}
      <section className="py-20 sm:py-24 bg-[#F5F5FA] relative overflow-hidden">
  {/* Ambient Glows */}
  <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#FE7146]/5 rounded-full blur-3xl pointer-events-none" />
  <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#303360]/5 rounded-full blur-3xl pointer-events-none" />

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    {/* Main Top Header */}
    <div className="space-y-3 max-w-2xl text-left mb-10">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF1EC] border border-[#FE7146]/20">
        <Wallet size={14} className="text-[#FE7146]" />
        <span className="text-xs font-bold text-[#FE7146] tracking-widest uppercase font-mono">
          PUBLISHER NETWORK
        </span>
      </div>

      <h2 className="font-display font-black text-3xl sm:text-4xl text-[#303360] leading-tight tracking-tight">
        Expand Your Reach Through Trusted Coupon & Affiliate Platforms

      </h2>

      <p className="text-[#333333]/70 text-sm sm:text-base font-normal">
        Promote your brand across our carefully curated network of high-quality coupon, deal, and affiliate websites. Reach customers with strong purchase intent and drive more traffic, leads, and conversions through trusted publisher partnerships.

      </p>
    </div>

    {/* Features Bar */}  
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-16">
      {features.map((feat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.05 }}
          className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3 text-left"
        >
          <div className={`p-2.5 rounded-xl ${feat.bg} ${feat.color} shrink-0`}>
            {feat.icon}
          </div>
          <div>
            <h4 className="font-display font-bold text-[#303360] text-sm sm:text-base leading-snug tracking-tight mb-2">
              {feat.title}
            </h4>
            <p className="text-slate-500 text-[13px] leading-tight mt-0.5">
              {feat.desc} 
            </p>
          </div>
        </motion.div>
      ))}
    </div>

    <div className="mb-28">
      <div className="items-center text-center mb-8 pb-4">
       
        <div>
          <h3 className="text-3xl font-black text-[#303360] tracking-tight">
            Website We have Verified and Curated for Your Campaigns
          </h3>
          <p className="text-xl text-slate-500 mt-3 leading-relaxed">
            Top performing cashback platforms and deal networks.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {cashbackInventories.map((item, i) => (
        <motion.div
          key={item.domain || item.name || i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.04 }}
          className="group relative bg-white rounded-[28px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full text-left"
        >
          <div>
            {/* Full Banner Image Container */}
            <div className="relative w-full h-44 overflow-hidden bg-slate-900">
              {/* Full Bleed Image */}
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
              />

              {/* Subtle Dark Gradient Overlay for Badge Visibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/40 pointer-events-none" />

              {/* Active Offer Status Badge */}
              
            </div>

            {/* SEO Metrics Container */}
            <div className="p-5">
              <div className="grid grid-cols-2 gap-2 bg-[#F3F4F8] p-4 rounded-2xl">
                <div>
                  <span className="text-[10px] uppercase font-mono font-bold text-slate-400 block tracking-wider">
                    Domain Auth
                  </span>
                  <span className="text-xl font-bold font-mono text-[#1E293B] mt-0.5 block">
                    DA {item.da}
                  </span>
                </div>

                <div className="pl-2 border-l border-gray-200">
                  <span className="text-[10px] uppercase font-mono font-bold text-slate-400 block tracking-wider">
                    Relevance
                  </span>
                  <span
                    className={`inline-block text-xs font-bold px-2.5 py-1 rounded-md mt-1 ${
                      item.relevance === "High"
                        ? "text-emerald-700 bg-emerald-100/80"
                        : "text-amber-800 bg-amber-100/80"
                    }`}
                  >
                    {item.relevance}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card Footer Link */}
          <div className="p-5 pt-0">
            <div className="flex items-center justify-between pt-2">
              <a
                href={`https://${item.domain}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-700 hover:text-[#FE7146] transition-colors"
              >
                <span>{item.domain}</span>
                <ExternalLink size={14} className="opacity-70" />
              </a>

              <div className="w-9 h-9 rounded-xl bg-[#F3F4F8] group-hover:bg-[#FE7146] text-slate-700 group-hover:text-white flex items-center justify-center transition-all duration-300">
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              </div>
            </div>

            {item.desc && (
              <p className="text-xs text-slate-500 leading-relaxed mt-3">
                {item.desc}
              </p>
            )}
          </div>
        </motion.div>
      ))}
    </div>
    </div>


  </div>
</section>
    </div>
  );
}

export default Inventory;