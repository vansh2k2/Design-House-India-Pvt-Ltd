import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

import type { Project } from "./data";

/* Photo card with the category, title and location over a dark fade at the bottom. */

const ProjectCard = ({ project }: { project: Project }) => (
  <Link
    href={project.href}
    className="group relative block aspect-[14/9] rounded-lg overflow-hidden bg-[#2A1D14] shadow-[0_8px_22px_rgba(10,43,94,0.12)]"
  >
    <Image
      src={project.image}
      alt={project.title}
      fill
      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
    />

    <div className="absolute inset-0 bg-gradient-to-b from-transparent from-[45%] via-[#1E140C]/50 via-[68%] to-[#140D08]/90" />

    <div className="absolute left-0 right-0 bottom-0 p-4 sm:p-5 pr-16 sm:pr-20">
      <p className="text-[10.5px] sm:text-[11px] font-bold uppercase tracking-[0.12em] text-[#fd6e15] mb-1">{project.category}</p>
      <h3 className="text-[14.5px] sm:text-[15.5px] font-bold text-white leading-tight mb-1 group-hover:text-[#fd6e15] transition-colors">{project.title}</h3>
      <p className="flex items-center gap-1.5 text-[11px] sm:text-[11.5px] font-medium text-white/75">
        <MapPin className="w-3.5 h-3.5 text-[#fd6e15] shrink-0" />
        {project.location}
      </p>
    </div>

    <span className="absolute right-4 sm:right-5 bottom-5 sm:bottom-6 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#FFF5EE] text-[#fd6e15] flex items-center justify-center transition-colors group-hover:bg-[#fd6e15] group-hover:text-white">
      <ArrowRight className="w-5 h-5" />
    </span>
  </Link>
);

export default ProjectCard;
