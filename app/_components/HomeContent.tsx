/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

"use client";

import { useState, useEffect, useRef } from "react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from "motion/react";
import {
  Search,
  Target,
  Share2,
  Code2,
  Tv,
  TrendingUp,
  ArrowRight,
  Database,
  Award,
  CheckCircle,
  Users,
  ChevronRight,
  Sparkles,
  Zap,
  BarChart2,
  Star,
  Quote
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
          // Wait for custom delay before triggering
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
      
      // Easing: easeOutQuad
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
    <div ref={ref} className="inline-block">
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </div>
  );
}

// Counter that triggers on load with a delay
function DelayedCounter({
  endValue,
  suffix = "",
  prefix = "",
  delay = 500,
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

interface HomeProps {}
export function Home(props: HomeProps) {
  const navigate = useRouter();
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  // Testimonial slider: 3 cards per view on desktop (lg+), 1 on mobile
  const [testimonialItemsPerView, setTestimonialItemsPerView] = useState(1);
  const [activeTestimonialSlide, setActiveTestimonialSlide] = useState(0);
  const [isTestimonialPaused, setIsTestimonialPaused] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    const updateItemsPerView = () => setTestimonialItemsPerView(mql.matches ? 3 : 1);
    updateItemsPerView();
    mql.addEventListener("change", updateItemsPerView);
    return () => mql.removeEventListener("change", updateItemsPerView);
  }, []);

  // 8 services with descriptive icons, details, metrics, and matching routes
  const services = [
    {
      title: "Search Engine Optimization (SEO)",
      icon: <Search className="w-5 h-5 text-[#FE7146]" />,
      bg: "bg-[#FFF1EC]",
      desc: "Rank higher on Google and secure high-value organic traffic that actively converts.",
      metric: "+230% Organic Traffic",
      path: "/services/seo"
    },
    {
      title: "Performance Marketing (Google Ads)",
      icon: <Target className="w-5 h-5 text-indigo-600" />,
      bg: "bg-indigo-50",
      desc: "Drive targeted high-intent leads with search, shopping, and optimized campaigns.",
      metric: "4.8x Average ROAS",
      path: "/services/google-ads"
    },
    {
      title: "Social Media Marketing",
      icon: <Share2 className="w-5 h-5 text-sky-500" />,
      bg: "bg-sky-50",
      desc: "Build community and scale social sales across Instagram, Facebook, and LinkedIn.",
      metric: "+180% Engagement",
      path: "/services/performance-marketing" // links to related performance marketing
    },
    {
      title: "Web Design & Development",
      icon: <Code2 className="w-5 h-5 text-emerald-600" />,
      bg: "bg-emerald-50",
      desc: "Speed-optimized, conversion-focused websites engineered for seamless UX.",
      metric: "98+ PageSpeed Score",
      path: "/services/web-design-development"
    },
    {
      title: "Display & Native Ads",
      icon: <Tv className="w-5 h-5 text-amber-600" />,
      bg: "bg-amber-50",
      desc: "Build highly contextual visual awareness across top online publications.",
      metric: "0.8% Average CTR",
      path: "/services/display-native-ads"
    },
    {
      title: "Performance Marketing (Full-Suite)",
      icon: <TrendingUp className="w-5 h-5 text-rose-600" />,
      bg: "bg-rose-50",
      desc: "Holistic marketing strategy integrating multi-channel attribution and scaling.",
      metric: "40% Lower CPA",
      path: "/services/performance-marketing"
    }
  ];

  // Why Choose Us differentiators
  const differentiators = [
    {
      icon: <Database className="w-5 h-5 text-[#FE7146]" />,
      title: "Data-Driven Strategy",
      desc: "We analyze cold, hard market data instead of relying on emotional guesses to align your marketing budget."
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-[#FE7146]" />,
      title: "ROI-Focused Approach",
      desc: "Every creative asset and media buy is aggressively optimized to maximize customer acquisition value."
    },
    {
      icon: <Award className="w-5 h-5 text-[#FE7146]" />,
      title: "Experienced, Certified Team",
      desc: "Experienced professionals in campaign management, data analysis, and design."
    },
    {
      icon: <CheckCircle className="w-5 h-5 text-[#FE7146]" />,
      title: "Transparent Reporting",
      desc: "Live performance dashboards and weekly review calls keep you updated on actual conversion stats."
    }
  ];

  // Why Choose Us stats
  const stats = [
    { value: 200, suffix: "+", label: "Happy Clients", desc: "Across India" },
    { value: 500, suffix: "+", label: "Campaigns Delivered", desc: "High-yield funnels" },
    { value: 98, suffix: "%", label: "Client Retention Rate", desc: "Long-term partnerships" },
    { value: 7, suffix: "+", label: "Years of Experience", desc: "Proven track record" }
  ];

  // Photography-forward Case Studies
  const caseStudies = [
    {
      category: "SEO",
      categoryBg: "bg-indigo-50 text-indigo-700",
      title: "How We Increased Organic Traffic by 230% for a Healthcare Brand",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
      headlineResult: "+230% Organic Traffic",
      metrics: ["2.1k Keywords Ranked", "45% Lower CPA"],
      path: "/services/seo"
    },
    {
      category: "Google Ads",
      categoryBg: "bg-orange-50 text-[#FE7146]",
      title: "Generated 4X More Lead Conversions for an EduTech Platform",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
      headlineResult: "4X Leads Delivered",
      metrics: ["42% CTR Lift", "3.2x Campaign ROI"],
      path: "/services/google-ads"
    },
    {
      category: "Social Media",
      categoryBg: "bg-pink-50 text-pink-700",
      title: "Boosted Social Engagement by 180% for an E-commerce Brand",
      image: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=800&q=80",
      headlineResult: "+180% Engagement",
      metrics: ["2.5x Revenue Growth", "30k+ New Followers"],
      path: "/services/performance-marketing"
    }
  ];

  // Testimonials with outcome-specific quotes
  const testimonials = [
    {
      quote: "Analytics Clouds has been a reliable affiliate partner for Just Herbs, consistently delivering quality traffic and measurable business results. Working with Sanjeev has been effortless—he understands our objectives, communicates proactively, and ensures campaigns run smoothly. Their team's commitment and responsiveness have made them a trusted extension of our marketing efforts. We look forward to growing this partnership in the years ahead.",
      author: "Chandan Choudhary",
      role: "Marketing Head",
      company: "Just Herbs",
      avatar: "https://res.cloudinary.com/couponsbit/image/upload/v1785825776/justherbs-logosss_svypvv.jpg"
    },
    {
      quote: "Working with Analytics Clouds has been a rewarding experience. Their team understands performance marketing, responds quickly, and always focuses on delivering value. Sanjeev has been particularly supportive, making collaboration seamless from planning to execution. We're proud to be associated with Analytics Clouds and wish the entire team continued success in the years to come.",
      author: "Manish Raj",
      role: "Business Development Manager",
      company: "CosIQ",
      avatar: "https://res.cloudinary.com/couponsbit/image/upload/v1785825776/CosIQ-iogo_afgmyd.jpg"
    },
    {
      quote: "Deepika has been an absolute pleasure to work with. Her responsiveness, professionalism, and understanding of our business requirements have made campaign execution smooth and hassle-free. She's always available to help and goes the extra mile whenever needed. We truly appreciate the support from the Analytics Clouds team.",
      author: "Madhav",
      role: "CEO",
      company: "The Man Company",
      avatar: "https://res.cloudinary.com/couponsbit/image/upload/v1785825777/The-Man-company-logo_fmnvk8.jpg"
    },
    {
      quote: "Our partnership with Analytics Clouds has grown stronger over time. From onboarding to campaign execution, the team has been supportive, organized, and easy to work with. They handled every challenge professionally and ensured everything stayed on track. Wishing the entire team continued success and many more achievements ahead.",
      author: "Sahil Chawla",
      role: "Business Development Manager",
      company: "GNC",
      avatar: "https://res.cloudinary.com/couponsbit/image/upload/v1785825777/GNC-logo-2048x2048_vbno1u.jpg"
    },
    {
      quote: "Analytics Clouds has been a dependable performance marketing partner for our campaigns. Their strategic approach, transparent communication, and commitment to quality have helped us achieve better outcomes. It's been great working together, and we look forward to building an even stronger partnership in the future.",
      author: "Aman",
      role: "CEO",
      company: "Kent RO",
      avatar: "https://res.cloudinary.com/couponsbit/image/upload/v1785825777/Kent-RO-logo_omcksw.jpg"
    },
    {
      quote: "We've had a fantastic experience working with Analytics Clouds over the last few years. Sanjeev and the team understand business requirements well and consistently deliver value through strong execution and communication. It's a partnership built on trust, and we look forward to many more successful years together.",
      author: "Mandar",
      role: "Marketing Head",
      company: "TaxBuddy",
      avatar: "https://res.cloudinary.com/couponsbit/image/upload/v1785825777/Tax-buddy-logo_ytvmsa.jpg"
    },
    {
      quote: "Working with Analytics Clouds has been a seamless experience. Their proactive communication, quick turnaround times, and deep understanding of affiliate marketing have helped us optimize campaigns more effectively. The team's dedication and willingness to support us at every stage make them a valuable long-term partner.",
      author: "Team Foxtale",
      role: "Marketing Team",
      company: "Foxtale",
      avatar: "https://res.cloudinary.com/couponsbit/image/upload/v1785825777/foxtale-logosss_mbmp5k.jpg"
    },
    {
      quote: "Analytics Clouds brings the perfect balance of strategy, execution, and performance. Their team understands affiliate marketing inside out and consistently focuses on delivering measurable ROI. They are proactive, data-driven, and committed to partner success. We highly recommend them to brands looking for a reliable affiliate marketing partner.",
      author: "Yash",
      role: "CEO",
      company: "Nua Woman",
      avatar: "https://res.cloudinary.com/couponsbit/image/upload/v1785825778/nua-logo111_diuioy.jpg"
    },
    {
      quote: "Analytics Clouds has been much more than an affiliate partner—they've become a growth partner for our brand. Their proactive approach, quality publisher network, and commitment to performance have helped us reach the right audience and achieve consistent results. It's been a pleasure working with the team.",
      author: "Rahul Maheshwari",
      role: "Marketing Head",
      company: "Salty",
      avatar: "https://res.cloudinary.com/couponsbit/image/upload/v1785825778/salty-logos_xe761h.jpg"
    },
    {
      quote: "Analytics Clouds played an important role in the success of our Jockey affiliate campaigns. Their expertise in affiliate marketing, combined with clear communication and timely execution, helped us generate quality traffic and better conversions. We appreciate their professionalism and look forward to continuing our partnership.",
      author: "Philona Choudhary",
      role: "Marketing Head",
      company: "First Economy",
      avatar: "https://res.cloudinary.com/couponsbit/image/upload/v1785825778/Jockey-logo_z9ua5p.jpg"
    },
    {
      quote: "Working with Analytics Clouds has been a wonderful experience. Their team is committed, responsive, and always focused on delivering results. We truly appreciate their support, professionalism, and dedication throughout our collaboration. Looking forward to many more successful campaigns together.",
      author: "Team Ministry of Nuts",
      role: "Marketing Team",
      company: "Ministry of Nuts",
      avatar: "https://res.cloudinary.com/couponsbit/image/upload/v1785825778/mon-logo_kqaujz.jpg"
    },
    {
      quote: "Analytics Clouds has consistently provided excellent support and reliable affiliate marketing services. Their team understands our goals, communicates effectively, and delivers quality results. We appreciate their dedication and are excited to continue this successful partnership.",
      author: "Team Scentials World",
      role: "Marketing Team",
      company: "Scentials World",
      avatar: "https://res.cloudinary.com/couponsbit/image/upload/v1785825776/ScentialsWorld-logo_xn12rm.jpg"
    },
    {
      quote: "Analytics Clouds has been a valuable affiliate partner for Superkicks. Their efforts in driving quality traffic, creating engaging campaigns, and maintaining transparent communication have contributed positively to our growth. We appreciate their dedication and look forward to achieving even greater success together.",
      author: "Ranveer",
      role: "Marketing Team",
      company: "Superkicks",
      avatar: "https://res.cloudinary.com/couponsbit/image/upload/v1785825776/Superkick-logo_fjuhi5.jpg"
    },
    {
      quote: "Our experience with Analytics Clouds has been outstanding. Deepika Arora and the team have always been proactive, responsive, and committed to helping us scale affiliate revenue. Their strategic inputs and consistent support have made them a trusted marketing partner for Dot & Key.",
      author: "Jigar",
      role: "Marketing Team",
      company: "Dot & Key",
      avatar: "https://res.cloudinary.com/couponsbit/image/upload/v1785825776/dot-and-key-logo_rp1m0k.webp"
    },
    {
      quote: "Analytics Clouds has consistently delivered impressive campaign performance and quality results. The team is responsive, dependable, and always willing to support whenever required. We appreciate their dedication and look forward to strengthening this partnership in the future.",
      author: "Vinayak Kumar",
      role: "Content & Marketing Manager",
      company: "CarDekho",
      avatar: "https://res.cloudinary.com/couponsbit/image/upload/v1785825777/cardekho-logo-150x150-1_bofe7e.png"
    },
    {
      quote: "It has been a great experience working with Analytics Clouds. Deepika Arora has always been proactive, resourceful, and highly responsive. Campaign coordination is smooth, offers are shared on time, and communication is always clear. Their professionalism and planning have made them a trusted affiliate partner for SuperBottoms.",
      author: "Shweta Potdar",
      role: "Community Growth Manager",
      company: "SuperBottoms",
      avatar: "https://res.cloudinary.com/couponsbit/image/upload/v1785825777/617146f5a57b136f44d79006_1634813685394_y3xf0s.webp"
    },
    {
      quote: "Analytics Clouds has consistently helped us grow our affiliate marketing channel with quality traffic and strong performance. Their team is knowledgeable, responsive, and focused on delivering results. We value their attention to detail and highly recommend them to brands looking for a dependable affiliate marketing partner.",
      author: "Nikhilesh",
      role: "Sr. Executive – Digital Marketing",
      company: "XYXX Crew",
      avatar: "https://res.cloudinary.com/couponsbit/image/upload/v1785825777/logo_3_dyjasv.jpg"
    },
    {
      quote: "Analytics Clouds combines strong industry expertise with a performance-driven approach that delivers real business value. Their dedicated support, quality publisher network, and commitment to achieving results make them an excellent affiliate marketing partner. We highly recommend working with their team.",
      author: "Akshit Bansal",
      role: "Partnership Marketing Specialist",
      company: "Boult",
      avatar: "https://res.cloudinary.com/couponsbit/image/upload/v1785825777/0bcb06e1-b1e5-49f7-8370-e99f6e4e5fbc_swpfjz.png"
    },
    {
      quote: "Collaborating with Analytics Clouds has been a smooth and productive experience. Their team consistently delivers reports and campaign updates on time while remaining responsive, even during critical periods. Their professionalism, dedication, and reliability have made them an important partner in achieving our marketing goals.",
      author: "Amitha",
      role: "Senior Digital Marketing Executive",
      company: "Cultsport",
      avatar: "https://res.cloudinary.com/couponsbit/image/upload/v1785825776/cultsport_jrdv73.png"
    }
  ];

  // Group testimonials into pages of `testimonialItemsPerView` cards each
  const testimonialSlides: (typeof testimonials)[] = [];
  for (let i = 0; i < testimonials.length; i += testimonialItemsPerView) {
    testimonialSlides.push(testimonials.slice(i, i + testimonialItemsPerView));
  }
  const totalTestimonialSlides = testimonialSlides.length;

  useEffect(() => {
    setActiveTestimonialSlide((prev) => (prev >= totalTestimonialSlides ? 0 : prev));
  }, [totalTestimonialSlides]);

  useEffect(() => {
    if (isTestimonialPaused || totalTestimonialSlides <= 1) return;
    const timer = setInterval(() => {
      setActiveTestimonialSlide((prev) => (prev + 1) % totalTestimonialSlides);
    }, 5000);
    return () => clearInterval(timer);
  }, [isTestimonialPaused, totalTestimonialSlides]);

  const goToTestimonialSlide = (index: number) => {
    setActiveTestimonialSlide(((index % totalTestimonialSlides) + totalTestimonialSlides) % totalTestimonialSlides);
  };

  // Blog Insights
  const blogPosts = [
    {
      category: "SEO",
      date: "July 10, 2026",
      title: "10 Proven SEO Strategies to Rank Higher on Google in 2026",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&h=400&q=80"
    },
    {
      category: "Google Ads",
      date: "July 8, 2026",
      title: "Google Ads vs Facebook Ads: Which is Better for Your Business?",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&h=400&q=80"
    },
    {
      category: "Content Marketing",
      date: "July 5, 2026",
      title: "How to Create SEO-Friendly Content That Ranks & Converts",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&h=400&q=80"
    }
  ];

  // Partner logos
  const partnerLogos = [
    { name: "Partner Brand", src: "https://res.cloudinary.com/couponsbit/image/upload/v1785827894/89-300x75_kif3nk.webp" },
    { name: "Partner Brand", src: "https://res.cloudinary.com/couponsbit/image/upload/v1785827894/115-300x75_kj3brk.png" },
    { name: "Partner Brand", src: "https://res.cloudinary.com/couponsbit/image/upload/v1785827893/145-300x75_ygdhvv.png" },
    { name: "Partner Brand", src: "https://res.cloudinary.com/couponsbit/image/upload/v1785827893/134-300x75_n19bsk.png" },
    { name: "Partner Brand", src: "https://res.cloudinary.com/couponsbit/image/upload/v1785827893/97-300x75_qbmx7i.png" },
    { name: "FirstCry", src: "https://res.cloudinary.com/couponsbit/image/upload/v1785827892/First-Cry-logo-300x75_rqbalo.jpg" },
    { name: "Partner Brand", src: "https://res.cloudinary.com/couponsbit/image/upload/v1785827892/122-300x75_altlif.png" },
    { name: "Pilolo", src: "https://res.cloudinary.com/couponsbit/image/upload/v1785827457/pilolo-Logo_yojbcw.jpg" },
    { name: "GoEye", src: "https://res.cloudinary.com/couponsbit/image/upload/v1785827457/goeye-Logo_ftqqzo.jpg" },
    { name: "Ustraa", src: "https://res.cloudinary.com/couponsbit/image/upload/v1785827457/Ustraa-Logo_wtilya.jpg" },
    { name: "Blur", src: "https://res.cloudinary.com/couponsbit/image/upload/v1785827457/blur-logo_u9yweb.jpg" },
    { name: "CosIQ", src: "https://res.cloudinary.com/couponsbit/image/upload/v1785827456/Cosiq-Logo_in0cc3.jpg" },
    { name: "Serverbyt", src: "https://res.cloudinary.com/couponsbit/image/upload/v1785827457/Serverbyt-logo_g1etba.jpg" },
    { name: "Sudhati", src: "https://res.cloudinary.com/couponsbit/image/upload/v1785827456/Sudhati-Logo_isgosr.jpg" },
    { name: "Timex", src: "https://res.cloudinary.com/couponsbit/image/upload/v1785827456/Timex-logo_o6td8k.jpg" },
    { name: "Bonkers Corner", src: "https://res.cloudinary.com/couponsbit/image/upload/v1785827456/Bonker-Corner-Logo_aqtrpx.jpg" },
    { name: "boAt", src: "https://res.cloudinary.com/couponsbit/image/upload/v1785827456/Boat-logo_wchkyd.jpg" },
    { name: "All Man", src: "https://res.cloudinary.com/couponsbit/image/upload/v1785827456/All-Man-Logo_ja6zlf.jpg" },
    { name: "Palmonas", src: "https://res.cloudinary.com/couponsbit/image/upload/v1785827456/Palmonas-logo_zeblny.jpg" },
    { name: "Partner Brand", src: "https://res.cloudinary.com/couponsbit/image/upload/v1785915814/Salty-logo-300x75_ytewma_5_sn5osd.webp" },
    { name: "Partner Brand", src: "https://res.cloudinary.com/couponsbit/image/upload/v1785915813/Salty-logo-300x75_ytewma_4_zkkcc3.webp" },
    { name: "Partner Brand", src: "https://res.cloudinary.com/couponsbit/image/upload/v1785915812/Salty-logo-300x75_ytewma_cneuxf.webp" },
    { name: "Partner Brand", src: "https://res.cloudinary.com/couponsbit/image/upload/v1785915813/Salty-logo-300x75_ytewma_2_tvlhsc.webp" },
    { name: "Partner Brand", src: "https://res.cloudinary.com/couponsbit/image/upload/v1785915813/Salty-logo-300x75_ytewma_3_wggvpn.webp" },
    { name: "Partner Brand", src: "https://res.cloudinary.com/couponsbit/image/upload/v1785915813/Salty-logo-300x75_ytewma_1_aqw2g5.webp" },
    { name: "HelloIce", src: "https://res.cloudinary.com/couponsbit/image/upload/v1785915812/helloice-logo_v66tox.png" },
    { name: "Partner Brand", src: "https://res.cloudinary.com/couponsbit/image/upload/v1785916113/Salty-logo-300x75_ytewma_10_zbt5pi.webp" },
    { name: "Partner Brand", src: "https://res.cloudinary.com/couponsbit/image/upload/v1785916113/Salty-logo-300x75_ytewma_9_ahfian.webp" },
    { name: "Partner Brand", src: "https://res.cloudinary.com/couponsbit/image/upload/v1785916113/Salty-logo-300x75_ytewma_8_wt6nah.webp" },
    { name: "Partner Brand", src: "https://res.cloudinary.com/couponsbit/image/upload/v1785916113/Salty-logo-300x75_ytewma_7_q89o23.webp" },
    { name: "Partner Brand", src: "https://res.cloudinary.com/couponsbit/image/upload/v1785916112/Salty-logo-300x75_ytewma_11_zih8s9.webp" },
    { name: "Shein UK", src: "https://res.cloudinary.com/couponsbit/image/upload/v1785828109/shein-UK-logo-300x75_i2kb5u.png" },
    { name: "Morrison", src: "https://res.cloudinary.com/couponsbit/image/upload/v1785828108/morrisson-logo-300x75_s2hpou.png" },
    { name: "Malaysia Airlines", src: "https://res.cloudinary.com/couponsbit/image/upload/v1785828108/Malaysia-Airlines-Logo-300x75_j2cl06.png" },
    { name: "Klook", src: "https://res.cloudinary.com/couponsbit/image/upload/v1785828108/Klook-logo-300x75_iofetv.png" },
    { name: "ITA Airways", src: "https://res.cloudinary.com/couponsbit/image/upload/v1785828108/ITA-Airways-Logo-300x75_mgdjgl.png" },
    { name: "Etihad", src: "https://res.cloudinary.com/couponsbit/image/upload/v1785828106/Etihad-logo-300x75_rjaepq.png" },
    { name: "G2A", src: "https://res.cloudinary.com/couponsbit/image/upload/v1785828106/G2A-Logo-300x75_cczjrq.png" },
    { name: "TourRadar", src: "https://res.cloudinary.com/couponsbit/image/upload/v1785828106/Tour-Raddar-logo-300x75_etbo2v.png" },
    { name: "Tesco", src: "https://res.cloudinary.com/couponsbit/image/upload/v1785828105/Tesco-logo-300x75_gjzcua.png" },
  ];

  return (
    <div className="bg-white overflow-hidden">
      {/* 1. Hero — Real, Full-Width Photography */}
      <section className="relative min-h-[80vh] lg:min-h-[85vh] flex items-center justify-center pt-16 overflow-hidden bg-[#303360]">
        {/* Full-bleed background photograph */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://res.cloudinary.com/couponsbit/image/upload/v1785914619/1.8461_an7d5u.png"
            
            alt="Analytics Clouds Campaign Strategy Team"
            className="w-full h-full object-cover object-center scale-105 filter brightness-95"
            referrerPolicy="no-referrer"
          />
          {/* Subtle navy gradient scrim ensuring deep contrast and complete legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#303360] via-[#303360]/85 to-[#303360]/30 sm:from-[#303360]/95 sm:via-[#303360]/80 sm:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#303360] via-[#303360]/40 to-transparent lg:hidden" />
        </div>

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left side content overlaid on scrim */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-6 text-left">
              {/* Eyebrow tag */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-block font-mono text-xs font-semibold text-[#FE7146] tracking-wider uppercase bg-[#FFF1EC]/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#FE7146]/30"
              >
                DIGITAL & PERFORMANCE MARKETING
              </motion.div>

              {/* Clamp-based headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-6xl sm:text-6xl lg:text-6xl font-black text-white leading-[1.2] tracking-tight font-display"
              >
                Make Your Ideas{" "}
                <span className="text-[#FE7146] inline-block relative">
                  Trending.
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
                Analytics Clouds is a full-service digital growth partner helping businesses scale through SEO, performance marketing, AI-powered automation, web experiences, and data-driven strategies that deliver measurable business results.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
              >
                <button
  onClick={() => navigate.push("/contact")}
  className="bg-[#FE7146] hover:bg-[#e0562b] text-white font-extrabold px-8 py-4 rounded-xl shadow-lg shadow-[#FE7146]/25 hover:shadow-[#FE7146]/35 transition-all text-center flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
>
  <span>Get a Free Growth Audit</span>
  <TrendingUp size={18} />
</button> 

                <button
                  onClick={() => navigate.push("/services")}
                  className="border-2 border-white/60 hover:border-white text-white font-bold px-8 py-4 rounded-xl transition-all text-center flex items-center justify-center gap-2 hover:bg-white/10 active:scale-[0.98] cursor-pointer"
                >
                  <span>Explore Our Work</span>
                  <ArrowRight size={18} className="text-[#FE7146]" />
                </button>
              </motion.div>
            </div>

          </div>
        </div>

      </section>

      {/* 2. The Craft Statement (editorial breather section) */}
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
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#303360] leading-snug tracking-tight max-w-3xl mx-auto">
              "Marketing isn't about being loud. It's about being{" "}
              <span className="text-[#FE7146]">found by the right people, at the right time.</span>"
            </h2>
            <div className="h-0.5 w-16 bg-gradient-to-r from-[#FE7146] to-indigo-500 mx-auto mt-6" />
          </motion.div>
        </div>
      </section>

      {/* 3. Services — Expand-on-Interaction Preview */}
      <section className="py-24 bg-[#F5F5FA] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xl font-bold text-[#FE7146] tracking-widest uppercase font-mono block">
              WHAT WE DO
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#303360] leading-tight tracking-tight">
              Every Solution. One Team.
            </h2>
            <p className="text-[#333333]/70 text-base max-w-xl mx-auto font-normal">
              Explore how each service contributes to your growth journey.
            </p>
          </div>

          {/* Interactive expand-on-hover service tiles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc, i) => {
              const isAnyHovered = hoveredService !== null;
              const isThisHovered = hoveredService === i;

              return (
                <div
                  key={i}
                  onMouseEnter={() => setHoveredService(i)}
                  onMouseLeave={() => setHoveredService(null)}
                  onClick={() => setHoveredService(hoveredService === i ? null : i)}
                  className={`relative overflow-hidden cursor-pointer bg-white p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between h-[270px] ${
                    isThisHovered
                      ? "border-[#FE7146]/30 shadow-2xl scale-[1.03] z-10"
                      : isAnyHovered
                      ? "border-gray-100 opacity-60 scale-[0.98] blur-[0.5px]"
                      : "border-gray-100 shadow-md"
                  }`}
                >
                  <div className="space-y-4 text-left">
                    {/* Icon container */}
                    <div className={`w-10 h-10 rounded-xl ${svc.bg} flex items-center justify-center transition-transform duration-300 ${isThisHovered ? "scale-110" : ""}`}>
                      {svc.icon}
                    </div>

                    {/* Title */}
                    <h3 className="font-display font-bold text-[#303360] text-base leading-snug group-hover:text-[#FE7146] transition-colors">
                      {svc.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed line-clamp-3">
                      {svc.desc}
                    </p>
                  </div>

                  {/* Expandable Section with short metric and link */}
                  <div className="pt-4 border-t border-gray-50 flex flex-col space-y-2 text-left">
                    {/* Smooth height and opacity expand */}
                    <div className={`transition-all duration-300 overflow-hidden ${isThisHovered ? "max-h-16 opacity-100" : "max-h-0 opacity-0"}`}>
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 font-mono bg-emerald-50 px-2.5 py-1 rounded-md w-fit mb-2">
                        <Zap size={12} className="fill-emerald-600" />
                        <span>{svc.metric}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <Link href={svc.path}
                        className="inline-flex items-center gap-1 text-xs font-extrabold text-[#FE7146] hover:gap-2 transition-all"
                      >
                        <span>Learn More</span>
                        <ArrowRight size={14} />
                      </Link>
                      <ChevronRight size={14} className={`text-slate-300 transition-transform ${isThisHovered ? "rotate-90 text-[#FE7146]" : ""}`} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Suffix hub link */}
          <div className="text-center mt-12">
            <Link href="/services"
              className="inline-flex items-center gap-2 text-sm font-extrabold text-[#303360] hover:text-[#FE7146] transition-colors"
            >
              <span>View All Services</span>
              <ArrowRight size={16} className="text-[#FE7146]" />
            </Link>
          </div>

        </div>
      </section>

      {/* 4. Why Choose Us — photography + stats */}
      <section className="relative bg-[#303360] text-white overflow-hidden min-h-[600px] flex items-stretch">
        <div className="grid grid-cols-1 lg:grid-cols-12 w-full">
          
          {/* Left Column: Second Real Photograph with scrim */}
          <div className="lg:col-span-5 relative min-h-[350px] lg:min-h-full overflow-hidden">
            <img
              src="https://res.cloudinary.com/couponsbit/image/upload/v1785918064/Untitled_design_33_thqqzd.png"
              alt="Analytics Clouds client and campaign team meeting"
              className="absolute inset-0 w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {/* Scrim overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#303360] hidden lg:block" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#303360] to-transparent lg:hidden" />
          </div>

          {/* Right Column: Navy Background & Stats + Differentiators */}
          <div className="lg:col-span-7 py-20 px-6 sm:px-12 lg:px-16 flex flex-col justify-center space-y-12 text-left relative z-10">
            <div className="space-y-4">
              <span className="text-xl font-bold text-[#FE7146] tracking-widest uppercase font-mono block">
                WHY CHOOSE US
              </span>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-white leading-tight tracking-tight">
                We Build Growth That Lasts.
              </h2>
              <p className="text-gray-300 text-sm sm:text-base font-normal max-w-xl">
                We create impactful campaigns and optimize them with data to maximize your return on ad spend.
              </p>
            </div>

            {/* Differentiators */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {differentiators.map((diff, i) => (
                <div key={i} className="flex gap-4 items-start group">
                  <div className="p-3 bg-white/10 rounded-xl group-hover:bg-[#FE7146]/20 transition-colors shrink-0">
                    {diff.icon}
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-display font-bold text-white text-sm sm:text-base">
                      {diff.title}
                    </h3>
                    <p className="text-gray-300 text-xs sm:text-sm font-normal leading-relaxed">
                      {diff.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* 2x2 Stat Cards Grid */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="bg-white/5 backdrop-blur-sm p-5 rounded-2xl border border-white/10 hover:border-[#FE7146]/40 transition-all duration-300 text-left hover:bg-gradient-to-br hover:from-white/10 hover:to-[#FE7146]/5 hover:shadow-lg"
                >
                  <div className="space-y-1">
                    <div className="text-2xl sm:text-3xl font-mono font-black text-[#FE7146] tracking-tight">
                      <ScrollCounter endValue={stat.value} suffix={stat.suffix} delay={100 * i} />
                    </div>
                    <div className="font-display font-bold text-sm text-white">
                      {stat.label}
                    </div>
                    <div className="text-[11px] text-gray-400 font-medium">
                      {stat.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 5. Real Results — Case Studies */}
      {/* <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
   
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold text-[#FE7146] tracking-widest uppercase font-mono block">
    
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#303360] leading-tight tracking-tight">
              Real Results. Real Impact.
            </h2>
            <p className="text-[#333333]/70 text-base max-w-xl mx-auto font-normal">
              Explore concrete examples of how our performance strategies drive massive revenue and customer pipeline growths.
            </p>
          </div>


          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {caseStudies.map((cs, i) => (
              <div
                key={i}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#FE7146]/20 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between text-left"
              >
                <div>
          
                  <div className="h-52 overflow-hidden relative">
                    <img
                      src={cs.image}
                      alt={cs.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <span className={`absolute top-4 left-4 text-[11px] font-bold font-mono uppercase tracking-wider px-3 py-1 rounded-md ${cs.categoryBg}`}>
                      {cs.category}
                    </span>
                  </div>

                  <div className="p-6 space-y-4">
      
                    <div className="flex items-center gap-2 text-emerald-600 font-mono font-black text-lg">
                      <Zap size={16} className="fill-emerald-600" />
                      <span>{cs.headlineResult}</span>
                    </div>

        
                    <h3 className="font-display font-bold text-lg text-[#303360] leading-snug group-hover:text-[#FE7146] transition-colors line-clamp-2">
                      {cs.title}
                    </h3>

     
                    <div className="flex flex-wrap gap-2 pt-2">
                      {cs.metrics.map((metric, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] font-semibold text-slate-500 bg-[#F5F5FA] px-2.5 py-1 rounded-full border border-gray-100"
                        >
                          {metric}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

              
                <div className="px-6 pb-6 pt-2">
                  <Link href={cs.path}
                    className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#FE7146] hover:gap-2.5 transition-all"
                  >
                    <span>View Case Study</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section> */}

      {/* 7. Latest Insights (Blog Preview) */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
    
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#303360] leading-tight tracking-tight">
              PROUD TO PARTNER WITH
            </h2>
          </div>

          {/* Partner Logo Grid */}
          <div className="w-full max-w-7xl mx-auto px-4 py-10">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-8 gap-y-10 items-center justify-items-center">
              {partnerLogos.map((logo, i) => (
                <img
                  key={i}
                  src={logo.src}
                  alt={logo.name}
                  className="max-h-14 max-w-[170px] w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
                />
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 6. What Our Clients Say (Testimonials) */}
      <section className="py-24 bg-[#FFF1EC]/20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xl font-bold text-[#FE7146] tracking-widest uppercase font-mono block">
              TESTIMONIALS
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#303360] leading-tight tracking-tight">
              What Our Clients Say
            </h2>
            <p className="text-[#333333]/70 text-base max-w-xl mx-auto font-normal">
              Real growth stories from businesses that achieved results with us.
            </p>
          </div>

          {/* Testimonial Slider */}
          <div
            className="relative"
            onMouseEnter={() => setIsTestimonialPaused(true)}
            onMouseLeave={() => setIsTestimonialPaused(false)}
          >
            <div className="overflow-hidden">
              <motion.div
                className="flex"
                animate={{ x: `-${activeTestimonialSlide * 100}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {testimonialSlides.map((slide, slideIndex) => (
                  <div key={slideIndex} className="w-full shrink-0">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-1">
                      {slide.map((test, i) => {
                        const avatarColors = [
                          "bg-[#303360]",
                          "bg-[#FE7146]",
                          "bg-indigo-600",
                          "bg-emerald-600",
                          "bg-rose-500",
                          "bg-amber-600",
                        ];
                        const globalIndex = slideIndex * testimonialItemsPerView + i;
                        const avatarColor = avatarColors[globalIndex % avatarColors.length];
                        const initial = (test.company || test.author || "?").charAt(0).toUpperCase();

                        return (
                          <div
                            key={i}
                            className="relative bg-white p-8 pt-10 rounded-2xl border border-gray-100 shadow-md hover:shadow-xl hover:border-[#FE7146]/10 transition-all duration-300 text-center overflow-hidden"
                          >
                            {/* Decorative quote corner */}
                            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-600 rounded-bl-[3rem]">
                              <Quote size={20} className="absolute top-3 right-3 text-white fill-white" />
                            </div>

                            {/* Company Avatar */}
                            <div
                              className={`relative w-16 h-16 rounded-full ${avatarColor} flex items-center justify-center mx-auto mb-4 font-display font-black text-white text-xl shadow-md overflow-hidden`}
                            >
                              <span>{initial}</span>
                              {test.avatar && (
                                <img
                                  src={test.avatar}
                                  alt={test.company}
                                  className="absolute inset-0 w-full h-full object-cover rounded-full bg-white"
                                  onError={(e) => {
                                    (e.currentTarget as HTMLImageElement).style.display = "none";
                                  }}
                                />
                              )}
                            </div>

                            {/* Name & Company */}
                            <h4 className="font-display font-bold text-[#303360] text-base">
                              {test.author || test.company}
                            </h4>
                            <p className="text-slate-400 text-sm mt-0.5">{test.company}</p>

                            {/* Star Rating */}
                            <div className="flex items-center justify-center gap-1 mt-3 mb-5">
                              {Array.from({ length: 5 }).map((_, starIdx) => (
                                <Star key={starIdx} size={16} className="fill-amber-400 text-amber-400" />
                              ))}
                            </div>

                            {/* Quote Body */}
                            <p className="text-slate-600 text-sm leading-relaxed">
                              {test.quote}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Dot Indicators */}
            {totalTestimonialSlides > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                {testimonialSlides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goToTestimonialSlide(i)}
                    aria-label={`Go to testimonial slide ${i + 1}`}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      activeTestimonialSlide === i ? "w-8 bg-[#FE7146]" : "w-2.5 bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

        </div>
      </section>

      

      {/* 8. CTA Banner (Shared global style component) */}
      <CtaBanner  />
    </div>
  );
}
