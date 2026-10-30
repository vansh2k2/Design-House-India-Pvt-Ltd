"use client";

import type { LucideIcon } from "lucide-react";

import { ALL_ICON, CATEGORIES } from "./data";
import { CONTAINER } from "./ui";

/* Row of round category icons under the hero; picking one filters the Our Projects grid. */

const Tab = ({ label, icon: Icon, active, onClick }: { label: string; icon: LucideIcon; active: boolean; onClick: () => void }) => {
  // Two-line label, as in the design ("Corporate / Interiors")
  const words = label.split(" ");
  const split = Math.ceil(words.length / 2);
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className="group flex flex-col items-center shrink-0 w-[96px] lg:w-auto focus:outline-none"
    >
      <span
        className={`relative z-10 flex items-center justify-center w-[60px] h-[60px] sm:w-[66px] sm:h-[66px] rounded-full transition-all duration-300 ${
          active
            ? "bg-[#0A2B5E] text-white shadow-[0_8px_18px_rgba(10,43,94,0.3)]"
            : "bg-[#FFFCF7] text-[#134698] border-[1.5px] border-[#F2DABC] group-hover:border-[#fd6e15] group-hover:-translate-y-0.5"
        }`}
      >
        <Icon className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={1.6} />
      </span>
      <span
        className={`-mt-1 pt-3 pb-1.5 px-3 rounded-md text-[12px] sm:text-[12.5px] leading-[1.35] text-center transition-colors ${
          active
            ? "bg-white font-bold text-[#0A2B5E] shadow-[0_6px_16px_rgba(10,43,94,0.10)]"
            : "font-semibold text-[#46658C] group-hover:text-[#0A2B5E]"
        }`}
      >
        {words.slice(0, split).join(" ")}
        <br />
        {words.slice(split).join(" ")}
      </span>
    </button>
  );
};

const CategoryBar = ({ value, onChange }: { value: string; onChange: (category: string) => void }) => (
  <section className="bg-white">
    <div className={`${CONTAINER} py-5`}>
      <div className="flex lg:grid lg:grid-cols-9 gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 [scrollbar-width:none]">
        <Tab label="All Projects" icon={ALL_ICON} active={value === ""} onClick={() => onChange("")} />
        {CATEGORIES.map((c) => (
          <Tab key={c.label} label={c.label} icon={c.icon} active={value === c.label} onClick={() => onChange(c.label)} />
        ))}
      </div>
    </div>
  </section>
);

export default CategoryBar;
