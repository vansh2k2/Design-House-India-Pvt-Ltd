import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { ServiceDetail } from "./types";

type Hero = ServiceDetail["hero"];
type Showcase = NonNullable<Hero["showcase"]>;
type Layout = NonNullable<Showcase["layout"]>;

/* Same type styles as the Services page banner (ServicesHero) */
const EYEBROW = "text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.25em]";
const HEADING = "font-serif text-[34px] sm:text-[42px] lg:text-[clamp(30px,2.85vw,50px)] font-medium text-[#0A2B5E]";
const TAGLINE = "text-[16px] sm:text-[18px] lg:text-[16px] xl:text-[17px] 2xl:text-[18px] font-bold leading-snug text-[#0A2B5E]";
const TAGLINE_LONG = "text-[16px] xl:text-[15px] 2xl:text-[16px] font-bold leading-snug text-[#0A2B5E]";
const TAGLINE_WIDE = "text-[16px] sm:text-[18px] lg:text-[15px] xl:text-[15.5px] 2xl:text-[18px] font-bold leading-snug text-[#0A2B5E]";
const BODY = "text-[13px] 2xl:text-[14px] leading-[1.45] text-[#46556E]";

const GOLD = "text-[#B77E3B]";

const FEATURE_STYLES: Record<Layout, { grid: string; divider: string; circle: string; icon: string; label: string; indents?: string[]; pad?: string; labelSize?: string; centered?: boolean }> = {
  "photo-left": {
    grid: "xl:grid-cols-[1fr_0.98fr_1fr_1.14fr]",
    divider: "xl:before:bottom-0 xl:before:h-[56px]",
    circle: "h-[48px] w-[48px] 2xl:h-[56px] 2xl:w-[56px]",
    icon: "h-[26px] w-[26px] 2xl:h-[31px] 2xl:w-[31px]",
    label: "2xl:whitespace-nowrap",
  },
  "photo-right-cut": {
    grid: "xl:grid-cols-[132fr_141fr_141fr_139fr]",
    divider: "xl:before:top-[42px] xl:before:h-[57px]",
    circle: "h-[46px] w-[46px] 2xl:h-[50px] 2xl:w-[50px]",
    icon: "h-[25px] w-[25px] 2xl:h-[28px] 2xl:w-[28px]",
    label: "",
  },
  "photo-right-band": {
    grid: "xl:grid-cols-[116fr_136fr_146fr_144fr] 2xl:grid-cols-[110fr_146fr_142fr_144fr]",
    divider: "xl:before:top-[49px] xl:before:h-[59px]",
    circle: "h-[50px] w-[50px] 2xl:h-[58px] 2xl:w-[58px]",
    icon: "h-[29px] w-[29px] 2xl:h-[35px] 2xl:w-[35px]",
    label: "2xl:whitespace-nowrap",
    indents: ["", "2xl:ml-[5px]", "2xl:ml-[15px]", "2xl:ml-[20px]"],
  },
  "photo-right-cut-navy": {
    grid: "xl:grid-cols-[114fr_153fr_138fr_137fr]",
    divider: "xl:before:top-[45px] xl:before:h-[55px]",
    circle: "h-[48px] w-[48px] 2xl:h-[54px] 2xl:w-[54px]",
    icon: "h-[27px] w-[27px] 2xl:h-[32px] 2xl:w-[32px]",
    label: "2xl:whitespace-nowrap",
    indents: ["", "2xl:ml-[14px]", "2xl:ml-[6px]", "2xl:ml-[15px]"],
  },
  "photo-left-cut-navy": {
    grid: "xl:grid-cols-[129fr_141fr_126fr_141fr]",
    divider: "xl:before:top-[46px] xl:before:h-[50px]",
    circle: "h-[46px] w-[46px] 2xl:h-[52px] 2xl:w-[52px]",
    icon: "h-[26px] w-[26px] 2xl:h-[30px] 2xl:w-[30px]",
    label: "2xl:whitespace-nowrap",
    indents: ["2xl:ml-[19px]", "2xl:ml-[22px]", "2xl:ml-[19px]", "2xl:ml-[21px]"],
    pad: "xl:pl-3",
    labelSize: "text-[12px] xl:text-[11.5px]",
  },
  "photo-right-slant-navy": {
    grid: "xl:grid-cols-[120fr_155fr_161fr_151fr]",
    divider: "xl:before:top-[44px] xl:before:h-[60px]",
    circle: "h-[48px] w-[48px] 2xl:h-[55px] 2xl:w-[55px]",
    icon: "h-[27px] w-[27px] 2xl:h-[31px] 2xl:w-[31px]",
    label: "2xl:whitespace-nowrap",
    indents: ["2xl:ml-[3px]", "2xl:ml-[17px]", "2xl:ml-[23px]", "2xl:ml-[21px]"],
    pad: "xl:pl-3 2xl:pl-[24px]",
    labelSize: "text-[12px] xl:text-[11.5px]",
  },
  "photo-right-slant-stats": {
    grid: "xl:grid-cols-[120fr_158fr_162fr_147fr]",
    divider: "xl:before:top-[45px] xl:before:h-[60px]",
    circle: "h-[48px] w-[48px] 2xl:h-[56px] 2xl:w-[56px]",
    icon: "h-[27px] w-[27px] 2xl:h-[31px] 2xl:w-[31px]",
    label: "2xl:whitespace-nowrap",
    indents: ["2xl:ml-[9px]", "2xl:ml-[21px]", "2xl:ml-[17px]", "2xl:ml-[21px]"],
    pad: "xl:pl-3 2xl:pl-[26px]",
    labelSize: "text-[12px] xl:text-[11.5px]",
  },
  "photo-right-edge-captions": {
    grid: "xl:grid-cols-[150fr_155fr_157fr_156fr]",
    divider: "xl:before:top-[44px] 2xl:before:top-[50px] xl:before:h-[57px]",
    circle: "h-[48px] w-[48px] 2xl:h-[54px] 2xl:w-[54px]",
    icon: "h-[27px] w-[27px] 2xl:h-[31px] 2xl:w-[31px]",
    label: "2xl:whitespace-nowrap",
    pad: "",
    labelSize: "text-[12px] xl:text-[11.5px]",
    centered: true,
  },
  "photo-left-edge-captions": {
    grid: "xl:grid-cols-[148fr_137fr_135fr_137fr]",
    divider: "xl:before:top-[44px] 2xl:before:top-[48px] xl:before:h-[57px]",
    circle: "h-[48px] w-[48px] 2xl:h-[54px] 2xl:w-[54px]",
    icon: "h-[27px] w-[27px] 2xl:h-[31px] 2xl:w-[31px]",
    label: "2xl:whitespace-nowrap",
    pad: "",
    labelSize: "text-[12px] xl:text-[11.5px]",
    centered: true,
  },
  "photo-left-wedge-captions": {
    grid: "xl:grid-cols-[122fr_102fr_141fr_124fr] 2xl:grid-cols-[148fr_151fr_153fr_152fr]",
    divider: "xl:before:top-[24px] xl:before:h-[66px]",
    circle: "h-[46px] w-[46px]",
    icon: "h-[26px] w-[26px]",
    label: "2xl:whitespace-nowrap",
    pad: "",
    labelSize: "text-[12px] xl:text-[11.5px]",
    centered: true,
  },
};

