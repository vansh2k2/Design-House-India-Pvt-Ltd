"use client";

import Image from "next/image";
import Link from "next/link";
import { m } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { StaticImageData } from "next/image";

import sleepwellLogo from "@/assets/client/logo63.png";

/* Add an entry here (with its logo file) to show another brand. `fit` overrides how the file is drawn
   (object-contain by default). */
const BRANDS: { name: string; logo: StaticImageData | string; ratio: number; caption: [string, string]; fit?: string }[] = [
  { name: "Design House", logo: "/logobg.png", ratio: 606 / 412, caption: ["Design House India Pvt. Ltd.", "Interiors, Manufacturing & Execution"] },
  { name: "ENSIS", logo: "/ensis.jpeg", ratio: 1600 / 639, caption: ["Our Own Brand", "Spa & Wellness Furniture"] },
  { name: "Sleepwell", logo: sleepwellLogo, ratio: 1, caption: ["Mattress & Home Comfort", "Solutions"] },
  { name: "Encodency", logo: "/encodencylogo.jpeg", ratio: 800 / 224, caption: ["Technology Partner", "Website & Digital Solutions"] },
];

/* "Our Brands & Associates": heading on the left, brand logo cards on the right with an
   "Our Partners" link above them. */
const BrandsAssociates = () => (
  <section className="relative w-full bg-white">
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-3 lg:pt-4 pb-5 lg:pb-6 grid lg:grid-cols-[30%_1fr] gap-8 items-center">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="w-5 h-[2.5px] bg-[#fd6e15] rounded-full inline-block" />
          <span className="text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.2em] text-[#fd6e15]">Our Associates</span>
        </div>
        <h2 className="text-[30px] sm:text-[36px] lg:text-[42px] font-serif font-medium leading-[1.1] tracking-tight text-[#0A2B5E] mb-3">
          Our Brands &amp;
          <br />
          <span className="text-[#fd6e15]">Associates</span>
        </h2>
        <p className="text-[13.5px] sm:text-[14px] text-[#333] leading-relaxed max-w-[400px]">
          We work with trusted brands and associates to deliver integrated solutions, combining design, manufacturing and
          execution expertise for diverse industries.
        </p>
      </div>

      <div>
        <div className="flex justify-end mb-3">
          <Link
            href="/about/associates"
            className="group inline-flex items-center gap-1.5 rounded-md border border-[#134698] px-3.5 py-1.5 text-[12px] font-semibold text-[#134698] hover:bg-[#134698] hover:text-white transition-colors"
          >
            Our Partners
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {BRANDS.map(({ name, logo, ratio, caption, fit = "object-contain" }, i) => (
            // Logos rise, scale up and fade in one after another the first time the row scrolls into view
            <m.li
              key={name}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.55, delay: i * 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-full aspect-[5/3] rounded-md bg-white flex items-center justify-center overflow-hidden shadow-[rgba(0,0,0,0.02)_0px_1px_3px_0px,rgba(27,31,35,0.15)_0px_0px_0px_1px] mb-2.5">
                {/* Square logo files carry a lot of padding, so they are drawn larger than wide ones */}
                <div className="relative" style={{ width: ratio > 1.5 ? "78%" : "70%", aspectRatio: ratio }}>
                  <Image src={logo} alt={name} fill sizes="(min-width: 768px) 30vw, 90vw" className={fit} />
                </div>
              </div>
              <p className="text-[12.5px] font-semibold text-[#0A2B5E] leading-snug">{caption[0]}</p>
              <p className="text-[12px] text-[#46658C] leading-snug">{caption[1]}</p>
            </m.li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

export default BrandsAssociates;
