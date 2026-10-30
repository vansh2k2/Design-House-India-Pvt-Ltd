import Image from "next/image";

import Eyebrow from "./Eyebrow";
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

/* "Why Choose Us" / "Overview".
   split (default): edge-to-edge photo on the left half, heading, text and four icon points on the right.
   overview: the same photo / text split, then the points in a row with dividers under it. */
const ServiceWhy = ({ data }: { data: ServiceDetail }) => {
  const { why } = data;

  if (why.layout === "overview") {
    return (
      <section className="w-full bg-white">
        {/* Same photo / text split as the default layout */}
        <div className="grid lg:grid-cols-2">
          <div className="relative h-[260px] sm:h-[340px] lg:h-auto lg:min-h-[340px]">
            <Image src={why.image} alt="" fill placeholder="blur" sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
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
        <div className="relative h-[260px] sm:h-[340px] lg:h-auto lg:min-h-[340px]">
          <Image src={why.image} alt="" fill placeholder="blur" sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
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
