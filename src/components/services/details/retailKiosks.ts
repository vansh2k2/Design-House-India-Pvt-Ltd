import {
  Coffee,
  Gem,
  Hammer,
  HeartPulse,
  LayoutGrid,
  Palette,
  Settings,
  Shapes,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Clock,
  Boxes,
  Diamond,
} from "lucide-react";

import heroImg from "@/assets/image/os5.webp";
import overviewImg from "@/assets/image/rk.webp";
import wellnessImg from "@/assets/image/kr1.webp";
import fashionImg from "@/assets/image/kr2.webp";
import foodImg from "@/assets/image/kr3.webp";
import electronicsImg from "@/assets/image/kr4.webp";

import type { ServiceDetail } from "../detail/types";

export const retailKiosks: ServiceDetail = {
  slug: "retail-kiosks",
  name: "Retail Kiosks",
  hero: {
    eyebrow: "Our Services",
    title: ["Retail", "Kiosks"],
    tagline: "Compact Spaces, Big Brand Impact",
    text: "We design and build retail kiosks that create strong brand presence in high footfall locations such as malls, airports, metro stations and commercial complexes. Our turnkey solutions combine smart design, quality materials and efficient execution to help you engage customers and drive sales.",
    image: heroImg,
    photoStyle: "cut",
    photoWords: ["Natural", "Beauty", "Everyday"],
    secondaryCta: true,
    features: [
      { icon: Shapes, label: "Kiosk Concept Design", text: "Creative and functional designs" },
      { icon: LayoutGrid, label: "Space Optimization", text: "Smart layouts for small spaces" },
      { icon: Hammer, label: "Custom Fabrication", text: "High-quality materials and finishing" },
      { icon: Palette, label: "Branding & Graphics", text: "Eye-catching visuals and displays" },
      { icon: Settings, label: "Turnkey Execution", text: "Design, manufacture and on-site installation" },
    ],
  },
  why: {
    eyebrow: "Overview",
    layout: "overview",
    title: ["Smart Retail Kiosks", "That Attract & Engage"],
    text: "From concept to installation, we create retail kiosks that maximize limited space, reflect your brand identity and deliver a compelling customer experience. Our end-to-end solutions are tailored to your products, location and business goals, ensuring a distinctive and high-performing kiosk. With in-house fabrication, modular construction and careful attention to lighting, graphics and finishes, every kiosk we deliver is designed to stand out in busy locations and turn passing footfall into loyal customers.",
    image: overviewImg,
    points: [
      { icon: Gem, title: "Brand Focused Design", text: "Kiosks that reflect your brand identity" },
      { icon: LayoutGrid, title: "Efficient Layouts", text: "Better product display and customer flow" },
      { icon: Boxes, title: "Durable & Modular", text: "High-quality and reusable structures" },
      { icon: Clock, title: "On-Time Delivery", text: "Professional execution with on-site support" },
    ],
  },
  process: {
    tone: "warm",
    title: "From Concept to Installation",
    text: "A streamlined process to ensure a successful retail kiosk experience.",
    steps: [
      { title: "Consultation", text: "Understand your brand, products and location" },
      { title: "Design & Planning", text: "Creative concept, 3D visuals and material selection" },
      { title: "Fabrication & Production", text: "In-house manufacturing and quality checks" },
      { title: "Installation", text: "On-site setup and final handover" },
    ],
  },
  projects: {
    title: "Our Retail Kiosk Projects",
    linkStyle: "text",
    items: [
      { title: "Health & Wellness Kiosk", place: "DLF Mall, Noida", image: wellnessImg },
      { title: "Fashion & Accessories Kiosk", place: "Select Citywalk, Delhi", image: fashionImg },
      { title: "Food & Beverage Kiosk", place: "Ambience Mall, Gurugram", image: foodImg },
      { title: "Electronics Kiosk", place: "Elante Mall, Chandigarh", image: electronicsImg },
    ],
  },
  idealFor: {
    title: ["Retail Kiosks for Every Business Need"],
    iconTone: "navy",
    tiles: [
      { icon: ShoppingBag, label: "Fashion &\nAccessories" },
      { icon: Coffee, label: "Food & Beverage" },
      { icon: HeartPulse, label: "Health & Wellness\nProducts" },
      { icon: Smartphone, label: "Electronics\n& Gadgets" },
      { icon: Sparkles, label: "Cosmetics\n& Personal Care" },
      { icon: Diamond, label: "Jewellery\n& Luxury Brands" },
    ],
  },
  faqHeading: {
    title: "Frequently Asked Questions",
    text: "Quick answers to common questions about our retail kiosk services.",
  },
  faqStyle: { numbered: true, tone: "blue" },
  faqs: [
    {
      q: "What is included in a retail kiosk turnkey solution?",
      a: "Kiosk concept and 3D design, fabrication, display units, lighting, graphics and branding, transport, on-site installation and final handover.",
    },
    {
      q: "How much does a retail kiosk project cost?",
      a: "The cost depends on the kiosk size, design, materials, finishes and location. Share your requirements and we will prepare a detailed quotation.",
    },
    {
      q: "How long does it take to design and build a kiosk?",
      a: "It depends on the kiosk size, design complexity and mall approvals. Once the design is finalised we share a schedule for fabrication and installation.",
    },
    {
      q: "Can you help with mall approvals and permissions?",
      a: "We prepare the drawings and details malls usually ask for and coordinate with the mall team. Requirements differ by mall, and we guide you through each step.",
    },
    {
      q: "Can you design a kiosk for my existing space?",
      a: "Yes. We design kiosks to fit the exact footprint, height limits and guidelines of your location, or refresh an existing kiosk with new branding and fixtures.",
    },
    {
      q: "Do you execute kiosks outside Delhi NCR?",
      a: "Yes. We build and install retail kiosks across India, managing transport, installation and on-site support.",
    },
  ],
  ctaEyebrow: "Let's Discuss",
  ctaTitle: ["Your Retail Kiosk", "Project"],
};
