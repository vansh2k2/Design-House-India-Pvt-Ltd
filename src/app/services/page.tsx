import type { Metadata } from "next";
import { fetchPageSeo, buildMetadata, AdvancedSeoTags } from "@/lib/seo";
import { fetchPublicServices } from "@/lib/services";
import ServicesView from "@/components/services/ServicesPage";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchPageSeo("/services");
  return buildMetadata(seo);
}

export default async function Page() {
  const [seo, services] = await Promise.all([
    fetchPageSeo("/services"),
    fetchPublicServices(),
  ]);
  return (
    <>
      <AdvancedSeoTags seo={seo} />
      <ServicesView initialServices={services} />
    </>
  );
}
