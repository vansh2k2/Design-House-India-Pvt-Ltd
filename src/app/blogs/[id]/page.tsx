import type { Metadata } from "next";
import { fetchBlogBySlug, buildBlogMetadata, AdvancedSeoTags } from "@/lib/seo";
import BlogDetailPage from "@/components/blogs/detail/BlogDetailPage";
import { findSampleArticle } from "@/components/blogs/data/sampleArticles";
import { USE_DEMO_BLOG_DETAIL } from "@/components/blogs/constants";
import { DEMO_DETAIL } from "@/components/blogs/data/demoDetail";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  if (USE_DEMO_BLOG_DETAIL) return { title: `${DEMO_DETAIL.title} | Design House India`, description: DEMO_DETAIL.excerpt };
  const sample = findSampleArticle(id);
  if (sample) return { title: `${sample.title} | Design House India`, description: sample.excerpt };
  const post = await fetchBlogBySlug(id);
  return buildBlogMetadata(post);
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  // Showcase articles live in the code; everything else is an admin blog
  const post = USE_DEMO_BLOG_DETAIL || findSampleArticle(id) ? null : await fetchBlogBySlug(id);
  return (
    <>
      {post && <AdvancedSeoTags seo={post} />}
      <BlogDetailPage slug={id} initialBlog={post} />
    </>
  );
}
