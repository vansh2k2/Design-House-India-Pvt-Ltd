import {
  BadgeCheck,
  Box,
  Car,
  Cpu,
  Gem,
  GraduationCap,
  Hammer,
  HeartPulse,
  Building2,
  LayoutGrid,
  Leaf,
  Palette,
  Shapes,
  ShoppingCart,
  Truck,
  Users,
} from "lucide-react";

import heroImg from "@/assets/image/os4.webp";
import overviewImg from "@/assets/image/es.webp";
import healthcareImg from "@/assets/image/b4.webp";
import wellnessImg from "@/assets/what-we-do/exhibition.jpg";
import organicImg from "@/assets/image/os4.webp";
import corporateImg from "@/assets/image/t4.webp";

import type { ServiceDetail } from "../detail/types";

export const exhibitionStalls: ServiceDetail = {
  slug: "exhibition-stalls",
  name: "Exhibition Stall Design & Build",
  hero: {
    eyebrow: "Our Services",
    title: ["Exhibition Stall", "Design & Build"],
    tagline: "Creating Impactful Brand Experiences at Every Exhibition",
    text: "We design and build innovative exhibition stalls that attract visitors, showcase your brand and create meaningful business opportunities. From concept to execution, our turnkey solutions help you stand out at industry events across India.",
    image: heroImg,
    photoStyle: "cut",
    photoWords: ["Spaces", "Brands", "Experiences"],
    secondaryCta: true,
    features: [
      { icon: Shapes, label: "Stall Concept Design", text: "Creative and functional designs" },
      { icon: Box, label: "3D Visualization", text: "Realistic 3D concepts before execution" },
      { icon: Hammer, label: "Fabrication & Build", text: "High-quality materials and finishing" },
      { icon: Palette, label: "Graphics & Branding", text: "Eye-catching visuals and displays" },
      { icon: Truck, label: "On-Site Execution", text: "Timely installation and support" },
    ],
  },
  why: {
    eyebrow: "Overview",
    layout: "overview",
    title: ["Exhibition Stalls", "That Showcase Your Brand"],
    text: "We create custom exhibition stalls that combine design, functionality and brand storytelling. Our end-to-end solutions are tailored to your products, target audience and event objectives, helping you make a strong impression and generate valuable business leads. With in-house fabrication, smart visitor flow and careful attention to lighting, graphics and finishes, every stall we deliver is designed to draw people in and turn conversations into lasting business relationships.",
    image: overviewImg,
    points: [
      { icon: Gem, title: "Brand Focused Design", text: "Stalls that reflect your brand identity" },
      { icon: Users, title: "Smart Space Planning", text: "Optimized layouts for better engagement" },
      { icon: LayoutGrid, title: "Custom Fabrication", text: "Modular and reusable solutions" },
      { icon: BadgeCheck, title: "Quality & Timely Delivery", text: "Professional execution with on-site support" },
    ],
  },
  process: {
    tone: "warm",
    title: "From Concept to Execution",
    text: "A streamlined process to ensure a successful exhibition experience.",
    steps: [
      { title: "Consultation", text: "Understand your goals, audience and event requirements" },
      { title: "Design & Planning", text: "Creative concept, 3D visuals and material selection" },
      { title: "Fabrication & Execution", text: "In-house manufacturing and on-site installation" },
      { title: "Event Support", text: "On-site supervision and dismantling" },
    ],
  },
  projects: {
    title: "Our Exhibition Stall Projects",
    linkStyle: "text",
    items: [
      { title: "Healthcare Exhibition Stall", place: "Pragati Maidan, New Delhi", image: healthcareImg },
      { title: "Wellness Brand Stall", place: "India Expo Mart, Greater Noida", image: wellnessImg },
      { title: "Organic Products Stall", place: "Bharat Organic Expo", image: organicImg },
      { title: "Corporate Brand Stall", place: "Mumbai Exhibition Centre", image: corporateImg },
    ],
  },
  idealFor: {
    title: ["Exhibition Stalls for Every Industry"],
    tiles: [
      { icon: HeartPulse, label: "Healthcare\n& Wellness" },
      { icon: Leaf, label: "Organic & Food\nProducts" },
      { icon: Building2, label: "Real Estate\n& Infrastructure" },
      { icon: ShoppingCart, label: "FMCG\n& Consumer Brands" },
      { icon: Car, label: "Automotive\n& Mobility" },
      { icon: GraduationCap, label: "Education\n& Institutions" },
      { icon: Cpu, label: "Technology\n& Electronics" },
    ],
  },
  faqHeading: {
    title: "Frequently Asked Questions",
    text: "Quick answers to common questions about our exhibition stall services.",
  },
  faqStyle: { numbered: true, tone: "blue" },
  faqs: [
    {
      q: "What is included in an exhibition stall turnkey solution?",
      a: "Stall concept and 3D design, fabrication, graphics and branding, lighting, furniture, transport, on-site installation, event support and dismantling after the show.",
    },
    {
      q: "How much does an exhibition stall project cost?",
      a: "The cost depends on the stall size, design, materials, graphics and the event location. Share your requirements and we will prepare a detailed quotation for your stall.",
    },
    {
      q: "How long does it take to design and build a stall?",
      a: "It depends on the stall size, design complexity and the event date. Once the design is finalised we share a schedule for fabrication, transport and installation so the stall is ready on time.",
    },
    {
      q: "Do you provide 3D design and visualizations?",
      a: "Yes. We create 3D visuals of your stall so you can review the layout, branding and finishes before fabrication begins.",
    },
    {
      q: "Can you execute stalls outside Delhi NCR?",
      a: "Yes. We build and install exhibition stalls at venues across India, managing transport, installation and on-site support.",
    },
    {
      q: "Do you handle on-site installation and dismantling?",
      a: "Yes. Our team installs the stall before the event, supports you during the show and dismantles it once the event is over.",
    },
  ],
  ctaEyebrow: "Let's Discuss",
  ctaTitle: ["Your Exhibition", "Project"],
};
