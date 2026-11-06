import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import CardImageBadge from "./CardImageBadge";
import { HOME, HomeEyebrow } from "./homeLook";
import type { ServiceDetail } from "./types";

type Offer = NonNullable<ServiceDetail["offer"]>;

// Thin lines fanning out from the section's corners
const CornerLines = ({ className }: { className: string }) => (
  <svg aria-hidden="true" viewBox="0 0 220 62" fill="none" preserveAspectRatio="none" className={`pointer-events-none absolute hidden h-[62px] w-[220px] lg:block ${className}`}>
    <g stroke="#F7A34B" strokeOpacity="0.5" strokeWidth="0.6">
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
        <path key={i} d={`M0 ${6 + i * 5}C60 ${26 + i * 3} 130 ${38 + i} 220 2`} />
      ))}
    </g>
  </svg>
);

/* "What We Offer": a centred heading and a row of six cards. A card's image may have its icon, curve and rounded
   corners in it, in which case the card only adds the title, the text and the link; otherwise the icon is drawn on
   it. look "home": the home page's heading, colours and card hover. */
const ServiceOffer = ({ offer, look }: { offer: Offer; look?: ServiceDetail["look"] }) => {
  const home = look === "home";
  const orange = home ? HOME.orange : "#F98A0C";
  return (
    <section className="relative w-full overflow-hidden bg-white">
      <CornerLines className="left-0 top-0 -scale-y-100" />
      <CornerLines className="right-0 top-0 -scale-100" />
      <CornerLines className="bottom-0 left-0" />
      <CornerLines className="bottom-0 right-0 -scale-x-100" />

      <div className="relative px-4 py-6 sm:px-6 lg:px-[max(2rem,calc((100vw-1440px)/2+2rem))] lg:py-8">
        {home ? (
          <>
            <HomeEyebrow center>{offer.eyebrow}</HomeEyebrow>
            <h2 className={`text-center ${HOME.heading}`}>
              {offer.title[0]} <span className={HOME.accent}>{offer.title[1]}</span>
            </h2>
            <p className={`mx-auto mt-3 max-w-[820px] text-center ${HOME.offerText}`}>{offer.text}</p>
          </>
        ) : (
          <>
            <div className="flex items-center justify-center gap-3">
              <span className="h-[3px] w-8 rounded-full bg-[#F98A0C] sm:w-10" />
              <span className="text-[13px] font-bold uppercase tracking-[0.04em] text-[#0A2B5E] sm:text-[14px]">{offer.eyebrow}</span>
              <span className="h-[3px] w-8 rounded-full bg-[#F98A0C] sm:w-10" />
            </div>
            <h2 className="mt-2 text-center font-serif text-[28px] font-semibold leading-[1.15] text-[#0A2B5E] sm:text-[34px] lg:text-[38px]">
              {offer.title[0]} <span className="text-[#F98A0C]">{offer.title[1]}</span>
            </h2>
            <p className="mx-auto mt-3 max-w-[820px] text-center text-[13.5px] leading-relaxed text-[#33415C] sm:text-[14.5px]">{offer.text}</p>
          </>
        )}

        <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 xl:grid-cols-6 xl:gap-3">
          {offer.items.map(({ title, text, image, alt, href, icon }) => (
            <li key={title} className={`group flex flex-col overflow-hidden rounded-[20px] bg-white shadow-[0_4px_16px_rgba(10,43,94,0.12)] ${home ? HOME.card : ""}`}>
              <div className="relative aspect-[3/2] overflow-hidden">
                <Image src={image} alt={alt} fill placeholder="blur" sizes="(min-width: 1280px) 17vw, (min-width: 640px) 33vw, 50vw" className={`object-cover ${home ? "transition-transform duration-500 group-hover:scale-105" : ""}`} />
                {icon && <CardImageBadge icon={icon} color={orange} />}
              </div>

              <div className="flex flex-1 flex-col px-3 pb-4 pt-1 text-center">
                <h3 className={home ? `${HOME.offerCardTitle} ${HOME.cardTitle}` : "text-[14px] font-bold leading-snug text-[#0A2B5E] 2xl:text-[15px]"}>{title}</h3>
                <p className={`mt-1.5 ${home ? HOME.offerCardText : "text-[12px] leading-[1.4] 2xl:text-[12.5px] text-[#46556E]"}`}>{text}</p>

                <div className="mt-auto pt-3">
                  <span className="mx-auto block h-px w-7 bg-[#9AA6B8]" />
                  <Link href={href} aria-label={`More information about ${title}`} className={`group/link mt-3 inline-flex items-center gap-1.5 text-[12px] font-bold ${home ? "text-[#134698] hover:text-[#fd6e15]" : "text-[#0A2B5E] hover:text-[#F98A0C]"}`}>
                    More Information
                    <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full text-white transition-transform group-hover/link:translate-x-0.5" style={{ backgroundColor: orange }}>
                      <ArrowRight className="h-3 w-3" strokeWidth={2.4} />
                    </span>
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ServiceOffer;
