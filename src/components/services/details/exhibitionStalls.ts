import {
  Award,
  BadgeCheck,
  Building2,
  CalendarCheck,
  Car,
  Cpu,
  Factory,
  Gem,
  GraduationCap,
  Headset,
  HeartPulse,
  Layers,
  LayoutGrid,
  Leaf,
  MapPin,
  Palette,
  PencilRuler,
  Presentation,
  ReceiptText,
  ShoppingCart,
  Users,
  Wrench,
} from "lucide-react";

import heroImg from "../../../../public/service/optimized/exhibition/ne1.webp";
import overviewImg from "../../../../public/service/optimized/exhibition/ne2.webp";
import creativeImg from "../../../../public/service/optimized/exhibition/ne3.webp";
import designImg from "../../../../public/service/optimized/exhibition/ne4.webp";
import fabricationImg from "../../../../public/service/optimized/exhibition/ne5.webp";
import installationImg from "../../../../public/service/optimized/exhibition/ne6.webp";
import finishedStallImg from "../../../../public/service/optimized/exhibition/ne7.webp";
import supportImg from "../../../../public/service/optimized/exhibition/ne8.webp";
import benefitsImg from "../../../../public/service/optimized/exhibition/ne9.webp";
import healthcareImg from "../../../../public/service/optimized/exhibition/ne10.webp";
import wellnessImg from "../../../../public/service/optimized/exhibition/ne11.webp";
import organicImg from "../../../../public/service/optimized/exhibition/ne12.webp";
import corporateImg from "../../../../public/service/optimized/exhibition/ne13.webp";
import eventImg from "../../../../public/service/optimized/exhibition/ne16.webp";
import faqImg from "../../../../public/service/optimized/exhibition/ne17.webp";

import { ExhibitionBooth, GearOutline, LightBulbGlow, TeamGroup } from "../detail/showcaseIcons";
import type { ServiceDetail } from "../detail/types";

