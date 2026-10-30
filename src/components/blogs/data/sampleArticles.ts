import type { StaticImageData } from "next/image";

import retailImg from "@/assets/image/b1.webp";
import restaurantImg from "@/assets/image/b3.webp";
import exhibitionImg from "@/assets/image/b4.webp";
import materialsImg from "@/assets/image/w1.webp";
import officeImg from "@/assets/image/c2.webp";
import projectImg from "@/assets/image/a2.webp";
import sustainableImg from "@/assets/image/about.webp";
import residentialImg from "@/assets/about2.webp";
import signageImg from "@/assets/image/t5.webp";

/* Showcase articles from the page design. They have no article page of their own, so they link to the
   Blogs page; admin blogs are listed before them. Replace or remove these as real blogs are published. */
export interface SampleArticle {
  title: string;
  excerpt: string;
  category: string;
  date: string; // ISO date
  image: StaticImageData;
}

export const SAMPLE_ARTICLES: SampleArticle[] = [
  {
    title: "5 Key Elements of a Successful Retail Store Design",
    excerpt: "Create engaging retail spaces that enhance brand identity and drive customer experience.",
    category: "Retail Environments",
    date: "2026-10-20",
    image: retailImg,
  },
  {
    title: "Designing Restaurants for Memorable Dining Experiences",
    excerpt: "Explore design ideas that combine aesthetics, functionality and a strong brand story.",
    category: "Restaurant & Hospitality",
    date: "2026-10-15",
    image: restaurantImg,
  },
  {
    title: "How to Create an Impactful Exhibition Stall",
    excerpt: "Practical tips to design exhibition spaces that attract visitors and strengthen brand presence.",
    category: "Exhibition Stalls",
    date: "2026-10-10",
    image: exhibitionImg,
  },
  {
    title: "A Guide to Choosing the Right Materials",
    excerpt: "Understand material options, durability and finishes for long-lasting interiors.",
    category: "Materials & Finishes",
    date: "2026-10-05",
    image: materialsImg,
  },
  {
    title: "Future-Ready Office Design Trends in 2026",
    excerpt: "Discover emerging trends that are shaping the next generation of workspaces.",
    category: "Commercial Interiors",
    date: "2026-09-28",
    image: officeImg,
  },
  {
    title: "From Concept to Completion: A Project Management Guide",
    excerpt: "Key steps for a smooth and successful interior project execution.",
    category: "Project Management",
    date: "2026-09-20",
    image: projectImg,
  },
  {
    title: "Sustainable Interior Design: A Greener Tomorrow",
    excerpt: "Explore eco-friendly materials and smart design strategies for better spaces.",
    category: "Trends & Innovation",
    date: "2026-09-12",
    image: sustainableImg,
  },
  {
    title: "Designing Elegant and Functional Homes",
    excerpt: "Simple ideas to create beautiful, comfortable and long-lasting living spaces.",
    category: "Residential Interiors",
    date: "2026-09-08",
    image: residentialImg,
  },
  {
    title: "The Role of Signage in Brand Communication",
    excerpt: "How effective signage and branding enhance visibility and customer engagement.",
    category: "Brand Environments",
    date: "2026-09-02",
    image: signageImg,
  },
];

export const SAMPLE_POPULAR: Pick<SampleArticle, "title" | "date" | "image">[] = [
  { title: "Trends in Retail Store Design for 2026", date: "2026-10-18", image: retailImg },
  { title: "Choosing the Right Materials for Commercial Interiors", date: "2026-10-12", image: sustainableImg },
  { title: "Restaurant Design: Creating Memorable Dining Experiences", date: "2026-10-05", image: restaurantImg },
  { title: "Exhibition Stall Design That Attracts Attention", date: "2026-09-28", image: exhibitionImg },
];

export const TRENDING_TOPICS = [
  "Interior Design",
  "Office Design",
  "Retail Stores",
  "Restaurant Interiors",
  "Materials",
  "Exhibition Stalls",
  "Project Management",
];
