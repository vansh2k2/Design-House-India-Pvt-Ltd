import { Armchair, BadgeCheck, Gem, LayoutGrid } from "lucide-react";

import heroImg from "../../../../public/service/optimized/corporate/i1.webp";
import workstationsImg from "../../../../public/service/optimized/corporate/i2.webp";
import boardroomImg from "../../../../public/service/optimized/corporate/i3.webp";
import receptionImg from "../../../../public/service/optimized/corporate/i4.webp";
import loungePhotoImg from "../../../../public/service/optimized/corporate/i5.webp";
import meetingImg from "@/assets/image/so1.webp";
import itOfficeImg from "@/assets/hero-corporate-1.jpg";
import headquartersImg from "@/assets/image/co1.webp";
import coworkingImg from "@/assets/image/co2.webp";
import consultingImg from "@/assets/image/co3.webp";
import loungeImg from "@/assets/image/ws1.webp";

import { LoungeSofa, MeetingTable, OfficeDesk, OfficeTowers, TeamGroup } from "../detail/showcaseIcons";
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
    photoWords: ["People", "Ideas", "Spaces", "Growth"],
    features: [
      { icon: OfficeDesk, label: "Office Fit-Outs", text: "End-to-end workspace solutions" },
      { icon: TeamGroup, label: "Workstations", text: "Ergonomic and modular designs" },
      { icon: MeetingTable, label: "Meeting Rooms", text: "Functional and flexible spaces" },
      { icon: LoungeSofa, label: "Reception & Lounges", text: "Strong first impressions" },
    ],
    showcase: {
      number: "01",
      imageAlt: "Corporate office reception with a marble desk and open workstations behind it",
      gallery: [
        { image: boardroomImg, alt: "Boardroom with a long wooden table and leather chairs" },
        { image: workstationsImg, alt: "Open-plan office with rows of workstations and a city view" },
        { image: loungePhotoImg, alt: "Office lounge with navy sofas and lit wooden shelves" },
        { image: receptionImg, alt: "Reception desk in marble with a glass-walled meeting room beside it" },
      ],
      stat: { icon: OfficeTowers, value: "100+", label: "Corporate Projects Delivered" },
    },
  },
  why: {
    title: ["Corporate Spaces", "That Perform"],
    text: "We combine design thinking, technical expertise and industry experience to create workspaces that are efficient, beautiful and future-ready.",
    image: meetingImg,
    points: [
      { icon: Gem, title: "Brand Focused\nDesign", text: "Workspaces that reflect your brand identity" },
      { icon: LayoutGrid, title: "Optimized\nSpace Planning", text: "Better space utilization for higher productivity" },
      { icon: Armchair, title: "Functional &\nErgonomic Layouts", text: "Comfortable and efficient work environments" },
      { icon: BadgeCheck, title: "Quality &\nTimely Delivery", text: "Premium materials and on-time execution" },
    ],
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
