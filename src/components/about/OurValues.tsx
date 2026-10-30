import { Gem, Handshake, Lightbulb, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const VALUES: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: Gem, title: "Quality", desc: "Commitment to excellence in every detail." },
  { icon: ShieldCheck, title: "Integrity", desc: "Transparent and ethical business practices." },
  { icon: Lightbulb, title: "Innovation", desc: "Bringing new ideas to every project." },
  { icon: Handshake, title: "Client Focus", desc: "Building long-term partnerships with trust." },
];

/* "Our Values": heading on the left, four value columns with dividers on the right. */
const OurValues = () => (
  <section className="relative w-full bg-[#F7F9FC]">
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10 grid lg:grid-cols-[34%_1fr] gap-8 items-center">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="w-5 h-[2.5px] bg-[#fd6e15] rounded-full inline-block" />
          <span className="text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.2em] text-[#fd6e15]">Our Values</span>
        </div>
        <h2 className="text-[28px] sm:text-[32px] lg:text-[36px] font-serif font-medium leading-[1.1] tracking-tight text-[#0A2B5E] mb-3">
          The Principles
          <br />
          That Guide Us
        </h2>
        <p className="text-[13.5px] sm:text-[14px] text-[#333] leading-relaxed max-w-[420px]">
          Our values define how we work, how we build relationships and the standards we maintain in every project.
        </p>
      </div>

      <ul className="grid grid-cols-2 md:grid-cols-4 gap-y-6">
        {VALUES.map(({ icon: Icon, title, desc }, i) => (
          <li key={title} className={`flex flex-col items-center text-center px-4 ${i > 0 ? "md:border-l border-[#E3E8F0]" : ""}`}>
            <span className="w-14 h-14 rounded-full bg-white ring-1 ring-[#fd6e15]/25 shadow-[0_6px_16px_-8px_rgba(253,110,21,0.45)] flex items-center justify-center mb-3">
              <Icon className="w-6 h-6 text-[#fd6e15]" strokeWidth={1.6} />
            </span>
            <h3 className="text-[15px] font-bold text-[#0A2B5E] mb-1">{title}</h3>
            <p className="text-[12.5px] text-[#46658C] leading-snug max-w-[180px]">{desc}</p>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default OurValues;
