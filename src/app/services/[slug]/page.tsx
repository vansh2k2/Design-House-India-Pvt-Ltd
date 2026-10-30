import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ServiceDetailPage from "@/components/services/detail/ServiceDetailPage";
import { SERVICE_DETAILS, getServiceDetail } from "@/components/services/details";

export function generateStaticParams() {
  return Object.keys(SERVICE_DETAILS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const data = getServiceDetail(slug);
  if (!data) return { title: "Design House India" };
  return { title: `${data.name} | Design House India`, description: data.hero.text };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = getServiceDetail(slug);
  if (!data) notFound();
  return <ServiceDetailPage data={data} />;
}
