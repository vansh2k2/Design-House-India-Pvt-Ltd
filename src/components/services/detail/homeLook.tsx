import type { ReactNode } from "react";

/* The home page's section styles (components/home), for a service page that sets look: "home" (see types.ts).
   Only the look changes: the sections keep their own text, sizes of boxes and spacing. */
export const HOME = {
  orange: "#fd6e15",
  heading: "text-3xl sm:text-4xl lg:text-[42px] font-serif font-medium leading-[1.08] tracking-tight text-[#0A2B5E]",
  accent: "text-[#fd6e15]",
  body: "text-[13.5px] sm:text-[14.5px] text-black leading-relaxed",
  // The text sizes and weights of the matching home section
  offerText: "text-[14px] sm:text-[15px] text-black font-semibold leading-relaxed", // What We Do
  offerCardTitle: "text-[12.5px] sm:text-[13px] font-bold text-[#0A2B5E] leading-[1.25]",
  offerCardText: "text-[10.5px] sm:text-[11px] text-black font-medium leading-snug",
  pointTitle: "text-[13px] 2xl:text-[13.5px] font-semibold tracking-[-0.01em] text-[#0A2B5E] leading-tight", // Why Choose Us
  pointText: "text-[12px] sm:text-[12.5px] text-[#333] leading-snug",
  stepTitle: "text-[16px] xl:text-[17px] font-bold text-[#0A2B5E] leading-tight", // Approach
  stepText: "text-[12.5px] xl:text-[13px] text-black leading-snug",
  projectTitle: "text-[14.5px] sm:text-[15.5px] font-bold text-[#0A2B5E] leading-tight", // Our Projects
  projectPlace: "text-[11px] sm:text-[11.5px] font-medium text-[#46658C] leading-tight mt-1",
  faqHeading: "text-[26px] sm:text-[30px] lg:text-[34px] font-serif font-medium leading-[1.15] tracking-tight text-[#0A2B5E]", // FAQs
  faqText: "text-[13.5px] sm:text-[14.5px] text-[#1F2D44] leading-relaxed",
  faqQuestion: "text-[13.5px] sm:text-[14px] font-semibold text-[#0A2B5E] leading-snug",
  faqAnswer: "text-[12.5px] text-[#3B4A63] leading-relaxed",
  primaryButton:
    "group inline-flex items-center justify-center gap-2.5 rounded-[4px] bg-[#fd6e15] hover:bg-[#e05d0e] px-4 sm:px-5 py-2.5 text-white text-[11px] sm:text-[11.5px] font-bold uppercase tracking-wider shadow-[0_6px_16px_rgba(253,110,21,0.3)] transition-colors",
  secondaryButton:
    "group inline-flex items-center justify-center gap-2.5 rounded-[4px] border border-[#134698] bg-white px-4 sm:px-5 py-2.5 text-[#134698] hover:bg-[#134698] hover:text-white text-[11px] sm:text-[11.5px] font-bold uppercase tracking-wider transition-colors",
  buttonArrow: "w-3.5 h-3.5 transition-transform group-hover:translate-x-1",
  // A card lifts with a soft shadow, and its title turns orange
  card: "transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_-10px_rgba(10,43,94,0.28)]",
  cardTitle: "transition-colors group-hover:text-[#fd6e15]",
};

// orange: the eyebrow of the home Approach and FAQs sections
export const HomeEyebrow = ({ children, center = false, light = false, orange = false }: { children: ReactNode; center?: boolean; light?: boolean; orange?: boolean }) => (
  <div className={`flex items-center gap-2 mb-2 ${center ? "justify-center" : ""}`}>
    <span className="w-5 h-[2.5px] bg-[#fd6e15] rounded-full inline-block" />
    <span className={`text-[12.5px] sm:text-[14px] font-bold uppercase tracking-[0.2em] ${light ? "text-white/90" : orange ? "text-[#fd6e15]" : "text-[#134698]"}`}>{children}</span>
  </div>
);
