"use client";

import Image, { type StaticImageData } from "next/image";
import { m, type Variants } from "framer-motion";
import {
  Armchair,
  Bed,
  Building2,
  HeartPulse,
  ShoppingBag,
  Store,
  type LucideIcon,
} from "lucide-react";

import aboutbImg from "@/assets/banner/aboutb.webp";
import ac1Img from "@/assets/image/ac1.webp";
import ac2Img from "@/assets/image/ac2.webp";
import ac3Img from "@/assets/image/ac3.webp";
import ac4Img from "@/assets/image/ac4.webp";
import ac5Img from "@/assets/image/ac5.webp";
import bb1Img from "@/assets/icon/bb1.png";
import bb2Img from "@/assets/icon/bb2.png";
import bb3Img from "@/assets/icon/bb3.png";
import bb4Img from "@/assets/icon/bb4.png";
import bb5Img from "@/assets/icon/bb5.png";

interface StrengthCard {
  title: string;
  description: string;
  badge: StaticImageData; // round icon badge image shown over the photo
  image: StaticImageData;
}

interface SectorItem {
  name: string;
  icon: LucideIcon;
}

const CARDS: StrengthCard[] = [
  {
    title: "Strategic Presence",
    description: "Operational base in Delhi-NCR & Mumbai for faster response and project support.",
    badge: bb1Img,
    image: ac1Img,
  },
  {
    title: "In-house Manufacturing",
    description: "Modern production facility for precision, durability and customization.",
    badge: bb2Img,
    image: ac2Img,
  },
  {
    title: "End-to-End Execution",
    description: "Design, build, install and handover with seamless coordination.",
    badge: bb3Img,
    image: ac3Img,
  },
  {
    title: "Experienced Teams",
    description: "Skilled professionals across design, production and project management.",
    badge: bb4Img,
    image: ac4Img,
  },
  {
    title: "Pan-India Delivery",
    description: "Capability to execute multi-location and large-scale projects across India.",
    badge: bb5Img,
    image: ac5Img,
  },
];

const SECTORS: SectorItem[] = [
  { name: "Hospitality", icon: Bed },
  { name: "Retail", icon: ShoppingBag },
  { name: "Corporate Offices", icon: Building2 },
  { name: "Healthcare & Wellness", icon: HeartPulse },
  { name: "Exhibitions & Events", icon: Store },
  { name: "Institutional Spaces", icon: Armchair },
];

/* Card entrance (same as the Expert Team highlight cards): when the grid scrolls into view the
   cards slide in from the right one after another, out of a blur; in each, the icon badge then
   springs in and the title and description rise. */
const EASE = [0.22, 1, 0.36, 1] as const;

