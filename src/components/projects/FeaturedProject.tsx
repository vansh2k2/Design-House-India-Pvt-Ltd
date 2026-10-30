"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { FEATURED } from "./data";
import { BODY, CONTAINER, CtaButton, Eyebrow, HEADING, RuledBlock } from "./ui";

/* Featured Project: text on the left, a photo slider running to the right edge of the page. */

const FeaturedProject = () => {
  const [index, setIndex] = useState(0);
  const slide = FEATURED[index];
  const go = (step: number) => setIndex((i) => (i + step + FEATURED.length) % FEATURED.length);

  return (
    <section className="relative bg-white overflow-hidden">
      <div className="lg:absolute lg:top-0 lg:bottom-0 lg:right-0 lg:w-[59%] lg:flex lg:items-center">
        <div className="relative w-full aspect-[5/2]">
          {FEATURED.map((s, i) => (
            <Image
              key={s.image}
              src={s.image}
              alt={i === index ? s.title : ""}
              fill
              sizes="(min-width: 1024px) 59vw, 100vw"
              className={`object-cover transition-opacity duration-700 ${i === index ? "opacity-100" : "opacity-0"}`}
            />
          ))}
          {/* Photo melts into the white text side */}
          <div className="hidden lg:block absolute inset-y-0 left-0 w-[22%] bg-gradient-to-r from-white via-white/60 to-transparent pointer-events-none" />

          <div className="absolute bottom-3 right-4 sm:bottom-4 sm:right-6 flex gap-2">
            {[
              { label: "Previous project", icon: ArrowLeft, step: -1 },
              { label: "Next project", icon: ArrowRight, step: 1 },
            ].map(({ label, icon: Icon, step }) => (
              <button
                key={label}
                type="button"
                onClick={() => go(step)}
                aria-label={label}
                className="w-10 h-9 sm:w-11 sm:h-10 flex items-center justify-center rounded-md border border-white/70 bg-black/35 backdrop-blur-sm text-white hover:bg-[#fd6e15] hover:border-[#fd6e15] transition-colors"
              >
                <Icon className="w-4 h-4" />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={`relative ${CONTAINER} py-7 sm:py-8 lg:py-0 lg:min-h-[350px] lg:flex lg:items-center`}>
        <div key={slide.title} className="lg:w-[39%] animate-fade-in">
          <RuledBlock>
            <Eyebrow>Featured Project</Eyebrow>
            <h2 className={HEADING}>
              {slide.title}
            </h2>
          </RuledBlock>
          <div className="pl-6 sm:pl-8">
            <p className="flex flex-wrap items-center gap-x-4 text-[14px] sm:text-[15px] font-semibold mt-2.5 mb-2.5">
              <span className="text-[#fd6e15]">{slide.category}</span>
              <span className="text-[#46658C]/50 font-normal">|</span>
              <span className="text-[#134698]">{slide.location}</span>
            </p>
            <p className={`${BODY} max-w-[520px] mb-6`}>{slide.description}</p>
            <CtaButton href={slide.href}>View Project Details</CtaButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProject;
