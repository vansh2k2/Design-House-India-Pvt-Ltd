"use client";

import Image, { type StaticImageData } from "next/image";
import { m, type Variants } from "framer-motion";

import teamImg from "@/assets/image/teams.webp";
import cc1Img from "@/assets/icon/cc1.png";
import cc2Img from "@/assets/icon/cc2.png";
import cc3Img from "@/assets/icon/cc3.png";
import cc4Img from "@/assets/icon/cc4.png";

// `lines` is the description split where it breaks onto a new line
const HIGHLIGHTS: { icon: StaticImageData; title: string; lines: [string, string] }[] = [
  { icon: cc1Img, title: "Experienced Professionals", lines: ["Industry knowledge", "with practical expertise"] },
  { icon: cc2Img, title: "Collaborative & Agile", lines: ["Aligned, responsive and", "solution-driven"] },
  { icon: cc3Img, title: "Execution Focused", lines: ["From concept to on-time", "delivery"] },
  { icon: cc4Img, title: "Client Committed", lines: ["Quality, transparency and", "long-term partnerships"] },
];

const EASE = [0.22, 1, 0.36, 1] as const;

/* Highlight cards: when the list scrolls into view the cards slide in from the right one after
   another (out of a blur); in each, the icon then springs in, the orange bar grows and the text rises. */
const listVariants: Variants = {
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
const iconVariants: Variants = {
  hidden: { scale: 0, rotate: -25 },
  show: { scale: 1, rotate: 0, transition: { type: "spring", stiffness: 300, damping: 15 } },
};
const barVariants: Variants = {
  hidden: { scaleY: 0 },
  show: { scaleY: 1, transition: { duration: 0.45, ease: EASE } },
};
const textVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

/* "Meet Our Expert Team": centred heading over the bright top of the team photo; the photo fills
   the left of the section (its top edge fades into the white background) and four highlight cards
   stand down its right side. */
const ExpertTeam = () => (
  <section className="relative w-full overflow-hidden bg-white">
    <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 lg:pt-8">
      {/* ── Heading ── */}
      <m.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="relative z-10 text-center"
      >
        <div className="flex items-center justify-center gap-4 sm:gap-5 mb-1">
          <span className="w-16 sm:w-28 lg:w-36 h-[3px] bg-[#fd6e15] rounded-full" />
          <span className="text-[18px] sm:text-[22px] lg:text-[26px] font-extrabold uppercase tracking-[0.18em] text-[#0A1F44]">
            Meet
          </span>
          <span className="w-16 sm:w-28 lg:w-36 h-[3px] bg-[#fd6e15] rounded-full" />
        </div>
        <h2 className="text-[34px] sm:text-[48px] lg:text-[60px] font-sans font-extrabold uppercase leading-[1.05] tracking-tight text-[#0A1F44] mb-3">
          Our{" "}
          <span className="relative inline-block text-[#fd6e15]">
            Expert
            {/* Orange swoosh under "Expert" */}
            <svg
              aria-hidden="true"
              viewBox="0 0 300 20"
              preserveAspectRatio="none"
              className="absolute left-0 -bottom-2 sm:-bottom-3 w-full h-3 sm:h-4"
              fill="none"
            >
              <path d="M4 14 C 80 2, 220 2, 296 14" stroke="#fd6e15" strokeWidth="5" strokeLinecap="round" />
            </svg>
          </span>{" "}
          Team
        </h2>
        <p className="text-[14px] sm:text-[16px] lg:text-[18px] text-[#1F2D44] leading-relaxed max-w-[820px] mx-auto">
          A collaborative team of designers, project managers, engineers and execution experts who bring ideas to life
          with precision and commitment.
        </p>
      </m.div>

      {/* ── Team photo + highlight cards ── */}
      <div className="relative mt-6 lg:-mt-[5%]">
        <m.div
          initial={{ opacity: 0, scale: 1.04 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.1, ease: EASE }}
          className="relative lg:w-[78%]"
        >
          <Image
            src={teamImg}
            alt="Design House India team"
            placeholder="blur"
            sizes="(min-width: 1024px) 78vw, 100vw"
            className="w-full h-auto [mask-image:linear-gradient(to_bottom,transparent_0%,#000_16%)]"
          />
        </m.div>

        <m.ul
          variants={listVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid sm:grid-cols-2 lg:grid-cols-1 gap-3 lg:gap-2.5 mt-5 pb-6 lg:pb-0 lg:mt-0 lg:absolute lg:right-0 lg:top-[16%] lg:w-[310px] xl:w-[338px]">
          {HIGHLIGHTS.map(({ icon, title, lines }) => (
            <m.li
              key={title}
              variants={cardVariants}
              className="flex items-center gap-3 rounded-[21px] bg-gradient-to-b from-white to-[#F7F8FB] border border-white px-3 py-2.5 shadow-[0_10px_26px_-6px_rgba(15,35,70,0.18),0_2px_6px_rgba(15,35,70,0.06),inset_0_-3px_0_rgba(15,35,70,0.05)]"
            >
              {/* cc1–cc4 already carry their own rounded orange box */}
              <m.div variants={iconVariants} className="shrink-0 -my-2 -mx-1.5">
                <Image src={icon} alt="" width={74} height={68} className="w-[74px] h-auto" />
              </m.div>
              <m.span variants={barVariants} className="w-[3px] h-9 shrink-0 rounded-full bg-[#fd6e15]" />
              <m.div variants={textVariants} className="min-w-0 pl-1.5">
                <h3 className="text-[15px] xl:text-[16px] font-bold text-[#0A1F44] leading-tight tracking-tight mb-1">{title}</h3>
                <p className="text-[13px] xl:text-[13.5px] text-[#1F2D44] leading-snug">
                  {lines[0]}
                  <br />
                  {lines[1]}
                </p>
              </m.div>
            </m.li>
          ))}
        </m.ul>
      </div>
    </div>
  </section>
);

export default ExpertTeam;
