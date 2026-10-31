"use client";

import Image, { type StaticImageData } from "next/image";
import { Clock, Download, FileText } from "lucide-react";

import Topbar from "@/components/layout/Topbar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";
import { API_URL } from "@/lib/api";
import { HERO_ACCENT_SHADOW, HERO_BANNER_CSS, HERO_DESC_SHADOW, HERO_TITLE_SHADOW } from "@/components/common/heroBannerEffects";
import heroBg from "@/assets/banner/downloads.webp";
import companyImg from "@/assets/image/vision.webp";
import officeImg from "@/assets/7.jpg";
import modularImg from "@/assets/hero-interior-1.jpg";
import kitchenImg from "@/assets/cara1.jpg";
import ensisImg from "@/assets/about1.webp";
import corporateImg from "@/assets/hero-corporate-1.jpg";
import residentialImg from "@/assets/about2.webp";
import genericImg from "@/assets/image/b2.webp";
import retailImg from "@/assets/image/b1.webp";
import restaurantImg from "@/assets/image/b3.webp";
import exhibitionImg from "@/assets/image/b4.webp";

interface DownloadItem {
  key?: string;
  title: string;
  coverTitle: string; // printed on the card's cover panel
  desc: string;
  href?: string; // no file yet: the card shows a disabled "Coming Soon" button
  size?: string;
  img: StaticImageData | string; // built-in image, or a Cloudinary URL from the admin
  imgAlt?: string;
  action: string;
  accent?: boolean; // orange cover title (the main company profile)
  ensis?: boolean; // ENSIS cover style
}

/** A download as the backend returns it (admin: Content Management → Downloads) */
export interface DownloadRecord {
  _id: string;
  title: string;
  coverTitle?: string;
  desc?: string;
  fileUrl?: string;
  fileSize?: string;
  cardImage?: string;
  imageAlt?: string;
  action?: string;
  status: "Active" | "Coming Soon" | "Inactive";
  accent?: boolean;
  ensis?: boolean;
}

// Admin downloads → cards. The button goes through the backend, which counts the download and serves
// the PDF (uploaded ones from Cloudinary, under a proper file name).
const toCard = (d: DownloadRecord): DownloadItem => ({
  key: d._id,
  title: d.title,
  coverTitle: d.coverTitle || d.title,
  desc: d.desc || "",
  href: d.status === "Active" && d.fileUrl ? `${API_URL}/api/downloads/${d._id}/file` : undefined,
  size: d.fileSize || undefined,
  img: d.cardImage && /^https?:\/\//.test(d.cardImage) ? d.cardImage : genericImg,
  imgAlt: d.imageAlt || d.title,
  action: d.action || (d.status === "Active" ? "Download" : "Coming Soon"),
  accent: d.accent,
  ensis: d.ensis,
});

// Built-in cards, shown only if the backend can't be reached. Files shipped in /public/downloads
const DOWNLOADS: DownloadItem[] = [
  {
    title: "Company Profile",
    coverTitle: "Company\nProfile",
    desc: "Complete overview of our company, capabilities and business verticals.",
    href: "/downloads/dhipl-profile.pdf",
    size: "13.4 MB",
    img: companyImg,
    action: "Download Profile",
    accent: true,
  },
  {
    title: "Office Furniture",
    coverTitle: "Office\nFurniture",
    desc: "Workstations, cabins and seating solutions for modern offices.",
    href: "/downloads/ebrochures/office furniture.pdf",
    size: "15.9 MB",
    img: officeImg,
    action: "Download Brochure",
  },
  {
    title: "Modular Furniture",
    coverTitle: "Modular\nFurniture",
    desc: "Modular furniture designed for everyday function and style.",
    href: "/downloads/ebrochures/Modular Furniture.pdf",
    size: "1.4 MB",
    img: modularImg,
    action: "Download Brochure",
  },
  {
    title: "Modular Kitchen",
    coverTitle: "Modular\nKitchen",
    desc: "Functional and elegant modular kitchen designs.",
    href: "/downloads/ebrochures/Modular Kitchen.pdf",
    size: "1.2 MB",
    img: kitchenImg,
    action: "Download Brochure",
  },
  {
    title: "ENSIS Brochure",
    coverTitle: "Spa & Panchkarma\nFurniture",
    desc: "Premium spa and Panchkarma furniture solutions.",
    href: "/downloads/ebrochures/e-broucher.pdf",
    size: "3.2 MB",
    img: ensisImg,
    action: "Download Brochure",
    ensis: true,
  },
  {
    title: "Corporate Interior Newsletter",
    coverTitle: "Corporate\nInteriors",
    desc: "Highlights from our corporate interior projects.",
    href: "/downloads/newsletter/corprate_nov.pdf",
    size: "303 KB",
    img: corporateImg,
    action: "Download Newsletter",
  },
  {
    title: "Residential Interior Newsletter",
    coverTitle: "Residential\nInteriors",
    desc: "Highlights from our residential interior projects.",
    href: "/downloads/newsletter/residential_nov.pdf",
    size: "1.8 MB",
    img: residentialImg,
    action: "Download Newsletter",
  },
];

