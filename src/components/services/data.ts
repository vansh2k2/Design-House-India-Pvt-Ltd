import { BadgeCheck, Lightbulb, Settings, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { StaticImageData } from "next/image";

import corporateImg from "@/assets/image/os1.webp";
import retailImg from "@/assets/image/os2.webp";
import restaurantImg from "@/assets/image/os3.webp";
import exhibitionImg from "@/assets/image/os4.webp";
import kioskImg from "@/assets/image/os5.webp";
import displayImg from "@/assets/image/os6.webp";
import signageImg from "@/assets/image/os7.webp";
import manufacturingImg from "@/assets/image/os8.webp";
import residentialImg from "@/assets/image/os9.webp";
import spaImg from "@/assets/image/os10.webp";

export const HIGHLIGHTS: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Lightbulb, title: "Creative Design\nSolutions", text: "Concepts tailored to your brand and lifestyle" },
  { icon: Settings, title: "End-to-End Execution", text: "Design, manufacturing and on-site installation" },
  { icon: Users, title: "Diverse Industry Experience", text: "Workspaces, retail, hospitality, residential and wellness" },
  { icon: BadgeCheck, title: "Quality & Reliability", text: "Premium materials and skilled craftsmanship" },
];

export interface Service {
  title: string;
  desc: string;
  image: StaticImageData;
  logo?: string; // brand logo shown over the bottom of the photo
  href?: string; // detail page; cards without one open the projects page
}

export const SERVICES: Service[] = [
  { title: "Corporate Interiors", desc: "Workspaces designed for\nproductivity, brand identity\nand growth.", image: corporateImg, href: "/services/corporate-interiors" },
  { title: "Retail Showroom\nInteriors", desc: "Elegant and engaging\nshowrooms that bring your\nbrand to life.", image: retailImg, href: "/services/retail-showrooms" },
  { title: "Restaurant\nInteriors", desc: "Inviting dining spaces with\nthe perfect balance of\nambience and functionality.", image: restaurantImg, href: "/services/restaurant-interiors" },
  { title: "Exhibition Stall\nDesign & Build", desc: "Creative and high-impact\nstalls that make your brand\nstand out at every event.", image: exhibitionImg, href: "/services/exhibition-stalls" },
  { title: "Retail Kiosks", desc: "Compact, stylish and\nfunctional kiosks designed\nto maximise visibility\nand sales.", image: kioskImg, href: "/services/retail-kiosks" },
  { title: "Retail Display\nFixtures", desc: "Custom display fixtures that\nhighlight your products and\nenhance the shopping\nexperience.", image: displayImg, href: "/services/display-fixtures" },
  { title: "Signage &\nBranding", desc: "Impactful signage and\nbranding solutions that\nstrengthen your brand\nidentity.", image: signageImg, href: "/services/signage-branding" },
  { title: "Manufacturing\n& Execution", desc: "In-house manufacturing\nand professional execution\nto ensure quality and\ntimely delivery.", image: manufacturingImg, href: "/services/manufacturing-execution" },
  { title: "Residential\nInteriors", desc: "Beautiful, functional and\ntimeless homes designed\nto reflect your lifestyle.", image: residentialImg, href: "/services/residential-interiors" },
  {
    title: "Spa & Panchkarma\nFurniture",
    desc: "Premium spa and panchkarma\nfurniture that blends traditional\nwellness practices with\nmodern design.",
    image: spaImg,
    logo: "/ensis.jpeg",
    href: "/services/ensis",
  },
];
