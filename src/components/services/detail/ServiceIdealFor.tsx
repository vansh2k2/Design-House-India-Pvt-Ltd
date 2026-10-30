import Image from "next/image";
import { CircleCheck } from "lucide-react";

import Eyebrow from "./Eyebrow";
import type { ServiceDetail } from "./types";

/* "Ideal For": either a photo on the left half with a two-column check list beside it, or (with tiles) a row
   of icon tiles split by dividers. */
const ServiceIdealFor = ({ data }: { data: ServiceDetail }) => {
  const { idealFor } = data;
  const title = (
    <h2 className="text-[28px] sm:text-[34px] lg:text-[38px] font-serif font-medium leading-[1.1] text-[#0A2B5E] mb-2">
      {idealFor.title.map((line, i) => (
        <span key={line}>
          {i > 0 && <br />}
          {line}
        </span>
      ))}
    </h2>
  );

  if (idealFor.tiles) {
    return (
      <section className="w-full bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-5 lg:py-6">
          <Eyebrow>Ideal For</Eyebrow>
          {title}
          {idealFor.text && <p className="text-[13.5px] sm:text-[14.5px] text-[#333] mb-5">{idealFor.text}</p>}
          <ul className={`grid grid-cols-2 sm:grid-cols-3 ${idealFor.tiles.length > 6 ? "lg:grid-cols-7" : "lg:grid-cols-6"} gap-y-5 mt-4`}>
            {idealFor.tiles.map(({ icon: Icon, label }, i) => (
              <li key={label} className={`flex flex-col items-center text-center gap-2.5 px-3 ${i > 0 ? "lg:border-l border-[#E3E8F0]" : ""}`}>
                <span className="w-14 h-14 rounded-full bg-[#FFF3E6] ring-1 ring-[#E8A64C]/40 flex items-center justify-center">
                  <Icon className={`w-6 h-6 ${idealFor.iconTone === "navy" ? "text-[#0A2B5E]" : "text-[#D9963B]"}`} strokeWidth={1.6} />
                </span>
                <span className="whitespace-pre-line text-[13px] font-semibold text-[#0A2B5E] leading-tight">{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-white">
      <div className="grid lg:grid-cols-2">
        {idealFor.image && (
          <div className="relative h-[260px] sm:h-[340px] lg:h-auto lg:min-h-[300px]">
            <Image src={idealFor.image} alt="" fill placeholder="blur" sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
        )}

        <div className="px-4 sm:px-8 lg:px-12 py-5 lg:py-6 max-w-[700px] self-center">
          <Eyebrow>Ideal For</Eyebrow>
          {title}
          {idealFor.text && <p className="text-[13.5px] sm:text-[14.5px] text-black font-semibold mb-5">{idealFor.text}</p>}

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
            {idealFor.items?.map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-[13.5px] text-black font-semibold">
                <CircleCheck className="w-5 h-5 shrink-0 fill-[#E8A64C] text-white" strokeWidth={2.2} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ServiceIdealFor;
