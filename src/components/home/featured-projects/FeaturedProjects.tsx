"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Layers } from "lucide-react";
import { m, useScroll, useTransform } from "framer-motion";

import b1Img from "@/assets/image/b1.webp";
import b2Img from "@/assets/image/b2.webp";
import b3Img from "@/assets/image/b3.webp";
import b4Img from "@/assets/image/b4.webp";
import b5Img from "@/assets/image/b5.webp";
import c1Img from "@/assets/image/c1.webp";
import c2Img from "@/assets/image/c2.webp";
import t4Img from "@/assets/image/t4.webp";
import bannerBgImg from "@/assets/banner/bg-featured.webp";

// Corner outward arrows icon for Area
const AreaIcon = () => (
  <svg
    className="w-4 h-4 text-[#8C9BAE] shrink-0"
    viewBox="0 0 18 18"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 6V2H6" />
    <path d="M2 2L5.5 5.5" />
    <path d="M12 2H16V6" />
    <path d="M16 2L12.5 5.5" />
    <path d="M2 12V16H6" />
    <path d="M2 16L5.5 12.5" />
    <path d="M16 12V16H12" />
    <path d="M16 16L12.5 12.5" />
  </svg>
);

const CATEGORIES = [
  { id: "all", label: "All Projects" },
  { id: "corporate", label: "Corporate Interiors" },
  { id: "retail", label: "Retail Showrooms" },
  { id: "exhibition", label: "Exhibition Stalls" },
  { id: "kiosk", label: "Retail Kiosks" },
  { id: "restaurant", label: "Restaurants" },
];

const PROJECTS = [
  // 4 Primary cards matching reference screenshot exactly
  {
    id: "corporate-office",
    category: "corporate",
    title: "Corporate Office Interiors",
    location: "Delhi NCR",
    area: "12,000 sq. ft.",
    scope: "Design & Build",
    image: b2Img,
    href: "/services/corporate-interior",
  },
  {
    id: "retail-showroom",
    category: "retail",
    title: "Retail Showroom Interiors",
    location: "Mumbai",
    area: "3,500 sq. ft.",
    scope: "Interior Fit-out",
    image: b1Img,
    href: "/services/retail-interior",
  },
  {
    id: "exhibition-stall",
    category: "exhibition",
    title: "Exhibition Stall Design & Build",
    location: "Pragati Maidan",
    area: "36 sq. mtr.",
    scope: "Design, Fabrication & Installation",
    image: b4Img,
    href: "/services/exhibitions",
  },
  {
    id: "retail-kiosk",
    category: "kiosk",
    title: "Retail Kiosk",
    location: "Noida",
    area: "9 sq. mtr.",
    scope: "Design & Build",
    image: b5Img,
    href: "/services/retail-kiosk",
  },

  // Additional projects for interactive filtering
  {
    id: "fine-dine-restaurant",
    category: "restaurant",
    title: "Fine Dine Restaurant Interiors",
    location: "Cyber Hub, Gurgaon",
    area: "4,500 sq. ft.",
    scope: "Turnkey Interior Fit-out",
    image: b3Img,
    href: "/services/restaurant-interior",
  },
  {
    id: "tech-headquarters",
    category: "corporate",
    title: "Global Tech Headquarters",
    location: "Bengaluru",
    area: "18,500 sq. ft.",
    scope: "Design & Execution",
    image: c2Img,
    href: "/services/corporate-interior",
  },
  {
    id: "flagship-fashion-store",
    category: "retail",
    title: "Luxury Flagship Boutique",
    location: "Connaught Place, Delhi",
    area: "4,800 sq. ft.",
    scope: "Custom Fit-out & Fixtures",
    image: c1Img,
    href: "/services/retail-interior",
  },
  {
    id: "international-expo-pavilion",
    category: "exhibition",
    title: "Trade Expo Pavilion",
    location: "BIEC Bengaluru",
    area: "75 sq. mtr.",
    scope: "Design & Build",
    image: t4Img,
    href: "/services/exhibitions",
  },
];

