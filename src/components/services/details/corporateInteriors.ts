import { Armchair, Award, BadgeCheck, CalendarClock, Factory, FileCheck, Gem, Layers, LayoutGrid, MapPin, RefreshCw, Users, UsersRound } from "lucide-react";

import heroImg from "../../../../public/service/optimized/corporate/ni1.webp";
import whyImg from "../../../../public/service/optimized/corporate/ni2.webp";
import benefitsImg from "../../../../public/service/optimized/corporate/i5.webp";
import offer1Img from "../../../../public/service/optimized/corporate/n1.webp";
import offer2Img from "../../../../public/service/optimized/corporate/n2.webp";
import offer3Img from "../../../../public/service/optimized/corporate/n3.webp";
import offer4Img from "../../../../public/service/optimized/corporate/n4.webp";
import offer5Img from "../../../../public/service/optimized/corporate/n5.webp";
import offer6Img from "../../../../public/service/optimized/corporate/n6.webp";
import itOfficeImg from "@/assets/hero-corporate-1.jpg";
import headquartersImg from "@/assets/image/co1.webp";
import coworkingImg from "@/assets/image/co2.webp";
import consultingImg from "@/assets/image/co3.webp";
import loungeImg from "@/assets/image/ws1.webp";

import { LoungeSofa, MeetingTable, OfficeDesk, TeamGroup } from "../detail/showcaseIcons";
import type { ServiceDetail } from "../detail/types";

