import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  Factory,
  Gem,
  HardHat,
  Headset,
  Home,
  HousePlus,
  Layers,
  MapPin,
  MessagesSquare,
  Monitor,
  PencilRuler,
  Sofa,
  Users,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";

import heroBanner from "@/assets/banner/ri.webp";
import sweepLeft from "@/assets/icon/oc.png";
import sweepRight from "@/assets/icon/oc1.png";
import livingImg from "@/assets/image/res1.webp";
import diningImg from "@/assets/image/res2.webp";
import loungeImg from "@/assets/image/res3.webp";
import bedroomViewImg from "@/assets/image/res4.webp";
import bedroomImg from "@/assets/image/res.webp";
import meetingImg from "@/assets/image/3.webp";
import designImg from "@/assets/image/s3.webp";
import materialsImg from "@/assets/image/s2.webp";
import workshopImg from "@/assets/image/w2.webp";
import masterBedroomImg from "../../../../public/service/optimized/resedential/re1.webp";
import diningRoomImg from "../../../../public/service/optimized/resedential/re3.webp";
import kitchenImg from "../../../../public/service/optimized/resedential/re4.webp";
import wardrobeImg from "../../../../public/service/optimized/resedential/re5.webp";
import installImg from "../../../../public/service/optimized/manufacturing/m5.webp";

import { BedWide, KitchenUnits, LoungeSofa, WardrobeDoors } from "../detail/showcaseIcons";
import type { ServiceDetail } from "../detail/types";
import { HERO_ACCENT_SHADOW, HERO_BANNER_CSS, HERO_DESC_SHADOW, HERO_TITLE_SHADOW } from "@/components/common/heroBannerEffects";
import ResidentialFaqs from "./ResidentialFaqs";

/* /services/residential-interiors: its own designed page. Hero with a stats band, overview, what we offer, why choose
   us, process, featured projects and FAQs. The overview photo and the FAQs can come from the admin (lib/services.ts);
   the rest is here. */

const NAVY = "#0B2350";
const ORANGE = "#F7931E";
const GOLD = "#F5A623";
const SERIF = { fontFamily: "var(--font-playfair), Georgia, serif" };

const WRAP = "max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8";

type Item = { icon: LucideIcon; title: string; text: string };

const HERO_FEATURES: Item[] = [
  { icon: Home, title: "Personalized Design", text: "Spaces tailored\nto your lifestyle" },
  { icon: Sofa, title: "Complete Interiors", text: "From design to\nexecution" },
  { icon: Gem, title: "Premium Materials", text: "Quality and\ndurable finishes" },
  { icon: Headset, title: "End-to-End Support", text: "Hassle-free\nproject delivery" },
];

const STATS: { icon: LucideIcon; value: string; label: string }[] = [
  { icon: Award, value: "21+ Years", label: "of Industry Experience" },
  { icon: Users, value: "500+", label: "Happy Clients" },
  { icon: Layers, value: "End-to-End", label: "Design & Execution" },
  { icon: MapPin, value: "Pan-India", label: "Project Delivery" },
];

const OVERVIEW_POINTS: { icon: LucideIcon; label: string }[] = [
  { icon: HousePlus, label: "Personalized\nDesign" },
  { icon: Layers, label: "End-to-End\nExecution" },
  { icon: Factory, label: "In-house\nManufacturing" },
  { icon: MapPin, label: "Multi-City\nDelivery" },
];

const OFFERS: { icon: LucideIcon; title: string; text: string; image: StaticImageData; alt: string }[] = [
  { icon: LoungeSofa, title: "Living Spaces", text: "Thoughtfully designed living rooms that blend comfort, style and functionality.", image: loungeImg, alt: "Living room with a large sectional sofa and city views" },
  { icon: KitchenUnits, title: "Modular Kitchens", text: "Smart, space-efficient and contemporary kitchens with modern layouts and storage.", image: kitchenImg, alt: "Modular kitchen with a marble island and bar stools" },
  { icon: BedWide, title: "Bedroom Interiors", text: "Peaceful and personalized bedrooms that enhance rest, storage and style.", image: bedroomImg, alt: "Bedroom with a padded headboard and warm lighting" },
  { icon: WardrobeDoors, title: "Wardrobes & Storage", text: "Bespoke storage solutions that keep your home organized, stylish and clutter-free.", image: wardrobeImg, alt: "Walk-in wardrobe with lit shelves and a dressing table" },
  { icon: UtensilsCrossed, title: "Dining & Entertainment", text: "Elegant dining areas and multi-purpose spaces for family time, hosting and relaxation.", image: diningImg, alt: "Dining room with long tables and chandeliers" },
  { icon: Home, title: "Home Transformation", text: "Complete interior makeovers and renovations for a fresh, modern and value-enhanced home.", image: bedroomViewImg, alt: "Bedroom with a bench and a balcony view" },
];

