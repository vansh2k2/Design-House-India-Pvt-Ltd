import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Eyebrow from "./Eyebrow";
import { HOME, HomeEyebrow } from "./homeLook";
import type { ServiceDetail } from "./types";

type Why = ServiceDetail["why"];

// Overview layout uses a semibold title; the split layout keeps medium
const Heading = ({ why }: { why: Why }) => (
  <>
    <Eyebrow>{why.eyebrow ?? "Why Choose Us"}</Eyebrow>
    <h2
      className={`text-[30px] sm:text-[36px] lg:text-[40px] font-serif ${why.layout === "overview" ? "font-semibold" : "font-medium"} leading-[1.08] text-[#0A2B5E] mb-3`}
    >
      {why.title[0]}
      <br />
      <span className="text-[#D9963B]">{why.title[1]}</span>
    </h2>
    <p className="text-[13.5px] sm:text-[14.5px] text-[#333] leading-relaxed">{why.text}</p>
  </>
);

const Point = ({ point }: { point: Why["points"][number] }) => {
  const { icon: Icon, title, text } = point;
  return (
    <>
      <span className="w-14 h-14 shrink-0 rounded-full bg-[#FFF3E6] ring-1 ring-[#E8A64C]/40 flex items-center justify-center">
        <Icon className="w-7 h-7 text-[#D9963B]" strokeWidth={1.7} />
      </span>
      <div>
        <h3 className="whitespace-pre-line text-[14px] font-bold text-[#0A2B5E] leading-snug mb-1">{title}</h3>
        <p className="text-[12.5px] text-[#5B6B82] leading-snug">{text}</p>
      </div>
    </>
  );
};

// Left padding that lines the photo up with the 1440px page container (px-4 / px-6 / px-8 inside it)
const PHOTO_GUTTER = "pl-4 pr-4 sm:pl-6 sm:pr-6 lg:pr-0 lg:pl-[max(2rem,calc((100vw-1440px)/2+2rem))]";

/* "Why Choose Us" / "Overview".
   split (default): edge-to-edge photo on the left half, heading, text and four icon points on the right.
   overview: the same photo / text split, then the points in a row with dividers under it.
   banner: an image with its curve in it, inside the page's left and right margins, and the same heading on it; the
   points in a row and two buttons. */
