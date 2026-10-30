import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";

import heroImg from "@/assets/image/vision.webp";

/* Photo on the right half cut on a diagonal (top-left corner further right than the bottom-left), with a
   thin orange band along that edge. */
const CUT_TOP = "14%";
const BORDER = "6px";

const AboutHero = () => (
  <section className="relative w-full overflow-hidden bg-white pt-[56px] sm:pt-[68px]">
    {/* Soft warm glow behind the text */}
    <div className="absolute -left-40 -top-40 w-[620px] h-[620px] rounded-full bg-[radial-gradient(circle,rgba(253,110,21,0.10)_0%,rgba(253,110,21,0)_65%)] pointer-events-none" />

    {/* ── Photo (lg+) ── */}
    <div className="hidden lg:block absolute top-[56px] sm:top-[68px] bottom-0 right-0 w-[52%]" aria-hidden="true">
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#fd6e15] to-[#F6B27A]"
        style={{ clipPath: `polygon(${CUT_TOP} 0, 100% 0, 100% 100%, 0 100%)` }}
      />
      <div
        className="absolute inset-0"
        style={{ clipPath: `polygon(calc(${CUT_TOP} + ${BORDER}) 0, 100% 0, 100% 100%, ${BORDER} 100%)` }}
      >
        <Image src={heroImg} alt="" fill priority placeholder="blur" sizes="(min-width: 1024px) 80vw, 100vw" className="object-cover object-[60%_center]" />
      </div>
    </div>

    <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-10 lg:pt-8 lg:pb-14">
      <div className="lg:w-[46%]">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[12px] text-[#46658C] mb-4">
          <Link href="/" className="hover:text-[#fd6e15]">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#0A2B5E] font-medium">About Us</span>
        </nav>

        <div className="flex items-center gap-2 mb-2">
          <span className="w-5 h-[2.5px] bg-[#fd6e15] rounded-full inline-block" />
          <span className="text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.2em] text-[#fd6e15]">About Design House</span>
        </div>
        <h1 className="text-[34px] sm:text-[42px] lg:text-[48px] font-serif font-medium leading-[1.06] tracking-tight text-[#0A2B5E] mb-3">
          Transforming
          <br />
          <span className="text-[#fd6e15]">Spaces Since 2004</span>
        </h1>
        <p className="text-[16px] sm:text-[18px] font-bold text-[#0A2B5E] mb-3">Design. Manufacturing. Execution.</p>
        <p className="text-[13.5px] sm:text-[14.5px] text-[#333] leading-relaxed max-w-[540px] mb-6">
          Design House India Pvt. Ltd. is a trusted partner for interior design, retail display, manufacturing and turnkey
          solutions. We create functional, aesthetic and inspiring spaces that enhance brands, elevate experiences and
          deliver long-term value.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="#our-story"
            className="group inline-flex items-center gap-2 rounded-md bg-[#fd6e15] hover:bg-[#e05d0e] px-6 py-3 text-white text-[13.5px] font-semibold shadow-[0_6px_16px_rgba(253,110,21,0.3)] transition-colors"
          >
            Our Journey
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-2 rounded-md border-[1.5px] border-[#134698] px-6 py-3 text-[#134698] text-[13.5px] font-semibold hover:bg-[#134698] hover:text-white transition-colors"
          >
            View Projects
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* Photo on phones/tablets */}
      <div className="lg:hidden relative h-[240px] sm:h-[320px] mt-8 rounded-md overflow-hidden">
        <Image src={heroImg} alt="Design House India reception" fill placeholder="blur" sizes="100vw" className="object-cover" />
      </div>
    </div>
  </section>
);

export default AboutHero;
