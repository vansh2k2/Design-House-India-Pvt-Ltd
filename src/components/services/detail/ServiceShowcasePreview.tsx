"use client";

import { createContext, useContext, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";

import type { ServiceDetail } from "./types";

/* The banner's main photo changes by itself: it dissolves through the row of small photos and back, over and over.
   Hovering a small photo shows that one and holds it until the mouse leaves the row, and keyboard focus does the
   same; on touch screens a tap moves the show to that photo. The large versions download one at a time as their
   turn comes near, and only once the page has settled, so opening the page costs nothing extra.
   This part runs in the browser; the rest of the banner stays on the server. */

type Gallery = NonNullable<ServiceDetail["hero"]["showcase"]>["gallery"];

const prefersStillPhotos = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

interface Preview {
  gallery: Gallery;
  held: number | null; // the photo being hovered or focused
  slide: number | null; // where the automatic show has got to; null is the banner's own main photo
  mounted: number; // how many of the large photos are in the page so far
  prepare: () => void;
  show: (index: number) => void;
  hide: () => void;
  jump: (index: number) => void;
  nextSlide: () => void;
}

const nothing = () => {};
const PreviewContext = createContext<Preview>({ gallery: [], held: null, slide: null, mounted: 0, prepare: nothing, show: nothing, hide: nothing, jump: nothing, nextSlide: nothing });

export const ShowcasePreview = ({ gallery, children }: { gallery: Gallery; children: ReactNode }) => {
  const [held, setHeld] = useState<number | null>(null);
  const [slide, setSlide] = useState<number | null>(null);
  const [mounted, setMounted] = useState(0);

  const prepare = () => setMounted(gallery.length);

  // The first photo of the show starts downloading once the page's own photo and scripts have had their turn
  useEffect(() => {
    if (prefersStillPhotos()) return;
    const start = () => setMounted((count) => Math.max(count, 1));
    if ("requestIdleCallback" in window) requestIdleCallback(start, { timeout: 3000 });
    else setTimeout(start, 2000);
  }, []);

  const value: Preview = {
    gallery,
    held,
    slide,
    mounted,
    prepare,
    show: (index) => {
      prepare();
      setHeld(index);
    },
    hide: () => setHeld(null),
    jump: (index) => {
      prepare();
      setSlide(index);
    },
    nextSlide: () => {
      const next = slide === null ? 0 : slide + 1 < gallery.length ? slide + 1 : null;
      setSlide(next);
      // The one after it starts downloading now, so that it is ready when its turn comes
      if (next !== null) setMounted((count) => Math.max(count, Math.min(gallery.length, next + 2)));
    },
  };

  return <PreviewContext.Provider value={value}>{children}</PreviewContext.Provider>;
};

const MAIN_PHOTO = -1;
const CHANGE_EVERY_MS = 3000;
const DISSOLVE_MS = 1100;
const DISSOLVE_EASING = "cubic-bezier(0.45, 0, 0.25, 1)";
const DISSOLVE_FRAMES = [
  { opacity: 0, transform: "scale(1.05)", filter: "brightness(1.12)" },
  { opacity: 1, transform: "scale(1)", filter: "brightness(1)" },
];

// Goes inside the photo's positioned, clipped box, so every photo keeps the banner's shape
export const ShowcaseMainPhoto = ({ image, alt, sizes, position = "" }: { image: ServiceDetail["hero"]["image"]; alt: string; sizes: string; position?: string }) => {
  const { gallery, held, slide, mounted, nextSlide } = useContext(PreviewContext);
  const [loaded, setLoaded] = useState<number[]>([]);
  const box = useRef<HTMLSpanElement>(null);
  const layers = useRef(new Map<number, HTMLSpanElement>());
  const showing = useRef(MAIN_PHOTO);
  const topLayer = useRef(0);

  const wanted = held ?? slide ?? MAIN_PHOTO;
  const ready = wanted === MAIN_PHOTO || loaded.includes(wanted);

  // The new photo fades in on top while the old one stays whole beneath it, so nothing else ever shows through,
  // however quickly the mouse moves along the row. A photo still downloading waits, so it never starts out blurred.
  useLayoutEffect(() => {
    const layer = layers.current.get(wanted);
    if (!layer || !ready || showing.current === wanted) return;
    showing.current = wanted;
    topLayer.current += 1;
    layer.style.zIndex = String(topLayer.current);
    layer.style.opacity = "1";
    if (!prefersStillPhotos()) layer.animate(DISSOLVE_FRAMES, { duration: DISSOLVE_MS, easing: DISSOLVE_EASING });
  }, [ready, wanted]);

  // The automatic show. It waits while a photo is held or still downloading, and while nobody can see the banner
  useEffect(() => {
    if (held !== null || !ready || !gallery.length || prefersStillPhotos()) return;
    const timer = setInterval(() => {
      const place = box.current?.getBoundingClientRect();
      if (!document.hidden && place && place.bottom > 0 && place.top < window.innerHeight) nextSlide();
    }, CHANGE_EVERY_MS);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [held, ready, slide, gallery.length]);

  const keepLayer = (index: number) => (layer: HTMLSpanElement | null) => {
    if (layer) layers.current.set(index, layer);
    else layers.current.delete(index);
  };

  return (
    <span ref={box} className="absolute inset-0 isolate overflow-hidden">
      <span ref={keepLayer(MAIN_PHOTO)} className="absolute inset-0">
        <Image src={image} alt={alt} fill priority placeholder="blur" sizes={sizes} className={`object-cover ${position}`} />
      </span>
      {gallery.slice(0, mounted).map((photo, index) => (
        <span key={photo.alt} ref={keepLayer(index)} className="absolute inset-0 opacity-0">
          <Image
            src={photo.image}
            alt=""
            fill
            loading="eager"
            placeholder="blur"
            sizes={sizes}
            onLoad={() => setLoaded((done) => [...done, index])}
            className={`object-cover ${position}`}
          />
        </span>
      ))}
    </span>
  );
};

export const ShowcaseThumbs = ({ listClassName, photoClassName }: { listClassName: string; photoClassName: string }) => {
  const { gallery, held, slide, prepare, show, hide, jump } = useContext(PreviewContext);
  const current = held ?? slide;
  return (
    <ul
      className={listClassName}
      onPointerEnter={(event) => event.pointerType === "mouse" && prepare()}
      onPointerLeave={(event) => event.pointerType === "mouse" && hide()}
    >
      {gallery.map(({ image, alt, caption }, index) => (
        <li key={alt}>
          <button
            type="button"
            aria-label={`Show in the main photo: ${alt}`}
            aria-pressed={held === index}
            onPointerEnter={(event) => event.pointerType === "mouse" && show(index)}
            onPointerUp={(event) => event.pointerType !== "mouse" && jump(index)}
            onFocus={(event) => event.currentTarget.matches(":focus-visible") && show(index)}
            onBlur={hide}
            className="block w-full cursor-pointer text-left"
          >
            <span className={`relative block aspect-[271/112] overflow-hidden rounded-md transition-shadow duration-700 lg:aspect-auto ${photoClassName} ${current === index ? "ring-2 ring-[#C98F4E]" : ""}`}>
              <Image src={image} alt={alt} fill placeholder="blur" sizes="(min-width: 1024px) 18vw, (min-width: 640px) 25vw, 50vw" className="object-cover" />
            </span>
            {caption && (
              <>
                <span className="mt-1.5 block text-[12px] font-bold leading-[14px] text-[#0A2B5E] 2xl:text-[13px]">{caption}</span>
                <span className="mt-1.5 block h-[2px] w-8 bg-[#C98F4E]" />
              </>
            )}
          </button>
        </li>
      ))}
    </ul>
  );
};
