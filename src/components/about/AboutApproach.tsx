import { Fragment } from "react";
import { ArrowRight, ClipboardList, Factory, Headset, PencilRuler } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const STEPS: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: ClipboardList, title: "Understand\nYour Requirements", desc: "We listen, analyse\nand define project goals." },
  { icon: PencilRuler, title: "Design & Planning", desc: "Creative concepts with functional and technical detailing." },
  { icon: Factory, title: "Manufacturing & Execution", desc: "Quality production and on-site implementation with precision." },
  { icon: Headset, title: "Handover & Support", desc: "On-time delivery and continued support for long-term value." },
];

/* "Our Approach": four numbered step cards joined by arrows. */
const AboutApproach = () => (
  <section className="relative w-full bg-white">
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
      <div className="flex items-center gap-2 mb-2">
        <span className="w-5 h-[2.5px] bg-[#fd6e15] rounded-full inline-block" />
        <span className="text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.2em] text-[#fd6e15]">Our Approach</span>
      </div>
      <h2 className="text-[28px] sm:text-[32px] lg:text-[36px] font-serif font-medium leading-[1.1] tracking-tight text-[#0A2B5E] mb-2">
        From Concept to Reality
      </h2>
      <p className="text-[13.5px] sm:text-[14.5px] text-[#333] mb-6">
        A streamlined process to deliver spaces that work for your business.
      </p>

      <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-stretch gap-4 lg:gap-3">
        {STEPS.map(({ icon: Icon, title, desc }, i) => (
          <Fragment key={title}>
            {i > 0 && <ArrowRight className="hidden lg:block self-center w-5 h-5 text-[#fd6e15]" aria-hidden="true" />}
            <li className="flex items-start gap-3.5 rounded-md bg-white p-4 shadow-[rgba(0,0,0,0.02)_0px_1px_3px_0px,rgba(27,31,35,0.15)_0px_0px_0px_1px]">
              <span className="w-12 h-12 shrink-0 rounded-full bg-[#FFF4EC] ring-1 ring-[#fd6e15]/25 flex items-center justify-center">
                <Icon className="w-5 h-5 text-[#fd6e15]" strokeWidth={1.7} />
              </span>
              <div className="min-w-0">
                <p className="text-[18px] font-bold text-[#0A2B5E] leading-none mb-1.5">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="text-[13.5px] font-bold text-[#0A2B5E] leading-snug mb-1 whitespace-pre-line">{title}</h3>
                <p className="text-[12px] text-black leading-snug whitespace-pre-line">{desc}</p>
              </div>
            </li>
          </Fragment>
        ))}
      </ol>
    </div>
  </section>
);

export default AboutApproach;
