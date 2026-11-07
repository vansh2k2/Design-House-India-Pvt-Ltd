import type { LucideIcon } from "lucide-react";
import type { StaticImageData } from "next/image";

/* The Corporate Interiors page's own sections (CorporatePage), set as `corporate` in its details file.
   The banner text, features and buttons still come from hero, and the questions from faqs. */
export interface CorporateDesign {
  // Full-width navy banner: text over the background photo, then a strip of figures
  banner: {
    background: StaticImageData; // already fades to navy on the left, where the text sits
    imageAlt: string;
    textShade?: boolean; // a navy shade further onto the photo, for a photo that is bright where the text runs onto it
    compactText?: boolean; // a slightly smaller tagline and text, for a longer text, so the banner keeps its height
    lastFeatureShade?: boolean; // a soft navy shade behind the last feature, for a photo that is bright where it sits
    stats: { icon: LucideIcon; value: string; label: string }[];
  };
  // Text, a row of points and two buttons on the left, the photo (with its own curved edge) on the right
  overview: {
    eyebrow: string;
    title: [string, string]; // second line in orange italic
    smallTitle?: boolean; // a little smaller, for a longer title
    offerEdge?: boolean; // the text starts at the left edge of the "What We Offer" cards
    text: string;
    image: StaticImageData;
    points: { icon: LucideIcon; title: string }[]; // a line break in the title is kept
    buttons: { primary: { label: string; href: string }; secondary: { label: string; href: string } };
  };
  // "What We Offer" cards
  offer: {
    eyebrow?: string; // default "What We Offer"
    title: [string, string]; // second part in orange
    text: string;
    items: { image: StaticImageData; icon: LucideIcon; title: string; text: string; href?: string }[]; // href default /contact
    tallPhotos?: boolean; // a taller photo (7:5) with the text below closer together, so the cards keep their height
  };
  // "Why Choose Us" cards over a photo
  benefits: {
    eyebrow?: string; // default "Core Benefits"
    title: [string, string]; // second part in orange
    text: string;
    items: { icon: LucideIcon; title: string; text: string }[];
    cta?: { label: string; href: string };
    background?: StaticImageData; // the photo behind the cards; default the Corporate page's
    noShade?: boolean; // shows the photo as it is, without the white shade over it
    wide?: boolean; // a wider row of cards, so longer titles stay on one line
  };
  // "Our Process" photo cards
  process: {
    eyebrow?: string; // default "Our Process"
    title: [string, string]; // second part in orange
    text: string;
    steps: { image: StaticImageData; icon: LucideIcon; title: string; text: string }[]; // a line break in the title is kept
  };
  // Featured project cards
  featured: {
    eyebrow?: string; // default "Featured Corporate"
    title: [string, string]; // first part bold orange, second light
    text: string;
    items: { image: StaticImageData; icon: LucideIcon; title: string; tags: string[]; href?: string }[]; // href default: corporate portfolio
  };
  faqPhoto: StaticImageData; // beside the questions
  ownFaqs?: boolean; // always shows the FAQs in the details file, not the ones saved in the admin
}
