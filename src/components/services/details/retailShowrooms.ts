import {
  Award,
  BadgeCheck,
  Boxes,
  CalendarCheck,
  Car,
  Diamond,
  Factory,
  Gem,
  Handshake,
  Lamp,
  Layers,
  LayoutGrid,
  MapPin,
  Monitor,
  PencilRuler,
  ReceiptText,
  RefreshCw,
  Shirt,
  ShoppingBag,
  Wrench,
} from "lucide-react";

import heroImg from "../../../../public/service/optimized/retail/nr1.webp";
import overviewImg from "../../../../public/service/optimized/retail/nr2.webp";
import showroomImg from "../../../../public/service/optimized/retail/nr3.webp";
import displayImg from "../../../../public/service/optimized/retail/nr4.webp";
import spacePlanningImg from "../../../../public/service/optimized/retail/nr5.webp";
import materialsImg from "../../../../public/service/optimized/retail/nr6.webp";
import fitOutImg from "../../../../public/service/optimized/retail/nr7.webp";
import handoverImg from "../../../../public/service/optimized/retail/nr8.webp";
import benefitsImg from "../../../../public/service/optimized/retail/nr9.webp";
import materialSelectionImg from "../../../../public/service/optimized/retail/nr10.webp";
import manufacturingImg from "../../../../public/service/optimized/retail/nr11.webp";
import installationImg from "../../../../public/service/optimized/retail/nr12.webp";
import finishedStoreImg from "../../../../public/service/optimized/retail/nr13.webp";
import lifestyleImg from "../../../../public/service/optimized/retail/nr14.webp";
import fashionImg from "../../../../public/service/optimized/retail/nr15.webp";
import electronicsImg from "../../../../public/service/optimized/retail/nr16.webp";
import furnishingImg from "../../../../public/service/optimized/retail/nr17.webp";
import luxuryImg from "../../../../public/service/optimized/retail/nr18.webp";
import faqImg from "../../../../public/service/optimized/retail/nr19.webp";

import { DisplayRack, KioskCounter, LightBulbGlow, StoreFront } from "../detail/showcaseIcons";
import type { ServiceDetail } from "../detail/types";

