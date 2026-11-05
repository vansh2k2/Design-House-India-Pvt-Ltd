"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";

import type { ServiceDetail } from "../detail/types";

/* The residential page's FAQs: one open at a time (the first to begin with), with an orange +/− in a circle */
const ResidentialFaqs = ({ faqs }: { faqs: ServiceDetail["faqs"] }) => {
  const [open, setOpen] = useState(0);

  return (
    <ul className="mx-auto mt-8 flex max-w-[860px] flex-col gap-3">
      {faqs.map(({ q, a }, i) => {
        const isOpen = open === i;
        return (
          <li key={q} className="overflow-hidden rounded-[12px] bg-white shadow-[0_6px_20px_-12px_rgba(11,35,80,0.35)] ring-1 ring-black/5">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className={`flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition ${isOpen ? "bg-[#FDF0E1]" : "hover:bg-[#FFF9F2]"}`}
            >
              <span className="text-[14.5px] sm:text-[16px] font-semibold text-[#0B2350]">{q}</span>
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 border-[#D9862B] text-[#D9862B]">
                {isOpen ? <Minus className="h-3.5 w-3.5" strokeWidth={3} /> : <Plus className="h-3.5 w-3.5" strokeWidth={3} />}
              </span>
            </button>
            <div className={`grid transition-[grid-template-rows] duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
              <div className="overflow-hidden">
                <p className="px-5 pb-5 pt-3 text-[13.5px] sm:text-[14.5px] leading-[1.6] text-[#475569]">{a}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default ResidentialFaqs;
