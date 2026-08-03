/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

"use client";

import { useState, useEffect } from "react";
import {
  TrendingUp,
  Download,
  Users,
  Target,
  ChevronDown,
  LayoutDashboard,
  Megaphone,
  BarChart3,
  ClipboardList,
  Settings as SettingsIcon,
} from "lucide-react";
import { AnimatedCounter } from './AnimatedCounter';

export function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [livePulse, setLivePulse] = useState(true);

  // Toggle the pulse animation slightly to simulate live changes
  useEffect(() => {
    const interval = setInterval(() => {
      setLivePulse((prev) => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden font-sans transition-all duration-300 hover:shadow-primary/5 hover:border-primary/20 flex flex-row">
      
      {/* Left Sidebar inside the dashboard - Slate theme */}
      <div className="w-1/4 bg-[#141625] text-gray-400 p-4 flex flex-col justify-between hidden sm:flex">
        <div>
          {/* Logo element inside dashboard */}
          <div className="flex items-center gap-2 mb-6 px-1">
            <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-[#FE7146] to-[#ff8f6b] flex items-center justify-center text-white text-xs font-bold font-display">
              AC
            </div>
            <span className="text-white font-semibold font-display text-xs tracking-wider">
              DASHBOARD
            </span>
          </div>

          <nav className="space-y-1">
            {[
              { id: "overview", label: "Overview", icon: <LayoutDashboard size={14} /> },
              { id: "campaigns", label: "Campaigns", icon: <Megaphone size={14} /> },
              { id: "analytics", label: "Analytics", icon: <BarChart3 size={14} /> },
              { id: "leads", label: "Leads", icon: <ClipboardList size={14} /> },
              { id: "settings", label: "Settings", icon: <SettingsIcon size={14} /> },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  activeTab === item.id
                    ? "bg-[#FE7146]/10 text-[#FE7146] border-l-2 border-[#FE7146]"
                    : "hover:bg-gray-800/50 hover:text-gray-200"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Live indicator at bottom of sidebar */}
        <div className="flex items-center gap-2 bg-[#1C1E32] rounded-lg p-2 border border-gray-800">
          <span className="relative flex h-2 w-2">
            <span className={`absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 ${livePulse ? "animate-ping" : ""}`}></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[10px] text-gray-400 font-medium">Live Feed Active</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-gray-50/50 p-4 sm:p-5 flex flex-col justify-between">
        
        {/* Dashboard Header */}
        <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <h4 className="font-display font-bold text-gray-900 text-sm sm:text-base">
              Analytics Overview
            </h4>
            <span className="bg-emerald-50 text-emerald-700 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-emerald-100 flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              LIVE
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80"
              alt="Manager Avatar"
              className="w-6 h-6 rounded-full border border-gray-200 object-cover"
              referrerPolicy="no-referrer"
            />
            <ChevronDown size={14} className="text-gray-400" />
          </div>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {/* Tile 1 */}
          <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-xs flex flex-col justify-between">
            <div className="flex justify-between items-start mb-1">
              <span className="text-[11px] font-medium text-gray-400 tracking-wide uppercase">
                Total Users
              </span>
              <div className="p-1 rounded-md bg-orange-50 text-primary">
                <Users size={12} />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-base sm:text-lg font-mono font-bold text-navy">
                <AnimatedCounter endValue={12540} />
              </span>
              <span className="text-[10px] font-bold text-emerald-600 flex items-center">
                +18.2%
              </span>
            </div>
          </div>

          {/* Tile 2 */}
          <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-xs flex flex-col justify-between">
            <div className="flex justify-between items-start mb-1">
              <span className="text-[11px] font-medium text-gray-400 tracking-wide uppercase">
                Conversions
              </span>
              <div className="p-1 rounded-md bg-indigo-50 text-indigo-600">
                <Target size={12} />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-base sm:text-lg font-mono font-bold text-navy">
                <AnimatedCounter endValue={8432} />
              </span>
              <span className="text-[10px] font-bold text-emerald-600 flex items-center">
                +23.5%
              </span>
            </div>
          </div>
        </div>

        {/* Main Analytics Content - Split chart and traffic */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          
          {/* Revenue Growth chart area */}
          <div className="sm:col-span-3 bg-white p-3 rounded-xl border border-gray-100 shadow-xs flex flex-col justify-between">
            <div className="flex justify-between items-center mb-2">
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                  Revenue Growth
                </span>
                <span className="text-[11px] text-gray-500 font-medium">
                  This Month <strong className="text-[#FE7146] font-mono">+32.6%</strong>
                </span>
              </div>
              <div className="p-1 rounded bg-orange-50 text-primary">
                <TrendingUp size={12} />
              </div>
            </div>

            {/* Custom SVG Line Chart */}
            <div className="relative h-24 w-full mt-1">
              <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FE7146" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#FE7146" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                {/* Grid Lines */}
                <line x1="0" y1="10" x2="100" y2="10" stroke="#f1f5f9" strokeWidth="0.25" />
                <line x1="0" y1="20" x2="100" y2="20" stroke="#f1f5f9" strokeWidth="0.25" />
                <line x1="0" y1="30" x2="100" y2="30" stroke="#f1f5f9" strokeWidth="0.25" />

                {/* Area under curve */}
                <path
                  d="M 0,38 Q 15,30 30,32 T 60,18 T 80,12 T 100,6 L 100,40 L 0,40 Z"
                  fill="url(#chartGradient)"
                />

                {/* Chart Line */}
                <path
                  d="M 0,38 Q 15,30 30,32 T 60,18 T 80,12 T 100,6"
                  fill="none"
                  stroke="#FE7146"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  className="path-animated"
                />

                {/* Hover indicator dot */}
                <circle cx="80" cy="12" r="2.5" fill="#FE7146" stroke="white" strokeWidth="1" className="animate-pulse" />
                <circle cx="100" cy="6" r="2.5" fill="#FE7146" stroke="white" strokeWidth="1" />
              </svg>
            </div>
          </div>

          {/* Traffic Source Pie and Download report panel */}
          <div className="sm:col-span-2 bg-white p-3 rounded-xl border border-gray-100 shadow-xs flex flex-col justify-between">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 block">
              Traffic Source
            </span>

            {/* Traffic channels circular indicator & list */}
            <div className="flex items-center gap-2 mb-2">
              {/* Donut graphic */}
              <div className="relative w-10 h-10 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  {/* Gray background ring */}
                  <circle cx="18" cy="18" r="14.5" fill="none" stroke="#f1f5f9" strokeWidth="4" />
                  
                  {/* Organic segment - 46% */}
                  <circle
                    cx="18"
                    cy="18"
                    r="14.5"
                    fill="none"
                    stroke="#303360"
                    strokeWidth="4.2"
                    strokeDasharray="46 100"
                    strokeDashoffset="0"
                  />
                  {/* Paid segment - 28% */}
                  <circle
                    cx="18"
                    cy="18"
                    r="14.5"
                    fill="none"
                    stroke="#FE7146"
                    strokeWidth="4.2"
                    strokeDasharray="28 100"
                    strokeDashoffset="-46"
                  />
                  {/* Social segment - 16% */}
                  <circle
                    cx="18"
                    cy="18"
                    r="14.5"
                    fill="none"
                    stroke="#cbd5e1"
                    strokeWidth="4.2"
                    strokeDasharray="16 100"
                    strokeDashoffset="-74"
                  />
                  {/* Direct segment - 10% */}
                  <circle
                    cx="18"
                    cy="18"
                    r="14.5"
                    fill="none"
                    stroke="#ffedd5"
                    strokeWidth="4.2"
                    strokeDasharray="10 100"
                    strokeDashoffset="-90"
                  />
                </svg>
                {/* Middle number */}
                <div className="absolute text-[8px] font-bold text-navy">
                  94%
                </div>
              </div>

              {/* Traffic List */}
              <div className="flex-1 text-[9px] text-gray-500 font-medium space-y-0.5">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#303360]"></span>
                    Organic
                  </span>
                  <span className="font-mono font-bold text-gray-700">46%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FE7146]"></span>
                    Paid
                  </span>
                  <span className="font-mono font-bold text-gray-700">28%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                    Social
                  </span>
                  <span className="font-mono font-bold text-gray-700">16%</span>
                </div>
              </div>
            </div>

            {/* Orange Button */}
            <button className="w-full bg-[#FE7146] hover:bg-[#e0562b] text-white rounded-lg py-1.5 text-[10px] font-bold flex items-center justify-center gap-1 transition-all shadow-md shadow-[#FE7146]/25">
              <Download size={10} />
              <span>Download Report</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