const BUTTON_SIZES: Record<Layout, string> = {
  "photo-left": "h-[44px] 2xl:h-[47px] sm:w-[170px] 2xl:w-[187px]",
  "photo-right-cut": "h-[42px] sm:w-[170px] 2xl:w-[208px]",
  "photo-right-band": "h-[44px] 2xl:h-[47px] sm:w-[170px] 2xl:w-[190px]",
  "photo-right-cut-navy": "h-[42px] 2xl:h-[43px] sm:w-[170px] 2xl:w-[203px]",
  "photo-left-cut-navy": "h-[42px] 2xl:h-[43px] sm:w-[170px] 2xl:w-[185px]",
  "photo-right-slant-navy": "h-[42px] sm:w-[170px] 2xl:w-[202px]",
  "photo-right-slant-stats": "h-[41px] sm:w-[170px] 2xl:w-[204px]",
  "photo-right-edge-captions": "h-[40px] sm:w-[170px] 2xl:w-[192px]",
  "photo-left-edge-captions": "h-[38px] sm:w-[170px] 2xl:w-[185px]",
  "photo-left-wedge-captions": "h-[36px] sm:w-[170px] 2xl:w-[193px]",
};

const GALLERY_STYLES: Record<Layout, { list: string; photo: string }> = {
  "photo-left": { list: "lg:w-[74.8%] lg:grid-cols-[1.05fr_1.05fr_1.05fr_1fr] lg:gap-[14px] lg:pb-[20px] lg:pl-[4.31vw] lg:pr-0 lg:pt-[13px]", photo: "lg:h-[7vw]" },
  "photo-right-cut": { list: "lg:w-[76.1%] lg:gap-[14px] lg:pb-[21px] lg:pl-[5.44vw] lg:pr-0 lg:pt-[16px]", photo: "lg:h-[6.56vw]" },
  "photo-right-band": { list: "lg:ml-[28.94%] lg:mr-[2.44%] lg:grid-cols-[269fr_257fr_289fr_252fr] lg:gap-[10px] lg:px-0 lg:pb-[30px] lg:pt-3", photo: "lg:h-[7.31vw]" },
  "photo-right-cut-navy": { list: "lg:w-[74.56%] lg:grid-cols-[260fr_268fr_267fr_259fr] lg:gap-[13px] lg:pb-[25px] lg:pl-[6.125vw] lg:pr-0 lg:pt-[13px]", photo: "lg:h-[6.875vw]" },
  "photo-left-cut-navy": { list: "lg:w-[75.5%] lg:grid-cols-[276fr_270fr_270fr_269fr] lg:gap-[14px] lg:pb-[31px] lg:pl-[4.875vw] lg:pr-0 lg:pt-[14px]", photo: "lg:h-[7.125vw]" },
  "photo-right-slant-navy": { list: "lg:w-[74.44%] lg:gap-[19px] lg:pb-[30px] lg:pl-[5.875vw] lg:pr-0 lg:pt-[14px]", photo: "lg:h-[7vw]" },
  "photo-right-slant-stats": { list: "lg:w-[71.31%] lg:grid-cols-[263fr_264fr_253fr_233fr] lg:gap-[15px] lg:pb-[31px] lg:pl-[5.19vw] lg:pr-0 lg:pt-[12px]", photo: "lg:h-[6.94vw]" },
  "photo-right-edge-captions": { list: "lg:w-[75.5%] lg:grid-cols-[269fr_257fr_270fr_257fr] lg:gap-[19px] lg:pb-[17px] lg:pl-[6.125vw] lg:pr-0 lg:pt-[16px]", photo: "lg:h-[5.94vw]" },
  "photo-left-edge-captions": { list: "lg:w-[76.06%] lg:grid-cols-[269fr_265fr_266fr_263fr] lg:gap-[19px] lg:pb-[17px] lg:pl-[6.125vw] lg:pr-0 lg:pt-[16px]", photo: "lg:h-[5.94vw]" },
  "photo-left-wedge-captions": { list: "lg:w-[76.38%] lg:grid-cols-[263fr_263fr_265fr_266fr] lg:gap-[22px] lg:pb-[19px] lg:pl-[6.19vw] lg:pr-0 lg:pt-[16px]", photo: "lg:h-[5.81vw]" },
};

