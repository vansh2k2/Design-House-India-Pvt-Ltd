import {
  Armchair,
  Layers,
  Lightbulb,
  Presentation,
  Settings,
  ShoppingBag,
  Sofa,
  UtensilsCrossed,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const ALL_CATEGORY = "All Articles";

// Category tiles under the banner; a tile filters blogs whose category matches its label exactly
export const BLOG_CATEGORIES: { label: string; icon: LucideIcon }[] = [
  { label: ALL_CATEGORY, icon: Armchair },
  { label: "Interior Design", icon: Sofa },
  { label: "Retail Environments", icon: ShoppingBag },
  { label: "Restaurant & Hospitality", icon: UtensilsCrossed },
  { label: "Exhibition Stalls", icon: Presentation },
  { label: "Materials & Finishes", icon: Layers },
  { label: "Trends & Innovation", icon: Lightbulb },
  { label: "Project Management", icon: Settings },
];

export const ARTICLES_PER_PAGE = 9;

// true: every blog's detail page shows the fixed design content (data/demoDetail.ts) and no backend data.
// Set to false to show each blog's real content from the admin panel again.
export const USE_DEMO_BLOG_DETAIL = true;
