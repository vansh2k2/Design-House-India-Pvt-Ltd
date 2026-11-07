import {
  Armchair,
  Award,
  BadgeCheck,
  ChefHat,
  Coffee,
  ConciergeBell,
  Factory,
  Gem,
  Hammer,
  HardHat,
  Headset,
  Hotel,
  Layers,
  LayoutGrid,
  Lightbulb,
  MapPin,
  Martini,
  MessagesSquare,
  MonitorCog,
  Sandwich,
  ShieldCheck,
  Truck,
  UtensilsCrossed,
  Wine,
  Clock,
  Users,
} from "lucide-react";

import heroImg from "../../../../public/service/optimized/restaurant/rs1.webp";
import bannerImg from "@/assets/banner/ribg.webp";
import benefitsBgImg from "@/assets/banner/whoribg.webp";
import designOverviewImg from "@/assets/image/riright.webp";
import overviewImg from "@/assets/image/ri1.webp";
import fineDiningImg from "@/assets/image/ir1.webp";
import cafeImg from "@/assets/image/ir2.webp";
import qsrImg from "@/assets/image/ir3.webp";
import loungeImg from "@/assets/image/ir4.webp";
import featured1Img from "@/assets/image/rr111.webp";
import featured2Img from "@/assets/image/rr222.webp";
import featured3Img from "@/assets/image/rr333.webp";
import featured4Img from "@/assets/image/rr444.webp";
import featured5Img from "@/assets/image/rr555.webp";
import offer1Img from "@/assets/image/ri11.webp";
import offer2Img from "@/assets/image/ri2.webp";
import offer3Img from "@/assets/image/ri3.webp";
import offer4Img from "@/assets/image/ri4.webp";
import offer5Img from "@/assets/image/ri5.webp";
import offer6Img from "@/assets/image/ri6.webp";
import consultationImg from "@/assets/image/ri111.webp";
import conceptImg from "@/assets/image/ri222.webp";
import materialsImg from "@/assets/image/ri333.webp";
import manufacturingImg from "@/assets/image/ri444.webp";
import installationImg from "@/assets/image/ri555.webp";
import handoverImg from "@/assets/image/ri666.webp";

import { Cloche, DiningTable } from "../detail/showcaseIcons";
import type { ServiceDetail } from "../detail/types";