export const corporateInteriors: ServiceDetail = {
  slug: "corporate-interiors",
  name: "Corporate Interiors",
  hero: {
    eyebrow: "Our Services",
    title: ["Corporate", "Interiors"],
    tagline: "Productive Spaces for Modern Businesses",
    text: "We design and execute high-performance corporate interiors that reflect your brand culture and enhance productivity. From office fit-outs to meeting rooms, workstations and collaborative spaces, we create functional and inspiring workplaces.",
    image: heroImg,
    secondaryCtaLink: { label: "View Projects", href: "/portfolio/interior/corporate-interior" },
    features: [
      { icon: OfficeDesk, label: "Office Fit-Outs", text: "End-to-end workspace solutions" },
      { icon: TeamGroup, label: "Workstations", text: "Ergonomic and modular designs" },
      { icon: MeetingTable, label: "Meeting Rooms", text: "Functional and flexible spaces" },
      { icon: LoungeSofa, label: "Reception & Lounges", text: "Strong first impressions" },
    ],
    banner: {
      imageAlt: "Corporate office reception with a marble desk and open workstations behind it",
      stats: [
        { icon: Award, value: "21+ Years", label: "of Industry Experience" },
        { icon: Users, value: "500+", label: "Happy Clients" },
        { icon: Layers, value: "End-to-End", label: "Design & Execution" },
        { icon: MapPin, value: "Pan-India", label: "Project Delivery" },
      ],
    },
  },
  why: {
    layout: "banner",
    title: ["Corporate Spaces", "That Perform"],
    text: "We combine design thinking, technical expertise and industry experience to create workspaces that are efficient, beautiful and future-ready.",
    image: whyImg,
    points: [
      { icon: Gem, title: "Brand Focused\nDesign", text: "Workspaces that reflect your brand identity" },
      { icon: LayoutGrid, title: "Optimized\nSpace Planning", text: "Better space utilization for higher productivity" },
      { icon: Armchair, title: "Functional &\nErgonomic Layouts", text: "Comfortable and efficient work environments" },
      { icon: BadgeCheck, title: "Quality &\nTimely Delivery", text: "Premium materials and on-time execution" },
    ],
    buttons: {
      primary: { label: "Discuss Corporate Interiors", href: "/contact" },
      secondary: { label: "View Projects", href: "/portfolio/interior/corporate-interior" },
    },
  },
  offer: {
    eyebrow: "What We Offer",
    title: ["Workspaces That Inspire", "Success"],
    text: "We design modern corporate office interiors that enhance workplace productivity and reinforce brand identity through turnkey design, manufacturing, and fit-out solutions across India.",
    items: [
      { title: "Office Fit-Outs", text: "End-to-end workspace solutions", image: offer1Img, alt: "Corporate office lounge with glass-walled rooms behind it", href: "/contact" },
      { title: "Workstations", text: "Ergonomic and modular designs", image: offer2Img, alt: "Open-plan office with rows of workstations and a glass meeting room", href: "/contact" },
      { title: "Meeting Rooms", text: "Functional and flexible spaces", image: offer3Img, alt: "Boardroom with a long table, leather chairs and a wall screen", href: "/contact" },
      { title: "Corporate Headquarters", text: "Workspaces that reflect your brand identity", image: offer4Img, alt: "Office lounge with armchairs, a sofa and lit display shelves", href: "/contact" },
      { title: "Collaborative Spaces", text: "Comfortable and efficient work environments", image: offer5Img, alt: "Office cafeteria with a bar counter, stools and round tables", href: "/contact" },
      { title: "Reception & Lounges", text: "Strong first impressions", image: offer6Img, alt: "Office reception with a marble desk and orange armchairs for visitors", href: "/contact" },
    ],
  },
  // The lines are this service's own: its FAQs and process below, and its line on the Services page
  benefits: {
    eyebrow: "Core Benefits",
    title: ["Why", "Choose Us"],
    text: "Workspaces designed for productivity, brand identity and growth.",
    image: benefitsImg,
    items: [
      { icon: Layers, title: "Turnkey Solutions", text: "Everything from space planning and design to in-house manufacturing, on-site execution and final handover." },
      { icon: UsersRound, title: "Single Team", text: "You work with a single team throughout the project." },
      { icon: Factory, title: "Manufacturing & Installation", text: "In-house manufacturing and on-site installation." },
      { icon: CalendarClock, title: "Detailed Schedule", text: "We share a detailed schedule covering design, production and execution." },
      { icon: FileCheck, title: "Approvals Support", text: "We coordinate with building management and prepare the drawings and documents needed for approvals." },
      { icon: RefreshCw, title: "Existing Office Upgrades", text: "We can refresh or extend your existing interiors, reuse what works and redesign the areas that need improvement." },
    ],
    cta: { label: "Discuss Your Workspace Project", href: "/contact" },
  },
  process: {
    title: "From Planning to Possession",
    text: "A streamlined process to ensure a seamless experience.",
    steps: [
      { title: "Consultation", text: "Understand your needs, brand and goals" },
      { title: "Design & Planning", text: "Space planning, 3D visuals and material selection" },
      { title: "Execution", text: "In-house manufacturing and on-site installation" },
      { title: "Handover", text: "Quality check and timely delivery" },
    ],
  },
  projects: {
    title: "Our Corporate Interior Projects",
    text: "Explore some of our recently completed workspaces.",
    items: [
      { title: "IT Company Office", place: "Gurugram, Haryana", image: itOfficeImg },
      { title: "Corporate Headquarters", place: "Delhi NCR", image: headquartersImg },
      { title: "Co-working Space", place: "Noida, Uttar Pradesh", image: coworkingImg },
      { title: "Consulting Firm Office", place: "Bengaluru, Karnataka", image: consultingImg },
    ],
  },
  idealFor: {
    title: ["Workspaces for Every", "Business Need"],
    text: "We design and build corporate interiors for:",
    image: loungeImg,
    items: [
      "IT & ITES Companies",
      "Consulting Firms",
      "Startups & Co-working Spaces",
      "Financial & Legal Offices",
      "Corporate Headquarters",
      "Educational & Institutional Offices",
      "And More...",
    ],
  },
  faqs: [
    {
      q: "Do you provide end-to-end turnkey solutions?",
      a: "Yes. We handle everything from space planning and design to in-house manufacturing, on-site execution and final handover, so you work with a single team throughout the project.",
    },
    {
      q: "Can you work with our existing office design?",
      a: "Yes. We can refresh or extend your existing interiors, reuse what works and redesign the areas that need improvement, while keeping the look consistent with your brand.",
    },
    {
      q: "How long does a typical project take?",
      a: "It depends on the size of the space, the scope of work and site conditions. After understanding your requirements we share a detailed schedule covering design, production and execution.",
    },
    {
      q: "Do you handle approvals and permissions?",
      a: "We coordinate with building management and prepare the drawings and documents needed for approvals. Specific requirements vary by building and city, and we guide you through each step.",
    },
  ],
  ctaTitle: ["Let's Discuss", "Your Workspace Project"],
};
