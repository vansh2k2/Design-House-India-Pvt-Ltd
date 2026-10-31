import type { CSSProperties } from "react";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

import type { SocialNetwork } from "@/lib/socialLinks";

type IconProps = { size?: number; className?: string; style?: CSSProperties };

// lucide only has the old Twitter bird, so the X logo is drawn here
const XLogo = ({ size = 24, className, style }: IconProps) => (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} style={style} fill="currentColor" aria-hidden="true">
        <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.65l-5.22-6.82-5.96 6.82H1.68l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23Zm-1.16 17.52h1.84L7.08 4.13H5.12l11.96 15.64Z" />
    </svg>
);

const ICONS: Record<SocialNetwork, React.ComponentType<IconProps>> = {
    facebook: Facebook,
    instagram: Instagram,
    twitter: XLogo,
    linkedin: Linkedin,
    youtube: Youtube,
};

const SocialIcon = ({ network, ...props }: IconProps & { network: SocialNetwork }) => {
    const Icon = ICONS[network];
    return <Icon {...props} />;
};

export default SocialIcon;
