import Image from "next/image";
import { Building2, Layers, MapPin, Users, type LucideIcon } from "lucide-react";

import heroImg from "@/assets/banner/about2.webp";
import { HERO_ACCENT_SHADOW, HERO_BANNER_CSS, HERO_DESC_SHADOW, HERO_TITLE_SHADOW } from "@/components/common/heroBannerEffects";

// Facts along the bottom of the banner
const FACTS: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Building2, title: "Established in 2004", text: "20+ years of design, build and delivery expertise" },
  { icon: MapPin, title: "Headquartered in Delhi-NCR", text: "With strong operations in Mumbai" },
  { icon: Layers, title: "Turnkey Solutions", text: "From design and manufacturing to on-site execution" },
  { icon: Users, title: "Pan-India Execution", text: "Delivering projects for corporates, retail, hospitality and events" },
];

/* About Us banner: the team photo across the full width (its blue left side carries the heading),
   with four key facts along a darkened band at the bottom. */
const AboutHero = () => (
  <section className="hero-banner relative w-full overflow-hidden bg-[#06245f] pt-[56px] sm:pt-[68px]">
    <style>{HERO_BANNER_CSS}</style>
    <div className="relative">
      <Image
        src={heroImg}
        alt="Design House India team planning a project over drawings and material samples"
        fill
        priority
        quality={85}
        sizes="100vw"
        className="object-cover object-[78%_bottom] lg:object-[right_bottom]"
      />

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 lg:pt-8 pb-4 lg:pb-4">
        <div className="max-w-[460px] lg:max-w-[38%]">
          <p
            className="hb-blur-in text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.25em] text-white"
            style={{ animationDelay: "0.15s" }}
          >
            About Us
          </p>
          <span
            className="hb-blur-in block w-[86px] h-[3px] bg-[#fd6e15] rounded-full mt-2.5 mb-5"
            style={{ animationDelay: "0.2s" }}
          />
          <h1
            className="text-[34px] sm:text-[44px] lg:text-[52px] font-serif font-medium leading-[1.05] tracking-tight text-white mb-4 [perspective:800px]"
            style={{ textShadow: HERO_TITLE_SHADOW }}
          >
            <span className="block overflow-hidden">
              <span className="hb-title-line" style={{ animationDelay: "0.25s" }}>
                Creating
              </span>
            </span>
            <span className="block overflow-hidden">
              <span
                className="hb-title-line text-[#fd6e15]"
                style={{ animationDelay: "0.4s", textShadow: HERO_ACCENT_SHADOW }}
              >
                Impactful Spaces
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className="hb-title-line" style={{ animationDelay: "0.55s" }}>
                Since 2004
              </span>
            </span>
          </h1>
          <p
            className="hb-desc-in text-[13.5px] sm:text-[15px] text-white/90 leading-relaxed max-w-[430px]"
            style={{ animationDelay: "0.6s", textShadow: HERO_DESC_SHADOW }}
          >
            Design House India Pvt. Ltd. brings design, manufacturing and project execution together to deliver turnkey
            commercial interiors and exhibition solutions across India.
          </p>
          <span
            className="hb-blur-in block w-[86px] h-[3px] bg-[#fd6e15] rounded-full mt-5"
            style={{ animationDelay: "0.7s" }}
          />
        </div>
      </div>

      {/* ── Key facts, on a blue band across the full width so they read over the photo ── */}
      <div className="relative bg-gradient-to-b from-[#06245f]/75 to-[#041c4a]/90">
        <ul className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-5 lg:py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-5">
          {FACTS.map(({ icon: Icon, title, text }, i) => (
            <li
              key={title}
              className={`flex items-start gap-3.5 lg:px-6 first:lg:pl-0 ${i > 0 ? "lg:border-l lg:border-white/25" : ""}`}
            >
              <Icon className="w-9 h-9 shrink-0 text-[#fd6e15]" strokeWidth={1.5} />
              <div>
                <p className="text-[14.5px] font-semibold text-white leading-tight mb-1">{title}</p>
                <p className="text-[12.5px] text-white/80 leading-snug">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Space under the band, so the orange and blue curve along the bottom of the photo shows */}
      <div className="h-8 sm:h-10 lg:h-12" />
    </div>
  </section>
);

export default AboutHero;
