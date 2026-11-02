import {
  ChefHat,
  Coffee,
  Gem,
  Hotel,
  ShieldCheck,
  Truck,
  UtensilsCrossed,
  Wine,
  Clock,
  Users,
} from "lucide-react";

import heroImg from "../../../../public/service/optimized/restaurant/rs1.webp";
import barImg from "../../../../public/service/optimized/restaurant/rs2.webp";
import openKitchenImg from "../../../../public/service/optimized/restaurant/rs3.webp";
import seatingImg from "../../../../public/service/optimized/restaurant/rs4.webp";
import diningHallImg from "../../../../public/service/optimized/restaurant/rs5.webp";
import overviewImg from "@/assets/image/ri1.webp";
import fineDiningImg from "@/assets/image/ir1.webp";
import cafeImg from "@/assets/image/ir2.webp";
import qsrImg from "@/assets/image/ir3.webp";
import loungeImg from "@/assets/image/ir4.webp";

import { BarCounter, Cloche, DiningTable, HangingLamp } from "../detail/showcaseIcons";
import type { ServiceDetail } from "../detail/types";

export const restaurantInteriors: ServiceDetail = {
  slug: "restaurant-interiors",
  name: "Restaurant Interiors",
  hero: {
    eyebrow: "Our Services",
    title: ["Restaurant", "Interiors"],
    tagline: "Inviting Spaces That Create Memorable Experiences",
    text: "We design and execute restaurant interiors that blend ambience, functionality and brand identity. From casual dining to fine-dine, we create spaces that enhance guest experiences and drive business growth.",
    image: heroImg,
    secondaryCtaLink: { label: "View Projects", href: "/portfolio/interior/restaurant-interior" },
    features: [
      { icon: DiningTable, label: "Dining Areas", text: "Comfortable and engaging spaces" },
      { icon: BarCounter, label: "Bars & Beverage Zone", text: "Stylish and functional designs" },
      { icon: ChefHat, label: "Open Kitchens", text: "Modern and efficient layouts" },
      { icon: HangingLamp, label: "Lighting & Ambience", text: "Setting the perfect mood" },
    ],
    showcase: {
      layout: "photo-right-cut-navy",
      imageAlt: "Restaurant with green banquette seating, wooden tables and woven pendant lights",
      gallery: [
        { image: seatingImg, alt: "Dining area with green and cream chairs and tropical plants" },
        { image: barImg, alt: "Bar with a lit bottle wall and a row of leather stools" },
        { image: diningHallImg, alt: "Dining hall with round tables under woven pendant lights" },
        { image: openKitchenImg, alt: "Open kitchen with chefs behind a green counter" },
      ],
      stat: { icon: Cloche, value: "150+", label: "Restaurant Projects Delivered" },
    },
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