// The navy shape under the banner: a wide block on one side that runs on as a thin bar along the bottom
const BAND_SHAPES: Partial<Record<Layout, { shape: string; stat: string; rings?: boolean; statLabel?: string }>> = {
  "photo-right-band": {
    shape: "polygon(0 2px, 24.25% 2px, 28.56% calc(100% - 20px), 100% calc(100% - 20px), 100% 100%, 0 100%)",
    stat: "lg:bottom-[20px] lg:left-[6.44%]",
  },
  "photo-right-cut-navy": {
    shape: "polygon(78.875% 0, 100% 0, 100% 100%, 0 100%, 0 calc(100% - 12px), 74.875% calc(100% - 12px))",
    stat: "lg:bottom-[12px] lg:left-[80.56%] lg:right-0",
  },
  "photo-left-cut-navy": {
    // The extra points round off the two inner corners
    shape: "polygon(80.3% 12px, 80.6% 7px, 81.06% 5px, 100% 5px, 100% 100%, 0 100%, 0 calc(100% - 20px), 75.9% calc(100% - 20px), 76.15% calc(100% - 21px), 76.4% calc(100% - 24px))",
    stat: "lg:bottom-[20px] lg:left-[81.94%] lg:right-0",
  },
  "photo-right-slant-navy": {
    // The extra points round off the two inner corners
    shape: "polygon(78.63% 12px, 78.88% 7px, 79.25% 5px, 100% 5px, 100% 100%, 0 100%, 0 calc(100% - 20px), 74.25% calc(100% - 20px), 74.63% calc(100% - 21px), 74.88% calc(100% - 24px))",
    stat: "lg:bottom-[20px] lg:left-[81.38%] lg:right-0",
  },
  "photo-right-slant-stats": {
    // The extra points round off the two inner corners
    shape: "polygon(75.19% 12px, 75.44% 7px, 75.88% 4px, 100% 4px, 100% 100%, 0 100%, 0 calc(100% - 20px), 71.13% calc(100% - 20px), 71.5% calc(100% - 21px), 71.75% calc(100% - 24px))",
    stat: "lg:bottom-[14px] lg:left-[75.63%] lg:right-[10px]",
  },
  "photo-right-edge-captions": {
    shape: "polygon(80.63% 0, 100% 0, 100% 100%, 75.81% 100%)",
    stat: "lg:bottom-[14px] lg:left-[82.38%] lg:right-0",
    rings: true,
  },
  "photo-left-edge-captions": {
    shape: "polygon(81% 0, 100% 0, 100% 100%, 76.25% 100%)",
    stat: "lg:bottom-[14px] lg:left-[82.38%] lg:right-0",
    rings: true,
    statLabel: "text-[11.5px] xl:text-[12px] 2xl:text-[13.5px]", // a long second line
  },
  "photo-left-wedge-captions": {
    shape: "polygon(81.63% 0, 100% 0, 100% 100%, 76.31% 100%)",
    stat: "lg:bottom-[10px] lg:left-[82.38%] lg:right-0",
    rings: true,
  },
};

// The photo on a diagonal edge with a thin gold line, and the spacing of the text beside it
type CutStyle = Record<"photoBox" | "band" | "line" | "photo" | "panel" | "eyebrow" | "eyebrowLine" | "heading" | "tagline" | "body" | "features" | "buttons", string> & {
  oneLineTitle?: boolean;
  photoPosition?: string;
};

