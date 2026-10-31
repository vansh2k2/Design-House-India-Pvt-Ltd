import { API_URL } from "./api";

// Cards of the Downloads page, managed in the admin (Downloads Management) and served by /api/downloads

export interface DownloadCard {
  _id: string;
  title: string;
  coverTitle: string; // printed on the card's cover (new line = next line)
  desc: string;
  fileUrl: string; // empty for "Coming Soon"
  fileSize: string;
  cardImage: string;
  imageAlt: string;
  action: string; // button text
  status: "Active" | "Coming Soon" | "Inactive";
  accent: boolean; // orange cover title (company profile)
  ensis: boolean; // ENSIS cover style
}

/** Server-side: the cards to show (refreshed every 30 s); an empty list if the backend can't be reached. */
export async function fetchDownloads(): Promise<DownloadCard[]> {
  try {
    const res = await fetch(`${API_URL}/api/downloads`, { next: { revalidate: 30 } });
    const json = await res.json();
    return json?.success && Array.isArray(json.data) ? (json.data as DownloadCard[]) : [];
  } catch {
    return [];
  }
}

/** Counts a download click (fire and forget; keeps going if the PDF opens in a new tab). */
export const countDownloadClick = (id: string) => {
  try {
    fetch(`${API_URL}/api/downloads/${id}/click`, { method: "POST", keepalive: true }).catch(() => {});
  } catch {
    // counting must never block the download
  }
};
