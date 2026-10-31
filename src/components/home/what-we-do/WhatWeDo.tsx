"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Trophy,
  Layers,
  Settings as Cog,
} from "lucide-react";

import bgBuildImg from "@/assets/icon/bgbuild.png";
import { DEFAULT_WHAT_WE_DO, type WhatWeDoContent, type WhatWeDoStat } from "@/lib/homeWhatWeDo";

const STAT_ICONS: Record<WhatWeDoStat["icon"], typeof Trophy> = { trophy: Trophy, layers: Layers, cog: Cog };

function Counter({
  end,
  duration = 1800,
  suffix = "+",
  isStarted,
}: {
  end: number;
  duration?: number;
  suffix?: string;
  isStarted: boolean;
}) {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!isStarted) return;
    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * end));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [end, duration, isStarted]);

  return (
    <span>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

const CSS = `
@keyframes wwd-card-in {
  0% {
    opacity: 0;
    transform: translateY(42px) scale(0.92);
    filter: blur(8px);
  }
  65% {
    opacity: 0.9;
    filter: blur(1.5px);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0px);
  }
}
.wwd-card-reveal {
  opacity: 0;
  animation: wwd-card-in 0.75s cubic-bezier(0.16, 1, 0.3, 1) both;
}
`;

// Heading, cards, stats and industries: edited in the admin (Pages & CMS → Home → What We Do)
export default function WhatWeDo({ data = DEFAULT_WHAT_WE_DO }: { data?: WhatWeDoContent }) {
  const gridRef = React.useRef<HTMLDivElement>(null);
  const [cardsVisible, setCardsVisible] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCardsVisible(true);
        } else if (entry.boundingClientRect.top > 0) {
          setCardsVisible(false);
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    if (gridRef.current) {
      observer.observe(gridRef.current);
    }

    return () => observer.disconnect();
  }, []);
  const SERVICES = data.services;
  const INDUSTRIES = data.industries;

  return (
    <section className="relative w-full bg-white pt-6 sm:pt-8 pb-0 overflow-hidden">
      <style>{CSS}</style>
      <div className="container mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">

        {/* ════════════════════════════════════════════════════════════════
            HEADER: WHAT WE DO + Turnkey Spaces + Subtitle + CTA Button
            ════════════════════════════════════════════════════════════════ */}
        <div className="mb-2">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-5 h-[2.5px] bg-[#fd6e15] rounded-full inline-block" />
            <span className="text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.2em] text-[#0A2B5E]">
              {data.eyebrow}
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 lg:mb-10">
            <div className="flex flex-col md:flex-row md:items-center gap-6 lg:gap-8">
              {/* The home page's only H1 */}
              <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-medium text-[#0A2B5E] leading-[1.08] tracking-tight">
                {data.title} {data.title && data.highlight && <br />}
                <span className="text-[#fd6e15]">{data.highlight}</span>
              </h1>

              <div className="hidden md:block w-px h-12 bg-neutral-200 shrink-0" />

              <p className="text-[14px] sm:text-[15px] text-black font-semibold leading-relaxed max-w-[460px]">
                {data.description}
              </p>
            </div>

            {data.button?.label && (
            <Link
              href={data.button.href || "/services"}
              className="self-start lg:self-center inline-flex items-center gap-1.5 px-4 sm:px-4.5 py-2 sm:py-2.5 rounded-[3px] bg-[#fd6e15] hover:bg-[#e05d0e] text-white text-[11.5px] sm:text-[12px] font-bold uppercase tracking-wider transition-all duration-200 shadow-[0_4px_12px_rgba(253,110,21,0.3)] shrink-0 group"
            >
              <span>{data.button.label}</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
            )}
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════
            GRID: 6 SERVICE CARDS + 1 STATS CARD
            ════════════════════════════════════════════════════════════════ */}
        <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3 sm:gap-4 items-stretch">
          {SERVICES.map((item, idx) => (
              <Link
                key={`${item.title}-${idx}`}
                href={item.href}
                className={`group bg-white rounded-lg overflow-hidden flex flex-col justify-between hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(0,0,0,0.1),0_0_0_1px_rgba(27,31,35,0.2)] transition-all duration-300 ${
                  cardsVisible ? "wwd-card-reveal" : "opacity-0 pointer-events-none"
                }`}
                style={{
                  boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                  animationDelay: `${idx * 140}ms`,
                }}
              >
                {/* Card Image Container */}
                <div className="relative z-10 w-full aspect-[4/3]">
                  {/* Zoomable Image Wrapper */}
                  <div className="relative w-full h-full overflow-hidden bg-neutral-100">
                    <Image
                      src={item.image}
                      alt={item.imageAlt || item.title}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 15vw"
                      className="object-cover object-center group-hover:scale-108 transition-transform duration-500"
                    />
                  </div>
                  {/* Floating Circular Icon Badge */}
                  <div className="absolute -bottom-6 left-3 sm:left-3.5 w-12 h-12 sm:w-[52px] sm:h-[52px] rounded-full bg-[#FFF5EE] border border-[#FFD8BF] flex items-center justify-center shadow-md z-20 group-hover:scale-110 transition-transform">
                    {item.icon && <Image
                      src={item.icon}
                      alt={item.iconAlt || item.title + " icon"}
                      width={42}
                      height={42}
                      className="w-[36px] h-[36px] sm:w-[40px] sm:h-[40px] object-contain"
                    />}
                  </div>
                </div>

                {/* Card Text Content */}
                <div className="relative z-0 pt-8 pb-3.5 px-3 flex flex-col flex-1 justify-between">
                  <h2 className="text-[12.5px] sm:text-[13px] font-bold text-[#0A2B5E] group-hover:text-[#fd6e15] transition-colors leading-[1.25] mb-1 line-clamp-2">
                    {item.title}
                  </h2>
                  <p className="text-[10.5px] sm:text-[11px] text-black font-medium leading-snug line-clamp-2">
                    {item.desc}
                  </p>
                </div>
              </Link>
          ))}

          {/* ════════════════════════════════════════════════════════════════
              STATS CARD (Rightmost Column)
              ════════════════════════════════════════════════════════════════ */}
          <div
            className={`col-span-2 sm:col-span-1 lg:col-span-2 xl:col-span-1 bg-gradient-to-b from-[#F2F7FC] to-[#E8F2FA] rounded-lg px-3 sm:px-3.5 py-3.5 sm:py-4 flex flex-col justify-between ${
              cardsVisible ? "wwd-card-reveal" : "opacity-0 pointer-events-none"
            }`}
            style={{
              boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
              animationDelay: `${SERVICES.length * 140}ms`,
            }}
          >
            {data.stats.map((stat, i) => {
              const StatIcon = STAT_ICONS[stat.icon] ?? Trophy;
              return (
                <React.Fragment key={`${stat.label}-${i}`}>
                  {i > 0 && <div className="h-px w-full bg-[#D5E5F3] my-2 sm:my-2.5" />}
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border border-[#FFD8BF] shadow-sm flex items-center justify-center shrink-0">
                      <StatIcon className="w-6 h-6 sm:w-6.5 sm:h-6.5 text-[#fd6e15]" strokeWidth={2.25} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[19px] sm:text-[21px] xl:text-[22px] font-semibold text-[#0A2B5E] leading-none">
                        <Counter end={stat.value} suffix={stat.suffix} isStarted={cardsVisible} />
                      </div>
                      <div className="text-[10px] sm:text-[10.5px] xl:text-[11px] font-semibold text-black leading-tight mt-0.5 whitespace-nowrap">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════
            BOTTOM BANNER: Industries We Serve + City Skyline Watermarks
            ════════════════════════════════════════════════════════════════ */}
        <div className="relative mt-1.5 sm:mt-2.5 pt-0.5 sm:pt-1 pb-0 px-4 overflow-hidden text-center">
          {/* Left Skyline Watermark (anchored to bottom edge, reduced height) */}
          <div className="absolute left-0 sm:-left-2 lg:-left-4 bottom-[-2px] sm:bottom-[-4px] w-[270px] sm:w-[340px] lg:w-[420px] xl:w-[450px] pointer-events-none opacity-85 flex items-end">
            <Image
              src={bgBuildImg}
              alt=""
              aria-hidden="true"
              sizes="450px"
              className="w-full h-auto max-h-[55px] sm:max-h-[64px] lg:max-h-[72px] xl:max-h-[76px] object-contain object-left-bottom"
            />
          </div>

          {/* Right Skyline Watermark (anchored to bottom edge, reduced height, mirrored) */}
          <div className="absolute -right-4 sm:-right-8 lg:-right-12 bottom-[-2px] sm:bottom-[-4px] w-[270px] sm:w-[340px] lg:w-[420px] xl:w-[450px] pointer-events-none opacity-85 flex items-end scale-x-[-1]">
            <Image
              src={bgBuildImg}
              alt=""
              aria-hidden="true"
              sizes="450px"
              className="w-full h-auto max-h-[55px] sm:max-h-[64px] lg:max-h-[72px] xl:max-h-[76px] object-contain object-left-bottom"
            />
          </div>

          {/* Center Content */}
          <div className="relative z-10 max-w-[1000px] mx-auto pb-2 sm:pb-3.5">
            {/* Header with subtle horizontal lines on both sides */}
            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-1 sm:mb-1.5">
              <div className="h-[1px] w-14 sm:w-28 md:w-40 bg-[#CBDCF0]" />
              <h3 className="text-[13.5px] sm:text-[14.5px] font-bold text-[#0A2B5E] tracking-tight whitespace-nowrap">
                {data.industriesTitle}
              </h3>
              <div className="h-[1px] w-14 sm:w-28 md:w-40 bg-[#CBDCF0]" />
            </div>

            {/* Industries list with orange separators */}
            <div className="flex flex-wrap items-center justify-center gap-x-2.5 sm:gap-x-4 gap-y-1.5 text-[11.5px] sm:text-[12.5px] font-medium text-[#46658C]">
              {INDUSTRIES.map((item, idx, arr) => (
                <span key={`${item}-${idx}`} className="inline-flex items-center gap-2.5 sm:gap-4">
                  <span className="hover:text-[#0A2B5E] transition-colors">{item}</span>
                  {idx < arr.length - 1 && (
                    <span className="text-[#fd6e15] font-semibold text-[11px]">|</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
