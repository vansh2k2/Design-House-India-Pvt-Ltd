import { API_URL } from "./api";
import { HOME_SECTION_DEFAULTS } from "./homeSectionDefaults";

// Home page sections edited in the admin (Pages & CMS → Home), served by /api/home-sections/:key

export type SectionIcon =
  | "lightbulb"
  | "settings"
  | "users"
  | "badge-check"
  | "clock"
  | "handshake"
  | "factory"
  | "shield-check"
  | "building"
  | "trophy"
  | "map-pin";

interface Heading {
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
}

export interface WhyChooseUsContent extends Heading {
  reasons: { icon: SectionIcon; title: string; desc: string }[];
  primaryButton: { label: string; href: string };
  secondaryButton: { label: string; href: string };
  image: string;
  imageAlt: string;
  promises: { title: string; desc: string; icon: string; iconAlt: string }[];
}

export interface CapabilitiesContent extends Heading {
  image: string;
  imageAlt: string;
  stats: { icon: SectionIcon; value: string; label: string }[];
  steps: { title: string; desc: string; image: string; imageAlt: string }[];
  button: { label: string; href: string };
}

export interface ApproachContent extends Heading {
  image: string;
  imageAlt: string;
  tagline: string;
  steps: { title: string; desc: string; icon: string; iconAlt: string; image: string; imageAlt: string }[];
}

export interface FeaturedProjectsContent extends Heading {
  watermark: string;
  backgroundImage: string;
  backgroundAlt: string;
  button: { label: string; href: string };
  categories: { id: string; label: string }[];
  projects: { title: string; category: string; location: string; area: string; scope: string; href: string; image: string; imageAlt: string }[];
}

export interface StrengthsContent {
  eyebrow: string;
  heading: string;
  description: string;
  image: string;
  imageAlt: string;
  cards: { title: string; tagline: string; icon: SectionIcon; image: string; imageAlt: string; points: string[] }[];
  stats: { icon: SectionIcon; value: string; label: string }[];
  cta: { eyebrow: string; heading: string; text: string; buttonLabel: string; buttonHref: string };
}

export interface TestimonialsHeadingContent extends Heading {
  button: { label: string; href: string };
}

export interface FaqsContent extends Heading {
  image: string;
  imageAlt: string;
  help: { title: string; text: string; buttonLabel: string; buttonHref: string };
  faqs: { question: string; answer: string }[];
}

export interface GetInTouchContent extends Heading {
  image: string;
  imageAlt: string;
  callTitle: string;
  phones: string[];
  emailTitle: string;
  email: string;
  offices: { title: string; place: string; href: string }[];
  presenceTitle: string;
  presence: { icon: string; iconAlt: string; shape: "square" | "wide"; title: string; place: string }[];
  form: { title: string; highlight: string; subtitle: string; projectTypes: string[]; buttonLabel: string };
}

export interface FooterContent {
  cta: { eyebrow: string; title: string; highlight: string; description: string; buttonLabel: string; buttonHref: string; image: string; imageAlt: string };
  logo: string;
  logoAlt: string;
  about: string;
  bgImage: string;
  bgImageAlt: string;
  callTitle: string;
  phones: string[];
  quickLinksTitle: string;
  quickLinks: { label: string; href: string }[];
  solutionsTitle: string;
  solutions: { icon: string; iconAlt: string; label: string; href: string }[];
  officesTitle: string;
  email: string;
  offices: { title: string; place: string; lines: string[] }[];
  presenceTitle: string;
  map: string;
  mapAlt: string;
  cities: string[];
  moreCitiesText: string;
  stats: { icon: string; iconAlt: string; value: string; label: string }[];
  social: { facebook: string; instagram: string; twitter: string; youtube: string; linkedin: string };
  copyright: string;
  rightsText: string;
}

export interface HomeSectionsContent {
  "why-choose-us": WhyChooseUsContent;
  capabilities: CapabilitiesContent;
  approach: ApproachContent;
  "featured-projects": FeaturedProjectsContent;
  strengths: StrengthsContent;
  testimonials: TestimonialsHeadingContent;
  faqs: FaqsContent;
  "get-in-touch": GetInTouchContent;
  footer: FooterContent;
}

/** Server-side: one section's saved content (refreshed every 30 s), or its defaults. */
export async function fetchHomeSection<K extends keyof HomeSectionsContent>(key: K): Promise<HomeSectionsContent[K]> {
  try {
    const res = await fetch(`${API_URL}/api/home-sections/${key}`, { next: { revalidate: 30 } });
    const json = await res.json();
    const content = json?.success ? json.data?.content : null;
    return content && typeof content === "object" ? (content as HomeSectionsContent[K]) : HOME_SECTION_DEFAULTS[key];
  } catch {
    return HOME_SECTION_DEFAULTS[key];
  }
}

export { HOME_SECTION_DEFAULTS };
