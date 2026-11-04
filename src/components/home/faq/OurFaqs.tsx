"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

import { HOME_SECTION_DEFAULTS, type FaqsContent } from "@/lib/homeSections";
import faqImg from "@/assets/image/faq1.webp";

/* "FAQs": heading and intro on the left with a showroom photo below them (the photo's top fades to
   white, so it tucks in behind the text); on the right an accordion of questions, each a square-cornered
   white card with an orange bar, the open one tinted orange (first one open). Hovering a question opens it
   (its answer slides open and fades in) and it closes again 3 seconds after the pointer leaves it; a tap or
   click works too, for touch screens. */
const CLOSE_AFTER_MS = 3000;

// Content: edited in the admin (Pages & CMS → Home → Frequently Asked Questions)
const OurFaqs = ({ data = HOME_SECTION_DEFAULTS.faqs }: { data?: FaqsContent }) => {
  const [open, setOpen] = useState<number | null>(0);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };
  const openOnHover = (i: number) => {
    cancelClose();
    setOpen(i);
  };
  // Pointer left card i: close it after a pause, unless another card has opened meanwhile
  const closeLater = (i: number) => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen((cur) => (cur === i ? null : cur)), CLOSE_AFTER_MS);
  };
  useEffect(() => cancelClose, []);

  return (
    <section id="faqs" className="relative w-full overflow-hidden bg-gradient-to-br from-white via-[#FFFCFA] to-[#FFF5EE] scroll-mt-24 pb-8 lg:pb-10">
      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 grid xl:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] gap-6 xl:gap-10">
        {/* ── Left: the showroom photo fills the column; a white curve across its top carries the heading ── */}
        <div className="relative pt-10 xl:pt-[54px] min-h-[520px] xl:min-h-[520px]">
          <div className="absolute inset-0">
            <Image
              src={faqImg}
              alt={data.imageAlt || "Bathware and sanitaryware showroom designed by Design House India"}
              fill
              placeholder="blur"
              sizes="(min-width: 1280px) 48vw, 100vw"
              className="object-cover object-left-bottom"
            />
            {/* White curve over the top of the photo: deeper on the left (behind the text), rising to the right */}
            <svg className="absolute inset-x-0 top-0 w-full h-[310px] xl:h-[280px]" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <linearGradient id="faq-curve-edge" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#ffffff" stopOpacity="0.9" />
                  <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Soft band under the edge so the curve fades into the photo */}
              <path d="M0 80 C 40 98, 74 86, 100 58 L 100 72 C 74 100, 40 112, 0 96 Z" fill="url(#faq-curve-edge)" />
              <path d="M0 0 H100 V58 C 74 86, 40 98, 0 80 Z" fill="#ffffff" />
            </svg>
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-5 h-[2.5px] bg-[#fd6e15] rounded-full inline-block" />
              <span className="text-[12.5px] sm:text-[14px] font-bold uppercase tracking-[0.2em] text-[#fd6e15]">{data.eyebrow}</span>
            </div>
            <h2 className="text-[26px] sm:text-[30px] lg:text-[34px] font-serif font-medium leading-[1.15] tracking-tight mb-3 text-[#0A2B5E]">
              {data.title}
              {data.title && data.highlight && <br />}
              <span className="text-[#fd6e15]">{data.highlight}</span>
            </h2>
            <p className="text-[13.5px] sm:text-[14.5px] text-[#1F2D44] leading-relaxed max-w-[460px]">{data.description}</p>
          </div>
        </div>

        {/* ── Right: accordion ── */}
        <div className="relative pb-8 xl:py-10 flex flex-col justify-center gap-2.5">
          {data.faqs.map(({ question: q, answer: a }, i) => {
            const isOpen = open === i;
            return (
              <div
                key={`${q}-${i}`}
                onMouseEnter={() => openOnHover(i)}
                onMouseLeave={() => closeLater(i)}
                className={`border transition-[background-color,border-color,box-shadow] duration-300 ${
                  isOpen
                    ? "border-[#FAD3B5] bg-gradient-to-r from-[#FFEEE1] to-[#FFF7F1] shadow-[0_8px_22px_-10px_rgba(253,110,21,0.35)]"
                    : "border-[#EEF1F6] bg-white shadow-[0_3px_12px_-4px_rgba(10,43,94,0.12)] hover:border-[#F6CFAF]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-left"
                >
                  <span className="w-[3px] h-5 shrink-0 rounded-full bg-[#fd6e15]" />
                  <h3 className="flex-1 text-[13.5px] sm:text-[14px] font-semibold text-[#0A2B5E] leading-snug">{q}</h3>
                  <ChevronDown
                    className={`w-[18px] h-[18px] shrink-0 text-[#fd6e15] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    strokeWidth={2.4}
                  />
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    {/* Lined up with the question text (after the orange bar); slides down and fades in as it opens */}
                    <p
                      className={`pl-[31px] pr-10 pb-3 text-[12.5px] text-[#3B4A63] leading-relaxed transition-[opacity,transform] duration-500 ease-out ${
                        isOpen ? "opacity-100 translate-y-0 delay-100" : "opacity-0 -translate-y-2"
                      }`}
                    >
                      {a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Blue rule along the bottom, fading out at both ends, to set the FAQs apart from Get In Touch below */}
      <span aria-hidden="true" className="absolute bottom-0 inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-[#134698] to-transparent" />
    </section>
  );
};

export default OurFaqs;
