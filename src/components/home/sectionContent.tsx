import { Fragment, type ReactNode } from "react";
import {
  BadgeCheck,
  Building2,
  Clock,
  Factory,
  Handshake,
  Lightbulb,
  MapPin,
  Settings,
  ShieldCheck,
  Trophy,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { SectionIcon } from "@/lib/homeSections";

// Icons the admin can choose for cards and stats
export const SECTION_ICONS: Record<SectionIcon, LucideIcon> = {
  lightbulb: Lightbulb,
  settings: Settings,
  users: Users,
  "badge-check": BadgeCheck,
  clock: Clock,
  handshake: Handshake,
  factory: Factory,
  "shield-check": ShieldCheck,
  building: Building2,
  trophy: Trophy,
  "map-pin": MapPin,
};

export const sectionIcon = (key: string): LucideIcon => SECTION_ICONS[key as SectionIcon] ?? Lightbulb;

/**
 * Text from the admin: a new line starts the next line and *words* are wrapped by `accent`
 * (e.g. an orange span).
 */
export function RichText({ text, accent }: { text: string; accent: (part: string, key: number) => ReactNode }) {
  return (
    <>
      {text.split("\n").map((line, i) => (
        <Fragment key={i}>
          {i > 0 && <br />}
          {line.split(/(\*[^*]+\*)/g).map((part, j) =>
            /^\*[^*]+\*$/.test(part) ? accent(part.slice(1, -1), j) : <Fragment key={j}>{part}</Fragment>
          )}
        </Fragment>
      ))}
    </>
  );
}

/** "25,000+" → { end: 25000, suffix: "+" }; values without a leading number (e.g. "Pan India") → null */
export const parseStat = (value: string): { end: number; suffix: string } | null => {
  const match = value.trim().match(/^([\d,]+)(.*)$/);
  return match ? { end: parseInt(match[1].replace(/,/g, ""), 10), suffix: match[2] } : null;
};
