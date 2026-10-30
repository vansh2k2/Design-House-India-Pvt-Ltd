import { useState, type FormEvent } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { toast } from "react-toastify";

import { useSettings } from "@/hooks/useSettings";
import bgImg from "@/assets/image/t2.webp";

const FALLBACK_EMAIL = "info@designhouse.co.in";

/* Navy "Stay Updated" box with a pendant-lit restaurant photo across its top fading into the navy.
   There is no newsletter API, so subscribing opens the visitor's email app
   with a subscription request addressed to the company's contact email. */
const NewsletterCard = () => {
  const { settings } = useSettings();
  const companyEmail = settings?.emails?.find((e) => e.forContact)?.email || settings?.emails?.[0]?.email || FALLBACK_EMAIL;
  const [email, setEmail] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      toast.error("Enter a valid email address");
      return;
    }
    const subject = encodeURIComponent("Newsletter subscription");
    const body = encodeURIComponent(`Please add ${email.trim()} to the Design House newsletter.`);
    window.location.href = `mailto:${companyEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="relative overflow-hidden rounded-md bg-[#0A2B5E] px-5 pt-24 pb-6 text-white">
      <Image src={bgImg} alt="" fill placeholder="blur" sizes="700px" className="object-cover object-top opacity-70" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A2B5E]/30 via-[#0A2B5E]/85 via-40% to-[#0A2B5E]" />
      <div className="relative">
      <h3 className="font-serif font-medium text-[22px] leading-tight mb-2.5">
        Stay Updated
        <br />
        with Our Insights
      </h3>
      <p className="text-[12.5px] text-white/85 leading-relaxed mb-4">
        Get the latest trends, design ideas and expert advice delivered to your inbox.
      </p>
      <form onSubmit={onSubmit} noValidate className="space-y-2.5">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          className="w-full rounded-[4px] bg-white px-3 py-2.5 text-[12.5px] text-[#1F2D44] placeholder:text-[#8C9BAE] outline-none"
        />
        <button
          type="submit"
          className="group w-full flex items-center justify-center gap-2 rounded-[4px] bg-[#E9902B] hover:bg-[#fd6e15] py-2.5 text-[13px] font-semibold transition-colors"
        >
          Subscribe
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </form>
      </div>
    </div>
  );
};

export default NewsletterCard;
