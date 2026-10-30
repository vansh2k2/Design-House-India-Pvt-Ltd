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
