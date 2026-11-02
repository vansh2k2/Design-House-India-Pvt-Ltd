import Image from "next/image";
import {
  Award,
  Building2,
  ChartNoAxesCombined,
  Handshake,
  Layers,
  Settings,
  Users,
  type LucideIcon,
} from "lucide-react";

import officeImg from "@/assets/image/hj.webp";

const MILESTONES: { year: string; icon: LucideIcon; title: string; text: string }[] = [
  { year: "2004", icon: Building2, title: "The Beginning", text: "Incorporated with a vision to deliver quality interior solutions." },
  { year: "2010", icon: Settings, title: "Building Capability", text: "Expanded manufacturing and execution capabilities." },
  { year: "2016", icon: Users, title: "Expanding Horizons", text: "Strengthened presence in corporate, retail and exhibition projects." },
  { year: "2024", icon: ChartNoAxesCombined, title: "A Trusted Partner", text: "A trusted design & build partner with a diverse project portfolio across India." },
];

const STATS: { icon: LucideIcon; value: string; label: string }[] = [
  { icon: Award, value: "20+", label: "Years of Expertise" },
  { icon: Layers, value: "Multi-Sector", label: "Experience" },
  { icon: Users, value: "Pan-India", label: "Execution" },
  { icon: Settings, value: "End-to-End", label: "Solutions" },
  { icon: Handshake, value: "Long-Term", label: "Client Partnerships" },
];

/* "Our Journey": heading and intro on the left; on the right a timeline of milestones (a slanted year
   badge, a dot on a connecting line, then the milestone) over an office photo that fades into white;
   a row of key facts along the bottom. */
const OurStory = () => (
  <section id="our-story" className="relative w-full overflow-hidden bg-white scroll-mt-24">
    <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 lg:pt-10 pb-0">
      <div className="grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,2.5fr)] gap-8 lg:gap-0">
        {/* ── Left: heading + intro ── */}
        <div className="lg:pr-8 lg:py-4">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-9 h-[3px] bg-[#fd6e15] rounded-full inline-block" />
            <span className="text-[14px] sm:text-[15px] font-semibold uppercase tracking-[0.06em] text-[#0A2B5E]">Our Journey</span>
          </div>
          <h2 className="text-[30px] sm:text-[36px] lg:text-[40px] font-serif font-medium leading-[1.08] tracking-tight text-[#0A2B5E] mb-5">
            A Journey of
            <br />
            <span className="text-[#fd6e15]">Growth &amp; Trust</span>
          </h2>
          <p className="border-l-[3px] border-[#fd6e15] pl-4 text-[13.5px] sm:text-[14px] text-[#1F2D44] leading-relaxed max-w-[340px]">
            From a focused design studio to a multi-sector interior solutions company, our journey reflects consistent
            growth, trusted partnerships and a commitment to quality execution.
          </p>
        </div>

        {/* ── Right: timeline over the office photo ── */}
        <div className="relative lg:border-l lg:border-[#DCE3EE] lg:pl-8">
          {/* Office corridor photo across the top of the timeline only (behind the year badges); a white
              overlay fades it out towards the dots and the text below, and towards the left */}
          <div className="absolute top-0 left-0 lg:left-8 right-0 h-[230px] lg:h-[250px] overflow-hidden" aria-hidden="true">
            <Image src={officeImg} alt="" fill placeholder="blur" sizes="(min-width: 1024px) 70vw, 100vw" className="object-cover object-[center_30%]" />
            <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/65 via-45% to-white to-75%" />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/0 via-25% to-transparent" />
          </div>

          <div className="relative pt-[60px] lg:pt-[80px]">
            {/* Year badges */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-6">
              {MILESTONES.map(({ year, icon: Icon }) => (
                <div key={year} className="flex justify-center">
                  <div className="flex items-center">
                    <span className="-skew-x-[18deg] w-[64px] sm:w-[74px] h-[50px] sm:h-[56px] rounded-md bg-gradient-to-br from-[#F3F4F6] to-[#E1E4E9] flex items-center justify-center shadow-[0_6px_18px_-6px_rgba(10,43,94,0.35)]">
                      <Icon className="skew-x-[18deg] w-8 h-8 text-[#0A2B5E]" strokeWidth={1.5} />
                    </span>
                    <span className="-ml-2 -skew-x-[18deg] h-[40px] sm:h-[44px] pl-5 pr-5 sm:pr-6 flex items-center bg-[#0A2B5E] border-r-[6px] border-[#fd6e15] shadow-[0_6px_18px_-6px_rgba(10,43,94,0.5)]">
                      <span className="skew-x-[18deg] text-[20px] sm:text-[22px] font-semibold text-white tracking-tight">{year}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Connecting line with a ring for each year (lg+) */}
            <div className="hidden lg:grid relative grid-cols-4 h-10 items-center" aria-hidden="true">
              <span className="absolute left-[12.5%] right-[12.5%] top-1/2 h-[1.5px] bg-[#9FB0C8]" />
              {MILESTONES.map(({ year }) => (
                <span key={year} className="relative justify-self-center w-[18px] h-[18px] rounded-full border-[3px] border-[#fd6e15] bg-white" />
              ))}
            </div>

            {/* Milestones */}
            <div className="mt-6 lg:mt-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-6">
              {MILESTONES.map(({ year, title, text }, i) => (
                <div key={year} className={`lg:px-6 ${i > 0 ? "lg:border-l lg:border-[#9FB0C8]" : ""}`}>
                  <h3 className="text-[17px] sm:text-[18px] font-semibold text-[#0A2B5E] leading-tight mb-1.5">{title}</h3>
                  <p className="text-[13.5px] text-[#1F2D44] leading-relaxed max-w-[240px]">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Key facts ── */}
      <ul className="mt-4 lg:mt-5 pt-4 border-t border-[#DCE3EE] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-5">
        {STATS.map(({ icon: Icon, value, label }, i) => (
          <li key={value} className={`flex items-center gap-3.5 lg:justify-center lg:px-4 ${i > 0 ? "lg:border-l lg:border-[#C9D3E3]" : ""}`}>
            <Icon className="w-10 h-10 lg:w-12 lg:h-12 shrink-0 text-[#fd6e15]" strokeWidth={1.4} />
            <div>
              <p className="text-[16px] lg:text-[18px] font-semibold text-[#0A2B5E] leading-tight">{value}</p>
              <p className="text-[13px] lg:text-[14px] text-[#1F2D44] leading-snug">{label}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default OurStory;
