import {
  BadgeCheck,
  Clock,
  Handshake,
  Lightbulb,
  Settings,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { StaticImageData } from "next/image";

import v1Icon from "@/assets/icon/v1.png";
import v2Icon from "@/assets/icon/v2.png";
import v3Icon from "@/assets/icon/v3.png";

// lead / tail: a phrase kept together on one line on wide screens, before / after desc
export type Point = { icon: LucideIcon; title: string; desc: string; lead?: string; tail?: string };

// The 3 x 2 cards on the left
export const REASONS: Point[] = [
  { icon: Lightbulb, title: "End-to-End Solutions", desc: "Design, manufacturing and execution under one roof." },
  { icon: Settings, title: "In-house Manufacturing", desc: "Better quality control, faster turnaround and cost efficiency." },
  // lead: kept together on the first line on wide screens
  { icon: Users, title: "Experienced Team", lead: "Skilled designers, engineers", desc: "and project managers with industry expertise." },
  { icon: BadgeCheck, title: "Quality & Precision", desc: "Attention to detail and high-quality finishing in every project." },
  { icon: Clock, title: "On-Time Delivery", desc: "Efficient planning and execution to meet your deadlines." },
  { icon: Handshake, title: "Pan India Presence", desc: "Serving clients across India with reliable support and service." },
];

// The navy strip over the bottom of the photo (3D icon images)
export type PromiseItem = Omit<Point, "icon"> & { img: StaticImageData };

export const PROMISES: PromiseItem[] = [
  { img: v1Icon, title: "Customised\nDesign Approach", desc: "Tailored solutions to", tail: "match your brand and space." },
  { img: v2Icon, title: "Value for\nInvestment", desc: "Optimal design with", tail: "efficient use of resources." },
  { img: v3Icon, title: "Long-Term\nPartnership", desc: "We build lasting", tail: "relationships with our clients." },
];
