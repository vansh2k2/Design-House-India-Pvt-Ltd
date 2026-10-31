"use client";

import React, { Fragment, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

import { DEFAULT_HOME_PROJECTS, type HomeProjectsContent } from "@/lib/homeProjects";

const ITEMS_PER_PAGE = 6;

// Heading, badge, filter tabs and cards: edited in the admin (Pages & CMS → Home → Our Projects)
export default function OurProjects({ data = DEFAULT_HOME_PROJECTS }: { data?: HomeProjectsContent }) {
  const PROJECTS = data.projects;
  const CATEGORIES = [{ id: "all", label: "All Projects" }, ...data.categories];
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(0);

  const filteredProjects =
    activeCategory === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages - 1);
  const visibleProjects = filteredProjects.slice(
    safePage * ITEMS_PER_PAGE,
    (safePage + 1) * ITEMS_PER_PAGE
  );

  return (
    <section className="relative w-full bg-white pt-4 sm:pt-6 lg:pt-7 pb-1.5 sm:pb-2 lg:pb-2 overflow-hidden">
      <div className="container mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">

        {/* ════════════════════════════════════════════════════════════════
            HEADER: Eyebrow + Title + Paragraph + Top Right Button & Badge
            ════════════════════════════════════════════════════════════════ */}
        <div className="flex flex-col lg:flex-row lg:items-stretch justify-between gap-5 mb-2 sm:mb-2.5 lg:mb-0">
          <div>
            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-2">
              <span className="w-5 h-[2.5px] bg-[#fd6e15] rounded-full inline-block" />
              <span className="text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.2em] text-[#134698]">
                {data.eyebrow}
              </span>
            </div>

            {/* Heading in font-serif font-medium matching site branding */}
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-medium leading-[1.08] tracking-tight mb-2.5">
              <span className="text-[#0A2B5E]">{data.title} </span>
              <span className="text-[#fd6e15]">{data.highlight}</span>
            </h2>

            {/* Subtitle Paragraph */}
            <p className="text-[13.5px] sm:text-[14.5px] text-black font-normal leading-relaxed lg:mb-3">
              {data.description}
            </p>
          </div>

          {/* Top-Right: View All Projects CTA + Diverse Industries Pill */}
          <div className="flex flex-col items-start lg:items-end lg:justify-between gap-3 shrink-0">
            {data.button?.label && (
            <Link
              href={data.button.href || "/projects"}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white border-[1.5px] border-[#2373F4] text-[#2373F4] hover:bg-[#2373F4] hover:text-white text-[11px] sm:text-[11.5px] font-bold uppercase tracking-wider transition-all duration-200 group self-start lg:self-end"
            >
              <span>{data.button.label}</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
            )}

            {/* Diverse Industries badge: light-blue panel with a slanted left edge */}
            <div className="hidden lg:flex items-center gap-3 relative isolate pl-11 pr-5 py-3">
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#F4F8FC] to-[#EDF3FA] [clip-path:polygon(12%_0,100%_0,100%_100%,0_100%)]" />

              {/* Matching 2-Building Icon */}
              <svg
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12 text-[#134698] shrink-0"
              >
                {/* Left building with arched roof */}
                <path
                  d="M5 14C5 12.5 6 11.5 7.5 11L10.5 10C11.5 9.7 12.5 9.7 13.5 10L16.5 11C18 11.5 19 12.5 19 14V28H5V14Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
                {/* Right building taller with flat roof */}
                <path
                  d="M17 6H27V28H17V6Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
                {/* Windows right */}
                <line x1="20.5" y1="10" x2="20.5" y2="12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <line x1="23.5" y1="10" x2="23.5" y2="12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <line x1="20.5" y1="15" x2="20.5" y2="17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <line x1="23.5" y1="15" x2="23.5" y2="17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                {/* Windows left */}
                <circle cx="9.5" cy="15.5" r="1.2" fill="currentColor" />
                <circle cx="14.5" cy="15.5" r="1.2" fill="currentColor" />
                <circle cx="9.5" cy="19.5" r="1.2" fill="currentColor" />
                <circle cx="14.5" cy="19.5" r="1.2" fill="currentColor" />
                {/* Doors */}
                <path d="M9.5 28V24.5H14.5V28" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                <path d="M20 28V24C20 23.2 20.6 22.5 21.5 22.5H22.5C23.4 22.5 24 23.2 24 24V28" stroke="currentColor" strokeWidth="1.8" />
              </svg>

              <div>
                <span className="text-[13.5px] font-medium text-[#0A2B5E] block leading-tight">
                  {data.badge?.title}
                </span>
                <span className="text-[11px] text-[#46658C] block leading-tight mt-1 whitespace-nowrap">
                  {data.badge?.text}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════
            CATEGORY FILTER TABS
            ════════════════════════════════════════════════════════════════ */}
        <div className="flex items-center gap-2 bg-[#F4F7FA] w-fit max-w-full overflow-x-auto scrollbar-none mb-4 sm:mb-5 border border-slate-200/60">
          {CATEGORIES.map((cat, idx) => (
            <Fragment key={cat.id}>
            {/* Thin divider between tabs */}
            {idx > 0 && <span className="w-px h-5 shrink-0 bg-[#CBD5E1]" aria-hidden="true" />}
            <button
              onClick={() => {
                setActiveCategory(cat.id);
                setCurrentPage(0);
              }}
              className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-md text-[12px] sm:text-[12.5px] font-semibold whitespace-nowrap transition-all duration-200 ${
                activeCategory === cat.id
                  ? "bg-[#fd6e15] text-white shadow-sm"
                  : "text-[#46658C] hover:text-[#0A2B5E] hover:bg-white/60"
              }`}
            >
              {cat.label}
            </button>
            </Fragment>
          ))}
        </div>

        {/* ════════════════════════════════════════════════════════════════
            PROJECTS 3x2 GRID (6 Cards Per Page)
            ════════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 lg:gap-5 mb-2 sm:mb-3">
          {visibleProjects.map((project, idx) => (
            <Link
              key={`${project.title}-${safePage}-${idx}`}
              href={project.href}
              className="group relative h-[175px] sm:h-[195px] lg:h-[210px] rounded-md sm:rounded-[8px] overflow-hidden shadow-[0_4px_14px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_24px_rgba(0,0,0,0.18)] transition-all duration-300 block"
            >
              {/* Image with zoom effect */}
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.imageAlt || project.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>

              {/* Dark Gradient Overlay for text contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 via-35% to-transparent pointer-events-none" />

              {/* Bottom Details + Arrow Icon */}
              <div className="absolute inset-x-0 bottom-0 p-3.5 sm:p-4 flex items-end justify-between gap-3 z-10">
                <div className="min-w-0">
                  <h3 className="text-white text-[14.5px] sm:text-[15.5px] font-bold leading-tight group-hover:text-[#fd6e15] transition-colors truncate">
                    {project.title}
                  </h3>
                  <p className="text-white/75 text-[11px] sm:text-[11.5px] font-medium leading-tight mt-1 truncate">
                    {project.subtitle}
                  </p>
                </div>

                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 flex items-center justify-center shrink-0 text-white group-hover:bg-[#fd6e15] group-hover:border-[#fd6e15] transition-all duration-300">
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* ════════════════════════════════════════════════════════════════
            BOTTOM CONTROLS: Pagination Dots + Navigation Arrows
            ════════════════════════════════════════════════════════════════ */}
        <div className="flex items-center justify-between">
          {/* Spacer for symmetrical centering */}
          <div className="w-20 hidden sm:block" />

          {/* Pagination Dots */}
          <div className="flex items-center justify-center gap-2 mx-auto">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx)}
                aria-label={`Go to page ${idx + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  safePage === idx
                    ? "w-6 h-2 bg-[#fd6e15]"
                    : "w-2 h-2 bg-[#CBDCF0] hover:bg-[#9BBEDF]"
                }`}
              />
            ))}
          </div>

          {/* Circular Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
              disabled={safePage === 0}
              aria-label="Previous page"
              className="w-9 h-9 rounded-full bg-[#EBF3FB] text-[#134698] hover:bg-[#134698] hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-all flex items-center justify-center"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))}
              disabled={safePage === totalPages - 1}
              aria-label="Next page"
              className="w-9 h-9 rounded-full bg-[#0A2B5E] text-white hover:bg-[#fd6e15] disabled:opacity-30 disabled:pointer-events-none transition-all flex items-center justify-center shadow-sm"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