const CUT_STYLES: Partial<Record<Layout, CutStyle>> = {
  "photo-right-cut": {
    photoBox: "lg:w-[63.5%]",
    band: "bg-gradient-to-b from-[#F6ECDE] to-[#EAD8BF] [clip-path:polygon(0_0,100%_0,100%_100%,10.6%_100%)]",
    line: "bg-[#C79A5B] [clip-path:polygon(1.8%_0,100%_0,100%_100%,11.02%_100%)]",
    photo: "lg:[clip-path:polygon(1.97%_0,100%_0,100%_100%,11.2%_100%)]",
    panel: "lg:w-[40%] lg:py-5 lg:pl-[5.44vw] lg:pr-0 2xl:pb-1 2xl:pt-[34px]",
    eyebrow: "gap-3",
    eyebrowLine: "w-8",
    heading: "mt-3 leading-[0.97] 2xl:mt-3",
    tagline: "mt-2 2xl:mt-[3px]",
    body: "mt-2 max-w-[460px] lg:max-w-[310px] xl:max-w-[430px] 2xl:mt-[4px] 2xl:max-w-[460px] 2xl:leading-[18px]",
    features: "mt-4 2xl:mt-2",
    buttons: "mt-5 2xl:mt-2",
  },
  "photo-right-cut-navy": {
    photoBox: "lg:w-[64.875%]",
    band: "bg-[#EAD8BF] [clip-path:polygon(0_0,100%_0,100%_100%,10.8%_100%)]",
    line: "bg-[#C79A5B] [clip-path:polygon(0.45%_0,100%_0,100%_100%,11.05%_100%)]",
    photo: "lg:[clip-path:polygon(0.6%_0,100%_0,100%_100%,11.2%_100%)]",
    panel: "lg:w-[40.5%] lg:py-5 lg:pl-[6.125vw] lg:pr-4 2xl:pb-[3px] 2xl:pr-0 2xl:pt-[42px]",
    eyebrow: "gap-3 2xl:gap-[19px]",
    eyebrowLine: "w-8 2xl:w-10",
    heading: "mt-3 leading-[0.95] 2xl:mt-[11px]",
    tagline: "mt-2 lg:max-w-[31.5vw] 2xl:mt-1",
    body: "mt-2 lg:max-w-[27vw] 2xl:mt-[9px] 2xl:leading-[19px]",
    features: "mt-4 2xl:mt-[13px]",
    buttons: "mt-5 2xl:mt-[10px]",
  },
  "photo-right-slant-navy": {
    oneLineTitle: true,
    photoPosition: "lg:object-top",
    photoBox: "lg:w-[64.56%]",
    band: "bg-[#C79A5B] [clip-path:polygon(0_0,100%_0,100%_100%,15.78%_100%)]",
    line: "bg-gradient-to-b from-[#FBF3E7] to-[#EFDFC6] [clip-path:polygon(0.16%_0,100%_0,100%_100%,15.94%_100%)]",
    photo: "lg:[clip-path:polygon(2.13%_0,100%_0,100%_100%,17.6%_100%,17.2%_calc(100%_-_4px),17.02%_calc(100%_-_10px))]",
    panel: "lg:w-[40%] lg:py-5 lg:pl-[5.875vw] lg:pr-4 xl:w-[43.5%] 2xl:w-[42.6%] 2xl:pb-0 2xl:pr-0 2xl:pt-[48px]",
    eyebrow: "gap-3 2xl:ml-[6px] 2xl:gap-[16px]",
    eyebrowLine: "w-8 2xl:w-10",
    heading: "mt-3 leading-[1.05] 2xl:ml-[6px] 2xl:mt-[17px]",
    tagline: "mt-2 2xl:ml-[6px]",
    body: "mt-2 lg:max-w-[28vw] 2xl:ml-[6px] 2xl:mt-[10px] 2xl:max-w-[27.6vw] 2xl:leading-[19px]",
    features: "mt-4 2xl:mt-[15px]",
    buttons: "mt-5 2xl:mt-2",
  },
  "photo-right-slant-stats": {
    oneLineTitle: true,
    photoPosition: "lg:object-top",
    photoBox: "lg:w-[62%]",
    band: "bg-[#F3F4F6] [clip-path:polygon(0_0,100%_0,100%_100%,12.05%_100%)]",
    line: "bg-[#E3E5EA] [clip-path:polygon(0.7%_0,100%_0,100%_100%,12.75%_100%)]",
    photo: "lg:[clip-path:polygon(1.41%_0,100%_0,100%_100%,15.3%_100%,14.3%_calc(100%_-_3px),13.6%_calc(100%_-_9px),13%_calc(100%_-_18px))]",
    panel: "lg:w-[38%] lg:py-5 lg:pl-[5.81vw] lg:pr-4 xl:w-[43%] 2xl:w-[42.5%] 2xl:pb-0 2xl:pr-0 2xl:pt-[50px]",
    eyebrow: "gap-3 2xl:ml-[10px] 2xl:gap-[16px]",
    eyebrowLine: "w-8 2xl:w-[38px]",
    heading: "mt-3 leading-[1.05] 2xl:ml-[12px] 2xl:mt-[17px]",
    tagline: "mt-2 2xl:ml-[12px]",
    body: "mt-2 lg:max-w-[28vw] 2xl:ml-[12px] 2xl:mt-[13px] 2xl:max-w-[26vw] 2xl:leading-[18.5px]",
    features: "mt-4 2xl:mt-[13px]",
    buttons: "mt-5 2xl:ml-[5px] 2xl:mt-2",
  },
  "photo-right-edge-captions": {
    oneLineTitle: true,
    photoPosition: "xl:object-left",
    photoBox: "lg:w-[58.75%]",
    band: "bg-[#C79A5B] [clip-path:polygon(2.55%_0,100%_0,100%_100%,15.53%_100%)]",
    line: "bg-[#D9B98E] [clip-path:polygon(0.53%_0,0.96%_0,2.34%_12%,2.1%_12%)]",
    photo: "lg:[clip-path:polygon(3.72%_0,100%_0,100%_100%,17.02%_100%)]",
    panel: "lg:w-[38%] lg:py-5 lg:pl-[6.94vw] lg:pr-4 xl:w-[44.5%] xl:pr-0 2xl:w-[44%] 2xl:pb-0 2xl:pt-[48px]",
    eyebrow: "gap-3 2xl:-ml-[4px] 2xl:gap-[14px]",
    eyebrowLine: "w-8 2xl:w-10",
    heading: "mt-3 leading-[1.05] 2xl:mt-[17px]",
    tagline: "mt-2 2xl:mt-[14px]",
    body: "mt-2 lg:max-w-[28vw] 2xl:mt-[10px] 2xl:max-w-[29vw] 2xl:leading-[19px]",
    features: "mt-4 2xl:-ml-[26px] 2xl:mt-2",
    buttons: "mt-5 2xl:-ml-[5px] 2xl:mt-[10px]",
  },
};

// Photo on the left with a diagonal edge, and the spacing of the text beside it
type PhotoLeftStyle = Record<"photoBox" | "photo" | "panel" | "eyebrow" | "eyebrowLine" | "heading" | "tagline" | "body" | "features" | "buttons", string> & {
  band?: string; // shows behind the photo's edge
  accent?: string; // a pale shape beyond the band
  logo?: string; // size of hero.brandLogo, which replaces the eyebrow
  textIndent?: string;
};

