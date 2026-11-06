import { Armchair, Award, BadgeCheck, BriefcaseBusiness, PencilRuler, Coffee, ConciergeBell, Factory, HardHat, Layers, MapPin, MessagesSquare, MonitorCog, Users, UsersRound } from "lucide-react";

import heroImg from "../../../../public/service/optimized/corporate/i1.webp";
import workstationsImg from "../../../../public/service/optimized/corporate/i2.webp";
import meetingRoomImg from "../../../../public/service/optimized/corporate/i3.webp";
import receptionImg from "../../../../public/service/optimized/corporate/i4.webp";
import collaborativeImg from "../../../../public/service/optimized/corporate/i5.webp";
import bannerImg from "@/assets/banner/cibg.webp";
import overviewImg from "@/assets/image/ci.webp";
import itOfficeImg from "@/assets/hero-corporate-1.jpg";
import headquartersImg from "@/assets/image/co1.webp";
import coworkingImg from "@/assets/image/co2.webp";
import consultingImg from "@/assets/image/co3.webp";
import loungeImg from "@/assets/image/ws1.webp";
import consultationImg from "@/assets/image/s2.webp";
import conceptImg from "@/assets/image/a2.webp";
import materialsImg from "@/assets/image/ac4.webp";
import manufacturingImg from "@/assets/image/w3.webp";
import installationImg from "@/assets/image/ac3.webp";
import handoverImg from "@/assets/image/b2.webp";
import openWorkspaceImg from "@/assets/image/os1.webp";
import boardroomImg from "@/assets/image/so1.webp";

import { HouseHeart, LoungeSofa, MeetingTable, OfficeDesk, TeamGroup } from "../detail/showcaseIcons";
import type { ServiceDetail } from "../detail/types";

