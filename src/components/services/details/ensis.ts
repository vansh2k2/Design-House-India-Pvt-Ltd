import {
  Activity,
  BadgeCheck,
  Dumbbell,
  Flower2,
  Headset,
  Home,
  Hospital,
  Hotel,
  Ruler,
  Settings,
  ShieldCheck,
  Sparkles,
  Trees,
  Truck,
  Wrench,
} from "lucide-react";

import heroImg from "../../../../public/service/optimized/spa/s1.webp";
import therapyTablesImg from "../../../../public/service/optimized/spa/s2.webp";
import massageBedsImg from "../../../../public/service/optimized/spa/s3.webp";
import trolleyImg from "../../../../public/service/optimized/spa/s4.webp";
import cabinetImg from "../../../../public/service/optimized/spa/s5.webp";
import spaImg from "@/assets/image/os10.webp";
import panchkarmaImg from "@/assets/image/en1.webp";
import massageImg from "@/assets/image/en2.webp";
import shirodharaImg from "@/assets/image/en3.webp";
import spaFurnitureImg from "@/assets/image/en4.webp";
import steamImg from "@/assets/image/en5.webp";
import accessoriesImg from "@/assets/image/en6.webp";

import { Lotus } from "../detail/showcaseIcons";
import type { ServiceDetail } from "../detail/types";

/* ENSIS (our own spa & panchkarma furniture brand). The banner's photos are in public/service/optimized/spa; the
   sections below it still use older photos. */
