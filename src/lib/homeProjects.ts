import { API_URL } from "./api";

// Home "Our Projects" section, edited in the admin (Pages & CMS → Home → Our Projects), served by /api/home-projects

export interface HomeProject {
  title: string;
  subtitle: string;
  category: string;
  href: string;
  image: string;
  imageAlt: string;
}

export interface HomeProjectsContent {
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  button: { label: string; href: string };
  badge: { title: string; text: string };
  categories: { id: string; label: string }[];
  projects: HomeProject[];
}

const img = (path: string) => `https://res.cloudinary.com/dqbjxbk6m/image/upload/${path}`;
const project = (title: string, subtitle: string, category: string, href: string, path: string, imageAlt: string): HomeProject => ({
  title,
  subtitle,
  category,
  href,
  image: img(path),
  imageAlt,
});

// Used if the backend can't be reached (same content as the backend's defaults)
export const DEFAULT_HOME_PROJECTS: HomeProjectsContent = {
  eyebrow: "Our Projects",
  title: "Spaces We Have",
  highlight: "Brought to Life",
  description:
    "From retail and corporate interiors to exhibition stalls and kiosks, explore some of our recently completed projects for leading brands across India.",
  button: { label: "View All Projects", href: "/projects" },
  badge: { title: "Diverse Industries", text: "Retail | Corporate | F&B | Exhibition | Kiosks | Branding" },
  categories: [
    { id: "retail", label: "Retail Showroom" },
    { id: "corporate", label: "Corporate Interiors" },
    { id: "restaurant", label: "Restaurant Interiors" },
    { id: "exhibition", label: "Exhibition Stalls" },
    { id: "kiosk", label: "Retail Kiosks" },
    { id: "signage", label: "Signage & Branding" },
  ],
  projects: [
    project("Luxury Retail Showroom", "Retail Interiors", "retail", "/services/retail-interior", "v1793443924/design-house/our-projects/project-b1.webp", "Luxury retail showroom interior by Design House India"),
    project("Corporate Office Interior", "Corporate Interiors", "corporate", "/services/corporate-interior", "v1793443925/design-house/our-projects/project-b2.webp", "Corporate office interior by Design House India"),
    project("Fine Dine Restaurant", "Restaurant Interiors", "restaurant", "/services/restaurant-interior", "v1793443927/design-house/our-projects/project-b3.webp", "Fine dine restaurant interior by Design House India"),
    project("Exhibition Stall", "Stall Design & Build", "exhibition", "/services/exhibitions", "v1793443928/design-house/our-projects/project-b4.webp", "Exhibition stall designed and built by Design House India"),
    project("Retail Kiosk", "Retail Kiosk Design & Manufacturing", "kiosk", "/services/retail-kiosk", "v1793443929/design-house/our-projects/project-b5.webp", "Retail kiosk manufactured by Design House India"),
    project("Signage & Branding", "Signage Solutions", "signage", "/services/signage", "v1793443930/design-house/our-projects/project-b6.webp", "Signage and branding by Design House India"),
    project("Premium Flagship Store", "Retail Interiors", "retail", "/services/retail-interior", "v1793443931/design-house/our-projects/project-c1.webp", "Premium flagship store by Design House India"),
    project("Tech Innovation Hub", "Corporate Interiors", "corporate", "/services/corporate-interior", "v1793443933/design-house/our-projects/project-c2.webp", "Tech workspace interior by Design House India"),
    project("Artisan Cafe & Bistro", "Restaurant Interiors", "restaurant", "/services/restaurant-interior", "v1793443934/design-house/our-projects/project-c3.webp", "Cafe and bistro interior by Design House India"),
    project("Global Expo Pavilion", "Stall Design & Build", "exhibition", "/services/exhibitions", "v1793443935/design-house/our-projects/project-1.webp", "Expo pavilion by Design House India"),
    project("Modular Mall Display Unit", "Retail Kiosks", "kiosk", "/services/retail-kiosk", "v1793443936/design-house/our-projects/project-2.webp", "Modular mall display unit by Design House India"),
    project("Architectural Neon & LED Signage", "Signage Solutions", "signage", "/services/signage", "v1793443937/design-house/our-projects/project-3.webp", "Neon and LED signage by Design House India"),
  ],
};

/** Server-side: the saved section (refreshed every 30 s), or the defaults. */
export async function fetchHomeProjects(): Promise<HomeProjectsContent> {
  try {
    const res = await fetch(`${API_URL}/api/home-projects`, { next: { revalidate: 30 } });
    const json = await res.json();
    return json?.success && json.data && Array.isArray(json.data.projects) ? (json.data as HomeProjectsContent) : DEFAULT_HOME_PROJECTS;
  } catch {
    return DEFAULT_HOME_PROJECTS;
  }
}
