"use client";

import { Phone, Mail, FileText, Building2, Briefcase, Search, type LucideIcon } from "lucide-react";
import { useSettings } from "@/hooks/useSettings";

/* Slim navy bar above the navbar — matches the reference design with phone
   numbers on the left and quick links (Brochure, Company Profile, Careers)
   plus a search icon on the right. */

const ContactChip = ({
  href,
  icon: Icon,
  label,
  text,
}: {
  href: string;
  icon: LucideIcon;
  label: string;
  text: string;
}) => (
  <a
    href={href}
    aria-label={label}
    className="group flex items-center justify-center gap-1.5 min-h-6 min-w-6 text-white/90 hover:text-white transition-colors duration-300"
  >
    <Icon className="w-3.5 h-3.5 text-[#fd6e15] shrink-0 transition-transform duration-200 group-hover:scale-110" />
    <span className="hidden sm:inline text-[12.5px] font-medium tracking-wide">
      {text}
    </span>
  </a>
);

const QuickLink = ({
  href,
  icon: Icon,
  text,
}: {
  href: string;
  icon: LucideIcon;
  text: string;
}) => (
  <a
    href={href}
    aria-label={text}
    className="group flex items-center justify-center gap-1.5 min-h-6 min-w-6 text-white/80 hover:text-white transition-colors duration-300 text-[12px] font-medium"
  >
    <Icon className="w-3.5 h-3.5 text-white/60 group-hover:text-white transition-colors" />
    <span className="hidden md:inline">{text}</span>
  </a>
);

const Topbar = () => {
  const { settings, loading } = useSettings();

  const topbarPhone1 =
    settings?.phones?.find((p) => p.forTopbar)?.phone || "+91 9654900525";
  const topbarPhone2 = "+91 9810247319";
  const topbarEmail =
    settings?.emails?.find((e) => e.forTopbar)?.email ||
    "info@designhouse.co.in";

  if (loading) {
    return <div className="h-10 bg-[#0a1a33] animate-pulse" />;
  }

  return (
    <div
      className="relative z-50 h-10 overflow-visible bg-[#0C1E3A]"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Solid dark navy background */}
      <div className="absolute inset-0 bg-[#0C1E3A]" />
      {/* Thin orange bottom border */}
      <div className="absolute bottom-0 inset-x-0 h-[2px] bg-[#fd6e15]" />

      <div className="relative h-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Left: Phone numbers & Email */}
        <div className="flex items-center gap-2 md:gap-0">
          <ContactChip
            href={`tel:${topbarPhone1.replace(/[^0-9+]/g, "")}`}
            icon={Phone}
            label="Call us"
            text={topbarPhone1}
          />
          <span
            className="hidden md:block w-px h-3.5 bg-white/20 mx-3"
            aria-hidden="true"
          />
          <ContactChip
            href={`tel:${topbarPhone2.replace(/[^0-9+]/g, "")}`}
            icon={Phone}
            label="Call us"
            text={topbarPhone2}
          />
          <span
            className="hidden md:block w-px h-3.5 bg-white/20 mx-3"
            aria-hidden="true"
          />
          <ContactChip
            href={`mailto:${topbarEmail}`}
            icon={Mail}
            label="Email us"
            text={topbarEmail}
          />
        </div>

        {/* Right: Quick links */}
        <div className="flex items-center gap-2 sm:gap-0">
          <QuickLink
            href="/downloads"
            icon={FileText}
            text="Brochure"
          />
          <span
            className="hidden md:block w-px h-3.5 bg-white/20 mx-3"
            aria-hidden="true"
          />
          <QuickLink
            href="/downloads"
            icon={Building2}
            text="Company Profile"
          />
          <span
            className="hidden md:block w-px h-3.5 bg-white/20 mx-3"
            aria-hidden="true"
          />
          <QuickLink
            href="/career"
            icon={Briefcase}
            text="Careers"
          />
          <span
            className="hidden md:block w-px h-3.5 bg-white/20 mx-3"
            aria-hidden="true"
          />
          <button
            aria-label="Search"
            className="w-7 h-7 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300"
          >
            <Search className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
