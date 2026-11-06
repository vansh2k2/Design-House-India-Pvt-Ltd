import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import bgImg from "@/assets/banner/whobg.webp";
import BenefitsReveal from "./BenefitsReveal";
import type { CorporateDesign } from "./types";

type Benefits = CorporateDesign["benefits"];

/* "Why Choose Us" over a softly lit interior photo: a centred heading, frosted-glass cards (icon, an orange
   divider, title and text, with an orange edge on the top-left corner) and one button. Part of
   CorporatePage. */
const CorporateBenefits = ({ benefits }: { benefits: Benefits }) => (
  <section className="relative w-full overflow-hidden bg-[#F6F1EA]">
    <Image src={benefits.background ?? bgImg} alt="" aria-hidden="true" fill placeholder="blur" sizes="100vw" className="object-cover object-center" />
    {/* Lightens the photo behind the cards, mostly on small screens where they cover the furniture */}
    <div aria-hidden="true" className="absolute inset-0 bg-white/45 lg:bg-white/15" />

    <div className="relative mx-auto max-w-[1100px] px-4 pb-10 pt-6 sm:px-6 lg:px-8 lg:pb-12 lg:pt-7">
      <div className="text-center">
        <div className="flex items-center justify-center gap-3">
          <span className="h-[2px] w-10 rounded-full bg-[#F28C1B] sm:w-14" />
          <span className="text-[13px] sm:text-[15px] font-semibold uppercase tracking-[0.08em] text-[#0A2B5E]">{benefits.eyebrow ?? "Core Benefits"}</span>
          <span className="h-[2px] w-10 rounded-full bg-[#F28C1B] sm:w-14" />
        </div>
        <h2 className="mt-1.5 text-[30px] sm:text-[38px] lg:text-[44px] font-serif font-medium leading-[1.1] tracking-[-0.01em] text-[#0A2B5E]">
          {benefits.title[0]} <span className="text-[#F28C1B]">{benefits.title[1]}</span>
        </h2>
        <p className="mx-auto mt-2 max-w-[760px] text-[13.5px] sm:text-[14.5px] leading-[1.55] text-[#2E3A4E]">{benefits.text}</p>
      </div>

      {/* The cards come in one by one as they scroll into view (BenefitsReveal) */}
      <BenefitsReveal className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {benefits.items.map(({ icon: Icon, title, text }) => (
          <li
            key={title}
            className="group relative flex items-center gap-4 rounded-[24px] border border-white/90 bg-gradient-to-br from-white/90 via-white/70 to-white/55 px-5 py-6 shadow-[0_16px_34px_-12px_rgba(150,95,30,0.35),inset_0_1px_0_rgba(255,255,255,0.95),inset_0_-1px_0_rgba(255,255,255,0.6)] backdrop-blur-xl transition-[translate,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_22px_40px_-12px_rgba(200,120,30,0.45),inset_0_1px_0_rgba(255,255,255,0.95)] xl:px-6"
          >
            {/* Gold swoosh on the top-left corner: thick at the corner, thinning out along the top and down the side */}
            <svg
              aria-hidden="true"
              viewBox="0 0 190 64"
              className="bf-swoosh pointer-events-none absolute -left-px -top-px h-[64px] w-[190px]"
              style={{
                maskImage: "radial-gradient(190px 64px at 0 0, #000 40%, transparent 100%)",
                WebkitMaskImage: "radial-gradient(190px 64px at 0 0, #000 40%, transparent 100%)",
              }}
            >
              <path d="M0 64V24A24 24 0 0 1 24 0H190C140 1.5 84 2.5 50 5 22 7 8 14 5 34L3 64Z" fill="#EE9A2E" />
            </svg>

            {/* Warm glow along the lower-right edge, as if lit from behind */}
            <span
              aria-hidden="true"
              className="bf-glow pointer-events-none absolute -bottom-px -right-px h-[75%] w-[70%] rounded-br-[24px] border-b-[2.5px] border-r-[2.5px] border-[#F4A445] shadow-[8px_8px_18px_-8px_rgba(242,140,27,0.7)]"
              style={{
                maskImage: "radial-gradient(100% 100% at 100% 100%, #000 45%, transparent 100%)",
                WebkitMaskImage: "radial-gradient(100% 100% at 100% 100%, #000 45%, transparent 100%)",
              }}
            />

            <span className="bf-icon relative flex h-[64px] w-[64px] shrink-0 items-center justify-center rounded-full bg-[radial-gradient(circle_at_40%_35%,#FFFDF8_0%,#FFF1DA_55%,#FAD9A4_100%)] shadow-[0_0_0_1px_rgba(255,255,255,0.9),0_6px_18px_rgba(232,150,40,0.3)] transition-transform duration-300 group-hover:scale-105">
              <Icon className="h-[30px] w-[30px] text-[#14213D]" strokeWidth={1.4} />
            </span>
            <span aria-hidden="true" className="bf-divider h-16 w-[1.5px] shrink-0 rounded-full bg-gradient-to-b from-[#F28C1B]/25 via-[#F28C1B] to-[#F28C1B]/25" />

            <div className="relative min-w-0">
              <h3 className="bf-rise text-[15.5px] font-bold leading-tight text-[#0A2B5E]">{title}</h3>
              <p style={{ "--bf-step": 1 } as React.CSSProperties} className="bf-rise mt-1.5 text-[12.5px] leading-[1.5] text-[#26324A]">
                {text}
              </p>
            </div>
          </li>
        ))}
      </BenefitsReveal>

      {benefits.cta && (
        <div className="mt-8 text-center">
          <Link
            href={benefits.cta.href}
            className="group inline-flex items-center gap-3 rounded-[10px] bg-gradient-to-b from-[#F59A35] to-[#E57A0E] px-7 py-3 text-[14px] sm:text-[15px] font-semibold text-white shadow-[0_6px_18px_rgba(229,122,14,0.4)] transition-shadow hover:shadow-[0_8px_24px_rgba(229,122,14,0.55)]"
          >
            {benefits.cta.label}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      )}
    </div>
  </section>
);

export default CorporateBenefits;
