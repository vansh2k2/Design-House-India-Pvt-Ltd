"use client";

import { useEffect, useMemo, useState } from "react";

import Topbar from "@/components/layout/Topbar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";
import ProjectCta from "@/components/common/ProjectCta";
import { api } from "@/lib/api";

import BlogsHero from "./BlogsHero";
import BlogCategoryBar from "./BlogCategoryBar";
import FeaturedArticle from "./FeaturedArticle";
import LatestArticles from "./LatestArticles";
import BlogSidebar from "./sidebar/BlogSidebar";
import { ALL_CATEGORY } from "./constants";
import { TRENDING_TOPICS } from "./data/sampleArticles";
import type { Blog } from "./types";
import { popularItems, toArticleItems } from "./utils";

/* Blogs page: banner, category tiles, then featured article + latest articles (left) beside the sidebar
   (right), an enquiry band and the footer. Blogs come from the admin panel (/api/blogs/published). */
const BlogsPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(ALL_CATEGORY);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    api
      .get("/api/blogs/published", { params: { limit: 50 } })
      .then((res) => {
        if (res.data?.success && Array.isArray(res.data.data)) setBlogs(res.data.data);
      })
      .catch((err) => console.error("Error fetching blogs:", err))
      .finally(() => setLoading(false));
  }, []);

  // Back to the first page whenever the filter changes
  useEffect(() => {
    setPage(1);
  }, [category, search]);

  // Filters can arrive in the URL (search box / category links on a blog's detail page)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("search")) setSearch(params.get("search") ?? "");
    if (params.get("category")) setCategory(params.get("category") ?? ALL_CATEGORY);
  }, []);

  const articles = useMemo(() => toArticleItems(blogs), [blogs]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return articles.filter(
      (a) =>
        (category === ALL_CATEGORY || a.category === category) &&
        (!q || [a.title, a.excerpt, a.category, ...(a.tags ?? [])].some((text) => text?.toLowerCase().includes(q)))
    );
  }, [articles, category, search]);

  // Featured slider: blogs marked featured in the admin, else the three newest
  const featured = useMemo(() => {
    const marked = blogs.filter((b) => b.featured);
    return marked.length > 0 ? marked : blogs.slice(0, 3);
  }, [blogs]);

  // Popular list and trending topics are the fixed ones from the design
  const popular = popularItems();

  const changePage = (n: number) => {
    setPage(n);
    document.getElementById("latest-articles")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Topbar />
      <Navbar />

      <main className="flex-1">
        <BlogsHero />
        <BlogCategoryBar active={category} onSelect={setCategory} />

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 grid lg:grid-cols-[minmax(0,1fr)_300px] gap-8">
          <div className="min-w-0 space-y-10">
            {loading ? (
              <div className="h-[260px] rounded-md bg-[#F3F6FB] animate-pulse" />
            ) : (
              <>
                <FeaturedArticle blogs={featured} />
                <LatestArticles items={filtered} page={page} onPageChange={changePage} />
              </>
            )}
          </div>
          <BlogSidebar search={search} onSearch={setSearch} topics={TRENDING_TOPICS} popular={popular} />
        </div>

        <ProjectCta narrow />
      </main>

      <Footer />
    </div>
  );
};

export default BlogsPage;
