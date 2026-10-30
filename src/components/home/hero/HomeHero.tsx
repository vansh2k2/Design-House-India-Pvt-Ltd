"use client";

import { useState, useEffect } from "react";
import Image, { type StaticImageData } from "next/image";
import {
  ArrowRight,
  ChevronRight,
} from "lucide-react";

import hero2Bg from "@/assets/banner/hero2.webp";
import hero3Bg from "@/assets/banner/hero3.webp";

import h1Icon from "@/assets/icon/h1.png";
import h2Icon from "@/assets/icon/h2.png";
import h3Icon from "@/assets/icon/h3.png";
import h4Icon from "@/assets/icon/h4.png";
import h5Icon from "@/assets/icon/h5.png";
import h6Icon from "@/assets/icon/h6.png";

/* ═══════════════════════════════════════════════════════════════════════════
   Custom vector icons for the 6 right-side categories
   ═══════════════════════════════════════════════════════════════════════════ */

const IconRetailShowroom = () => (
  <svg viewBox="0 0 32 32" className="w-6.5 h-6.5 sm:w-7 sm:h-7 stroke-[#134698] fill-none stroke-[2] stroke-linecap-round stroke-linejoin-round shrink-0" aria-hidden="true">
    <path d="M4 27h24" />
    <path d="M7 27V12a9 9 0 0 1 18 0v15" />
    <path d="M11 27V14a5 5 0 0 1 10 0v13" />
    <path d="M11 7h10" />
    <path d="M5 27h4" />
    <path d="M23 27h4" />
  </svg>
);

const IconCorporateInteriors = () => (
  <svg viewBox="0 0 32 32" className="w-6.5 h-6.5 sm:w-7 sm:h-7 stroke-[#134698] fill-none stroke-[2] stroke-linecap-round stroke-linejoin-round shrink-0" aria-hidden="true">
    <circle cx="10" cy="10" r="3" />
    <circle cx="22" cy="10" r="3" />
    <circle cx="16" cy="12" r="3" />
    <path d="M5 26v-2.5a4.5 4.5 0 0 1 7-3.7" />
    <path d="M27 26v-2.5a4.5 4.5 0 0 0-7-3.7" />
    <path d="M11.5 26v-3a4.5 4.5 0 0 1 9 0v3" />
  </svg>
);

const IconRestaurantInteriors = () => (
  <svg viewBox="0 0 32 32" className="w-6.5 h-6.5 sm:w-7 sm:h-7 stroke-[#134698] fill-none stroke-[2] stroke-linecap-round stroke-linejoin-round shrink-0" aria-hidden="true">
    <path d="M6 9h20v3a10 10 0 0 1-20 0V9z" />
    <path d="M16 19v8" />
    <path d="M10 27h12" />
    <path d="M10 9V5" />
    <path d="M22 9V5" />
    <path d="M8 14h16" />
  </svg>
);

const IconExhibitionStall = () => (
  <svg viewBox="0 0 32 32" className="w-6.5 h-6.5 sm:w-7 sm:h-7 stroke-[#134698] fill-none stroke-[2] stroke-linecap-round stroke-linejoin-round shrink-0" aria-hidden="true">
    <path d="M4 27h24" />
    <path d="M6 27V8h20v19" />
    <path d="M4 8h24" />
    <path d="M10 12h12v6H10z" />
    <path d="M9 27v-5h14v5" />
    <circle cx="9" cy="5" r="1" fill="#134698" />
    <circle cx="16" cy="5" r="1" fill="#134698" />
    <circle cx="23" cy="5" r="1" fill="#134698" />
  </svg>
);

const IconRetailKiosks = () => (
  <svg viewBox="0 0 32 32" className="w-6.5 h-6.5 sm:w-7 sm:h-7 stroke-[#134698] fill-none stroke-[2] stroke-linecap-round stroke-linejoin-round shrink-0" aria-hidden="true">
    <rect x="9" y="5" width="14" height="17" rx="2" />
    <rect x="12" y="8" width="8" height="8" rx="1" />
    <path d="M13 22v5" />
    <path d="M19 22v5" />
    <path d="M8 27h16" />
    <circle cx="16" cy="18.5" r="0.8" fill="#134698" />
  </svg>
);

const IconSignageBranding = () => (
  <svg viewBox="0 0 32 32" className="w-6.5 h-6.5 sm:w-7 sm:h-7 stroke-[#134698] fill-none stroke-[2] stroke-linecap-round stroke-linejoin-round shrink-0" aria-hidden="true">
    <path d="M16 4l9 4v7c0 6-4 10-9 13-5-3-9-7-9-13V8l9-4z" />
    <path d="M12 15l3 3 5-5" />
  </svg>
);