// Profiles without a PDF yet; shown after everything else with a "Coming Soon" button
const COMING_SOON: DownloadItem[] = [
  {
    title: "Retail Showroom Interiors",
    coverTitle: "Retail\nShowroom\nInteriors",
    desc: "Design and build solutions for retail stores and showrooms.",
    img: retailImg,
    action: "Coming Soon",
  },
  {
    title: "Restaurant & Hospitality",
    coverTitle: "Restaurant &\nHospitality\nInteriors",
    desc: "Creating memorable dining and hospitality experiences.",
    img: restaurantImg,
    action: "Coming Soon",
  },
  {
    title: "Exhibition Stall Design",
    coverTitle: "Exhibition\nStall Design\n& Build",
    desc: "Innovative exhibition stalls and brand environments.",
    img: exhibitionImg,
    action: "Coming Soon",
  },
];

/** Hero banner content from the admin (Pages & CMS → Downloads → Downloads Hero Banner) */
export interface DownloadsHero {
  enabled?: boolean;
  eyebrow?: string;
  title?: string;
  highlightedWord?: string;
  description?: string;
  image?: string;
  alt?: string;
  heroWords?: string;
}

// Shown until the admin's content loads (or if the backend is unreachable)
const HERO_DEFAULTS = {
  eyebrow: "Downloads",
  title: "Our Company",
  highlightedWord: "Profiles & Brochures",
  description:
    "Explore and download our company profiles and brand brochures to know more about our businesses and capabilities.",
  alt: "Design House India Downloads and Company Brochures Banner",
  heroWords: ["Spaces", "Brands", "Businesses", "People"],
};


/* Card cover: the photo with a navy panel over its left part (slanted right edge) carrying the
   "Design House" name and the document title, or a light ENSIS panel for the ENSIS brochure. */
const Cover = ({ item }: { item: DownloadItem }) => (
  <div className="relative aspect-[4/3] rounded-[4px] overflow-hidden shadow-[0_2px_6px_rgba(10,30,74,0.18)]">
    <Image
      src={item.img}
      alt={item.imgAlt || item.title}
      fill
      placeholder={typeof item.img === "string" ? "empty" : "blur"}
      sizes="(min-width: 1280px) 16vw, (min-width: 768px) 33vw, 100vw"
      className="object-cover object-right"
    />
    {item.ensis ? (
      <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 via-45% to-transparent to-70% px-3.5 py-3.5">
        <p className="text-[28px] font-bold text-[#0E6B6B] leading-none tracking-wide mb-2">ENSIS</p>
        <p className="whitespace-pre-line text-[10px] font-medium uppercase text-[#1F2D44] leading-snug">{item.coverTitle}</p>
      </div>
    ) : (
      <>
        {/* Thin lighter-blue edge along the cut, then the navy panel (steep diagonal: wide at the top, narrow at the bottom) */}
        <div className="absolute inset-0 bg-[#3B6BC4]/70 [clip-path:polygon(0_0,66%_0,40%_100%,0_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1E4A] to-[#10306E] [clip-path:polygon(0_0,64%_0,38%_100%,0_100%)]" />
        <div className="absolute inset-0 px-3.5 pt-3.5 pb-3 flex flex-col">
          <p className="text-[12.5px] font-extrabold text-white leading-none tracking-[-0.01em]">DESIGN HOUSE</p>
          <p className="text-[6px] font-bold text-white/85 tracking-[0.18em] mt-[2px] pl-[14px]">INDIA PVT. LTD.</p>
          <p
            className={`whitespace-pre-line uppercase leading-[1.15] mt-4 ${
              item.accent ? "text-[#fd6e15] text-[16px] font-medium" : "text-white text-[13px] font-medium"
            }`}
          >
            {item.coverTitle}
          </p>
          {item.accent && (
            <p className="mt-auto text-[7.5px] text-white/85 leading-snug">
              Transforming Spaces,
              <br />
              Creating Experiences.
            </p>
          )}
        </div>
      </>
    )}
  </div>
);

/* Downloads page: banner (navy left with the title, reception photo right with four words), then a grid
   of company profile / brochure / newsletter cards, each with a cover, details and a download button.
   The cards are managed in the admin (Content Management → Downloads); `downloads` is null only when
   the backend couldn't be reached, and then the built-in cards are shown. */
