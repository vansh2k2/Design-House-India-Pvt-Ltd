import { HIGHLIGHTS } from "./data";

/* "From Concept to Completion": intro text on the left, four highlights (icon + title + line) on the right,
   split by a thin divider. */
const ServicesIntro = () => (
  <section className="w-full bg-[#F7F8FA]">
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10 grid lg:grid-cols-[1fr_auto_1fr] gap-8 items-center">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="w-6 h-[2px] bg-[#E8A64C]" />
          <span className="text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.2em] text-[#0A2B5E]">Our Services</span>
        </div>
        <h2 className="text-[28px] sm:text-[34px] lg:text-[38px] font-serif font-semibold leading-[1.1] text-[#0A2B5E] mb-1.5">
          From Concept to Completion
        </h2>
        <p className="font-serif font-semibold text-[18px] sm:text-[22px] text-[#D9963B] leading-snug mb-4">Designing Spaces for Businesses and Homes</p>
        <p className="text-[13.5px] sm:text-[14.5px] text-[#333] leading-relaxed max-w-[640px]">
          At Design House India Pvt. Ltd., we offer end-to-end interior, design, manufacturing and turnkey solutions. With
          innovative ideas, in-house manufacturing and expert execution, we create functional, aesthetic and future-ready
          spaces for corporate, retail, hospitality, residential and wellness environments.
        </p>
      </div>

      <span className="hidden lg:block w-px self-stretch bg-[#DCE3EE]" aria-hidden="true" />

      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {HIGHLIGHTS.map(({ icon: Icon, title, text }) => (
          <li key={title} className="flex items-start gap-3.5">
            <span className="w-14 h-14 shrink-0 rounded-full bg-[#FFF3E6] ring-1 ring-[#E8A64C]/30 flex items-center justify-center">
              <Icon className="w-6 h-6 text-[#0A2B5E]" strokeWidth={1.6} />
            </span>
            <div>
              <h3 className="text-[14px] font-bold text-[#0A2B5E] leading-snug mb-1 whitespace-pre-line">{title}</h3>
              <p className="text-[12.5px] text-[#5B6B82] leading-snug">{text}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default ServicesIntro;
