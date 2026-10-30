import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

import DateBadge from "./DateBadge";
import type { Blog } from "./types";
import { blogDate } from "./utils";
import featuredImg from "@/assets/image/bl1.webp";

// Titles come from the admin, so the orange accent is simply their last few words
const splitTitle = (title: string) => {
  const words = title.trim().split(/\s+/);
  const accent = words.length > 5 ? 3 : 1;
  return { lead: words.slice(0, -accent).join(" "), accent: words.slice(-accent).join(" ") };
};

/* "Featured Article": a large photo with the date badge on the left, category tag, title, excerpt and
   "Read Full Article" on the right; arrows step through the featured blogs. */
const FeaturedArticle = ({ blogs }: { blogs: Blog[] }) => {
  const [index, setIndex] = useState(0);
  if (blogs.length === 0) return null;

  const blog = blogs[index % blogs.length];
  const title = splitTitle(blog.title);
  const step = (by: number) => setIndex((i) => (i + by + blogs.length) % blogs.length);

  return (
    <section aria-labelledby="featured-article">
      <div className="flex items-center gap-2 mb-3">
        <span className="w-6 h-[2px] bg-[#fd6e15]" />
        <span id="featured-article" className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#0A2B5E]">
          Featured Article
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-5 md:gap-6 items-center rounded-md bg-white p-4 shadow-[rgba(0,0,0,0.12)_0px_1px_3px,rgba(0,0,0,0.24)_0px_1px_2px]">
        <Link href={`/blogs/${blog.slug}`} className="group relative block h-[230px] sm:h-[260px] rounded-md overflow-hidden">
          {/* Fixed photo for the featured section (not the blog's own image) */}
          <Image
            src={featuredImg}
            alt={blog.title}
            fill
            placeholder="blur"
            sizes="(min-width: 1024px) 35vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <DateBadge date={blogDate(blog)} size="lg" />
        </Link>

        <div>
          <span className="block font-serif font-medium text-[16px] sm:text-[18px] text-[#fd6e15] mb-1.5">
            {blog.category}
          </span>
          <h2 className="font-serif font-medium text-[22px] sm:text-[26px] leading-snug text-[#0A2B5E] mb-3">
            <Link href={`/blogs/${blog.slug}`} className="hover:opacity-80 transition-opacity">
              {title.lead} <span className="text-[#fd6e15]">{title.accent}</span>
            </Link>
          </h2>
          <p className="text-[13.5px] text-[#333] leading-relaxed line-clamp-4 mb-4">{blog.excerpt}</p>
          <div className="flex items-center justify-between gap-4">
            <Link
              href={`/blogs/${blog.slug}`}
              className="group inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#0A2B5E] hover:text-[#fd6e15] transition-colors"
            >
              Read Full Article
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            {blogs.length > 1 && (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous featured article"
                  className="w-9 h-9 rounded-full bg-[#0A2B5E] text-white flex items-center justify-center hover:bg-[#134698] transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next featured article"
                  className="w-9 h-9 rounded-full bg-[#fd6e15] text-white flex items-center justify-center hover:bg-[#e05d0e] transition-colors"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedArticle;