const BENEFITS: Item[] = [
  { icon: PencilRuler, title: "Bespoke Design", text: "Personalized interiors that reflect your lifestyle, space and taste." },
  { icon: Layers, title: "End-to-End Solutions", text: "From concept and planning to manufacturing and on-site execution." },
  { icon: Factory, title: "In-house Manufacturing", text: "Precision, quality control and timely delivery through our own production setup." },
  { icon: BadgeCheck, title: "Assured Quality", text: "Premium materials, skilled craftsmanship and lasting finishes." },
  { icon: Users, title: "Experienced Team", text: "A dedicated team of designers, project managers and execution specialists." },
  { icon: MapPin, title: "Pan-India Execution", text: "Consistent design and project delivery across multiple cities." },
];

const STEPS: { icon: LucideIcon; title: string; text: string; image: StaticImageData; alt: string }[] = [
  { icon: MessagesSquare, title: "Consultation & Requirement Study", text: "Understand your lifestyle, preferences, space needs and budget to define the right scope.", image: meetingImg, alt: "Our team discussing drawings with clients" },
  { icon: Monitor, title: "Concept & Design Development", text: "Turn your ideas into practical designs with layout planning, 3D visuals and a detailed proposal.", image: designImg, alt: "Designer working on a 3D interior design" },
  { icon: Layers, title: "Material Finalization", text: "Select the right materials, finishes, colors and fittings that match your style, comfort and durability needs.", image: materialsImg, alt: "Team going through material samples and drawings" },
  { icon: Factory, title: "In-house Manufacturing", text: "Precision-built furniture and interior elements at our own facility with strict quality checks.", image: workshopImg, alt: "Craftsman at a CNC machine in our factory" },
  { icon: HardHat, title: "Execution & Installation", text: "On-site execution with skilled teams, proper coordination and quality supervision.", image: installImg, alt: "Installers fitting lit shelves on site" },
  { icon: Home, title: "Handover & After Support", text: "A beautifully completed home with a final walkthrough, care guidelines, warranty support and continued assistance.", image: livingImg, alt: "Completed living room ready to move in" },
];

const PROJECTS: { icon: LucideIcon; title: string; tags: string[]; image: StaticImageData; alt: string }[] = [
  { icon: LoungeSofa, title: "Modern Living Room", tags: ["Comfort", "Style", "Functionality"], image: livingImg, alt: "Modern living room with a sectional sofa" },
  { icon: KitchenUnits, title: "Modular Kitchen", tags: ["Efficient", "Elegant", "Space-Smart"], image: kitchenImg, alt: "Modular kitchen with an island and pendant lights" },
  { icon: BedWide, title: "Master Bedroom", tags: ["Relaxing", "Organized", "Personalized"], image: masterBedroomImg, alt: "Master bedroom with a glass-fronted wardrobe" },
  { icon: WardrobeDoors, title: "Wardrobes & Storage", tags: ["Smart", "Spacious", "Clutter-Free"], image: wardrobeImg, alt: "Walk-in wardrobe with lit shelving" },
  { icon: UtensilsCrossed, title: "Dining & Entertainment", tags: ["Elegant", "Social", "Inviting"], image: diningRoomImg, alt: "Dining room with a chandelier" },
];

/* ── Small shared pieces ── */

// "—— WHAT WE OFFER ——"
const Eyebrow = ({ children, center, light }: { children: string; center?: boolean; light?: boolean }) => (
  <p className={`flex items-center gap-3 text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.18em] ${center ? "justify-center" : ""} ${light ? "text-[#F5A623]" : "text-[#0B2350]"}`}>
    <span className="h-[3px] w-9 sm:w-12 rounded-full" style={{ background: light ? GOLD : ORANGE }} />
    {children}
    {center && <span className="h-[3px] w-9 sm:w-12 rounded-full" style={{ background: ORANGE }} />}
  </p>
);

