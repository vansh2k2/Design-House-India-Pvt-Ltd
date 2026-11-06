"use client";

import { useState } from "react";
import Image, { type StaticImageData } from "next/image";

/* FAQs beside a photo: the photo on the left fades into white, the heading and the questions on the right.
   The first question starts open; each opens on click. Part of CorporatePage. */
const CorporateFaqs = ({ faqs, image }: { faqs: { q: string; a: string }[]; image: StaticImageData }) => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative w-full overflow-hidden bg-white">
      {/* Photo: on top on small screens, the left half on large ones */}
      <div className="relative h-[220px] sm:h-[300px] lg:absolute lg:inset-y-0 lg:left-0 lg:h-auto lg:w-[50%]">
        <Image src={image} alt="" aria-hidden="true" fill quality={90} placeholder="blur" sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        {/* Only the edge next to the questions fades into white, so the rest of the photo stays sharp */}
        <div aria-hidden="true" className="absolute inset-0 lg:hidden" style={{ background: "linear-gradient(to top, #fff 0%, rgba(255,255,255,0) 25%)" }} />
        <div
          aria-hidden="true"
          className="absolute inset-0 hidden lg:block"
          style={{ background: "linear-gradient(to right, rgba(255,255,255,0) 72%, rgba(255,255,255,0.6) 88%, #fff 100%)" }}
        />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-4 pb-10 pt-2 sm:px-6 lg:px-8 lg:py-10">
        <div className="lg:ml-[42%]">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3">
              <span className="h-[2px] w-12 rounded-full bg-[#F28C1B] sm:w-16" />
              <span className="text-[13px] sm:text-[15px] font-extrabold uppercase tracking-[0.08em] text-[#0A2B5E]">Frequently Asked</span>
              <span className="h-[2px] w-12 rounded-full bg-[#F28C1B] sm:w-16" />
            </div>
            <h2 className="mt-1 font-serif text-[30px] sm:text-[38px] lg:text-[42px] font-medium leading-[1.15] text-[#0A2B5E]">
              Questions <span className="text-[#F28C1B]">(FAQs)</span>
            </h2>
          </div>

          <ul className="mt-6 space-y-3">
            {faqs.map(({ q, a }, i) => {
              const isOpen = open === i;
              return (
                <li key={q} className="overflow-hidden rounded-[10px] bg-white shadow-[rgba(50,50,93,0.25)_0px_2px_5px_-1px,rgba(0,0,0,0.3)_0px_1px_3px_-1px]">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${i}`}
                    className={`flex w-full items-center justify-between gap-4 px-5 py-3.5 text-left transition-colors duration-300 ${isOpen ? "bg-[#FDF1E4]" : "hover:bg-[#FFF8F0]"}`}
                  >
                    <span className="text-[14.5px] sm:text-[16px] font-semibold leading-snug text-[#0A2B5E]">{q}</span>
                    {/* Plus that turns into a minus: the upright bar spins and shrinks away */}
                    <span
                      aria-hidden="true"
                      className={`relative h-6 w-6 shrink-0 rounded-full border-[1.5px] border-[#F28C1B] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen ? "rotate-180 bg-[#F28C1B]/10" : ""}`}
                    >
                      <span className="absolute left-1/2 top-1/2 h-[2px] w-[10px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F28C1B]" />
                      <span
                        className={`absolute left-1/2 top-1/2 h-[10px] w-[2px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F28C1B] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen ? "scale-y-0" : "scale-y-100"}`}
                      />
                    </span>
                  </button>
                  {/* The answer's row grows from 0 to its full height, and the text fades and slides in */}
                  <div
                    id={`faq-answer-${i}`}
                    role="region"
                    className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                  >
                    <div className="overflow-hidden">
                      <p
                        className={`px-5 pb-4 pt-3 text-[13.5px] sm:text-[14.5px] leading-[1.6] text-[#2E3A4E] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen ? "translate-y-0 opacity-100 delay-100" : "-translate-y-2 opacity-0"}`}
                      >
                        {a}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default CorporateFaqs;