export const ensis: ServiceDetail = {
  slug: "ensis",
  name: "ENSIS",
  servicesCrumb: false,
  hero: {
    brandLogo: {
      src: "/ensis.jpeg",
      alt: "ENSIS: Wellness Furniture for Healthier Spaces",
      width: 1600,
      height: 639,
    },
    title: ["Spa & Panchkarma", "Furniture"],
    tagline: "Traditional Wellness. Modern Design.",
    text: "We design and manufacture premium spa and panchkarma furniture that blends traditional wellness practices with modern functionality. Crafted for comfort, durability and authentic therapy experiences, our furniture is ideal for spas, wellness centres, resorts and healthcare spaces.",
    image: heroImg,
    features: [
      { icon: Lotus, label: "Authentic Design", text: "Inspired by traditional\nwellness practices" },
      { icon: ShieldCheck, label: "Premium Quality", text: "Durable and\nlong-lasting" },
      { icon: Settings, label: "Custom Solutions", text: "Designed for your\nspace and therapy needs" },
      { icon: Headset, label: "End-to-End Support", text: "From design to\ninstallation" },
    ],
    showcase: {
      layout: "photo-left-wedge-captions",
      imageAlt: "Panchkarma therapy table in polished wood with the ENSIS name, beside a brass shirodhara stand",
      gallery: [
        { image: therapyTablesImg, alt: "Two polished wood therapy tables in a spa room with lit walls", caption: "Panchkarma Therapy Tables" },
        { image: massageBedsImg, alt: "Two spa massage beds with raised headrests and rolled towels", caption: "Spa & Massage Beds" },
        { image: trolleyImg, alt: "Wooden therapy trolley with towels, brass bowls, candles and plants", caption: "Therapy Accessories & Trolleys" },
        { image: cabinetImg, alt: "Wooden spa cabinet with drawers, folded towels and brass bowls", caption: "Spa Furniture & Custom Designs" },
      ],
      stat: { icon: Lotus, value: "100+", label: "Wellness Projects\nDelivered" },
    },
  },
  why: {
    eyebrow: "Overview",
    layout: "overview",
    title: ["Wellness Furniture", "for Modern Spaces"],
    text: "ENSIS offers a complete range of spa and panchkarma furniture designed to create healing environments. Our products combine traditional therapies with ergonomic designs, premium materials and fine craftsmanship to deliver long-lasting value for wellness businesses. Every piece is made in-house to your layout and treatment needs, finished to suit your interiors and built to stay comfortable, hygienic and reliable through years of daily therapy sessions.",
    image: spaImg,
    points: [
      { icon: Activity, title: "Functional & Ergonomic", text: "Designs" },
      { icon: Trees, title: "High-Quality Teak Wood", text: "and Premium Finishes" },
      { icon: Ruler, title: "Customisation for", text: "Your Space" },
      { icon: Wrench, title: "Easy Maintenance", text: "& Durability" },
      { icon: BadgeCheck, title: "Trusted by Wellness", text: "Professionals" },
      { icon: Truck, title: "End-to-End Support", text: "from Design to Installation" },
    ],
  },
  process: {
    tone: "warm",
    title: "From Concept to Completion",
    text: "A streamlined process to deliver the perfect wellness space for your needs.",
    steps: [
      { title: "Consultation", text: "Understand your requirements and space" },
      { title: "Design & Planning", text: "Concept design, 3D visuals and material selection" },
      { title: "Manufacturing", text: "In-house production with quality checks" },
      { title: "Delivery & Installation", text: "Pan India delivery and on-site support" },
    ],
  },
  projects: {
    eyebrow: "Featured Products",
    linkLabel: "View All Products",
    title: "Our Product Range",
    linkStyle: "text",
    items: [
      { title: "Panchkarma Tables", place: "Authentic design for effective therapies", image: panchkarmaImg },
      { title: "Massage Tables", place: "Comfortable and ergonomic solutions", image: massageImg },
      { title: "Shirodhara Stands", place: "Durable and elegant structures", image: shirodharaImg },
      { title: "Spa Furniture", place: "Functional and stylish solutions", image: spaFurnitureImg },
      { title: "Steam & Wellness Units", place: "Customized wellness equipment", image: steamImg },
      { title: "Accessories", place: "Complete range for spa & panchkarma", image: accessoriesImg },
    ],
  },
  idealFor: {
    title: ["Wellness Spaces Across Industries"],
    tiles: [
      { icon: Sparkles, label: "Spas &\nWellness Centres" },
      { icon: Flower2, label: "Ayurveda &\nPanchakarma Clinics" },
      { icon: Hotel, label: "Resorts &\nHotels" },
      { icon: Hospital, label: "Hospitals &\nHealthcare Centres" },
      { icon: Dumbbell, label: "Fitness &\nRehabilitation Centres" },
      { icon: Home, label: "Home Wellness\nSpaces" },
    ],
  },
  faqHeading: {
    title: "Frequently Asked Questions",
    text: "Quick answers to common questions about ENSIS products and services.",
  },
  faqStyle: { numbered: true, tone: "blue" },
  faqs: [
    {
      q: "What materials are used in ENSIS furniture?",
      a: "Our furniture is made with high-quality teak wood and other premium materials, with finishes chosen for durability and easy cleaning in wellness environments.",
    },
    {
      q: "Can the furniture be customised as per our space?",
      a: "Yes. We customise sizes, layouts and finishes to suit your treatment rooms, therapies and interior design.",
    },
    {
      q: "Do you provide installation support?",
      a: "Yes. We deliver and install the furniture on site and make sure everything is set up and ready to use.",
    },
    {
      q: "What is the product warranty?",
      a: "Warranty terms depend on the product. Our team will share the warranty details for each item along with your quotation.",
    },
    {
      q: "Do you supply for international projects?",
      a: "Please share your project location and requirements with our team, and we will confirm supply and delivery options for your project.",
    },
    {
      q: "Can you share product catalogues and pricing?",
      a: "Yes. You can download the ENSIS brochure from our Downloads page, and our team will share pricing based on your requirements.",
    },
  ],
  ctaEyebrow: "Let's Create Together",
  ctaTitle: ["Design Your Wellness Space with", "ENSIS"],
  ctaSubtitle: "Get customised spa and panchkarma furniture for your project.",
};
