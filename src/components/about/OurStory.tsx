"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Image from "next/image";
import { m, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
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

/* Scroll-driven timeline: as the visitor scrolls, the milestones come in one after another (its year
   badge, its dot on the line and its text), and the connecting line draws itself along. On laptops and up
   the section pins under the navbar (sticky) while this plays, then the page carries on; on smaller
   screens it plays as the timeline scrolls past. Scrolling back up plays it backwards. */
const STEP = 0.22; // progress between one milestone starting and the next
const SPAN = 0.26; // progress one milestone takes to come in

const Reveal = ({
  progress,
  index,
  className,
  children,
}: {
  progress: MotionValue<number>;
  index: number;
  className?: string;
  children: ReactNode;
}) => {
  const reduce = useReducedMotion();
  const range = [index * STEP, index * STEP + SPAN];
  const opacity = useTransform(progress, range, [0, 1]);
  const y = useTransform(progress, range, [28, 0]);
  const filter = useTransform(progress, range, ["blur(6px)", "blur(0px)"]);
  return (
    <m.div className={className} style={reduce ? undefined : { opacity, y, filter }}>
      {children}
    </m.div>
  );
};

// A ring on the line pops in as its milestone arrives
const Ring = ({ progress, index }: { progress: MotionValue<number>; index: number }) => {
  const reduce = useReducedMotion();
  const scale = useTransform(progress, [index * STEP, index * STEP + SPAN * 0.6], [0, 1]);
  return (
    <m.span
      className="relative justify-self-center w-[18px] h-[18px] rounded-full border-[3px] border-[#fd6e15] bg-white"
      style={reduce ? undefined : { scale }}
    />
  );
};

/* "Our Journey": heading and intro on the left; on the right a timeline of milestones (a slanted year
   badge, a dot on a connecting line, then the milestone) over an office photo that fades into white;
   a row of key facts along the bottom. */
const NAVBAR_PX = 68; // height of the fixed navbar the pinned section sits under (lg+)

const OurStory = () => {
  const pin = useRef<HTMLDivElement>(null);
  const timeline = useRef<HTMLDivElement>(null);
  const isLg = useRef(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => (isLg.current = mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // lg+: 0 when the section pins under the navbar, 1 when it is about to scroll on
  const { scrollYProgress: pinned } = useScroll({ target: pin, offset: [`start ${NAVBAR_PX}px`, "end end"] });
  // Smaller screens: 0 when the timeline's top reaches 90% down the screen, 1 when its bottom reaches 55%
  const { scrollYProgress: passing } = useScroll({ target: timeline, offset: ["start 0.9", "end 0.55"] });
  const scrollYProgress = useTransform([pinned, passing], ([a, b]: number[]) => (isLg.current ? a : b));
  // The line has reached the last ring when the last milestone starts coming in
  const lineScale = useTransform(scrollYProgress, [0, (MILESTONES.length - 1) * STEP], [0, 1]);
  const reduce = useReducedMotion();

  return (
    // lg+: a tall track; the section inside sticks under the navbar while the track scrolls by
    <div ref={pin} className="relative lg:h-[200vh]">
      <div className="lg:sticky" style={{ top: NAVBAR_PX }}>
        <section id="our-story" className="relative w-full overflow-hidden bg-white scroll-mt-24">
          <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 lg:pt-10 pb-3 sm:pb-4 lg:pb-5">
            <div className="grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,2.5fr)] gap-8 lg:gap-0">
              {/* ── Left: heading + intro ── */}
              <div className="lg:pr-8 lg:pt-2 lg:pb-0">
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

                <div ref={timeline} className="relative pt-[60px] lg:pt-[80px]">
                  {/* Year badges */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-6">
                    {MILESTONES.map(({ year, icon: Icon }, i) => (
                      <Reveal key={year} progress={scrollYProgress} index={i} className="flex justify-center">
                        <div className="flex items-center">
                          <span className="-skew-x-[18deg] w-[64px] sm:w-[74px] h-[50px] sm:h-[56px] rounded-md bg-gradient-to-br from-[#F3F4F6] to-[#E1E4E9] flex items-center justify-center shadow-[0_6px_18px_-6px_rgba(10,43,94,0.35)]">
                            <Icon className="skew-x-[18deg] w-8 h-8 text-[#0A2B5E]" strokeWidth={1.5} />
                          </span>
                          <span className="-ml-2 -skew-x-[18deg] h-[40px] sm:h-[44px] pl-5 pr-5 sm:pr-6 flex items-center bg-[#0A2B5E] border-r-[6px] border-[#fd6e15] shadow-[0_6px_18px_-6px_rgba(10,43,94,0.5)]">
                            <span className="skew-x-[18deg] text-[20px] sm:text-[22px] font-semibold text-white tracking-tight">{year}</span>
                          </span>
                        </div>
                      </Reveal>
                    ))}
                  </div>

                  {/* Connecting line with a ring for each year (lg+) */}
                  <div className="hidden lg:grid relative grid-cols-4 h-10 items-center" aria-hidden="true">
                    <m.span
                      className="absolute left-[12.5%] right-[12.5%] top-1/2 h-[1.5px] bg-[#9FB0C8] origin-left"
                      style={reduce ? undefined : { scaleX: lineScale }}
                    />
                    {MILESTONES.map(({ year }, i) => (
                      <Ring key={year} progress={scrollYProgress} index={i} />
                    ))}
                  </div>

                  {/* Milestones */}
                  <div className="mt-6 lg:mt-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-6">
                    {MILESTONES.map(({ year, title, text }, i) => (
                      <Reveal
                        key={year}
                        progress={scrollYProgress}
                        index={i}
                        className={`lg:px-6 ${i > 0 ? "lg:border-l lg:border-[#9FB0C8]" : ""}`}
                      >
                        <h3 className="text-[17px] sm:text-[18px] font-semibold text-[#0A2B5E] leading-tight mb-1.5">{title}</h3>
                        <p className="text-[13.5px] text-[#1F2D44] leading-relaxed max-w-[240px]">{text}</p>
                      </Reveal>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ── Key facts ── */}
            <ul className="mt-1.5 lg:mt-2 pt-2.5 border-t border-[#DCE3EE] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-4">
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
      </div>
    </div>
  );
};

export default OurStory;