/* ─── 6 Interactive Carousel Slides with synchronized Sidebar services ─── */
interface SlideItem {
  id: string;
  label: string;
  href: string;
  image: StaticImageData;
  icon: () => React.JSX.Element;
  tagline?: string[];
  title1?: string;
  title2?: string;
  desc: string;
  buttonText: string;
}

const HERO_DESC = "Design House India Private Limited is a premier manufacturer of retail display solutions with nationwide reach. End-to-end interior, display and fit-out solutions across India.";

const SLIDES: SlideItem[] = [
  {
    id: "retail",
    label: "RETAIL\nSHOWROOM\nINTERIORS",
    href: "/services/retail-interior",
    image: hero2Bg,
    icon: IconRetailShowroom,
    tagline: ["Design", "Manufacturing", "Execution"],
    title1: "Spaces That",
    title2: "Build Brands",
    desc: "Design House India Private Limited is a premier manufacturer of retail display solutions with nationwide reach. End-to-end interior, display and fit-out solutions across India.",
    buttonText: "Discuss Retail Project",
  },
  {
    id: "corporate",
    label: "CORPORATE\nINTERIORS",
    href: "/services/corporate-interior",
    image: hero3Bg,
    icon: IconCorporateInteriors,
    tagline: ["Design", "Manufacturing", "Execution"],
    title1: "Workspaces That",
    title2: "Inspire Success",
    desc: "We design modern corporate office interiors that enhance workplace productivity and reinforce brand identity through turnkey design, manufacturing, and fit-out solutions across India.",
    buttonText: "Discuss Corporate Interiors",
  },
  {
    id: "restaurant",
    label: "RESTAURANT\nINTERIORS",
    href: "/services/restaurant-interior",
    image: hero2Bg,
    icon: IconRestaurantInteriors,
    tagline: ["Design", "Manufacturing", "Execution"],
    title1: "Ambiances That",
    title2: "Delight Guests",
    desc: "We create luxury restaurant and hospitality interiors that delight guests, maximize seating efficiency, and elevate dining ambiances through bespoke turnkey craftsmanship across India.",
    buttonText: "Discuss Restaurant Design",
  },
  {
    id: "exhibition",
    label: "EXHIBITION STALL\nMANUFACTURING",
    href: "/services/exhibitions",
    image: hero3Bg,
    icon: IconExhibitionStall,
    tagline: ["Design", "Manufacturing", "Execution"],
    title1: "Exhibits That",
    title2: "Command Attention",
    desc: "We engineer custom trade show booths and exhibition stalls that maximize visitor engagement, command visual attention, and deliver high-impact turnkey presence at major expos across India.",
    buttonText: "Explore Exhibition Stalls",
  },
  {
    id: "kiosks",
    label: "RETAIL\nKIOSKS",
    href: "/services/retail-kiosk",
    image: hero2Bg,
    icon: IconRetailKiosks,
    tagline: ["Design", "Manufacturing", "Execution"],
    title1: "Kiosks That",
    title2: "Drive Footfall",
    desc: "We manufacture bespoke turnkey retail kiosks and modular display units designed for premier malls and transit hubs to maximize visual merchandising, engagement, and sales across India.",
    buttonText: "Explore Retail Kiosks",
  },
  {
    id: "signage",
    label: "SIGNAGE &\nBRANDING",
    href: "/services/signage",
    image: hero3Bg,
    icon: IconSignageBranding,
    tagline: ["Design", "Manufacturing", "Execution"],
    title1: "Identities That",
    title2: "Stand Apart",
    desc: "We manufacture architectural signage, illuminated facades, and high-visibility branding displays that make your business instantly recognizable and trusted across India.",
    buttonText: "Discuss Signage & Branding",
  },
];

/* ─── Bottom strip service items ─── */
const BOTTOM_SERVICES: { icon: StaticImageData; label: string; href: string }[] = [
  { icon: h1Icon, label: "Design\nConsultancy", href: "/services/retail-interior" },
  { icon: h2Icon, label: "In-house\nManufacturing", href: "/services/retail-kiosk" },
  { icon: h3Icon, label: "Turnkey\nExecution", href: "/services/corporate-interior" },
  { icon: h4Icon, label: "Pan India\nPresence", href: "/services/exhibitions" },
  { icon: h5Icon, label: "On-time\nDelivery", href: "/services" },
  { icon: h6Icon, label: "Dedicated\nSupport", href: "/contact" },
];

