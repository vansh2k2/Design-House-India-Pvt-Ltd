import {
  Armchair,
  ChefHat,
  Coffee,
  Gem,
  Hotel,
  LayoutGrid,
  Lightbulb,
  Palette,
  Settings,
  ShieldCheck,
  Truck,
  UtensilsCrossed,
  Wine,
  Clock,
  Users,
} from "lucide-react";

import heroImg from "@/assets/image/b3.webp";
import overviewImg from "@/assets/image/ri1.webp";
import fineDiningImg from "@/assets/image/ir1.webp";
import cafeImg from "@/assets/image/ir2.webp";
import qsrImg from "@/assets/image/ir3.webp";
import loungeImg from "@/assets/image/ir4.webp";

import type { ServiceDetail } from "../detail/types";

export const restaurantInteriors: ServiceDetail = {
  slug: "restaurant-interiors",
  name: "Restaurant Interiors",
  hero: {
    eyebrow: "Our Services",
    title: ["Restaurant", "Interiors"],
    tagline: "Creating Dining Spaces That Leave a Lasting Impression",
    text: "We design and build restaurant interiors that combine aesthetics, functionality and brand identity. From concept to execution, our turnkey solutions create dining experiences that attract guests, enhance comfort and drive business growth.",
    image: heroImg,
    photoStyle: "cut",
    photoWords: ["Good", "Food", "Great", "Spaces"],
    secondaryCta: true,
    features: [
      { icon: Palette, label: "Concept & Theme Design", text: "Unique dining experiences" },
      { icon: LayoutGrid, label: "Space Planning", text: "Optimized layouts and seating" },
      { icon: Armchair, label: "Custom Furniture", text: "Tables, seating and display elements" },
      { icon: Lightbulb, label: "Lighting & Ambience", text: "Mood-enhancing design solutions" },
      { icon: Settings, label: "Turnkey Execution", text: "Design, manufacture and on-site installation" },
    ],
  },
  why: {
    eyebrow: "Overview",
    layout: "overview",
    title: ["Designing Restaurants", "That Bring People Together"],
    text: "From boutique cafés to fine dining and QSRs, we create restaurant interiors that reflect your brand story, enhance customer experience and improve operational efficiency. Our end-to-end solutions are tailored to your concept, target audience and business goals. With in-house manufacturing, thoughtful seating layouts and careful attention to lighting, acoustics and materials, every restaurant we deliver is designed to welcome guests, support smooth service and turn first visits into loyal regulars.",
    image: overviewImg,
    points: [
      { icon: Gem, title: "Brand Focused Design", text: "Spaces that tell your story" },
      { icon: Users, title: "Efficient Space Planning", text: "Better seating and service flow" },
      { icon: ShieldCheck, title: "Durable & Functional", text: "Materials for high-traffic restaurant environments" },
      { icon: Clock, title: "On-Time Delivery", text: "Reliable execution with quality standards" },
    ],
  },
  process: {
    tone: "warm",
    title: "From Concept to Opening",
    text: "A structured process to ensure a seamless restaurant interior experience.",
    steps: [
      { title: "Consultation", text: "Understand your concept, brand and business goals" },
      { title: "Design & Planning", text: "Layout, 3D visuals and material selection" },
      { title: "Execution", text: "On-site manufacturing and installation" },
      { title: "Handover", text: "Final quality check and timely delivery" },
    ],
  },
  projects: {
    title: "Our Restaurant Interior Projects",
    linkStyle: "text",
    items: [
      { title: "Fine Dining Restaurant", place: "Delhi NCR", image: fineDiningImg },
      { title: "Café & Bistro", place: "Gurugram, Haryana", image: cafeImg },
      { title: "QSR Outlet", place: "Noida, Uttar Pradesh", image: qsrImg },
      { title: "Bar & Lounge", place: "Bengaluru, Karnataka", image: loungeImg },
    ],
  },
  idealFor: {
    title: ["Restaurant Spaces for Every Concept"],
    tiles: [
      { icon: UtensilsCrossed, label: "Fine Dining\nRestaurants" },
      { icon: Coffee, label: "Cafés & Bistros" },
      { icon: Truck, label: "Quick Service\nRestaurants (QSR)" },
      { icon: Wine, label: "Bars & Lounges" },
      { icon: ChefHat, label: "Cloud Kitchens" },
      { icon: Hotel, label: "Hotels & Resorts\nDining Spaces" },
    ],
  },
  faqHeading: {
    title: "Frequently Asked Questions",
    text: "Quick answers to common questions about our restaurant interior services.",
  },
  faqStyle: { numbered: true, tone: "blue" },
  faqs: [
    {
      q: "What is included in a restaurant interior turnkey solution?",
      a: "Concept and theme design, space planning, 3D visuals, custom furniture and fixtures, lighting, branding elements, in-house manufacturing, on-site installation and final handover.",
    },
    {
      q: "How much does a restaurant interior project cost?",
      a: "The cost depends on the size of the restaurant, the concept, materials, furniture and scope of work. Share your requirements and we will prepare a detailed quotation.",
    },
    {
      q: "How long does a typical restaurant project take?",
      a: "Timelines depend on the size, design complexity and site readiness. After finalising the design we share a schedule covering production, installation and handover.",
    },
    {
      q: "Do you provide custom furniture and display fixtures?",
      a: "Yes. We design and manufacture tables, seating, bar counters, display units and other fixtures in-house, tailored to your concept and brand.",
    },
    {
      q: "Can you work with an existing restaurant space?",
      a: "Yes. We can renovate or reconfigure your existing restaurant, reuse what works and upgrade the layout, furniture, lighting and finishes.",
    },
    {
      q: "Do you execute restaurant projects outside Delhi NCR?",
      a: "Yes. We execute and support restaurant projects across India, managing production, logistics and on-site installation wherever your outlet is located.",
    },
  ],
  ctaEyebrow: "Let's Discuss",
  ctaTitle: ["Your Restaurant", "Project"],
};
