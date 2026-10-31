import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CircleCheck } from "lucide-react";

import CountUp from "./CountUp";
import { HOME_SECTION_DEFAULTS, type StrengthsContent } from "@/lib/homeSections";
import { RichText, parseStat, sectionIcon } from "../sectionContent";

/* Photo cut on a diagonal: its left edge runs from the top-left corner down to DIAG_BOTTOM along the
   bottom. An orange band sits just left of that edge (same slope), fading out towards the bottom. */
const DIAG_BOTTOM = "30%";
const BORDER = "10px";

// Number badges on the cards alternate navy / orange
const BADGES = ["bg-[#0A2B5E]", "bg-[#fd6e15]"];

const orange = (part: string, key: number) => (
  <span key={key} className="text-[#fd6e15]">
    {part}
  </span>
);

/* "Our Strengths": heading, three strength cards and a CTA band on the left; the office reception
   photo on the right (xl+) with four stat cards over it.
   Content: edited in the admin (Pages & CMS → Home → Our Strengths). */
const OurStrengths = ({ data = HOME_SECTION_DEFAULTS.strengths }: { data?: StrengthsContent }) => (
  <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#F3F6FB] via-[#F8FAFD] to-white">
    <div className="relative">
      {/* ── Right photo with diagonal cut + orange border (xl+) ── */}
      <div className="hidden xl:block absolute top-0 bottom-0 right-0 w-[48%]" aria-hidden="true">
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#fd6e15] via-[#fd6e15] via-25% to-transparent to-50%"
          style={{ clipPath: `polygon(0 0, 100% 0, 100% 100%, ${DIAG_BOTTOM} 100%)` }}
        />
        <div
          className="absolute inset-0"
          style={{ clipPath: `polygon(${BORDER} 0, 100% 0, 100% 100%, calc(${DIAG_BOTTOM} + ${BORDER}) 100%)` }}
        >
          {/* Taller than the frame and pinned to its bottom, so the photo sits a little higher */}
          <div className="absolute inset-x-0 -top-12 bottom-0">
            <Image src={data.image} alt={data.imageAlt || ""} fill sizes="48vw" className="object-cover object-[35%_center]" />
          </div>
        </div>
      </div>

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 lg:pt-7 pb-5 flex flex-col xl:flex-row xl:items-center gap-6 xl:gap-8">
        {/* ── Left: heading + cards ── */}
        <div className="xl:flex-1 xl:max-w-[1000px] min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-5 h-[2.5px] bg-[#fd6e15] rounded-full inline-block" />
            <span className="text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.2em] text-[#fd6e15]">{data.eyebrow}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-medium leading-[1.08] tracking-tight mb-2.5 text-[#0A2B5E]">
            <RichText text={data.heading} accent={orange} />
          </h2>
          <p className="text-[13.5px] sm:text-[14.5px] text-[#333] leading-relaxed max-w-[700px] mb-5">{data.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {data.cards.map(({ title, tagline, icon, image, imageAlt, points }, i) => {
              const Icon = sectionIcon(icon);
              return (
                <article
                  key={`${title}-${i}`}
                  className="relative rounded-md bg-white p-1.5 shadow-[rgba(0,0,0,0.02)_0px_1px_3px_0px,rgba(27,31,35,0.15)_0px_0px_0px_1px]"
                >
                  <div className="relative h-[100px] xl:h-[105px] rounded-[4px] overflow-hidden">
                    <Image src={image} alt={imageAlt || title.replace(/\n/g, " ")} fill sizes="(min-width: 768px) 22vw, 100vw" className="object-cover" />
                    <span className={`absolute top-0 left-0 ${BADGES[i % 2]} text-white text-[12px] font-bold leading-none px-2 py-1.5 rounded-br-md`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="px-2 pt-2.5 pb-2">
                    <div className="flex items-center gap-2.5 mb-2">
                      <span className="w-10 h-10 shrink-0 rounded-full bg-[#FFEEE3] flex items-center justify-center">
                        <Icon className="w-5 h-5 text-[#fd6e15]" strokeWidth={1.7} />
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-[14px] xl:text-[15px] font-bold text-[#0A2B5E] leading-tight mb-0.5 whitespace-pre-line">{title}</h3>
                        <p className="text-[10.5px] text-[#46658C] leading-snug">{tagline}</p>
                      </div>
                    </div>
                    <ul className="space-y-0.5">
                      {points.map((point, k) => (
                        <li key={`${point}-${k}`} className="flex items-start gap-1.5 text-[11px] text-[#2B2B2B] font-semibold leading-snug min-[1400px]:whitespace-nowrap">
                          <CircleCheck className="w-3 h-3 mt-[2px] shrink-0 fill-[#fd6e15] text-white" strokeWidth={2.5} />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* ── Right: stat cards (over the photo on xl+) ── */}
        <ul className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-1 gap-2 xl:ml-auto xl:w-[165px] xl:mr-[25px] 2xl:w-[175px] 2xl:mr-[30px] xl:translate-y-[72px]">
          {data.stats.map(({ icon, value, label }, i) => {
            const Icon = sectionIcon(icon);
            const stat = parseStat(value); // numbers count up; text (e.g. "Pan India") is shown as-is
            return (
              <li
                key={`${label}-${i}`}
                className="flex items-center gap-2.5 rounded-md bg-white/95 backdrop-blur-sm px-3.5 py-2 shadow-[0_8px_24px_-10px_rgba(10,43,94,0.35)] ring-1 ring-[rgba(27,31,35,0.08)]"
              >
                <Icon className="w-5 h-5 shrink-0 text-[#fd6e15]" strokeWidth={1.6} />
                <div className="min-w-0">
                  <p className="text-[16px] xl:text-[17px] font-bold text-[#0A2B5E] leading-none mb-1">
                    {stat ? <CountUp end={stat.end} suffix={stat.suffix} /> : value}
                  </p>
                  <p className="text-[11px] text-[#46658C] leading-tight">{label}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>

    {/* ── CTA band ── */}
    <div className="relative -mt-3 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-5">
      <div className="rounded-md bg-gradient-to-r from-[#0A2B5E] via-[#0D2F68] to-[#123A7A] px-5 sm:px-8 lg:px-12 py-4 flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
        <div className="shrink-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-5 h-[2px] bg-[#fd6e15] rounded-full inline-block" />
            <span className="text-[10.5px] font-bold uppercase tracking-[0.18em] text-white/90">{data.cta.eyebrow}</span>
          </div>
          <h3 className="text-[24px] sm:text-[28px] font-serif font-medium leading-tight text-white">
            <RichText text={data.cta.heading} accent={orange} />
          </h3>
        </div>
        <span className="hidden lg:block w-px h-11 bg-white/25 shrink-0" />
        <p className="text-[13px] sm:text-[14px] text-white/90 leading-snug max-w-[480px]">{data.cta.text}</p>
        {data.cta.buttonLabel && (
          <Link
            href={data.cta.buttonHref || "/contact"}
            className="group lg:ml-auto self-start lg:self-center shrink-0 inline-flex items-center justify-center gap-2.5 min-w-[180px] rounded-[4px] bg-[#fd6e15] hover:bg-[#e05d0e] px-6 py-3 text-white text-[13.5px] font-semibold shadow-[0_6px_16px_rgba(253,110,21,0.3)] transition-colors"
          >
            {data.cta.buttonLabel}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        )}
      </div>
    </div>
  </section>
);

export default OurStrengths;