const PHOTO_LEFT_STYLES: Partial<Record<Layout, PhotoLeftStyle>> = {
  "photo-left-cut-navy": {
    photoBox: "lg:w-[62.5%]",
    photo: "lg:[clip-path:polygon(0_0,100%_0,92.2%_100%,0_100%)]",
    panel: "lg:ml-[63%] lg:py-5 lg:pl-0 lg:pr-[55px] 2xl:pb-2 2xl:pt-[33px]",
    textIndent: "xl:ml-[38px]",
    eyebrow: "gap-3",
    eyebrowLine: "w-8",
    heading: "mt-3 leading-[0.92] 2xl:mt-[14px]",
    tagline: `${TAGLINE_LONG} mt-2 2xl:mt-[3px]`,
    body: "mt-2 max-w-[440px] 2xl:mt-[6px] 2xl:leading-[17px]",
    features: "mt-4 2xl:mt-[9px]",
    buttons: "mt-5 xl:ml-5 2xl:mt-2",
  },
  "photo-left-edge-captions": {
    photoBox: "lg:w-[63.19%]",
    band: "bg-[#C79A5B] [clip-path:polygon(0_0,100%_0,85.46%_100%,0_100%)]",
    photo: "lg:[clip-path:polygon(0_0,98.91%_0,84.37%_100%,0_100%)]",
    panel: "lg:ml-[64.6%] lg:py-5 lg:pl-0 lg:pr-[52px] 2xl:pb-0 2xl:pt-[36px]",
    eyebrow: "gap-3 2xl:gap-[15px]",
    eyebrowLine: "w-8 2xl:w-[38px]",
    heading: "mt-3 leading-[1.07] 2xl:mt-4",
    tagline: `${TAGLINE_WIDE} mt-2`,
    body: "mt-2 max-w-[500px] 2xl:mt-[9px] 2xl:leading-[16.5px]",
    features: "mt-4 xl:-ml-[2.56vw] 2xl:mt-[9px]",
    buttons: "mt-5 2xl:mt-[10px]",
  },
  "photo-left-wedge-captions": {
    photoBox: "lg:w-[60.125%]",
    accent: "bg-[#F6ECDF] [clip-path:polygon(89.3%_0,91.16%_0,97.4%_46.2%,96.05%_50%)]",
    band: "bg-gradient-to-b from-[#DDBB7C] to-[#C79A5B] [clip-path:polygon(0_0,86.38%_0,100%_100%,0_100%)]",
    photo: "lg:[clip-path:polygon(0_0,84.1%_0,98.65%_100%,0_100%)]",
    panel: "lg:ml-[63%] lg:py-5 lg:pl-0 lg:pr-[58px] 2xl:pb-[3px] 2xl:pr-[36px] 2xl:pt-[13px]",
    logo: "h-auto w-[180px] mix-blend-multiply lg:w-[150px] 2xl:-ml-[5px] 2xl:w-[235px]",
    eyebrow: "gap-3",
    eyebrowLine: "w-8",
    heading: "mt-2 leading-[0.92] 2xl:mt-[6px] 2xl:leading-[0.9]",
    tagline: `${TAGLINE_WIDE} mt-2 2xl:mt-0`,
    body: "mt-2 max-w-[520px] 2xl:mt-px 2xl:leading-[17px]",
    features: "mt-4 xl:-ml-[3vw] 2xl:mt-2",
    buttons: "mt-5 2xl:-ml-[9px] 2xl:mt-[5px]",
  },
};

// Faint rings and a building sketched behind the top-right corner of the text panel
const CornerLines = ({ building = true }: { building?: boolean }) => (
  <svg aria-hidden="true" viewBox="0 0 180 320" fill="none" className="pointer-events-none absolute right-0 top-0 hidden h-[320px] w-[180px] xl:block">
    <g stroke="#DFE2E8" strokeWidth="0.8">
      {[178, 172, 166, 160, 154, 148, 142].map((r) => (
        <circle key={r} cx="198" cy="70" r={r} />
      ))}
    </g>
    {building && (
      <g stroke="#E9EBF0" strokeWidth="0.8">
        <path d="M68 320V212l28-16 34 14v110" />
        <path d="M96 196v124M82 204v116M113 203v117" />
        <path d="M68 232l28-14 34 13M68 252l28-13 34 12M68 272l28-12 34 11M68 292l28-11 34 10" />
      </g>
    )}
  </svg>
);

// Faint rings behind the top-left corner, when the text is on the left
const LeftLines = () => (
  <svg aria-hidden="true" viewBox="0 0 170 150" fill="none" className="pointer-events-none absolute left-0 top-0 hidden h-[150px] w-[170px] xl:block">
    <g stroke="#E6E8ED" strokeWidth="0.8">
      {[92, 100, 108, 116, 124, 132].map((r) => (
        <circle key={r} cx="-10" cy="-8" r={r} />
      ))}
    </g>
  </svg>
);

