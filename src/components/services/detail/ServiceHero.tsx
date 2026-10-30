import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";

import type { ServiceDetail } from "./types";

const GOLD_CUT_TOP = "16%";
const GOLD_BORDER = "8px";

/* Banner: breadcrumb, optional eyebrow, two-line title (gold second line), tagline, text and buttons on the
   left; the service photo on the right, either fading into white or cut on a gold-edged diagonal (with
   optional words over it). Features: a compact card over the photo, or a full-width strip with text. */
const ServiceHero = ({ data }: { data: ServiceDetail }) => {
  const { hero, name } = data;
  const isCut = hero.photoStyle === "cut";
  const featureStrip = hero.features.some((f) => f.text);

  return (
    <section className="relative w-full bg-white pt-[56px] sm:pt-[68px]">
      <div className="relative overflow-hidden">
        {/* Photo (lg+) */}
        <div className={`hidden lg:block absolute inset-y-0 right-0 ${isCut ? "w-[58%]" : "w-[62%]"}`} aria-hidden="true">
          {isCut ? (
            <>
              <div
                className="absolute inset-0 bg-gradient-to-b from-[#E8A64C] to-[#C98A3A]"
                style={{ clipPath: `polygon(${GOLD_CUT_TOP} 0, 100% 0, 100% 100%, 0 100%)` }}
              />
              <div
                className="absolute inset-0"
                style={{ clipPath: `polygon(calc(${GOLD_CUT_TOP} + ${GOLD_BORDER}) 0, 100% 0, 100% 100%, ${GOLD_BORDER} 100%)` }}
              >
                <Image src={hero.image} alt="" fill priority placeholder="blur" sizes="58vw" className="object-cover" />
                {hero.photoWords && <div className="absolute inset-y-0 right-0 w-[30%] bg-gradient-to-l from-black/55 to-transparent" />}
              </div>
              {hero.photoWords && (
                <div className="absolute top-1/2 -translate-y-1/2 right-[5%]">
                  <ul className="space-y-1">
                    {hero.photoWords.map((w) => (
                      <li key={w} className="text-white text-[18px] xl:text-[20px] font-medium uppercase tracking-[0.06em] leading-tight">
                        {w}
                      </li>
                    ))}
                  </ul>
                  <span className="block w-10 h-[2px] bg-[#E8A64C] mt-4" />
                </div>
              )}
            </>
          ) : (
            <>
              <Image src={hero.image} alt="" fill priority placeholder="blur" sizes="62vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/60 via-25% to-transparent to-55%" />
            </>
          )}
        </div>

        <div className={`relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-5 ${featureStrip ? "pb-8 lg:pb-10" : "pb-8 lg:pb-24"}`}>
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[12px] text-[#46658C] mb-3">
            <Link href="/" className="hover:text-[#E8A64C]">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            {data.servicesCrumb !== false && (
              <>
                <Link href="/services" className="hover:text-[#E8A64C]">Our Services</Link>
                <ChevronRight className="w-3.5 h-3.5" />
              </>
            )}
            <span className="text-[#0A2B5E]">{name}</span>
          </nav>

          <div className={isCut ? "max-w-[480px]" : "max-w-[540px]"}>
            {hero.eyebrow && (
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-[2px] bg-[#E8A64C]" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0A2B5E]">{hero.eyebrow}</span>
              </div>
            )}
            {hero.brandLogo && (
              <div className="mb-4">
                <Image
                  src={hero.brandLogo.src}
                  alt={hero.brandLogo.alt}
                  width={hero.brandLogo.width}
                  height={hero.brandLogo.height}
                  className="h-[54px] w-auto"
                />
                {hero.brandLogo.tagline && <p className="text-[12.5px] text-[#0A2B5E] mt-1">{hero.brandLogo.tagline}</p>}
              </div>
            )}
            <h1 className="text-[38px] sm:text-[48px] lg:text-[54px] font-serif font-medium leading-[1.02] text-[#0A2B5E] mb-4">
              {hero.title[0]}
              <br />
              <span className="text-[#D9963B]">{hero.title[1]}</span>
            </h1>
            {hero.tagline && <p className="text-[16px] sm:text-[18px] font-semibold text-[#0A2B5E] leading-snug mb-3">{hero.tagline}</p>}
            <p className="text-[13.5px] sm:text-[14.5px] text-[#333] leading-relaxed mb-6">{hero.text}</p>
            <div className="flex flex-wrap gap-3">
              <Link
                href={hero.primaryCta?.href ?? "/contact"}
                className="group inline-flex items-center gap-2 rounded-md bg-[#D9963B] hover:bg-[#C4832D] px-6 py-3 text-white text-[13.5px] font-semibold shadow-[0_6px_16px_rgba(217,150,59,0.35)] transition-colors"
              >
                {hero.primaryCta?.label ?? "Enquire Now"}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              {hero.secondaryCta && (
                <Link
                  href={hero.secondaryCtaLink?.href ?? "/portfolio"}
                  className="group inline-flex items-center gap-2 rounded-md border-[1.5px] border-[#0A2B5E] px-6 py-3 text-[#0A2B5E] text-[13.5px] font-semibold hover:bg-[#0A2B5E] hover:text-white transition-colors"
                >
                  {hero.secondaryCtaLink?.label ?? "View Projects"}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Photo on phones/tablets */}
        <div className="lg:hidden relative h-[240px] sm:h-[320px]">
          <Image src={hero.image} alt="" fill priority placeholder="blur" sizes="100vw" className="object-cover" />
        </div>
      </div>

      {featureStrip ? (
        // Full-width strip: icon, title and a short line per feature, split by thin dividers
        <div className="border-b border-[#EEF1F6]">
          <ul className={`max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-5 grid grid-cols-2 md:grid-cols-3 ${hero.features.length > 5 ? "lg:grid-cols-6" : "lg:grid-cols-5"} gap-y-5`}>
            {hero.features.map(({ icon: Icon, label, text }, i) => (
              <li key={label} className={`flex items-start gap-3 px-3 ${i > 0 ? "lg:border-l border-[#E3E8F0]" : ""}`}>
                <span className="w-12 h-12 shrink-0 rounded-full bg-[#FFF3E6] ring-1 ring-[#E8A64C]/40 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[#D9963B]" strokeWidth={1.7} />
                </span>
                <div>
                  <p className="whitespace-pre-line text-[13px] font-bold text-[#0A2B5E] leading-tight mb-1">{label}</p>
                  {text && <p className="text-[11.5px] text-[#5B6B82] leading-snug">{text}</p>}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        // Compact card overlapping the bottom of the photo on lg+
        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 lg:-mt-16">
          <ul className="lg:ml-auto lg:w-[64%] grid grid-cols-2 md:grid-cols-4 gap-4 rounded-md bg-white px-5 py-4 shadow-[0_10px_30px_-12px_rgba(10,43,94,0.3)]">
            {hero.features.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3">
                <span className="w-12 h-12 shrink-0 rounded-full bg-[#FFF3E6] ring-1 ring-[#E8A64C]/40 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[#D9963B]" strokeWidth={1.7} />
                </span>
                <span className="whitespace-pre-line text-[13px] font-semibold text-[#0A2B5E] leading-tight">{label}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default ServiceHero;