// The wording is this service's own: this file's earlier text, its FAQs, and its lines on the Home and Services pages
export const exhibitionStalls: ServiceDetail = {
  slug: "exhibition-stalls",
  name: "Exhibition Stall Design & Build",
  look: "home",
  hero: {
    eyebrow: "Our Services",
    title: ["Exhibition Stall", "Design & Build"],
    tagline: "Creating Impactful Spaces for Stronger Brand Presence",
    text: "We design and build custom exhibition stalls that reflect your brand identity, attract attention and create meaningful visitor experiences. From concept and design to fabrication and on-site execution, we deliver end-to-end solutions for trade shows, expos and industry events.",
    image: heroImg,
    secondaryCtaLink: { label: "View Projects", href: "/portfolio/signage/exhibition-events-portfolio" },
    features: [
      { icon: LightBulbGlow, label: "Creative Designs", text: "Unique and brand-focused concepts" },
      { icon: GearOutline, label: "End-to-End Execution", text: "From design to on-site installation" },
      { icon: ExhibitionBooth, label: "Custom Fabrication", text: "High-quality and durable structures" },
      { icon: TeamGroup, label: "Engaging Experiences", text: "Spaces that attract and connect" },
    ],
    banner: {
      imageAlt: "Exhibition stall with a white canopy, wooden panels, screens and a lit counter",
      stats: [
        { icon: Award, value: "21+ Years", label: "of Industry Experience" },
        { icon: ExhibitionBooth, value: "200+", label: "Exhibition Stalls Delivered" },
        { icon: Layers, value: "End-to-End", label: "Design & Execution" },
        { icon: MapPin, value: "Pan-India", label: "Project Delivery" },
      ],
    },
  },
  why: {
    eyebrow: "Overview",
    layout: "banner",
    bannerTextEnd: "40%",
    title: ["Exhibition Stalls", "That Showcase Your Brand"],
    text: "We create custom exhibition stalls that combine design, functionality and brand storytelling. Our end-to-end solutions are tailored to your products, target audience and event objectives, helping you make a strong impression and generate valuable business leads. With in-house fabrication, smart visitor flow and careful attention to lighting, graphics and finishes, every stall we deliver is designed to draw people in and turn conversations into lasting business relationships.",
    image: overviewImg,
    points: [
      { icon: Gem, title: "Brand Focused Design", text: "Stalls that reflect your brand identity" },
      { icon: Users, title: "Smart Space Planning", text: "Optimized layouts for better engagement" },
      { icon: LayoutGrid, title: "Custom Fabrication", text: "Modular and reusable solutions" },
      { icon: BadgeCheck, title: "Quality & Timely Delivery", text: "Professional execution with on-site support" },
    ],
    buttons: {
      primary: { label: "Enquire Now", href: "/contact" },
      secondary: { label: "View Projects", href: "/portfolio/signage/exhibition-events-portfolio" },
    },
  },
  offer: {
    eyebrow: "What We Offer",
    title: ["Exhibits That Command", "Attention"],
    text: "We engineer custom trade show booths and exhibition stalls that maximize visitor engagement, command visual attention, and deliver high-impact turnkey presence at major expos across India.",
    items: [
      { icon: Palette, title: "Creative Designs", text: "Unique and brand-focused concepts", image: creativeImg, alt: "Blue and white exhibition stall with a curved canopy and a lit counter", href: "/contact" },
      { icon: PencilRuler, title: "3D Design & Visuals", text: "We create 3D visuals of your stall so you can review the layout, branding and finishes before fabrication begins.", image: designImg, alt: "Laptop showing a 3D stall design beside drawings and colour swatches", href: "/contact" },
      { icon: Factory, title: "Custom Fabrication", text: "High-quality and durable structures", image: fabricationImg, alt: "CNC machine carving a wooden panel in the workshop", href: "/contact" },
      { icon: Wrench, title: "Installation & Dismantling", text: "Our team installs the stall before the event, supports you during the show and dismantles it once the event is over.", image: installationImg, alt: "Workers installing an exhibition stall at the venue", href: "/contact" },
      { icon: Layers, title: "End-to-End Execution", text: "From design to on-site installation", image: finishedStallImg, alt: "Finished exhibition stall with screens, shelves and a seating area", href: "/contact" },
      { icon: MapPin, title: "Pan-India Execution", text: "We build and install exhibition stalls at venues across India, managing transport, installation and on-site support.", image: supportImg, alt: "Team member with a headset working on a stall design", href: "/contact" },
    ],
  },
  benefits: {
    eyebrow: "Core Benefits",
    title: ["Why", "Choose Us"],
    text: "Creative and high-impact stalls that make your brand stand out at every event.",
    image: benefitsImg,
    imageReady: true,
    items: [
      { icon: Layers, title: "Turnkey Solutions", text: "Stall concept and 3D design, fabrication, graphics and branding, lighting, furniture, transport, on-site installation, event support and dismantling after the show." },
      { icon: ReceiptText, title: "Detailed Quotation", text: "Share your requirements and we will prepare a detailed quotation for your stall." },
      { icon: CalendarCheck, title: "Ready on Time", text: "Once the design is finalised we share a schedule for fabrication, transport and installation so the stall is ready on time." },
      { icon: Factory, title: "In-house Fabrication", text: "In-house fabrication, smart visitor flow and careful attention to lighting, graphics and finishes." },
      { icon: Presentation, title: "Business Leads", text: "Stalls that help you make a strong impression and generate valuable business leads." },
      { icon: Headset, title: "On-site Support", text: "On-site supervision and dismantling" },
    ],
    cta: { label: "Discuss Your Exhibition Project", href: "/contact" },
  },
  process: {
    layout: "cards",
    title: "From Concept to",
    titleAccent: "Execution",
    text: "A streamlined process to ensure a successful exhibition experience.",
    steps: [
      { title: "Consultation", text: "Understand your goals, audience and event requirements", image: supportImg },
      { title: "Design & Planning", text: "Creative concept, 3D visuals and material selection", image: designImg },
      { title: "Fabrication & Execution", text: "In-house manufacturing and on-site installation", image: fabricationImg },
      { title: "Event Support", text: "On-site supervision and dismantling", image: eventImg },
    ],
  },
  projects: {
    layout: "cards",
    title: "Our Exhibition Stall Projects",
    linkStyle: "text",
    items: [
      { title: "Healthcare Exhibition Stall", place: "Pragati Maidan, New Delhi", image: healthcareImg, icon: ExhibitionBooth },
      { title: "Wellness Brand Stall", place: "India Expo Mart, Greater Noida", image: wellnessImg, icon: ExhibitionBooth },
      { title: "Organic Products Stall", place: "Bharat Organic Expo", image: organicImg, icon: ExhibitionBooth },
      { title: "Corporate Brand Stall", place: "Mumbai Exhibition Centre", image: corporateImg, icon: ExhibitionBooth },
    ],
  },
  // Not in the page's design, so it isn't shown; kept for the admin and for later
  hideIdealFor: true,
  idealFor: {
    title: ["Exhibition Stalls for Every Industry"],
    tiles: [
      { icon: HeartPulse, label: "Healthcare\n& Wellness" },
      { icon: Leaf, label: "Organic & Food\nProducts" },
      { icon: Building2, label: "Real Estate\n& Infrastructure" },
      { icon: ShoppingCart, label: "FMCG\n& Consumer Brands" },
      { icon: Car, label: "Automotive\n& Mobility" },
      { icon: GraduationCap, label: "Education\n& Institutions" },
      { icon: Cpu, label: "Technology\n& Electronics" },
    ],
  },
  faqHeading: {
    title: "Frequently Asked Questions",
    text: "Quick answers to common questions about our exhibition stall services.",
  },
  faqStyle: { numbered: true, tone: "blue", image: faqImg, textFrom: "46%" },
  faqs: [
    {
      q: "What is included in an exhibition stall turnkey solution?",
      a: "Stall concept and 3D design, fabrication, graphics and branding, lighting, furniture, transport, on-site installation, event support and dismantling after the show.",
    },
    {
      q: "How much does an exhibition stall project cost?",
      a: "The cost depends on the stall size, design, materials, graphics and the event location. Share your requirements and we will prepare a detailed quotation for your stall.",
    },
    {
      q: "How long does it take to design and build a stall?",
      a: "It depends on the stall size, design complexity and the event date. Once the design is finalised we share a schedule for fabrication, transport and installation so the stall is ready on time.",
    },
    {
      q: "Do you provide 3D design and visualizations?",
      a: "Yes. We create 3D visuals of your stall so you can review the layout, branding and finishes before fabrication begins.",
    },
    {
      q: "Can you execute stalls outside Delhi NCR?",
      a: "Yes. We build and install exhibition stalls at venues across India, managing transport, installation and on-site support.",
    },
    {
      q: "Do you handle on-site installation and dismantling?",
      a: "Yes. Our team installs the stall before the event, supports you during the show and dismantles it once the event is over.",
    },
  ],
  ctaEyebrow: "Let's Discuss",
  ctaTitle: ["Your Exhibition", "Project"],
};
