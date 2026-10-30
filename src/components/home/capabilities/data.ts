import type { StaticImageData } from "next/image";
import { Factory, Settings, ShieldCheck, Users, type LucideIcon } from "lucide-react";

import w1Img from "@/assets/image/w1.webp";
import w2Img from "@/assets/image/w2.webp";
import w3Img from "@/assets/image/w3.webp";
import w4Img from "@/assets/image/w4.webp";
import w5Img from "@/assets/image/w5.webp";

export type Stat = { icon: LucideIcon; value: string; label: string };

// The four tiles under the heading
export const STATS: Stat[] = [
  { icon: Factory, value: "25,000+", label: "Sq. Ft. Facility" },
  { icon: Users, value: "100+", label: "Skilled Professionals" },
  { icon: Settings, value: "Modern", label: "Machinery" },
  { icon: ShieldCheck, value: "Quality", label: "Assurance" },
];

export type Step = { title: string; desc: string; img: StaticImageData };

export const STEPS: Step[] = [
  { title: "Material Selection", desc: "Premium quality materials for lasting durability.", img: w1Img },
  { title: "Precision Cutting", desc: "Advanced machinery for accurate fabrication.", img: w2Img },
  { title: "Custom Fabrication", desc: "Skilled craftsmanship and attention to detail.", img: w3Img },
  { title: "Finishing & Polishing", desc: "Superior finish with modern techniques.", img: w4Img },
  { title: "On-Site Installation", desc: "Professional execution across India and abroad.", img: w5Img },
];
