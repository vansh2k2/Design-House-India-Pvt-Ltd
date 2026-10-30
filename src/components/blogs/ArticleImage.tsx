import Image from "next/image";

import type { ArticleItem } from "./types";
import { blogImageUrl } from "./utils";

/* Fills its (relative, sized) parent with the article photo: API images as a plain <img>, bundled ones
   through next/image. */
const ArticleImage = ({ item, sizes, className = "" }: { item: ArticleItem; sizes: string; className?: string }) =>
  typeof item.image === "string" ? (
    // eslint-disable-next-line @next/next/no-img-element -- served by the API
    <img src={blogImageUrl(item.image)} alt={item.title} loading="lazy" className={`absolute inset-0 w-full h-full object-cover ${className}`} />
  ) : (
    <Image src={item.image} alt={item.title} fill placeholder="blur" sizes={sizes} className={`object-cover ${className}`} />
  );

export default ArticleImage;
