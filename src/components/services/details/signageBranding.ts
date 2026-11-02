import {
  BadgeCheck,
  Building2,
  Clock,
  GraduationCap,
  Hospital,
  Hotel,
  LayoutGrid,
  Lightbulb,
  PencilRuler,
  Presentation,
  Settings,
  Shapes,
  Store,
  Target,
  UtensilsCrossed,
  Wrench,
} from "lucide-react";

import heroImg from "../../../../public/service/optimized/signage/s1.webp";
import exteriorSignImg from "../../../../public/service/optimized/signage/s2.webp";
import wayfindingSignImg from "../../../../public/service/optimized/signage/s3.webp";
import indoorBrandingImg from "../../../../public/service/optimized/signage/s4.webp";
import storeBrandingImg from "../../../../public/service/optimized/signage/s5.webp";
import overviewImg from "@/assets/image/sg.webp";
import retailSignImg from "@/assets/image/gs1.webp";
import officeBrandingImg from "@/assets/image/gs2.webp";
import restaurantSignImg from "@/assets/image/gs3.webp";
import wayfindingImg from "@/assets/image/gs4.webp";

import { HangingSign } from "../detail/showcaseIcons";
import type { ServiceDetail } from "../detail/types";

export const signageBranding: ServiceDetail = {
  slug: "signage-branding",
  name: "Signage & Branding",
  hero: {
    eyebrow: "Our Services",
    title: ["Signage &", "Branding"],
    tagline: "Make a Stronger First Impression",
    text: "We design, manufacture and install custom signage and branding solutions that enhance visibility, strengthen brand identity and create lasting impressions. From exterior signage to indoor branding, we deliver impactful solutions for retail, corporate, hospitality and commercial spaces.",
    image: heroImg,
    secondaryCtaLink: { label: "View Projects", href: "/portfolio/signage/signage-portfolio" },
    features: [
      { icon: PencilRuler, label: "Concept & Design", text: "Creative signage as per brand identity" },
      { icon: Settings, label: "Fabrication", text: "High-quality materials & finish" },
      { icon: Wrench, label: "Installation", text: "Professional\non-site execution" },
      { icon: LayoutGrid, label: "Brand Consistency", text: "Cohesive look across all touchpoints" },
    ],
    showcase: {
      layout: "photo-right-edge-captions",
      imageAlt: "Store front with a lit Design House sign, a glass entrance and plants along the wall",
      gallery: [
        { image: exteriorSignImg, alt: "Building front with large lit letters above a glass store front", caption: "Exterior Signage" },
        { image: indoorBrandingImg, alt: "Reception wall in marble with a lit logo above the desk", caption: "Indoor Branding" },
        { image: wayfindingSignImg, alt: "Hanging sign pointing to reception, meeting room, cafeteria and exit", caption: "Wayfinding Signage" },
        { image: storeBrandingImg, alt: "Restaurant front with a large lit sign on a dark fascia", caption: "Retail Branding" },
      ],
      stat: { icon: HangingSign, value: "100+", label: "Signage & Branding\nProjects Delivered" },
    },
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
