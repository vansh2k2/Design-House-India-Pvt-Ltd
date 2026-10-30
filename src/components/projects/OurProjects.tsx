"use client";

import { ChevronDown, Search } from "lucide-react";

import { PROJECT_CATEGORIES, PROJECT_LOCATIONS, PROJECTS } from "./data";
import ProjectCard from "./ProjectCard";
import { CONTAINER, Eyebrow, HEADING, RuledBlock } from "./ui";

/* "Our Projects" grid with a search box and category / location dropdowns. The category is shared with the icon
   row above (Projects page owns it). */

type Props = {
  category: string;
  onCategoryChange: (category: string) => void;
  location: string;
  onLocationChange: (location: string) => void;
  query: string;
  onQueryChange: (query: string) => void;
};

const Select = ({ value, onChange, label, options }: { value: string; onChange: (v: string) => void; label: string; options: string[] }) => (
  <div className="relative w-full sm:w-[185px]">
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label={label}
      className="w-full h-11 appearance-none rounded-md border border-[#E4E8F2] bg-white pl-4 pr-9 text-[13px] font-medium text-[#0A2B5E] shadow-[0_2px_8px_rgba(10,43,94,0.04)] focus:outline-none focus:border-[#fd6e15] cursor-pointer"
    >
      <option value="">{label}</option>
      {options.map((o) => (
        <option key={o} value={o}>{o}</option>
      ))}
    </select>
    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#134698] pointer-events-none" />
  </div>
);

const OurProjects = ({ category, onCategoryChange, location, onLocationChange, query, onQueryChange }: Props) => {
  const q = query.trim().toLowerCase();
  const shown = PROJECTS.filter(
    (p) =>
      (!category || p.category === category) &&
      (!location || p.location === location) &&
      (!q || [p.title, p.category, p.location].some((s) => s.toLowerCase().includes(q))),
  );

  return (
    <section id="our-projects" className="bg-[#F8F9FB] scroll-mt-24">
      <div className={`${CONTAINER} pt-7 sm:pt-8 lg:pt-7 pb-7 lg:pb-8`}>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-5">
          <RuledBlock>
            <Eyebrow>Explore Our Work</Eyebrow>
            <h2 className={HEADING}>Our Projects</h2>
          </RuledBlock>

          <div className="flex flex-col sm:flex-row gap-3 lg:mb-1">
            <label className="relative w-full sm:w-[410px]">
              <span className="sr-only">Search projects</span>
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#134698]/70 pointer-events-none" />
              <input
                type="search"
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                placeholder="Search projects by name, category or location..."
                className="w-full h-11 rounded-md border border-[#E4E8F2] bg-white pl-11 pr-4 text-[13px] text-[#0A2B5E] placeholder:text-[#46658C]/80 shadow-[0_2px_8px_rgba(10,43,94,0.04)] focus:outline-none focus:border-[#fd6e15]"
              />
            </label>
            <Select value={category} onChange={onCategoryChange} label="All Categories" options={PROJECT_CATEGORIES} />
            <Select value={location} onChange={onLocationChange} label="All Locations" options={PROJECT_LOCATIONS} />
          </div>
        </div>

        {shown.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 lg:gap-5">
            {shown.map((p) => (
              <ProjectCard key={p.title} project={p} />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-[#D9DEEC] bg-white py-14 text-center">
            <p className="text-[13.5px] sm:text-[14.5px] text-[#46658C] mb-4">No projects match your search.</p>
            <button
              type="button"
              onClick={() => {
                onCategoryChange("");
                onLocationChange("");
                onQueryChange("");
              }}
              className="text-[11.5px] font-bold uppercase tracking-wider text-[#fd6e15] hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default OurProjects;
