import type { Metadata } from "next";
import { fetchPageSeo, buildMetadata, AdvancedSeoTags } from "@/lib/seo";

import DisclaimerView from "@/components/pages/Disclaimer";
import { COMPANY } from "@/components/pages/LegalLayout";

// SEO from the admin (Pages & CMS → SEO Information); this text is used until one is saved
export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchPageSeo("/disclaimer");
  return buildMetadata(seo, "Disclaimer | Design House India", `Important information about the use of the ${COMPANY.name} website, its content, project images and external links.`);
}

export default async function Page() {
  const seo = await fetchPageSeo("/disclaimer");
  return (
    <>
      <AdvancedSeoTags seo={seo} />
      <DisclaimerView />
    </>
  );
}
