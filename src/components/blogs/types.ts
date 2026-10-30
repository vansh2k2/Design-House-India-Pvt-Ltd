// A published blog as returned by /api/blogs/published
export interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  category: string;
  tags?: string[];
  featured?: boolean;
  views?: number;
  publishedAt?: string;
  createdAt: string;
}

// What the article cards and the popular list render: an admin blog or a showcase article
export interface ArticleItem {
  key: string;
  title: string;
  excerpt: string;
  category: string;
  date: Date;
  href: string;
  image: string | import("next/image").StaticImageData; // API path (string) or a bundled image
  tags?: string[];
}

// Everything the blog detail page shows for one article (an admin blog or a showcase article)
export interface ArticleDetail {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: Date;
  image: string | import("next/image").StaticImageData;
  readTime: number; // minutes
  views?: number;
  coverWords?: string[]; // stacked over the right side of the cover photo
  html?: string; // admin blogs: rich-text body
  blocks?: import("./data/sampleArticles").ArticleBlock[]; // showcase articles: structured body
}
