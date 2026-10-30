import { Fragment } from "react";
import { ArrowRight } from "lucide-react";

import Eyebrow from "./Eyebrow";
import type { ServiceDetail } from "./types";

/* "Our Process": four numbered steps in gold-ringed circles, joined by arrows (white or warm background). */
const ServiceProcess = ({ data }: { data: ServiceDetail }) => {
  const { process } = data;
  return (
    <section className={`w-full ${process.tone === "warm" ? "bg-[#FBF5EE]" : "bg-white"}`}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-5 lg:py-6">
        <Eyebrow>Our Process</Eyebrow>
        <h2 className="text-[28px] sm:text-[34px] lg:text-[38px] font-serif font-medium leading-[1.1] text-[#0A2B5E] mb-2">{process.title}</h2>
        <p className="text-[13.5px] sm:text-[14.5px] text-[#333] mb-5">{process.text}</p>

        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-center gap-5 lg:gap-4">
          {process.steps.map(({ title, text }, i) => (
            <Fragment key={title}>
              {i > 0 && <ArrowRight className="hidden lg:block w-5 h-5 text-[#9AA6B8]" aria-hidden="true" />}
              <li className="flex items-center gap-4">
                <span className="w-14 h-14 shrink-0 rounded-full bg-[#FFF8F0] ring-2 ring-[#E8A64C]/60 flex items-center justify-center font-serif text-[20px] text-[#D9963B]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-[14px] font-bold text-[#0A2B5E] leading-snug mb-1">{title}</h3>
                  <p className="text-[12.5px] text-[#5B6B82] leading-snug">{text}</p>
                </div>
              </li>
            </Fragment>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default ServiceProcess;
