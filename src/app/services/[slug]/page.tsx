import type { Metadata } from "next";
import { fetchPageSeo, buildMetadata, AdvancedSeoTags } from "@/lib/seo";
import { notFound } from "next/navigation";

import ServiceDetailPage from "@/components/services/detail/ServiceDetailPage";
import { SERVICE_DETAILS } from "@/components/services/details";
import { fetchServiceDetail } from "@/lib/services";

export function generateStaticParams() {
  return Object.keys(SERVICE_DETAILS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const data = await fetchServiceDetail(slug);
  if (!data) return { title: "Design House India" };
  // SEO from the admin (Pages & CMS → SEO Information); the service's own text until one is saved
  const seo = await fetchPageSeo(`/services/${slug}`);
  return buildMetadata(seo, `${data.name} | Design House India`, data.hero.text);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await fetchServiceDetail(slug);
  if (!data) notFound();
  const seo = await fetchPageSeo(`/services/${slug}`);
  return (
    <>
      <AdvancedSeoTags seo={seo} />
      <ServiceDetailPage data={data} />
    </>
  );
}
