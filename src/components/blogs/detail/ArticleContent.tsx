import Image from "next/image";
import { Leaf, Monitor, PersonStanding, Quote, Sprout } from "lucide-react";

import { cleanDescription } from "@/lib/utils";
import ArticleImage from "../ArticleImage";
import type { ArticleBlock } from "../data/sampleArticles";
import type { ArticleDetail } from "../types";

const POINT_ICONS = [Leaf, PersonStanding, Monitor, Sprout];

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="border-l-[3px] border-[#fd6e15] pl-3 font-serif font-medium text-[20px] sm:text-[22px] leading-snug text-[#0A2B5E] mt-8 mb-3">
    {children}
  </h2>
);

const QuoteBox = ({ text }: { text: string }) => (
  <figure className="flex gap-4 rounded-md bg-[#FFF6EE] px-5 py-5 my-8">
    <Quote className="w-9 h-9 shrink-0 text-[#E9902B] fill-[#E9902B] rotate-180" strokeWidth={1} />
    <div>
      <blockquote className="font-serif italic text-[16px] sm:text-[17px] text-[#0A2B5E] leading-relaxed mb-2">&ldquo;{text}&rdquo;</blockquote>
      <figcaption className="text-[13px] font-semibold text-[#0A2B5E]">— Design House India</figcaption>
    </div>
  </figure>
);

const Block = ({ block }: { block: ArticleBlock }) => {
  switch (block.type) {
    case "p":
      return <p className="text-[14.5px] text-[#333] leading-relaxed mb-4">{block.text}</p>;
    case "h2":
      return <H2>{block.text}</H2>;
    case "points":
      return (
        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-3 my-4">
          {block.items.map(({ title, text }, i) => {
            const Icon = POINT_ICONS[i % POINT_ICONS.length];
            return (
              <li key={title} className="rounded-md bg-white p-4 shadow-[rgba(0,0,0,0.02)_0px_1px_3px_0px,rgba(27,31,35,0.15)_0px_0px_0px_1px]">
                <Icon className="w-7 h-7 text-[#E9902B] mb-3" strokeWidth={1.6} />
                <h3 className="text-[13.5px] font-bold text-[#0A2B5E] leading-snug mb-1.5">{title}</h3>
                <p className="text-[12px] text-[#5B6B82] leading-snug">{text}</p>
              </li>
            );
          })}
        </ul>
      );
    case "imageText":
      return (
        <div className="grid sm:grid-cols-[1.1fr_1fr] gap-5 items-center my-4">
          <div className="relative h-[190px] rounded-md overflow-hidden">
            <Image src={block.image} alt="" fill placeholder="blur" sizes="(min-width: 640px) 30vw, 100vw" className="object-cover" />
          </div>
          <p className="text-[14.5px] text-[#333] leading-relaxed">{block.text}</p>
        </div>
      );
    case "quote":
      return <QuoteBox text={block.text} />;
  }
};

/* Article body. Showcase articles: first paragraph, the cover photo, then the remaining blocks.
   Admin blogs: the cover photo, then their rich-text HTML styled to match. */
const ArticleContent = ({ article }: { article: ArticleDetail }) => {
  const cover = (
    <div className="relative h-[240px] sm:h-[340px] rounded-md overflow-hidden my-6">
      <ArticleImage
        item={{ key: article.slug, title: article.title, excerpt: "", category: "", date: article.date, href: "", image: article.image }}
        sizes="(min-width: 1024px) 60vw, 100vw"
      />
      {article.coverWords && (
        <>
          <div className="absolute inset-y-0 right-0 w-[45%] bg-gradient-to-l from-black/55 to-transparent" />
          <ul className="absolute top-1/2 -translate-y-1/2 right-[8%] space-y-1">
            {article.coverWords.map((w) => (
              <li key={w} className="text-white text-[18px] sm:text-[24px] uppercase tracking-[0.04em] leading-tight [text-shadow:0_2px_6px_rgba(0,0,0,0.5)]">
                {w}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );

  if (article.blocks) {
    const [first, ...rest] = article.blocks;
    return (
      <article>
        {first && <Block block={first} />}
        {cover}
        {rest.map((block, i) => (
          <Block key={i} block={block} />
        ))}
      </article>
    );
  }

  return (
    <article>
      {cover}
      <div
        className="text-[14.5px] text-[#333] leading-relaxed
          [&_p]:mb-4 [&_div]:mb-4
          [&_h2]:border-l-[3px] [&_h2]:border-[#fd6e15] [&_h2]:pl-3 [&_h2]:font-serif [&_h2]:font-medium [&_h2]:text-[22px] [&_h2]:text-[#0A2B5E] [&_h2]:mt-8 [&_h2]:mb-3
          [&_h3]:font-serif [&_h3]:font-medium [&_h3]:text-[18px] [&_h3]:text-[#0A2B5E] [&_h3]:mt-6 [&_h3]:mb-2
          [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-4 [&_li]:mb-1.5
          [&_a]:text-[#2373F4] [&_a]:underline [&_strong]:text-[#0A2B5E]
          [&_img]:rounded-md [&_img]:my-4 [&_img]:max-w-full
          [&_blockquote]:rounded-md [&_blockquote]:bg-[#FFF6EE] [&_blockquote]:px-5 [&_blockquote]:py-4 [&_blockquote]:font-serif [&_blockquote]:italic [&_blockquote]:text-[#0A2B5E] [&_blockquote]:my-6"
        dangerouslySetInnerHTML={{ __html: cleanDescription(article.html) }}
      />
    </article>
  );
};

export default ArticleContent;