export default function FeaturedProjects() {
  const [activeCategory, setActiveCategory] = useState("all");
  const sectionRef = useRef<HTMLElement>(null);

  // "PROJECTS" watermark slides sideways as the section scrolls through the viewport
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const watermarkX = useTransform(scrollYProgress, [0, 1], ["25%", "-25%"]);

  const filteredProjects =
    activeCategory === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden bg-gradient-to-b from-[#FAFBFD] via-[#F4F7FC] to-[#FAFBFD] pt-3 sm:pt-4 lg:pt-5 pb-5 sm:pb-6 lg:pb-7">
      {/* ── Background Architectural Watermark (banner/bg-featured.webp) ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Image
          src={bannerBgImg}
          alt=""
          aria-hidden="true"
          fill
          unoptimized
          className="object-cover object-bottom contrast-125"
        />
      </div>

      <div className="container relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 z-10">
        {/* ── Background Text Watermark ("PROJECTS") ── */}
        <m.div
          style={{ x: watermarkX }}
          className="absolute right-4 sm:right-10 -top-4 sm:-top-5 lg:-top-6 text-[65px] sm:text-[95px] lg:text-[120px] font-serif font-bold text-[#134698]/[0.1] tracking-[0.02em] uppercase select-none pointer-events-none -z-0 will-change-transform"
        >
          PROJECTS
        </m.div>

        {/* ════════════════════════════════════════════════════════════════
            HEADER: Eyebrow + Title + Paragraph + Top-Right "View All Projects"
            ════════════════════════════════════════════════════════════════ */}
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4 xl:gap-8 mb-5 sm:mb-6">
          <div className="max-w-[640px] min-w-0">
            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-2">
              <span className="w-5 h-[2.5px] bg-[#fd6e15] rounded-full inline-block" />
              <span className="text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.2em] text-[#fd6e15]">
                FEATURED PROJECTS
              </span>
            </div>

            {/* Title in font-serif font-medium */}
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-medium leading-[1.08] tracking-tight mb-2">
              <span className="text-[#0A2B5E]">Spaces That Create </span>
              <span className="text-[#fd6e15]">Real Impact.</span>
            </h2>

            {/* Subtitle */}
            <p className="text-[13.5px] sm:text-[14.5px] text-[#556987] leading-relaxed">
              Explore our recent projects across corporate, retail, exhibition and hospitality spaces, designed and executed with creativity, precision and a focus on brand experience.
            </p>
          </div>

          {/* Right: "View All Projects" link on top, filter pills below */}
          <div className="flex flex-col xl:items-end gap-4 xl:gap-6 shrink-0">
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[#134698] hover:text-[#fd6e15] transition-colors group"
            >
              <span>View All Projects</span>
              <ArrowRight className="w-4 h-4 text-[#fd6e15] transition-transform group-hover:translate-x-1" />
            </Link>

            {/* Category filter pills */}
            <div className="flex flex-wrap lg:flex-nowrap items-center xl:justify-end gap-1.5">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-full border text-[11.5px] whitespace-nowrap transition-all duration-200 ${
                    activeCategory === cat.id
                      ? "bg-[#fd6e15] border-[#fd6e15] text-white font-semibold shadow-[0_4px_12px_rgba(253,110,21,0.3)]"
                      : "bg-white hover:bg-white border-[#DCE3EE] text-[#334B6E] hover:text-[#0A2B5E] hover:border-[#B9C8DD] font-medium"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════
            4-COLUMN PROJECT CARDS GRID (Exactly 4 cards)
            ════════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-6 sm:mb-7">
          {filteredProjects.slice(0, 4).map((project, idx) => (
            <m.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={project.href}
                className="group flex flex-col h-full rounded-lg overflow-hidden bg-white border border-[#E3E8F0] shadow-[0_6px_18px_-8px_rgba(10,43,94,0.18)] hover:shadow-[0_12px_28px_-10px_rgba(10,43,94,0.28)] hover:-translate-y-1 transition-all duration-300"
              >
                {/* Card Image */}
                <div className="relative h-[165px] sm:h-[170px] xl:h-[175px] w-full overflow-hidden bg-slate-100">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                </div>

                {/* Card Details */}
                <div className="px-4 pt-3 pb-3.5 flex flex-col flex-1 justify-between bg-white">
                  {/* Title & Location Row */}
                  <div className="flex items-start justify-between gap-2 pb-2.5 mb-2.5 border-b border-[#E8EDF4]">
                    <h3 className="text-[#134698] font-bold text-[13px] leading-snug group-hover:text-[#fd6e15] transition-colors">
                      {project.title}
                    </h3>

                    <div className="inline-flex items-center gap-1 shrink-0 text-[#4B5563]">
                      <MapPin className="w-3.5 h-3.5 text-[#fd6e15] fill-[#fd6e15]/20 shrink-0" strokeWidth={1.8} />
                      <span className="text-[11px] font-medium whitespace-nowrap">
                        {project.location}
                      </span>
                    </div>
                  </div>

                  {/* Area & Scope Row with divider */}
                  <div className="grid grid-cols-[1fr_auto_1.1fr] items-center gap-2">
                    {/* Area Column */}
                    <div className="flex items-center gap-2 min-w-0">
                      <AreaIcon />
                      <div className="min-w-0">
                        <span className="text-[9.5px] text-[#8C9BAE] uppercase tracking-wider font-semibold block leading-none">
                          Area
                        </span>
                        <span className="text-[11.5px] sm:text-[12px] font-bold text-[#134698] block leading-tight mt-1 truncate">
                          {project.area}
                        </span>
                      </div>
                    </div>

                    {/* Vertical Divider */}
                    <div className="w-px h-7 bg-[#E3E8F0]" />

                    {/* Scope Column */}
                    <div className="flex items-center gap-1.5 min-w-0 pl-1">
                      <Layers className="w-4 h-4 text-[#134698] shrink-0" strokeWidth={1.8} />
                      <div className="min-w-0">
                        <span className="text-[9.5px] text-[#8C9BAE] uppercase tracking-wider font-semibold block leading-none">
                          Scope
                        </span>
                        <span className="text-[11px] sm:text-[11.5px] font-bold text-[#134698] block leading-tight mt-1">
                          {project.scope}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </m.div>
          ))}
        </div>

        {/* ════════════════════════════════════════════════════════════════
            BOTTOM CTA BUTTON
            ════════════════════════════════════════════════════════════════ */}
        <div className="flex justify-center">
          <Link
            href="/projects"
            className="group inline-flex items-center justify-center gap-2.5 min-w-[220px] px-8 py-3 rounded-md bg-[#fd6e15] hover:bg-[#e05d0e] text-white text-[14px] font-semibold shadow-[0_8px_20px_-6px_rgba(253,110,21,0.5)] transition-all"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
