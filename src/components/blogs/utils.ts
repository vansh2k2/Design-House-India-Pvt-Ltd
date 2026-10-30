import { API_URL } from "@/lib/api";
import { SAMPLE_ARTICLES, SAMPLE_POPULAR } from "./data/sampleArticles";
import type { ArticleItem, Blog } from "./types";

export const blogImageUrl = (path: string) => `${API_URL}${path.startsWith("/") ? "" : "/"}${path}`;

export const blogDate = (blog: Blog) => new Date(blog.publishedAt || blog.createdAt);

// "05 Oct 2026"
export const formatDate = (date: Date) =>
  date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }).replace("Sept", "Sep");

// Day and "OCT 2026" for the date badge on card photos
export const dateBadge = (date: Date) => ({
  day: String(date.getDate()).padStart(2, "0"),
  monthYear: `${date.toLocaleDateString("en-GB", { month: "short" }).replace("Sept", "Sep").toUpperCase()} ${date.getFullYear()}`,
});

// Admin blogs first (they come from the API), then the showcase articles from the design
export const toArticleItems = (blogs: Blog[]): ArticleItem[] => [
  ...blogs.map((b) => ({
    key: b._id,
    title: b.title,
    excerpt: b.excerpt,
    category: b.category,
    date: blogDate(b),
    href: `/blogs/${b.slug}`,
    image: b.image,
    tags: b.tags,
  })),
  ...SAMPLE_ARTICLES.map((a) => ({
    key: a.slug,
    title: a.title,
    excerpt: a.excerpt,
    category: a.category,
    date: new Date(a.date),
    href: `/blogs/${a.slug}`,
    image: a.image,
  })),
];

export const popularItems = (): ArticleItem[] =>
  SAMPLE_POPULAR.map((a) => ({
    key: a.title,
    title: a.title,
    excerpt: "",
    category: "",
    date: new Date(a.date),
    href: `/blogs/${a.slug}`,
    image: a.image,
  }));

// Title split for the two-colour headings: the last few words get the orange accent
export const splitTitle = (title: string) => {
  const words = title.trim().split(/\s+/);
  const accent = words.length > 5 ? 3 : 1;
  return { lead: words.slice(0, -accent).join(" "), accent: words.slice(-accent).join(" ") };
};
