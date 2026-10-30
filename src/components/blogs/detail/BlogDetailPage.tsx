"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import Topbar from "@/components/layout/Topbar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";
import ProjectCta from "@/components/common/ProjectCta";
import { api } from "@/lib/api";

import BlogDetailHero from "./BlogDetailHero";
import ArticleContent from "./ArticleContent";
import DetailSidebar from "./DetailSidebar";
import RelatedArticles from "./RelatedArticles";
import { USE_DEMO_BLOG_DETAIL } from "../constants";
import { DEMO_CATEGORY_COUNTS, DEMO_DETAIL, DEMO_RELATED } from "../data/demoDetail";
import { findSampleArticle } from "../data/sampleArticles";
import type { ArticleDetail, Blog } from "../types";
import { blogDate, popularItems, toArticleItems } from "../utils";

interface ApiBlog extends Blog {
  content?: string;
  readTime?: string | number;
}

// About 200 words a minute, at least 1
const readMinutes = (html = "") => Math.max(1, Math.round(html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length / 200));

const fromApi = (b: ApiBlog): ArticleDetail => ({
  slug: b.slug,
  title: b.title,
  excerpt: b.excerpt,
  category: b.category,
  date: blogDate(b),
  image: b.image,
  readTime: Number(b.readTime) > 0 ? Number(b.readTime) : readMinutes(b.content),
  views: b.views,
  html: b.content ?? "",
});

/* A blog's page: banner, article body beside the sidebar, related articles, enquiry band and footer.
   Showcase articles (from the design) are read locally; admin blogs come from /api/blogs/slug/:slug
   (the server page passes it in when it already fetched it). */
const BlogDetailPage = ({ slug, initialBlog }: { slug: string; initialBlog?: ApiBlog | null }) =>
  USE_DEMO_BLOG_DETAIL ? <DemoBlogDetail /> : <LiveBlogDetail slug={slug} initialBlog={initialBlog} />;

/* Design-review mode: the same fixed article, lists and counts for every blog, no backend calls. */
const DemoBlogDetail = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <DetailLayout>
      <BlogDetailHero article={DEMO_DETAIL} />
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 grid lg:grid-cols-[minmax(0,1fr)_300px] gap-8 lg:gap-10">
        <div className="min-w-0">
          <ArticleContent article={DEMO_DETAIL} />
        </div>
        <DetailSidebar articles={[]} recent={popularItems()} title={DEMO_DETAIL.title} categoryCounts={DEMO_CATEGORY_COUNTS} />
      </div>
      <RelatedArticles items={DEMO_RELATED} />
    </DetailLayout>
  );
};

const DetailLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-white flex flex-col">
    <Topbar />
    <Navbar />
    <main className="flex-1">
      {children}
      <ProjectCta narrow title="Planning a Similar Workspace?" />
    </main>
    <Footer />
  </div>
);

const LiveBlogDetail = ({ slug, initialBlog }: { slug: string; initialBlog?: ApiBlog | null }) => {
  const sample = findSampleArticle(slug);
  const [blog, setBlog] = useState<ApiBlog | null>(initialBlog ?? null);
  const [loading, setLoading] = useState(!sample && !initialBlog);
  const [allBlogs, setAllBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!sample && !initialBlog) {
      api
        .get(`/api/blogs/slug/${encodeURIComponent(slug)}`)
        .then((res) => res.data?.success && setBlog(res.data.data))
        .catch((err) => console.error("Error fetching blog:", err))
        .finally(() => setLoading(false));
    }
    api
      .get("/api/blogs/published", { params: { limit: 50 } })
      .then((res) => res.data?.success && Array.isArray(res.data.data) && setAllBlogs(res.data.data))
      .catch((err) => console.error("Error fetching blogs:", err));
  }, [slug, sample, initialBlog]);

  const article: ArticleDetail | null = useMemo(() => {
    if (sample) return { ...sample, date: new Date(sample.date), blocks: sample.body };
    return blog ? fromApi(blog) : null;
  }, [sample, blog]);

  const articles = useMemo(() => toArticleItems(allBlogs), [allBlogs]);
  const others = articles.filter((a) => a.href !== `/blogs/${slug}`);
  const byDate = [...others].sort((a, b) => b.date.getTime() - a.date.getTime());
  const recent = byDate.slice(0, 4);
  // Same category first, then the newest of the rest
  const related = article
    ? [...byDate.filter((a) => a.category === article.category), ...byDate.filter((a) => a.category !== article.category)].slice(0, 4)
    : [];

  return (
    <DetailLayout>
        {loading ? (
          <div className="pt-[124px] max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="h-[300px] rounded-md bg-[#F3F6FB] animate-pulse" />
          </div>
        ) : !article ? (
          <div className="pt-[124px] max-w-[700px] mx-auto px-4 py-24 text-center">
            <h1 className="font-serif text-[30px] text-[#0A2B5E] mb-3">Article not found</h1>
            <p className="text-[14px] text-[#46658C] mb-6">This article may have been moved or removed.</p>
            <Link href="/blogs" className="inline-flex items-center gap-2 rounded-md bg-[#fd6e15] px-5 py-2.5 text-white text-[13px] font-semibold">
              <ArrowLeft className="w-4 h-4" />
              Back to Blogs
            </Link>
          </div>
        ) : (
          <>
            <BlogDetailHero article={article} />
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 grid lg:grid-cols-[minmax(0,1fr)_300px] gap-8 lg:gap-10">
              <div className="min-w-0">
                <ArticleContent article={article} />
              </div>
              <DetailSidebar articles={articles} recent={recent} title={article.title} />
            </div>
            <RelatedArticles items={related} />
          </>
        )}
    </DetailLayout>
  );
};

export default BlogDetailPage;
