import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { StaticImageData } from "next/image";

import CountUp from "../strengths/CountUp";
import indiaMap from "@/assets/image/india.png";
import logo1 from "@/assets/client/logo1.png";
import logo7 from "@/assets/client/logo7.png";
import logo11 from "@/assets/client/logo11.webp";
import logo12 from "@/assets/client/logo12.png";
import logo13 from "@/assets/client/logo13.png";
import logo17 from "@/assets/client/logo17.png";
import logo20 from "@/assets/client/logo20.png";
import logo23 from "@/assets/client/logo23.png";
import logo29 from "@/assets/client/logo29.png";
import logo32 from "@/assets/client/logo32.jpg";
import logo33 from "@/assets/client/logo33.png";
import logo38 from "@/assets/client/logo38.png";
import logo39 from "@/assets/client/logo39.png";
import logo40 from "@/assets/client/logo40.png";
import logo41 from "@/assets/client/logo41.png";
import logo45 from "@/assets/client/logo45.png";
import logo50 from "@/assets/client/logo50.png";
import logo53 from "@/assets/client/logo53.png";
import logo58 from "@/assets/client/logo58.png";
import logo60 from "@/assets/client/logo60.webp";
import logo67 from "@/assets/client/logo67.jpg";
import logo73 from "@/assets/client/logo73.png";
import logo76 from "@/assets/client/logo76.jpg";

/* The logo files are squares with the mark somewhere inside a lot of white/transparent padding.
   `size` is the square's width as a % of the card width, worked out per file so every mark fills
   roughly the same area (about 2/3 of the card's width or 55% of its height, whichever comes first).
   `ratio` (width / height) is for logo files that are not squares. */
const CLIENTS: { name: string; logo: StaticImageData | string; size: number; ratio?: number }[] = [
  { name: "Encodency Pvt. Ltd.", logo: "/encodencylogo.jpeg", size: 70, ratio: 800 / 224 },
  { name: "LG", logo: logo39, size: 112 },
  { name: "Nestlé", logo: logo50, size: 71 },
  { name: "Nokia", logo: logo53, size: 60 },
  { name: "L'Oréal", logo: logo41, size: 97 },
  { name: "Domino's Pizza", logo: logo11, size: 37 },
  { name: "Dove", logo: logo12, size: 60 },
  { name: "Taco Bell", logo: logo67, size: 38 },
  { name: "FILA", logo: logo20, size: 67 },
  { name: "Hindware", logo: logo29, size: 68 },
  { name: "Keds", logo: logo33, size: 70 },
  { name: "Legrand", logo: logo38, size: 69 },
  { name: "Lipton", logo: logo40, size: 36 },
  { name: "McCain", logo: logo45, size: 57 },
  { name: "Revlon", logo: logo58, size: 102 },
  { name: "Trends", logo: logo73, size: 69 },
  { name: "Fastrack", logo: logo17, size: 68 },
  { name: "Barbeque Nation", logo: logo1, size: 54 },
  { name: "Chaayos", logo: logo7, size: 68 },
  { name: "Garnier", logo: logo23, size: 85 },
  { name: "Jubilant FoodWorks", logo: logo32, size: 53 },
  { name: "Sennheiser", logo: logo60, size: 56 },
  { name: "Wahl", logo: logo76, size: 69 },
  { name: "DS Group", logo: logo13, size: 57 },
];

const STATS = [
  { end: 850, suffix: "+", label: ["Happy", "Clients"] },
  { end: 5000, suffix: "+", label: ["Projects", "Completed"] },
  { end: 22, suffix: "+", label: ["Years", "Experience"] },
];

/* "Our Clients": heading on the left; a faint India map, three counters and a "View All Clients"
   button on the right; then a grid of client logo cards. */
const OurClients = () => (
  <section className="relative w-full overflow-hidden bg-white">
    <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 lg:pt-5 pb-7 lg:pb-8">
      {/* ── Header ── */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-6">
        <div className="max-w-[780px]">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-5 h-[2.5px] bg-[#fd6e15] rounded-full inline-block" />
            <span className="text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.2em] text-[#134698]">Our Clients</span>
          </div>
          <h2 className="text-[28px] sm:text-[32px] lg:text-[36px] font-serif font-medium leading-[1.08] tracking-tight mb-2.5 text-[#0A2B5E]">
            Trusted by Leading Brands <span className="text-[#fd6e15]">Across India</span>
          </h2>
          <p className="text-[13.5px] sm:text-[14.5px] text-[#46658C] leading-relaxed max-w-[640px]">
            We are proud to have partnered with reputed brands across diverse industries, delivering spaces that reflect
            their vision and values.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 lg:gap-8">
          {/* Counters, with the dotted India map faintly behind their left side */}
          <div className="relative flex items-stretch">
            <Image
              src={indiaMap}
              alt=""
              aria-hidden="true"
              className="hidden sm:block absolute -left-36 top-1/2 -translate-y-1/2 w-[130px] h-auto opacity-20 pointer-events-none select-none"
            />
            {STATS.map(({ end, suffix, label }, i) => (
              <div key={label.join(" ")} className={`relative px-3 sm:px-4 ${i > 0 ? "border-l border-[#D5DDEA]" : "pl-0 sm:pl-0"}`}>
                <p className="text-[24px] sm:text-[28px] font-bold text-[#fd6e15] leading-none mb-1.5">
                  <CountUp end={end} suffix={suffix} />
                </p>
                <p className="text-[12.5px] sm:text-[13px] text-[#46658C] leading-tight">
                  {label[0]}
                  <br />
                  {label[1]}
                </p>
              </div>
            ))}
          </div>

          <Link
            href="/clients"
            className="group inline-flex items-center gap-2 rounded-md border-[1.5px] border-[#134698] px-5 py-2.5 text-[12.5px] font-bold uppercase tracking-wide text-[#134698] hover:bg-[#134698] hover:text-white transition-colors"
          >
            View All Clients
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* ── Logo grid ── */}
      <ul className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 xl:gap-4">
        {CLIENTS.map(({ name, logo, size, ratio = 1 }) => (
          <li
            key={name}
            className="relative aspect-[5/3] overflow-hidden rounded-md bg-white flex items-center justify-center shadow-[rgba(0,0,0,0.12)_0px_1px_3px,rgba(0,0,0,0.24)_0px_1px_2px]"
          >
            <div className="relative shrink-0" style={{ width: `${size}%`, aspectRatio: ratio }}>
              <Image src={logo} alt={name} fill sizes="(min-width: 1280px) 12vw, (min-width: 640px) 25vw, 33vw" className="object-contain" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default OurClients;
