import { API_URL } from "./api";

// Home "What We Do" section, edited in the admin (Pages & CMS → Home → What We Do), served by /api/home-what-we-do

export interface WhatWeDoService {
  title: string;
  desc: string;
  href: string;
  image: string;
  imageAlt: string;
  icon: string;
  iconAlt: string;
}

export interface WhatWeDoStat {
  value: number;
  suffix: string;
  label: string;
  icon: "trophy" | "layers" | "cog";
}

export interface WhatWeDoContent {
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  button: { label: string; href: string };
  services: WhatWeDoService[];
  stats: WhatWeDoStat[];
  industriesTitle: string;
  industries: string[];
}

const img = (path: string) => `https://res.cloudinary.com/dqbjxbk6m/image/upload/${path}`;

// Used if the backend can't be reached (same content as the backend's defaults)
export const DEFAULT_WHAT_WE_DO: WhatWeDoContent = {
  eyebrow: "What We Do",
  title: "Turnkey Spaces for",
  highlight: "Every Business",
  description:
    "From concept to creation, we design and build impactful spaces that enhance your brand, engage your customers and deliver real business value.",
  button: { label: "View All Services", href: "/services" },
  services: [
    { title: "Corporate Interiors", desc: "Workspaces that inspire performance.", href: "/services/corporate-interior", image: img("v1793442707/design-house/what-we-do/card-t1.webp"), imageAlt: "Corporate office interior by Design House India", icon: img("v1793442714/design-house/what-we-do/icon-z1.png"), iconAlt: "Corporate Interiors icon" },
    { title: "Retail Showroom Interiors", desc: "Engaging spaces that drive sales.", href: "/services/retail-interior", image: img("v1793442709/design-house/what-we-do/card-t3.webp"), imageAlt: "Retail showroom interior by Design House India", icon: img("v1793442715/design-house/what-we-do/icon-z2.png"), iconAlt: "Retail Showroom Interiors icon" },
    { title: "Restaurant Interiors", desc: "Inviting spaces for memorable experiences.", href: "/services/restaurant-interior", image: img("v1793442708/design-house/what-we-do/card-t2.webp"), imageAlt: "Restaurant interior by Design House India", icon: img("v1793442716/design-house/what-we-do/icon-z3.png"), iconAlt: "Restaurant Interiors icon" },
    { title: "Exhibition Stall Design & Build", desc: "Custom stalls that make your brand stand out.", href: "/services/exhibitions", image: img("v1793442711/design-house/what-we-do/card-t4.webp"), imageAlt: "Exhibition stall designed and built by Design House India", icon: img("v1793442717/design-house/what-we-do/icon-z4.png"), iconAlt: "Exhibition Stall Design & Build icon" },
    { title: "Retail Kiosks", desc: "Compact, high-impact brand spaces.", href: "/services/retail-kiosk", image: img("v1793442713/design-house/what-we-do/card-t6.webp"), imageAlt: "Retail kiosk by Design House India", icon: img("v1793442718/design-house/what-we-do/icon-z5.png"), iconAlt: "Retail Kiosks icon" },
    { title: "Signage & Branding", desc: "Visually strong brand presence.", href: "/services/signage", image: img("v1793442712/design-house/what-we-do/card-t5.webp"), imageAlt: "Signage and branding by Design House India", icon: img("v1793442719/design-house/what-we-do/icon-z6.png"), iconAlt: "Signage & Branding icon" },
  ],
  stats: [
    { value: 21, suffix: "+", label: "Years of Experience", icon: "trophy" },
    { value: 5000, suffix: "+", label: "Projects Delivered", icon: "layers" },
    { value: 10, suffix: "+", label: "Industry Categories", icon: "cog" },
  ],
  industriesTitle: "Industries We Serve",
  industries: ["Corporate", "Retail", "Hospitality", "Healthcare", "Education", "Exhibition", "Wellness", "Government", "and More..."],
};

/** Server-side: the saved section (refreshed every 30 s), or the defaults. */
export async function fetchHomeWhatWeDo(): Promise<WhatWeDoContent> {
  try {
    const res = await fetch(`${API_URL}/api/home-what-we-do`, { next: { revalidate: 30 } });
    const json = await res.json();
    return json?.success && json.data ? (json.data as WhatWeDoContent) : DEFAULT_WHAT_WE_DO;
  } catch {
    return DEFAULT_WHAT_WE_DO;
  }
}
