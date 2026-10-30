import Image from "next/image";
import { Quote } from "lucide-react";

import mdImg from "@/assets/team1.jpg";
import sketchImg from "@/assets/image/orange.png";

/* Managing Director's message: portrait on the left, message on the right with a faint orange building
   sketch along the right edge. */
const MdMessage = () => (
  <section className="relative w-full overflow-hidden bg-white">
    <div className="grid lg:grid-cols-[38%_1fr]">
      <div className="relative h-[280px] sm:h-[340px] lg:h-auto lg:self-stretch lg:min-h-[260px]">
        <Image src={mdImg} alt="Mr. Vijay Sharma, Managing Director" fill placeholder="blur" sizes="(min-width: 1024px) 38vw, 100vw" className="object-cover object-[center_30%]" />
      </div>

      <div className="relative px-4 sm:px-8 lg:px-12 py-4 lg:py-5">
        <div
          className="absolute top-0 bottom-0 right-0 w-[48%] opacity-40 pointer-events-none"
          style={{ maskImage: "linear-gradient(to right, transparent, black 45%)", WebkitMaskImage: "linear-gradient(to right, transparent, black 45%)" }}
          aria-hidden="true"
        >
          <Image src={sketchImg} alt="" fill placeholder="blur" sizes="30vw" className="object-contain object-right-bottom" />
        </div>
        <div className="relative max-w-[700px]">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-5 h-[2.5px] bg-[#fd6e15] rounded-full inline-block" />
            <span className="text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.2em] text-[#fd6e15]">MD&apos;s Message</span>
          </div>
          <h2 className="text-[28px] sm:text-[32px] lg:text-[36px] font-serif font-medium leading-[1.1] tracking-tight text-[#0A2B5E] mb-3">
            Designing Spaces
            <br />
            That Create <span className="text-[#fd6e15]">Opportunities</span>
          </h2>
          <div className="flex gap-4">
            <Quote className="w-10 h-10 shrink-0 text-[#fd6e15] fill-[#fd6e15] rotate-180" strokeWidth={1} />
            <div>
              {/* Line breaks as in the design (lg+); on smaller screens the text wraps normally */}
              <p className="text-[13.5px] sm:text-[14px] text-black font-semibold leading-relaxed mb-3">
                Since 2004, our focus has been to create spaces that go beyond aesthetics
                <br className="hidden lg:block" /> and truly work for our clients. At Design House, we combine design thinking,
                <br className="hidden lg:block" /> manufacturing expertise and execution excellence to deliver environments
                <br className="hidden lg:block" /> that strengthen brands, enhance experiences and support business growth.
                <br className="hidden lg:block" /> We value long-term relationships built on trust, quality and consistent delivery.
              </p>
              <p className="text-[15px] font-bold text-[#0A2B5E]">— Mr. Vijay Sharma</p>
              <p className="text-[12.5px] text-[#46658C] leading-snug">
                Managing Director
                <br />
                Design House India Pvt. Ltd.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default MdMessage;
