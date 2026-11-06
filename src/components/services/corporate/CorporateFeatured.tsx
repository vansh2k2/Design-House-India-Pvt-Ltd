import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { CorporateDesign } from "./types";

type Featured = CorporateDesign["featured"];

// Faint leaf in the top-right corner of the section
const Leaf = () => (
  <svg aria-hidden="true" viewBox="0 0 160 160" fill="none" className="pointer-events-none absolute -right-4 -top-2 hidden h-[150px] w-[150px] md:block">
    <g fill="#E9DFD3" fillOpacity="0.7">
      <path d="M150 10C110 14 84 38 80 76c34-2 64-26 70-66Z" />
      <path d="M140 70c-34 0-58 20-64 52 30 2 56-18 64-52Z" />
      <path d="M96 4C70 20 60 46 68 74 90 58 100 32 96 4Z" />
    </g>
    <path d="M150 10 70 120M140 70 78 118M96 4 70 90" stroke="#DCCFBF" strokeOpacity="0.8" />
  </svg>
);

/* Featured projects as photo cards: a heading with a divider and a short text beside it, then one card per
   project with an icon on the photo's bottom edge, a title, an orange bar, three keywords and an arrow.
   Part of CorporatePage. */
const CorporateFeatured = ({ featured }: { featured: Featured }) => (
  <section className="relative w-full overflow-hidden bg-[#FBF8F4]">
    <Leaf />

    <div className="relative mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8 lg:py-7">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-10 lg:px-10">
        <div className="shrink-0">
          <div className="flex items-center gap-3">
            <span className="h-[2px] w-10 rounded-full bg-[#D9963B]" />
            <span className="text-[13px] sm:text-[15px] font-bold uppercase tracking-[0.12em] text-[#0A2B5E]">{featured.eyebrow ?? "Featured Corporate"}</span>
          </div>
          <h2 className="mt-1 text-[32px] sm:text-[40px] lg:text-[46px] leading-[1.1] tracking-[-0.01em] text-[#0A2B5E]">
            <span className="font-extrabold text-[#F28C1B]">{featured.title[0]}</span> <span className="font-normal">{featured.title[1]}</span>
          </h2>
        </div>
        <span aria-hidden="true" className="hidden h-16 w-px shrink-0 bg-[#0A2B5E]/60 lg:block" />
        <p className="max-w-[520px] text-[14px] sm:text-[15px] leading-[1.6] text-[#2E3A4E]">{featured.text}</p>
      </div>

      <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-4 2xl:gap-5">
        {featured.items.map(({ image, icon: Icon, title, tags, href }) => (
          <li key={title}>
            <Link
              href={href ?? "/portfolio/interior/corporate-interior"}
              className="group flex h-full flex-col rounded-[14px] bg-white shadow-[rgba(50,50,93,0.25)_0px_2px_5px_-1px,rgba(0,0,0,0.3)_0px_1px_3px_-1px] transition-shadow hover:shadow-[0_10px_24px_rgba(10,43,94,0.16)]"
            >
              <div className="relative">
                <div className="relative aspect-[4/3] overflow-hidden rounded-t-[14px]">
                  <Image
                    src={image}
                    alt={title}
                    fill
                    placeholder={typeof image !== "string" ? "blur" : undefined}
                    sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                {/* Half on the photo, half on the card */}
                <span className="absolute bottom-0 left-4 flex h-[46px] w-[46px] translate-y-1/2 items-center justify-center rounded-full bg-[#FCEBDC] ring-4 ring-white">
                  <Icon className="h-6 w-6 text-[#0A2B5E]" strokeWidth={1.5} />
                </span>
              </div>

              <div className="flex flex-1 flex-col px-4 pb-4 pt-8 xl:px-3">
                <h3 className="text-[16px] xl:text-[15px] 2xl:text-[16px] font-bold leading-tight text-[#0A2B5E] transition-colors group-hover:text-[#D9963B]">{title}</h3>
                <span aria-hidden="true" className="mt-2 h-[3px] w-8 rounded-full bg-[#D9963B]" />

                <div className="mt-auto flex items-center justify-between gap-2 pt-4 xl:gap-1.5 2xl:gap-2">
                  <p className="min-w-0 whitespace-nowrap text-[11.5px] xl:text-[10px] 2xl:text-[10.5px] text-[#3B4658]">
                    {tags.map((tag, i) => (
                      <span key={tag}>
                        {i > 0 && <span className="mx-1.5 text-[#D9963B] xl:mx-[3px] 2xl:mx-1">|</span>}
                        {tag}
                      </span>
                    ))}
                  </p>
                  <span className="flex h-7 w-7 shrink-0 items-center xl:h-6 xl:w-6 2xl:h-7 2xl:w-7 justify-center rounded-full border-[1.5px] border-[#D9963B] text-[#0A2B5E] transition-colors group-hover:bg-[#D9963B] group-hover:text-white">
                    <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.4} />
                  </span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default CorporateFeatured;
