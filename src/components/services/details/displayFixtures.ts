import {
  Boxes,
  Clock,
  Diamond,
  Gem,
  LayoutGrid,
  PencilRuler,
  Pill,
  ShieldCheck,
  Shirt,
  ShoppingCart,
  Smartphone,
  Sofa,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";

import heroImg from "../../../../public/service/optimized/display/d1.webp";
import bagsDisplayImg from "../../../../public/service/optimized/display/d2.webp";
import phonesDisplayImg from "../../../../public/service/optimized/display/d3.webp";
import apparelDisplayImg from "../../../../public/service/optimized/display/d4.webp";
import devicesDisplayImg from "../../../../public/service/optimized/display/d5.webp";
import overviewImg from "@/assets/image/dr.webp";
import apparelImg from "@/assets/image/ds1.png";
import cosmeticsImg from "@/assets/image/ds2.webp";
import electronicsImg from "@/assets/image/ds3.webp";
import luxuryImg from "@/assets/image/ds4.webp";

import { GearOutline, StoreFront, TeamGroup, ToteBag } from "../detail/showcaseIcons";
import type { ServiceDetail } from "../detail/types";

export const displayFixtures: ServiceDetail = {
  slug: "display-fixtures",
  name: "Display Fixtures",
  hero: {
    eyebrow: "Our Services",
    title: ["Display", "Fixtures"],
    tagline: "Showcase Your Brand, Beautifully.",
    text: "We design and manufacture custom display fixtures that enhance product visibility, strengthen brand identity and create engaging retail experiences. From concept to installation, we deliver functional and aesthetically appealing fixtures for all retail formats.",
    image: heroImg,
    secondaryCtaLink: { label: "View Projects", href: "/portfolio/merchandising/merchandising-images" },
    features: [
      { icon: PencilRuler, label: "Custom Design", text: "Brand-focused display solutions" },
      { icon: GearOutline, label: "Durable Fabrication", text: "Premium materials & finishes" },
      { icon: ToteBag, label: "Retail Ready", text: "For all store formats" },
      { icon: StoreFront, label: "End-to-End Support", text: "Design to installation" },
    ],
    showcase: {
      layout: "photo-right-slant-stats",
      imageAlt: "Beauty store with lit wooden shelves, display counters and a large poster on a central column",
      gallery: [
        { image: bagsDisplayImg, alt: "Handbag store with lit shelves and a central display table" },
        { image: phonesDisplayImg, alt: "Phone showroom with wall screens and long wooden display counters" },
        { image: apparelDisplayImg, alt: "Clothing store with mannequins, metal racks and wooden display tables" },
        { image: devicesDisplayImg, alt: "Electronics store with lit shelves, wall screens and display tables" },
      ],
      stat: { icon: StoreFront, value: "200+", label: "Display\nFixtures\nDelivered" },
      moreStats: [
        { icon: ShoppingCart, value: "100+", label: "Retail\nBrands\nServed" },
        { icon: TeamGroup, value: "20+", label: "Retail\nFormats\nPan India" },
      ],
    },
  },
  why: {
    eyebrow: "Overview",
    layout: "overview",
    title: ["Display Fixtures", "That Drive Sales"],
    text: "Our display fixtures combine design, functionality and durability to help your products stand out. Whether for retail stores, showrooms, exhibitions or branded environments, we create custom fixtures that enhance visibility, improve customer engagement and support your sales growth. With in-house manufacturing, modular construction and careful attention to lighting, materials and finishes, every fixture we deliver is built to present your products at their best and stay reliable through everyday use.",
    image: overviewImg,
    points: [
      { icon: Gem, title: "Product Focused Design", text: "Displays that highlight your products" },
      { icon: LayoutGrid, title: "Flexible & Modular", text: "Adaptable to different spaces and product ranges" },
      { icon: ShieldCheck, title: "Durable Construction", text: "High-quality materials and finishes" },
      { icon: Boxes, title: "Customized Solutions", text: "Tailored to your brand and industry" },
      { icon: Clock, title: "On-Time Delivery", text: "Efficient production and installation" },
    ],
  },
  process: {
    tone: "warm",
    title: "From Concept to Installation",
    text: "A streamlined process to deliver effective display fixtures.",
    steps: [
      { title: "Requirement Analysis", text: "Understand your products, brand and space" },
      { title: "Design & Visualization", text: "Concept design, 3D visuals and material selection" },
      { title: "Manufacturing", text: "In-house production with quality checks" },
      { title: "Installation", text: "On-site setup and final handover" },
    ],
  },
  projects: {
    title: "Our Display Fixture Projects",
    linkStyle: "text",
    items: [
      { title: "Apparel Store Displays", place: "DLF Mall, Noida", image: apparelImg },
      { title: "Cosmetics Display Fixtures", place: "Gurugram, Haryana", image: cosmeticsImg },
      { title: "Electronics Display", place: "Select Citywalk, Delhi", image: electronicsImg },
      { title: "Luxury Brand Displays", place: "Mumbai", image: luxuryImg },
    ],
  },
  idealFor: {
    title: ["Display Fixtures for Every Industry"],
    tiles: [
      { icon: Shirt, label: "Fashion &\nApparel" },
      { icon: Sparkles, label: "Cosmetics &\nPersonal Care" },
      { icon: Smartphone, label: "Electronics &\nGadgets" },
      { icon: UtensilsCrossed, label: "Food &\nBeverage" },
      { icon: Sofa, label: "Home Décor &\nLifestyle" },
      { icon: Diamond, label: "Jewellery &\nLuxury Brands" },
      { icon: Pill, label: "Pharma &\nHealthcare" },
    ],
  },
  faqHeading: {
    title: "Frequently Asked Questions",
    text: "Quick answers to common questions about our display fixture services.",
  },
  faqStyle: { numbered: true, tone: "blue" },
  faqs: [
    {
      q: "What types of display fixtures do you manufacture?",
      a: "Wall shelving and gondolas, display tables, counters, showcases, product stands, kiosks and other custom fixtures for retail stores, showrooms and exhibitions.",
    },
    {
      q: "Can you customize fixtures for my brand?",
      a: "Yes. Every fixture is designed around your products, brand colours, logo and space, so it presents your range the way you want it seen.",
    },
    {
      q: "What materials and finishes are available?",
      a: "We work with wood, laminates, veneers, MS, SS, acrylic and glass, with a wide range of finishes. We help you choose what suits your products, usage and budget.",
    },
    {
      q: "Do you provide design and 3D visualization?",
      a: "Yes. We share concept designs and 3D visuals so you can review the fixtures and finishes before production starts.",
    },
    {
      q: "How long does production and installation take?",
      a: "It depends on the number of fixtures, design complexity and site readiness. After approvals we share a schedule for production and installation.",
    },
    {
      q: "Do you execute projects outside Delhi NCR?",
      a: "Yes. We deliver and install display fixtures across India, managing transport and on-site installation.",
    },
  ],
  ctaEyebrow: "Let's Discuss",
  ctaTitle: ["Your Display Fixture", "Project"],
};
