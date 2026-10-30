"use client";

import Image from "next/image";
import Link from "next/link";
import { m } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";

import visionImg from "@/assets/image/vision.webp";
import { PROMISES, REASONS } from "./data";

/* "Why Choose Us": heading, six reason cards and two CTAs on the left; the office photo on the
   right (to the edge of the screen) with a navy strip of three promises over its bottom. */

const WhyChooseUs = () => (
  <section className="relative w-full overflow-hidden bg-[#F5F6F8]">
    <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_44%] xl:grid-cols-[minmax(0,1fr)_41%]">
      {/* ── Left: copy, cards, buttons (left edge lines up with the other sections' container) ── */}
      <div className="px-4 sm:px-6 lg:pr-8 lg:pl-[max(2rem,calc((100vw-1440px)/2+2rem))] py-8 sm:py-10 lg:py-9">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-5 h-[2.5px] bg-[#fd6e15] rounded-full inline-block" />
          <span className="text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.2em] text-[#134698]">Why Choose Us</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-medium leading-[1.08] tracking-tight mb-2.5">
          <span className="text-[#0A2B5E]">Your Vision. </span>
          <span className="text-[#fd6e15]">Our Expertise.</span>
        </h2>
        <p className="text-[13.5px] sm:text-[14.5px] text-black leading-relaxed max-w-[620px] mb-5 sm:mb-6">
          We combine creative design, in-house manufacturing and trusted execution to deliver spaces that are functional, brand-driven and built to last.
        </p>

        <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-3.5 mb-6 2xl:mr-6">
          {/* Cards rise in one after another when the section scrolls into view */}
          {REASONS.map(({ icon: Icon, title, lead, desc }, i) => (
            <m.li
              key={title}
              initial={{ opacity: 0, y: 28, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-start gap-2.5 xl:gap-2 min-[1366px]:gap-2.5 2xl:gap-3 rounded-md bg-white shadow-[rgba(0,0,0,0.02)_0px_1px_3px_0px,rgba(27,31,35,0.15)_0px_0px_0px_1px] p-3"
            >
              <span className="w-10 h-10 2xl:w-11 2xl:h-11 rounded-full bg-[#FFF5EE] flex items-center justify-center shrink-0">
                <Icon className="w-6 h-6 2xl:w-[27px] 2xl:h-[27px] text-[#fd6e15]" strokeWidth={1.8} />
              </span>
              <div className="min-w-0">
                <h3 className="text-[13px] xl:text-[11.5px] min-[1366px]:text-[12px] 2xl:text-[12.5px] min-[1800px]:text-[13px] font-semibold tracking-[-0.01em] text-[#0A2B5E] leading-tight mb-1 whitespace-nowrap">{title}</h3>
                <p className="text-[12px] sm:text-[12.5px] xl:text-[12px] 2xl:text-[12.5px] text-[#333] leading-snug">
                  {lead && <span className="min-[1366px]:whitespace-nowrap">{lead}</span>}
                  {lead && " "}
                  {desc}
                </p>
              </div>
            </m.li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2.5 rounded-[4px] bg-[#fd6e15] hover:bg-[#e05d0e] px-4 sm:px-5 py-2.5 text-white text-[11px] sm:text-[11.5px] font-bold uppercase tracking-wider shadow-[0_6px_16px_rgba(253,110,21,0.3)] transition-colors"
          >
            Get a Free Consultation
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/downloads"
            className="group inline-flex items-center gap-2.5 rounded-[4px] border border-[#134698] bg-white px-4 sm:px-5 py-2.5 text-[#134698] hover:bg-[#134698] hover:text-white text-[11px] sm:text-[11.5px] font-bold uppercase tracking-wider transition-colors"
          >
            Download Company Profile
            <Download className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* ── Right: office photo with the promises strip over its bottom ── */}
      <div className="relative flex flex-col min-h-[300px] sm:min-h-[380px] lg:min-h-0">
        <div className="relative flex-1 min-h-[300px] sm:min-h-[380px]">
          <Image
            src={visionImg}
            alt="Design House India office reception and showroom"
            fill
            placeholder="blur"
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover object-[30%_center]"
          />
        </div>

        <ul className="relative lg:absolute lg:bottom-0 lg:-left-4 min-[1440px]:-left-8 lg:right-0 grid grid-cols-1 sm:grid-cols-3 min-[1440px]:grid-cols-[auto_auto_auto] min-[1440px]:justify-between bg-[#0B2350]/95 lg:rounded-tl-xl px-4 sm:px-5 min-[1440px]:px-3 min-[1800px]:px-5 py-4 sm:py-5 gap-y-4">
          {PROMISES.map(({ img, title, desc, tail }, i) => (
            <li key={title} className={`flex items-start gap-3 min-[1366px]:gap-2 min-[1800px]:gap-3 sm:px-3 min-[1366px]:px-2 2xl:px-3 min-[1800px]:px-4 ${i > 0 ? "sm:border-l sm:border-white/20" : ""}`}>
              <span className="relative w-9 h-9 min-[1366px]:w-8 min-[1366px]:h-8 2xl:w-9 2xl:h-9 min-[1800px]:w-10 min-[1800px]:h-10 shrink-0">
                <Image src={img} alt="" fill sizes="40px" className="object-contain" />
              </span>
              <div className="min-w-0">
                <h3 className="text-[14px] min-[1366px]:text-[13.5px] 2xl:text-[14.5px] min-[1800px]:text-[15px] font-semibold text-white leading-tight whitespace-pre-line min-[1366px]:whitespace-pre mb-1.5">{title}</h3>
                <p className="text-[11.5px] xl:text-[12px] min-[1440px]:text-[11px] min-[1800px]:text-[12px] text-white/80 leading-snug">
                  {desc}
                  {tail && <br className="hidden min-[1440px]:inline" />}
                  {tail && <span className="min-[1440px]:hidden"> </span>}
                  {tail && <span className="min-[1440px]:whitespace-nowrap">{tail}</span>}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
