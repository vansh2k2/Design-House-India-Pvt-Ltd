import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import ctaImg from "@/assets/image/t2.webp";

/* Shared (About, Blogs). Navy "Have a Project in Mind?" band; a restaurant photo fills its right part (lg+), cut on a diagonal
   (top edge starts further right than the bottom) with a cream-gold band along the cut. */
const CUT_TOP = "20%";
const BORDER = "12px";
const ProjectCta = ({
  eyebrow = "Let's Create Together",
  title = "Have a Project in Mind?",
  subtitle = "Share your requirements with our team for a customized solution.",
  narrow = false,
}: {
  eyebrow?: string;
  title?: React.ReactNode;
  subtitle?: string;
  narrow?: boolean; // 1400px content width (Services page) instead of 1440px
}) => (
  <section className="relative w-full overflow-hidden bg-[#0A2B5E]">
    <div className="hidden lg:block absolute top-0 bottom-0 right-0 w-[52%]" aria-hidden="true">
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#F2C98A] to-[#D99A45]"
        style={{ clipPath: `polygon(${CUT_TOP} 0, 100% 0, 100% 100%, 0 100%)` }}
      />
      <div
        className="absolute inset-0"
        style={{ clipPath: `polygon(calc(${CUT_TOP} + ${BORDER}) 0, 100% 0, 100% 100%, ${BORDER} 100%)` }}
      >
        <Image src={ctaImg} alt="" fill placeholder="blur" sizes="(min-width: 1024px) 70vw, 100vw" className="object-cover" />
      </div>
    </div>

    <div className={`relative ${narrow ? "max-w-[1400px]" : "max-w-[1440px]"} mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-4`}>
      <div className="flex items-center gap-2 mb-1.5">
        <span className="w-5 h-[2px] bg-[#fd6e15] rounded-full inline-block" />
        <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/90">{eyebrow}</span>
      </div>
      <h2 className="text-[26px] sm:text-[30px] font-serif font-medium leading-tight text-white mb-1">{title}</h2>
      <p className="text-[13px] sm:text-[14px] text-white/85 mb-3">{subtitle}</p>
      <Link
        href="/contact"
        className="group inline-flex items-center gap-2 rounded-md bg-[#fd6e15] hover:bg-[#e05d0e] px-5 py-2 text-white text-[13px] font-semibold shadow-[0_6px_16px_rgba(253,110,21,0.35)] transition-colors"
      >
        Enquire Now
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  </section>
);

export default ProjectCta;
