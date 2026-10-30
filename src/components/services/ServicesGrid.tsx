"use client";

import Image from "next/image";
import Link from "next/link";
import { m } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { SERVICES } from "./data";
import sketchImg from "@/assets/image/orange.png";

/* "Our Services": heading with a short intro, then numbered service cards (photo, number, title, text,
   "View Projects" and an arrow) linking to the projects page. */
const ServicesGrid = () => (
  <section className="w-full bg-white">
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-2 lg:pt-3 pb-8 lg:pb-10">
      <div className="relative flex flex-col md:flex-row md:items-center gap-3 md:gap-10 mb-4 md:min-h-[90px]">
        {/* Faint orange building sketch at the right end of the heading row; its lower half runs behind
            the first row of cards. Styled like the About page MD's Message */}
        <div
          className="hidden md:block absolute -top-3 -bottom-[210px] right-0 w-[34%] opacity-40 pointer-events-none"
          style={{ maskImage: "linear-gradient(to right, transparent, black 45%)", WebkitMaskImage: "linear-gradient(to right, transparent, black 45%)" }}
          aria-hidden="true"
        >
          <Image src={sketchImg} alt="" fill placeholder="blur" sizes="34vw" className="object-contain object-right" />
        </div>
        <h2 className="relative shrink-0 text-[30px] sm:text-[36px] lg:text-[40px] font-serif font-semibold leading-none text-[#0A2B5E]">
          Our Services
          <span className="block w-14 h-[3px] bg-[#E8A64C] mt-3" />
        </h2>
        <p className="relative text-[13.5px] sm:text-[14.5px] text-[#333] leading-relaxed">
          Explore our complete range of services designed to create functional, inspiring and
          <br className="hidden lg:block" /> future-ready spaces. Click on any service to view our projects.
        </p>
      </div>

      <ul className="relative [perspective:1200px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {SERVICES.map(({ title, desc, image, logo, href }, i) => (
          // Each card flips up out of a blur, left to right along its row, the first time the row scrolls in
          <m.li
            key={title}
            initial={{ opacity: 0, y: 60, rotateX: 28, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, delay: (i % 5) * 0.13, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "50% 100%" }}
          >
            <Link
              href={href ?? "/portfolio"}
              className="group flex flex-col h-full rounded-md bg-white overflow-hidden shadow-[rgba(0,0,0,0.02)_0px_1px_3px_0px,rgba(27,31,35,0.15)_0px_0px_0px_1px] hover:shadow-[0_10px_24px_-12px_rgba(10,43,94,0.35)] transition-shadow"
            >
              <div className="relative h-[150px] overflow-hidden">
                <Image
                  src={image}
                  alt={title.replace(/\n/g, " ")}
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {logo && (
                  <div className="absolute inset-x-0 bottom-0 h-[44px] bg-white/95 flex items-center justify-center">
                    <div className="relative h-[34px] w-[60%]">
                      <Image src={logo} alt="ENSIS" fill sizes="160px" className="object-contain" />
                    </div>
                  </div>
                )}
              </div>
              <div className="flex flex-col flex-1 px-4 pt-3 pb-4">
                <p className="text-[13px] font-bold text-[#E8A64C] mb-1">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="text-[16px] font-bold text-[#0A2B5E] leading-snug mb-1.5 whitespace-pre-line group-hover:text-[#fd6e15] transition-colors">{title}</h3>
                <p className="text-[14.5px] text-black leading-snug mb-4 lg:whitespace-pre-line">{desc}</p>
                <div className="mt-auto flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#0A2B5E]">
                    View Projects
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="w-9 h-9 rounded-full bg-[#E8A64C] text-white flex items-center justify-center group-hover:bg-[#fd6e15] transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          </m.li>
        ))}
      </ul>
    </div>
  </section>
);

export default ServicesGrid;