const DownloadsPage = ({ hero, downloads }: { hero?: DownloadsHero | null; downloads?: DownloadRecord[] | null }) => {
  const eyebrow = hero?.eyebrow?.trim() || HERO_DEFAULTS.eyebrow;
  const title = hero?.title?.trim() || HERO_DEFAULTS.title;
  const highlightedWord = hero?.highlightedWord?.trim() ?? HERO_DEFAULTS.highlightedWord;
  const description = hero?.description?.trim() || HERO_DEFAULTS.description;
  const heroAlt = hero?.alt?.trim() || HERO_DEFAULTS.alt;
  const heroWordsFromAdmin = (hero?.heroWords || "").split(",").map((w) => w.trim()).filter(Boolean);
  const heroWords = heroWordsFromAdmin.length ? heroWordsFromAdmin : HERO_DEFAULTS.heroWords;
  // Image uploaded in the admin (Cloudinary); otherwise the built-in banner
  const heroImage = hero?.image && /^https?:\/\//.test(hero.image) ? hero.image : null;

  const items = downloads ? downloads.map(toCard) : [...DOWNLOADS, ...COMING_SOON];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Topbar />
      <Navbar />

      <main className="flex-1">
        {/* ── Banner (switched off in the admin: hidden) ── */}
        {hero?.enabled !== false && (
        <section className="hero-banner relative w-full bg-[#0A2050] pt-[56px] sm:pt-[68px]">
          <style>{HERO_BANNER_CSS}</style>
          <div className="relative h-[300px] sm:h-[280px] lg:h-[300px] overflow-hidden">
            {heroImage ? (
              <Image src={heroImage} alt={heroAlt} fill priority sizes="100vw" className="object-cover object-left sm:object-[center_40%]" />
            ) : (
              <Image src={heroBg} alt={heroAlt} fill priority placeholder="blur" sizes="100vw" className="object-cover object-left sm:object-[center_40%]" />
            )}
            {/* Light dark wash on the right edge, behind the four words */}
            <div className="hidden md:block absolute inset-y-0 right-0 w-[24%] bg-gradient-to-l from-black/45 to-transparent" />

            <div className="relative h-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
              <div className="hb-blur-in flex items-center gap-3 mb-3" style={{ animationDelay: "0.15s" }}>
                <span className="w-8 h-[2px] bg-[#fd6e15]" />
                <span className="text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.3em] text-white">{eyebrow}</span>
              </div>
              {/* The page's only H1: Title + Highlighted Accent Word from the admin ("Our Company Profiles & Brochures") */}
              <h1
                className="text-[32px] sm:text-[40px] lg:text-[48px] font-serif font-medium leading-[1.06] text-white mb-3 [perspective:800px]"
                style={{ textShadow: HERO_TITLE_SHADOW }}
              >
                <span className="block overflow-hidden">
                  <span className="hb-title-line" style={{ animationDelay: "0.2s" }}>{title}</span>
                </span>
                {highlightedWord && (
                  <span className="block overflow-hidden">
                    {/* Leading space so the H1 reads "Our Company Profiles & Brochures", not "CompanyProfiles" */}
                    <span className="sr-only">{" "}</span>
                    <span
                      className="hb-title-line text-[#fd6e15]"
                      style={{
                        fontSize: "0.9em", // a touch smaller than the title
                        animationDelay: "0.4s",
                        textShadow: HERO_ACCENT_SHADOW,
                      }}
                    >
                      {highlightedWord}
                    </span>
                  </span>
                )}
              </h1>
              <p
                className="hb-desc-in text-[13.5px] sm:text-[15px] text-white/90 leading-relaxed max-w-[440px]"
                style={{ animationDelay: "0.45s", textShadow: HERO_DESC_SHADOW }}
              >
                {description}
              </p>
            </div>

            <div className="hidden md:block absolute top-1/2 -translate-y-1/2 right-[4%]">
              <ul className="space-y-1.5">
                {heroWords.map((w) => (
                  <li key={w} className="text-white text-[18px] lg:text-[20px] uppercase tracking-[0.04em] leading-tight">
                    {w}
                  </li>
                ))}
              </ul>
              <span className="block w-10 h-[2px] bg-[#fd6e15] mt-4" />
            </div>
          </div>
        </section>
        )}

        {/* ── Download cards ── */}
        <section className="w-full bg-white">
          <ul className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-7 lg:py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
            {items.map((item) => (
              <li
                key={item.key ?? item.href ?? item.title}
                className="flex flex-col rounded-md bg-white p-3 shadow-[rgba(0,0,0,0.12)_0px_1px_3px,rgba(0,0,0,0.24)_0px_1px_2px]"
              >
                <Cover item={item} />
                <h2 className="font-sans font-semibold text-[15px] text-[#0A2B5E] leading-snug mt-3 mb-1">{item.title}</h2>
                <p className="text-[12px] text-black leading-snug mb-3">{item.desc}</p>
                <p className="mt-auto flex items-center gap-2 text-[12px] text-[#3A4A63] mb-2.5">
                  <FileText className="w-4 h-4 text-[#fd6e15]" />
                  PDF
                  {item.size && (
                    <>
                      <span className="text-[#C5CFDD]">|</span>
                      {item.size}
                    </>
                  )}
                </p>
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="group flex items-center justify-center gap-2 rounded-md bg-[#fd6e15] hover:bg-[#e05d0e] py-2.5 text-white text-[12.5px] font-semibold transition-colors"
                  >
                    {item.action}
                    <Download className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
                  </a>
                ) : (
                  <span
                    aria-disabled="true"
                    className="flex items-center justify-center gap-2 rounded-md bg-[#E3E8F0] py-2.5 text-[#7A8AA3] text-[12.5px] font-semibold cursor-not-allowed select-none"
                  >
                    <Clock className="w-4 h-4" />
                    {item.action}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default DownloadsPage;
