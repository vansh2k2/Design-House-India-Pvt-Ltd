/* Banner text entrance used on the inner-page banners (Downloads, Blogs), same as the home page hero:
   eyebrow blurs in (hb-blur-in), each title line rises out of a blur with a slight 3D tilt
   (hb-title-line), the description sweeps in from the left (hb-desc-in). Render <style>{HERO_BANNER_CSS}</style>
   inside an element with the "hero-banner" class and stagger the parts with animationDelay. */
export const HERO_BANNER_CSS = `
@keyframes hb-blur-in {
  0%   { opacity: 0; filter: blur(18px); transform: translateY(14px) scale(0.97); }
  50%  { opacity: 0.7; filter: blur(5px); }
  100% { opacity: 1; filter: blur(0px); transform: translateY(0) scale(1); }
}
@keyframes hb-title-in {
  0%   { opacity: 0; filter: blur(20px); transform: translateY(80%) rotateX(35deg) scale(0.92); clip-path: inset(0 0 100% 0); }
  35%  { clip-path: inset(0 0 45% 0); filter: blur(8px); opacity: 0.6; }
  100% { opacity: 1; filter: blur(0px); transform: translateY(0) rotateX(0deg) scale(1); clip-path: inset(0 0 0 0); }
}
@keyframes hb-desc-in {
  0%   { opacity: 0; filter: blur(14px); transform: translateY(10px);
         -webkit-mask-image: linear-gradient(to right, transparent 0%, transparent 100%); mask-image: linear-gradient(to right, transparent 0%, transparent 100%); }
  40%  { opacity: 0.8; filter: blur(4px);
         -webkit-mask-image: linear-gradient(to right, black 0%, transparent 55%); mask-image: linear-gradient(to right, black 0%, transparent 55%); }
  100% { opacity: 1; filter: blur(0px); transform: translateY(0);
         -webkit-mask-image: linear-gradient(to right, black 0%, black 100%); mask-image: linear-gradient(to right, black 0%, black 100%); }
}
.hero-banner .hb-blur-in { opacity: 0; animation: hb-blur-in 1.1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
.hero-banner .hb-title-line { display: block; opacity: 0; transform-origin: bottom center; animation: hb-title-in 1.25s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
.hero-banner .hb-desc-in { opacity: 0; animation: hb-desc-in 1.35s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
`;

// Text shadows from the home page hero
export const HERO_TITLE_SHADOW = "1px 1px 2px rgba(0,0,0,0.8), 0 3px 8px rgba(0,0,0,0.6)";
export const HERO_ACCENT_SHADOW = "1px 1px 2px rgba(0,0,0,0.9), 0 3px 10px rgba(0,0,0,0.7), 0 0 20px rgba(253,110,21,0.25)";
export const HERO_DESC_SHADOW = "0 1px 3px rgba(0,0,0,0.6)";
