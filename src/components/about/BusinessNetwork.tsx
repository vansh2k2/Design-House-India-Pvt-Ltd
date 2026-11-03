"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { m, type Variants } from "framer-motion";
import {
  Building2,
  ChartColumnIncreasing,
  CodeXml,
  Handshake,
  Settings,
  Sofa,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";

import { Lotus } from "@/components/services/detail/showcaseIcons";

/* Logos: a file from /public where we have one; otherwise a text wordmark stands in until the
   logo file is added (put the file in /public and set `logo`). */
type Logo = { src: string; ratio: number } | { wordmark: ReactNode };

// `lines` is each description split where it breaks onto a new line
const BRANDS: { name: string; logo: Logo; lines: string[]; icon: LucideIcon; tag: [string, string?] }[] = [
  {
    name: "Design House India Pvt. Ltd.",
    logo: { src: "/logobg.png", ratio: 606 / 412 },
    lines: [
      "The parent company, delivering",
      "integrated design, build and turnkey",
      "solutions across commercial, retail,",
      "hospitality and institutional spaces.",
    ],
    icon: Building2,
    tag: ["Design & Build Solutions"],
  },
  {
    name: "Design House Home Solutions",
    logo: {
      wordmark: (
        <span className="flex flex-col items-center leading-none">
          {/* Design House logo mark (cut from logobg.png) above the brand name */}
          <Image src="/logo-mark.png" alt="" width={264} height={183} className="w-[60px] h-auto mb-1" />
          <span className="text-[19px] font-black tracking-tight text-[#134698]">DESIGN HOUSE</span>
          <span className="mt-0.5 text-[10.5px] font-semibold tracking-[0.3em] text-[#0A1F44]">HOME SOLUTIONS</span>
          <span className="mt-0.5 text-[6.5px] font-semibold text-[#0A1F44]/80">A Brand of Design House India Pvt. Ltd.</span>
        </span>
      ),
    },
    lines: [
      "End-to-end turnkey interior solutions,",
      "including Sleepwell & Kurlon mattress",
      "showrooms, home furnishing, modular",
      "kitchens, wardrobes, furniture, appliances",
      "and electrical fixtures.",
    ],
    icon: Sofa,
    tag: ["Turnkey Interior &", "Home Solutions"],
  },
  {
    name: "Ensis",
    logo: { src: "/ensis.jpeg", ratio: 1600 / 639 },
    lines: [
      "Specialises in premium Spa & Panchkarma",
      "furniture, wellness equipment, interior",
      "design and turnkey project execution for",
      "spas, wellness centres and healthcare",
      "facilities.",
    ],
    icon: Lotus,
    tag: ["Wellness Furniture &", "Interiors"],
  },
  {
    name: "DC Infinity",
    logo: {
      wordmark: (
        <span className="flex items-baseline gap-1 font-serif leading-none">
          <span className="text-[34px] font-bold text-[#E31E24]">DC</span>
          <span className="text-[18px] font-semibold tracking-[0.18em] text-[#111]">INFINITY</span>
        </span>
      ),
    },
    lines: [
      "Delivers integrated digital marketing",
      "solutions, including SEO, SMO, social",
      "media management, personal branding",
      "and public relations (PR), helping brands",
      "build a strong and lasting digital presence.",
    ],
    icon: ChartColumnIncreasing,
    tag: ["Digital Marketing,", "SEO, SMO & PR"],
  },
];

const ASSOCIATES: { name: string; logo: Logo; text: string; icon: LucideIcon; tag: string }[] = [
  {
    name: "Encodency",
    logo: { src: "/encodencylogo.jpeg", ratio: 800 / 224 },
    text: "Specialises in software development, CRM and HRMS solutions, mobile applications, and premium website design and development.",
    icon: CodeXml,
    tag: "Software, CRM, HRMS & Web Development",
  },
  {
    name: "REXPRO",
    logo: { wordmark: <span className="text-[32px] font-black tracking-tight text-[#E31E24] leading-none">REXPRO</span> },
    text: "Delivers retail fixtures, displays, commercial furniture and infrastructure solutions through in-house manufacturing and turnkey execution, serving retail, hospitality and institutional sectors.",
    icon: Settings,
    tag: "Retail & Infrastructure Solutions",
  },
  {
    name: "Kumar Designs",
    logo: {
      wordmark: (
        <span className="flex flex-col items-center leading-none">
          <span className="text-[46px] font-black tracking-tighter text-[#E0601B]">kd</span>
          <span className="text-[10px] font-semibold tracking-[0.25em] text-[#333]">kumar designs</span>
        </span>
      ),
    },
    text: "Specialises in restaurant, café, fine-dining and bar interiors, creating distinctive hospitality spaces through thoughtful design, creative concepts and functional layouts.",
    icon: UtensilsCrossed,
    tag: "Hospitality & F&B Interiors",
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

/* Each card row comes in one after another when it scrolls into view: the cards rise out of a
   blur, then their logo, text and tag follow. */
const rowVariants: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 0.15, staggerChildren: 0.18 } },
};
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.92, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE, staggerChildren: 0.1, delayChildren: 0.15 },
  },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

