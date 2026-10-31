import { API_URL } from "./api";

// Home "Our Achievements" section, edited in the admin (Pages & CMS → Home → Our Achievements),
// served by /api/home-achievements

export interface AchievementStat {
  value: number;
  suffix: string;
  label: string;
  sublabel: string;
  icon: string;
  iconAlt: string;
}

export interface AchievementsContent {
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  backgroundImage: string;
  backgroundAlt: string;
  stats: AchievementStat[];
}

const CDN = "https://res.cloudinary.com/dqbjxbk6m/image/upload";

// Used if the backend can't be reached (same content as the backend's defaults)
export const DEFAULT_ACHIEVEMENTS: AchievementsContent = {
  eyebrow: "Our Achievements",
  title: "Numbers that Reflect",
  highlight: "Your Trust in Us",
  description:
    "Over the years, we have delivered successful interior and exhibition solutions for leading brands across India. Our focus on quality, creativity and timely execution has helped us build long-term relationships.",
  backgroundImage: `${CDN}/v1793442065/design-house/home-hero/hero-2.webp`,
  backgroundAlt: "Design House India corporate office reception",
  stats: [
    { value: 21, suffix: "+", label: "Years Experience", sublabel: "Industry leadership since 2004", icon: `${CDN}/v1793443508/design-house/achievements/icon-s4.png`, iconAlt: "Years of experience" },
    { value: 500, suffix: "+", label: "Happy Clients", sublabel: "Trusted partnerships nationwide", icon: `${CDN}/v1793443507/design-house/achievements/icon-s3.png`, iconAlt: "Happy clients" },
    { value: 5000, suffix: "+", label: "Projects Completed", sublabel: "Delivering excellence every time", icon: `${CDN}/v1793443506/design-house/achievements/icon-s2.png`, iconAlt: "Projects completed" },
    { value: 98, suffix: "%", label: "Client Satisfaction", sublabel: "Quality, commitment and trust", icon: `${CDN}/v1793443505/design-house/achievements/icon-s1.png`, iconAlt: "Client satisfaction" },
  ],
};

/** Server-side: the saved section (refreshed every 30 s), or the defaults. */
export async function fetchHomeAchievements(): Promise<AchievementsContent> {
  try {
    const res = await fetch(`${API_URL}/api/home-achievements`, { next: { revalidate: 30 } });
    const json = await res.json();
    return json?.success && json.data && Array.isArray(json.data.stats) ? (json.data as AchievementsContent) : DEFAULT_ACHIEVEMENTS;
  } catch {
    return DEFAULT_ACHIEVEMENTS;
  }
}
