import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import retailImg from "@/assets/image/b1.webp";
import corporateImg from "@/assets/image/b2.webp";
import restaurantImg from "@/assets/image/b3.webp";

const PROJECTS = [
  { title: "Retail Showroom", place: "Noida, Uttar Pradesh", img: retailImg },
  { title: "Corporate Office", place: "Gurugram, Haryana", img: corporateImg },
  { title: "Restaurant", place: "Delhi NCR", img: restaurantImg },
];

/* "Spaces That Inspire": three project cards (photo, name, place, arrow) linking to the portfolio. */
const AboutProjects = () => (
  <section className="relative w-full bg-[#F7F9FC]">
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-5 lg:py-6">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-5">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-5 h-[2.5px] bg-[#fd6e15] rounded-full inline-block" />
            <span className="text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.2em] text-[#fd6e15]">Featured Projects</span>
          </div>
          <h2 className="text-[28px] sm:text-[32px] lg:text-[36px] font-serif font-medium leading-[1.1] tracking-tight text-[#0A2B5E]">
            Spaces That Inspire
          </h2>
        </div>
        <Link href="/portfolio" className="group inline-flex items-center gap-1.5 text-[13px] font-bold text-[#134698] hover:text-[#fd6e15] transition-colors">
          View All Projects
          <ArrowRight className="w-4 h-4 text-[#fd6e15] transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {PROJECTS.map(({ title, place, img }) => (
          <li key={title}>
            <Link
              href="/portfolio"
              className="group block rounded-md bg-white overflow-hidden shadow-[rgba(0,0,0,0.02)_0px_1px_3px_0px,rgba(27,31,35,0.15)_0px_0px_0px_1px]"
            >
              <div className="relative h-[200px] overflow-hidden">
                <Image src={img} alt={title} fill placeholder="blur" sizes="(min-width: 768px) 33vw, 100vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="flex items-center justify-between gap-3 px-4 py-3.5">
                <div>
                  <h3 className="text-[15px] font-bold text-[#0A2B5E] leading-tight mb-0.5">{title}</h3>
                  <p className="text-[12.5px] text-[#46658C]">{place}</p>
                </div>
                <span className="w-9 h-9 shrink-0 rounded-full bg-[#fd6e15] text-white flex items-center justify-center group-hover:bg-[#e05d0e] transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default AboutProjects;
