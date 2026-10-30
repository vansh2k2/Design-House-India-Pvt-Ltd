import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import storyImg from "@/assets/image/about.webp";

const WORDS = ["Ideas", "Spaces", "Brands", "People"];

/* Photo cut on a diagonal: its left edge runs from CUT_TOP at the top out to CUT_BOTTOM at the bottom,
   with an orange band of BORDER along that edge. */
const CUT_TOP = "0%";
const CUT_BOTTOM = "13%";
const BORDER = "8px";

/* "Our Story": text on the left (orange bar beside the heading); on the right the lounge photo with a
   slanted, orange-edged left side and the four words over its dark marble wall. */
const OurStory = () => (
  <section id="our-story" className="relative w-full overflow-hidden bg-white scroll-mt-24">
    {/* ── Photo (lg+) ── */}
    <div className="hidden lg:block absolute top-0 bottom-0 right-0 w-[60%]" aria-hidden="true">
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#fd6e15] to-[#E9A23B]"
        style={{ clipPath: `polygon(${CUT_TOP} 0, 100% 0, 100% 100%, ${CUT_BOTTOM} 100%)` }}
      />
      <div
        className="absolute inset-0"
        style={{ clipPath: `polygon(calc(${CUT_TOP} + ${BORDER}) 0, 100% 0, 100% 100%, calc(${CUT_BOTTOM} + ${BORDER}) 100%)` }}
      >
        <Image src={storyImg} alt="" fill placeholder="blur" sizes="(min-width: 1024px) 75vw, 100vw" className="object-cover object-center" />
        {/* Darkens the marble wall on the right so the words read clearly */}
        <div className="absolute inset-y-0 right-0 w-[48%] bg-gradient-to-l from-black/75 via-black/45 to-transparent" />
      </div>

      <div className="absolute top-1/2 -translate-y-1/2 right-[7%]">
        <ul className="space-y-2">
          {WORDS.map((w) => (
            <li key={w} className="text-white text-[20px] xl:text-[22px] font-medium uppercase tracking-[0.06em] leading-tight">
              {w}
            </li>
          ))}
        </ul>
        <span className="block w-10 h-[3px] bg-[#E9A23B] mt-5" />
      </div>
    </div>

    <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-5 lg:py-6">
      <div className="lg:w-[37%]">
        <div className="border-l-[3px] border-[#fd6e15] pl-5 mb-3">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-[2.5px] bg-[#fd6e15] rounded-full inline-block" />
            <span className="text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.2em] text-[#fd6e15]">Our Story</span>
          </div>
          <h2 className="text-[30px] sm:text-[36px] lg:text-[42px] font-serif font-medium leading-[1.1] tracking-tight text-[#0A2B5E]">
            A Journey of Ideas,
            <br />
            Growth and <span className="text-[#fd6e15]">Trust</span>
          </h2>
        </div>
        <p className="text-[15px] sm:text-[16px] text-black leading-relaxed mb-5 lg:pl-[23px]">
          What started in 2004 as a vision to create better spaces has grown into a trusted name in interior design,
          manufacturing and turnkey solutions. Over the years, we have collaborated with architects, global brands and
          businesses across multiple sectors, delivering spaces that inspire people and drive performance.
        </p>
        <div className="lg:pl-[23px]">
          <Link
            href="/about/team"
            className="group inline-flex items-center gap-1.5 rounded-md bg-[#E9902B] hover:bg-[#fd6e15] px-5 py-2.5 text-white text-[12.5px] font-semibold shadow-[0_6px_16px_rgba(233,144,43,0.35)] transition-colors"
          >
            Our Journey
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* Photo on phones/tablets */}
      <div className="lg:hidden relative h-[240px] sm:h-[320px] mt-8 rounded-md overflow-hidden">
        <Image src={storyImg} alt="Office lounge designed by Design House" fill placeholder="blur" sizes="100vw" className="object-cover" />
        <div className="absolute inset-y-0 right-0 w-[45%] bg-gradient-to-l from-black/60 to-transparent" />
        <ul className="absolute top-1/2 -translate-y-1/2 right-5 space-y-1">
          {WORDS.map((w) => (
            <li key={w} className="text-white text-[15px] font-medium uppercase tracking-[0.06em]">
              {w}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

export default OurStory;
