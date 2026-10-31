import type { Metadata } from "next";
import { fetchPageSeo, buildMetadata, AdvancedSeoTags } from "@/lib/seo";
import { API_URL } from "@/lib/api";
import DownloadsPageView, { type DownloadRecord, type DownloadsHero } from "@/components/pages/downloads/DownloadsPage";

// Hero banner edited in the admin (Pages & CMS → Downloads → Downloads Hero Banner). Fetched on the
// server so the H1 and banner text are in the initial HTML.
async function fetchDownloadsHero(): Promise<DownloadsHero | null> {
  try {
    const res = await fetch(`${API_URL}/api/page-sections/downloads-hero`, { next: { revalidate: 300 } });
    const json = await res.json();
    return json?.success ? (json.data as DownloadsHero) : null;
  } catch {
    return null;
  }
}

// Download cards managed in the admin (Content Management → Downloads); null = backend unreachable
async function fetchDownloads(): Promise<DownloadRecord[] | null> {
  try {
    const res = await fetch(`${API_URL}/api/downloads`, { next: { revalidate: 300 } });
    const json = await res.json();
    return json?.success && Array.isArray(json.data) ? (json.data as DownloadRecord[]) : null;
  } catch {
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchPageSeo("/downloads");
  return buildMetadata(seo);
}

export default async function Page() {
  const [seo, hero, downloads] = await Promise.all([fetchPageSeo("/downloads"), fetchDownloadsHero(), fetchDownloads()]);
  return (
    <>
      <AdvancedSeoTags seo={seo} />
      <DownloadsPageView hero={hero} downloads={downloads} />
    </>
  );
}
