import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

/* Building blocks shared by the Projects page sections; type styles follow the home page sections. */

export const CONTAINER = "max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8";

// Section heading (h2), as on the home page
export const HEADING = "text-3xl sm:text-4xl lg:text-[42px] font-serif font-medium leading-[1.08] tracking-tight text-[#0A2B5E]";

// Body copy
export const BODY = "text-[13.5px] sm:text-[14.5px] text-black leading-relaxed";

// Orange dash + small spaced caps label above a heading
export const Eyebrow = ({ children, light = false }: { children: ReactNode; light?: boolean }) => (
  <div className="flex items-center gap-2 mb-2">
    <span className="w-5 h-[2.5px] bg-[#fd6e15] rounded-full inline-block" />
    <span className={`text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.2em] ${light ? "text-white/90" : "text-[#134698]"}`}>
      {children}
    </span>
  </div>
);

// Heading block with a thin orange rule down its left side
export const RuledBlock = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div className={`relative pl-6 sm:pl-8 ${className}`}>
    <span className="absolute left-0 top-1 bottom-1 w-[2px] bg-[#fd6e15]" aria-hidden="true" />
    {children}
  </div>
);

export const CtaButton = ({ href, children }: { href: string; children: ReactNode }) => (
  <Link
    href={href}
    className="group inline-flex items-center gap-2.5 rounded-[4px] bg-[#fd6e15] hover:bg-[#e05d0e] px-5 sm:px-6 py-2.5 sm:py-3 text-white text-[11px] sm:text-[11.5px] font-bold uppercase tracking-wider shadow-[0_6px_16px_rgba(253,110,21,0.3)] transition-colors"
  >
    {children}
    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
  </Link>
);
