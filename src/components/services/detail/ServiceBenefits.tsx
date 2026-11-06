import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { HOME, HomeEyebrow } from "./homeLook";
import type { ServiceDetail } from "./types";

type Benefits = NonNullable<ServiceDetail["benefits"]>;

/* "Core Benefits": a soft, misty photo behind a centred heading, six frosted cards and one button.
   look "home": the home page's heading, colours, button and card hover. */
const ServiceBenefits = ({ benefits, look }: { benefits: Benefits; look?: ServiceDetail["look"] }) => {
  const home = look === "home";
  return (
    <section className="relative w-full overflow-hidden bg-[#FBF5EE]">
      <Image src={benefits.image} alt="" fill placeholder="blur" sizes="100vw" className={`object-cover ${benefits.imageReady ? "" : "blur-[1px]"}`} />
      {!benefits.imageReady && <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(253,248,241,0.93)_38%,rgba(253,248,241,0.38)_100%)]" />}

      <div className="relative px-4 py-7 sm:px-6 lg:px-[max(2rem,calc((100vw-1440px)/2+2rem))] lg:py-9">
        {home ? (
          <>
            <HomeEyebrow center>{benefits.eyebrow}</HomeEyebrow>
            <h2 className={`text-center ${HOME.heading}`}>
              {benefits.title[0]} <span className={HOME.accent}>{benefits.title[1]}</span>
            </h2>
            <p className={`mx-auto mt-3 max-w-[820px] text-center ${HOME.body}`}>{benefits.text}</p>
          </>
        ) : (
          <>
            <div className="flex items-center justify-center gap-3">
              <span className="h-[3px] w-8 rounded-full bg-[#F98A0C] sm:w-10" />
              <span className="text-[13px] font-bold uppercase tracking-[0.04em] text-[#0A2B5E] sm:text-[14px]">{benefits.eyebrow}</span>
              <span className="h-[3px] w-8 rounded-full bg-[#F98A0C] sm:w-10" />
            </div>
            <h2 className="mt-2 text-center font-serif text-[28px] font-semibold leading-[1.15] text-[#0A2B5E] sm:text-[34px] lg:text-[38px]">
              {benefits.title[0]} <span className="text-[#F98A0C]">{benefits.title[1]}</span>
            </h2>
            <p className="mx-auto mt-3 max-w-[820px] text-center text-[13.5px] leading-relaxed text-[#33415C] sm:text-[14.5px]">{benefits.text}</p>
          </>
        )}

        <ul className="mx-auto mt-6 grid max-w-[1180px] gap-4 sm:grid-cols-2 xl:grid-cols-3 xl:gap-5">
          {benefits.items.map(({ icon: Icon, title, text }) => (
            <li
              key={title}
              className={`group relative flex items-center gap-3.5 overflow-hidden rounded-[18px] border border-white/80 bg-white/70 p-4 shadow-[0_8px_22px_rgba(201,125,40,0.16)] backdrop-blur-md xl:px-5 xl:py-[18px] ${home ? HOME.card : ""}`}
            >
              <svg aria-hidden="true" viewBox="0 0 90 36" className="pointer-events-none absolute left-0 top-0 h-[36px] w-[90px]">
                <path d="M0 22A22 22 0 0 1 22 0H90C60 1 34 2 18 9 8 14 2 22 0 36Z" fill={home ? HOME.orange : "#F5A623"} />
              </svg>

              <span
                className={`relative flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-full ${
                  home ? "bg-[#FFF5EE] shadow-[0_2px_8px_rgba(253,110,21,0.18)]" : "bg-[radial-gradient(circle,#FFFFFF_35%,#FFE7C8_100%)] shadow-[0_2px_8px_rgba(201,125,40,0.22)]"
                }`}
              >
                <Icon className={`h-[30px] w-[30px] ${home ? "text-[#fd6e15]" : "text-[#0A2B5E]"}`} strokeWidth={home ? 1.8 : 1.4} />
              </span>

              <span aria-hidden="true" className={`h-[58px] w-px shrink-0 ${home ? "bg-[#fd6e15]/60" : "bg-[#F98A0C]/70"}`} />

              <div className="relative min-w-0">
                <h3 className={home ? `${HOME.pointTitle} ${HOME.cardTitle}` : "text-[15px] font-bold leading-snug text-[#0A2B5E]"}>{title}</h3>
                <p className={`mt-1 ${home ? HOME.pointText : "text-[12.5px] leading-[1.4] text-[#33415C]"}`}>{text}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-7 flex justify-center">
          <Link
            href={benefits.cta.href}
            className={
              home
                ? HOME.primaryButton
                : "group inline-flex h-12 items-center justify-center gap-3 rounded-[10px] border border-[#FFC27A] bg-gradient-to-r from-[#EE8A12] to-[#D96F06] px-7 text-center text-[14.5px] font-semibold text-white shadow-[0_6px_18px_rgba(217,111,6,0.4)] transition-opacity hover:opacity-90"
            }
          >
            {benefits.cta.label}
            <ArrowRight className={home ? HOME.buttonArrow : "h-[18px] w-[18px] shrink-0 transition-transform group-hover:translate-x-1"} strokeWidth={home ? 2 : 1.8} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServiceBenefits;
