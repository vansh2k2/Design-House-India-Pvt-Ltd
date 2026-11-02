import {
  BadgeCheck,
  Boxes,
  Car,
  Diamond,
  Gem,
  Lamp,
  LayoutGrid,
  Monitor,
  Shirt,
  ShoppingBag,
} from "lucide-react";

import heroImg from "../../../../public/service/optimized/retail/r1.webp";
import fashionStoreImg from "../../../../public/service/optimized/retail/r2.webp";
import electronicsStoreImg from "../../../../public/service/optimized/retail/r3.webp";
import footwearStoreImg from "../../../../public/service/optimized/retail/r4.webp";
import premiumStoreImg from "../../../../public/service/optimized/retail/r5.webp";
import overviewImg from "@/assets/image/rs1.webp";
import fashionImg from "@/assets/image/sr1.webp";
import electronicsImg from "@/assets/image/sr2.webp";
import lifestyleImg from "@/assets/image/sr3.webp";
import furnishingImg from "@/assets/image/sr4.webp";

import { DisplayRack, KioskCounter, LightBulbGlow, StoreFront } from "../detail/showcaseIcons";
import type { ServiceDetail } from "../detail/types";

export const retailShowrooms: ServiceDetail = {
  slug: "retail-showrooms",
  name: "Retail Showrooms",
  hero: {
    eyebrow: "Our Services",
    title: ["Retail Showroom", "Interiors"],
    tagline: "Engaging Spaces That Drive Business",
    text: "We create innovative and immersive retail environments that showcase your products, enhance customer experience and strengthen brand identity. From showrooms and stores to kiosks and experience centres, our designs are tailored to attract, engage and convert.",
    image: heroImg,
    secondaryCtaLink: { label: "View Projects", href: "/portfolio/interior/retail-interior" },
    features: [
      { icon: StoreFront, label: "Showrooms & Stores", text: "Branded and experiential spaces" },
      { icon: KioskCounter, label: "Kiosks & Counters", text: "Compact and impactful designs" },
      { icon: DisplayRack, label: "Display Solutions", text: "Product-focused fixtures and styling" },
      { icon: LightBulbGlow, label: "Lighting & Visual Merchandising", text: "Engaging retail atmospheres" },
    ],
    showcase: {
      layout: "photo-right-cut",
      imageAlt: "Retail showroom with a central display counter and lit shelves of bags and clothing",
      gallery: [
        { image: fashionStoreImg, alt: "Fashion store with clothing racks and a central display table" },
        { image: electronicsStoreImg, alt: "Electronics showroom with wall screens and display counters" },
        { image: footwearStoreImg, alt: "Footwear and bags store with a lounge seating area" },
        { image: premiumStoreImg, alt: "Premium store with lit shoe walls and a seating area" },
      ],
      stat: { icon: StoreFront, value: "200+", label: "Retail Projects Delivered" },
    },
  },
  why: {
    eyebrow: "Overview",
    layout: "overview",
    title: ["Creating Retail Spaces", "That Drive Sales"],
    text: "From space planning to final execution, we create retail environments that combine functionality, aesthetics and brand storytelling. Our turnkey solutions are tailored to your products, target audience and business goals, ensuring a distinctive and high-performing showroom. With in-house manufacturing, smart display planning and careful attention to lighting and materials, every store we deliver is designed to attract shoppers, showcase products at their best and turn visits into lasting customer relationships.",
    image: overviewImg,
    points: [
      { icon: Gem, title: "Brand Centric Design", text: "Spaces that reflect your brand values" },
      { icon: LayoutGrid, title: "Optimized Space Planning", text: "Better product display and customer flow" },
      { icon: Boxes, title: "Custom Display Solutions", text: "Fixtures tailored to your products" },
      { icon: BadgeCheck, title: "Quality & Timely Delivery", text: "Premium materials and on-time execution" },
    ],
  },
  process: {
    tone: "warm",
    title: "From Concept to Opening",
    text: "A structured process to deliver a seamless retail showroom experience.",
    steps: [
      { title: "Consultation", text: "Understand your brand, products and store requirements" },
      { title: "Design & Planning", text: "Layout, 3D visuals and material selection" },
      { title: "Manufacturing & Execution", text: "In-house manufacturing and on-site installation" },
      { title: "Handover", text: "Final quality check and timely delivery" },
    ],
  },
  projects: {
    title: "Our Retail Showroom Projects",
    linkStyle: "text",
    items: [
      { title: "Fashion Brand Showroom", place: "Delhi NCR", image: fashionImg },
      { title: "Electronics Showroom", place: "Gurugram, Haryana", image: electronicsImg },
      { title: "Lifestyle Store", place: "Noida, Uttar Pradesh", image: lifestyleImg },
      { title: "Home Furnishing Showroom", place: "Bengaluru, Karnataka", image: furnishingImg },
    ],
  },
  idealFor: {
    title: ["Retail Spaces for Every Business Need"],
    tiles: [
      { icon: Shirt, label: "Fashion &\nApparel Brands" },
      { icon: Monitor, label: "Electronics\nShowrooms" },
      { icon: Lamp, label: "Lifestyle\n& Home Decor" },
      { icon: Diamond, label: "Jewellery\nShowrooms" },
      { icon: Car, label: "Automotive\nShowrooms" },
      { icon: ShoppingBag, label: "Premium & Luxury\nRetail Brands" },
    ],
  },
  faqHeading: {
    title: "Frequently Asked Questions",
    text: "Quick answers to common questions about our retail showroom services.",
  },
  faqStyle: { numbered: true, tone: "blue" },
  faqs: [
    {
      q: "What is included in a retail showroom turnkey solution?",
      a: "Store layout and space planning, interior design and 3D visuals, custom fixtures and display units, lighting, branding elements, in-house manufacturing, on-site installation and final handover.",
    },
    {
      q: "How much does a retail showroom project cost?",
      a: "The cost depends on the store size, design, materials, fixtures and scope of work. Share your requirements and we will prepare a detailed quotation for your showroom.",
    },
    {
      q: "How long does a typical project take?",
      a: "Timelines depend on the store size, design complexity and site readiness. After finalising the design we share a schedule covering production, installation and handover.",
    },
    {
      q: "Do you provide display fixtures and furniture?",
      a: "Yes. We design and manufacture custom display fixtures, shelving, counters and furniture in-house, tailored to your products and brand.",
    },
    {
      q: "Can you work with our existing space?",
      a: "Yes. We can renovate or reconfigure your existing showroom, reuse what works and upgrade the layout, fixtures and finishes to match your brand.",
    },
    {
      q: "Do you execute projects outside Delhi NCR?",
      a: "Yes. We execute and support retail projects across India, managing production, logistics and on-site installation wherever your store is located.",
    },
  ],
  ctaEyebrow: "Let's Discuss",
  ctaTitle: ["Your Workspace", "Project"],
};
