import coverImg from "@/assets/image/about.webp";
import materialsImg from "@/assets/image/w1.webp";
import retailImg from "@/assets/image/b1.webp";
import projectImg from "@/assets/image/a2.webp";
import restaurantImg from "@/assets/image/b3.webp";

import type { ArticleDetail, ArticleItem } from "../types";

/* Fixed content for the blog detail page while the design is being reviewed: every blog opens this
   article (text, counts and lists exactly as in the page design). Turn it off with
   USE_DEMO_BLOG_DETAIL in ../constants to show each blog's real content again. */

export const DEMO_DETAIL: ArticleDetail = {
  slug: "designing-workspaces-for-a-healthier-and-more-productive-future",
  title: "Designing Workspaces for a Healthier and More Productive Future",
  excerpt: "Discover how thoughtful workspace design can improve well-being, boost productivity and create a positive work culture.",
  category: "Interior Design",
  date: new Date("2026-10-24"),
  image: coverImg,
  coverWords: ["People", "Spaces", "Ideas", "Growth"],
  readTime: 8,
  views: 1200,
  blocks: [
    {
      type: "p",
      text: "The modern workplace is no longer just a place to work — it's a space that influences people's health, creativity and overall performance. A well-designed office can enhance well-being, foster collaboration and reflect your brand's identity, making it a powerful tool for business growth.",
    },
    { type: "h2", text: "1. The Changing Nature of Workspaces" },
    {
      type: "p",
      text: "With hybrid work models and evolving employee expectations, offices are now designed to be more flexible, human-centric and technology-enabled. Businesses are focusing on creating environments that support both focused work and collaborative interactions.",
    },
    { type: "h2", text: "2. Key Elements of a Healthier Workspace" },
    {
      type: "points",
      items: [
        { title: "Natural Light & Ventilation", text: "Improves mood, reduces stress and enhances focus." },
        { title: "Ergonomic Furniture", text: "Supports better posture and long-term health." },
        { title: "Flexible Spaces", text: "Adaptable zones for collaboration, focused work and informal meetings." },
        { title: "Biophilic Design", text: "Brings nature indoors to create a calm and inspiring environment." },
      ],
    },
    { type: "h2", text: "3. Materials and Finishes That Make a Difference" },
    {
      type: "imageText",
      image: materialsImg,
      text: "Choosing the right materials can improve indoor air quality, reduce noise and create a visually appealing environment. Sustainable and durable materials also contribute to long-term value and a lower environmental impact.",
    },
    { type: "h2", text: "4. Creating a Space That Reflects Your Brand" },
    {
      type: "p",
      text: "Your workspace is a physical expression of your brand. From colour schemes and finishes to layout and lighting, every element should align with your company's values and culture, leaving a lasting impression on employees and visitors.",
    },
    { type: "quote", text: "A well-designed workspace does more than look good — it creates a healthier, happier and more productive team." },
  ],
};

export const DEMO_CATEGORY_COUNTS = [
  { label: "Interior Design", count: 12 },
  { label: "Retail Environments", count: 8 },
  { label: "Restaurant & Hospitality", count: 6 },
  { label: "Exhibition Stalls", count: 5 },
  { label: "Materials & Finishes", count: 9 },
  { label: "Trends & Innovation", count: 7 },
  { label: "Project Management", count: 6 },
];

export const DEMO_RELATED: ArticleItem[] = [
  {
    key: "related-retail",
    title: "5 Key Elements of a Successful Retail Store Design",
    excerpt: "",
    category: "Retail Environments",
    date: new Date("2026-10-20"),
    href: "/blogs/key-elements-of-a-successful-retail-store-design",
    image: retailImg,
  },
  {
    key: "related-materials",
    title: "A Guide to Choosing the Right Materials",
    excerpt: "",
    category: "Materials & Finishes",
    date: new Date("2026-10-05"),
    href: "/blogs/a-guide-to-choosing-the-right-materials",
    image: materialsImg,
  },
  {
    key: "related-project",
    title: "From Concept to Completion: A Project Management Guide",
    excerpt: "",
    category: "Project Management",
    date: new Date("2026-10-02"),
    href: "/blogs/from-concept-to-completion-a-project-management-guide",
    image: projectImg,
  },
  {
    key: "related-restaurant",
    title: "Designing Restaurants for Memorable Dining Experiences",
    excerpt: "",
    category: "Restaurant & Hospitality",
    date: new Date("2026-09-28"),
    href: "/blogs/designing-restaurants-for-memorable-dining-experiences",
    image: restaurantImg,
  },
];
