"use client";

import { Fragment } from "react";
import { Phone, Mail, FileText, Building2, Briefcase, Link2, Search, type LucideIcon } from "lucide-react";
import { useTopbar } from "@/hooks/useTopbar";

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

// Icon for a quick link, picked from its label
const linkIcon = (label: string): LucideIcon => {
  if (/brochure/i.test(label)) return FileText;
  if (/profile|company/i.test(label)) return Building2;
  if (/career|job/i.test(label)) return Briefcase;
  return Link2;
};

const Divider = () => <span className="hidden md:block w-px h-3.5 bg-white/20 mx-3" aria-hidden="true" />;

const Topbar = () => {
  // Phone numbers, email and links are edited in the admin (Pages → Home → Topbar)
  const { topbar, loading } = useTopbar();

  if (loading || !topbar) {
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
          {topbar.phones.map((phone) => (
            <Fragment key={phone}>
              <ContactChip href={`tel:${phone.replace(/[^0-9+]/g, "")}`} icon={Phone} label="Call us" text={phone} />
              <Divider />
            </Fragment>
          ))}
          <ContactChip href={`mailto:${topbar.email}`} icon={Mail} label="Email us" text={topbar.email} />
        </div>

        {/* Right: Quick links */}
        <div className="flex items-center gap-2 sm:gap-0">
          {topbar.links.map((link) => (
            <Fragment key={`${link.label}-${link.href}`}>
              <QuickLink href={link.href} icon={linkIcon(link.label)} text={link.label} />
              <Divider />
            </Fragment>
          ))}
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
