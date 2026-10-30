import Link from "next/link";
import { ArrowRight } from "lucide-react";

import ArticleImage from "./ArticleImage";
import DateBadge from "./DateBadge";
import type { ArticleItem } from "./types";

/* Blog card: photo with date badge, category, title, excerpt and "Read More". */
const ArticleCard = ({ item }: { item: ArticleItem }) => (
  <article className="group flex flex-col rounded-md bg-white overflow-hidden shadow-[rgba(0,0,0,0.02)_0px_1px_3px_0px,rgba(27,31,35,0.15)_0px_0px_0px_1px]">
    <Link href={item.href} className="relative block h-[160px] overflow-hidden">
      <ArticleImage
        item={item}
        sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
        className="group-hover:scale-105 transition-transform duration-500"
      />
      <DateBadge date={item.date} />
    </Link>
    <div className="flex flex-col flex-1 px-4 pt-3.5 pb-4">
      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#E9902B] mb-1.5">{item.category}</p>
      <h3 className="font-serif font-medium text-[16px] leading-snug text-[#0A2B5E] line-clamp-2 mb-2">
        <Link href={item.href} className="hover:text-[#fd6e15] transition-colors">
          {item.title}
        </Link>
      </h3>
      <p className="text-[12.5px] text-[#46658C] leading-relaxed line-clamp-3 mb-3">{item.excerpt}</p>
      <Link
        href={item.href}
        className="mt-auto inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-[#0A2B5E] hover:text-[#fd6e15] transition-colors"
      >
        Read More
        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  </article>
);

export default ArticleCard;
