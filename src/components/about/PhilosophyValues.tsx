"use client";

import Image, { type StaticImageData } from "next/image";
import { m, type Variants } from "framer-motion";
import { Eye, Target, type LucideIcon } from "lucide-react";

import { Lotus } from "@/components/services/detail/showcaseIcons";
import oh1Img from "@/assets/icon/oh1.png";
import oh2Img from "@/assets/icon/oh2.png";
import oh3Img from "@/assets/icon/oh3.png";
import oh4Img from "@/assets/icon/oh4.png";
import oh5Img from "@/assets/icon/oh5.png";

// `lines` is each description split where it breaks onto a new line
const PILLARS: { icon: LucideIcon; title: string; lines: string[] }[] = [
  {
    icon: Target,
    title: "Our Mission",
    lines: [
      "To deliver reliable, efficient and",
      "meaningful solutions that meet our",
      "clients’ needs with quality, timeliness",
      "and professional expertise.",
    ],
  },
  {
    icon: Eye,
    title: "Our Vision",
    lines: [
      "To be a trusted and preferred partner",
      "known for excellence, innovation",
      "and customer-centric solutions",
      "across every project we undertake.",
    ],
  },
  {
    icon: Lotus,
    title: "Our Philosophy",
    lines: [
      "To create lasting value through",
      "integrity, transparency, collaboration",
      "and a deep commitment to quality",
      "in everything we do.",
    ],
  },
];

const VALUES: { icon: StaticImageData; title: string; lines: string[] }[] = [
  {
    icon: oh1Img,
    title: "Integrity",
    lines: ["We act with", "honesty and", "transparency,", "upholding the", "highest ethical", "standards."],
  },
  {
    icon: oh2Img,
    title: "Collaboration",
    lines: ["We believe in", "teamwork, open", "communication", "and the power of", "working together", "towards a", "common goal."],
  },
  {
    icon: oh3Img,
    title: "Innovation",
    lines: ["We continuously", "explore smarter,", "more efficient", "and sustainable", "ways to deliver", "better solutions."],
  },
  {
    icon: oh4Img,
    title: "Respect",
    lines: ["We value", "people, ideas", "and diversity,", "creating an", "inclusive and", "supportive", "environment."],
  },
  {
    icon: oh5Img,
    title: "Excellence",
    lines: ["We strive for", "the highest", "standards in", "quality, service", "and client", "satisfaction."],
  },
];

const INTRO = [
  "We believe in a people-centric, quality-driven",
  "and responsible approach that creates lasting",
  "value, builds trusted relationships and delivers",
  "solutions that are functional, efficient",
  "and future-ready.",
];

// Lines of text, each starting on a new line (they still wrap further if the column is narrower)
const Lines = ({ lines }: { lines: string[] }) => (
  <>
    {lines.map((line) => (
      <span key={line} className="block">
        {line}
      </span>
    ))}
  </>
);

const EASE = [0.22, 1, 0.36, 1] as const;

/* Mission / vision / philosophy rows slide in from the left one after another; the core value
   cards then rise in one after another, each with its icon springing in. */
const listVariants: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 0.25, staggerChildren: 0.18 } },
};
const pillarVariants: Variants = {
  hidden: { opacity: 0, x: -50, filter: "blur(6px)" },
  show: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: EASE } },
};
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.9, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE, staggerChildren: 0.1, delayChildren: 0.15 },
  },
};
const iconVariants: Variants = {
  hidden: { scale: 0, rotate: -25 },
  show: { scale: 1, rotate: 0, transition: { type: "spring", stiffness: 300, damping: 15 } },
};

/* "Our Philosophy & Values" on deep navy: heading and intro on the left; mission, vision and
   philosophy stacked in the middle; the five core values as outlined cards under a gold
   "Our Core Values" pill on the right; a gold swoosh sweeps across the bottom. */
