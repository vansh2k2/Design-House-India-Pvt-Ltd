import { API_URL } from "@/lib/api";
import type { Blog } from "./types";

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
