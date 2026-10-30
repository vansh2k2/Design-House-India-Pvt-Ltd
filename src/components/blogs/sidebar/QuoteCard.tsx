import { Quote } from "lucide-react";

/* Warm-tinted box with the company's design quote. */
const QuoteCard = () => (
  <figure className="rounded-md bg-[#FFF6EE] p-5">
    <Quote className="w-8 h-8 text-[#E9902B] fill-[#E9902B] rotate-180 mb-2" strokeWidth={1} />
    <blockquote className="font-serif italic text-[15px] text-[#1F2D44] leading-relaxed mb-3">
      &ldquo;Good design is not just about how a space looks, but how it works for the people who use it.&rdquo;
    </blockquote>
    <figcaption className="text-[12.5px] font-semibold text-[#0A2B5E]">— Design House India</figcaption>
  </figure>
);

export default QuoteCard;
