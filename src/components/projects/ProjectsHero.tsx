import Image from "next/image";

import { PHOTOS } from "./data";
import { CONTAINER, CtaButton } from "./ui";

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

    <div className={`relative ${CONTAINER} py-10 lg:py-0 lg:min-h-[480px] lg:flex lg:items-center`}>
      <div className="lg:w-[40%] lg:pl-12">
        {/* Tagline, title and intro use the home hero's type */}
        <div className="flex items-center gap-2.5 text-[12px] sm:text-[13px] lg:text-[14px] uppercase tracking-[0.22em] font-bold text-white mb-2 sm:mb-2.5">
          <span className="w-6 h-[2.5px] bg-[#fd6e15] rounded-full inline-block" />
          Our Projects
        </div>
        <h1 className="text-[34px] sm:text-[42px] lg:text-[46px] xl:text-[52px] 2xl:text-[56px] font-black uppercase leading-[1.02] tracking-[-0.01em] text-white mb-2.5">
          Spaces
          <br />
          That <span className="text-[#fd6e15] tracking-tight">Inspire</span>
        </h1>
        <p className="text-[16px] sm:text-[18px] font-bold text-white mb-2.5">From Vision to Reality</p>
        <p className="text-[14px] sm:text-[15.5px] lg:text-[16px] xl:text-[16.5px] text-white/95 leading-relaxed max-w-[430px] mb-5">
          Explore our portfolio of thoughtfully designed and expertly executed spaces across industries. Each project
          reflects our commitment to functionality, aesthetics and long-term value.
        </p>
        <CtaButton href="/contact">Discuss Your Project</CtaButton>
      </div>

      {/* Photo on phones/tablets */}
      <div className="lg:hidden relative aspect-[16/9] mt-8 rounded-md overflow-hidden">
        <Image src={PHOTOS.heroReception} alt="Design House India reception lobby" fill sizes="100vw" className="object-cover object-[70%_center]" />
      </div>
    </div>
  </section>
);

export default ProjectsHero;
