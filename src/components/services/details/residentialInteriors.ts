import {
  Armchair,
  Building,
  Building2,
  Clock,
  Gem,
  Headset,
  Home,
  Hotel,
  LayoutGrid,
  Laptop,
  Lightbulb,
  Settings,
  Sparkles,
  Warehouse,
} from "lucide-react";

import heroImg from "@/assets/image/os9.webp";
import overviewImg from "@/assets/image/res.webp";
import apartmentImg from "@/assets/image/res1.webp";
import villaImg from "@/assets/image/res2.webp";
import penthouseImg from "@/assets/image/res3.webp";
import builderFloorImg from "@/assets/image/res4.webp";

import type { ServiceDetail } from "../detail/types";

export const residentialInteriors: ServiceDetail = {
  slug: "residential-interiors",
  name: "Residential Interiors",
  hero: {
    eyebrow: "Our Services",
    title: ["Residential", "Interiors"],
    tagline: "Homes Designed Around You",
    text: "We design and execute beautiful, functional and personalized home interiors that reflect your lifestyle. From space planning to custom furniture, we create comfortable, elegant and timeless homes with end-to-end turnkey solutions.",
    image: heroImg,
    photoStyle: "cut",
    secondaryCta: true,
    features: [
      { icon: LayoutGrid, label: "Space Planning", text: "Functional and beautiful layouts" },
      { icon: Armchair, label: "Modular Furniture", text: "Custom and space-saving designs" },
      { icon: Sparkles, label: "Premium Materials", text: "Wide range of finishes and textures" },
      { icon: Lightbulb, label: "Lighting Design", text: "Aesthetic and practical solutions" },
      { icon: Settings, label: "Turnkey Execution", text: "Design, build and installation" },
      { icon: Headset, label: "After-Sales Support", text: "Assistance beyond project handover" },
    ],
  },
  why: {
    eyebrow: "Overview",
    layout: "overview",
    title: ["Creating Homes", "That Inspire"],
    text: "Every home has a story. We create residential interiors that combine aesthetics, comfort and smart design. Our team works closely with you to understand your needs and deliver tailored solutions for modern living. With in-house manufacturing, thoughtful storage planning and careful attention to lighting, materials and finishes, every home we deliver is designed to feel warm, work effortlessly for your family and stay beautiful for years to come.",
    image: overviewImg,
    points: [
      { icon: Gem, title: "Personalized Design", text: "Interiors that match your lifestyle" },
      { icon: LayoutGrid, title: "Better Space Utilization", text: "Smart storage and modular solutions" },
      { icon: Sparkles, title: "Quality Craftsmanship", text: "Durable and premium finishes" },
      { icon: Clock, title: "On-Time Delivery", text: "Professional execution with clear timelines" },
    ],
  },
  process: {
    tone: "warm",
    title: "From Concept to Home",
    text: "A streamlined process to turn your dream home into reality.",
    steps: [
      { title: "Consultation", text: "Understand your needs, style and budget" },
      { title: "Design & Planning", text: "Layouts, 3D visuals and material selection" },
      { title: "Execution", text: "In-house manufacturing and on-site installation" },
      { title: "Handover", text: "Final quality check and timely delivery" },
    ],
  },
  projects: {
    title: "Our Residential Interior Projects",
    linkStyle: "text",
    items: [
      { title: "Luxury Apartment", place: "Gurugram, Haryana", image: apartmentImg },
      { title: "Independent Villa", place: "Noida, Uttar Pradesh", image: villaImg },
      { title: "Penthouse Residence", place: "Delhi NCR", image: penthouseImg },
      { title: "Builder Floor", place: "South Delhi", image: builderFloorImg },
    ],
  },
  idealFor: {
    title: ["Residential Spaces for Every Lifestyle"],
    iconTone: "navy",
    tiles: [
      { icon: Building2, label: "Apartments\n& Flats" },
      { icon: Home, label: "Independent\nVillas" },
      { icon: Building, label: "Builder Floors" },
      { icon: Hotel, label: "Penthouse\nResidences" },
      { icon: Warehouse, label: "Farmhouses" },
      { icon: Laptop, label: "Home Offices\n& Studios" },
    ],
  },
  faqHeading: {
    title: "Frequently Asked Questions",
    text: "Quick answers to common questions about our residential interior services.",
  },
  faqStyle: { numbered: true, tone: "blue" },
  faqs: [
    {
      q: "How much does a residential interior project cost?",
      a: "The cost depends on the size of your home, the rooms included, materials, finishes and furniture. Share your requirements and we will prepare a detailed quotation.",
    },
    {
      q: "How long does it take to complete a project?",
      a: "It depends on the scope of work and the size of your home. After finalising the design we share a clear schedule for production, installation and handover.",
    },
    {
      q: "Can you work with my existing furniture or space?",
      a: "Yes. We can plan around furniture you want to keep, refresh existing rooms and redesign only the areas that need it.",
    },
    {
      q: "Do you provide 3D design and material samples?",
      a: "Yes. We share 3D visuals of your rooms and material samples so you can see and feel the finishes before production starts.",
    },
    {
      q: "Do you handle turnkey execution?",
      a: "Yes. We manage everything from design and in-house manufacturing to on-site installation and final handover, so you deal with a single team.",
    },
    {
      q: "Do you execute projects outside Delhi NCR?",
      a: "Yes. We execute residential projects across India, managing production, delivery and installation wherever your home is located.",
    },
  ],
  ctaEyebrow: "Let's Discuss",
  ctaTitle: ["Your Dream Home", "Project"],
  ctaSubtitle: "Share your requirements with our team for a personalized solution.",
};
