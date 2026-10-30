"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";

import Eyebrow from "./Eyebrow";

/* FAQs: heading with "View All FAQs", then the questions in two columns; each opens on click. Optional
   numbering, light-blue background and gold text link. Takes plain data only (it runs in the browser,
   so no icon components). */
const ServiceFaqs = ({
  name,
  faqs,
  heading,
  numbered = false,
  tone = "white",
}: {
  name: string;
  faqs: { q: string; a: string }[];
  heading?: { title: string; text: string };
  numbered?: boolean;
  tone?: "white" | "blue";
}) => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className={`w-full ${tone === "blue" ? "bg-[#EEF4FB]" : "bg-white"}`}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
          <div>
            <Eyebrow>Frequently Asked Questions</Eyebrow>
            <h2 className="text-[28px] sm:text-[34px] lg:text-[38px] font-serif font-medium leading-[1.1] text-[#0A2B5E] mb-2">{heading?.title ?? "Quick Answers"}</h2>
            <p className="text-[13.5px] sm:text-[14.5px] text-[#333]">{heading?.text ?? `Common questions about our ${name.toLowerCase()} services.`}</p>
          </div>
          <Link
            href="/#faqs"
            className={
              tone === "blue"
                ? "group inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#0A2B5E] hover:text-[#D9963B] transition-colors"
                : "group inline-flex items-center gap-2 rounded-md bg-[#D9963B] hover:bg-[#C4832D] px-5 py-2.5 text-white text-[13px] font-semibold transition-colors"
            }
          >
            View All FAQs
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          {faqs.map(({ q, a }, i) => {
            const isOpen = open === i;
            return (
              <li key={q} className="rounded-md bg-white shadow-[rgba(0,0,0,0.02)_0px_1px_3px_0px,rgba(27,31,35,0.15)_0px_0px_0px_1px]">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="flex items-center gap-3">
                    {numbered && (
                      <span className="w-8 h-8 shrink-0 rounded-full bg-[#FFF3E6] ring-1 ring-[#E8A64C]/50 text-[11.5px] font-bold text-[#D9963B] flex items-center justify-center">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    )}
                    <span className="text-[14px] font-semibold text-[#0A2B5E]">{q}</span>
                  </span>
                  <Plus className={`w-4 h-4 shrink-0 ${numbered ? "text-[#D9963B]" : "text-[#0A2B5E]"} transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`} />
                </button>
                <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <p className={`pb-4 pr-5 text-[13px] text-[#4A5568] leading-relaxed ${numbered ? "pl-16" : "pl-5"}`}>{a}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default ServiceFaqs;