const CSS = `
.home-hero {
  font-family: 'Inter', sans-serif;
}

/* ── Background Slide Scale + Blur Dissolve ── */
.home-hero .hh-slide-active {
  opacity: 1;
  transform: scale(1);
  filter: blur(0px);
  transition: opacity 1.5s cubic-bezier(0.4, 0, 0.2, 1),
              transform 2s cubic-bezier(0.22, 1, 0.36, 1),
              filter 1.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.home-hero .hh-slide-inactive {
  opacity: 0;
  transform: scale(1.08);
  filter: blur(12px);
  transition: opacity 1.5s cubic-bezier(0.4, 0, 0.2, 1),
              transform 2s cubic-bezier(0.22, 1, 0.36, 1),
              filter 1.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* ── Tagline Blur-Dissolve In ── */
@keyframes hh-blur-dissolve-in {
  0%   { opacity: 0; filter: blur(18px); transform: translateY(14px) scale(0.97); }
  50%  { opacity: 0.7; filter: blur(5px); }
  100% { opacity: 1; filter: blur(0px); transform: translateY(0) scale(1); }
}
.home-hero .hh-text-blur-in {
  opacity: 0;
  animation: hh-blur-dissolve-in 1.1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* ── Title Clip + Blur Reveal ── */
@keyframes hh-title-dissolve {
  0% {
    opacity: 0;
    filter: blur(20px);
    transform: translateY(80%) rotateX(35deg) scale(0.92);
    clip-path: inset(0 0 100% 0);
  }
  35% {
    clip-path: inset(0 0 45% 0);
    filter: blur(8px);
    opacity: 0.6;
  }
  100% {
    opacity: 1;
    filter: blur(0px);
    transform: translateY(0) rotateX(0deg) scale(1);
    clip-path: inset(0 0 0 0);
  }
}
.home-hero .hh-title-line-1 {
  display: block;
  opacity: 0;
  transform-origin: bottom center;
  animation: hh-title-dissolve 1.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: 0.2s;
}
.home-hero .hh-title-line-2 {
  display: block;
  opacity: 0;
  transform-origin: bottom center;
  animation: hh-title-dissolve 1.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: 0.4s;
}

/* ── Description Sweep Dissolve ── */
@keyframes hh-desc-dissolve {
  0% {
    opacity: 0;
    filter: blur(14px);
    transform: translateY(10px);
    -webkit-mask-image: linear-gradient(to right, transparent 0%, transparent 100%);
    mask-image: linear-gradient(to right, transparent 0%, transparent 100%);
  }
  40% {
    opacity: 0.8;
    filter: blur(4px);
    -webkit-mask-image: linear-gradient(to right, black 0%, transparent 55%);
    mask-image: linear-gradient(to right, black 0%, transparent 55%);
  }
  100% {
    opacity: 1;
    filter: blur(0px);
    transform: translateY(0);
    -webkit-mask-image: linear-gradient(to right, black 0%, black 100%);
    mask-image: linear-gradient(to right, black 0%, black 100%);
  }
}
.home-hero .hh-desc-reveal {
  opacity: 0;
  animation: hh-desc-dissolve 1.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* ── Button Scale-Blur Reveal ── */
@keyframes hh-btn-dissolve {
  0%   { opacity: 0; filter: blur(12px); transform: translateY(14px) scale(0.92); }
  55%  { filter: blur(3px); }
  100% { opacity: 1; filter: blur(0px); transform: translateY(0) scale(1); }
}
.home-hero .hh-btn-reveal {
  opacity: 0;
  animation: hh-btn-dissolve 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* ── Tagline Pipe Glow Pulse ── */
@keyframes hh-pipe-glow {
  0%, 100% { text-shadow: 0 0 6px rgba(253,110,21,0.5); }
  50%      { text-shadow: 0 0 16px rgba(253,110,21,0.95), 0 0 30px rgba(253,110,21,0.35); }
}
.home-hero .hh-pipe-glow {
  animation: hh-pipe-glow 2.8s ease-in-out infinite;
}
`;

