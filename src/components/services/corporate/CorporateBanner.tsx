import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { HERO_ACCENT_SHADOW, HERO_BANNER_CSS, HERO_DESC_SHADOW, HERO_TITLE_SHADOW } from "@/components/common/heroBannerEffects";
import CountUp from "@/components/home/strengths/CountUp";
import curveLeft from "@/assets/icon/oc.png";
import curveRight from "@/assets/icon/oc1.png";
import type { ServiceDetail } from "../detail/types";
import type { CorporateDesign } from "./types";

type Hero = ServiceDetail["hero"];
type Banner = CorporateDesign["banner"];

// A figure that starts with a number ("21+ Years", "500+") counts up to it when the strip comes into view;
// the others ("End-to-End") show as they are
const counted = (value: string) => {
  const match = value.match(/^(\d[\d,]*)(.*)$/);
  return match ? <CountUp end={Number(match[1].replace(/,/g, ""))} suffix={match[2]} duration={2000} /> : value;
};

/* Full-width navy banner: a background photo that already fades to navy on the left, the text over that navy
   part, and a strip of figures underneath with gold curves in its two corners. Part of CorporatePage.
   */
const CorporateBanner = ({ hero, banner }: { hero: Hero; banner: Banner }) => (
  <section className="hero-banner relative w-full bg-[#0B1F3F] pt-[56px] sm:pt-[68px]">
    <style>{HERO_BANNER_CSS}</style>
    {/* Banner */}
    <div className="relative overflow-hidden lg:min-h-[33.3vw]">
      {/* Anchored left on large screens, so the navy part stays behind the text when the banner grows taller */}
      <Image
        src={banner.background}
        alt={banner.imageAlt}
        fill
        priority
        placeholder="blur"
        sizes="100vw"
        className="object-cover object-[78%_center] lg:object-left"
      />
      {/* Keeps the text readable where the photo sits behind it on small screens */}
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-[#0B1F3F] via-[#0B1F3F]/90 to-[#0B1F3F]/55 lg:hidden" />
      {/* On wide screens, when asked: the navy runs further onto the photo, so the text over it stays readable */}
      {banner.textShade && (
        <div aria-hidden="true" className="absolute inset-y-0 left-0 hidden w-[58%] bg-gradient-to-r from-[#0B1F3F]/90 from-25% via-[#0B1F3F]/65 via-55% to-transparent lg:block" />
      )}

      <div className="relative px-4 py-10 sm:px-6 sm:py-12 lg:w-[43%] lg:py-[1.8vw] lg:pl-[6.3vw] lg:pr-0">
        {/* Text colours, shadows and entrance effects as on the About Us banner */}
        <p className="hb-blur-in text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.25em] text-white" style={{ animationDelay: "0.15s" }}>
          {hero.eyebrow}
        </p>
        <span className="hb-blur-in mt-2.5 block h-[3px] w-[86px] rounded-full bg-[#fd6e15]" style={{ animationDelay: "0.2s" }} />

        <h1
          className="mt-4 lg:mt-2.5 font-serif text-[38px] sm:text-[46px] lg:text-[clamp(36px,3.5vw,58px)] font-medium leading-[1.05] tracking-tight text-white [perspective:800px]"
          style={{ textShadow: HERO_TITLE_SHADOW }}
        >
          <span className="block overflow-hidden">
            <span className="hb-title-line" style={{ animationDelay: "0.25s" }}>
              {hero.title[0]}
            </span>
          </span>
          <span className="block overflow-hidden">
            <span className="hb-title-line text-[#fd6e15]" style={{ animationDelay: "0.4s", textShadow: HERO_ACCENT_SHADOW }}>
              {hero.title[1]}
            </span>
          </span>
        </h1>

        {hero.tagline && (
          <p
            className="hb-blur-in mt-3 lg:mt-2 text-[16px] sm:text-[18px] 2xl:text-[20px] font-semibold leading-snug text-white"
            style={{ animationDelay: "0.5s", textShadow: HERO_DESC_SHADOW }}
          >
            {hero.tagline}
          </p>
        )}

        <p
          className="hb-desc-in mt-2 max-w-[470px] text-[13px] lg:max-w-[34vw] 2xl:text-[15px] leading-[1.5] text-white/90"
          style={{ animationDelay: "0.6s", textShadow: HERO_DESC_SHADOW }}
        >
          {hero.text}
        </p>

        {/* The first column is wider, so "End-to-end workspace" fits on one line. Pulled a little left on large
            screens, so the first item's text lines up closer with the text above */}
        <ul className="mt-5 lg:mt-4 grid grid-cols-2 gap-y-5 sm:grid-cols-4 lg:-ml-3 lg:max-w-[38vw] lg:grid-cols-[1.3fr_1fr_1fr_1.15fr] 2xl:mt-6">
          {hero.features.map(({ icon: Icon, label, text }, i) => (
            <li key={label} className={`relative px-1.5 text-center ${i % 2 ? "border-l border-white/20" : ""} ${i > 0 ? "sm:border-l sm:border-white/20" : ""}`}>
              <span className="mx-auto flex h-[44px] w-[44px] items-center justify-center rounded-full ring-1 ring-[#F5A23A]/80 2xl:h-[52px] 2xl:w-[52px]">
                <Icon className="h-[24px] w-[24px] text-[#F5A23A] 2xl:h-[28px] 2xl:w-[28px]" strokeWidth={1.4} />
              </span>
              <p className="mt-2 text-[12px] xl:whitespace-nowrap xl:text-[11.5px] 2xl:text-[13px] font-bold leading-tight text-white">{label}</p>
              {/* Text with a line break keeps each of its lines whole */}
              {text && (
                <p className="mt-1 text-[11px] 2xl:text-[12px] leading-[1.35] text-white/75 [text-wrap:balance]">
                  {text.includes("\n")
                    ? text.split("\n").map((line) => (
                        <span key={line} className="block whitespace-nowrap">
                          {line}
                        </span>
                      ))
                    : text}
                </p>
              )}
            </li>
          ))}
        </ul>

        <div className="mt-6 lg:mt-5 flex gap-3 2xl:mt-6 2xl:gap-4">
          <Link
            href={hero.primaryCta?.href ?? "/contact"}
            className="group inline-flex h-[44px] flex-1 items-center justify-center gap-2 rounded-[4px] bg-[#fd6e15] text-[12px] font-semibold uppercase tracking-[0.04em] text-white transition-colors hover:bg-[#e05d0e] sm:w-[170px] sm:flex-none 2xl:h-[48px] 2xl:w-[190px] 2xl:text-[13px]"
          >
            {hero.primaryCta?.label ?? "Enquire Now"}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href={hero.secondaryCtaLink?.href ?? "/portfolio"}
            className="group inline-flex h-[44px] flex-1 items-center justify-center gap-2 rounded-[4px] border border-white/80 text-[12px] font-semibold uppercase tracking-[0.04em] text-white transition-colors hover:bg-white hover:text-[#0B1F3F] sm:w-[170px] sm:flex-none 2xl:h-[48px] 2xl:w-[190px] 2xl:text-[13px]"
          >
            {hero.secondaryCtaLink?.label ?? "View Projects"}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>

    {/* Figures */}
    <div className="relative overflow-hidden border-t border-white/25 bg-[#0B1F3F]">
      <Image src={curveLeft} alt="" aria-hidden="true" sizes="260px" className="pointer-events-none absolute bottom-0 left-0 h-full w-auto max-w-none opacity-80 sm:opacity-100" />
      <Image src={curveRight} alt="" aria-hidden="true" sizes="260px" className="pointer-events-none absolute bottom-0 right-0 h-full w-auto max-w-none opacity-80 sm:opacity-100" />

      <ul className="relative mx-auto grid max-w-[1100px] grid-cols-2 gap-y-5 px-4 py-5 sm:px-6 lg:grid-cols-4 lg:gap-y-0 lg:py-4 2xl:py-5">
        {banner.stats.map(({ icon: Icon, value, label }, i) => (
          <li key={value + label} className={`flex items-center justify-center gap-3 2xl:gap-4 ${i > 0 ? "lg:border-l lg:border-white/25" : ""}`}>
            <Icon className="h-8 w-8 shrink-0 text-[#F5A23A] 2xl:h-10 2xl:w-10" strokeWidth={1.4} />
            <div className="min-w-0">
              <p className="text-[15px] font-bold leading-tight tabular-nums text-white 2xl:text-[18px]">{counted(value)}</p>
              <p className="text-[12px] leading-tight text-white/85 2xl:text-[14px]">{label}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default CorporateBanner;
