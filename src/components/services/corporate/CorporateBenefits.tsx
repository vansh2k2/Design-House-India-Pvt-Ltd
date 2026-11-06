import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import bgImg from "@/assets/banner/whobg.webp";
import type { CorporateDesign } from "./types";

type Benefits = CorporateDesign["benefits"];

/* "Why Choose Us" over a softly lit interior photo: a centred heading, frosted-glass cards (icon, an orange
   divider, title and text, with an orange edge on the top-left corner) and one button. Part of
   CorporatePage. */
const CorporateBenefits = ({ benefits }: { benefits: Benefits }) => (
  <section className="relative w-full overflow-hidden bg-[#F6F1EA]">
    <Image src={bgImg} alt="" aria-hidden="true" fill placeholder="blur" sizes="100vw" className="object-cover object-center" />
    {/* Lightens the photo behind the cards, mostly on small screens where they cover the furniture */}
    <div aria-hidden="true" className="absolute inset-0 bg-white/45 lg:bg-white/15" />

    <div className="relative mx-auto max-w-[1100px] px-4 pb-10 pt-6 sm:px-6 lg:px-8 lg:pb-12 lg:pt-7">
      <div className="text-center">
        <div className="flex items-center justify-center gap-3">
          <span className="h-[2px] w-10 rounded-full bg-[#F28C1B] sm:w-14" />
          <span className="text-[13px] sm:text-[15px] font-semibold uppercase tracking-[0.08em] text-[#0A2B5E]">{benefits.eyebrow ?? "Core Benefits"}</span>
          <span className="h-[2px] w-10 rounded-full bg-[#F28C1B] sm:w-14" />
        </div>
        <h2 className="mt-1.5 text-[30px] sm:text-[38px] lg:text-[44px] font-extrabold leading-[1.1] tracking-[-0.01em] text-[#0A2B5E]">
          {benefits.title[0]} <span className="text-[#F28C1B]">{benefits.title[1]}</span>
        </h2>
        <p className="mx-auto mt-2 max-w-[760px] text-[13.5px] sm:text-[14.5px] leading-[1.55] text-[#2E3A4E]">{benefits.text}</p>
      </div>

      <ul className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {benefits.items.map(({ icon: Icon, title, text }) => (
          <li
            key={title}
            className="relative flex items-center gap-4 rounded-[18px] border border-white/80 bg-white/60 px-5 py-5 shadow-[0_10px_30px_rgba(120,80,30,0.12)] backdrop-blur-md"
          >
            {/* Orange edge on the top-left corner, fading out along the top and the side */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -left-px -top-px h-[70px] w-[170px] rounded-tl-[18px] border-l-[3px] border-t-[3px] border-[#F28C1B]"
              style={{
                maskImage: "radial-gradient(170px 70px at 0 0, #000 45%, transparent 100%)",
                WebkitMaskImage: "radial-gradient(170px 70px at 0 0, #000 45%, transparent 100%)",
              }}
            />

            <span className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-full bg-[radial-gradient(circle,#FFFFFF_35%,#FCE6CC_100%)] ring-1 ring-[#F28C1B]/25 shadow-[0_0_18px_rgba(242,140,27,0.3)]">
              <Icon className="h-7 w-7 text-[#0A2B5E]" strokeWidth={1.5} />
            </span>
            <span aria-hidden="true" className="h-14 w-[2px] shrink-0 rounded-full bg-[#F28C1B]/80" />

            <div className="min-w-0">
              <h3 className="text-[15.5px] font-bold leading-tight text-[#0A2B5E]">{title}</h3>
              <p className="mt-1 text-[12.5px] leading-[1.45] text-[#3B4658]">{text}</p>
            </div>
          </li>
        ))}
      </ul>

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
