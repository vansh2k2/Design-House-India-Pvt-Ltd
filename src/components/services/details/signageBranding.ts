import {
  BadgeCheck,
  Building2,
  Clock,
  Gem,
  GraduationCap,
  Hospital,
  Hotel,
  Layers,
  Lightbulb,
  Palette,
  Presentation,
  Settings,
  Shapes,
  SignpostBig,
  Store,
  Target,
  UtensilsCrossed,
} from "lucide-react";

import heroImg from "@/assets/image/vision.webp";
import overviewImg from "@/assets/image/sg.webp";
import retailSignImg from "@/assets/image/gs1.webp";
import officeBrandingImg from "@/assets/image/gs2.webp";
import restaurantSignImg from "@/assets/image/gs3.webp";
import wayfindingImg from "@/assets/image/gs4.webp";

import type { ServiceDetail } from "../detail/types";

export const signageBranding: ServiceDetail = {
  slug: "signage-branding",
  name: "Signage & Branding",
  hero: {
    eyebrow: "Our Services",
    title: ["Signage &", "Branding"],
    tagline: "Transforming Spaces into Powerful Brand Experiences",
    text: "We design and execute signage and branding solutions that strengthen your brand identity, create visibility and deliver a lasting impression. From indoor and outdoor signage to wayfinding and environmental graphics, our end-to-end solutions help businesses communicate effectively and stand out.",
    image: heroImg,
    photoStyle: "cut",
    photoWords: ["Spaces", "Brands", "Experiences"],
    secondaryCta: true,
    features: [
      { icon: Gem, label: "Brand Identity\nSignage", text: "Building a strong brand presence" },
      { icon: Layers, label: "Indoor Signage", text: "Reception, wall and directional signage" },
      { icon: Building2, label: "Outdoor Signage", text: "Facades, pylon and hoarding solutions" },
      { icon: SignpostBig, label: "Wayfinding Systems", text: "Clear navigation for better experience" },
      { icon: Palette, label: "Environmental Graphics", text: "Wall graphics and brand storytelling" },
      { icon: Settings, label: "Turnkey Execution", text: "Design, manufacture and installation" },
    ],
  },
  why: {
    eyebrow: "Overview",
    layout: "overview",
    title: ["Signage & Branding Solutions", "That Make an Impact"],
    text: "From concept to execution, we create custom signage and branding solutions that reflect your brand identity, enhance visibility and improve customer experience. Our integrated approach combines design, materials and technology to deliver high-quality, durable and visually engaging brand environments. With in-house fabrication, careful material selection and precise installation, every sign we deliver is designed to guide people, strengthen recognition and leave a lasting impression on everyone who sees it.",
    image: overviewImg,
    points: [
      { icon: Target, title: "Strategic Design", text: "Signage that aligns with your brand" },
      { icon: Lightbulb, title: "Creative Concepts", text: "Unique and impactful designs" },
      { icon: BadgeCheck, title: "High-Quality Materials", text: "Durable and premium finishes" },
      { icon: Shapes, title: "Customized Solutions", text: "Tailored to your space and industry" },
      { icon: Clock, title: "On-Time Execution", text: "Professional installation with quality standards" },
    ],
  },
  process: {
    tone: "warm",
    title: "From Concept to Completion",
    text: "A streamlined process to deliver effective signage and branding solutions.",
    steps: [
      { title: "Consultation", text: "Understand your brand, space and objectives" },
      { title: "Design & Planning", text: "Concept design, material selection and technical detailing" },
      { title: "Fabrication", text: "In-house production with quality checks" },
      { title: "Installation", text: "On-site execution and final handover" },
    ],
  },
  projects: {
    title: "Our Signage & Branding Projects",
    linkStyle: "text",
    items: [
      { title: "Retail Store Signage", place: "DLF Mall, Noida", image: retailSignImg },
      { title: "Office Branding", place: "Gurugram, Haryana", image: officeBrandingImg },
      { title: "Restaurant Signage", place: "Delhi NCR", image: restaurantSignImg },
      { title: "Wayfinding Systems", place: "Commercial Office, Noida", image: wayfindingImg },
    ],
  },
  idealFor: {
    title: ["Signage & Branding for Every Business Need"],
    tiles: [
      { icon: Store, label: "Retail Stores\n& Showrooms" },
      { icon: Building2, label: "Corporate Offices\n& Business Parks" },
      { icon: UtensilsCrossed, label: "Restaurants\n& Cafés" },
      { icon: Hotel, label: "Hotels\n& Resorts" },
      { icon: Hospital, label: "Hospitals\n& Clinics" },
      { icon: GraduationCap, label: "Educational\nInstitutions" },
      { icon: Presentation, label: "Exhibition Stalls\n& Events" },
    ],
  },
  faqHeading: {
    title: "Frequently Asked Questions",
    text: "Quick answers to common questions about our signage and branding services.",
  },
  faqStyle: { numbered: true, tone: "blue" },
  faqs: [
    {
      q: "What types of signage do you provide?",
      a: "Brand identity and reception signage, indoor and directional signs, outdoor facade, pylon and hoarding signage, wayfinding systems and environmental graphics.",
    },
    {
      q: "How much does a signage project cost?",
      a: "The cost depends on the type and size of signage, materials, lighting and the number of locations. Share your requirements and we will prepare a detailed quotation.",
    },
    {
      q: "How long does a typical signage project take?",
      a: "It depends on the scope, materials and number of signs. Once the design is approved we share a schedule for fabrication and installation.",
    },
    {
      q: "Do you provide design, fabrication and installation?",
      a: "Yes. We handle concept design, in-house fabrication and on-site installation, so the whole project is managed by one team.",
    },
    {
      q: "Can you work with our existing brand guidelines?",
      a: "Yes. We follow your logos, colours, fonts and brand guidelines so every sign stays consistent with your identity.",
    },
    {
      q: "Do you execute projects outside Delhi NCR?",
      a: "Yes. We fabricate and install signage across India, managing transport, installation and on-site support.",
    },
  ],
  ctaEyebrow: "Let's Discuss",
  ctaTitle: ["Your Signage & Branding", "Project"],
};
