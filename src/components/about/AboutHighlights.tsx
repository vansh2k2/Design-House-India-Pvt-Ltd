import { CalendarDays, Factory, Handshake, LayoutGrid, MapPin } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const HIGHLIGHTS: { icon: LucideIcon; label: [string, string] }[] = [
  { icon: CalendarDays, label: ["Since", "2004"] },
  { icon: LayoutGrid, label: ["End-to-End", "Solutions"] },
  { icon: Factory, label: ["Diverse", "Industries"] },
  { icon: MapPin, label: ["Pan India", "Presence"] },
  { icon: Handshake, label: ["Long-Term", "Partnerships"] },
];

/* Row of five key facts under the hero, separated by thin dividers. */
const AboutHighlights = () => (
  <section className="relative w-full bg-white border-y border-[#E8EDF4]">
    <ul className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-5">
      {HIGHLIGHTS.map(({ icon: Icon, label }, i) => (
        <li
          key={label.join(" ")}
          className={`flex items-center justify-center gap-3 px-3 ${i > 0 ? "lg:border-l border-[#E3E8F0]" : ""}`}
        >
          <span className="w-12 h-12 shrink-0 rounded-full bg-[#FFF4EC] ring-1 ring-[#fd6e15]/25 flex items-center justify-center">
            <Icon className="w-5 h-5 text-[#fd6e15]" strokeWidth={1.7} />
          </span>
          <p className="text-[13.5px] font-semibold text-[#0A2B5E] leading-tight">
            {label[0]}
            <br />
            {label[1]}
          </p>
        </li>
      ))}
    </ul>
  </section>
);

export default AboutHighlights;
