import Image, { type StaticImageData } from "next/image";

import heroImg from "@/assets/banner/about2.webp";
import { HERO_ACCENT_SHADOW, HERO_BANNER_CSS, HERO_DESC_SHADOW, HERO_TITLE_SHADOW } from "@/components/common/heroBannerEffects";
import ao1Img from "@/assets/icon/ao1.png";
import ao2Img from "@/assets/icon/ao2.png";
import ao3Img from "@/assets/icon/ao3.png";
import ao4Img from "@/assets/icon/ao4.png";

// Facts along the bottom of the banner
const FACTS: { icon: StaticImageData; title: string; text: string }[] = [
  { icon: ao1Img, title: "Established in 2004", text: "20+ years of design, build and delivery expertise" },
  { icon: ao2Img, title: "Headquartered in Delhi-NCR", text: "With strong operations in Mumbai" },
  { icon: ao3Img, title: "Turnkey Solutions", text: "From design and manufacturing to on-site execution" },
  { icon: ao4Img, title: "Pan-India Execution", text: "Delivering projects for corporates, retail, hospitality and events" },
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

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 lg:pt-8 pb-6 lg:pb-8">
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

      {/* ── Key facts, on a blue band (lined up with the content above, not the full width) so they read
          over the photo; the band dissolves into the photo at its left and right ends ── */}
      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-[#06245f]/75 to-[#041c4a]/90"
          style={{
            maskImage: "linear-gradient(to right, transparent, #000 14%, #000 86%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, #000 14%, #000 86%, transparent)",
          }}
        />
        <ul className="relative px-4 lg:px-6 py-3 lg:py-3.5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-5">
          {FACTS.map(({ icon, title, text }, i) => (
            <li
              key={title}
              className={`flex items-start gap-3.5 lg:px-6 first:lg:pl-0 ${i > 0 ? "lg:border-l-2 lg:border-white/90" : ""}`}
            >
              <Image src={icon} alt="" className="w-12 h-12 shrink-0 object-contain" />
              <div>
                <p className="text-[14.5px] font-semibold text-white leading-tight mb-1">{title}</p>
                <p className="text-[12.5px] text-white/80 leading-snug">{text}</p>
              </div>
            </li>
          ))}
        </ul>
        </div>
      </div>

      {/* Space under the band, so the orange and blue curve along the bottom of the photo shows */}
      <div className="h-10 sm:h-12 lg:h-14" />
    </div>
  </section>
);

export default AboutHero;
