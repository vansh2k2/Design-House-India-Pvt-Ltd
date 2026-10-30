import Image from "next/image";

import heroBg from "@/assets/banner/services.webp";
import { HERO_ACCENT_SHADOW, HERO_BANNER_CSS, HERO_DESC_SHADOW, HERO_TITLE_SHADOW } from "@/components/common/heroBannerEffects";

/* Banner: "Spaces That Work Better" over the dark left side of the reception artwork, with the same
   entrance effects as the other inner-page banners. */
const ServicesHero = () => (
  <section className="hero-banner relative w-full bg-[#0A1A33] pt-[56px] sm:pt-[68px]">
    <style>{HERO_BANNER_CSS}</style>
    <div className="relative min-h-[320px] lg:min-h-[340px] overflow-hidden flex items-center">
      <Image src={heroBg} alt="" fill priority placeholder="blur" sizes="100vw" className="object-cover object-[30%_center] sm:object-center" />

      <div className="relative w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="hb-blur-in flex items-center gap-3 mb-3" style={{ animationDelay: "0.15s" }}>
          <span className="w-8 h-[2px] bg-[#E8A64C]" />
          <span className="text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.25em] text-white">Our Services</span>
        </div>
        <h1
          className="text-[34px] sm:text-[42px] lg:text-[50px] font-serif font-medium leading-[1.05] text-white mb-3 [perspective:800px]"
          style={{ textShadow: HERO_TITLE_SHADOW }}
        >
          <span className="block overflow-hidden">
            <span className="hb-title-line" style={{ animationDelay: "0.2s" }}>Spaces</span>
          </span>
          <span className="block overflow-hidden">
            <span className="hb-title-line text-[#E8A64C]" style={{ animationDelay: "0.4s", textShadow: HERO_ACCENT_SHADOW }}>
              That Work Better
            </span>
          </span>
        </h1>
        <p className="hb-blur-in text-[16px] sm:text-[18px] font-bold text-white mb-2" style={{ animationDelay: "0.4s" }}>
          Design. Build. Deliver.
        </p>
        <p
          className="hb-desc-in text-[13.5px] sm:text-[15px] text-white/90 leading-relaxed max-w-[440px]"
          style={{ animationDelay: "0.5s", textShadow: HERO_DESC_SHADOW }}
        >
          A complete range of interior, design, manufacturing and turnkey solutions for modern businesses and homes.
        </p>
      </div>
    </div>
  </section>
);

export default ServicesHero;
