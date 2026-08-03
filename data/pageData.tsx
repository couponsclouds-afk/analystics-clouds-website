/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ReactNode } from "react";
import {
  Search,
  Target,
  Share2,
  Code2,
  Mail,
  Tv,
  MessageSquare,
  BarChart4,
  Database,
  TrendingUp,
  Award,
  ClipboardCheck,
  Users,
  BarChart2,
} from "lucide-react";

export interface ServiceItem {
  icon: ReactNode;
  iconBg: string;
  title: string;
  description: string;
}

export interface Differentiator {
  icon: ReactNode;
  title: string;
  description: string;
}

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
  desc: string;
}

export interface CaseStudyItem {
  category: string;
  categoryBg: string;
  title: string;
  image: string;
  metrics: {
    label: string;
    value: string;
    icon: ReactNode;
  }[];
}

export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
}

export interface BlogPostItem {
  category: string;
  date: string;
  title: string;
  image: string;
}

// 8 core services of Analytics Clouds
export const servicesData: ServiceItem[] = [
  {
    icon: <Search className="w-5 h-5 text-indigo-600" />,
    iconBg: "bg-indigo-50",
    title: "Search Engine Optimization (SEO)",
    description: "Rank higher on Google and get consistent organic traffic that converts into loyal paying clients.",
  },
  {
    icon: <Target className="w-5 h-5 text-primary" />,
    iconBg: "bg-orange-50",
    title: "Performance Marketing (Google Ads)",
    description: "Drive targeted traffic and get quality leads with high-ROI ad campaigns optimized daily.",
  },
  {
    icon: <Share2 className="w-5 h-5 text-sky-500" />,
    iconBg: "bg-sky-50",
    title: "Social Media Marketing",
    description: "Build your brand, engage your audience, and grow sales across Facebook, Instagram & LinkedIn.",
  },
  {
    icon: <Code2 className="w-5 h-5 text-emerald-600" />,
    iconBg: "bg-emerald-50",
    title: "Web Design & Development",
    description: "Responsive, ultra-fast, and conversion-friendly websites that convert casual visitors into customers.",
  },
  {
    icon: <Mail className="w-5 h-5 text-purple-600" />,
    iconBg: "bg-purple-50",
    title: "Email Marketing",
    description: "Nurture cold leads and increase retention with highly personalized, automated email flows.",
  },
  {
    icon: <Tv className="w-5 h-5 text-amber-600" />,
    iconBg: "bg-amber-50",
    title: "Display & Native Advertising",
    description: "Reach your exact audience across the web with visually engaging and contextual ad campaigns.",
  },
  {
    icon: <MessageSquare className="w-5 h-5 text-teal-600" />,
    iconBg: "bg-teal-50",
    title: "SMS Marketing",
    description: "Instantly connect with your audience through highly effective and personalized SMS notifications.",
  },
  {
    icon: <BarChart4 className="w-5 h-5 text-rose-600" />,
    iconBg: "bg-rose-50",
    title: "Analytics & Conversion Optimization",
    description: "Track, analyze, and optimize every single step of your custom user journey to maximize conversion.",
  },
];

// Why Choose Us - Left list
export const differentiatorsData: Differentiator[] = [
  {
    icon: <Database className="w-5 h-5 text-orange-400" />,
    title: "Data-Driven Strategies",
    description: "We use data, not guesswork, to build strategies that deliver measurable results.",
  },
  {
    icon: <TrendingUp className="w-5 h-5 text-indigo-400" />,
    title: "ROI Focused Approach",
    description: "Every campaign is optimized to give you the highest return on investment.",
  },
  {
    icon: <Award className="w-5 h-5 text-emerald-400" />,
    title: "Experienced Team",
    description: "A team of certified marketers, analysts & creatives with years of real-world experience.",
  },
  {
    icon: <ClipboardCheck className="w-5 h-5 text-sky-400" />,
    title: "Transparent Reporting",
    description: "Clear, detailed reports that keep you informed about every growth step.",
  },
];

// Why Choose Us - Right Stat Cards
export const statsData: StatItem[] = [
  { value: 200, suffix: "+", label: "Happy Clients", desc: "Across India" },
  { value: 500, suffix: "+", label: "Successful Campaigns", desc: "Delivered" },
  { value: 98, suffix: "%", label: "Client Retention", desc: "Rate" },
  { value: 7, suffix: "+", label: "Years of Experience", desc: "In Digital Marketing" },
];

// Real case studies
export const caseStudiesData: CaseStudyItem[] = [
  {
    category: "SEO",
    categoryBg: "bg-indigo-50 text-indigo-700",
    title: "How We Increased Organic Traffic by 230% for a Healthcare Brand",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&h=400&q=80",
    metrics: [
      { label: "Traffic Increase", value: "230%", icon: <TrendingUp className="w-4 h-4 text-[#FE7146]" /> },
      { label: "Time Taken", value: "6 Months", icon: <BarChart2 className="w-4 h-4 text-[#FE7146]" /> },
    ],
  },
  {
    category: "Google Ads",
    categoryBg: "bg-orange-50 text-[#FE7146]",
    title: "Generated 4X More Leads for an EduTech Brand",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&h=400&q=80",
    metrics: [
      { label: "More Leads", value: "4X Leads", icon: <TrendingUp className="w-4 h-4 text-[#FE7146]" /> },
      { label: "Time Taken", value: "3 Months", icon: <BarChart2 className="w-4 h-4 text-[#FE7146]" /> },
    ],
  },
  {
    category: "Social Media",
    categoryBg: "bg-pink-50 text-pink-700",
    title: "Boosted Brand Engagement by 180% for an E-commerce Brand",
    image: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=600&h=400&q=80",
    metrics: [
      { label: "Engagement Increase", value: "180%", icon: <Users className="w-4 h-4 text-[#FE7146]" /> },
      { label: "Time Taken", value: "2 Months", icon: <BarChart2 className="w-4 h-4 text-[#FE7146]" /> },
    ],
  },
];

// Testimonials
export const testimonialsData: TestimonialItem[] = [
  {
    quote: "Analytics Clouds helped us scale our business like never before. Their SEO and Google Ads strategy delivered amazing results with consistent leads.",
    author: "Rahul Sharma",
    role: "Marketing Head",
    company: "Redcliffe Labs",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80",
  },
  {
    quote: "Highly professional team with great understanding of digital marketing and conversion optimization. Strongly recommend their services for edtech growth!",
    author: "Neha Verma",
    role: "Founder",
    company: "Study Smart",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&h=120&q=80",
  },
  {
    quote: "Their performance marketing campaigns gave us an excellent ROI. We had 2.5x growth in revenue in just 3 months. Great team and great communication.",
    author: "Amit Malhotra",
    role: "CEO",
    company: "Home Decor India",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&h=120&q=80",
  },
];

// Blog posts
export const blogPostsData: BlogPostItem[] = [
  {
    category: "SEO",
    date: "July 10, 2026",
    title: "10 Proven SEO Strategies to Rank Higher on Google in 2026",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&h=400&q=80",
  },
  {
    category: "Google Ads",
    date: "July 8, 2026",
    title: "Google Ads vs Facebook Ads: Which is Better for Your Business?",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&h=400&q=80",
  },
  {
    category: "Content Marketing",
    date: "July 5, 2026",
    title: "How to Create SEO-Friendly Content That Ranks & Converts",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&h=400&q=80",
  },
];
