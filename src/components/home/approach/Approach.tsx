import Image from "next/image";
import localFont from "next/font/local";
import { ChevronRight } from "lucide-react";

import showroomImg from "@/assets/image/approach.webp";
import { STEPS } from "./data";

const script = localFont({
  src: "../../../../node_modules/@fontsource/great-vibes/files/great-vibes-latin-400-normal.woff2",
  weight: "400",
  display: "swap",
});

/* Card outline with an "envelope" cut in its top-right: the top edge dips down in an S-curve at
   NOTCH_AT and runs NOTCH_DEPTH lower to the right edge (the arrow to the next card sits in it).
   Built as a clip-path polygon from % + px points so it scales with the card width. */
const RADIUS = 12;
const NOTCH_AT = "46%";
const NOTCH_DEPTH = 22;
const NOTCH_RUN = 40; // width of the S-curve

type Coord = [base: string, px: number];
type Pt = { x: Coord; y: Coord };

const toCss = ([base, px]: Coord) => (base === "0" ? `${px.toFixed(1)}px` : `calc(${base} + ${px.toFixed(1)}px)`);

const arc = (cx: Coord, cy: Coord, from: number, to: number): Pt[] =>
  Array.from({ length: 7 }, (_, k) => {
    const a = ((from + ((to - from) * k) / 6) * Math.PI) / 180;
    return { x: [cx[0], cx[1] + RADIUS * Math.cos(a)], y: [cy[0], cy[1] + RADIUS * Math.sin(a)] };
  });

// Cubic bezier (0,0) → (RUN/2,0) → (RUN/2,DEPTH) → (RUN,DEPTH), relative to NOTCH_AT
const sCurve: Pt[] = Array.from({ length: 11 }, (_, k) => {
  const t = k / 10;
  const mt = 1 - t;
  const x = 3 * mt * mt * t * (NOTCH_RUN / 2) + 3 * mt * t * t * (NOTCH_RUN / 2) + t * t * t * NOTCH_RUN;
  const y = 3 * mt * t * t * NOTCH_DEPTH + t * t * t * NOTCH_DEPTH;
  return { x: [NOTCH_AT, x], y: ["0", y] };
});

const CARD_SHAPE = `polygon(${[
  ...arc(["0", RADIUS], ["0", RADIUS], 180, 270),
  ...sCurve,
  ...arc(["100%", -RADIUS], ["0", NOTCH_DEPTH + RADIUS], 270, 360),
  ...arc(["100%", -RADIUS], ["100%", -RADIUS], 0, 90),
  ...arc(["0", RADIUS], ["100%", -RADIUS], 90, 180),
]
  .map((p) => `${toCss(p.x)} ${toCss(p.y)}`)
  .join(", ")})`;

/* "Our Approach": heading on the left, a showroom photo top right (wavy left edge) with a navy
   corner carrying a handwritten tagline, then five process cards joined by curved arrows. */

