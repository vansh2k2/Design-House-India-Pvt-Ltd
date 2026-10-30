import Link from "next/link";

import SidebarCard from "./SidebarCard";
import ArticleImage from "../ArticleImage";
import type { ArticleItem } from "../types";
import { formatDate } from "../utils";

/* Popular articles: thumbnail, title and date. */
const PopularArticles = ({ items }: { items: ArticleItem[] }) => {
  if (items.length === 0) return null;
  return (
    <SidebarCard title="Popular Articles">
      <ul className="space-y-3.5">
        {items.map((item) => (
          <li key={item.key}>
            <Link href={item.href} className="group flex gap-3">
              <span className="relative w-[72px] h-[56px] shrink-0 rounded-[4px] overflow-hidden">
                <ArticleImage item={item} sizes="72px" />
              </span>
              <span className="min-w-0">
                <span className="block font-serif font-medium text-[13.5px] text-[#0A2B5E] leading-snug line-clamp-2 group-hover:text-[#fd6e15] transition-colors">
                  {item.title}
                </span>
                <span className="block text-[11px] text-[#8C9BAE] mt-1">{formatDate(item.date)}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </SidebarCard>
  );
};

export default PopularArticles;
