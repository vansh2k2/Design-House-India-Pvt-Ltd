import type { StaticImageData } from "next/image";

import a11Icon from "@/assets/icon/a11.png";
import a22Icon from "@/assets/icon/a22.png";
import a33Icon from "@/assets/icon/a33.png";
import a44Icon from "@/assets/icon/a44.png";
import a55Icon from "@/assets/icon/a55.png";

import a1Img from "@/assets/image/a1.webp";
import a2Img from "@/assets/image/a2.webp";
import a3Img from "@/assets/image/a3.webp";
import a4Img from "@/assets/image/a4.webp";
import a5Img from "@/assets/image/a5.webp";

// tone: colour of the icon disc (alternates navy / orange, as in the design)
export type ApproachStep = {
  stepIcon: StaticImageData;
  tone: "navy" | "orange";
  title: string;
  desc: string;
  img: StaticImageData;
};

export const STEPS: ApproachStep[] = [
  { stepIcon: a11Icon, tone: "navy", title: "Consultation", desc: "Understanding your brand, goals and requirements.", img: a1Img },
  { stepIcon: a22Icon, tone: "orange", title: "Design & Planning", desc: "Creative concepts and detailed planning.", img: a2Img },
  { stepIcon: a33Icon, tone: "navy", title: "Manufacturing", desc: "Precision and quality production.", img: a3Img },
  { stepIcon: a44Icon, tone: "orange", title: "Execution", desc: "On-site installation and management.", img: a4Img },
  { stepIcon: a55Icon, tone: "navy", title: "Handover & Support", desc: "A space ready to perform with ongoing support.", img: a5Img },
];