const OrangeButton = ({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) => (
  <Link
    href={href}
    className={`group inline-flex items-center justify-center gap-2.5 rounded-[6px] bg-gradient-to-r from-[#F7931E] to-[#F27A10] px-6 py-3.5 text-[13px] sm:text-[14px] font-bold text-white shadow-[0_10px_22px_-10px_rgba(247,147,30,0.8)] transition hover:brightness-105 ${className}`}
  >
    {children}
    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
  </Link>
);

// Thin orange curves in the corners (What We Offer)
const CornerWaves = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 300 110" fill="none" aria-hidden="true" className={`pointer-events-none absolute w-[220px] sm:w-[300px] ${className}`}>
    {[0, 8, 16, 24, 32].map((d) => (
      <path key={d} d={`M0 ${30 + d}C70 ${-10 + d} 130 ${90 + d} 300 ${20 + d}`} stroke={ORANGE} strokeOpacity={0.35 - d / 120} strokeWidth="1.2" />
    ))}
  </svg>
);

/* ── 1. Hero, with the stats band ── */
const Hero = () => (
  <section className="hero-banner relative w-full overflow-hidden bg-[#0B2A55] pt-[56px] sm:pt-[68px]">
    {/* Type, colours and entrance effects as on the About Us banner */}
    <style>{HERO_BANNER_CSS}</style>
    <div className="relative">
      {/* The banner (navy with gold lines on the left, the room on the right): behind the text from lg; on phones its
          room side shows above the text */}
      <div className="relative h-[230px] sm:h-[320px] lg:absolute lg:inset-0 lg:h-auto">
        <Image src={heroBanner} alt="Living room with a sectional sofa, a round coffee table and a dining area" fill priority sizes="100vw" className="object-cover object-[88%_center] lg:object-right" />
      </div>

      <div className={`relative ${WRAP} py-8 sm:py-10 lg:py-6`}>
        <div className="max-w-[600px]">
          <p className="hb-blur-in text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.25em] text-white" style={{ animationDelay: "0.15s" }}>
            Our Services
          </p>
          <span className="hb-blur-in mb-4 mt-2.5 block h-[3px] w-[86px] rounded-full bg-[#fd6e15]" style={{ animationDelay: "0.2s" }} />
          <h1
            className="text-[38px] sm:text-[46px] lg:text-[52px] font-serif font-bold leading-[1.05] tracking-tight text-white [perspective:800px]"
            style={{ textShadow: HERO_TITLE_SHADOW }}
          >
            <span className="block overflow-hidden">
              <span className="hb-title-line" style={{ animationDelay: "0.25s" }}>
                Residential
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className="hb-title-line text-[#F7A21B]" style={{ animationDelay: "0.4s", textShadow: HERO_ACCENT_SHADOW }}>
                Interiors
              </span>
            </span>
          </h1>
          <p className="hb-desc-in mt-3 text-[16px] sm:text-[18px] font-semibold text-white" style={{ animationDelay: "0.5s", textShadow: HERO_DESC_SHADOW }}>
            Homes Designed for a Better Way of Living
          </p>
          <p className="hb-desc-in mt-2 max-w-[500px] text-[13px] sm:text-[13.5px] leading-[1.55] text-white/90" style={{ animationDelay: "0.6s", textShadow: HERO_DESC_SHADOW }}>
            We design and execute beautiful, functional and timeless residential interiors that reflect your lifestyle. From concept to completion, we create elegant spaces with the
            perfect balance of aesthetics, comfort and practicality.
          </p>

          <ul className="mt-5 grid max-w-[540px] grid-cols-2 gap-y-5 sm:grid-cols-4">
            {HERO_FEATURES.map(({ icon: Icon, title, text }, i) => (
              <li key={title} className={`flex flex-col items-center px-2 text-center ${i > 0 ? "sm:border-l sm:border-white/20" : ""} ${i % 2 === 1 ? "border-l border-white/20 sm:border-l" : ""}`}>
                <span className="grid h-[40px] w-[40px] place-items-center rounded-full border-2 border-[#F5A623] text-[#F5A623]">
                  <Icon className="h-[19px] w-[19px]" strokeWidth={1.6} />
                </span>
                <span className="mt-2 text-[11.5px] font-bold text-white">{title}</span>
                <span className="mt-0.5 whitespace-pre-line text-[10.5px] leading-[1.4] text-white/75">{text}</span>
              </li>
            ))}
          </ul>

          <div className="mt-5 flex flex-wrap gap-3">
            <OrangeButton href="/contact" className="!px-5 !py-2.5 !text-[12.5px] uppercase tracking-wide">
              Enquire Now
            </OrangeButton>
            <Link
              href="/portfolio"
              className="group inline-flex items-center gap-2.5 rounded-[6px] border-2 border-white/80 px-5 py-2 text-[12.5px] font-bold uppercase tracking-wide text-white transition hover:bg-white hover:text-[#0A1F44]"
            >
              View Projects
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>

    {/* Stats band */}
    <div className="relative border-t border-white/15 bg-[#0B2350]">
      {/* Gold line sweeps at both ends of the band */}
      <Image src={sweepLeft} alt="" aria-hidden="true" sizes="300px" className="pointer-events-none absolute bottom-0 left-0 h-[70px] w-auto sm:h-[90px]" />
      <Image src={sweepRight} alt="" aria-hidden="true" sizes="300px" className="pointer-events-none absolute bottom-0 right-0 h-[70px] w-auto sm:h-[90px]" />
      <ul className={`relative ${WRAP} grid grid-cols-2 gap-y-3 py-4 lg:grid-cols-4 lg:py-4`}>
        {STATS.map(({ icon: Icon, value, label }, i) => (
          <li key={value} className={`flex items-center justify-center gap-3 px-3 ${i > 0 ? "lg:border-l lg:border-white/20" : ""}`}>
            <Icon className="h-6 w-6 shrink-0 text-[#F5A623]" strokeWidth={1.5} />
            <span>
              <span className="block text-[14px] sm:text-[15px] font-semibold leading-tight text-white">{value}</span>
              <span className="block text-[11.5px] sm:text-[12px] leading-tight text-white/80">{label}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

/* ── 2. Overview ── */
const Overview = ({ image }: { image: StaticImageData | string }) => (
  <section className="relative w-full overflow-hidden bg-white">
    <div className={`${WRAP} grid items-center gap-10 py-14 lg:grid-cols-[1fr_1fr] lg:gap-6 lg:py-16`}>
      <div>
        <Eyebrow>Overview</Eyebrow>
        <h2 className="mt-4 text-[38px] sm:text-[48px] lg:text-[54px] font-bold leading-[1.05]" style={SERIF}>
          <span className="block text-[#0B2350]">Creating Homes</span>
          <span className="relative inline-block italic text-[#F7931E]">
            That Inspire
            <svg viewBox="0 0 300 18" fill="none" aria-hidden="true" className="absolute -bottom-2 left-[28%] w-[72%]">
              <path d="M2 14C80 2 200 2 298 10" stroke={ORANGE} strokeWidth="3" strokeLinecap="round" />
            </svg>
          </span>
        </h2>
        <p className="mt-6 max-w-[600px] text-[14px] sm:text-[15.5px] leading-[1.7] text-[#334155]">
          We design and execute modern, functional and personalized residential interiors that reflect your lifestyle. From concept and design to in-house manufacturing and final
          execution, we transform spaces into comfortable, elegant and inspiring homes.
        </p>
        <ul className="mt-8 grid max-w-[600px] grid-cols-2 gap-y-6 sm:grid-cols-4">
          {OVERVIEW_POINTS.map(({ icon: Icon, label }, i) => (
            <li key={label} className={`flex flex-col items-center px-2 text-center ${i > 0 ? "sm:border-l sm:border-[#E2E8F0]" : ""} ${i % 2 === 1 ? "border-l border-[#E2E8F0]" : ""}`}>
              <Icon className="h-10 w-10 text-[#F7931E]" strokeWidth={1.5} />
              <span className="mt-3 whitespace-pre-line text-[13px] sm:text-[14px] font-bold leading-[1.3] text-[#0B2350]">{label}</span>
            </li>
          ))}
        </ul>
        <div className="mt-9 flex flex-wrap gap-3 sm:gap-4">
          <OrangeButton href="/contact">Get a Residential Design Consultation</OrangeButton>
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-2.5 rounded-[6px] border-2 border-[#0B2350] px-6 py-3 text-[13px] sm:text-[14px] font-bold text-[#0B2350] transition hover:bg-[#0B2350] hover:text-white"
          >
            Explore Our Work
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* The photo with a curved left edge and an orange sweep */}
      <div className="relative h-[300px] sm:h-[420px] lg:h-[480px]">
        <div className="absolute -left-3 top-[6%] bottom-[6%] w-[55%] rounded-l-[999px] border-l-[7px] border-[#F7931E] opacity-90" aria-hidden="true" />
        <div className="absolute inset-0 overflow-hidden rounded-l-[260px] rounded-r-[18px] sm:rounded-l-[340px]">
          <Image src={image} alt="Living room with a beige sectional sofa and a gold coffee table" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        </div>
      </div>
    </div>
  </section>
);

/* ── 3. What we offer ── */
const Offers = () => (
  <section className="relative w-full overflow-hidden bg-white">
    <CornerWaves className="left-0 top-0" />
    <CornerWaves className="right-0 top-0 -scale-x-100" />
    <CornerWaves className="bottom-0 left-0 -scale-y-100" />
    <CornerWaves className="bottom-0 right-0 -scale-100" />
    <div className={`relative ${WRAP} py-14 lg:py-16`}>
      <div className="text-center">
        <Eyebrow center>What We Offer</Eyebrow>
        <h2 className="mt-3 text-[28px] sm:text-[36px] lg:text-[42px] font-bold leading-[1.15] text-[#0B2350]">
          Complete Residential Interior <span className="text-[#F7931E]">Solutions</span>
        </h2>
        <p className="mx-auto mt-3 max-w-[920px] text-[14px] sm:text-[15.5px] leading-[1.6] text-[#334155]">
          From thoughtful planning to flawless execution, we offer end-to-end residential interior solutions that blend design, functionality and your personal style—creating
          homes that are beautiful, comfortable and truly yours.
        </p>
      </div>
      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {OFFERS.map(({ icon: Icon, title, text, image, alt }) => (
          <li key={title} className="group flex flex-col overflow-hidden rounded-[18px] bg-white shadow-[0_10px_30px_-16px_rgba(11,35,80,0.35)] ring-1 ring-black/5 transition hover:-translate-y-1">
            <div className="relative h-[170px] xl:h-[150px]">
              <Image src={image} alt={alt} fill sizes="(min-width: 1280px) 16vw, (min-width: 640px) 45vw, 100vw" className="object-cover transition duration-500 group-hover:scale-105" />
              {/* White wave along the photo's bottom, with an orange edge */}
              <svg viewBox="0 0 300 40" preserveAspectRatio="none" aria-hidden="true" className="absolute -bottom-px left-0 h-[34px] w-full">
                <path d="M0 22C70 4 120 4 150 14C185 26 230 34 300 12V40H0Z" fill="#fff" />
                <path d="M0 22C70 4 120 4 150 14C185 26 230 34 300 12" stroke={ORANGE} strokeWidth="2.5" fill="none" />
              </svg>
            </div>
            <div className="relative flex flex-1 flex-col items-center px-4 pb-5 pt-9 text-center">
              <span className="absolute -top-8 left-1/2 grid h-[56px] w-[56px] -translate-x-1/2 place-items-center rounded-full bg-gradient-to-br from-[#F7931E] to-[#F27A10] text-white shadow-[0_8px_18px_-8px_rgba(247,147,30,0.9)] ring-4 ring-white">
                <Icon className="h-[26px] w-[26px]" />
              </span>
              <h3 className="text-[17px] font-bold text-[#0B2350]">{title}</h3>
              <p className="mt-2 flex-1 text-[13px] leading-[1.5] text-[#475569]">{text}</p>
              <span className="mt-4 h-[2px] w-10 bg-[#0B2350]/40" />
              <Link href="/contact" className="mt-4 inline-flex items-center gap-2 text-[13px] font-bold text-[#0B2350] hover:text-[#F7931E]">
                More Information
                <span className="grid h-6 w-6 place-items-center rounded-full bg-[#F7931E] text-white">
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

/* ── 4. Why choose us ── */
const WhyChooseUs = () => (
  <section className="relative w-full overflow-hidden">
    <Image src={loungeImg} alt="" fill sizes="100vw" className="object-cover blur-[2px] scale-105" aria-hidden="true" />
    <div className="absolute inset-0 bg-[#FBF6EF]/85" />
    <div className={`relative ${WRAP} py-14 lg:py-16`}>
      <div className="text-center">
        <Eyebrow center>Core Benefits</Eyebrow>
        <h2 className="mt-3 text-[32px] sm:text-[42px] lg:text-[48px] font-bold leading-[1.1] text-[#0B2350]">
          Why <span className="text-[#F7931E]">Choose Us</span>
        </h2>
        <p className="mx-auto mt-3 max-w-[900px] text-[14px] sm:text-[15.5px] text-[#334155]">
          A reliable partner for residential interiors that combines design expertise, quality execution and a seamless, stress-free experience.
        </p>
      </div>
      <ul className="mx-auto mt-10 grid max-w-[1260px] gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {BENEFITS.map(({ icon: Icon, title, text }) => (
          <li key={title} className="relative flex items-center gap-4 overflow-hidden rounded-[20px] bg-white/75 p-5 shadow-[0_14px_34px_-18px_rgba(11,35,80,0.35)] ring-1 ring-white backdrop-blur-md sm:p-6">
            {/* Orange corner, top left */}
            <span className="pointer-events-none absolute left-0 top-0 h-14 w-24 rounded-tl-[20px] border-l-[4px] border-t-[4px] border-[#F7931E]" aria-hidden="true" />
            <span className="grid h-[64px] w-[64px] shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#FFF4E4] to-[#FFE5C4] text-[#0B2350] shadow-inner">
              <Icon className="h-[30px] w-[30px]" strokeWidth={1.5} />
            </span>
            <span className="h-[64px] w-[2px] shrink-0 bg-gradient-to-b from-transparent via-[#F7931E] to-transparent" aria-hidden="true" />
            <span>
              <span className="block text-[17px] font-bold text-[#0B2350]">{title}</span>
              <span className="mt-1 block text-[13.5px] leading-[1.5] text-[#475569]">{text}</span>
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-10 text-center">
        <OrangeButton href="/contact" className="rounded-full px-10 py-4 text-[15px] sm:text-[16px]">
          Discuss Your Home Interior Project
        </OrangeButton>
      </div>
    </div>
  </section>
);

/* ── 5. Process ── */
const Process = () => (
  <section className="relative w-full bg-[#FCF8F3]">
    <div className={`${WRAP} py-14 lg:py-16`}>
      <div className="text-center">
        <Eyebrow center>Our Process</Eyebrow>
        <h2 className="mt-3 text-[32px] sm:text-[42px] lg:text-[48px] font-bold leading-[1.1] text-[#0B2350]">
          From Concept to <span className="text-[#D9862B]">Home</span>
        </h2>
        <p className="mx-auto mt-3 max-w-[860px] text-[14px] sm:text-[15.5px] leading-[1.6] text-[#334155]">
          A clear, collaborative and well-structured process that transforms your ideas into a beautifully designed, functional and ready-to-live home.
        </p>
      </div>
      <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {STEPS.map(({ icon: Icon, title, text, image, alt }) => (
          <li key={title} className="flex flex-col overflow-hidden rounded-[16px] bg-white shadow-[0_10px_28px_-16px_rgba(11,35,80,0.35)] ring-1 ring-black/5">
            <div className="relative h-[160px]">
              <Image src={image} alt={alt} fill sizes="(min-width: 1280px) 16vw, (min-width: 640px) 45vw, 100vw" className="object-cover" />
            </div>
            <div className="relative flex flex-1 flex-col items-center px-4 pb-6 pt-10 text-center">
              <span className="absolute -top-7 left-1/2 grid h-[56px] w-[56px] -translate-x-1/2 place-items-center rounded-full bg-white text-[#F7931E] shadow-[0_6px_16px_-6px_rgba(11,35,80,0.35)] ring-1 ring-[#F7931E]/30">
                <Icon className="h-[26px] w-[26px]" strokeWidth={1.6} />
              </span>
              <h3 className="text-[15.5px] font-bold leading-[1.3] text-[#0B2350]">{title}</h3>
              <span className="my-3 h-[3px] w-10 rounded-full bg-[#F7931E]" />
              <p className="text-[13px] leading-[1.55] text-[#475569]">{text}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

/* ── 6. Featured projects ── */
const Projects = () => (
  <section className="relative w-full overflow-hidden bg-white">
    <div className={`${WRAP} py-14 lg:py-16`}>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-10">
        <div className="shrink-0">
          <p className="flex items-center gap-3 text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.25em] text-[#0B2350]">
            <span className="h-[2px] w-12 bg-[#D9A65B]" />
            Featured Residential
          </p>
          <h2 className="mt-2 text-[36px] sm:text-[48px] lg:text-[54px] leading-[1.05] text-[#0B2350]">
            <span className="font-bold">Interior</span> <span className="font-normal">Projects</span>
          </h2>
        </div>
        <span className="hidden h-[70px] w-px bg-[#0B2350]/30 lg:block" aria-hidden="true" />
        <p className="max-w-[660px] text-[14px] sm:text-[15.5px] leading-[1.6] text-[#475569]">
          A curated selection of our residential interior projects, showcasing thoughtful design, smart space planning and refined execution.
        </p>
      </div>
      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {PROJECTS.map(({ icon: Icon, title, tags, image, alt }) => (
          <li key={title} className="group overflow-hidden rounded-[14px] bg-white shadow-[0_10px_28px_-16px_rgba(11,35,80,0.35)] ring-1 ring-black/5">
            <div className="relative h-[200px] overflow-hidden">
              <Image src={image} alt={alt} fill sizes="(min-width: 1280px) 20vw, (min-width: 640px) 45vw, 100vw" className="object-cover transition duration-500 group-hover:scale-105" />
            </div>
            <div className="px-5 pb-5 pt-4">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[#FBEBD9] text-[#C98734]">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-3 text-[16px] font-semibold text-[#0B2350]">{title}</h3>
              <span className="mt-2 block h-[2px] w-8 bg-[#D9A65B]" />
              <div className="mt-3 flex items-center justify-between gap-2">
                <p className="text-[11.5px] text-[#64748B]">{tags.join("  |  ")}</p>
                <Link href="/portfolio" aria-label={`See ${title} projects`} className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[#D9A65B] text-[#0B2350] transition group-hover:bg-[#F7931E] group-hover:text-white group-hover:border-[#F7931E]">
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

/* ── 7. FAQs ── */
const Faqs = ({ faqs }: { faqs: ServiceDetail["faqs"] }) => (
  <section className="relative w-full overflow-hidden bg-white">
    <div className="grid lg:grid-cols-[42%_58%]">
      <div className="relative h-[260px] sm:h-[360px] lg:h-auto">
        <Image src={livingImg} alt="Living room with a sectional sofa and lit wall shelves" fill sizes="(min-width: 1024px) 42vw, 100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:via-60% lg:to-white" />
      </div>
      <div className="px-4 py-12 sm:px-8 lg:py-16 lg:pl-6 lg:pr-[max(2rem,calc((100vw-1400px)/2+2rem))]">
        <div className="text-center">
          <Eyebrow center>Frequently Asked</Eyebrow>
          <h2 className="mt-3 text-[32px] sm:text-[42px] font-bold leading-[1.1] text-[#0B2350]">
            Questions <span className="text-[#D9862B]">(FAQs)</span>
          </h2>
        </div>
        <ResidentialFaqs faqs={faqs} />
      </div>
    </div>
  </section>
);

const ResidentialPage = ({ data }: { data: ServiceDetail }) => {
  // A photo uploaded in the admin (a URL) replaces the overview photo; the file's own one is the default
  const overview = typeof data.why.image === "string" && data.why.image ? data.why.image : loungeImg;
  return (
    <>
      <Hero />
      <Overview image={overview} />
      <Offers />
      <WhyChooseUs />
      <Process />
      <Projects />
      <Faqs faqs={data.faqs} />
    </>
  );
};

export default ResidentialPage;