const LogoMark = ({ logo, name, width }: { logo: Logo; name: string; width: string }) =>
  "src" in logo ? (
    <div className="relative" style={{ width, aspectRatio: logo.ratio }}>
      <Image src={logo.src} alt={name} fill sizes="240px" className="object-contain" />
    </div>
  ) : (
    <span role="img" aria-label={name}>
      {logo.wordmark}
    </span>
  );

// Shared card look: white-to-cool-grey face, thick white rim and a soft lifted shadow
const CARD =
  "relative overflow-hidden border-[3px] border-white bg-gradient-to-b from-white via-[#FBFCFE] to-[#E9EDF4] shadow-[0_16px_32px_-12px_rgba(15,35,70,0.32),0_3px_8px_rgba(15,35,70,0.08)]";

/* Orange swoosh with a white highlight that sweeps up out of a card's bottom-right corner,
   over the right end of its tag */
const CornerSwoosh = ({ id }: { id: string }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 100 80"
    className="pointer-events-none absolute right-0 bottom-0 w-[92px] h-[72px] z-10"
  >
    <defs>
      <linearGradient id={id} x1="0" x2="1" y1="1" y2="0">
        <stop offset="0" stopColor="#fd6e15" />
        <stop offset="1" stopColor="#FFB45E" />
      </linearGradient>
    </defs>
    <path d="M100 4 C 84 34, 60 62, 6 80 L100 80 Z" fill={`url(#${id})`} />
    <path d="M100 0 C 86 28, 66 52, 22 72" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity="0.9" />
  </svg>
);

/* Slanted heading tab ("OUR BRANDS" / "OUR ASSOCIATES") with a rule running to the right edge */
const GroupTab = ({ icon: Icon, label, tone }: { icon: LucideIcon; label: string; tone: "navy" | "orange" }) => {
  const navy = tone === "navy";
  return (
    <div className="flex items-center gap-0 mb-4">
      <span className={`w-4 h-11 -skew-x-[24deg] ${navy ? "bg-[#fd6e15]" : "bg-[#0A1F44]"}`} />
      <span
        className={`-ml-1 h-11 pl-5 pr-8 -skew-x-[24deg] flex items-center ${
          navy ? "bg-[#0A1F44]" : "bg-gradient-to-r from-[#fd6e15] to-[#FF8A3D]"
        }`}
      >
        <span className="skew-x-[24deg] flex items-center gap-3">
          <Icon className="w-6 h-6 text-white" strokeWidth={1.7} />
          <span className="text-[15px] sm:text-[16px] font-semibold uppercase tracking-[0.06em] text-white">{label}</span>
        </span>
      </span>
      <span className={`flex-1 h-[2px] ml-2 ${navy ? "bg-[#0A1F44]" : "bg-[#fd6e15]"}`} />
      <span className="w-10 h-[3px] ml-2 rounded-full bg-[#fd6e15]" />
    </div>
  );
};

/* "Our Brands & Associates": the group's own brands as tall cards (logo, description, navy tag),
   then its associates as wide cards (logo beside description, light tag). */
