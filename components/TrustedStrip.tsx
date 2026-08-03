/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ShieldCheck } from "lucide-react";

export function TrustedStrip() {
  const brands = [
    { name: "Manipal Hospitals", logoType: "serif", boldWord: "Manipal", lightWord: "Hospitals" },
    { name: "Redcliffe Labs", logoType: "sans", boldWord: "Redcliffe", lightWord: "labs" },
    { name: "SRL Diagnostics", logoType: "serif", boldWord: "SRL", lightWord: "Diagnostics" },
    { name: "PolicyBazaar", logoType: "sans", boldWord: "policy", lightWord: "bazaar" },
    { name: "OYO", logoType: "slab", boldWord: "OYO", lightWord: "" },
    { name: "Zomato", logoType: "sans-ital", boldWord: "zomato", lightWord: "" },
    { name: "Cars24", logoType: "sans", boldWord: "CARS", lightWord: "24" },
  ];

  return (
    <div className="bg-white border-y border-gray-100 py-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Strip Header */}
        <p className="text-center text-xs font-semibold text-gray-400 uppercase tracking-widest mb-6 flex items-center justify-center gap-2">
          <ShieldCheck size={14} className="text-[#FE7146]" />
          <span>Trusted by growing brands across India</span>
        </p>

        {/* Brand Logos Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6 items-center justify-center opacity-70 hover:opacity-100 transition-opacity duration-300">
          {brands.map((brand, i) => (
            <div
              key={i}
              className="flex items-center justify-center px-4 py-2 hover:scale-105 transition-transform duration-200"
            >
              <div
                className={`text-sm sm:text-base tracking-tight text-slate-500 font-display select-none flex items-center justify-center`}
              >
                {brand.logoType === "serif" ? (
                  <span className="font-serif italic font-bold">
                    <strong className="text-slate-800 not-italic">{brand.boldWord}</strong>{" "}
                    {brand.lightWord}
                  </span>
                ) : brand.logoType === "slab" ? (
                  <span className="font-serif tracking-widest font-black text-slate-800 text-lg sm:text-xl">
                    {brand.boldWord}
                  </span>
                ) : brand.logoType === "sans-ital" ? (
                  <span className="font-sans italic font-extrabold text-red-500 text-lg lowercase">
                    {brand.boldWord}
                  </span>
                ) : (
                  <span className="font-sans font-extrabold text-slate-800">
                    {brand.boldWord}
                    <span className="font-normal text-slate-500">{brand.lightWord}</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
