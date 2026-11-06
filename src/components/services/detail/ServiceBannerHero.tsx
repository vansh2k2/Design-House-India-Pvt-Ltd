import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { ServiceDetail } from "./types";

type Hero = ServiceDetail["hero"];

// The photo's own navy, so the text panel and the strip below run into it without a seam
const NAVY = "bg-[#002341]";
const GOLD = "text-[#F5A623]";

// look "home": the home page hero's eyebrow, heading and buttons, and its orange
const HOME_HERO = {
  accent: "text-[#fd6e15]",
  eyebrow: "text-[12px] sm:text-[13px] lg:text-[14px] uppercase tracking-[0.22em] font-bold text-white",
  heading: "mt-2 text-[34px] sm:text-[42px] lg:text-[38px] xl:text-[42px] 2xl:text-[48px] min-[1800px]:text-[56px] font-black uppercase leading-[1.02] tracking-[-0.01em]",
  // The text below the heading, a little smaller than the home sizes so the banner and its strip fit on one screen
  tagline: "text-[15px] sm:text-[16px] lg:text-[15px] xl:text-[16px] 2xl:text-[18px] min-[1800px]:text-[20px] font-semibold leading-snug",
  text: "text-[13.5px] sm:text-[14.5px] lg:text-[13px] xl:text-[13.5px] 2xl:text-[15px] min-[1800px]:text-[16.5px] text-white/95 leading-relaxed lg:leading-[1.55]",
  label: "text-[12.5px] lg:text-[11.5px] xl:text-[12px] 2xl:text-[13px] min-[1800px]:text-[14px] font-semibold leading-[1.2]",
  labelText: "text-[11px] lg:text-[10px] xl:text-[10.5px] 2xl:text-[11.5px] min-[1800px]:text-[12.5px] text-white/85 leading-snug",
  statValue: "text-[19px] lg:text-[17px] xl:text-[19px] 2xl:text-[21px] min-[1800px]:text-[23px] font-semibold leading-none",
  statLabel: "text-[10.5px] lg:text-[10.5px] xl:text-[11px] 2xl:text-[12px] min-[1800px]:text-[13px] font-semibold leading-tight",
  primary: "group inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-[3px] bg-[#fd6e15] px-3.5 sm:px-4 py-1.5 sm:py-2 text-[10.5px] sm:text-[11px] font-bold uppercase tracking-wider text-white shadow-[0_4px_12px_rgba(253,110,21,0.35)] hover:bg-[#e05d0e] transition-colors",
  secondary: "group inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-[3px] border-[1.5px] border-white/80 bg-black/30 backdrop-blur-sm px-3.5 sm:px-4 py-1.5 sm:py-2 text-[10.5px] sm:text-[11px] font-bold uppercase tracking-wider text-white hover:bg-white hover:text-[#0A2B5E] transition-colors",
};

// Thin gold curves in the strip's corners, carrying on the ones in the photo
const CornerCurves = ({ className }: { className: string }) => (
  <svg aria-hidden="true" viewBox="0 0 130 75" fill="none" preserveAspectRatio="none" className={`pointer-events-none absolute inset-y-0 hidden h-full w-[10vw] lg:block ${className}`}>
    <g stroke="#F5A623" strokeOpacity="0.55" strokeWidth="0.7">
      {[0, 6, 12, 18, 24].map((shift) => (
        <path key={shift} d={`M0 ${shift + 4} C ${34 + shift} ${shift + 2}, ${62 + shift} 30, ${78 + shift} 75`} />
      ))}
    </g>
  </svg>
);

/* Banner with the text on the photo: the photo fills the width, with its navy left side under the text, and a navy
   strip of figures runs below it. Everything scales with the screen, so it keeps the same look on any desktop.
   The photo is pinned to its left, so narrower screens lose some of the right of the photo but never the navy
   behind the text. Below lg the photo sits on top, showing its right side, with the text under it.
   look "home": the home page hero's eyebrow, heading, buttons and orange. */
