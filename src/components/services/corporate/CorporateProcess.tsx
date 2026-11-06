import Image from "next/image";

import type { CorporateDesign } from "./types";

type ProcessCards = CorporateDesign["process"];

/* "Our Process" as a row of photo cards: a centred serif heading, then one card per step with a photo, an
   icon on the photo's bottom edge, a title, a short orange bar and a short text. Part of
   CorporatePage. */
const CorporateProcess = ({ process }: { process: ProcessCards }) => (
  <section className="w-full bg-[#FBF5EE]">
    <div className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
      <div className="mx-auto max-w-[900px] text-center">
        <div className="flex items-center justify-center gap-3">
          <span className="h-[2px] w-12 rounded-full bg-[#F28C1B] sm:w-16" />
          <span className="text-[13px] sm:text-[15px] font-extrabold uppercase tracking-[0.08em] text-[#0A2B5E]">{process.eyebrow ?? "Our Process"}</span>
          <span className="h-[2px] w-12 rounded-full bg-[#F28C1B] sm:w-16" />
        </div>
        <h2 className="mt-2 font-serif text-[30px] sm:text-[38px] lg:text-[46px] font-medium leading-[1.1] text-[#0A2B5E]">
          {process.title[0]} <span className="text-[#F28C1B]">{process.title[1]}</span>
        </h2>
        <p className="mx-auto mt-3 max-w-[760px] text-[14px] sm:text-[15.5px] leading-[1.55] text-[#2E3A4E]">{process.text}</p>
      </div>

      <ol className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 xl:gap-4">
        {process.steps.map(({ image, icon: Icon, title, text }) => (
          <li key={title} className="flex flex-col rounded-[16px] bg-white shadow-[rgba(50,50,93,0.25)_0px_2px_5px_-1px,rgba(0,0,0,0.3)_0px_1px_3px_-1px]">
            <div className="relative">
              <div className="relative aspect-[16/10] overflow-hidden rounded-t-[16px]">
                <Image
                  src={image}
                  alt=""
                  fill
                  placeholder={typeof image !== "string" ? "blur" : undefined}
                  sizes="(min-width: 1280px) 16vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              {/* Half on the photo, half on the card */}
              <span className="absolute bottom-0 left-1/2 flex h-[54px] w-[54px] -translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[0_3px_12px_rgba(242,140,27,0.3)] ring-1 ring-[#F28C1B]/30">
                <Icon className="h-7 w-7 text-[#F28C1B]" strokeWidth={1.6} />
              </span>
            </div>

            <div className="flex flex-1 flex-col items-center px-4 pb-5 pt-9 text-center xl:px-2 2xl:px-4">
              {/* Two lines tall, so the bars and texts line up across the row */}
              <h3 className="flex min-h-[2.5em] items-center text-[15px] xl:text-[13px] 2xl:text-[14.5px] font-semibold leading-[1.25] text-[#0A2B5E]">
                <span>
                  {title.split("\n").map((line) => (
                    <span key={line} className="block xl:whitespace-nowrap">
                      {line}
                    </span>
                  ))}
                </span>
              </h3>
              <span aria-hidden="true" className="mt-2.5 h-[3px] w-10 rounded-full bg-[#F28C1B]" />
              <p className="mt-3 text-[13.5px] xl:text-[12.5px] 2xl:text-[13.5px] leading-[1.5] text-[#2E3A4E]">{text}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default CorporateProcess;