const HomeHero = () => {
  const [mounted, setMounted] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => setMounted(true), []);

  /* Auto-slide carousel every 3 seconds continuously without pausing on hover */
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % SLIDES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [activeSlide]);

  const current = SLIDES[activeSlide];

  return (
    <section className="home-hero relative w-full bg-white pt-[56px] sm:pt-[68px] overflow-hidden">
      <style>{CSS}</style>

      {/* Main Grid: Left Banner Carousel (1fr) + Right Sidebar with compact sleek styling */}
      <div className="w-full flex flex-col lg:flex-row h-auto lg:h-[410px] xl:h-[435px] 2xl:h-[455px]">

        {/* ════════════════════════════════════════════════════════════════
            LEFT COLUMN: Carousel Banner Images + Content + Bottom Strip
            ════════════════════════════════════════════════════════════════ */}
        <div className="relative flex-1 flex flex-col justify-between overflow-hidden h-[410px] sm:h-[435px] lg:h-full">

          {/* Background Images for all slides with smooth crossfade animation */}
          <div className="absolute inset-0 z-0">
            {SLIDES.map((slide, idx) => (
              <div
                key={slide.id}
                className={`absolute inset-0 ${
                  activeSlide === idx ? "hh-slide-active z-[1]" : "hh-slide-inactive z-0 pointer-events-none"
                }`}
              >
                <Image
                  src={slide.image}
                  alt={slide.buttonText}
                  fill
                  priority={idx === 0 || idx === 1}
                  unoptimized
                  sizes="(max-width: 1024px) 100vw, 85vw"
                  className="object-cover object-center"
                />
              </div>
            ))}

            {/* Dark gradient on the left behind text — darkened for optimal text contrast and readability */}
            <div className="absolute left-0 top-0 bottom-0 w-full md:w-[65%] lg:w-[58%] bg-gradient-to-r from-black/95 via-black/70 to-transparent pointer-events-none z-[2]" />
          </div>

          {/* Hero text & buttons — synchronized with active slide via key */}
          <div key={current.id} className="relative z-10 pl-8 sm:pl-14 lg:pl-16 xl:pl-20 pr-6 sm:pr-8 pt-14 sm:pt-16 lg:pt-[72px] xl:pt-[80px] max-w-[850px]">
            {/* Tagline */}
            <div
              className="hh-text-blur-in flex items-center gap-2 sm:gap-2.5 text-[12px] sm:text-[13px] lg:text-[14px] uppercase tracking-[0.22em] font-bold text-white mb-2 sm:mb-2.5"
              style={{ animationDelay: "0.15s" }}
            >
              {(current.tagline || ["Design", "Manufacturing", "Execution"]).map((tag, idx, arr) => (
                <span key={tag} className="flex items-center gap-2 sm:gap-2.5">
                  <span>{tag}</span>
                  {idx < arr.length - 1 && <span className="text-[#fd6e15] font-bold hh-pipe-glow">|</span>}
                </span>
              ))}
            </div>

            {/* Heading with 3D Tilt Reveal and 3D Text Shadow Effect matching Bharat */}
            <h1
              className="text-[34px] sm:text-[42px] lg:text-[46px] xl:text-[52px] 2xl:text-[56px] font-black uppercase leading-[1.02] tracking-[-0.01em] mb-2 sm:mb-2.5 [perspective:800px]"
              style={{
                textShadow: "1px 1px 2px rgba(0,0,0,0.8), 0 3px 8px rgba(0,0,0,0.6)",
              }}
            >
              <span className="block overflow-hidden">
                <span className="hh-title-line-1 text-white block">
                  {current.title1 || "Spaces That"}
                </span>
              </span>
              <span className="block overflow-hidden">
                <span
                  className="hh-title-line-2 text-[#fd6e15] block tracking-tight"
                  style={{
                    textShadow: "1px 1px 2px rgba(0,0,0,0.9), 0 3px 10px rgba(0,0,0,0.7), 0 0 20px rgba(253,110,21,0.25)",
                  }}
                >
                  {current.title2 || "Build Brands"}
                </span>
              </span>
            </h1>

            {/* Dynamic Description matching active carousel slide */}
            <p
              className="hh-desc-reveal text-[14px] sm:text-[15.5px] lg:text-[16px] xl:text-[16.5px] text-white/95 leading-relaxed max-w-[660px] mb-3.5 sm:mb-4 font-normal min-h-[38px] sm:min-h-[42px] line-clamp-2"
              style={{ animationDelay: "0.45s" }}
            >
              {current.desc}
            </p>

            {/* CTA Buttons — sleek compact styling */}
            <div
              className="hh-btn-reveal flex flex-wrap items-center gap-2 sm:gap-2.5 mb-2.5 sm:mb-3"
              style={{ animationDelay: "0.6s" }}
            >
              <a
                href={current.href || "/contact"}
                className="group inline-flex items-center gap-1.5 sm:gap-2 rounded-[3px] bg-[#fd6e15] px-3.5 sm:px-4 py-1.5 sm:py-2 text-[10.5px] sm:text-[11px] font-bold uppercase tracking-wider text-white shadow-[0_4px_12px_rgba(253,110,21,0.35)] hover:bg-[#e05d0e] transition-colors"
              >
                {current.buttonText || "Discuss Your Project"}
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="/contact"
                className="group inline-flex items-center gap-1.5 sm:gap-2 rounded-[3px] border-[1.5px] border-white/80 bg-black/30 backdrop-blur-sm px-3.5 sm:px-4 py-1.5 sm:py-2 text-[10.5px] sm:text-[11px] font-bold uppercase tracking-wider text-white hover:bg-white hover:text-[#0C1E3A] transition-all"
              >
                Get A Free Consultation
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>

          {/* Bottom Service Icons Strip — vibrant transparent blue overlay */}
          <div className="relative z-10 w-full bg-gradient-to-r from-[#0A2F6E]/82 via-[#134B96]/75 to-[#0A2F6E]/72 backdrop-blur-md border-t border-white/25 pl-8 sm:pl-14 lg:pl-16 xl:pl-20 pr-6 sm:pr-8 py-2 sm:py-2.5">
            <div className="flex items-center justify-between gap-3 overflow-x-auto no-scrollbar">
              {BOTTOM_SERVICES.map(({ icon, label, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="group flex items-center gap-2.5 sm:gap-3 shrink-0 py-0.5 hover:opacity-90 transition-opacity"
                >
                  <div className="relative w-10 h-10 sm:w-11 sm:h-11 xl:w-12 xl:h-12 shrink-0 transition-transform duration-200 group-hover:scale-105 drop-shadow-[0_3px_10px_rgba(0,0,0,0.45)]">
                    <Image
                      src={icon}
                      alt={label.replace("\n", " ")}
                      fill
                      sizes="64px"
                      className="object-contain"
                    />
                  </div>
                  <span className="text-[12.5px] sm:text-[13px] xl:text-[13.5px] font-semibold text-white leading-[1.2] whitespace-pre-line drop-shadow-[0_1.5px_4px_rgba(0,0,0,0.9)]">
                    {label}
                  </span>
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* ════════════════════════════════════════════════════════════════
            RIGHT COLUMN: 6 Service Categories on #f2f6fa Background
            Compact inner spacing, reduced padding, neat alignment.
            Text blue (#0F2C59), bold font, synchronized with carousel.
            ════════════════════════════════════════════════════════════════ */}
        <div className="w-full lg:w-[210px] xl:w-[225px] 2xl:w-[240px] bg-[#f2f6fa] shrink-0 flex flex-col lg:h-full border-t lg:border-t-0 lg:border-l border-[#DCE6F2]">
          {SLIDES.map(({ icon: Icon, label, href }, i) => {
            const isActive = activeSlide === i;
            return (
              <a
                key={i}
                href={href}
                onMouseEnter={() => {
                  setActiveSlide(i);
                }}
                className={`group flex-1 flex items-center justify-between pl-2.5 sm:pl-3 pr-[36px] xl:pr-[40px] py-1 border-b border-[#DFEAF5] last:border-b-0 transition-all duration-300 relative ${
                  isActive
                    ? "bg-white border-l-[3.5px] border-l-[#fd6e15] shadow-sm"
                    : "bg-[#f2f6fa] hover:bg-white/70 border-l-[3.5px] border-l-transparent"
                }`}
              >
                <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                  <div className={`w-6.5 h-6.5 sm:w-7 sm:h-7 flex items-center justify-center shrink-0 transition-transform duration-200 ${isActive ? "scale-105" : "group-hover:scale-105"}`}>
                    <Icon />
                  </div>
                  <span className={`text-[10.5px] sm:text-[11px] xl:text-[11.5px] font-bold uppercase tracking-wide leading-[1.15] transition-colors whitespace-pre-line ${
                    isActive ? "text-[#0A2B5E]" : "text-[#0F2C59] group-hover:text-[#0A2B5E]"
                  }`}>
                    {label}
                  </span>
                </div>
                <ChevronRight className={`w-3.5 h-3.5 text-[#fd6e15] shrink-0 transition-transform duration-200 ${isActive ? "translate-x-0.5" : "group-hover:translate-x-0.5"}`} />
              </a>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default HomeHero;
