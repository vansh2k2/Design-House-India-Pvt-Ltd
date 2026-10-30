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
import kioskImg from "@/assets/image/b5.webp";
import workshopImg from "@/assets/image/w3.webp";

/* Showcase articles from the page design, each with its own detail page (/blogs/<slug>). Admin blogs are
   listed before them. Replace or remove these as real blogs are published. */

// Body of a showcase article, rendered block by block on the detail page
export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "points"; items: { title: string; text: string }[] }
  | { type: "imageText"; image: StaticImageData; text: string }
  | { type: "quote"; text: string };

export interface SampleArticle {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string; // ISO date
  image: StaticImageData;
  readTime: number; // minutes
  body: ArticleBlock[];
}

export const SAMPLE_ARTICLES: SampleArticle[] = [
  {
    slug: "key-elements-of-a-successful-retail-store-design",
    title: "5 Key Elements of a Successful Retail Store Design",
    excerpt: "Create engaging retail spaces that enhance brand identity and drive customer experience.",
    category: "Retail Environments",
    date: "2026-10-20",
    image: retailImg,
    readTime: 5,
    body: [
      { type: "p", text: "A retail store is more than a place to sell products. It is where shoppers meet your brand in person, and every detail of the space shapes how they feel, how long they stay and what they buy." },
      { type: "h2", text: "What Makes a Store Work" },
      {
        type: "points",
        items: [
          { title: "Clear Layout", text: "A planned customer journey that guides shoppers naturally through the store." },
          { title: "Layered Lighting", text: "Ambient, accent and display lighting that makes products stand out." },
          { title: "Smart Fixtures", text: "Displays that showcase products well and are easy to restock." },
          { title: "Brand Identity", text: "Colours, materials and signage that tell your brand story." },
        ],
      },
      { type: "h2", text: "Designing for the Customer" },
      { type: "p", text: "Comfortable aisle widths, intuitive zoning and well-placed checkout counters reduce friction and encourage shoppers to explore. The fifth element is flexibility: fixtures that can be reconfigured keep the store fresh for every season and campaign." },
      { type: "quote", text: "A great store makes shopping feel effortless and makes the brand unforgettable." },
    ],
  },
  {
    slug: "designing-restaurants-for-memorable-dining-experiences",
    title: "Designing Restaurants for Memorable Dining Experiences",
    excerpt: "Explore design ideas that combine aesthetics, functionality and a strong brand story.",
    category: "Restaurant & Hospitality",
    date: "2026-10-15",
    image: restaurantImg,
    readTime: 5,
    body: [
      { type: "p", text: "Guests remember how a restaurant made them feel long after the meal. Thoughtful interiors turn a visit into an experience and give diners a reason to return." },
      { type: "h2", text: "Setting the Mood" },
      { type: "p", text: "Lighting, acoustics and materials work together to create atmosphere. Warm, dimmable lighting suits fine dining, while brighter, energetic schemes work for cafés and quick-service formats." },
      { type: "h2", text: "Planning for Flow" },
      {
        type: "points",
        items: [
          { title: "Seating Mix", text: "Booths, tables and counters for different group sizes." },
          { title: "Service Routes", text: "Clear paths between kitchen, bar and dining areas." },
          { title: "Acoustics", text: "Soft finishes that keep conversations comfortable." },
          { title: "Signature Moments", text: "A feature wall or bar that guests photograph and share." },
        ],
      },
      { type: "quote", text: "The best restaurant interiors serve the food, the staff and the story at the same time." },
    ],
  },
  {
    slug: "how-to-create-an-impactful-exhibition-stall",
    title: "How to Create an Impactful Exhibition Stall",
    excerpt: "Practical tips to design exhibition spaces that attract visitors and strengthen brand presence.",
    category: "Exhibition Stalls",
    date: "2026-10-10",
    image: exhibitionImg,
    readTime: 4,
    body: [
      { type: "p", text: "At a busy exhibition you have only a few seconds to catch a visitor's attention. A well-designed stall makes your brand visible from across the hall and invites people in." },
      { type: "h2", text: "Stand Out from a Distance" },
      { type: "p", text: "Use high-level branding, bold graphics and strong lighting so your stall is recognisable from the aisle. Keep the message simple: who you are and why visitors should stop." },
      { type: "h2", text: "Design the Visitor Journey" },
      {
        type: "points",
        items: [
          { title: "Open Frontage", text: "An inviting entrance without barriers." },
          { title: "Product Zones", text: "Dedicated areas to demo and display products." },
          { title: "Meeting Space", text: "A quiet corner for serious conversations." },
          { title: "Storage", text: "Hidden storage that keeps the stall clutter-free." },
        ],
      },
      { type: "quote", text: "An exhibition stall is a brand experience built for just a few days, so every square foot must work hard." },
    ],
  },
  {
    slug: "a-guide-to-choosing-the-right-materials",
    title: "A Guide to Choosing the Right Materials",
    excerpt: "Understand material options, durability and finishes for long-lasting interiors.",
    category: "Materials & Finishes",
    date: "2026-10-05",
    image: materialsImg,
    readTime: 5,
    body: [
      { type: "p", text: "Materials define how a space looks, feels and ages. Choosing well means balancing appearance, durability, maintenance and budget for each part of the project." },
      { type: "h2", text: "Match the Material to the Use" },
      { type: "imageText", image: materialsImg, text: "High-traffic areas need hard-wearing surfaces such as laminates, stone and quality veneers, while feature walls and furniture can use richer finishes. Moisture-resistant boards suit kitchens and washrooms." },
      { type: "h2", text: "Think Long Term" },
      { type: "p", text: "Ask how a finish will look after five years of use, how easy it is to clean and whether it can be repaired. Sustainable and durable materials often cost less over the life of the interior." },
      { type: "quote", text: "The right material is the one that still looks right years after handover." },
    ],
  },
  {
    slug: "future-ready-office-design-trends-in-2026",
    title: "Future-Ready Office Design Trends in 2026",
    excerpt: "Discover emerging trends that are shaping the next generation of workspaces.",
    category: "Commercial Interiors",
    date: "2026-09-28",
    image: officeImg,
    readTime: 8,
    body: [
      { type: "p", text: "The modern workplace is no longer just a place to work. It is a space that influences people's health, creativity and overall performance. A well-designed office can enhance well-being, foster collaboration and reflect your brand's identity, making it a powerful tool for business growth." },
      { type: "h2", text: "1. The Changing Nature of Workspaces" },
      { type: "p", text: "With hybrid work models and evolving employee expectations, offices are now designed to be more flexible, human-centric and technology-enabled. Businesses are focusing on creating environments that support both focused work and collaborative interactions." },
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
      { type: "imageText", image: materialsImg, text: "Choosing the right materials can improve indoor air quality, reduce noise and create a visually appealing environment. Sustainable and durable materials also contribute to long-term value and a lower environmental impact." },
      { type: "h2", text: "4. Creating a Space That Reflects Your Brand" },
      { type: "p", text: "Your workspace is a physical expression of your brand. From colour schemes and finishes to layout and lighting, every element should align with your company's values and culture, leaving a lasting impression on employees and visitors." },
      { type: "quote", text: "A well-designed workspace does more than look good — it creates a healthier, happier and more productive team." },
    ],
  },
  {
    slug: "from-concept-to-completion-a-project-management-guide",
    title: "From Concept to Completion: A Project Management Guide",
    excerpt: "Key steps for a smooth and successful interior project execution.",
    category: "Project Management",
    date: "2026-09-20",
    image: projectImg,
    readTime: 6,
    body: [
      { type: "p", text: "Great interiors depend as much on execution as on design. Clear planning and communication keep a project on time, on budget and true to the original vision." },
      { type: "h2", text: "The Key Stages" },
      {
        type: "points",
        items: [
          { title: "Brief & Survey", text: "Understand requirements, site conditions and budget." },
          { title: "Design & Approvals", text: "Finalise drawings, materials and samples." },
          { title: "Production", text: "Manufacture furniture and fixtures with quality checks." },
          { title: "Installation & Handover", text: "Execute on site, snag and hand over." },
        ],
      },
      { type: "h2", text: "Keeping Everyone Aligned" },
      { type: "imageText", image: workshopImg, text: "A single point of contact, a shared schedule and regular site updates help avoid surprises. In-house manufacturing also gives better control over quality and timelines." },
      { type: "quote", text: "A well-managed project feels calm for the client, even when a lot is happening behind the scenes." },
    ],
  },
  {
    slug: "sustainable-interior-design-a-greener-tomorrow",
    title: "Sustainable Interior Design: A Greener Tomorrow",
    excerpt: "Explore eco-friendly materials and smart design strategies for better spaces.",
    category: "Trends & Innovation",
    date: "2026-09-12",
    image: sustainableImg,
    readTime: 5,
    body: [
      { type: "p", text: "Sustainable design creates healthier spaces for people and reduces the impact on the planet. It is also becoming a key expectation from customers and employees alike." },
      { type: "h2", text: "Smart Choices That Add Up" },
      {
        type: "points",
        items: [
          { title: "Low-VOC Finishes", text: "Better indoor air quality for occupants." },
          { title: "Efficient Lighting", text: "LEDs and daylight that cut energy use." },
          { title: "Durable Materials", text: "Longer life means less waste over time." },
          { title: "Greenery", text: "Plants that calm, cool and clean the air." },
        ],
      },
      { type: "h2", text: "Design for Reuse" },
      { type: "p", text: "Modular furniture and fixtures can be reconfigured or relocated instead of replaced, extending their life and reducing the cost of future changes." },
      { type: "quote", text: "Sustainable spaces are not a trend; they are simply better spaces to live and work in." },
    ],
  },
  {
    slug: "designing-elegant-and-functional-homes",
    title: "Designing Elegant and Functional Homes",
    excerpt: "Simple ideas to create beautiful, comfortable and long-lasting living spaces.",
    category: "Residential Interiors",
    date: "2026-09-08",
    image: residentialImg,
    readTime: 4,
    body: [
      { type: "p", text: "A beautiful home should also be easy to live in. The best residential interiors balance style with storage, comfort and everyday practicality." },
      { type: "h2", text: "Start with How You Live" },
      { type: "p", text: "Think about daily routines, family needs and how each room will be used. This shapes the layout, furniture sizes and storage before any finishes are chosen." },
      { type: "h2", text: "Elegance in the Details" },
      {
        type: "points",
        items: [
          { title: "Built-in Storage", text: "Wardrobes and units that keep rooms clutter-free." },
          { title: "Calm Palettes", text: "Neutral bases with warm accent materials." },
          { title: "Layered Lighting", text: "Ambient, task and decorative lights for every mood." },
          { title: "Quality Hardware", text: "Fittings that feel good and last for years." },
        ],
      },
      { type: "quote", text: "Elegance at home comes from spaces that feel effortless every single day." },
    ],
  },
  {
    slug: "the-role-of-signage-in-brand-communication",
    title: "The Role of Signage in Brand Communication",
    excerpt: "How effective signage and branding enhance visibility and customer engagement.",
    category: "Brand Environments",
    date: "2026-09-02",
    image: signageImg,
    readTime: 4,
    body: [
      { type: "p", text: "Signage is often the first point of contact between a brand and its customers. Done well, it attracts attention, guides people and reinforces brand identity." },
      { type: "h2", text: "Types of Signage That Work Together" },
      {
        type: "points",
        items: [
          { title: "Facade Signage", text: "Makes the location visible and recognisable." },
          { title: "Wayfinding", text: "Helps visitors move easily through the space." },
          { title: "Feature Walls", text: "Backlit or 3D logos that create a brand moment." },
          { title: "Promotional Displays", text: "Flexible graphics for campaigns and offers." },
        ],
      },
      { type: "h2", text: "Consistency Is Key" },
      { type: "imageText", image: kioskImg, text: "Fonts, colours and materials should match across every location and touchpoint. Consistent signage builds trust and makes the brand easier to remember." },
      { type: "quote", text: "Good signage speaks for your brand even when no one from your team is in the room." },
    ],
  },
];

// Popular list from the design; each links to the closest showcase article
export const SAMPLE_POPULAR: Pick<SampleArticle, "slug" | "title" | "date" | "image">[] = [
  { slug: "key-elements-of-a-successful-retail-store-design", title: "Trends in Retail Store Design for 2026", date: "2026-10-18", image: retailImg },
  { slug: "a-guide-to-choosing-the-right-materials", title: "Choosing the Right Materials for Commercial Interiors", date: "2026-10-12", image: sustainableImg },
  { slug: "designing-restaurants-for-memorable-dining-experiences", title: "Restaurant Design: Creating Memorable Dining Experiences", date: "2026-10-05", image: restaurantImg },
  { slug: "how-to-create-an-impactful-exhibition-stall", title: "Exhibition Stall Design That Attracts Attention", date: "2026-09-28", image: exhibitionImg },
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

export const findSampleArticle = (slug: string) => SAMPLE_ARTICLES.find((a) => a.slug === slug);
