import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";

import ArticleImage from "../ArticleImage";
import type { ArticleItem } from "../types";
import { formatDate } from "../utils";

/* "Related Articles": four cards (photo, category, title, date, orange arrow) and a "View All Articles" link. */
const RelatedArticles = ({ items }: { items: ArticleItem[] }) => {
  if (items.length === 0) return null;
  return (
    <section aria-labelledby="related-articles" className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-10">
      <div className="flex items-center justify-between gap-4 mb-5">
        <h2 id="related-articles" className="border-l-[3px] border-[#fd6e15] pl-3 font-serif font-medium text-[24px] sm:text-[26px] text-[#0A2B5E]">
          Related Articles
        </h2>
        <Link href="/blogs" className="group inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#0A2B5E] hover:text-[#fd6e15] transition-colors">
          View All Articles
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {items.map((item) => (
          <li key={item.key}>
            <Link
              href={item.href}
              className="group block rounded-md bg-white overflow-hidden shadow-[rgba(0,0,0,0.02)_0px_1px_3px_0px,rgba(27,31,35,0.15)_0px_0px_0px_1px]"
            >
              <div className="relative h-[170px] overflow-hidden">
                <ArticleImage item={item} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="flex items-end justify-between gap-3 px-4 pt-3.5 pb-4">
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#E9902B] mb-1.5">{item.category}</p>
                  <h3 className="font-serif font-medium text-[15.5px] leading-snug text-[#0A2B5E] line-clamp-2 mb-2 group-hover:text-[#fd6e15] transition-colors">
                    {item.title}
                  </h3>
                  <p className="flex items-center gap-1.5 text-[11.5px] text-[#E9902B]">
                    <CalendarDays className="w-3.5 h-3.5" />
                    {formatDate(item.date)}
                  </p>
                </div>
                <span className="w-9 h-9 shrink-0 rounded-full bg-[#E9902B] text-white flex items-center justify-center group-hover:bg-[#fd6e15] transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default RelatedArticles;
