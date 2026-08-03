/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

"use client";

import React, { useState } from "react";
import Link from 'next/link';
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, 
  Calendar, 
  Clock, 
  ArrowRight, 
  ChevronRight, 
  X, 
  User, 
  Send, 
  Check, 
  Sparkles,
  BookOpen
} from "lucide-react";
import { CtaBanner } from '@/components/CtaBanner';

interface BlogPost {
  id: number;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
}

interface BlogProps {}
export function Blog(props: BlogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const categories = [
    "All", 
    "SEO", 
    "Google Ads", 
    "Social Media", 
    "Web Development", 
    "Email Marketing", 
    "Case Studies", 
    "Industry News"
  ];

  // Featured Spotlight Article (pinned at the top)
  const featuredArticle: BlogPost = {
    id: 101,
    category: "SEO",
    date: "July 10, 2026",
    title: "The New Era of Search: Optimizing for Google's 2026 Generative AI Overviews",
    excerpt: "As AI-driven search engines reshape click-through dynamics, how can Noida's leading enterprises pivot their organic search strategy? Discover our proprietary high-intent optimization blueprint.",
    content: `Search Engine Optimization (SEO) has entered its most disruptive era yet. With Google's Search Generative Experience (SGE) and Generative AI Overviews taking up prime real estate at the top of the search results, traditional blue links are receiving less direct click-through share.

At Analytics Clouds, we have been auditing and tracking these generative patterns closely from our Noida delivery hub. Here is how you can pivot your search marketing strategy in 2026 to ensure you remain the primary source of reference for AI responses:

1. Target Conversational Long-Tail Keywords:
AI overviews respond to complex, natural queries. Instead of targeting generic terms like "SEO Noida," structure your content to answer multi-stage questions such as "how to audit core web vitals on a headless wordpress setup."

2. Build In-Depth Information Clusters:
AI crawlers prioritize structured, high-density reference materials. Avoid thin, superficial blog updates. Instead, construct master pillar guides with supportive sub-topic articles mapped dynamically via clean internal link paths.

3. Establish Solid Author Authority (E-E-A-T):
Demonstrate verified, real-world experience. Cite active case studies, integrate real-time project metrics, and ensure your content features verified author profiles with proven industry pedigree.

The future of search belongs to brands that offer immediate, highly detailed solutions to specific user query intents. Start auditing your pre-existing content matrices today to survive and dominate the AI transition.`,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&h=700&q=80",
    readTime: "8 min read",
    author: {
      name: "Sanjay Kumar",
      role: "SEO Director & Founder",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80"
    }
  };

  // Archive of Grid Blog Posts
  const blogPosts: BlogPost[] = [
    {
      id: 1,
      category: "Google Ads",
      date: "July 8, 2026",
      title: "Google Ads Bidding Secrets That Doubled Our Clients' Lead Flow",
      excerpt: "Traditional automated bidding can waste your budget fast. Here is how we configure Smart Bidding limits and value rules to isolate high-intent leads.",
      content: `Maximize Conversions and Maximize Conversion Value are incredibly powerful automated tools, but left unconstrained, they can drain your campaign budgets on low-value traffic. 

Our performance media specialists in Noida utilize a hybrid bidding mechanism to ensure budget efficiency:

• Set Value Rules for Target Audiences: Assign a 2x weight to leads coming from high-intent local landing pages or specific regional corporate hubs.
• Enforce Portfolio Bid Strategies with Caps: Prevent Google from bidding excessively high on speculative, broad-match keyword queries.
• Segment Campaigns by Intent Intensity: Maintain strict separation between high-intent informational queries and direct commercial purchase queries.

By feeding high-fidelity conversion signals back into Google's Machine Learning hub via server-side GCLID tracking, our client accounts have recorded a median 114% lift in qualified lead volume while maintaining a stable cost-per-acquisition (CPA).`,
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&h=400&q=80",
      readTime: "6 min read",
      author: {
        name: "Pooja Gupta",
        role: "Performance Media Lead",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80"
      }
    },
    {
      id: 2,
      category: "Social Media",
      date: "July 5, 2026",
      title: "The 2026 Social Media Algorithm Playbook for B2B Brands",
      excerpt: "Organic reach is not dead—it just shifted. Learn how to craft narrative hooks that sustain high watch-time and trigger algorithmic recommendations.",
      content: `B2B social media has long been plagued by dry press releases and corporate self-praise. In 2026, social platforms—particularly LinkedIn and YouTube Shorts—reward raw, personal narratives and conversational authenticity.

To capture and hold executive attention:
• Hook Within 3 Seconds: Start with a disruptive contrarian statement or a massive reveal rather than an introductory greeting.
• Prioritize Visual Rhythm: Break up long paragraphs into single, punchy statements. Use high-contrast diagrams instead of generic stock illustrations.
• Encourage High-Fidelity Comments: The algorithm measures the length and depth of user comments. End your posts with direct, non-cliché industry debates.

Learn to treat your LinkedIn page as a micro-media channel rather than a bulletin board. Real engagement starts when you share actual client challenges and failures transparently.`,
      image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=600&h=400&q=80",
      readTime: "5 min read",
      author: {
        name: "Ravi Verma",
        role: "Creative Director",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80"
      }
    },
    {
      id: 3,
      category: "Web Development",
      date: "June 28, 2026",
      title: "Why Headless CMS is the Future of High-Converting Landing Pages",
      excerpt: "Speed is a direct conversion driver. See how headless react architectures drop bounce rates and maximize paid campaign quality scores.",
      content: `Monolithic web setups are slow and fragile. When running high-budget Google PPC campaigns, every extra millisecond of load delay translates to a direct percentage drop in campaign conversions.

By transitioning our clients to headless Jamstack architectures (using React, Next.js, and lightweight static content pipelines):
• Unparalleled Speed scores: Achieve 95+ Mobile performance metrics on Google PageSpeed Insights.
• Bulletproof Security: Without a visible database login node, headless landing pages are virtually immune to script injections and brute-force downtime.
• Absolute Layout Control: Our design squads can build rich interactive components, ROI calculators, and step-by-step funnel sequences without bloat.

A faster landing page yields higher Google Ads quality scores, directly driving down your average cost-per-click (CPC) and improving your operational ROI.`,
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&h=400&q=80",
      readTime: "7 min read",
      author: {
        name: "Amit Sen",
        role: "Full Stack Engineer",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&h=150&q=80"
      }
    },
    {
      id: 4,
      category: "Case Studies",
      date: "June 22, 2026",
      title: "Noida Business Case Study: 340% Organic Growth in 12 Months",
      excerpt: "How we systematically audited, reorganized, and scaled a regional edtech portal into a dominant nationwide industry authority.",
      content: `A regional education provider in Sector 62, Noida, approached us with stagnant organic traffic and high reliance on paid Google queries. 

Our SEO and Content teams executed a three-part technical turnaround:
• Technical Clean-Up: Purged 4,000 duplicate page variations and resolved deep indexing loops causing search crawler fatigue.
• Content Reconstruction: Re-authored 120 key informational blogs into multi-stage learning clusters matching primary course curriculums.
• Authoritative Local Outreach: Earned premium editorial mentions from high-authority national educational journals and news syndicates.

Within 12 months, the brand's organic keywords in positions 1-3 scaled from 140 to 4,200+, yielding a 340% increase in free, organic, high-intent student leads.`,
      image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&h=400&q=80",
      readTime: "9 min read",
      author: {
        name: "Sanjay Kumar",
        role: "SEO Director & Founder",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80"
      }
    },
    {
      id: 5,
      category: "Email Marketing",
      date: "June 15, 2026",
      title: "Email Segmentation Sequences That Drive 40%+ Open Rates",
      excerpt: "Blast-all campaigns are destined for the spam folder. Learn our behavior-triggered sequence rules for warming cold B2B prospects.",
      content: `If you are sending the exact same newsletter to your entire customer database, you are actively burning your sender reputation. In 2026, inbox providers deploy stricter machine learning filters to flag unengaging emails.

To bypass the promotion tab and sustain 40%+ open rates:
• Segment by Behavioral Intent: Tag users who interacted with specific pricing pages, case study articles, or video assets separately.
• Dynamic Personalization: Inject personalized firmographic data (e.g., Company Name, City, Industry Niche) into your subject lines dynamically.
• Implement Sunset Policies: Immediately remove or archive subscribers who have not clicked or opened an email in 90 days.

Deliverability is earned through contextual relevance, not email volume. By sending fewer, hyper-targeted emails, you preserve your domain health and build genuine sales leads.`,
      image: "https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&w=600&h=400&q=80",
      readTime: "4 min read",
      author: {
        name: "Pooja Gupta",
        role: "Performance Media Lead",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80"
      }
    },
    {
      id: 6,
      category: "Industry News",
      date: "June 08, 2026",
      title: "The Impact of India's Digital Personal Data Protection Act on Ad Targeting",
      excerpt: "India's landmark DPDP Act reshapes how brands collect leads and deploy retargeting pixels. Here is your essential compliance checklist.",
      content: `The Digital Personal Data Protection (DPDP) Act is fundamentally altering India's digital campaign landscapes. Companies can no longer harvest lead-form data or drop persistent cookies without explicit, clear-language consent from Indian consumers.

What Noida enterprises must do to remain compliant:
• Redesign Lead Form Consents: Add clear, unchecked tick-boxes specifying how data is processed, stored, and utilized.
• Switch to First-Party Data Capture: Build value-driven resources (Calculators, Whitepapers) to capture voluntary, direct customer emails instead of relying on third-party data tracking.
• Audit Tracking Pixels: Implement cookie consent banners with robust opt-out hooks across all marketing sites.

Compliance is not a hurdle—it is a competitive moat. Brands that demonstrate strict privacy respect earn deeper trust, resulting in cleaner, higher-converting lead pools.`,
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&h=400&q=80",
      readTime: "6 min read",
      author: {
        name: "Sanjay Kumar",
        role: "SEO Director & Founder",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80"
      }
    },
    {
      id: 7,
      category: "SEO",
      date: "May 29, 2026",
      title: "Advanced Local SEO Checklist for Multi-Location NCR Brands",
      excerpt: "Struggling to rank across Noida, Delhi, and Gurugram simultaneously? Our regional mapping guide resolves internal content cannibalization.",
      content: `Managing organic search visibility across multiple cities in the National Capital Region (NCR) presents a major challenge: duplicate local content penalty risks. 

Our local search specialists utilize a strict location-silo framework:
• Build Distinct Local Service Pages: Create dedicated pages for each branch location (e.g., /noida, /gurgaon) featuring unique regional addresses, team headshots, and specific client project reviews.
• Inject Geocoded Schema Markup: Provide search engines with exact latitudinal and longitudinal coordinates via JSON-LD schemas.
• Silo Link Equity: Ensure branch-specific landing pages link back to parent service hubs without creating internal loop structures.

By creating hyper-localized landing hubs that speak directly to local regional queries, NCR brands can safely dominate surrounding territories without hurting their overall domain authority.`,
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&h=400&q=80",
      readTime: "7 min read",
      author: {
        name: "Sanjay Kumar",
        role: "SEO Director & Founder",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80"
      }
    },
    {
      id: 8,
      category: "Google Ads",
      date: "May 20, 2026",
      title: "PPC Budget Allocation: Scaling Campaigns from $1K to $50K Monthly",
      excerpt: "Scaling budget without scaling CPA is a fine art. Read our proven budget allocation blueprint for search and performance max campaigns.",
      content: `When scaling up ad spend, many agencies simply increase the daily budget, resulting in immediate efficiency drops and skyrocketing cost-per-lead (CPL).

Our proven scaling protocol focuses on incremental reach:
• Expand keyword pools into high-affinity variations rather than bidding higher on saturated terms.
• Deploy Custom Intent Audience signals within Performance Max campaigns to guide Google's machine learning toward qualified buyers.
• Allocate 15% of budget expansion purely toward remarketing and conversion velocity elements to capture high-intent drop-offs.

Scale with caution and base every budget increase on stable 7-day trailing conversions rather than raw immediate impressions.`,
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&h=400&q=80",
      readTime: "8 min read",
      author: {
        name: "Pooja Gupta",
        role: "Performance Media Lead",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80"
      }
    },
    {
      id: 9,
      category: "Social Media",
      date: "May 12, 2026",
      title: "Building Viral Video Hooks That Sustained 70% Audience Retention",
      excerpt: "In video marketing, the first 3 seconds decide your ROI. Analyze our visual framework for keeping users hooked till the final CTA.",
      content: `The modern human attention span is fleeting. If your video hook starts with a static intro card or generic introduction, 80% of your potential viewers have already swiped away.

We apply a strict visual hook strategy across all short-form videos:
• Dynamic Pattern Interrupt: Start the video mid-action or mid-dialogue with responsive on-screen captions appearing in the first half-second.
• The Curiosity Gap: Present an intriguing problem or reveal a shocking performance statistic immediately without explaining how it was achieved.
• Sound & Motion Alignment: Sync visual transitions with subtle audio cues to re-engage the brain every 2.5 seconds.

Sustained watch-time is the primary signal that tells social media algorithms to push your video to broader organic feeds. Build for visual rhythm, edit ruthlessly, and place your key call to action when viewer engagement peaks.`,
      image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=600&h=400&q=80",
      readTime: "5 min read",
      author: {
        name: "Ravi Verma",
        role: "Creative Director",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80"
      }
    }
  ];

  // Search and filter logic
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory =
      activeCategory === "All" || post.category.toLowerCase() === activeCategory.toLowerCase();
    
    return matchesSearch && matchesCategory;
  });

  // Calculate visible posts for Load More
  const visiblePosts = filteredPosts.slice(0, visibleCount);
  const hasMore = filteredPosts.length > visibleCount;

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 3, filteredPosts.length));
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setIsSubscribed(true);
      setNewsletterEmail("");
      setTimeout(() => {
        setIsSubscribed(false);
      }, 5000);
    }
  };

  return (
    <div id="blog-page-container" className="bg-white text-[#333333] selection:bg-[#FE7146] selection:text-white">

      {/* 1. Hero Section (extends behind the fixed navbar — no white gap) */}
      <section id="blog-hero-section" className="bg-[#303360] text-white pt-28 pb-16 sm:pt-32 sm:pb-20 relative overflow-hidden">
        
        {/* Subtle background glow & dot grid */}
        <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
          <div className="absolute top-1/2 right-10 -translate-y-1/2 w-96 h-96 bg-[#FE7146] rounded-full filter blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          
          <span className="text-xs sm:text-sm font-black text-[#FE7146] tracking-widest uppercase block">
            OUR BLOG &amp; INSIGHTS
          </span>

          <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight max-w-4xl mx-auto">
            Ideas, Insights &amp; Strategies for <span className="text-[#FE7146]">Growth</span>
          </h1>

          <p className="text-gray-300 text-sm sm:text-base font-normal max-w-2xl mx-auto leading-relaxed">
            Data-backed performance guides, organic SEO audits, and direct PPC blueprints shared by our Noida campaigns squad.
          </p>

          {/* Prominent Search Bar */}
          <div className="max-w-xl mx-auto pt-4 relative z-20">
            <div className="relative bg-white rounded-2xl shadow-xl p-1 border border-white/10 flex items-center">
              <div className="pl-4 text-slate-400 shrink-0">
                <Search size={20} />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setVisibleCount(6); // Reset visible count on search
                }}
                placeholder="Search articles by topic, keyword, or author..."
                className="w-full bg-transparent text-[#303360] font-medium text-xs sm:text-sm py-3.5 px-3 focus:outline-none placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="p-2 text-slate-400 hover:text-slate-600 rounded-lg mr-2 hover:bg-slate-50 transition-colors"
                >
                  <X size={16} />
                </button>
              )}
            </div>
            
            {/* Search results summary bar if active */}
            {searchQuery && (
              <div className="mt-3 text-left text-xs text-gray-300 px-1 font-semibold flex items-center gap-1.5">
                <Sparkles size={12} className="text-[#FE7146]" />
                Found {filteredPosts.length} articles matching &quot;{searchQuery}&quot;
              </div>
            )}
          </div>

        </div>
      </section>

      {/* 2. Featured Article Spotlight (Pins when category is 'All' and search query is empty) */}
      <AnimatePresence>
        {activeCategory === "All" && !searchQuery && (
          <motion.section 
            id="featured-spotlight-section"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="py-12 sm:py-16 bg-slate-50/50 border-b border-gray-100"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FE7146] animate-ping" />
                <span className="text-xs font-black tracking-widest text-[#303360] uppercase">
                  Editor&apos;s Pick
                </span>
              </div>

              {/* Large spotlight card (Stacks on mobile, 2 columns on desktop) */}
              <div 
                onClick={() => setSelectedPost(featuredArticle)}
                className="group bg-white rounded-3xl border border-gray-100 hover:border-[#FE7146]/20 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0 cursor-pointer text-left"
              >
                {/* Big Image half */}
                <div className="relative overflow-hidden aspect-video lg:aspect-auto lg:min-h-[440px] lg:col-span-7 bg-slate-100">
                  <img
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-6 left-6 z-10">
                    <span className="bg-[#FFF1EC] text-[#FE7146] px-4 py-1.5 rounded-full text-xs font-black shadow-md uppercase tracking-wider">
                      {featuredArticle.category}
                    </span>
                  </div>
                </div>

                {/* Content half */}
                <div className="p-6 sm:p-8 lg:p-12 lg:col-span-5 flex flex-col justify-between space-y-6">
                  
                  <div className="space-y-4">
                    
                    {/* Meta row */}
                    <div className="flex items-center gap-4 text-xs font-semibold text-slate-500">
                      <span className="flex items-center gap-1">
                        <Calendar size={13} className="text-[#FE7146]" />
                        {featuredArticle.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={13} className="text-[#FE7146]" />
                        {featuredArticle.readTime}
                      </span>
                    </div>

                    {/* Headline */}
                    <h2 className="font-display font-black text-2xl sm:text-3xl text-[#303360] leading-tight group-hover:text-[#FE7146] transition-colors">
                      {featuredArticle.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                      {featuredArticle.excerpt}
                    </p>

                  </div>

                  {/* Author metadata & link */}
                  <div className="pt-6 border-t border-gray-100 flex items-center justify-between gap-4">
                    
                    <div className="flex items-center gap-3">
                      <img
                        src={featuredArticle.author.avatar}
                        alt={featuredArticle.author.name}
                        className="w-10 h-10 rounded-full border border-gray-100 object-cover shrink-0"
                      />
                      <div>
                        <h4 className="text-xs sm:text-sm font-black text-[#303360] leading-snug">
                          {featuredArticle.author.name}
                        </h4>
                        <p className="text-gray-500 text-[10px] sm:text-xs font-medium">
                          {featuredArticle.author.role}
                        </p>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1.5 text-xs font-black text-[#FE7146] hover:gap-2.5 transition-all">
                      <span>Read Article</span>
                      <ArrowRight size={14} />
                    </span>

                  </div>

                </div>
              </div>

            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* 3. Category Filter Bar */}
      <section id="category-filter-section" className="bg-white border-b border-gray-100 py-6 sticky top-20 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex items-center justify-between gap-4">
            
            {/* Scrollable category container with hidden scrollbar */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth pb-1 -mb-1 w-full">
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setActiveCategory(cat);
                      setVisibleCount(6); // Reset visible count
                    }}
                    className={`px-5 py-2.5 rounded-full text-xs font-black transition-all border whitespace-nowrap cursor-pointer shrink-0 ${
                      isActive
                        ? "bg-[#FE7146] text-white border-[#FE7146] shadow-md shadow-[#FE7146]/20"
                        : "bg-[#F5F5FA] text-[#303360]/80 border-gray-100 hover:border-gray-200 hover:bg-[#F5F5FA]/80 hover:text-[#303360]"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

          </div>

        </div>
      </section>

      {/* 4. Article Grid Section */}
      <section id="article-grid-section" className="py-16 sm:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {filteredPosts.length > 0 ? (
            <div className="space-y-16">
              
              {/* Responsive columns grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {visiblePosts.map((post) => (
                  <div
                    key={post.id}
                    id={`blog-card-${post.id}`}
                    onClick={() => setSelectedPost(post)}
                    className="group bg-white rounded-3xl border border-gray-100 hover:border-[#FE7146]/20 hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between text-left cursor-pointer h-full"
                  >
                    <div>
                      {/* Standard Image with top-left badge */}
                      <div className="relative overflow-hidden aspect-video bg-slate-50 shrink-0">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-4 left-4 z-10">
                          <span className="bg-[#FFF1EC] text-[#FE7146] px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm">
                            {post.category}
                          </span>
                        </div>
                      </div>

                      {/* Content (Clamp title & excerpt to maintain perfect layout harmony) */}
                      <div className="p-6 space-y-4">
                        
                        {/* Meta */}
                        <div className="flex items-center gap-4 text-xs font-semibold text-slate-500">
                          <span className="flex items-center gap-1">
                            <Calendar size={13} className="text-slate-400" />
                            {post.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={13} className="text-slate-400" />
                            {post.readTime}
                          </span>
                        </div>

                        {/* Clamped title (exactly 2 lines) */}
                        <h3 className="font-display font-black text-[#303360] text-base sm:text-lg leading-snug group-hover:text-[#FE7146] transition-colors line-clamp-2 h-[3.25rem]">
                          {post.title}
                        </h3>

                        {/* Clamped excerpt (exactly 2 lines) */}
                        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-2 h-[2.5rem]">
                          {post.excerpt}
                        </p>

                      </div>
                    </div>

                    {/* Author profile & bottom button link */}
                    <div className="p-6 pt-0 border-t border-gray-50 flex items-center justify-between gap-4 shrink-0">
                      
                      <div className="flex items-center gap-2.5">
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="w-8 h-8 rounded-full border border-gray-100 object-cover shrink-0"
                        />
                        <div>
                          <h4 className="text-[11px] sm:text-xs font-black text-[#303360] leading-tight">
                            {post.author.name}
                          </h4>
                          <p className="text-gray-400 text-[9px] font-semibold">
                            {post.author.role}
                          </p>
                        </div>
                      </div>

                      <span className="inline-flex items-center gap-1 text-xs font-black text-[#FE7146] group-hover:translate-x-0.5 transition-transform shrink-0">
                        <span>Read</span>
                        <ChevronRight size={14} />
                      </span>

                    </div>

                  </div>
                ))}
              </div>

              {/* Load More Pagination Container */}
              {hasMore && (
                <div className="pt-6 text-center space-y-4">
                  
                  {/* Item counter */}
                  <div className="text-xs font-semibold text-slate-500">
                    Showing <span className="text-[#303360] font-bold">{visiblePosts.length}</span> of <span className="text-[#303360] font-bold">{filteredPosts.length}</span> growth articles
                  </div>

                  <button
                    onClick={handleLoadMore}
                    className="bg-[#303360] hover:bg-[#FE7146] text-white font-extrabold text-xs px-8 py-4 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer inline-flex items-center gap-2"
                  >
                    <span>Load More Insights</span>
                    <ArrowRight size={14} className="text-white" />
                  </button>

                </div>
              )}

            </div>
          ) : (
            <div className="text-center py-20 px-4 bg-[#F5F5FA]/50 rounded-3xl border border-dashed border-gray-200 max-w-xl mx-auto">
              <div className="w-12 h-12 rounded-full bg-[#FFF1EC] text-[#FE7146] flex items-center justify-center mx-auto mb-4">
                <BookOpen size={24} />
              </div>
              <h3 className="font-display font-black text-lg text-[#303360] mb-1">
                No articles match your criteria
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                We couldn&apos;t find any growth strategies matching &quot;{searchQuery}&quot; in the &quot;{activeCategory}&quot; archive. Try adjusting your search query or reset filter.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All");
                }}
                className="mt-6 text-xs font-black text-[#FE7146] hover:underline"
              >
                Reset Filter &amp; Search
              </button>
            </div>
          )}

        </div>
      </section>

      {/* 5. Newsletter Signup Band */}
      <section id="blog-newsletter-section" className="py-16 bg-[#F5F5FA] border-t border-b border-gray-100 relative overflow-hidden">
        
        {/* Subtle decorative grid */}
        <div className="absolute inset-0 z-0 opacity-5 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(#303360_1px,transparent_1px)] [background-size:16px_16px]" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          
          <div className="inline-flex items-center gap-1.5 bg-white border border-gray-100 text-[#303360] text-[10px] font-black px-3 py-1 rounded-full shadow-xs">
            <Sparkles size={12} className="text-[#FE7146]" />
            <span>BI-WEEKLY MARKETING DIGEST</span>
          </div>

          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#303360] tracking-tight leading-tight">
            Get Performance Insights in Your Inbox
          </h2>

          <p className="text-gray-500 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            No fluff, no sales pitch. Just deep technical audits, search algorithmic updates, and actual paid campaign performance learnings.
          </p>

          {/* Form */}
          <div className="max-w-md mx-auto pt-2">
            {isSubscribed ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-emerald-800 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 animate-fade-in">
                <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                  <Check size={12} />
                </div>
                <span>Excellent! You have successfully subscribed to our Noida marketing squad.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2.5">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your corporate email..."
                  className="w-full bg-white border border-gray-200 rounded-xl py-3.5 px-4 text-xs sm:text-sm font-medium text-[#303360] focus:outline-none focus:border-[#FE7146] transition-colors shadow-sm"
                />
                <button
                  type="submit"
                  className="bg-[#FE7146] hover:bg-[#e0562b] text-white font-extrabold text-xs px-6 py-4 rounded-xl transition-all shadow-md hover:shadow-lg shrink-0 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Subscribe</span>
                  <Send size={12} />
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* 6. Custom Read Modal Overlay (Fidelity Read Experience) */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]"
            >
              
              {/* Header Image Banner */}
              <div className="relative h-48 sm:h-72 bg-slate-100 flex-shrink-0">
                <img
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                
                {/* Dismiss button */}
                <button
                  onClick={() => setSelectedPost(null)}
                  className="absolute top-4 right-4 bg-[#303360]/80 hover:bg-[#303360] text-white p-2.5 rounded-full transition-colors cursor-pointer shadow-md"
                >
                  <X size={18} />
                </button>

                <div className="absolute bottom-4 left-6">
                  <span className="bg-[#FE7146] text-white px-3.5 py-1.5 rounded-full text-xs font-black shadow-md uppercase tracking-wider">
                    {selectedPost.category}
                  </span>
                </div>
              </div>

              {/* Scrolling Article Body */}
              <div className="p-6 sm:p-8 md:p-10 overflow-y-auto text-left space-y-6 no-scrollbar">
                
                {/* Meta details */}
                <div className="flex flex-wrap items-center gap-6 text-xs text-slate-500 font-bold border-b border-gray-100 pb-5">
                  <div className="flex items-center gap-2">
                    <img
                      src={selectedPost.author.avatar}
                      alt={selectedPost.author.name}
                      className="w-8 h-8 rounded-full object-cover border border-gray-100 shrink-0"
                    />
                    <div>
                      <h4 className="font-black text-[#303360] leading-none">
                        {selectedPost.author.name}
                      </h4>
                      <p className="text-gray-400 text-[10px] font-semibold mt-0.5">
                        {selectedPost.author.role}
                      </p>
                    </div>
                  </div>
                  <div className="h-4 w-px bg-gray-200 hidden sm:block" />
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-slate-400" />
                    {selectedPost.date}
                  </span>
                  <div className="h-4 w-px bg-gray-200 hidden sm:block" />
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} className="text-slate-400" />
                    {selectedPost.readTime}
                  </span>
                </div>

                {/* Main Headline */}
                <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#303360] leading-tight tracking-tight">
                  {selectedPost.title}
                </h2>

                {/* Excerpt panel */}
                <div className="border-l-4 border-[#FE7146] bg-slate-50 p-4 rounded-r-xl">
                  <p className="text-slate-600 text-xs sm:text-sm font-medium italic leading-relaxed">
                    &quot;{selectedPost.excerpt}&quot;
                  </p>
                </div>

                {/* Split text contents */}
                <div className="space-y-5 text-gray-700 text-xs sm:text-sm md:text-base font-normal leading-relaxed text-left whitespace-pre-wrap">
                  {selectedPost.content.split("\n\n").map((para: string, idx: number) => {
                    if (para.startsWith("• ") || para.startsWith("1. ") || para.startsWith("2. ") || para.startsWith("3. ")) {
                      return (
                        <div key={idx} className="pl-2 font-medium text-slate-800">
                          {para}
                        </div>
                      );
                    }
                    return <p key={idx}>{para}</p>;
                  })}
                </div>

              </div>

              {/* Modal Footer Controls */}
              <div className="p-4 sm:p-6 bg-slate-50 border-t border-gray-100 flex-shrink-0 flex flex-row justify-between items-center gap-4">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest hidden sm:block">
                  Analytics Clouds Noida
                </span>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="w-full sm:w-auto bg-[#303360] hover:bg-[#FE7146] text-white font-extrabold text-xs px-6 py-3 rounded-xl transition-colors cursor-pointer text-center"
                >
                  Close Article
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 7. Shared CTA Banner component */}
      <CtaBanner  />

    </div>
  );
}
