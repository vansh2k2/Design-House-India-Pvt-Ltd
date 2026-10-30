import { ArrowRight } from "lucide-react";

import { PROCESS } from "./data";
import { BODY, CONTAINER, Eyebrow, HEADING, RuledBlock } from "./ui";

/* Heading on the left, four numbered steps joined by arrows on the right. */
const OurProcess = () => (
  <section className="bg-[#FAFBFD]">
    <div className={`${CONTAINER} pt-7 sm:pt-8 lg:pt-7 pb-7 lg:pb-8 grid lg:grid-cols-[30%_70%] gap-8 lg:gap-0 items-center`}>
      <div>
        <RuledBlock className="mb-3">
          <Eyebrow>Our Process</Eyebrow>
          <h2 className={HEADING}>
            From Concept
            <br />
            to Completion
          </h2>
        </RuledBlock>
        <p className={`pl-6 sm:pl-8 ${BODY} max-w-[360px]`}>
          A streamlined approach that ensures quality, efficiency and on-time delivery.
        </p>
      </div>

      <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
        {PROCESS.map(({ icon: Icon, title, text }, i) => (
          <li key={title} className="relative">
            {i > 0 && (
              <>
                <ArrowRight className="hidden lg:block absolute -left-9 top-[18px] w-5 h-5 text-[#134698]" aria-hidden="true" />
                <span className="hidden lg:block absolute -left-6 bottom-1 h-[52px] w-px bg-[#E2E6F0]" aria-hidden="true" />
              </>
            )}
            <div className="flex items-center gap-4 mb-3">
              <span className="flex items-center justify-center w-12 h-12 sm:w-[52px] sm:h-[52px] shrink-0 rounded-full bg-white border-[1.5px] border-[#F2DABC] text-[14px] font-bold text-[#0A2B5E]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <Icon className="w-9 h-9 text-[#134698]" strokeWidth={1.5} />
            </div>
            <h3 className="text-[14px] sm:text-[15px] font-bold text-[#0A2B5E] leading-tight mb-1.5">{title}</h3>
            <p className="text-[12.5px] sm:text-[13px] text-[#333] leading-relaxed">{text}</p>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default OurProcess;
