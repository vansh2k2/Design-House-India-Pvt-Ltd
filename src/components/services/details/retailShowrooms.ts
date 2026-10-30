import {
  BadgeCheck,
  Boxes,
  Car,
  Diamond,
  Gem,
  Lamp,
  LayoutDashboard,
  LayoutGrid,
  Lightbulb,
  Monitor,
  Settings,
  Shirt,
  ShoppingBag,
} from "lucide-react";

import heroImg from "@/assets/image/b1.webp";
import overviewImg from "@/assets/image/rs1.webp";
import fashionImg from "@/assets/image/sr1.webp";
import electronicsImg from "@/assets/image/sr2.webp";
import lifestyleImg from "@/assets/image/sr3.webp";
import furnishingImg from "@/assets/image/sr4.webp";

import type { ServiceDetail } from "../detail/types";

export const retailShowrooms: ServiceDetail = {
  slug: "retail-showrooms",
  name: "Retail Showrooms",
  hero: {
    eyebrow: "Our Services",
    title: ["Retail", "Showrooms"],
    tagline: "Engaging Spaces for Memorable Customer Experiences",
    text: "We design and build retail showrooms that reflect your brand identity, enhance product display and create a seamless customer journey. From concept to execution, our turnkey solutions help you attract, engage and convert more customers.",
    image: heroImg,
    photoStyle: "cut",
    photoWords: ["Brands", "People", "Spaces"],
    secondaryCta: true,
    features: [
      { icon: LayoutDashboard, label: "Store Design\n& Planning", text: "Layout and customer flow optimization" },
      { icon: Boxes, label: "Display Fixtures", text: "Custom fixtures and visual merchandising" },
      { icon: Lightbulb, label: "Lighting Solutions", text: "Product-focused lighting design" },
      { icon: Gem, label: "Brand Experience", text: "Interiors that reflect your brand identity" },
      { icon: Settings, label: "Turnkey Execution", text: "Design, manufacture and on-site installation" },
    ],
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
