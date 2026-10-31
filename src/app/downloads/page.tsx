import type { Metadata } from "next";
import { fetchPageSeo, buildMetadata, AdvancedSeoTags } from "@/lib/seo";
import { fetchDownloads } from "@/lib/downloads";
import DownloadsPageView from "@/components/pages/downloads/DownloadsPage";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchPageSeo("/downloads");
  return buildMetadata(seo);
}

export default async function Page() {
  const [seo, items] = await Promise.all([fetchPageSeo("/downloads"), fetchDownloads()]);
  return (
    <>
      <AdvancedSeoTags seo={seo} />
      <DownloadsPageView items={items} />
    </>
  );
}