const ServiceBannerHero = ({ hero, banner, look }: { hero: Hero; banner: NonNullable<Hero["banner"]>; look?: ServiceDetail["look"] }) => {
  const home = look === "home";
  const accent = home ? HOME_HERO.accent : GOLD;
  return (
  <section className="relative w-full bg-white pt-[56px] sm:pt-[68px]">
    {/* look home: as tall as the photo's shape allows, but no taller than the screen leaves under the header and above the
        strip of figures, so the whole banner fits one screen; never shorter than its text, which sits in its middle */}
    <div className={`relative ${home ? "lg:h-[min(35.83vw,calc(100svh-170px))] lg:min-h-fit lg:flex lg:flex-col lg:justify-center" : "lg:aspect-[1320/473]"} ${NAVY}`}>
      <div className="relative h-[240px] overflow-hidden sm:h-[340px] lg:absolute lg:inset-0 lg:h-auto">
        <Image src={hero.image} alt={banner.imageAlt} fill priority placeholder="blur" sizes="100vw" className={`object-cover object-right lg:object-left ${home ? "lg:object-left-top lg:!h-[117%]" : ""}`} />
        {/* look home: the photo runs past the bottom by its own dark band (its lowest 14%), so no empty navy shows under the buttons */}
        {/* look home: the navy runs a little further onto the photo, so all the text on it stays easy to read */}
        {home && <div aria-hidden="true" className="absolute inset-y-0 left-0 hidden w-[58%] bg-gradient-to-r from-[#002341] from-35% via-[#002341]/85 via-62% to-transparent lg:block" />}
      </div>

      <div className={`relative px-4 py-7 text-white sm:px-6 lg:px-0 lg:pl-[6.3vw] ${home ? "lg:pb-[1.6vw] lg:pt-[2.6vw]" : "lg:pb-[2.3vw] lg:pt-[3.9vw]"}`}>
        <div className="flex items-center gap-3 lg:gap-[1vw]">
          <span className={`h-[2px] w-8 lg:w-[2.65vw] ${home ? "bg-[#fd6e15]" : "bg-[#F5A623]"}`} />
          <span className={home ? HOME_HERO.eyebrow : `text-[12px] font-semibold uppercase tracking-[0.04em] lg:text-[clamp(11px,0.98vw,17px)] ${GOLD}`}>{hero.eyebrow}</span>
        </div>

        <h1 className={home ? HOME_HERO.heading : "mt-2 font-serif text-[38px] font-semibold leading-[1] sm:text-[44px] lg:mt-[0.6vw] lg:text-[clamp(32px,3.3vw,60px)] lg:leading-[0.98]"}>
          {hero.title[0]}
          <br />
          <span className={accent}>{hero.title[1]}</span>
        </h1>

        {hero.tagline && <p className={`mt-3 lg:mt-[0.9vw] ${home ? HOME_HERO.tagline : "text-[16px] font-semibold leading-snug lg:text-[clamp(14px,1.42vw,25px)]"}`}>{hero.tagline}</p>}

        <p className={`mt-3 max-w-[560px] lg:mt-[0.8vw] ${home ? "lg:max-w-[35vw]" : "lg:max-w-[31.5vw]"} ${home ? HOME_HERO.text : "text-[13px] leading-[1.45] text-white/90 lg:text-[clamp(11.5px,0.98vw,17px)] lg:leading-[1.27]"}`}>{hero.text}</p>

        <ul className={`mt-5 grid max-w-[560px] grid-cols-2 gap-y-5 sm:grid-cols-4 lg:max-w-none lg:gap-y-0 ${home ? "lg:mt-[1.2vw] lg:w-[39vw]" : "lg:mt-[1.7vw] lg:w-[37vw]"}`}>
          {hero.features.map(({ icon: Icon, label, text }, i) => (
            <li key={label} className={`px-1.5 text-center lg:px-[0.3vw] ${i > 0 ? "sm:border-l sm:border-white/25" : ""}`}>
              <span className={`mx-auto flex h-11 w-11 items-center justify-center rounded-full border ${home ? "lg:h-[clamp(28px,2.3vw,42px)] lg:w-[clamp(28px,2.3vw,42px)]" : "lg:h-[clamp(30px,2.8vw,50px)] lg:w-[clamp(30px,2.8vw,50px)]"} ${home ? "border-[#fd6e15]" : "border-[#F5A623]"}`}>
                <Icon className={`h-6 w-6 lg:h-[clamp(17px,1.6vw,28px)] lg:w-[clamp(17px,1.6vw,28px)] ${accent}`} strokeWidth={1.4} />
              </span>
              <p className={`mt-2 lg:mt-[0.5vw] ${home ? HOME_HERO.label : "text-[12px] font-bold leading-tight lg:text-[clamp(10px,0.8vw,14px)]"}`}>{label}</p>
              {text && <p className={`mt-1 lg:mt-[0.2vw] ${home ? HOME_HERO.labelText : "text-[11px] leading-[1.3] text-white/85 lg:text-[clamp(9.5px,0.76vw,13.5px)]"}`}>{text}</p>}
            </li>
          ))}
        </ul>

        <div className={`mt-6 flex gap-3 lg:gap-[2vw] ${home ? "lg:mt-[1.3vw]" : "lg:mt-[1.8vw]"}`}>
          <Link
            href={hero.primaryCta?.href ?? "/contact"}
            className={home ? HOME_HERO.primary : "group inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-[3px] bg-[#fd6e15] text-[12px] font-semibold uppercase tracking-[0.03em] text-white transition-colors hover:bg-[#e05d0e] sm:w-[170px] sm:flex-none lg:h-[clamp(32px,2.6vw,46px)] lg:w-[clamp(120px,11.5vw,200px)] lg:text-[clamp(10.5px,0.86vw,15px)]"}
          >
            {hero.primaryCta?.label ?? "Enquire Now"}
            <ArrowRight className={home ? "w-3.5 h-3.5 transition-transform group-hover:translate-x-1" : "h-4 w-4 transition-transform group-hover:translate-x-1"} />
          </Link>
          <Link
            href={hero.secondaryCtaLink?.href ?? "/portfolio"}
            className={home ? HOME_HERO.secondary : "group inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-[3px] border border-white text-[12px] font-semibold uppercase tracking-[0.03em] text-white transition-colors hover:bg-white hover:text-[#002341] sm:w-[170px] sm:flex-none lg:h-[clamp(32px,2.6vw,46px)] lg:w-[clamp(124px,12.1vw,210px)] lg:text-[clamp(10.5px,0.86vw,15px)]"}
          >
            {hero.secondaryCtaLink?.label ?? "View Projects"}
            <ArrowRight className={home ? "w-3.5 h-3.5 transition-transform group-hover:translate-x-1" : "h-4 w-4 transition-transform group-hover:translate-x-1"} />
          </Link>
        </div>
      </div>
    </div>

    <div className={`relative overflow-hidden border-t border-white/30 ${NAVY}`}>
      <CornerCurves className="left-0" />
      <CornerCurves className="right-0 -scale-x-100" />

      <ul className={`relative grid grid-cols-2 gap-y-5 px-4 py-5 sm:px-6 lg:grid-cols-4 lg:gap-y-0 lg:px-[8vw] ${home ? "lg:py-[0.9vw]" : "lg:py-[1.25vw]"}`}>
        {banner.stats.map(({ icon: Icon, value, label }, i) => (
          <li key={value} className={`flex items-center gap-3 lg:justify-center lg:gap-[1.1vw] ${i > 0 ? "lg:border-l lg:border-white/25" : ""}`}>
            <Icon className={`h-8 w-8 shrink-0 ${home ? "lg:h-[clamp(24px,2.1vw,38px)] lg:w-[clamp(24px,2.1vw,38px)]" : "lg:h-[clamp(26px,2.5vw,44px)] lg:w-[clamp(26px,2.5vw,44px)]"} ${accent}`} strokeWidth={1.3} />
            <div className="min-w-0 text-white">
              <p className={home ? HOME_HERO.statValue : "text-[14px] font-semibold leading-tight lg:text-[clamp(13px,1.2vw,21px)]"}>{value}</p>
              <p className={home ? `mt-1 text-white/85 ${HOME_HERO.statLabel}` : "text-[11.5px] leading-tight text-white/85 lg:mt-[0.15vw] lg:text-[clamp(10.5px,0.93vw,16px)]"}>{label}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </section>
  );
};

export default ServiceBannerHero;
