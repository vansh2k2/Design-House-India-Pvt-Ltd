import { API_URL } from "./api";
import { SERVICES, type Service } from "@/components/services/data";
import { SERVICE_DETAILS, getServiceDetail } from "@/components/services/details";
import type { ServiceDetail } from "@/components/services/detail/types";
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Armchair,
  BadgeCheck,
  Box,
  Boxes,
  Building,
  Building2,
  Car,
  ChefHat,
  Clock,
  Coffee,
  Cpu,
  Diamond,
  Dumbbell,
  Factory,
  Flower2,
  Gem,
  GraduationCap,
  Hammer,
  Headset,
  HeartPulse,
  Home,
  Hospital,
  Hotel,
  Lamp,
  Laptop,
  Layers,
  LayoutDashboard,
  LayoutGrid,
  LayoutPanelTop,
  Leaf,
  Lightbulb,
  Monitor,
  Palette,
  PencilRuler,
  Pill,
  Presentation,
  Ruler,
  Settings,
  Shapes,
  ShieldCheck,
  Shirt,
  ShoppingBag,
  ShoppingCart,
  SignpostBig,
  Smartphone,
  Sofa,
  Sparkles,
  Store,
  Utensils,
  UtensilsCrossed,
  Wine,
  Wrench,
  Users,
} from "lucide-react";

export const ICON_MAP: Record<string, LucideIcon> = {
  Activity,
  Armchair,
  BadgeCheck,
  Box,
  Boxes,
  Building,
  Building2,
  Car,
  ChefHat,
  Clock,
  Coffee,
  Cpu,
  Diamond,
  Dumbbell,
  Factory,
  Flower2,
  Gem,
  GraduationCap,
  Hammer,
  Headset,
  HeartPulse,
  Home,
  Hospital,
  Hotel,
  Lamp,
  Laptop,
  Layers,
  LayoutDashboard,
  LayoutGrid,
  LayoutPanelTop,
  Leaf,
  Lightbulb,
  Monitor,
  Palette,
  PencilRuler,
  Pill,
  Presentation,
  Ruler,
  Settings,
  Shapes,
  ShieldCheck,
  Shirt,
  ShoppingBag,
  ShoppingCart,
  SignpostBig,
  Smartphone,
  Sofa,
  Sparkles,
  Store,
  Utensils,
  UtensilsCrossed,
  Wine,
  Wrench,
  Users,
};

export const resolveLucideIcon = (icon: unknown, fallback: LucideIcon): LucideIcon => {
  if (typeof icon === "function") return icon as LucideIcon;
  if (typeof icon === "string" && ICON_MAP[icon]) return ICON_MAP[icon];
  return fallback;
};

export interface PublicServiceItem {
  _id?: string;
  title: string;
  desc: string;
  image: any;
  logo?: string;
  href: string;
  number?: string;
}

/**
 * Fetch all published services for the /services page grid.
 * Falls back to local SERVICES data if backend is unreachable.
 */
export async function fetchPublicServices(): Promise<PublicServiceItem[]> {
  try {
    const res = await fetch(`${API_URL}/api/featured-services/public`, {
      next: { revalidate: 10 },
    });
    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.services) && json.services.length > 0) {
        return json.services.map((c: any, i: number) => {
          const fallbackImg = SERVICES[i % SERVICES.length]?.image;
          const isUploadedCustom = c.image && !c.image.startsWith("/services/os") && !c.image.startsWith("services/os");
          return {
            _id: c._id,
            title: c.title,
            desc: c.description || "",
            image: isUploadedCustom ? c.image : (fallbackImg || c.image),
            logo: c.logo || "",
            href: c.buttonUrl || "/portfolio",
            number: c.number || String(i + 1).padStart(2, "0"),
          };
        });
      }
    }
  } catch (err) {
    // Graceful fallback to static data
  }

  return SERVICES.map((s, i) => ({
    title: s.title,
    desc: s.desc,
    image: s.image,
    logo: s.logo,
    href: s.href || "/portfolio",
    number: String(i + 1).padStart(2, "0"),
  }));
}

/**
 * Fetch a single service detail by slug for /services/[slug].
 * Merges backend MongoDB data with local static definitions.
 */
