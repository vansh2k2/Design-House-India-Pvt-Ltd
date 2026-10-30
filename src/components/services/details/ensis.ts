import {
  Activity,
  BadgeCheck,
  Dumbbell,
  Flower2,
  Gem,
  Home,
  Hospital,
  Hotel,
  Leaf,
  Ruler,
  ShieldCheck,
  Sparkles,
  Trees,
  Truck,
  Wrench,
} from "lucide-react";

import spaImg from "@/assets/image/os10.webp";
import panchkarmaImg from "@/assets/image/en1.webp";
import massageImg from "@/assets/image/en2.webp";
import shirodharaImg from "@/assets/image/en3.webp";
import spaFurnitureImg from "@/assets/image/en4.webp";
import steamImg from "@/assets/image/en5.webp";
import accessoriesImg from "@/assets/image/en6.webp";

import type { ServiceDetail } from "../detail/types";

/* ENSIS (our own spa & panchkarma furniture brand). Only one spa photo is in the project so far (os10);
   swap the product images below as soon as product photos are added. */
export const ensis: ServiceDetail = {
  slug: "ensis",
  name: "ENSIS",
  servicesCrumb: false,
  hero: {
    eyebrow: "Our Brand",
    brandLogo: {
      src: "/Ensis Panchakarma.png",
      alt: "ENSIS Panchkarma Solutions",
      width: 472,
      height: 193,
      tagline: "Wellness Furniture for Healthier Spaces",
    },
    title: ["Wellness Spaces", "Designed for Healing"],
    text: "Premium spa and panchkarma furniture that blends traditional wellness wisdom with modern design, durability and functionality.",
    image: spaImg,
    photoStyle: "cut",
    primaryCta: { label: "Explore Products", href: "#products" },
    secondaryCta: true,
    secondaryCtaLink: { label: "Our Projects", href: "/portfolio" },
    features: [
      { icon: Flower2, label: "Traditional Design", text: "Modern Functionality" },
      { icon: Gem, label: "Premium Materials", text: "and Finishes" },
      { icon: Ruler, label: "Custom Designs", text: "as per Space" },
      { icon: Leaf, label: "Suitable for Spas,", text: "Wellness Centres & Resorts" },
      { icon: ShieldCheck, label: "Durable & Long Lasting", text: "Construction" },
      { icon: Truck, label: "Pan India Delivery", text: "and Installation Support" },
    ],
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
