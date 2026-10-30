"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown, Headset } from "lucide-react";

import faqImg from "@/assets/image/faq.webp";

const FAQS: { q: string; a: string }[] = [
  {
    q: "What services does Design House India provide?",
    a: "We offer end-to-end solutions for corporate interiors, retail showrooms, restaurant interiors, exhibition stall design and build, retail kiosks, and signage & branding. Our services include design, fabrication, manufacturing, installation and project management.",
  },
  {
    q: "Do you have in-house manufacturing facilities?",
    a: "Yes. Our in-house manufacturing facility handles woodworking, metal fabrication, finishing, printing and signage, which lets us control quality and timelines from design through to installation.",
  },
  {
    q: "How long does a typical project take to complete?",
    a: "Timelines depend on the size, scope and complexity of the project. Once we understand your requirements, we share a detailed schedule covering design, production and on-site execution.",
  },
  {
    q: "Do you work across India?",
    a: "Yes. We execute and support projects across India, with our team managing production, logistics and on-site installation wherever your space is located.",
  },
  {
    q: "Can you handle custom designs and brand-specific requirements?",
    a: "Absolutely. Every space we create is designed around your brand guidelines, functional needs and budget, from bespoke fixtures and furniture to custom signage and branding elements.",
  },
  {
    q: "What information do you need to provide a quotation?",
    a: "Share the project type, location, approximate area, your design references or brand guidelines, the expected timeline and your budget range. Layouts or drawings, if available, help us quote more accurately.",
  },
  {
    q: "Do you provide support after project completion?",
    a: "Yes. After handover we stay available for maintenance, repairs and any modifications, so your space keeps performing the way it should.",
  },
];

/* The photo's right edge is a convex curve: x eases from 85% at the top out to 100% at the bottom
   (quarter sine), sampled into polygon points. */
const PHOTO_CLIP = `polygon(0 0, ${Array.from({ length: 13 }, (_, k) => {
  const t = k / 12;
  return `${(85 + 15 * Math.sin((t * Math.PI) / 2)).toFixed(2)}% ${(t * 100).toFixed(2)}%`;
}).join(", ")}, 0 100%)`;

// Left edge of the photo fades into the page background
const PHOTO_MASK = "linear-gradient(to right, transparent 0%, black 38%)";

/* "FAQs": heading, intro and a "Still Have Questions?" contact card on the left over a reception photo
   (xl+) that fades in from the left; an accordion of numbered questions on the right (first one open). */
const OurFaqs = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faqs" className="relative w-full overflow-hidden bg-white scroll-mt-24">
      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 grid xl:grid-cols-[minmax(0,1fr)_minmax(0,1.12fr)] gap-6">
        {/* ── Left: text + contact card over the photo ── */}
        <div className="relative pt-8 pb-2 xl:py-10">
          <div
            className="hidden xl:block absolute top-0 bottom-0 left-[36%] -right-6"
            style={{ clipPath: PHOTO_CLIP, maskImage: PHOTO_MASK, WebkitMaskImage: PHOTO_MASK }}
            aria-hidden="true"
          >
            {/* The frame is narrow and tall, so the photo is scaled to its height and drawn far wider than the
                frame; `sizes` must request that full drawn width or the browser picks a too-small file */}
            <Image src={faqImg} alt="" fill placeholder="blur" sizes="(min-width: 1280px) 80vw, 100vw" className="object-cover object-[55%_center]" />
            {/* White wash only on the left part, behind the text; fades out before the rest of the photo */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/50 via-white/25 via-25% to-transparent to-40%" />
          </div>

          <div className="relative max-w-[380px]">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-5 h-[2.5px] bg-[#fd6e15] rounded-full inline-block" />
              <span className="text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.2em] text-[#fd6e15]">FAQs</span>
            </div>
            <h2 className="text-[30px] sm:text-[36px] lg:text-[42px] font-serif font-medium leading-[1.08] tracking-tight mb-3 text-[#0A2B5E]">
              Frequently
              <br />
              <span className="text-[#fd6e15]">Asked Questions.</span>
            </h2>
            <p className="text-[13.5px] sm:text-[14.5px] text-black leading-relaxed mb-6 max-w-[340px]">
              Find answers to common questions about our services, process, timelines and more. If you need further
              information, feel free to get in touch with our team.
            </p>

            <div className="rounded-md bg-[#FFF4EC]/95 p-3.5 sm:p-4 max-w-[300px]">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-11 h-11 shrink-0 rounded-full bg-[#FFE3D1] flex items-center justify-center">
                  <Headset className="w-5 h-5 text-[#fd6e15]" strokeWidth={1.6} />
                </span>
                <div>
                  <p className="text-[14px] font-bold text-[#0A2B5E] leading-tight mb-0.5">Still Have Questions?</p>
                  <p className="text-[11.5px] text-black leading-snug">Our team is happy to help you with your project requirements.</p>
                </div>
              </div>
              <Link
                href="/contact"
                className="group flex items-center justify-center gap-2.5 w-full rounded-md bg-[#fd6e15] hover:bg-[#e05d0e] py-2.5 text-white text-[13px] font-semibold shadow-[0_6px_16px_rgba(253,110,21,0.3)] transition-colors"
              >
                Contact Us
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* ── Right: accordion ── */}
        <div className="relative pb-8 xl:py-6 flex flex-col justify-center gap-2.5">
          {FAQS.map(({ q, a }, i) => {
            const isOpen = open === i;
            return (
              <div
                key={q}
                className="flex items-start gap-3 sm:gap-4 rounded-md bg-white px-3 sm:px-4 py-2.5 shadow-[rgba(0,0,0,0.02)_0px_1px_3px_0px,rgba(27,31,35,0.15)_0px_0px_0px_1px]"
              >
                <span className="w-10 h-10 shrink-0 rounded-full bg-[#FFF1E8] text-[#fd6e15] text-[17px] font-bold flex items-center justify-center">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="w-px self-stretch bg-[#E3E8F0]" />
                <div className="flex-1 min-w-0">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="w-full min-h-10 flex items-center justify-between gap-3 text-left"
                  >
                    <span className="text-[13.5px] sm:text-[14px] font-semibold text-[#0A2B5E] leading-snug">{q}</span>
                    <ChevronDown
                      className={`w-5 h-5 shrink-0 text-[#fd6e15] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                  >
                    <div className="overflow-hidden">
                      <p className="pt-0.5 pb-1.5 pr-6 text-[12.5px] text-[#4A5568] leading-relaxed">{a}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OurFaqs;
