import { API_URL } from "./api";

// Home page hero, edited in the admin (Pages & CMS → Home → Hero Carousel Slides), served by /api/home-hero

export type HeroSlideIcon = "retail" | "corporate" | "restaurant" | "exhibition" | "kiosks" | "signage";

export interface HeroSlide {
  icon: HeroSlideIcon;
  label: string; // right-hand service list (new line = next line)
  href: string;
  image: string;
  imageAlt: string;
  tagline: string[];
  title1: string;
  title2: string;
  desc: string;
  buttonText: string;
}

export interface HeroBottomService {
  label: string;
  href: string;
  icon: string;
  iconAlt: string;
}

export interface HomeHeroContent {
  slides: HeroSlide[];
  secondaryButton: { label: string; href: string };
  bottomServices: HeroBottomService[];
}

const CDN = "https://res.cloudinary.com/dqbjxbk6m/image/upload";
const HERO_2 = `${CDN}/v1793442065/design-house/home-hero/hero-2.webp`;
const HERO_3 = `${CDN}/v1793442067/design-house/home-hero/hero-3.webp`;
const TAGLINE = ["Design", "Manufacturing", "Execution"];

// Used if the backend can't be reached (same content as the backend's defaults)
export const DEFAULT_HOME_HERO: HomeHeroContent = {
  slides: [
    { icon: "retail", label: "Retail\nShowroom\nInteriors", href: "/services/retail-interior", image: HERO_2, imageAlt: "Retail showroom interiors by Design House India", tagline: TAGLINE, title1: "Spaces That", title2: "Build Brands", desc: "Design House India Private Limited is a premier manufacturer of retail display solutions with nationwide reach. End-to-end interior, display and fit-out solutions across India.", buttonText: "Discuss Retail Project" },
    { icon: "corporate", label: "Corporate\nInteriors", href: "/services/corporate-interior", image: HERO_3, imageAlt: "Corporate office interiors by Design House India", tagline: TAGLINE, title1: "Workspaces That", title2: "Inspire Success", desc: "We design modern corporate office interiors that enhance workplace productivity and reinforce brand identity through turnkey design, manufacturing, and fit-out solutions across India.", buttonText: "Discuss Corporate Interiors" },
    { icon: "restaurant", label: "Restaurant\nInteriors", href: "/services/restaurant-interior", image: HERO_2, imageAlt: "Restaurant and hospitality interiors by Design House India", tagline: TAGLINE, title1: "Ambiances That", title2: "Delight Guests", desc: "We create luxury restaurant and hospitality interiors that delight guests, maximize seating efficiency, and elevate dining ambiances through bespoke turnkey craftsmanship across India.", buttonText: "Discuss Restaurant Design" },
    { icon: "exhibition", label: "Exhibition Stall\nManufacturing", href: "/services/exhibitions", image: HERO_3, imageAlt: "Exhibition stall design and manufacturing by Design House India", tagline: TAGLINE, title1: "Exhibits That", title2: "Command Attention", desc: "We engineer custom trade show booths and exhibition stalls that maximize visitor engagement, command visual attention, and deliver high-impact turnkey presence at major expos across India.", buttonText: "Explore Exhibition Stalls" },
    { icon: "kiosks", label: "Retail\nKiosks", href: "/services/retail-kiosk", image: HERO_2, imageAlt: "Retail kiosks by Design House India", tagline: TAGLINE, title1: "Kiosks That", title2: "Drive Footfall", desc: "We manufacture bespoke turnkey retail kiosks and modular display units designed for premier malls and transit hubs to maximize visual merchandising, engagement, and sales across India.", buttonText: "Explore Retail Kiosks" },
    { icon: "signage", label: "Signage &\nBranding", href: "/services/signage", image: HERO_3, imageAlt: "Signage and branding by Design House India", tagline: TAGLINE, title1: "Identities That", title2: "Stand Apart", desc: "We manufacture architectural signage, illuminated facades, and high-visibility branding displays that make your business instantly recognizable and trusted across India.", buttonText: "Discuss Signage & Branding" },
  ],
  secondaryButton: { label: "Get A Free Consultation", href: "/contact" },
  bottomServices: [
    { label: "Design\nConsultancy", href: "/services/retail-interior", icon: `${CDN}/v1793442068/design-house/home-hero/icon-h1.png`, iconAlt: "Design consultancy" },
    { label: "In-house\nManufacturing", href: "/services/retail-kiosk", icon: `${CDN}/v1793442069/design-house/home-hero/icon-h2.png`, iconAlt: "In-house manufacturing" },
    { label: "Turnkey\nExecution", href: "/services/corporate-interior", icon: `${CDN}/v1793442070/design-house/home-hero/icon-h3.png`, iconAlt: "Turnkey execution" },
    { label: "Pan India\nPresence", href: "/services/exhibitions", icon: `${CDN}/v1793442071/design-house/home-hero/icon-h4.png`, iconAlt: "Pan India presence" },
    { label: "On-time\nDelivery", href: "/services", icon: `${CDN}/v1793442072/design-house/home-hero/icon-h5.png`, iconAlt: "On-time delivery" },
    { label: "Dedicated\nSupport", href: "/contact", icon: `${CDN}/v1793442073/design-house/home-hero/icon-h6.png`, iconAlt: "Dedicated support" },
  ],
};

/** Server-side: the saved hero (refreshed every 30 s), or the defaults. */
export async function fetchHomeHero(): Promise<HomeHeroContent> {
  try {
    const res = await fetch(`${API_URL}/api/home-hero`, { next: { revalidate: 30 } });
    const json = await res.json();
    const data = json?.success ? (json.data as HomeHeroContent) : null;
    return data && Array.isArray(data.slides) && data.slides.length > 0 ? data : DEFAULT_HOME_HERO;
  } catch {
    return DEFAULT_HOME_HERO;
  }
}
