import Image from "next/image";

import { PHOTOS } from "./data";
import { CONTAINER, CtaButton, Eyebrow } from "./ui";

/* Navy "Have a Project in Mind?" band; a lounge photo fills its right part (lg+), cut on a diagonal
   (top edge starts further right than the bottom) with a gold band along the cut. */
const CUT_TOP = "12%";
const BORDER = "1.6%";

const ProjectsCta = () => (
  <section className="relative w-full overflow-hidden bg-gradient-to-r from-[#061633] to-[#0B2453]">
    <div className="hidden lg:block absolute top-0 bottom-0 right-0 w-[53%]" aria-hidden="true">
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#F2C98A] via-[#D99B55] to-[#B97B3C]"
        style={{ clipPath: `polygon(${CUT_TOP} 0, 100% 0, 100% 100%, 0 100%)` }}
      />
      <div
        className="absolute inset-0"
        style={{ clipPath: `polygon(calc(${CUT_TOP} + ${BORDER}) 0, 100% 0, 100% 100%, ${BORDER} 100%)` }}
      >
        <Image src={PHOTOS.cityLounge} alt="" fill sizes="53vw" className="object-cover object-[50%_62%]" />
      </div>
    </div>

    <div className={`relative ${CONTAINER} py-7 lg:py-6`}>
      <div className="pl-6 sm:pl-8">
        <Eyebrow light>Let&apos;s Work Together</Eyebrow>
        <h2 className="text-[24px] sm:text-[28px] font-serif font-medium leading-tight text-white mb-1">Have a Project in Mind?</h2>
        <p className="text-[13px] sm:text-[14px] text-white/90 leading-snug mb-3.5">Share your requirements with our team for a customized solution.</p>
        <CtaButton href="/contact">Enquire Now</CtaButton>
      </div>
    </div>
  </section>
);

export default ProjectsCta;
