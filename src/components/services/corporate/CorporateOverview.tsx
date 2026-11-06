import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { CorporateDesign } from "./types";

type Overview = CorporateDesign["overview"];

/* Overview: text, a row of centred points with dividers and two buttons on the left; the photo on the
   right, anchored left so its curved, faded edge always shows (the right side is what gets cropped). */
const CorporateOverview = ({ overview }: { overview: Overview }) => (
  <section className="relative w-full overflow-hidden bg-white">
    <div className="relative h-[260px] sm:h-[380px] lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[52%]">
      <Image src={overview.image} alt="" fill placeholder="blur" sizes="(min-width: 1024px) 52vw, 100vw" className="object-cover object-left" />
    </div>

    <div className="relative mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8 lg:py-[3vw]">
      <div className="lg:w-[48%] lg:pl-[2.5vw] lg:pr-6 2xl:pl-[3vw]">
        <div className="flex items-center gap-3">
          <span className="h-[3px] w-8 rounded-full bg-[#F28C1B]" />
          <span className="text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.12em] text-[#0A2B5E]">{overview.eyebrow}</span>
        </div>

        <h2 className="mt-3 font-serif text-[34px] sm:text-[42px] lg:text-[clamp(36px,3.3vw,54px)] font-bold leading-[1.05] text-[#0A2B5E]">
          {overview.title[0]}
          <br />
          <span className="relative inline-block pb-2 italic text-[#F28C1B]">
            {overview.title[1]}
            {/* Brush stroke under the second line */}
            <svg aria-hidden="true" viewBox="0 0 300 14" preserveAspectRatio="none" className="absolute -bottom-0.5 left-[4%] h-[9px] w-[92%] text-[#F28C1B]">
              <path d="M3 10C70 3 170 1 297 6C200 5 100 7 3 12Z" fill="currentColor" />
            </svg>
          </span>
        </h2>

        <p className="mt-5 max-w-[540px] text-[14px] sm:text-[15px] leading-[1.6] text-[#3B4658]">{overview.text}</p>

        <ul className="mt-7 grid grid-cols-2 gap-y-6 sm:grid-cols-4 lg:max-w-[600px]">
          {overview.points.map(({ icon: Icon, title }, i) => (
            <li key={title} className={`px-1.5 py-1 text-center ${i % 2 ? "border-l border-[#E3E6EC]" : ""} ${i > 0 ? "sm:border-l sm:border-[#E3E6EC]" : ""}`}>
              <Icon className="mx-auto h-10 w-10 text-[#F28C1B] 2xl:h-11 2xl:w-11" strokeWidth={1.5} />
              {/* Each line of the title stays whole, so it reads in two lines as written */}
              <h3 className="mt-4 text-[14px] lg:text-[12.5px] xl:text-[14.5px] 2xl:text-[15.5px] font-bold leading-[1.3] text-[#0A2B5E]">
                {title.split("\n").map((line) => (
                  <span key={line} className="block sm:max-lg:whitespace-nowrap xl:whitespace-nowrap">
                    {line}
                  </span>
                ))}
              </h3>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-5">
          <Link
            href={overview.buttons.primary.href}
            className="group inline-flex h-[42px] items-center justify-center gap-2.5 whitespace-nowrap rounded-[8px] bg-[#F7830F] px-5 text-[13px] lg:px-4 lg:text-[12px] xl:px-5 xl:text-[13px] font-semibold text-white shadow-[0_6px_16px_rgba(247,131,15,0.25)] transition-colors hover:bg-[#E06F00]"
          >
            {overview.buttons.primary.label}
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href={overview.buttons.secondary.href}
            className="group inline-flex h-[42px] items-center justify-center gap-2.5 whitespace-nowrap rounded-[8px] border-[1.5px] border-[#0A2B5E] px-6 text-[13px] lg:px-4 lg:text-[12px] xl:px-6 xl:text-[13px] font-semibold text-[#0A2B5E] transition-colors hover:bg-[#0A2B5E] hover:text-white"
          >
            {overview.buttons.secondary.label}
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default CorporateOverview;
