"use client";

import Image, { type StaticImageData } from "next/image";
import { m, type Variants } from "framer-motion";

import p1Img from "@/assets/icon/p1.png";
import p2Img from "@/assets/icon/p2.png";
import p3Img from "@/assets/icon/p3.png";
import p4Img from "@/assets/icon/p4.png";
import p5Img from "@/assets/icon/p5.png";
import p6Img from "@/assets/icon/p6.png";
import p7Img from "@/assets/icon/p7.png";
import p8Img from "@/assets/icon/p8.png";
import p9Img from "@/assets/icon/p9.png";
import p10Img from "@/assets/icon/p10.png";

// `icon` is the domain's icon image (p1–p10); `lines` is its name split where it breaks onto a second line
const DOMAINS: { icon: StaticImageData; lines: [string, string] }[] = [
  { icon: p1Img, lines: ["Design &", "Planning"] },
  { icon: p2Img, lines: ["Project", "Management"] },
  { icon: p3Img, lines: ["Engineering &", "Execution"] },
  { icon: p4Img, lines: ["Product &", "Manufacturing"] },
  { icon: p10Img, lines: ["Sourcing &", "Procurement"] },
  { icon: p5Img, lines: ["Marketing &", "Branding"] },
  { icon: p6Img, lines: ["Technology &", "Innovation"] },
  { icon: p7Img, lines: ["Client", "Servicing"] },
  { icon: p8Img, lines: ["Quality &", "Safety"] },
  { icon: p9Img, lines: ["Finance &", "Administration"] },
];

const EASE = [0.22, 1, 0.36, 1] as const;

/* Cards come in one after another when the row scrolls into view: each rises out of a blur, then
   its icon springs in and the name fades up. */
const rowVariants: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 0.2, staggerChildren: 0.18 } },
};
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 60, scale: 0.85, filter: "blur(8px)" },
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
const textVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
};

/* "Our Team Expertise": a thin orange rule across the top, a centred heading between orange
   lines, a one-line intro, then a row of ten domain cards (icon, faded divider, two-line name). */
const TeamExpertise = () => (
  <section className="relative w-full bg-white">
    {/* Orange rule fading out at both ends */}
    <span aria-hidden="true" className="block h-[3px] w-full bg-gradient-to-r from-transparent via-[#fd6e15] to-transparent" />

    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-7 lg:pt-8 pb-10 lg:pb-12">
      {/* ── Heading ── */}
      <m.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="text-center"
      >
        <div className="flex items-center justify-center gap-5 sm:gap-7 mb-3">
          <span className="hidden sm:block w-16 lg:w-24 h-[3px] bg-[#fd6e15] rounded-full" />
          <h2 className="text-[30px] sm:text-[40px] lg:text-[50px] font-sans font-extrabold uppercase leading-none tracking-tight text-[#0A1F44]">
            Our Team <span className="text-[#fd6e15]">Expertise</span>
          </h2>
          <span className="hidden sm:block w-16 lg:w-24 h-[3px] bg-[#fd6e15] rounded-full" />
        </div>
        <p className="text-[14px] sm:text-[15px] lg:text-[17px] text-[#333] leading-relaxed max-w-[1280px] mx-auto">
          A multidisciplinary team of specialists, working together across key domains to deliver end-to-end design,
          build and execution solutions.
        </p>
      </m.div>

      {/* ── Domain cards ── */}
      <m.ul
        variants={rowVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="mt-8 lg:mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 xl:grid-cols-10 gap-3 lg:gap-3.5"
      >
        {DOMAINS.map(({ icon, lines }) => (
          <m.li
            key={lines.join(" ")}
            variants={cardVariants}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            className="group flex flex-col items-center text-center rounded-2xl bg-white px-2 pt-4 pb-5 shadow-[rgba(60,64,67,0.3)_0px_1px_2px_0px,rgba(60,64,67,0.15)_0px_1px_3px_1px]"
          >
            <m.span variants={iconVariants} className="flex items-center justify-center h-[62px]">
              <Image src={icon} alt="" className="w-[62px] h-[62px] object-contain" />
            </m.span>
            {/* Faded divider under the icon */}
            <span className="block w-[80%] h-px mt-0.5 mb-2 bg-gradient-to-r from-transparent via-[#D9DEE7] to-transparent" />
            <m.p variants={textVariants} className="text-[14px] xl:text-[13.5px] 2xl:text-[15px] font-semibold text-[#1E2533] leading-snug">
              {lines[0]}
              <br />
              {lines[1]}
            </m.p>
          </m.li>
        ))}
      </m.ul>
    </div>
  </section>
);

export default TeamExpertise;
