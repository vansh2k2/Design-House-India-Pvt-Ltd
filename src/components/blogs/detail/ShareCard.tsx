import { useEffect, useState } from "react";
import { Facebook, Link2, Linkedin, MessageCircle } from "lucide-react";
import { toast } from "react-toastify";

import SidebarCard from "../sidebar/SidebarCard";

/* "Share This Article": LinkedIn, Facebook, X and WhatsApp share links for the current page, plus copy link. */
const ShareCard = ({ title }: { title: string }) => {
  // Read after mount so the server and first client render match
  const [url, setUrl] = useState("");
  useEffect(() => {
    setUrl(window.location.href);
  }, []);
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);

  const links = [
    { label: "Share on LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`, bg: "bg-[#0A66C2]", icon: <Linkedin className="w-4 h-4" /> },
    { label: "Share on Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${u}`, bg: "bg-[#1877F2]", icon: <Facebook className="w-4 h-4" /> },
    { label: "Share on X", href: `https://twitter.com/intent/tweet?url=${u}&text=${t}`, bg: "bg-black", icon: <span className="text-[14px] font-bold leading-none">X</span> },
    { label: "Share on WhatsApp", href: `https://wa.me/?text=${t}%20${u}`, bg: "bg-[#25D366]", icon: <MessageCircle className="w-4 h-4" /> },
  ];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied");
    } catch {
      toast.error("Could not copy the link");
    }
  };

  return (
    <SidebarCard title="Share This Article">
      <div className="flex items-center gap-2.5">
        {links.map(({ label, href, bg, icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className={`w-9 h-9 rounded-full ${bg} text-white flex items-center justify-center hover:opacity-85 transition-opacity`}
          >
            {icon}
          </a>
        ))}
        <button
          type="button"
          onClick={copy}
          aria-label="Copy link"
          className="w-9 h-9 rounded-full border border-[#E9902B] text-[#E9902B] flex items-center justify-center hover:bg-[#E9902B] hover:text-white transition-colors"
        >
          <Link2 className="w-4 h-4" />
        </button>
      </div>
    </SidebarCard>
  );
};

export default ShareCard;