// The wording is this service's own: this file's earlier text, its FAQs, and its lines on the Home and Services pages
export const retailShowrooms: ServiceDetail = {
  slug: "retail-showrooms",
  name: "Retail Showrooms",
  look: "home",
  separators: true,
  hero: {
    eyebrow: "Our Services",
    title: ["Retail Showroom", "Interiors"],
    tagline: "Engaging Spaces That Drive Business",
    text: "We create innovative and immersive retail environments that showcase your products, enhance customer experience and strengthen brand identity. From showrooms and stores to kiosks and experience centres, our designs are tailored to attract, engage and convert.",
    image: heroImg,
    secondaryCtaLink: { label: "View Projects", href: "/portfolio/interior/retail-interior" },
    features: [
      { icon: StoreFront, label: "Showrooms & Stores", text: "Branded and experiential spaces" },
      { icon: KioskCounter, label: "Kiosks & Counters", text: "Compact and impactful designs" },
      { icon: DisplayRack, label: "Display Solutions", text: "Product-focused fixtures and styling" },
      { icon: LightBulbGlow, label: "Lighting & Visual Merchandising", text: "Engaging retail atmospheres" },
    ],
    banner: {
      imageAlt: "Retail showroom with a lit wooden counter, wall shelves and screens",
      stats: [
        { icon: Award, value: "21+ Years", label: "of Industry Experience" },
        { icon: StoreFront, value: "200+", label: "Retail Projects Delivered" },
        { icon: Layers, value: "End-to-End", label: "Design & Execution" },
        { icon: MapPin, value: "Pan-India", label: "Project Delivery" },
      ],
    },
  },
  why: {
    eyebrow: "Overview",
    layout: "banner",
    title: ["Creating Retail Spaces", "That Drive Sales"],
    text: "From space planning to final execution, we create retail environments that combine functionality, aesthetics and brand storytelling. Our turnkey solutions are tailored to your products, target audience and business goals, ensuring a distinctive and high-performing showroom. With in-house manufacturing, smart display planning and careful attention to lighting and materials, every store we deliver is designed to attract shoppers, showcase products at their best and turn visits into lasting customer relationships.",
    image: overviewImg,
    points: [
      { icon: Gem, title: "Brand Centric Design", text: "Spaces that reflect your brand values" },
      { icon: LayoutGrid, title: "Optimized Space Planning", text: "Better product display and customer flow" },
      { icon: Boxes, title: "Custom Display Solutions", text: "Fixtures tailored to your products" },
      { icon: BadgeCheck, title: "Quality & Timely Delivery", text: "Premium materials and on-time execution" },
    ],
    buttons: {
      primary: { label: "Enquire Now", href: "/contact" },
      secondary: { label: "View Projects", href: "/portfolio/interior/retail-interior" },
    },
  },
  offer: {
    eyebrow: "What We Offer",
    title: ["Spaces That", "Build Brands"],
    text: "Design House India Private Limited is a premier manufacturer of retail display solutions with nationwide reach. End-to-end interior, display and fit-out solutions across India.",
    items: [
      { icon: StoreFront, title: "Showrooms & Stores", text: "Branded and experiential spaces", image: showroomImg, alt: "Showroom with lit wall shelves of bags and clothing and a central counter", href: "/contact" },
      { icon: DisplayRack, title: "Display Solutions", text: "We design and manufacture custom display fixtures, shelving, counters and furniture in-house, tailored to your products and brand.", image: displayImg, alt: "Electronics showroom with lit display counters and a wall screen", href: "/contact" },
      { icon: LayoutGrid, title: "Optimized Space Planning", text: "Better product display and customer flow", image: spacePlanningImg, alt: "Open showroom floor with display counters and wall shelving", href: "/contact" },
      { icon: PencilRuler, title: "Design & Planning", text: "Layout, 3D visuals and material selection", image: materialsImg, alt: "Marble, wood and fabric samples for a showroom", href: "/contact" },
      { icon: Wrench, title: "Manufacturing & Execution", text: "In-house manufacturing and on-site installation", image: fitOutImg, alt: "Worker fixing lit shelves in a showroom", href: "/contact" },
      { icon: Handshake, title: "Handover", text: "Final quality check and timely delivery", image: handoverImg, alt: "Client and project manager shaking hands in a finished showroom", href: "/contact" },
    ],
  },
  benefits: {
    eyebrow: "Core Benefits",
    title: ["Why", "Choose Us"],
    text: "Elegant and engaging showrooms that bring your brand to life.",
    image: benefitsImg,
    imageReady: true,
    items: [
      { icon: Layers, title: "Turnkey Solutions", text: "Store layout and space planning, interior design and 3D visuals, custom fixtures and display units, lighting, branding elements, in-house manufacturing, on-site installation and final handover." },
      { icon: ReceiptText, title: "Detailed Quotation", text: "Share your requirements and we will prepare a detailed quotation for your showroom." },
      { icon: CalendarCheck, title: "Clear Schedule", text: "After finalising the design we share a schedule covering production, installation and handover." },
      { icon: Factory, title: "In-house Fixtures", text: "We design and manufacture custom display fixtures, shelving, counters and furniture in-house, tailored to your products and brand." },
      { icon: RefreshCw, title: "Existing Showroom Upgrades", text: "We can renovate or reconfigure your existing showroom, reuse what works and upgrade the layout, fixtures and finishes to match your brand." },
      { icon: MapPin, title: "Pan-India Execution", text: "We execute and support retail projects across India, managing production, logistics and on-site installation wherever your store is located." },
    ],
    cta: { label: "Discuss Your Retail Showroom Project", href: "/contact" },
  },
  process: {
    layout: "cards",
    title: "From Concept to",
    titleAccent: "Opening",
    text: "A structured process to deliver a seamless retail showroom experience.",
    steps: [
      { title: "Consultation", text: "Understand your brand, products and store requirements", image: handoverImg },
      { title: "Design & Planning", text: "Store layout and space planning, interior design and 3D visuals", image: showroomImg },
      { title: "Material Selection", text: "Careful attention to lighting and materials", image: materialSelectionImg },
      { title: "In-house Manufacturing", text: "Custom display fixtures, shelving, counters and furniture made in-house", image: manufacturingImg },
      { title: "On-site Installation", text: "Production, logistics and on-site installation wherever your store is located", image: installationImg },
      { title: "Handover", text: "Final quality check and timely delivery", image: finishedStoreImg },
    ],
  },
  projects: {
    layout: "cards",
    title: "Our Retail Showroom",
    titleAccent: "Projects",
    linkStyle: "text",
    items: [
      { title: "Fashion Brand Showroom", place: "Delhi NCR", image: fashionImg, icon: Shirt },
      { title: "Electronics Showroom", place: "Gurugram, Haryana", image: electronicsImg, icon: Monitor },
      { title: "Lifestyle Store", place: "Noida, Uttar Pradesh", image: lifestyleImg, icon: ShoppingBag },
      { title: "Home Furnishing Showroom", place: "Bengaluru, Karnataka", image: furnishingImg, icon: Lamp },
      { title: "Luxury Retail Showroom", place: "Mumbai, Maharashtra", image: luxuryImg, icon: Gem },
    ],
  },
  // Not in the page's design, so it isn't shown; kept for the admin and for later
  hideIdealFor: true,
  idealFor: {
    title: ["Retail Spaces for Every Business Need"],
    tiles: [
      { icon: Shirt, label: "Fashion &\nApparel Brands" },
      { icon: Monitor, label: "Electronics\nShowrooms" },
      { icon: Lamp, label: "Lifestyle\n& Home Decor" },
      { icon: Diamond, label: "Jewellery\nShowrooms" },
      { icon: Car, label: "Automotive\nShowrooms" },
      { icon: ShoppingBag, label: "Premium & Luxury\nRetail Brands" },
    ],
  },
  faqHeading: {
    title: "Frequently Asked Questions",
    text: "Quick answers to common questions about our retail showroom services.",
  },
  faqStyle: { numbered: true, tone: "blue", image: faqImg, textFrom: "48%", compact: true },
  faqs: [
    {
      q: "What is included in a retail showroom turnkey solution?",
      a: "Store layout and space planning, interior design and 3D visuals, custom fixtures and display units, lighting, branding elements, in-house manufacturing, on-site installation and final handover.",
    },
    {
      q: "How much does a retail showroom project cost?",
      a: "The cost depends on the store size, design, materials, fixtures and scope of work. Share your requirements and we will prepare a detailed quotation for your showroom.",
    },
    {
      q: "How long does a typical project take?",
      a: "Timelines depend on the store size, design complexity and site readiness. After finalising the design we share a schedule covering production, installation and handover.",
    },
    {
      q: "Do you provide display fixtures and furniture?",
      a: "Yes. We design and manufacture custom display fixtures, shelving, counters and furniture in-house, tailored to your products and brand.",
    },
    {
      q: "Can you work with our existing space?",
      a: "Yes. We can renovate or reconfigure your existing showroom, reuse what works and upgrade the layout, fixtures and finishes to match your brand.",
    },
    {
      q: "Do you execute projects outside Delhi NCR?",
      a: "Yes. We execute and support retail projects across India, managing production, logistics and on-site installation wherever your store is located.",
    },
  ],
  ctaEyebrow: "Let's Discuss",
  ctaTitle: ["Your Workspace", "Project"],
};