export const restaurantInteriors: ServiceDetail = {
  slug: "restaurant-interiors",
  name: "Restaurant Interiors",
  hero: {
    eyebrow: "Our Services",
    title: ["Restaurant", "Interiors"],
    tagline: "Immersive Dining Spaces for Memorable Experiences",
    text: "We design and execute high-impact restaurant interiors that blend ambience, functionality and brand identity to enhance customer engagement. From concept and space planning to fit-outs, kitchen coordination and execution, we create modern, functional and dining-driven restaurants.",
    image: heroImg,
    secondaryCtaLink: { label: "View Projects", href: "/portfolio/interior/restaurant-interior" },
    features: [
      { icon: Cloche, label: "Restaurant Design", text: "End-to-end\ndining solutions" },
      { icon: DiningTable, label: "Space Planning", text: "Optimized seating\nand seamless flow" },
      { icon: Lightbulb, label: "Ambience & Lighting", text: "Mood-driven\nlighting concepts" },
      { icon: Hammer, label: "Interior Fit-Out", text: "High-quality build\nand finishes" },
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
  // The page's own sections, in the Corporate Interiors design (../corporate/CorporatePage); the banner text above,
  // and the FAQs below, are used too
  corporate: {
    banner: {
      background: bannerImg,
      compactText: true,
      lastFeatureShade: true,
      imageAlt: "Restaurant with a lit reception counter, ring pendant lights and dining tables beside a garden view",
      stats: [
        { icon: Award, value: "21+ Years", label: "of Industry Experience" },
        { icon: Users, value: "500+", label: "Happy Clients" },
        { icon: Layers, value: "End-to-End", label: "Design & Execution" },
        { icon: MapPin, value: "Pan-India", label: "Project Delivery" },
      ],
    },
    overview: {
      eyebrow: "Overview",
      title: ["Creating Restaurant Interiors", "That Inspire"],
      smallTitle: true,
      offerEdge: true,
      text: "We design and execute modern, brand-aligned restaurant interiors that create inviting dining experiences, enhance customer engagement and drive higher footfall. From concept and design to in-house manufacturing and final execution, we create immersive, functional and high-impact restaurant spaces.",
      image: designOverviewImg,
      points: [
        { icon: Cloche, title: "Brand-Aligned\nDesign" },
        { icon: Layers, title: "End-to-End\nExecution" },
        { icon: Factory, title: "In-house\nManufacturing" },
        { icon: MapPin, title: "Multi-City\nDelivery" },
      ],
      buttons: {
        primary: { label: "Get a Restaurant Interior Design Consultation", href: "/contact" },
        secondary: { label: "Explore Our Work", href: "/portfolio/interior/restaurant-interior" },
      },
    },
    offer: {
      title: ["Complete Restaurant Interior", "Solutions"],
      tallPhotos: true,
      text: "From strategic planning to flawless execution, we deliver end-to-end restaurant interior solutions that showcase your concept, strengthen brand identity and create immersive, high-performing dining experiences.",
      items: [
        { image: offer1Img, icon: ConciergeBell, title: "Restaurant Design", text: "Brand-aligned and guest-centric restaurant layouts that elevate ambience and the dining experience." },
        { image: offer2Img, icon: Wine, title: "Bar & Beverage Zones", text: "Stylish bar counters and beverage stations designed for display, service and atmosphere." },
        { image: offer3Img, icon: LayoutGrid, title: "Space Planning", text: "Optimized layouts for smooth guest flow, efficient seating and seamless service." },
        { image: offer4Img, icon: Layers, title: "Material Finalization", text: "Curated materials, finishes and lighting that align with your brand, durability needs and design aesthetics." },
        { image: offer5Img, icon: HardHat, title: "Fit-Out & Execution", text: "End-to-end project execution with skilled teams, quality control and timely delivery for a ready-to-open restaurant." },
        { image: offer6Img, icon: Headset, title: "Handover & After Support", text: "A fully completed restaurant with final walkthrough, warranty support and continued assistance." },
      ],
    },
    benefits: {
      title: ["Why", "Choose Us"],
      text: "A reliable partner for restaurant interiors that combines design expertise, quality execution and a seamless, brand-focused dining experience.",
      items: [
        { icon: Cloche, title: "Restaurant-Focused Design", text: "Dining spaces that enhance ambience, comfort and overall guest experience." },
        { icon: Layers, title: "End-to-End Solutions", text: "From concept and planning to fit-out, lighting, furniture and project execution." },
        { icon: Factory, title: "In-house Manufacturing", text: "High-quality, customized furniture, seating and fixtures with precise delivery." },
        { icon: BadgeCheck, title: "Assured Quality", text: "Premium materials, skilled craftsmanship and long-lasting finishes." },
        { icon: Users, title: "Experienced Team", text: "A dedicated team of designers, project managers and execution specialists." },
        { icon: MapPin, title: "Pan-India Execution", text: "Consistent design and project delivery across multiple cities." },
      ],
      cta: { label: "Discuss Your Restaurant Interior Project", href: "/contact" },
      background: benefitsBgImg,
      noShade: true,
      wide: true,
    },
    process: {
      title: ["From Concept to", "Restaurant"],
      text: "A clear, collaborative and well-structured process that transforms your ideas into a high-impact, brand-aligned and operationally-ready restaurant.",
      steps: [
        { image: consultationImg, icon: MessagesSquare, title: "Consultation &\nRequirement Study", text: "Understand your restaurant concept, cuisine, target audience, space needs and budget to define the right scope." },
        { image: conceptImg, icon: MonitorCog, title: "Concept &\nDesign Development", text: "Translate your vision into efficient layouts, 3D visuals and a detailed design proposal that enhances the dining experience." },
        { image: materialsImg, icon: Layers, title: "Material Finalization", text: "Select the right materials, finishes, colors and furniture that align with your restaurant brand, theme and durability needs." },
        { image: manufacturingImg, icon: Factory, title: "In-house Manufacturing", text: "Precision-built furniture, seating, counters and custom elements at our own facility with strict quality checks." },
        { image: installationImg, icon: HardHat, title: "Execution & Installation", text: "On-site execution with skilled teams, proper coordination and quality supervision for a seamless setup." },
        { image: handoverImg, icon: Armchair, title: "Handover & After Support", text: "A fully completed restaurant with final walkthrough, warranty support and continued assistance for smooth operations." },
      ],
    },
    featured: {
      eyebrow: "Featured Restaurant Interiors",
      title: ["Restaurant", "Projects"],
      text: "A curated selection of our restaurant interior projects, showcasing brand-aligned design, immersive dining spaces and refined execution.",
      items: [
        { image: featured1Img, icon: UtensilsCrossed, title: "Fine Dine Restaurant", tags: ["Dine-in", "Private Dining", "Luxury"], href: "/portfolio/interior/restaurant-interior" },
        { image: featured2Img, icon: Sandwich, title: "Casual Dining Restaurant", tags: ["Cafés", "QSR", "Bistro"], href: "/portfolio/interior/restaurant-interior" },
        { image: featured3Img, icon: Coffee, title: "Café Interiors", tags: ["Coffee Bars", "Bakeries", "Lounge"], href: "/portfolio/interior/restaurant-interior" },
        { image: featured4Img, icon: ConciergeBell, title: "Food Court Design", tags: ["Multi-Cuisine", "High Footfall", "Scalable"], href: "/portfolio/interior/restaurant-interior" },
        { image: featured5Img, icon: Martini, title: "Bar & Lounge", tags: ["Bars", "Lounges", "Nightlife"], href: "/portfolio/interior/restaurant-interior" },
      ],
    },
    faqPhoto: heroImg,
    ownFaqs: true,
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
      q: "What services does Design House India offer?",
      a: "We provide end-to-end turnkey solutions for restaurant interiors, including design, space planning, fit-outs, interior execution, display fixtures, furniture, lighting and project management.",
    },
    {
      q: "Do you handle both design and execution?",
      a: "Yes. We handle everything from concept and space planning to in-house manufacturing, on-site execution and final handover, so you work with a single team throughout the project.",
    },
    {
      q: "Can you customize designs as per our brand and space requirements?",
      a: "Yes. Every restaurant is planned around your concept, cuisine, brand identity, seating needs and budget, with layouts, materials and finishes chosen to suit your space.",
    },
    {
      q: "Do you have in-house manufacturing capabilities?",
      a: "Yes. Furniture, seating, counters and fixtures are built at our own production facility, which gives us control over quality, finishes and delivery timelines.",
    },
    {
      q: "Which locations do you serve?",
      a: "We are headquartered in Delhi-NCR with strong operations in Mumbai, and we deliver restaurant interior projects across India.",
    },
  ],
  ctaEyebrow: "Let's Discuss",
  ctaTitle: ["Your Restaurant", "Project"],
};