const Approach = () => (
  <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#F7F8FB] to-white">
    {/* ── Photo + navy corner (lg+): the photo's left edge sweeps down in an S-curve into its bottom edge,
         which sits just behind the top of the cards ── */}
    <div className="relative h-[220px] sm:h-[280px] lg:absolute lg:top-0 lg:right-0 lg:h-[240px] lg:w-[53%] xl:w-[56%]">
      <div className="absolute inset-0 lg:[clip-path:polygon(0_0,100%_0,100%_100%,32%_100%,25%_96.5%,19%_90.5%,14%_80%,9.5%_62%,6%_40%,3%_18%,1%_6%)]">
        <div className="absolute inset-0">
          <Image
            src={showroomImg}
            alt="Retail showroom interior designed and built by Design House"
            fill
            placeholder="blur"
            sizes="(min-width: 1024px) 56vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
      <div className="absolute inset-y-0 right-0 w-[38%] sm:w-[33%] bg-[#0B2350] [clip-path:polygon(28%_0,100%_0,100%_100%,8%_100%)] flex items-center justify-center pl-[10%] pr-[3%]">
        <p className={`${script.className} -rotate-[14deg] whitespace-nowrap text-white text-[21px] sm:text-[23px] lg:text-[21px] xl:text-[25px] min-[1440px]:text-[27px] leading-[1.15]`}>
          Your Vision
          <br />
          Our Expertise
          <br />
          <span className="text-[#fd6e15]">Exceptional Spaces</span>
          <svg viewBox="0 0 160 14" className="block w-[85%] h-3 ml-auto -mt-1 text-[#fd6e15]" fill="none" aria-hidden="true">
            <path d="M2 11 C 40 2, 100 2, 158 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </p>
      </div>
    </div>

    <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-7 sm:pt-8 lg:pt-7 pb-7 lg:pb-8">
      {/* ── Heading ── */}
      <div className="lg:w-[48%] lg:min-h-[175px]">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-5 h-[2.5px] bg-[#fd6e15] rounded-full inline-block" />
          <span className="text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.2em] text-[#fd6e15]">Our Approach</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-medium leading-[1.08] tracking-tight mb-2.5">
          <span className="text-[#0A2B5E]">Ideas. Design. Build. </span>
          <span className="text-[#fd6e15]">Deliver.</span>
        </h2>
        <p className="text-[13.5px] sm:text-[14.5px] text-[#333] leading-relaxed max-w-[540px]">
          A streamlined process that ensures creativity, quality and on-time delivery for spaces that elevate your brand.
        </p>
      </div>

      {/* ── Process cards ── */}
      <ol className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-5 gap-y-10 mt-10 lg:mt-6">
        {STEPS.map(({ stepIcon, title, desc, img }, i) => (
          <li
            key={title}
            className="relative px-4 pt-11 pb-4 [filter:drop-shadow(0_1px_1.5px_rgba(0,0,0,0.02))]"
          >
            {/* Card body: a 1px rgba(27,31,35,0.15) outline layer with the white card on top, both cut to CARD_SHAPE */}
            <span className="absolute -inset-px bg-[rgba(27,31,35,0.15)]" style={{ clipPath: CARD_SHAPE }} aria-hidden="true" />
            <span className="absolute inset-0 bg-white" style={{ clipPath: CARD_SHAPE }} aria-hidden="true" />

            {/* Icon disc sitting on the card's top edge, with the step number beside it */}
            <div className="absolute -top-7 left-4 flex items-end gap-3">
              <div className="relative w-14 h-14 rounded-full overflow-hidden ring-[5px] ring-white shadow-[0_6px_16px_-6px_rgba(10,43,94,0.45)]">
                <Image
                  src={stepIcon}
                  alt={title}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>
              <span className="mb-0.5 text-[22px] font-semibold text-[#B8C2D3] leading-none">{String(i + 1).padStart(2, "0")}</span>
            </div>

            {/* Curved arrow to the next card (lg+) */}
            {i < STEPS.length - 1 && (
              <div className="hidden lg:block absolute -top-5 left-[46%] -right-5 h-12 pointer-events-none" aria-hidden="true">
                <span className="absolute left-0 top-4 w-2 h-2 rounded-full bg-[#fd6e15]" />
                <svg viewBox="0 0 100 48" preserveAspectRatio="none" className="absolute inset-0 w-full h-full" fill="none">
                  <path d="M3 20 C 40 20, 62 22, 76 30 S 92 42, 98 42" stroke="#94A3C8" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
                </svg>
                <ChevronRight className="absolute -right-1.5 bottom-[-2px] w-4 h-4 text-[#fd6e15]" strokeWidth={2.5} />
              </div>
            )}

            <h3 className="relative text-[16px] xl:text-[17px] font-bold text-[#0A2B5E] leading-tight mb-1">{title}</h3>
            <p className="relative text-[12.5px] xl:text-[13px] text-black leading-snug min-h-[36px] mb-3">{desc}</p>
            <div className="relative h-[120px] xl:h-[130px] rounded-md overflow-hidden">
              <Image src={img} alt={title} fill placeholder="blur" sizes="(min-width: 1024px) 18vw, 50vw" className="object-cover" />
            </div>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default Approach;
