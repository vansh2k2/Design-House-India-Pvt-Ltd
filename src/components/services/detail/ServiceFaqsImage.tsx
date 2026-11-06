"use client";

import { useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { Plus } from "lucide-react";

import Eyebrow from "./Eyebrow";
import { HOME, HomeEyebrow } from "./homeLook";

/* FAQs over an image that leaves room on its right: the heading and the questions in one column there, each opening
   on click. Same sizes and spacing as the other FAQs layout. Below lg the image sits above the questions.
   look "home": the home page's heading and colours.
   compact: a shorter section: the image is cut to a wider shape (top and bottom) and the questions sit closer. */
const ServiceFaqsImage = ({
  name,
  faqs,
  heading,
  numbered = false,
  image,
  textFrom = "46%",
  compact = false,
  look,
}: {
  name: string;
  faqs: { q: string; a: string }[];
  heading?: { title: string; text: string };
  numbered?: boolean;
  image: StaticImageData;
  textFrom?: string; // where the image's free space begins, as a share of its width
  compact?: boolean;
  look?: "home";
}) => {
  const home = look === "home";
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="w-full bg-white">
      <div className={`max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 ${compact ? "py-6 lg:py-6" : "py-8 lg:py-10"}`}>
        <div
          className="relative lg:flex lg:aspect-[var(--faq-ratio)] lg:flex-col lg:justify-center"
          style={{ "--faq-ratio": compact ? "13 / 5" : `${image.width} / ${image.height}`, "--faq-text": textFrom } as React.CSSProperties}
        >
          <div className="relative h-[240px] overflow-hidden rounded-md sm:h-[320px] lg:absolute lg:inset-0 lg:h-auto lg:rounded-none">
            <Image src={image} alt="" fill placeholder="blur" sizes="(min-width: 1400px) 1336px, 100vw" className="object-cover object-left" />
          </div>

          <div className={`relative pt-6 lg:ml-[var(--faq-text)] lg:pr-6 ${compact ? "lg:py-4" : "lg:py-6"}`}>
            {home ? <HomeEyebrow orange>Frequently Asked Questions</HomeEyebrow> : <Eyebrow>Frequently Asked Questions</Eyebrow>}
            <h2 className={home ? `${HOME.faqHeading} mb-3` : "text-[28px] sm:text-[34px] lg:text-[38px] font-serif font-medium leading-[1.1] text-[#0A2B5E] mb-2"}>{heading?.title ?? "Quick Answers"}</h2>
            <p className={`${compact ? "mb-4" : "mb-6"} ${home ? HOME.faqText : "text-[13.5px] sm:text-[14.5px] text-[#333]"}`}>{heading?.text ?? `Common questions about our ${name.toLowerCase()} services.`}</p>

            <ul className={`grid grid-cols-1 ${compact ? "gap-2" : "gap-3"}`}>
              {faqs.map(({ q, a }, i) => {
                const isOpen = open === i;
                return (
                  <li key={q} className="rounded-md bg-white shadow-[rgba(0,0,0,0.02)_0px_1px_3px_0px,rgba(27,31,35,0.15)_0px_0px_0px_1px]">
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className={`w-full flex items-center justify-between gap-4 px-5 text-left ${compact ? "py-2.5" : "py-3.5"}`}
                    >
                      <span className="flex items-center gap-3">
                        {numbered && (
                          <span className={`w-8 h-8 shrink-0 rounded-full text-[11.5px] font-bold flex items-center justify-center ${home ? "bg-[#FFF5EE] ring-1 ring-[#fd6e15]/40 text-[#fd6e15]" : "bg-[#FFF3E6] ring-1 ring-[#E8A64C]/50 text-[#D9963B]"}`}>
                            {String(i + 1).padStart(2, "0")}
                          </span>
                        )}
                        <span className={home ? HOME.faqQuestion : "text-[14px] font-semibold text-[#0A2B5E]"}>{q}</span>
                      </span>
                      <Plus className={`w-4 h-4 shrink-0 ${home ? "text-[#fd6e15]" : "text-[#D9963B]"} transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`} />
                    </button>
                    <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                      <div className="overflow-hidden">
                        <p className={`pb-4 pr-5 ${home ? HOME.faqAnswer : "text-[13px] text-[#4A5568] leading-relaxed"} ${numbered ? "pl-16" : "pl-5"}`}>{a}</p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceFaqsImage;