// The seeded addresses are files in the admin's public folder, which this website doesn't have: use its own
// copy of the photo for those. Anything else (a photo uploaded in the admin) is used as it is.
const uploadedImage = (image: any): any => (image && !/^\/?(services\/detail|assets\/image)\//.test(image) ? image : null);

// The seed script saved fewer projects for some pages, with no photos of their own, which left holes in the row:
// those pages keep their own list. Once a project photo has been uploaded in the admin, what's saved is used as it is.
const isSeededShortList = (saved: any[], own: unknown[]) => saved.length < own.length && !saved.some((item) => uploadedImage(item.image));

export async function fetchServiceDetail(slug: string): Promise<ServiceDetail | null> {
  const fallback = getServiceDetail(slug);

  try {
    const res = await fetch(`${API_URL}/api/featured-services/slug/${encodeURIComponent(slug)}`, {
      next: { revalidate: 10 },
    });

    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) {
        const backendCard = json.data;
        const detail = backendCard.detail;

        if (detail && fallback) {
          // Fetch FAQs for this service from backend FAQs collection if available
          let serviceFaqs = fallback.faqs;
          try {
            const cleanSlug = slug.replace(/^\/services\//, "").replace(/\/$/, "");
            const faqRes = await fetch(`${API_URL}/api/faqs/by-service/${encodeURIComponent(cleanSlug)}`, {
              next: { revalidate: 10 },
            });
            if (faqRes.ok) {
              const faqJson = await faqRes.json();
              if (faqJson.success && Array.isArray(faqJson.data) && faqJson.data.length > 0) {
                serviceFaqs = faqJson.data.map((f: any) => ({ q: f.q, a: f.a }));
              }
            }
          } catch {
            // fallback
          }

          // Merge backend detail into local fallback, preserving images and icon functions where needed
          return {
            ...fallback,
            name: detail.name || backendCard.title || fallback.name,
            // A designed banner (hero.showcase) keeps its own words and photos: its layout needs imported
            // images, and the older hero in the database would replace them with other text and photos
            hero: fallback.hero.showcase ? fallback.hero : {
              ...fallback.hero,
              eyebrow: detail.hero?.eyebrow ?? fallback.hero.eyebrow,
              photoStyle: detail.hero?.photoStyle ?? fallback.hero.photoStyle,
              title: Array.isArray(detail.hero?.title) && detail.hero.title.length === 2
                ? detail.hero.title
                : fallback.hero.title,
              tagline: detail.hero?.tagline ?? fallback.hero.tagline,
              text: detail.hero?.text ?? fallback.hero.text,
              image: detail.hero?.image ? (detail.hero.image as any) : fallback.hero.image,
              photoWords: detail.hero?.photoWords ?? fallback.hero.photoWords,
              secondaryCta: detail.hero?.secondaryCta ?? fallback.hero.secondaryCta,
              features: Array.isArray(detail.hero?.features)
                ? detail.hero.features.map((f: any, idx: number) => {
                    const fallbackIcon = fallback.hero.features[idx]?.icon || Sparkles;
                    return {
                      label: f.label || "",
                      text: f.text || "",
                      icon: resolveLucideIcon(f.icon, fallbackIcon),
                    };
                  })
                : fallback.hero.features,
            },
            why: {
              ...fallback.why,
              eyebrow: detail.why?.eyebrow ?? fallback.why.eyebrow,
              layout: detail.why?.layout ?? fallback.why.layout,
              title: Array.isArray(detail.why?.title) && detail.why.title.length === 2
                ? detail.why.title
                : fallback.why.title,
              text: detail.why?.text ?? fallback.why.text,
              image: uploadedImage(detail.why?.image) ?? fallback.why.image,
              points: Array.isArray(detail.why?.points)
                ? detail.why.points.map((p: any, idx: number) => {
                    const fallbackIcon = fallback.why.points[idx]?.icon || ShieldCheck;
                    return {
                      title: p.title || "",
                      text: p.text || "",
                      icon: resolveLucideIcon(p.icon, fallbackIcon),
                    };
                  })
                : fallback.why.points,
            },
            process: {
              ...fallback.process,
              tone: detail.process?.tone ?? fallback.process.tone,
              title: detail.process?.title ?? fallback.process.title,
              text: detail.process?.text ?? fallback.process.text,
              steps: Array.isArray(detail.process?.steps) ? detail.process.steps : fallback.process.steps,
            },
            projects: {
              ...fallback.projects,
              eyebrow: detail.projects?.eyebrow ?? fallback.projects.eyebrow,
              linkLabel: detail.projects?.linkLabel ?? fallback.projects.linkLabel,
              title: detail.projects?.title ?? fallback.projects.title,
              text: detail.projects?.text ?? fallback.projects.text,
              linkStyle: detail.projects?.linkStyle ?? fallback.projects.linkStyle,
              items: Array.isArray(detail.projects?.items) && detail.projects.items.length > 0 && !isSeededShortList(detail.projects.items, fallback.projects.items)
                ? detail.projects.items.map((it: any, idx: number) => ({
                    title: it.title || "",
                    place: it.place || "",
                    image: uploadedImage(it.image) ?? fallback.projects.items[idx]?.image ?? fallback.hero.image,
                  }))
                : fallback.projects.items,
            },
            idealFor: {
              ...fallback.idealFor,
              title: Array.isArray(detail.idealFor?.title) ? detail.idealFor.title : fallback.idealFor.title,
              text: detail.idealFor?.text ?? fallback.idealFor.text,
              tiles: Array.isArray(detail.idealFor?.tiles)
                ? detail.idealFor.tiles.map((t: any, idx: number) => {
                    const fallbackIcon = fallback.idealFor.tiles?.[idx]?.icon || Building2;
                    return {
                      label: t.label || "",
                      icon: resolveLucideIcon(t.icon, fallbackIcon),
                    };
                  })
                : fallback.idealFor.tiles,
            },
            faqs: serviceFaqs.length > 0 ? serviceFaqs : (Array.isArray(detail.faqs) && detail.faqs.length > 0 ? detail.faqs : fallback.faqs),
            ctaEyebrow: detail.ctaEyebrow ?? fallback.ctaEyebrow,
            ctaTitle: Array.isArray(detail.ctaTitle) && detail.ctaTitle.length === 2
              ? detail.ctaTitle
              : fallback.ctaTitle,
            ctaSubtitle: detail.ctaSubtitle ?? fallback.ctaSubtitle,
          };
        }
      }
    }
  } catch (err) {
    // Fall back to local seed
  }

  return fallback || null;
}
