"use client";

import type { ImageLoaderProps, ImageProps } from "next/image";
import Image from "next/dist/shared/lib/image-external";

/* Every `next/image` on the site resolves to this (next.config.mjs → turbopack.resolveAlias).

   Cloudinary images go straight from Cloudinary to the browser, resized and converted there. Through
   /_next/image this server had to download and resize each one first, about a second each with 70+ on the
   home page, and any download over 7 seconds (Next's fixed limit, easily hit while the dev server compiles)
   failed with a 500/504. All other images keep the built-in optimizer. A site-wide `images.loaderFile`
   can't do this: Next switches /_next/image off as soon as one is set. */

const CLOUDINARY_IMAGE = /^(https:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\/)(.+)$/;

// f_auto: AVIF/WebP as the browser supports · c_limit: never enlarged beyond the original
const cloudinaryLoader = ({ src, width, quality }: ImageLoaderProps) =>
  src.replace(CLOUDINARY_IMAGE, `$1f_auto,q_${quality ?? "auto"},c_limit,w_${width}/$2`);

export default function SiteImage(props: ImageProps) {
  const fromCloudinary = typeof props.src === "string" && CLOUDINARY_IMAGE.test(props.src);
  return <Image {...props} loader={fromCloudinary ? cloudinaryLoader : props.loader} />;
}