const BusinessNetwork = () => (
  <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#F5F7FB] via-white to-[#F7F9FC]">
    {/* Decorative orange swooshes in the top corners (c1 left, c2 right), behind the content */}
    <Image
      src="/c1.png"
      alt=""
      aria-hidden="true"
      width={1086}
      height={471}
      sizes="(min-width: 1024px) 20vw, 35vw"
      className="pointer-events-none absolute top-0 left-0 w-[35%] sm:w-[26%] lg:w-[20%] max-w-[340px] h-auto opacity-50"
    />
    <Image
      src="/c2.png"
      alt=""
      aria-hidden="true"
      width={1018}
      height={462}
      sizes="(min-width: 1024px) 20vw, 35vw"
      className="pointer-events-none absolute top-0 right-0 w-[35%] sm:w-[26%] lg:w-[20%] max-w-[340px] h-auto opacity-50"
    />
    <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 lg:pt-10 pb-10 lg:pb-12">
      {/* ── Heading ── */}
      <m.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="text-center mb-4 lg:mb-5"
      >
        <div className="flex items-center justify-center gap-4 mb-1.5">
          <span className="w-12 sm:w-24 h-[2px] bg-[#fd6e15]" />
          <span className="text-[14px] sm:text-[15px] font-semibold uppercase tracking-[0.06em] text-[#0A1F44]">
            Our Business Network
          </span>
          <span className="w-12 sm:w-24 h-[2px] bg-[#fd6e15]" />
        </div>
        <h2 className="text-[30px] sm:text-[36px] lg:text-[40px] font-serif font-medium leading-[1.08] tracking-tight text-[#0A1F44] mb-2.5">
          Our Brands &amp; <span className="text-[#fd6e15]">Associates</span>
        </h2>
        <p className="text-[13.5px] sm:text-[14px] font-semibold text-[#1F2D44] leading-relaxed max-w-[1080px] mx-auto">
          A group of specialised brands and trusted associates, delivering design, build, technology and business
          solutions across diverse industries.
        </p>
      </m.div>

      {/* ── Our Brands ── */}
      <GroupTab icon={Building2} label="Our Brands" tone="navy" />
      <m.ul
        variants={rowVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-5"
      >
        {BRANDS.map(({ name, logo, lines, icon: Icon, tag }) => (
          <m.li
            key={name}
            variants={cardVariants}
            className={`${CARD} flex flex-col items-center text-center rounded-[24px] px-3 pt-3 pb-3`}
          >
            <m.div variants={itemVariants} className="h-[90px] w-full flex items-center justify-center">
              <LogoMark logo={logo} name={name} width="56%" />
            </m.div>
            <span className="block w-10 h-[3px] rounded-full bg-[#fd6e15] mt-1.5 mb-2.5" />
            <m.p variants={itemVariants} className="text-[12.5px] text-[#161B26] leading-snug mb-3 flex-1">
              {lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </m.p>
            {/* Navy tag; the card's orange corner swoosh sweeps over its right end */}
            <m.div
              variants={itemVariants}
              className="w-full rounded-[18px] bg-gradient-to-r from-[#0E2559] via-[#132F68] to-[#1B3F80] pl-4 pr-14 py-2.5 flex items-center gap-3 text-left shadow-[0_6px_14px_-6px_rgba(10,31,68,0.55)]"
            >
              <Icon className="w-6 h-6 shrink-0 text-white" strokeWidth={1.5} />
              <span className="w-[2px] h-6 rounded-full bg-[#fd6e15]" />
              <span className="text-[13px] font-semibold text-white leading-tight">
                {tag[0]}
                {tag[1] && (
                  <>
                    <br />
                    {tag[1]}
                  </>
                )}
              </span>
            </m.div>
            <CornerSwoosh id={`bn-swoosh-${name.replace(/\W/g, "")}`} />
          </m.li>
        ))}
      </m.ul>

      {/* ── Our Associates ── */}
      <div className="mt-8 lg:mt-9">
        <GroupTab icon={Handshake} label="Our Associates" tone="orange" />
      </div>
      <m.ul
        variants={rowVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-5"
      >
        {ASSOCIATES.map(({ name, logo, text, icon: Icon, tag }) => (
          <m.li
            key={name}
            variants={cardVariants}
            className={`${CARD} flex flex-col rounded-[22px] px-4 pt-3 pb-3`}
          >
            <div className="flex items-center gap-4 flex-1">
              <m.div variants={itemVariants} className="w-[38%] shrink-0 h-[70px] flex items-center justify-center">
                <LogoMark logo={logo} name={name} width="90%" />
              </m.div>
              <span className="w-[2px] h-[56px] shrink-0 rounded-full bg-[#fd6e15]" />
              <m.p variants={itemVariants} className="text-[12.5px] text-[#161B26] leading-snug">
                {text}
              </m.p>
            </div>
            {/* Light peach tag; the card's orange corner swoosh sweeps over its right end */}
            <m.div
              variants={itemVariants}
              className="mt-2.5 rounded-[14px] border border-[#FFE6D2] bg-gradient-to-r from-[#FFEFE1] via-[#FFF7F0] to-[#FFFDFB] pl-4 pr-12 py-1.5 flex items-center justify-center gap-3"
            >
              <Icon className="w-5 h-5 shrink-0 text-[#0A1F44]" strokeWidth={1.8} />
              <span className="w-[2px] h-5 rounded-full bg-[#fd6e15]" />
              <span className="text-[13px] font-semibold text-[#0A1F44] whitespace-nowrap">{tag}</span>
            </m.div>
            <CornerSwoosh id={`bn-swoosh-${name.replace(/\W/g, "")}`} />
          </m.li>
        ))}
      </m.ul>
    </div>
  </section>
);

export default BusinessNetwork;