const ServiceWhy = ({ data }: { data: ServiceDetail }) => {
  const { why } = data;

  if (why.layout === "banner") {
    const home = data.look === "home";
    return (
      <section className="w-full bg-white mt-5 lg:mt-6 px-4 sm:px-6 lg:px-[max(2rem,calc((100vw-1440px)/2+2rem))]">
        <div
          className="relative lg:flex lg:aspect-[var(--why-ratio)] lg:flex-col lg:justify-center"
          style={{ "--why-ratio": typeof why.image === "string" ? "3 / 1" : `${why.image.width} / ${why.image.height}`, "--why-text": why.bannerTextEnd ?? "46%" } as React.CSSProperties}
        >
          <div className="relative h-[260px] overflow-hidden sm:h-[340px] lg:absolute lg:inset-0 lg:h-auto">
            <Image src={why.image} alt="" fill placeholder={typeof why.image !== "string" ? "blur" : undefined} sizes="(min-width: 1440px) 1376px, 100vw" className="object-cover object-right lg:object-left" />
          </div>

          {/* The image's curve is at about 46% of its width, so the text stops before it. Narrower screens make the
              banner taller and so the image wider, which moves the curve further right. */}
          <div className="relative py-5 lg:w-[calc(var(--why-text)+14%)] lg:py-6 lg:pl-12 xl:w-[var(--why-text)]">
            {home ? (
              <>
                <HomeEyebrow>{why.eyebrow ?? "Why Choose Us"}</HomeEyebrow>
                <h2 className={`${HOME.heading} mb-2.5`}>
                  {why.title[0]}
                  <br />
                  <span className={HOME.accent}>{why.title[1]}</span>
                </h2>
                <p className={HOME.body}>{why.text}</p>
              </>
            ) : (
              <Heading why={why} />
            )}

            <ul className="grid grid-cols-2 gap-y-5 mt-6 lg:grid-cols-4 lg:gap-y-0">
              {why.points.map(({ icon: Icon, title, text }, i) => (
                <li key={title} className={`px-2 text-center ${i > 0 ? "lg:border-l lg:border-[#E3E8F0]" : ""}`}>
                  <Icon className={`mx-auto mb-2 w-10 h-10 ${home ? "text-[#fd6e15]" : "text-[#D9963B]"}`} strokeWidth={1.5} />
                  <h3 className={`whitespace-pre-line mb-1 ${home ? HOME.pointTitle : "text-[14px] font-bold text-[#0A2B5E] leading-snug"}`}>{title}</h3>
                  <p className={home ? HOME.pointText : "text-[12.5px] leading-snug text-[#5B6B82]"}>{text}</p>
                </li>
              ))}
            </ul>

            {why.buttons && (
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href={why.buttons.primary.href} className={home ? HOME.primaryButton : "group inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-md bg-[#D9963B] px-5 text-[13.5px] font-semibold text-white transition-colors hover:bg-[#C4832D]"}>
                  {why.buttons.primary.label}
                  <ArrowRight className={home ? HOME.buttonArrow : "w-4 h-4 transition-transform group-hover:translate-x-1"} />
                </Link>
                <Link href={why.buttons.secondary.href} className={home ? HOME.secondaryButton : "group inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-md border-[1.5px] border-[#0A2B5E] bg-white px-5 text-[13.5px] font-semibold text-[#0A2B5E] transition-colors hover:bg-[#0A2B5E] hover:text-white"}>
                  {why.buttons.secondary.label}
                  <ArrowRight className={home ? HOME.buttonArrow : "w-4 h-4 transition-transform group-hover:translate-x-1"} />
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  if (why.layout === "overview") {
    return (
      <section className="w-full bg-white">
        {/* Same photo / text split as the default layout */}
        <div className="grid lg:grid-cols-2">
          <div className={PHOTO_GUTTER}>
            <div className="relative h-[260px] sm:h-[340px] lg:h-full lg:min-h-[340px]">
              <Image
                src={why.image}
                alt=""
                fill
                placeholder={typeof why.image !== "string" ? "blur" : undefined}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
          <div className="px-4 sm:px-8 lg:px-12 py-5 lg:py-6 max-w-[700px] self-center">
            <Heading why={why} />
          </div>
        </div>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-3">
          <ul className={`grid grid-cols-1 sm:grid-cols-2 ${why.points.length > 5 ? "lg:grid-cols-3 xl:grid-cols-6" : why.points.length > 4 ? "lg:grid-cols-5" : "lg:grid-cols-4"} gap-y-5`}>
            {why.points.map((point, i) => (
              <li key={point.title} className={`flex items-start gap-3.5 px-4 ${i > 0 ? "lg:border-l border-[#E3E8F0]" : ""}`}>
                <Point point={point} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-white mt-5 lg:mt-6">
      <div className="grid lg:grid-cols-2">
        {/* The photo starts at the page's left edge (as the About page's Who We Are text does), not at the screen's */}
        <div className={PHOTO_GUTTER}>
          <div className="relative h-[260px] sm:h-[340px] lg:h-full lg:min-h-[340px]">
            <Image
              src={why.image}
              alt=""
              fill
              placeholder={typeof why.image !== "string" ? "blur" : undefined}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="px-4 sm:px-8 lg:px-12 py-5 lg:py-6 max-w-[700px] self-center">
          <Heading why={why} />

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5 mt-6">
            {why.points.map((point) => (
              <li key={point.title} className="flex items-start gap-3.5">
                <Point point={point} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ServiceWhy;
