import { Armchair, BadgeCheck, Clock, Gem, LayoutGrid, LayoutPanelTop, PencilRuler, Settings } from "lucide-react";

import heroImg from "@/assets/image/b2.webp";
import meetingImg from "@/assets/image/so1.webp";
import itOfficeImg from "@/assets/hero-corporate-1.jpg";
import headquartersImg from "@/assets/image/co1.webp";
import coworkingImg from "@/assets/image/co2.webp";
import consultingImg from "@/assets/image/co3.webp";
import loungeImg from "@/assets/image/ws1.webp";

import type { ServiceDetail } from "../detail/types";

export const corporateInteriors: ServiceDetail = {
  slug: "corporate-interiors",
  name: "Corporate Interiors",
  hero: {
    title: ["Corporate", "Interiors"],
    tagline: "Workspaces Designed for Productivity, Brand Identity and Growth.",
    text: "We create modern, functional and inspiring corporate spaces that reflect your brand culture and enhance team performance. From space planning to final execution, we deliver complete turnkey solutions tailored to your business needs.",
    image: heroImg,
    features: [
      { icon: LayoutPanelTop, label: "Workspace\nPlanning" },
      { icon: PencilRuler, label: "Modern Design\nSolutions" },
      { icon: Settings, label: "End-to-End\nExecution" },
      { icon: Clock, label: "On-Time\nDelivery" },
    ],
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
