import {
  Building,
  Building2,
  Clock,
  Gem,
  Home,
  Hotel,
  LayoutGrid,
  Laptop,
  Sparkles,
  Warehouse,
} from "lucide-react";

import heroImg from "../../../../public/service/optimized/resedential/re1.webp";
import secondBedroomImg from "../../../../public/service/optimized/resedential/re2.webp";
import diningImg from "../../../../public/service/optimized/resedential/re3.webp";
import kitchenImg from "../../../../public/service/optimized/resedential/re4.webp";
import wardrobeImg from "../../../../public/service/optimized/resedential/re5.webp";
import overviewImg from "@/assets/image/res.webp";
import apartmentImg from "@/assets/image/res1.webp";
import villaImg from "@/assets/image/res2.webp";
import penthouseImg from "@/assets/image/res3.webp";
import builderFloorImg from "@/assets/image/res4.webp";

import { BedWide, HomeOutline, KitchenUnits, LoungeSofa, WardrobeDoors } from "../detail/showcaseIcons";
import type { ServiceDetail } from "../detail/types";

export const residentialInteriors: ServiceDetail = {
  slug: "residential-interiors",
  name: "Residential Interiors",
  hero: {
    eyebrow: "Our Services",
    title: ["Residential", "Interiors"],
    tagline: "Beautiful Spaces for a Better Everyday",
    text: "We design and execute personalized home interiors that blend style, comfort and functionality. From modern apartments to luxury villas, we create living spaces that reflect your lifestyle and make every corner truly yours.",
    image: heroImg,
    features: [
      { icon: LoungeSofa, label: "Living & Dining", text: "Stylish and functional spaces" },
      { icon: BedWide, label: "Bedrooms", text: "Comfortable and personalized designs" },
      { icon: KitchenUnits, label: "Modular Kitchens", text: "Smart and efficient kitchen solutions" },
      { icon: WardrobeDoors, label: "Wardrobes & Storage", text: "Space-saving and elegant designs" },
    ],
    showcase: {
      layout: "photo-right-band",
      imageAlt: "Bedroom with an upholstered bed, warm lighting and a glass-fronted wardrobe",
      gallery: [
        { image: secondBedroomImg, alt: "Bedroom with a bench at the foot of the bed and a walk-in wardrobe" },
        { image: diningImg, alt: "Dining room with a chandelier and upholstered chairs" },
        { image: kitchenImg, alt: "Modular kitchen with a marble island and bar stools" },
        { image: wardrobeImg, alt: "Walk-in wardrobe with a dressing table and a round mirror" },
      ],
      stat: { icon: HomeOutline, value: "250+", label: "Residential Projects Delivered" },
    },
  },
  why: {
    eyebrow: "Overview",
    layout: "overview",
    title: ["Creating Homes", "That Inspire"],
    text: "Every home has a story. We create residential interiors that combine aesthetics, comfort and smart design. Our team works closely with you to understand your needs and deliver tailored solutions for modern living. With in-house manufacturing, thoughtful storage planning and careful attention to lighting, materials and finishes, every home we deliver is designed to feel warm, work effortlessly for your family and stay beautiful for years to come.",
    image: overviewImg,
    points: [
      { icon: Gem, title: "Personalized Design", text: "Interiors that match your lifestyle" },
      { icon: LayoutGrid, title: "Better Space Utilization", text: "Smart storage and modular solutions" },
      { icon: Sparkles, title: "Quality Craftsmanship", text: "Durable and premium finishes" },
      { icon: Clock, title: "On-Time Delivery", text: "Professional execution with clear timelines" },
    ],
  },
  process: {
    tone: "warm",
    title: "From Concept to Home",
    text: "A streamlined process to turn your dream home into reality.",
    steps: [
      { title: "Consultation", text: "Understand your needs, style and budget" },
      { title: "Design & Planning", text: "Layouts, 3D visuals and material selection" },
      { title: "Execution", text: "In-house manufacturing and on-site installation" },
      { title: "Handover", text: "Final quality check and timely delivery" },
    ],
  },
  projects: {
    title: "Our Residential Interior Projects",
    linkStyle: "text",
    items: [
      { title: "Luxury Apartment", place: "Gurugram, Haryana", image: apartmentImg },
      { title: "Independent Villa", place: "Noida, Uttar Pradesh", image: villaImg },
      { title: "Penthouse Residence", place: "Delhi NCR", image: penthouseImg },
      { title: "Builder Floor", place: "South Delhi", image: builderFloorImg },
    ],
  },
  idealFor: {
    title: ["Residential Spaces for Every Lifestyle"],
    iconTone: "navy",
    tiles: [
      { icon: Building2, label: "Apartments\n& Flats" },
      { icon: Home, label: "Independent\nVillas" },
      { icon: Building, label: "Builder Floors" },
      { icon: Hotel, label: "Penthouse\nResidences" },
      { icon: Warehouse, label: "Farmhouses" },
      { icon: Laptop, label: "Home Offices\n& Studios" },
    ],
  },
  faqHeading: {
    title: "Frequently Asked Questions",
    text: "Quick answers to common questions about our residential interior services.",
  },
  faqStyle: { numbered: true, tone: "blue" },
  faqs: [
    {
      q: "How much does a residential interior project cost?",
      a: "The cost depends on the size of your home, the rooms included, materials, finishes and furniture. Share your requirements and we will prepare a detailed quotation.",
    },
    {
      q: "How long does it take to complete a project?",
      a: "It depends on the scope of work and the size of your home. After finalising the design we share a clear schedule for production, installation and handover.",
    },
    {
      q: "Can you work with my existing furniture or space?",
      a: "Yes. We can plan around furniture you want to keep, refresh existing rooms and redesign only the areas that need it.",
    },
    {
      q: "Do you provide 3D design and material samples?",
      a: "Yes. We share 3D visuals of your rooms and material samples so you can see and feel the finishes before production starts.",
    },
    {
      q: "Do you handle turnkey execution?",
      a: "Yes. We manage everything from design and in-house manufacturing to on-site installation and final handover, so you deal with a single team.",
    },
    {
      q: "Do you execute projects outside Delhi NCR?",
      a: "Yes. We execute residential projects across India, managing production, delivery and installation wherever your home is located.",
    },
  ],
  ctaEyebrow: "Let's Discuss",
  ctaTitle: ["Your Dream Home", "Project"],
  ctaSubtitle: "Share your requirements with our team for a personalized solution.",
};
