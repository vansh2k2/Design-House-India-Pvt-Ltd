import type { LucideIcon } from "lucide-react";
import type { StaticImageData } from "next/image";

import type { CorporateDesign } from "../corporate/types";

type ShowcaseStat = { icon: LucideIcon; value: string; label: string }; // a line break in the label is kept

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
    // Showcase banner (ServiceShowcaseHero): text beside the photo, then a row of photos and one figure.
    // It also uses eyebrow, title, tagline, text, image, photoWords, features and the buttons above.
    showcase?: {
      layout?: "photo-left" | "photo-right-cut" | "photo-right-band" | "photo-right-cut-navy" | "photo-left-cut-navy" | "photo-right-slant-navy" | "photo-right-slant-stats" | "photo-right-edge-captions" | "photo-left-edge-captions" | "photo-left-wedge-captions"; // default photo-left; see ServiceShowcaseHero
      number?: string; // beside the eyebrow, e.g. "01" (photo-left only)
      imageAlt: string;
      gallery: { image: StaticImageData; alt: string; caption?: string }[];
      stat: ShowcaseStat;
      moreStats?: ShowcaseStat[]; // shown in a row with stat (photo-right-slant-stats)
    };
    // Banner with the text on the photo (ServiceBannerHero), and a strip of figures below it. The photo must have
    // the navy of that banner on its left, for the text. It also uses the fields above, except photoWords.
    banner?: {
      imageAlt: string;
      stats: ShowcaseStat[];
    };
  };
  why: {
    eyebrow?: string; // default "Why Choose Us"
    layout?: "split" | "overview" | "banner"; // split: edge-to-edge photo + points beside it (default); overview: inset photo, points in a row below; banner: text on an image, inside the page's margins
    title: [string, string];
    text: string;
    image: StaticImageData;
    points: { icon: LucideIcon; title: string; text: string }[];
    buttons?: { primary: { label: string; href: string }; secondary: { label: string; href: string } }; // banner layout
    bannerTextEnd?: string; // banner layout: where the image's picture begins, as a share of its width (default 46%)
  };
  // "What We Offer" (ServiceOffer): a row of six cards after why. The images hold their own icon and rounded corners.
  offer?: {
    eyebrow: string;
    title: [string, string]; // second part in orange
    text: string;
    items: { title: string; text: string; image: StaticImageData; alt: string; href: string; icon?: LucideIcon }[]; // icon: drawn on a photo without one
  };
  // "Core Benefits" (ServiceBenefits): six frosted cards and a button, over a soft photo, after offer
  benefits?: {
    eyebrow: string;
    title: [string, string]; // second part in orange
    text: string;
    image: StaticImageData;
    imageReady?: boolean; // the image already has its soft, light middle, so it isn't blurred or lightened
    items: { icon: LucideIcon; title: string; text: string }[];
    cta: { label: string; href: string };
  };
  process: {
    tone?: "white" | "warm";
    layout?: "cards"; // cards: a card per step with a photo (ServiceProcessCards)
    title: string;
    titleAccent?: string; // cards layout: after the title, in orange
    text: string;
    steps: { title: string; text: string; image?: StaticImageData; icon?: LucideIcon }[];
  };
  projects: {
    eyebrow?: string; // default "Featured Projects"
    linkLabel?: string; // default "View All Projects"
    title: string;
    titleAccent?: string; // cards layout: after the title, in orange
    text?: string;
    linkStyle?: "button" | "text"; // "View All Projects" as a gold button (default) or a text link; text also adds arrows to the cards
    layout?: "cards"; // cards: rounded cards with an icon on the photo (ServiceProjectCards)
    items: { title: string; place: string; image: StaticImageData; icon?: LucideIcon }[]; // place: location, or a short description
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
  faqStyle?: { numbered?: boolean; tone?: "white" | "blue"; image?: StaticImageData; textFrom?: string; compact?: boolean }; // image: the questions on its free right side (ServiceFaqsImage); compact: a shorter section
  hideIdealFor?: boolean;
  separators?: boolean; // a thin line between the sections after the banner (SectionSeparator.tsx)
  look?: "home"; // home: the home page's headings, colours, buttons and card hover on the newer sections (homeLook.tsx)
  corporate?: CorporateDesign; // a page of its own design (../corporate/CorporatePage) in place of the sections above
  ctaEyebrow?: string; // default "Let's Build Together"
  ctaTitle: [string, string]; // second part in gold
  ctaSubtitle?: string; // default "Get in touch with our team for a customized solution."
}