const ShowcaseButtons = ({ hero, layout }: { hero: Hero; layout: Layout }) => {
  const shared = `group inline-flex flex-1 sm:flex-none items-center justify-center gap-2 rounded-[4px] text-[12px] 2xl:text-[13px] font-semibold uppercase tracking-[0.04em] transition-colors ${BUTTON_SIZES[layout]}`;
  return (
    <div className="flex gap-3 2xl:gap-[18px]">
      <Link href={hero.primaryCta?.href ?? "/contact"} className={`${shared} bg-[#fd6e15] text-white hover:bg-[#e05d0e]`}>
        {hero.primaryCta?.label ?? "Enquire Now"}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Link>
      <Link
        href={hero.secondaryCtaLink?.href ?? "/portfolio"}
        className={`${shared} border border-[#0A2B5E] bg-white text-[#0A2B5E] hover:bg-[#0A2B5E] hover:text-white`}
      >
        {hero.secondaryCtaLink?.label ?? "View Projects"}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
};

const ShowcaseFeatures = ({ features, layout }: { features: Hero["features"]; layout: Layout }) => {
  const style = FEATURE_STYLES[layout];
  return (
    <ul className={`grid grid-cols-2 gap-y-4 xl:gap-y-0 ${style.grid}`}>
      {features.map(({ icon: Icon, label: name, text }, i) => (
        <li key={name} className={`relative pr-1 ${style.centered ? "pl-1 text-center" : ""} ${i === 0 ? "" : `${style.pad ?? "xl:pl-3 2xl:pl-[20px]"} xl:before:absolute xl:before:left-0 xl:before:w-px xl:before:bg-[#DDE1E8] ${style.divider}`}`}>
          <span className={`flex items-center justify-center rounded-full bg-[#FEF3E8] ring-1 ring-[#E7BE93] ${style.circle} ${style.indents?.[i] ?? ""} ${style.centered ? "mx-auto" : ""}`}>
            <Icon className={`text-[#0A2B5E] ${style.icon}`} strokeWidth={1.35} />
          </span>
          <p className={`mt-2 ${style.labelSize ?? "text-[12px] xl:text-[11.5px] 2xl:text-[12.25px]"} font-bold leading-tight text-[#0A2B5E] ${style.label}`}>{name}</p>
          {text && <p className={`mt-1 2xl:mt-[5px] text-[11px] 2xl:text-[11.5px] leading-[1.32] text-[#5B6B82] ${style.centered ? "whitespace-pre-line [text-wrap:balance]" : ""}`}>{text}</p>}
        </li>
      ))}
    </ul>
  );
};

const ShowcaseGallery = ({ gallery, layout }: { gallery: Showcase["gallery"]; layout: Layout }) => (
  <ul className={`relative grid grid-cols-2 gap-3 px-4 py-4 sm:grid-cols-4 sm:px-6 ${GALLERY_STYLES[layout].list}`}>
    {gallery.map(({ image, alt, caption }) => (
      <li key={alt}>
        <div className={`relative aspect-[271/112] overflow-hidden rounded-md lg:aspect-auto ${GALLERY_STYLES[layout].photo}`}>
          <Image src={image} alt={alt} fill placeholder="blur" sizes="(min-width: 1024px) 18vw, (min-width: 640px) 25vw, 50vw" className="object-cover" />
        </div>
        {caption && (
          <>
            <p className="mt-1.5 text-[12px] font-bold leading-[14px] text-[#0A2B5E] 2xl:text-[13px]">{caption}</p>
            <span className="mt-1.5 block h-[2px] w-8 bg-[#C98F4E]" />
          </>
        )}
      </li>
    ))}
  </ul>
);

// One figure in white and gold, for a navy background
const NavyStat = ({ stat, labelSize }: { stat: Showcase["stat"]; labelSize?: string }) => {
  const { icon: StatIcon, value, label } = stat;
  return (
    <>
      <span className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full border border-[#E3B26F] xl:h-[64px] xl:w-[64px] 2xl:h-[80px] 2xl:w-[80px]">
        <StatIcon className="h-7 w-7 text-[#E3B26F] xl:h-9 xl:w-9 2xl:h-11 2xl:w-11" strokeWidth={1.2} />
      </span>
      <div className="min-w-0">
        <p className="text-[24px] font-bold leading-none text-white xl:text-[27px] 2xl:text-[31px]">{value}</p>
        <p className={`mt-1.5 whitespace-pre-line leading-[1.3] text-white/90 2xl:mt-2 ${labelSize ?? "max-w-[150px] text-[11.5px] xl:text-[13px] 2xl:max-w-[170px] 2xl:text-[15px]"}`}>{label}</p>
        <span className="mt-2 block h-[2px] w-9 bg-[#E3B26F]" />
      </div>
    </>
  );
};

// A smaller figure, for a row of them in the navy block. Circles only appear where there is room for them.
const SmallNavyStat = ({ stat, first }: { stat: Showcase["stat"]; first: boolean }) => {
  const { icon: StatIcon, value, label } = stat;
  return (
    <li className={`flex items-start gap-3 lg:gap-1.5 2xl:gap-[6px] ${first ? "" : "lg:border-l lg:border-white/15 lg:pl-1.5 2xl:pl-[9px]"}`}>
      <span className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full border border-[#8FA3BF]/50 lg:hidden xl:flex xl:h-[38px] xl:w-[38px] 2xl:-mt-[6px] 2xl:h-[50px] 2xl:w-[50px]">
        <StatIcon className="h-6 w-6 text-[#E3B26F] xl:h-5 xl:w-5 2xl:h-[30px] 2xl:w-[30px]" strokeWidth={1.3} />
      </span>
      <div className="min-w-0">
        <p className="text-[20px] font-bold leading-none text-white lg:text-[15px] xl:text-[16px] 2xl:text-[19px]">{value}</p>
        <p className="mt-1 whitespace-pre-line text-[11px] leading-[1.1] text-white/85 lg:text-[10px] 2xl:text-[11px]">{label}</p>
        <span className="mt-2 block h-[2px] w-7 bg-[#E3B26F] 2xl:mt-[14px]" />
      </div>
    </li>
  );
};

/* Banner with the service photo on one side and the text on the other, and a row of photos and one figure
   below them. Used by services that set hero.showcase, in one of ten layouts:
   - photo-left (default): straight photo edge; the figure on a navy band cut on a diagonal, on the right
   - photo-right-cut: diagonal photo edge with a thin gold line; the figure on the plain background, on the right
   - photo-right-band: straight photo edge; the figure on a navy block on the left, which runs on as a thin bar
   - photo-right-cut-navy: diagonal photo edge; the figure on a navy block on the right, which runs on as a thin bar
   - photo-left-cut-navy: the same, with the photo on the left
   - photo-right-slant-navy: like photo-right-cut-navy, with a steeper photo edge and the title on one line
   - photo-right-slant-stats: the same with a grey edge, and three figures in the navy block (moreStats)
   - photo-right-edge-captions: diagonal photo edge with a thick gold band, centred features, captions under
     the small photos, and the figure on a navy block with faint rings, with no bar running on from it
   - photo-left-edge-captions: the same, with the photo on the left
   - photo-left-wedge-captions: the same, with the edge leaning the other way, a pale shape beyond it, and the
     brand's logo in place of the eyebrow */
const ServiceShowcaseHero = ({ hero, showcase }: { hero: Hero; showcase: Showcase }) => {
  const { icon: StatIcon, value, label } = showcase.stat;
  const layout: Layout = showcase.layout ?? "photo-left";
  const photoRight = layout !== "photo-left";
  const cut = CUT_STYLES[layout];
  const left = PHOTO_LEFT_STYLES[layout];
  const band = BAND_SHAPES[layout];

  return (
    <section className="relative w-full bg-white pt-[56px] sm:pt-[68px]">
      {layout === "photo-right-band" ? (
        <div className="lg:grid lg:grid-cols-[41.125%_58.875%]">
          <div className="relative h-[240px] sm:h-[340px] lg:order-2 lg:h-auto">
            <Image src={hero.image} alt={showcase.imageAlt} fill priority placeholder="blur" sizes="(min-width: 1024px) 59vw, 100vw" className="object-cover" />
          </div>

          <div className="relative overflow-hidden bg-white lg:order-1">
            <LeftLines />

            <div className="relative px-4 py-7 sm:px-6 lg:py-5 lg:pl-[6.75vw] lg:pr-3 2xl:pb-[7px] 2xl:pt-[50px]">
              <div className="flex items-center gap-3 2xl:gap-[22px]">
                <span className="h-[2px] w-8 bg-[#B77E3B] 2xl:w-[42px]" />
                <span className={`${EYEBROW} ${GOLD}`}>{hero.eyebrow}</span>
              </div>

              <h1 className={`${HEADING} mt-3 leading-[1.05] 2xl:mt-4`}>
                {hero.title[0]} <span className={GOLD}>{hero.title[1]}</span>
              </h1>

              {hero.tagline && <p className={`${TAGLINE} mt-2 2xl:mt-[7px]`}>{hero.tagline}</p>}

              <p className={`${BODY} mt-2 max-w-[440px] 2xl:leading-[19px]`}>{hero.text}</p>

              <div className="mt-4 2xl:mt-[15px]">
                <ShowcaseFeatures features={hero.features} layout={layout} />
              </div>

              <div className="mt-5 2xl:mt-[15px]">
                <ShowcaseButtons hero={hero} layout={layout} />
              </div>
            </div>
          </div>
        </div>
      ) : left ? (
        <div className="relative overflow-hidden bg-white">
          <CornerLines building={false} />

          <div className={`relative h-[240px] sm:h-[340px] lg:absolute lg:inset-y-0 lg:left-0 lg:h-auto ${left.photoBox}`}>
            {left.accent && <div className={`absolute inset-0 hidden lg:block ${left.accent}`} />}
            {left.band && <div className={`absolute inset-0 hidden lg:block ${left.band}`} />}
            <div className={`absolute inset-0 ${left.photo}`}>
              <Image src={hero.image} alt={showcase.imageAlt} fill priority placeholder="blur" sizes="(min-width: 1024px) 63vw, 100vw" className="object-cover" />
            </div>
          </div>

          <div className={`relative px-4 py-7 sm:px-6 ${left.panel}`}>
            <div className={left.textIndent}>
              {hero.brandLogo ? (
                <Image src={hero.brandLogo.src} alt={hero.brandLogo.alt} width={hero.brandLogo.width} height={hero.brandLogo.height} sizes="235px" loading="eager" className={left.logo} />
              ) : (
                <div className={`flex items-center ${left.eyebrow}`}>
                  <span className={`h-[2px] bg-[#B77E3B] ${left.eyebrowLine}`} />
                  <span className={`${EYEBROW} ${GOLD}`}>{hero.eyebrow}</span>
                </div>
              )}

              <h1 className={`${HEADING} ${left.heading}`}>
                {hero.title[0]}
                <br />
                <span className={GOLD}>{hero.title[1]}</span>
              </h1>

              {hero.tagline && <p className={left.tagline}>{hero.tagline}</p>}

              <p className={`${BODY} ${left.body}`}>{hero.text}</p>
            </div>

            <div className={left.features}>
              <ShowcaseFeatures features={hero.features} layout={layout} />
            </div>

            <div className={left.buttons}>
              <ShowcaseButtons hero={hero} layout={layout} />
            </div>
          </div>
        </div>
      ) : cut ? (
        <div className="relative overflow-hidden bg-white">
          <LeftLines />

          <div className={`relative h-[240px] sm:h-[340px] lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto ${cut.photoBox}`}>
            <div className={`absolute inset-0 hidden lg:block ${cut.band}`} />
            <div className={`absolute inset-0 hidden lg:block ${cut.line}`} />
            <div className={`absolute inset-0 ${cut.photo}`}>
              <Image src={hero.image} alt={showcase.imageAlt} fill priority placeholder="blur" sizes="(min-width: 1024px) 64vw, 100vw" className={`object-cover ${cut.photoPosition ?? ""}`} />
            </div>
          </div>

          <div className={`relative px-4 py-7 sm:px-6 ${cut.panel}`}>
            <div className={`flex items-center ${cut.eyebrow}`}>
              <span className={`h-[2px] bg-[#B77E3B] ${cut.eyebrowLine}`} />
              <span className={`${EYEBROW} ${GOLD}`}>{hero.eyebrow}</span>
            </div>

            <h1 className={`${HEADING} ${cut.heading}`}>
              {hero.title[0]}
              {cut.oneLineTitle ? " " : <br />}
              <span className={GOLD}>{hero.title[1]}</span>
            </h1>

            {hero.tagline && <p className={`${TAGLINE} ${cut.tagline}`}>{hero.tagline}</p>}

            <p className={`${BODY} ${cut.body}`}>{hero.text}</p>

            <div className={cut.features}>
              <ShowcaseFeatures features={hero.features} layout={layout} />
            </div>

            <div className={cut.buttons}>
              <ShowcaseButtons hero={hero} layout={layout} />
            </div>
          </div>
        </div>
      ) : (
        <div className="lg:grid lg:grid-cols-[58.75%_41.25%]">
          <div className="relative h-[240px] sm:h-[340px] lg:h-auto">
            <Image src={hero.image} alt={showcase.imageAlt} fill priority placeholder="blur" sizes="(min-width: 1024px) 59vw, 100vw" className="object-cover" />
          </div>

          <div className="relative overflow-hidden bg-white">
            <CornerLines />

            {hero.photoWords && (
              <div aria-hidden="true" className="absolute right-[24px] top-[50px] hidden xl:block 2xl:right-[30px] 2xl:top-[57px]">
                <ul className="space-y-[15px]">
                  {hero.photoWords.map((word) => (
                    <li key={word} className="text-[9.5px] font-medium uppercase leading-none tracking-[0.34em] text-[#9AA3B5]">
                      {word}
                    </li>
                  ))}
                </ul>
                <span className="mt-[18px] block h-[2px] w-7 bg-[#C98F4E]" />
              </div>
            )}

            <div className="relative px-4 py-7 sm:px-6 lg:px-7 lg:py-5 lg:pr-[58px] xl:pl-10 2xl:pb-[27px] 2xl:pl-[53px] 2xl:pt-[29px]">
              <div className="flex items-center gap-3">
                <span className={`text-[17px] 2xl:text-[18px] font-bold leading-none ${GOLD}`}>{showcase.number}</span>
                <span className="h-px w-6 bg-[#B77E3B]" />
                <span className={`${EYEBROW} text-[#818B9E]`}>{hero.eyebrow}</span>
              </div>

              <h1 className={`${HEADING} mt-3 leading-[1.05] 2xl:mt-[14px]`}>
                {hero.title[0]} <span className={GOLD}>{hero.title[1]}</span>
              </h1>

              {hero.tagline && <p className={`${TAGLINE} mt-2 2xl:mt-3`}>{hero.tagline}</p>}

              <p className={`${BODY} mt-2.5 max-w-[440px] 2xl:mt-[11px] 2xl:leading-[19px]`}>{hero.text}</p>

              <div className="mt-4 2xl:mt-[17px]">
                <ShowcaseFeatures features={hero.features} layout={layout} />
              </div>

              <div className="mt-5">
                <ShowcaseButtons hero={hero} layout={layout} />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className={`relative border-t border-[#ECEEF2] ${band ? "bg-white lg:border-t-0" : "bg-[#F8F8F9]"}`}>
        {band && <div aria-hidden="true" className="absolute inset-0 hidden bg-[#03254F] lg:block" style={{ clipPath: band.shape }} />}
        {band?.rings && (
          <svg aria-hidden="true" viewBox="0 0 110 62" fill="none" className="pointer-events-none absolute bottom-0 right-0 hidden h-[62px] w-[110px] lg:block">
            <g stroke="#C9A26E" strokeOpacity="0.35" strokeWidth="0.8">
              {[102, 90, 78, 66, 54].map((r) => (
                <circle key={r} cx="100" cy="102" r={r} />
              ))}
            </g>
          </svg>
        )}

        <ShowcaseGallery gallery={showcase.gallery} layout={layout} />

        {band && showcase.moreStats ? (
          <ul className={`relative grid grid-cols-1 items-center gap-4 bg-[#03254F] px-4 py-5 sm:grid-cols-3 sm:px-6 lg:absolute lg:top-0 lg:grid-cols-[131fr_128fr_121fr] lg:gap-0 lg:bg-transparent lg:p-0 ${band.stat}`}>
            {[showcase.stat, ...showcase.moreStats].map((stat, i) => (
              <SmallNavyStat key={stat.value + stat.label} stat={stat} first={i === 0} />
            ))}
          </ul>
        ) : band ? (
          <div className={`relative flex items-center gap-4 bg-[#03254F] px-4 py-5 sm:px-6 lg:absolute lg:top-0 lg:gap-3 lg:bg-transparent lg:p-0 xl:gap-4 2xl:gap-6 ${band.stat}`}>
            <NavyStat stat={showcase.stat} labelSize={band.statLabel} />
          </div>
        ) : photoRight ? (
          <div className="flex items-center gap-4 px-4 pb-5 sm:px-6 lg:absolute lg:inset-y-0 lg:left-[78.6%] lg:right-0 lg:gap-3 lg:p-0 xl:gap-4 2xl:gap-6">
            <span className="hidden h-[60%] w-px bg-[#D9DDE5] lg:mr-1 lg:block xl:mr-2 2xl:mr-4" />
            <span className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-[#FBEBDD] xl:h-[66px] xl:w-[66px] 2xl:h-[82px] 2xl:w-[82px]">
              <StatIcon className="h-7 w-7 text-[#B77E3B] xl:h-9 xl:w-9 2xl:h-11 2xl:w-11" strokeWidth={1.3} />
            </span>
            <div className="min-w-0">
              <p className="text-[24px] font-bold leading-none text-[#0A2B5E] xl:text-[27px] 2xl:text-[31px]">{value}</p>
              <p className="mt-1.5 max-w-[150px] text-[11.5px] leading-[1.3] text-[#2B4569] xl:text-[13px] 2xl:mt-2 2xl:max-w-[170px] 2xl:text-[15px]">{label}</p>
              <span className="mt-2 block h-[2px] w-9 bg-[#B77E3B]" />
            </div>
          </div>
        ) : (
          <div className="relative bg-[#03254F] lg:absolute lg:inset-y-0 lg:right-0 lg:w-[28.06%] lg:[clip-path:polygon(31%_0,100%_0,100%_100%,0_100%,15.8%_90.3%)]">
            <div className="flex items-center gap-4 px-4 py-5 sm:px-6 lg:absolute lg:inset-y-0 lg:left-[35%] lg:right-0 lg:gap-3 lg:p-0 xl:gap-4 2xl:left-[36.5%] 2xl:gap-6">
              <NavyStat stat={showcase.stat} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServiceShowcaseHero;
