import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { HERO_ACCENT_SHADOW, HERO_DESC_SHADOW, HERO_TITLE_SHADOW } from "@/components/common/heroBannerEffects";

import { PHOTOS } from "./data";
import { CONTAINER } from "./ui";

/* Dark navy hero; the reception photo fills the right two-thirds, cut on a diagonal (top edge further right than the
   bottom) with a thin orange band along the cut. */
const CUT_TOP = "23%";
const BORDER = "0.45%";

// Faint gold leaf outlines in the bottom-left corner
const Leaves = () => (
  <svg
    className="absolute left-0 bottom-0 w-[260px] h-[220px] text-[#C98A45] opacity-[0.12] pointer-events-none"
    viewBox="0 0 260 220"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    aria-hidden="true"
  >
    <path d="M20 220 C40 160 70 120 120 90" />
    <path d="M120 90 C100 70 70 72 52 96 C74 104 98 102 120 90Z" />
    <path d="M92 112 C80 82 92 56 118 46 C122 74 112 98 92 112Z" />
    <path d="M64 146 C40 128 14 132 0 150 C22 164 46 162 64 146Z" />
    <path d="M50 176 C58 146 84 130 110 136 C100 160 78 176 50 176Z" />
    <path d="M150 220 C160 180 190 150 230 140" />
    <path d="M230 140 C214 120 186 122 172 146 C192 154 214 152 230 140Z" />
    <path d="M190 172 C186 146 200 126 226 120" />
  </svg>
);

const ProjectsHero = () => (
  <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#000A1C] via-[#03142F] to-[#0A2350] pt-[56px] sm:pt-[68px]">
    <Leaves />

    {/* ── Photo (lg+) ── */}
    <div className="hidden lg:block absolute top-[56px] sm:top-[68px] bottom-0 right-0 w-[66%]" aria-hidden="true">
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#fd6e15] to-[#F6B27A]"
        style={{ clipPath: `polygon(${CUT_TOP} 0, 100% 0, 100% 100%, 0 100%)` }}
      />
      <div
        className="absolute inset-0"
        style={{ clipPath: `polygon(calc(${CUT_TOP} + ${BORDER}) 0, 100% 0, 100% 100%, ${BORDER} 100%)` }}
      >
        <Image src={PHOTOS.heroReception} alt="" fill priority sizes="(min-width: 1024px) 66vw, 100vw" className="object-cover" />
      </div>
    </div>

    <div className={`relative ${CONTAINER} py-10 lg:py-5 lg:min-h-[300px] lg:flex lg:items-center`}>
      <div className="lg:w-[40%]">
        {/* Gold eyebrow line, white serif title with "Inspire" in gold, bold tagline, short text and a gold button */}
        <div className="flex items-center gap-3 mb-3">
          <span className="w-8 h-[2px] bg-[#E8A64C]" />
          <span className="text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.3em] text-white">Our Projects</span>
        </div>
        <h1
          className="text-[38px] sm:text-[48px] lg:text-[56px] font-serif font-medium leading-[1.04] text-white mb-3"
          style={{ textShadow: HERO_TITLE_SHADOW }}
        >
          Spaces
          <br />
          That{" "}
          <span className="text-[#E8A64C]" style={{ textShadow: HERO_ACCENT_SHADOW }}>
            Inspire
          </span>
        </h1>
        <p className="text-[17px] sm:text-[20px] font-bold text-white mb-3">From Vision to Reality</p>
        <p
          className="text-[13.5px] sm:text-[14.5px] text-white/90 leading-relaxed max-w-[400px] mb-5"
          style={{ textShadow: HERO_DESC_SHADOW }}
        >
          Explore our portfolio of thoughtfully designed and expertly executed spaces across industries. Each project
          reflects our commitment to functionality, aesthetics and long-term value.
        </p>
        <Link
          href="/contact"
          className="group inline-flex items-center justify-center gap-2 min-w-[190px] rounded-md bg-[#E8A64C] hover:bg-[#D9963B] px-6 py-3 text-white text-[13px] font-semibold shadow-[0_6px_16px_rgba(232,166,76,0.35)] transition-colors"
        >
          Discuss Your Project
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Photo on phones/tablets */}
      <div className="lg:hidden relative aspect-[16/9] mt-8 rounded-md overflow-hidden">
        <Image src={PHOTOS.heroReception} alt="Design House India reception lobby" fill sizes="100vw" className="object-cover object-[70%_center]" />
      </div>
    </div>
  </section>
);

export default ProjectsHero;
