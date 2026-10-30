import {
  Building2,
  ClipboardList,
  Factory,
  Handshake,
  House,
  LayoutGrid,
  MapPin,
  PencilRuler,
  Presentation,
  ShoppingBag,
  Signpost,
  Store,
  BadgeCheck,
  Users,
  type LucideIcon,
} from "lucide-react";

/* Content for the Projects page. Photos live in /public/newproject. */

const IMG = "/newproject";

export const PHOTOS = {
  heroReception: `${IMG}/p1.png`,
  axisReception: `${IMG}/p2.png`,
  corporateLounge: `${IMG}/p3.png`,
  trendsStore: `${IMG}/p4.png`,
  restaurant: `${IMG}/p5.png`,
  exhibitionStall: `${IMG}/p6.png`,
  mallKiosk: `${IMG}/p7.png`,
  signageReception: `${IMG}/p8.png`,
  officeFitout: `${IMG}/p9.png`,
  hotelLobby: `${IMG}/p10.png`,
  luxuryResidence: `${IMG}/p11.png`,
  cityLounge: `${IMG}/p12.png`,
  // Full Diverse Spaces band: cream sketched panel, gold diagonal, lounge photo
  diverseBanner: `${IMG}/pb.png`,
};

export type Category = { label: string; icon: LucideIcon };

// Filter tabs under the hero ("All Projects" is the empty filter)
export const CATEGORIES: Category[] = [
  { label: "Corporate Interiors", icon: ClipboardList },
  { label: "Retail Showrooms", icon: ShoppingBag },
  { label: "Restaurant Interiors", icon: Handshake },
  { label: "Exhibition Stalls", icon: Presentation },
  { label: "Retail Kiosks", icon: Store },
  { label: "Signage & Branding", icon: Signpost },
  { label: "Commercial Fit-Outs", icon: Building2 },
  { label: "Residential Interiors", icon: House },
];
export const ALL_ICON = LayoutGrid;

export type Project = {
  title: string;
  category: string;
  location: string;
  image: string;
  href: string;
};

export const PROJECTS: Project[] = [
  {
    title: "DLF Corporate Office",
    category: "Corporate Interiors",
    location: "Gurugram, Haryana",
    image: PHOTOS.corporateLounge,
    href: "/portfolio/interior/corporate-interior",
  },
  {
    title: "Trends – Retail Store",
    category: "Retail Showrooms",
    location: "Noida, Uttar Pradesh",
    image: PHOTOS.trendsStore,
    href: "/portfolio/interior/retail-interior",
  },
  {
    title: "The Palate Restaurant",
    category: "Restaurant Interiors",
    location: "Delhi NCR",
    image: PHOTOS.restaurant,
    href: "/portfolio/interior/restaurant-interior",
  },
  {
    title: "Bharat Organic Expo",
    category: "Exhibition Stalls",
    location: "Pragati Maidan, New Delhi",
    image: PHOTOS.exhibitionStall,
    href: "/portfolio/signage/exhibition-events-portfolio",
  },
  {
    title: "Mall Kiosk",
    category: "Retail Kiosks",
    location: "Delhi NCR",
    image: PHOTOS.mallKiosk,
    href: "/portfolio/kiosk/kiosk-images",
  },
  {
    title: "Corporate Signage",
    category: "Signage & Branding",
    location: "Various Locations",
    image: PHOTOS.signageReception,
    href: "/portfolio/signage/signage-portfolio",
  },
  {
    title: "Office Fit-Out",
    category: "Commercial Fit-Outs",
    location: "Noida, Uttar Pradesh",
    image: PHOTOS.officeFitout,
    href: "/portfolio/office-interior/modular-images",
  },
  {
    title: "Hotel Interiors",
    category: "Hospitality Interiors",
    location: "Delhi NCR",
    image: PHOTOS.hotelLobby,
    href: "/portfolio/interior/restaurant-interior",
  },
  {
    title: "Luxury Residence",
    category: "Residential Interiors",
    location: "New Delhi",
    image: PHOTOS.luxuryResidence,
    href: "/portfolio/furniture/wardrobes-images",
  },
];

// Dropdown options: every category / location that appears on a card, in card order
export const PROJECT_CATEGORIES = [...new Set(PROJECTS.map((p) => p.category))];
export const PROJECT_LOCATIONS = [...new Set(PROJECTS.map((p) => p.location))];

export type FeaturedSlide = {
  title: string;
  category: string;
  location: string;
  description: string;
  image: string;
  href: string;
};

// Featured Project slider; the first slide is the one in the design
export const FEATURED: FeaturedSlide[] = [
  {
    title: "Axis Business Park",
    category: "Corporate Interior",
    location: "Gurugram, Haryana",
    description:
      "A modern and functional workspace designed to enhance collaboration, productivity and brand identity. Clean lines, premium finishes and thoughtful spatial planning create an inspiring work environment.",
    image: PHOTOS.axisReception,
    href: "/portfolio/interior/corporate-interior",
  },
  {
    title: "Trends – Retail Store",
    category: "Retail Showroom",
    location: "Noida, Uttar Pradesh",
    description:
      "A vibrant retail environment with clear sightlines, warm lighting and custom fixtures that put the merchandise first and guide shoppers naturally through the store.",
    image: PHOTOS.trendsStore,
    href: "/portfolio/interior/retail-interior",
  },
  {
    title: "The Palate Restaurant",
    category: "Restaurant Interior",
    location: "Delhi NCR",
    description:
      "A warm and inviting dining space where layered lighting, rich textures and comfortable seating come together to create a memorable guest experience.",
    image: PHOTOS.restaurant,
    href: "/portfolio/interior/restaurant-interior",
  },
];

// Numeric figures (`end` + `suffix`) count up from 0 when shown; the others display `text`
export type Stat = { icon: LucideIcon; end?: number; suffix?: string; text?: string; label: string };

export const IMPACT: Stat[] = [
  { icon: Building2, end: 500, suffix: "+", label: "Projects Completed" },
  { icon: Users, end: 20, suffix: "+", label: "Industry Segments" },
  { icon: MapPin, text: "Pan India", label: "Presence" },
  { icon: Handshake, text: "Long-Term", label: "Client Relationships" },
];

export type Step = { icon: LucideIcon; title: string; text: string };

export const PROCESS: Step[] = [
  { icon: Users, title: "Understand Requirements", text: "We listen, analyse and define project goals." },
  { icon: PencilRuler, title: "Design & Planning", text: "Creative concepts with functional and technical detailing." },
  { icon: Factory, title: "Manufacturing & Execution", text: "Quality production and on-site implementation with precision." },
  { icon: BadgeCheck, title: "Handover & Support", text: "On-time delivery and continued support for long-term value." },
];
