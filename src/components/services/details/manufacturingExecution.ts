import {
  Armchair,
  BadgeCheck,
  Boxes,
  Building2,
  Clock,
  Factory,
  GraduationCap,
  Hammer,
  Hospital,
  Hotel,
  Presentation,
  Settings,
  Shapes,
  Sparkles,
  Store,
  UtensilsCrossed,
  Users,
  Wrench,
} from "lucide-react";

import heroImg from "@/assets/image/os8.webp";
import overviewImg from "@/assets/image/ma.webp";
import officeFurnitureImg from "@/assets/image/am1.webp";
import displayFixturesImg from "@/assets/image/am2.webp";
import restaurantJoineryImg from "@/assets/image/w2.webp";
import turnkeyImg from "@/assets/image/am4.webp";

import type { ServiceDetail } from "../detail/types";

export const manufacturingExecution: ServiceDetail = {
  slug: "manufacturing-execution",
  name: "Manufacturing & Execution",
  hero: {
    eyebrow: "Our Services",
    title: ["Manufacturing &", "Execution"],
    tagline: "Turning Designs into Real Spaces",
    text: "We manufacture and execute high-quality interior solutions with precision, advanced technology and skilled workmanship. From custom furniture and display fixtures to complete turnkey execution, we ensure designs are delivered exactly as planned.",
    image: heroImg,
    photoStyle: "cut",
    photoWords: ["Design", "Manufacturing", "Execution", "Quality", "On Time"],
    secondaryCta: true,
    features: [
      { icon: Armchair, label: "Custom Furniture\nManufacturing", text: "Office, retail & hospitality" },
      { icon: Boxes, label: "Display Fixtures", text: "Kiosks, showcases and retail displays" },
      { icon: Hammer, label: "Joinery & Woodwork", text: "Modular furniture and interior elements" },
      { icon: Wrench, label: "Metal & Fabrication", text: "MS, SS and other fabrication works" },
      { icon: Sparkles, label: "Quality & Finishing", text: "Premium materials and finish options" },
      { icon: Settings, label: "Turnkey Execution", text: "Manufacture, deliver and on-site installation" },
    ],
  },
  why: {
    eyebrow: "Overview",
    layout: "overview",
    title: ["In-House Manufacturing", "for Better Results"],
    text: "Our in-house manufacturing and execution capabilities help us maintain quality, ensure timely delivery and offer customized solutions for every project. With modern machinery, experienced teams and strict quality checks, we convert concepts into high-quality, functional and aesthetically refined spaces. Because design, production and installation stay under one roof, we keep tight control over timelines and finishes, respond quickly to changes on site and deliver interiors that look exactly as they were planned.",
    image: overviewImg,
    points: [
      { icon: Factory, title: "Design to Production", text: "Seamless coordination from drawings to manufacturing" },
      { icon: Shapes, title: "Custom & Modular", text: "Tailored to project requirements" },
      { icon: BadgeCheck, title: "High-Quality Materials", text: "Durable and premium finishes" },
      { icon: Users, title: "Skilled Execution Team", text: "Experienced craftsmen and technicians" },
      { icon: Clock, title: "On-Time Delivery", text: "Efficient project management" },
    ],
  },
  process: {
    tone: "warm",
    title: "From Design to Handover",
    text: "A well-defined process to ensure quality manufacturing and flawless execution.",
    steps: [
      { title: "Design Finalization", text: "Approve drawings, materials and specifications" },
      { title: "Manufacturing", text: "In-house production with quality checks" },
      { title: "Site Execution", text: "Delivery, installation and finishing" },
      { title: "Handover", text: "Final inspection and project handover" },
    ],
  },
  projects: {
    title: "Our Manufacturing & Execution Projects",
    linkStyle: "text",
    items: [
      { title: "Office Furniture Manufacturing", place: "Delhi NCR", image: officeFurnitureImg },
      { title: "Retail Display Fixtures", place: "Gurugram, Haryana", image: displayFixturesImg },
      { title: "Restaurant Joinery & Furniture", place: "Noida, Uttar Pradesh", image: restaurantJoineryImg },
      { title: "Turnkey Interior Execution", place: "Bengaluru, Karnataka", image: turnkeyImg },
    ],
  },
  idealFor: {
    title: ["Manufacturing & Execution for Every Sector"],
    tiles: [
      { icon: Building2, label: "Corporate Offices" },
      { icon: Store, label: "Retail Stores\n& Showrooms" },
      { icon: UtensilsCrossed, label: "Restaurants\n& Cafés" },
      { icon: Hotel, label: "Hotels\n& Resorts" },
      { icon: Hospital, label: "Hospitals\n& Clinics" },
      { icon: GraduationCap, label: "Educational\nInstitutions" },
      { icon: Presentation, label: "Exhibition Stalls\n& Kiosks" },
    ],
  },
  faqHeading: {
    title: "Frequently Asked Questions",
    text: "Quick answers to common questions about our manufacturing and execution services.",
  },
  faqStyle: { numbered: true, tone: "blue" },
  faqs: [
    {
      q: "What types of products do you manufacture?",
      a: "Office and hospitality furniture, retail display fixtures, kiosks and showcases, modular joinery, metal fabrication and other custom interior elements.",
    },
    {
      q: "Do you provide both manufacturing and on-site execution?",
      a: "Yes. We manufacture in-house and our own team handles delivery, installation and finishing on site, through to final handover.",
    },
    {
      q: "What materials and finishes are available?",
      a: "We work with wood, laminates, veneers, MS, SS, acrylic, glass and a wide range of finishes. We help you choose materials that suit your design, usage and budget.",
    },
    {
      q: "How do you ensure quality in manufacturing?",
      a: "Every project follows approved drawings and specifications, with quality checks during production and a final inspection before dispatch and handover.",
    },
    {
      q: "Can you work on customized designs?",
      a: "Yes. We manufacture to your custom drawings and specifications, or develop production drawings from your design concept.",
    },
    {
      q: "Do you execute projects outside Delhi NCR?",
      a: "Yes. We deliver and install projects across India, managing logistics and on-site execution wherever your space is located.",
    },
  ],
  ctaEyebrow: "Let's Discuss",
  ctaTitle: ["Your Manufacturing & Execution", "Project"],
};