const gridVariants: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 0.35, staggerChildren: 0.22 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, x: 90, scale: 0.92, filter: "blur(6px)" },
  show: {
    opacity: 1,
    x: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: EASE, staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const badgeVariants: Variants = {
  hidden: { scale: 0, rotate: -25 },
  show: { scale: 1, rotate: 0, transition: { type: "spring", stiffness: 300, damping: 15 } },
};

const textVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

/* ── Operational Strength Section ──
   Matches the reference graphic:
   - Deep navy background with a full-bleed diagonal photo (orange edge stripe) at the top right
   - 5 white pillar cards: photo with orange curved base, floating navy icon badge, bold title
   - Bottom "SECTORS WE SERVE" pill ribbon with orange angled badge & icons
   - Images are shown without any colour overlay */
const OperationalStrength = () => {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#071A3A] via-[#06183A] to-[#041230] pt-6 sm:pt-7 lg:pt-7 pb-9 sm:pb-10 text-white">
      {/* ── Top-right diagonal photo with orange edge stripe (desktop) ── */}
      <div
        className="hidden lg:block absolute top-0 right-0 h-[200px] w-[34%] bg-[#fd6e15]"
        style={{ clipPath: "polygon(22% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
      >
        <div
          className="absolute inset-0"
          style={{ clipPath: "polygon(calc(22% + 9px) 0%, 100% 0%, 100% 100%, 9px 100%)" }}
        >
          <Image
            src={aboutbImg}
            alt="Design House India operational facility"
            fill
            sizes="34vw"
            priority
            className="object-cover object-center"
          />
        </div>
      </div>

      {/* Bottom decorative wave (curve2.png) */}
      <Image
        src="/curve2.png"
        alt=""
        aria-hidden="true"
        width={2172}
        height={175}
        sizes="100vw"
        className="pointer-events-none absolute bottom-0 left-0 w-full h-auto translate-y-[40%] opacity-60"
      />

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* ── Header ── */}
        <div className="lg:max-w-[66%] lg:min-h-[150px]">
          <span className="block w-24 h-[4px] bg-[#fd6e15] rounded-full mb-2.5" />
          <p className="text-[14px] sm:text-[15px] font-semibold uppercase tracking-[0.06em] text-white mb-2.5">
            OUR OPERATIONAL STRENGTH
          </p>
          <h2 className="text-[30px] sm:text-[36px] lg:text-[40px] font-serif font-medium leading-[1.08] tracking-tight text-white mb-3">
            From Design to Delivery,{" "}
            <span className="text-[#fd6e15]">All Under One Roof</span>
          </h2>
          <p className="text-[13.5px] sm:text-[14px] text-white/90 leading-relaxed max-w-[760px]">
            An integrated operational setup that combines design expertise, advanced manufacturing
            and on-ground execution for consistent quality, speed and scale.
          </p>
        </div>

        {/* ── 5 Operational Strength Pillar Cards ── */}
        <m.div
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-4 mt-6 lg:mt-5"
        >
          {CARDS.map((card) => {
            return (
              <m.div
                key={card.title}
                variants={cardVariants}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="group flex flex-col rounded-2xl overflow-hidden border-[3px] border-white bg-gradient-to-b from-white to-[#E6EAF0] shadow-[0_14px_32px_-8px_rgba(0,0,0,0.5)]"
              >
                {/* Photo with orange curved base */}
                <div
                  className="relative h-[140px] sm:h-[150px] w-full overflow-hidden rounded-b-[20px] border-b-[3px] border-[#fd6e15] bg-[#0A2050]"
                >
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(min-width: 1024px) 20vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Floating circular icon badge */}
                <div className="relative flex justify-center -mt-[32px] z-10">
                  <m.div variants={badgeVariants}>
                    <Image
                      src={card.badge}
                      alt=""
                      width={64}
                      height={64}
                      className="w-[64px] h-[64px] rounded-full shadow-[0_8px_18px_rgba(0,0,0,0.35)] transition-transform duration-300 group-hover:scale-105"
                    />
                  </m.div>
                </div>

                {/* Content */}
                <div className="px-4 pt-2 pb-4 flex flex-col items-center text-center flex-1">
                  <m.h3 variants={textVariants} className="text-[17px] sm:text-[18px] font-bold text-[#0A2B5E] leading-tight mb-1.5">
                    {card.title.split(" ").map((word) => (
                      <span key={word} className="block">
                        {word}
                      </span>
                    ))}
                  </m.h3>
                  <m.p variants={textVariants} className="text-[13.5px] text-[#1F2D44] leading-relaxed">
                    {card.description}
                  </m.p>
                </div>
              </m.div>
            );
          })}
        </m.div>

        {/* ── Bottom Ribbon: SECTORS WE SERVE ── */}
        <div className="mt-6 lg:mt-6 rounded-2xl lg:rounded-full border-2 border-[#fd6e15] bg-[#06183A] overflow-hidden flex flex-col lg:flex-row items-stretch shadow-[0_12px_32px_rgba(0,0,0,0.45)]">
          {/* Left orange angled badge */}
          <div className="bg-[#fd6e15] px-8 py-2 flex items-center justify-center shrink-0 lg:pl-10 lg:pr-14 lg:[clip-path:polygon(0_0,100%_0,82%_100%,0_100%)]">
            <span className="text-[#0A2B5E] font-semibold text-[15px] sm:text-[16px] uppercase tracking-[0.06em] leading-[1.1] text-center">
              SECTORS
              <br />
              WE SERVE
            </span>
          </div>

          {/* Sectors list */}
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:flex lg:items-center lg:justify-around py-2 lg:py-0">
            {SECTORS.map((sector, i) => {
              const SectorIcon = sector.icon;
              return (
                <div key={sector.name} className="flex items-center">
                  {i > 0 && <span className="hidden lg:block w-[2px] h-7 bg-white/40 mr-3 xl:mr-5" />}
                  <div className="flex items-center gap-2.5 px-3 py-2">
                    <SectorIcon className="w-6 h-6 text-[#fd6e15] shrink-0" strokeWidth={1.8} />
                    <span className="text-[13px] sm:text-[14px] font-medium text-white whitespace-nowrap">
                      {sector.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OperationalStrength;