export const corporateInteriors: ServiceDetail = {
  slug: "corporate-interiors",
  name: "Corporate Interiors",
  hero: {
    eyebrow: "Our Services",
    title: ["Corporate", "Interiors"],
    tagline: "Productive Spaces for Modern Businesses",
    text: "We design and execute high-performance corporate interiors that reflect your brand culture and enhance productivity. From office fit-outs to meeting rooms, workstations and collaborative spaces, we create functional and inspiring workplaces.",
    image: heroImg,
    secondaryCtaLink: { label: "View Projects", href: "/portfolio/interior/corporate-interior" },
    photoWords: ["People", "Ideas", "Spaces", "Growth"],
    features: [
      { icon: OfficeDesk, label: "Office Fit-Outs", text: "End-to-end workspace\nsolutions" },
      { icon: TeamGroup, label: "Workstations", text: "Ergonomic and modular designs" },
      { icon: MeetingTable, label: "Meeting Rooms", text: "Functional and flexible spaces" },
      { icon: LoungeSofa, label: "Reception & Lounges", text: "Strong first impressions" },
    ],
  },
  why: {
    eyebrow: "Overview",
    title: ["Creating Homes", "That Inspire"],
    text: "We design and execute modern, functional and personalized residential interiors that reflect your lifestyle. From concept and design to in-house manufacturing and final execution, we transform spaces into comfortable, elegant and inspiring homes.",
    image: overviewImg,
    points: [
      { icon: HouseHeart, title: "Personalized\nDesign", text: "Interiors planned around your lifestyle" },
      { icon: Layers, title: "End-to-End\nExecution", text: "From concept to final handover" },
      { icon: Factory, title: "In-house\nManufacturing", text: "Furniture and fixtures made in our own units" },
      { icon: MapPin, title: "Multi-City\nDelivery", text: "Projects delivered across cities" },
    ],
  },
  // The page's own sections (../corporate/CorporatePage); the banner text above, and the FAQs below, are used too
  corporate: {
    banner: {
      background: bannerImg,
      imageAlt: "Corporate office reception with a lit marble desk and open workstations with a city view",
      stats: [
        { icon: Award, value: "21+ Years", label: "of Industry Experience" },
        { icon: Users, value: "500+", label: "Happy Clients" },
        { icon: Layers, value: "End-to-End", label: "Design & Execution" },
        { icon: MapPin, value: "Pan-India", label: "Project Delivery" },
      ],
    },
    overview: {
      eyebrow: "Overview",
      title: ["Creating Homes", "That Inspire"],
      text: "We design and execute modern, functional and personalized residential interiors that reflect your lifestyle. From concept and design to in-house manufacturing and final execution, we transform spaces into comfortable, elegant and inspiring homes.",
      image: overviewImg,
      points: [
        { icon: HouseHeart, title: "Personalized\nDesign" },
        { icon: Layers, title: "End-to-End\nExecution" },
        { icon: Factory, title: "In-house\nManufacturing" },
        { icon: MapPin, title: "Multi-City\nDelivery" },
      ],
      buttons: {
        primary: { label: "Get a Residential Design Consultation", href: "/contact" },
        secondary: { label: "Explore Our Work", href: "/portfolio/interior/corporate-interior" },
      },
    },
    offer: {
      title: ["Complete Corporate Interior", "Solutions"],
      text: "From strategic planning to flawless execution, we deliver end-to-end corporate interior solutions that enhance productivity, reflect your brand identity and create modern, future-ready workspaces.",
      items: [
        { image: workstationsImg, icon: Armchair, title: "Workspace Design", text: "Ergonomic, efficient and collaborative workspaces for higher productivity." },
        { image: meetingRoomImg, icon: Users, title: "Meeting Rooms", text: "Smart, tech-enabled meeting spaces for focused discussions and better decisions." },
        { image: receptionImg, icon: ConciergeBell, title: "Reception & Lobbies", text: "Welcoming, brand-aligned reception areas that create a strong first impression." },
        { image: collaborativeImg, icon: UsersRound, title: "Collaborative Spaces", text: "Flexible and informal spaces that encourage teamwork, creativity and innovation." },
        { image: headquartersImg, icon: BriefcaseBusiness, title: "Executive Offices", text: "Elegant and functional leadership spaces that reflect authority and brand values." },
        { image: loungeImg, icon: Coffee, title: "Pantry & Breakout Zones", text: "Relaxing and engaging spaces for refreshment, interaction and employee well-being." },
      ],
    },
    benefits: {
      title: ["Why", "Choose Us"],
      text: "A reliable partner for residential interiors that combines design expertise, quality execution and a seamless, stress-free experience.",
      items: [
        { icon: PencilRuler, title: "Bespoke Design", text: "Personalized interiors that reflect your lifestyle, space and taste." },
        { icon: Layers, title: "End-to-End Solutions", text: "From concept and planning to manufacturing and on-site execution." },
        { icon: Factory, title: "In-house Manufacturing", text: "Precision, quality control and timely delivery through our own production setup." },
        { icon: BadgeCheck, title: "Assured Quality", text: "Premium materials, skilled craftsmanship and lasting finishes." },
        { icon: Users, title: "Experienced Team", text: "A dedicated team of designers, project managers and execution specialists." },
        { icon: MapPin, title: "Pan-India Execution", text: "Consistent design and project delivery across multiple cities." },
      ],
      cta: { label: "Discuss Your Home Interior Project", href: "/contact" },
    },
    process: {
      title: ["From Concept to", "Workspace"],
      text: "A clear, collaborative and well-structured process that transforms your ideas into a high-performing, brand-aligned and future-ready workspace.",
      steps: [
        { image: consultationImg, icon: MessagesSquare, title: "Consultation &\nRequirement Study", text: "Understand your business goals, brand identity, space needs and budget to define the right scope." },
        { image: conceptImg, icon: MonitorCog, title: "Concept &\nDesign Development", text: "Translate your requirements into functional designs with space planning, 3D visuals and a detailed proposal." },
        { image: materialsImg, icon: Layers, title: "Material Finalization", text: "Select the right materials, finishes, colors and fittings that match your brand, functionality and durability needs." },
        { image: manufacturingImg, icon: Factory, title: "In-house Manufacturing", text: "Precision-built furniture and interior elements at our own facility with strict quality checks." },
        { image: installationImg, icon: HardHat, title: "Execution & Installation", text: "On-site execution with skilled teams, proper coordination and quality supervision." },
        { image: handoverImg, icon: Armchair, title: "Handover & After Support", text: "A fully completed workspace with final walkthrough, quality check, warranty support and continued assistance." },
      ],
    },
    featured: {
      title: ["Interior", "Projects"],
      text: "A curated selection of our corporate interior projects, showcasing functional design, brand-aligned workspaces and refined execution.",
      items: [
        { image: openWorkspaceImg, icon: Armchair, title: "Open Workspace", tags: ["Collaborative", "Flexible", "Productive"] },
        { image: boardroomImg, icon: Users, title: "Meeting Room", tags: ["Smart", "Connected", "Professional"] },
        { image: heroImg, icon: ConciergeBell, title: "Reception & Lobby", tags: ["Welcoming", "Brand-Aligned", "Premium"] },
        { image: headquartersImg, icon: BriefcaseBusiness, title: "Executive Office", tags: ["Elegant", "Functional", "Leader-Focused"] },
        { image: loungeImg, icon: Coffee, title: "Pantry & Breakout", tags: ["Relaxing", "Engaging", "People-Centric"] },
      ],
    },
    faqPhoto: meetingRoomImg,
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
      q: "What services does Design House India offer?",
      a: "We provide end-to-end turnkey solutions for corporate interiors, including workspace design, fit-outs, furniture, branded environments, architectural signage and project execution.",
    },
    {
      q: "Do you handle both design and execution?",
      a: "Yes. We handle everything from space planning and design to in-house manufacturing, on-site execution and final handover, so you work with a single team throughout the project.",
    },
    {
      q: "Can you customize designs as per our brand and space requirements?",
      a: "Yes. Every workspace is planned around your brand identity, team size, workflow and budget, with layouts, materials and finishes chosen to suit your space.",
    },
    {
      q: "Do you have in-house manufacturing capabilities?",
      a: "Yes. Furniture and interior elements are built at our own production facility, which gives us control over quality, finishes and delivery timelines.",
    },
    {
      q: "Which locations do you serve?",
      a: "We are headquartered in Delhi-NCR with strong operations in Mumbai, and we deliver corporate interior projects across India.",
    },
  ],
  ctaTitle: ["Let's Discuss", "Your Workspace Project"],
};
