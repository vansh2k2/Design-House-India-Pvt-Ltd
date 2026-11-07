import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import OfferReveal from "./OfferReveal";
import type { CorporateDesign } from "./types";

type Offer = CorporateDesign["offer"];

// Faint gold waves in a corner of the section
const CornerWaves = ({ className }: { className: string }) => (
  <svg aria-hidden="true" viewBox="0 0 260 90" fill="none" className={`pointer-events-none absolute hidden h-[90px] w-[260px] md:block ${className}`}>
    <g stroke="#EBB57A" strokeOpacity="0.55" strokeWidth="1">
      {[0, 7, 14, 21, 28, 35].map((d) => (
        <path key={d} d={`M-10 ${70 - d}C50 ${30 - d} 110 ${95 - d} 180 ${45 - d}S250 ${10 - d} 280 ${20 - d}`} />
      ))}
    </g>
  </svg>
);

/* "What We Offer": a centred heading, then a row of cards, each with a photo that ends in an orange arc, an
   icon on the arc, a title, a short text and a "More Information" link. Part of CorporatePage. */
const CorporateOffer = ({ offer }: { offer: Offer }) => (
  <section className="relative w-full overflow-hidden bg-[#FFFBF7]">
    <CornerWaves className="left-0 top-0" />
    <CornerWaves className="right-0 top-0 -scale-x-100" />
    <CornerWaves className="bottom-0 left-0 -scale-y-100" />

    <div className="relative mx-auto max-w-[1400px] px-4 pb-6 pt-6 sm:px-6 lg:px-8 lg:pb-7 lg:pt-8">
      <div className="mx-auto max-w-[900px] text-center">
        <div className="flex items-center justify-center gap-3">
          <span className="h-[3px] w-10 rounded-full bg-[#F28C1B] sm:w-12" />
          <span className="text-[13px] sm:text-[15px] font-extrabold uppercase tracking-[0.06em] text-[#0A2B5E]">{offer.eyebrow ?? "What We Offer"}</span>
          <span className="h-[3px] w-10 rounded-full bg-[#F28C1B] sm:w-12" />
        </div>

        <h2 className="mt-1 text-[28px] sm:text-[36px] lg:text-[42px] font-serif font-medium leading-[1.15] tracking-[-0.01em] text-[#0A2B5E]">
          {offer.title[0]} <span className="text-[#F28C1B]">{offer.title[1]}</span>
        </h2>

        <p className="mx-auto mt-3 max-w-[860px] text-[14px] sm:text-[15.5px] leading-[1.6] text-[#2E3A4E]">{offer.text}</p>
      </div>

      {/* The cards come in one by one as they scroll into view (OfferReveal) */}
      <OfferReveal className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 xl:gap-4 2xl:gap-5">
        {offer.items.map(({ image, icon: Icon, title, text, href }) => (
          <li key={title} className="flex flex-col overflow-hidden rounded-[12px] bg-white shadow-[rgba(50,50,93,0.25)_0px_2px_5px_-1px,rgba(0,0,0,0.3)_0px_1px_3px_-1px]">
            {/* Taller than the photos' own 16:9, so the photo shows more; its sides are trimmed a little. With
                tallPhotos the photo is taller still and the text below sits closer, so the card keeps its height */}
            <div className={`co-shine relative ${offer.tallPhotos ? "aspect-[7/5]" : "aspect-[3/2]"}`}>
              <Image
                src={image}
                alt=""
                fill
                placeholder={typeof image !== "string" ? "blur" : undefined}
                sizes="(min-width: 1280px) 16vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="co-photo object-cover"
              />
              {/* The photo ends in an arc, edged in orange */}
              <svg aria-hidden="true" viewBox="0 0 200 34" preserveAspectRatio="none" className="absolute inset-x-0 -bottom-px h-[34px] w-full">
                <path d="M0 34V24Q100 -6 200 24V34Z" fill="#fff" />
                <path className="co-arc" pathLength={1} d="M0 24Q100 -6 200 24" stroke="#F28C1B" strokeWidth="3.5" fill="none" vectorEffect="non-scaling-stroke" />
              </svg>
              {/* Centred on the top of the arc (25px above the photo's bottom edge) */}
              <span className="co-icon absolute bottom-[-2px] left-1/2 flex h-[54px] w-[54px] -translate-x-1/2 items-center justify-center rounded-full bg-white ring-2 ring-[#F28C1B] shadow-[0_3px_10px_rgba(242,140,27,0.25)]">
                <Icon className="h-7 w-7 text-[#F28C1B]" strokeWidth={1.6} />
              </span>
            </div>

            <div className={`flex flex-1 flex-col items-center px-4 text-center xl:px-2.5 2xl:px-4 ${offer.tallPhotos ? "pb-2 pt-2" : "pb-3 pt-3"}`}>
              <h3 className="co-rise text-[16px] xl:text-[14px] 2xl:text-[16px] font-semibold leading-tight text-[#0A2B5E]">{title}</h3>
              <p style={{ "--co-step": 1 } as React.CSSProperties} className={`co-rise text-[13px] xl:text-[11.5px] 2xl:text-[13px] leading-[1.45] text-[#3B4658] [text-wrap:balance] ${offer.tallPhotos ? "mt-1" : "mt-1.5"}`}>{text}</p>

              {/* Pushed to the bottom, so the links line up across the row */}
              <span style={{ "--co-step": 2 } as React.CSSProperties} className={`co-rise mt-auto block ${offer.tallPhotos ? "pt-1.5" : "pt-2.5"}`}>
                <span className="mx-auto block h-px w-10 bg-[#B9C0CC]" />
              </span>
              <Link
                href={href ?? "/contact"}
                style={{ "--co-step": 3 } as React.CSSProperties}
                className={`co-rise group inline-flex items-center gap-2.5 text-[13px] xl:text-[12.5px] 2xl:text-[13px] font-bold text-[#0A2B5E] hover:text-[#F28C1B] ${offer.tallPhotos ? "mt-1.5" : "mt-2.5"}`}
              >
                More Information
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F28C1B] text-white transition-transform group-hover:translate-x-0.5">
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.4} />
                </span>
                <span className="sr-only"> about {title}</span>
              </Link>
            </div>
          </li>
        ))}
      </OfferReveal>
    </div>
  </section>
);

export default CorporateOffer;
