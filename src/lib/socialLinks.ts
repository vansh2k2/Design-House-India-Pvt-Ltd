import { API_URL } from "@/lib/api";

export type SocialNetwork = "facebook" | "instagram" | "twitter" | "linkedin" | "youtube";
export type SocialLinks = Record<SocialNetwork, string>;

export interface SocialProfile {
    network: SocialNetwork;
    label: string;
    color: string;
    url: string;
}

// Display order and brand colours, used by the floating sidebar and the footer
const NETWORKS: { network: SocialNetwork; label: string; color: string }[] = [
    { network: "facebook", label: "Facebook", color: "#1877F2" },
    { network: "instagram", label: "Instagram", color: "#E4405F" },
    { network: "twitter", label: "X (Twitter)", color: "#000000" },
    { network: "youtube", label: "YouTube", color: "#FF0000" },
    { network: "linkedin", label: "LinkedIn", color: "#0A66C2" },
];

export const EMPTY_SOCIAL_LINKS: SocialLinks = { facebook: "", instagram: "", twitter: "", linkedin: "", youtube: "" };

// "facebook.com/x" → "https://facebook.com/x", so a link typed without the scheme doesn't open as a page of this site
const normalizeUrl = (url: string) => {
    const u = url.trim();
    if (!u) return "";
    return /^https?:\/\//i.test(u) ? u : "https://" + u.replace(/^\/+/, "");
};

/** The profiles that have a link set, in display order */
export const socialProfiles = (links: SocialLinks): SocialProfile[] =>
    NETWORKS.map((n) => ({ ...n, url: normalizeUrl(links[n.network] || "") })).filter((p) => p.url);

/**
 * Links set in the admin under Advanced SEO → Social Media Links. Fetched server-side in the root layout
 * so the footer's profile links and the Organization schema are in the initial HTML.
 */
export async function fetchSocialLinks(): Promise<SocialLinks> {
    try {
        const res = await fetch(`${API_URL}/api/social-media`, { next: { revalidate: 300 } });
        const json = await res.json();
        if (!json?.success || !json.data) return EMPTY_SOCIAL_LINKS;
        const data = json.data;
        return {
            facebook: data.facebook || "",
            instagram: data.instagram || "",
            twitter: data.twitter || "",
            linkedin: data.linkedin || "",
            youtube: data.youtube || "",
        };
    } catch {
        return EMPTY_SOCIAL_LINKS;
    }
}
