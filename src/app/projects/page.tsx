import type { Metadata } from "next";
import { fetchPageSeo, buildMetadata, AdvancedSeoTags } from "@/lib/seo";
import ProjectsView from "@/components/pages/Projects";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchPageSeo("/projects");
  return buildMetadata(seo);
}

export default async function Page() {
  const seo = await fetchPageSeo("/projects");
  return (
    <>
      <AdvancedSeoTags seo={seo} />
      <ProjectsView />
    </>
  );
}
