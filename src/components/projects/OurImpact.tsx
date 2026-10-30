import CountUp from "@/components/home/strengths/CountUp";

import { IMPACT } from "./data";
import { CONTAINER, Eyebrow } from "./ui";

/* Four headline facts in a row, split by thin vertical rules; figures styled like the home page's client stats. */
const OurImpact = () => (
  <section className="bg-white">
    <div className={`${CONTAINER} pt-6 pb-7`}>
      <div className="pl-6 sm:pl-8 mb-3">
        <Eyebrow>Our Impact</Eyebrow>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-6 pl-6 sm:pl-8">
        {IMPACT.map(({ icon: Icon, end, suffix, text, label }, i) => (
          <div key={label} className={`flex items-center gap-4 ${i % 4 ? "lg:border-l lg:border-[#E2E6F0] lg:pl-[12%]" : ""}`}>
            <span className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-full bg-[#FFFCF7] border-[1.5px] border-[#F2DABC] text-[#134698]">
              <Icon className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={1.6} />
            </span>
            <div>
              <p className="text-[24px] sm:text-[28px] font-bold text-[#fd6e15] leading-none mb-1.5">
                {end !== undefined ? <CountUp end={end} suffix={suffix} /> : text}
              </p>
              <p className="text-[13px] text-[#46658C] leading-tight">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default OurImpact;
