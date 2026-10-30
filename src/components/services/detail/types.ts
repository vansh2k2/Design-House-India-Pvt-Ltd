import type { LucideIcon } from "lucide-react";
import type { StaticImageData } from "next/image";

/* Everything a service detail page (/services/<slug>) shows; one object per service in ../details.
   Optional fields pick a section's alternative look; leave them out for the default (Corporate) look. */
export interface ServiceDetail {
  slug: string;
  name: string; // breadcrumb / metadata
  servicesCrumb?: boolean; // breadcrumb includes "Our Services" (default true)
  hero: {
    eyebrow?: string; // small label above the title
    brandLogo?: { src: string; alt: string; width: number; height: number; tagline?: string }; // logo above the title
    title: [string, string]; // second line in gold
    tagline?: string;
    text: string;
    image: StaticImageData;
    primaryCta?: { label: string; href: string }; // default "Enquire Now" -> /contact
    secondaryCtaLink?: { label: string; href: string }; // default "View Projects" -> /portfolio
    photoStyle?: "fade" | "cut"; // fade: photo fades into white (default); cut: diagonal edge with a gold band
    photoWords?: string[]; // stacked on the right of the photo
    secondaryCta?: boolean; // adds an outlined "View Projects" button
    // Without text: compact card overlapping the photo. With text: a full-width strip under the banner
    features: { icon: LucideIcon; label: string; text?: string }[];
  };
  why: {
    eyebrow?: string; // default "Why Choose Us"
    layout?: "split" | "overview"; // split: edge-to-edge photo + points beside it (default); overview: inset photo, points in a row below
    title: [string, string];
    text: string;
    image: StaticImageData;
    points: { icon: LucideIcon; title: string; text: string }[];
  };
  process: {
    tone?: "white" | "warm";
    title: string;
    text: string;
    steps: { title: string; text: string }[];
  };
  projects: {
    eyebrow?: string; // default "Featured Projects"
    linkLabel?: string; // default "View All Projects"
    title: string;
    text?: string;
    linkStyle?: "button" | "text"; // "View All Projects" as a gold button (default) or a text link; text also adds arrows to the cards
    items: { title: string; place: string; image: StaticImageData }[]; // place: location, or a short description
  };
  idealFor: {
    title: string[]; // one entry per line
    text?: string;
    image?: StaticImageData; // list layout: photo on the left
    items?: string[]; // check-list layout
    tiles?: { icon: LucideIcon; label: string }[]; // icon-tile layout (no photo)
    iconTone?: "gold" | "navy"; // tile icon colour (circle stays light orange); default gold
  };
  faqs: { q: string; a: string }[];
  faqHeading?: { title: string; text: string }; // default "Quick Answers"
  faqStyle?: { numbered?: boolean; tone?: "white" | "blue" };
  ctaEyebrow?: string; // default "Let's Build Together"
  ctaTitle: [string, string]; // second part in gold
  ctaSubtitle?: string; // default "Get in touch with our team for a customized solution."
}