const PhilosophyValues = () => (
  <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#0A1F44] via-[#071A3A] to-[#0B2552] text-white">
    {/* Soft glow behind the content */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -top-32 left-1/3 h-[420px] w-[420px] rounded-full bg-[#1B4C93]/25 blur-[120px]"
    />

    <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 lg:pt-7 pb-12 sm:pb-14 lg:pb-16 grid gap-8 lg:grid-cols-2 xl:grid-cols-[minmax(360px,1fr)_auto_minmax(0,2.4fr)] xl:gap-0">
      {/* ── Left: heading + intro ── */}
      <m.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="xl:pr-5 xl:pt-6"
      >
        <span className="block w-24 h-[6px] bg-[#fd6e15] rounded-full mb-3" />
        <h2 className="text-[30px] sm:text-[36px] lg:text-[40px] font-serif font-medium leading-[1.08] tracking-tight mb-4">
          Our Philosophy
          <br />
          &amp; <span className="text-[#FFA41B]">Values</span>
        </h2>
        <p className="text-[13.5px] sm:text-[14px] text-white/90 leading-relaxed xl:whitespace-nowrap">
          <Lines lines={INTRO} />
        </p>
      </m.div>

      {/* ── Middle: mission, vision, philosophy ── */}
      <m.ul
        variants={listVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="xl:-ml-5 xl:border-l xl:border-r xl:border-white/15 xl:px-4 divide-y divide-white/15"
      >
        {PILLARS.map(({ icon: Icon, title, lines }) => (
          <m.li key={title} variants={pillarVariants} className="flex items-center gap-4 py-3 first:pt-0 last:pb-0">
            <Icon className="w-12 h-12 shrink-0 text-[#FFA41B]" strokeWidth={1.6} />
            <div className="min-w-0">
              <h3 className="text-[17px] sm:text-[18px] font-semibold leading-tight mb-1">{title}</h3>
              <p className="text-[13.5px] text-white leading-snug xl:whitespace-nowrap">
                <Lines lines={lines} />
              </p>
            </div>
          </m.li>
        ))}
      </m.ul>

      {/* ── Right: core values ── */}
      <div className="lg:col-span-2 xl:col-span-1 xl:pl-4">
        <m.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex items-center justify-center gap-4 mb-4"
        >
          <span className="flex-1 max-w-[180px] h-[2px] bg-gradient-to-r from-transparent to-[#FFA41B]" />
          <span className="rounded-full bg-gradient-to-r from-[#FFA41B] via-[#FFC14D] to-[#FF9A1F] px-6 py-1.5 text-[17px] lg:text-[20px] font-serif font-medium text-[#0A1F44] shadow-[0_6px_20px_-6px_rgba(255,164,27,0.6)]">
            Our Core Values
          </span>
          <span className="flex-1 max-w-[180px] h-[2px] bg-gradient-to-l from-transparent to-[#FFA41B]" />
        </m.div>

        <m.ul
          variants={listVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 xl:gap-2"
        >
          {VALUES.map(({ icon, title, lines }) => (
            <m.li
              key={title}
              variants={cardVariants}
              className="flex flex-col items-center text-center rounded-2xl border border-white/20 bg-white/[0.03] px-2 pt-4 pb-4"
            >
              <m.span variants={iconVariants} className="mb-2">
                <Image src={icon} alt="" className="w-auto h-12 object-contain" />
              </m.span>
              <h3 className="text-[17px] sm:text-[18px] font-semibold leading-tight">{title}</h3>
              <span className="block w-9 h-[3px] rounded-full bg-[#fd6e15] my-2.5" />
              <p className="text-[13.5px] text-white/85 leading-snug">
                <Lines lines={lines} />
              </p>
            </m.li>
          ))}
        </m.ul>
      </div>
    </div>

    {/* Gold swoosh across the bottom, with a lighter navy band beneath it */}
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute bottom-0 left-0 w-full h-11 sm:h-12 lg:h-14"
      viewBox="0 0 1440 140"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="pv-gold" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#FFB443" />
          <stop offset="0.45" stopColor="#F59A1B" />
          <stop offset="0.8" stopColor="#FFC766" />
          <stop offset="1" stopColor="#FF9A1F" />
        </linearGradient>
        <linearGradient id="pv-band" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#163A6E" />
          <stop offset="1" stopColor="#0B2552" />
        </linearGradient>
      </defs>
      <path d="M0 34 C 300 116, 700 126, 1440 74 L1440 140 L0 140 Z" fill="url(#pv-band)" />
      <path d="M0 14 C 300 100, 700 114, 1440 50 L1440 80 C 700 130, 300 120, 0 36 Z" fill="url(#pv-gold)" />
    </svg>
  </section>
);

export default PhilosophyValues;
