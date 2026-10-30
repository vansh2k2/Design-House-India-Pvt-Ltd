import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Search } from "lucide-react";

import NewsletterCard from "../sidebar/NewsletterCard";
import PopularArticles from "../sidebar/PopularArticles";
import SidebarCard from "../sidebar/SidebarCard";
import ShareCard from "./ShareCard";
import { ALL_CATEGORY, BLOG_CATEGORIES } from "../constants";
import type { ArticleItem } from "../types";

/* Right column of a blog's page: search (opens the Blogs page filtered), categories with article counts,
   recent articles, newsletter and share buttons. */
const DetailSidebar = ({
  articles,
  recent,
  title,
  categoryCounts,
}: {
  articles: ArticleItem[];
  recent: ArticleItem[];
  title: string;
  categoryCounts?: { label: string; count: number }[]; // fixed counts (demo); otherwise counted from articles
}) => {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    router.push(query.trim() ? `/blogs?search=${encodeURIComponent(query.trim())}` : "/blogs");
  };

  const categories = categoryCounts ?? BLOG_CATEGORIES.filter((c) => c.label !== ALL_CATEGORY).map((c) => ({
    label: c.label,
    count: articles.filter((a) => a.category === c.label).length,
  }));

  return (
    <aside className="space-y-5 lg:mt-1">
      <form onSubmit={onSearch} className="rounded-md bg-white p-3 shadow-[rgba(0,0,0,0.02)_0px_1px_3px_0px,rgba(27,31,35,0.15)_0px_0px_0px_1px]">
        <label className="relative block">
          <span className="sr-only">Search blogs</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search blogs..."
            className="w-full rounded-md border border-[#DCE3EE] bg-white pl-3 pr-9 py-2.5 text-[13px] text-[#1F2D44] placeholder:text-[#8C9BAE] outline-none focus:border-[#134698] transition-colors"
          />
          <button type="submit" aria-label="Search" className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0A2B5E]">
            <Search className="w-4 h-4" />
          </button>
        </label>
      </form>

      <SidebarCard title="Categories">
        <ul className="divide-y divide-[#EEF1F6]">
          {categories.map(({ label, count }) => (
            <li key={label}>
              <Link
                href={`/blogs?category=${encodeURIComponent(label)}`}
                className="group flex items-center justify-between py-2.5 text-[12.5px] text-[#1F2D44] hover:text-[#fd6e15] transition-colors"
              >
                <span>
                  {label} <span className="text-[#E9902B]">({count})</span>
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-[#0A2B5E] transition-transform group-hover:translate-x-0.5 group-hover:text-[#fd6e15]" />
              </Link>
            </li>
          ))}
        </ul>
      </SidebarCard>

      <PopularArticles items={recent} title="Recent Articles" />
      <NewsletterCard />
      <ShareCard title={title} />
    </aside>
  );
};

export default DetailSidebar;
