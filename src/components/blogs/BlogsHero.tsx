import Image from "next/image";
import { ArrowRight } from "lucide-react";

import heroBg from "@/assets/banner/blogsbg.webp";
import { HERO_ACCENT_SHADOW, HERO_BANNER_CSS, HERO_DESC_SHADOW, HERO_TITLE_SHADOW } from "@/components/common/heroBannerEffects";

const WORDS = ["Ideas", "Spaces", "Brands", "People"];

/* Banner: navy left side of the artwork carries the title and "Explore Articles"; four words sit over
   the restaurant photo on the right. */
const BlogsHero = () => (
  <section className="hero-banner relative w-full bg-[#0A2050] pt-[56px] sm:pt-[68px]">
    <style>{HERO_BANNER_CSS}</style>
    <div className="relative h-[300px] sm:h-[280px] lg:h-[300px] overflow-hidden">
      <Image src={heroBg} alt="" fill priority placeholder="blur" sizes="100vw" className="object-cover object-left sm:object-center" />
      {/* Light dark wash on the right edge, behind the four words */}
      <div className="hidden md:block absolute inset-y-0 right-0 w-[24%] bg-gradient-to-l from-black/45 to-transparent" />

      <div className="relative h-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        <div className="hb-blur-in flex items-center gap-3 mb-3" style={{ animationDelay: "0.15s" }}>
          <span className="w-8 h-[2px] bg-[#fd6e15]" />
          <span className="text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.3em] text-white">Our Blogs</span>
        </div>
        <h1
          className="text-[32px] sm:text-[40px] lg:text-[48px] font-serif font-medium leading-[1.06] text-white mb-3 [perspective:800px]"
          style={{ textShadow: HERO_TITLE_SHADOW }}
        >
          <span className="block overflow-hidden">
            <span className="hb-title-line" style={{ animationDelay: "0.2s" }}>Ideas Today</span>
          </span>
          <span className="block overflow-hidden" style={{ fontSize: "0.9em" }}>
            <span className="hb-title-line text-[#fd6e15]" style={{ animationDelay: "0.4s", textShadow: HERO_ACCENT_SHADOW }}>
              Better Spaces Tomorrow
            </span>
          </span>
        </h1>
        <p
          className="hb-desc-in text-[13.5px] sm:text-[15px] text-white/90 leading-relaxed max-w-[440px] mb-4"
          style={{ animationDelay: "0.45s", textShadow: HERO_DESC_SHADOW }}
        >
          Expert insights, design ideas and practical guidance to help you create functional, beautiful and future-ready
          spaces.
        </p>
        <a
          href="#latest-articles"
          style={{ animationDelay: "0.6s" }}
          className="hb-blur-in group self-start inline-flex items-center gap-2 rounded-md bg-[#E9902B] hover:bg-[#fd6e15] px-5 py-2.5 text-white text-[13px] font-semibold shadow-[0_6px_16px_rgba(233,144,43,0.35)] transition-colors"
        >
          Explore Articles
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>

      <ul className="hidden md:block absolute top-[22%] right-[5%] -rotate-6 space-y-1.5">
        {WORDS.map((w) => (
          <li key={w} className="text-white text-[20px] lg:text-[24px] uppercase tracking-[0.04em] leading-tight [text-shadow:0_2px_6px_rgba(0,0,0,0.5)]">
            {w}
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default BlogsHero;
