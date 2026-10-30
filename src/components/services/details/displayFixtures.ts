import {
  Boxes,
  Clock,
  Diamond,
  Gem,
  Hammer,
  LayoutGrid,
  Palette,
  Pill,
  Shapes,
  ShieldCheck,
  Shirt,
  Smartphone,
  Sofa,
  Sparkles,
  Truck,
  UtensilsCrossed,
} from "lucide-react";

import heroImg from "@/assets/image/os6.webp";
import overviewImg from "@/assets/image/dr.webp";
import apparelImg from "@/assets/image/ds1.png";
import cosmeticsImg from "@/assets/image/ds2.webp";
import electronicsImg from "@/assets/image/ds3.webp";
import luxuryImg from "@/assets/image/ds4.webp";

import type { ServiceDetail } from "../detail/types";

export const displayFixtures: ServiceDetail = {
  slug: "display-fixtures",
  name: "Display Fixtures",
  hero: {
    eyebrow: "Our Services",
    title: ["Display", "Fixtures"],
    tagline: "Custom Displays for Stronger Brands",
    text: "We design and manufacture high-quality display fixtures that showcase your products, enhance your brand identity and create engaging retail experiences. From concept to installation, our end-to-end solutions are tailored to your space, product range and business goals.",
    image: heroImg,
    photoStyle: "cut",
    secondaryCta: true,
    features: [
      { icon: Shapes, label: "Display Concept Design", text: "Creative and functional display solutions" },
      { icon: Hammer, label: "Custom Manufacturing", text: "Tailored to product and space requirements" },
      { icon: Sparkles, label: "Material & Finishes", text: "Wide range of premium materials" },
      { icon: Palette, label: "Branding Integration", text: "Consistent and impactful brand presentation" },
      { icon: Truck, label: "Installation Support", text: "Professional execution and on-site installation" },
    ],
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
