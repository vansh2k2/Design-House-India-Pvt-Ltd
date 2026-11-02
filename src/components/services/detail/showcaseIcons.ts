import { createLucideIcon, type LucideIcon } from "lucide-react";

/* Line icons drawn for the showcase banner, where Lucide has no close match. They are ordinary Lucide icons,
   so they take the same size, colour and strokeWidth props. */

type Shape = ["circle" | "ellipse" | "path" | "rect", Record<string, string>];

const icon = (name: string, shapes: Shape[]): LucideIcon =>
  createLucideIcon(
    name,
    shapes.map(([tag, attrs], i) => [tag, { ...attrs, key: String(i) }])
  );

export const OfficeDesk = icon("OfficeDesk", [
  ["circle", { cx: "7", cy: "4.6", r: "2.1" }],
  ["path", { d: "M4.5 12V9.6A2.5 2.5 0 0 1 7 7.1a2.5 2.5 0 0 1 2.5 2.5V12" }],
  ["circle", { cx: "16.5", cy: "7.2", r: "1.6" }],
  ["path", { d: "M14.3 12v-.7a2.2 2.2 0 0 1 4.4 0v.7" }],
  ["path", { d: "M3 12h18v2H3z" }],
  ["path", { d: "M5.5 14v7M8.5 14v7M5.5 18h3" }],
  ["path", { d: "M18.5 14c0 2.6.5 5 1.5 7M15 21h5" }],
]);

export const TeamGroup = icon("TeamGroup", [
  ["circle", { cx: "12", cy: "6.3", r: "3" }],
  ["path", { d: "M7 20v-3.5a5 5 0 0 1 10 0V20z" }],
  ["circle", { cx: "5.2", cy: "9", r: "1.9" }],
  ["circle", { cx: "18.8", cy: "9", r: "1.9" }],
  ["path", { d: "M7.2 13.2a3.6 3.6 0 0 0-5.2 3.2V20h5" }],
  ["path", { d: "M16.8 13.2a3.6 3.6 0 0 1 5.2 3.2V20h-5" }],
]);

export const MeetingTable = icon("MeetingTable", [
  ["ellipse", { cx: "12", cy: "12.2", rx: "4.8", ry: "3.2" }],
  ["circle", { cx: "12", cy: "5", r: "2" }],
  ["circle", { cx: "5", cy: "7.4", r: "1.8" }],
  ["circle", { cx: "19", cy: "7.4", r: "1.8" }],
  ["circle", { cx: "12", cy: "19.6", r: "2" }],
  ["path", { d: "M7.2 11.2H5a2.5 2.5 0 0 0-2.5 2.5V16.5h5.2" }],
  ["path", { d: "M16.8 11.2H19a2.5 2.5 0 0 1 2.5 2.5v2.8h-5.2" }],
]);

export const LoungeSofa = icon("LoungeSofa", [
  ["path", { d: "M6 10V8a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v2" }],
  ["path", { d: "M3 12a2 2 0 0 1 4 0v2h10v-2a2 2 0 0 1 4 0v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" }],
  ["path", { d: "M6 18v2M18 18v2" }],
]);

export const StoreFront = icon("StoreFront", [
  ["path", { d: "M5 4h14l2 5.2a2.25 2.25 0 0 1-4.5 0 2.25 2.25 0 0 1-4.5 0 2.25 2.25 0 0 1-4.5 0 2.25 2.25 0 0 1-4.5 0z" }],
  ["path", { d: "M7.5 4l-.5 5.2M12 4v5.2M16.5 4l.5 5.2" }],
  ["path", { d: "M4.5 11.5V20h15v-8.5" }],
  ["path", { d: "M3 20.5h18" }],
  ["path", { d: "M7.5 20v-5.5h3V20M13.5 20v-5.5h3V20" }],
]);

export const KioskCounter = icon("KioskCounter", [
  ["rect", { x: "5", y: "3", width: "5", height: "5", rx: "1.3" }],
  ["rect", { x: "14", y: "3", width: "5", height: "5", rx: "1.3" }],
  ["path", { d: "M7.5 8v3M16.5 8v3" }],
  ["path", { d: "M3 11h18v2.5H3z" }],
  ["path", { d: "M5 13.5V21h14v-7.5" }],
  ["path", { d: "M12 13.5v3" }],
]);

export const DisplayRack = icon("DisplayRack", [
  ["path", { d: "M5 3v18M19 3v18" }],
  ["path", { d: "M3.5 21h3M17.5 21h3" }],
  ["path", { d: "M5 5h14M5 10h14M5 15h14M5 19h14" }],
  ["path", { d: "M8 8.5h3M14 8.5h2M8 13.5h2M13 13.5h3" }],
]);

export const LightBulbGlow = icon("LightBulbGlow", [
  ["path", { d: "M15 15.5a5.2 5.2 0 1 0-6 0c.8.6 1 1.3 1 2.2h4c0-.9.2-1.6 1-2.2z" }],
  ["path", { d: "M10.2 20h3.6M11 22h2" }],
  ["path", { d: "M12 3V1.5M5.8 5 4.7 3.9M18.2 5l1.1-1.1M3.5 11H2M22 11h-1.5" }],
]);

export const BedWide = icon("BedWide", [
  ["path", { d: "M4 13V6.5A1.5 1.5 0 0 1 5.5 5h13A1.5 1.5 0 0 1 20 6.5V13" }],
  ["path", { d: "M6.2 13v-2.2a1.3 1.3 0 0 1 1.3-1.3h2.8a1.3 1.3 0 0 1 1.3 1.3V13" }],
  ["path", { d: "M12.4 13v-2.2a1.3 1.3 0 0 1 1.3-1.3h2.8a1.3 1.3 0 0 1 1.3 1.3V13" }],
  ["path", { d: "M3 13h18v5H3zM3 15.5h18" }],
  ["path", { d: "M4.5 18v2.5M19.5 18v2.5" }],
]);

export const KitchenUnits = icon("KitchenUnits", [
  ["rect", { x: "3.5", y: "3", width: "7", height: "8.5", rx: "0.6" }],
  ["path", { d: "M3.5 7.2h7M6 5.2h2M6 9.2h2" }],
  ["path", { d: "M16.5 2.5V6M13.5 9.5c0-2 1.3-3.5 3-3.5s3 1.5 3 3.5zM16.5 9.5v1.5" }],
  ["path", { d: "M3 14h18v7H3zM12 14v7M6.8 16.5h1.5M15.8 16.5h1.5" }],
]);

export const WardrobeDoors = icon("WardrobeDoors", [
  ["rect", { x: "5", y: "2.5", width: "14", height: "18", rx: "0.6" }],
  ["path", { d: "M12 2.5v18M10.2 10.8v2.4M13.8 10.8v2.4M7.5 20.5v1.3M16.5 20.5v1.3" }],
]);

export const HomeOutline = icon("HomeOutline", [
  ["path", { d: "M2.5 12 12 3.5l9.5 8.5" }],
  ["path", { d: "M16.5 7.5v-3H19v5.2" }],
  ["path", { d: "M5 10v10.5h14V10" }],
  ["path", { d: "M10 20.5v-5a2 2 0 0 1 4 0v5" }],
  ["path", { d: "M8 14H6.8v2.8H8M16 14h1.2v2.8H16" }],
]);

export const DiningTable = icon("DiningTable", [
  ["path", { d: "M7 12h10M9 12v8M15 12v8" }],
  ["path", { d: "M3 6v14M3 14.5h3.5a.5.5 0 0 1 .5.5v5" }],
  ["path", { d: "M21 6v14M21 14.5h-3.5a.5.5 0 0 0-.5.5v5" }],
  ["path", { d: "M12 12V8.5M12 4s-1.2 1-1.2 2.2c0 .8.5 1.3 1.2 1.3s1.2-.5 1.2-1.3C13.2 5 12 4 12 4z" }],
]);

export const BarCounter = icon("BarCounter", [
  ["path", { d: "M3 12h18v2H3z" }],
  ["path", { d: "M5 14v7M19 14v7M5 18h14" }],
  ["rect", { x: "4.5", y: "5", width: "4", height: "7", rx: "1.2" }],
  ["ellipse", { cx: "12", cy: "8.8", rx: "1.8", ry: "3.2" }],
  ["rect", { x: "15.5", y: "5", width: "4", height: "7", rx: "1.2" }],
]);

export const HangingLamp = icon("HangingLamp", [
  ["path", { d: "M12 2.5v3" }],
  ["path", { d: "M4.5 15.5a7.5 7.5 0 0 1 15 0" }],
  ["path", { d: "M3 15.5h18" }],
  ["path", { d: "M10 15.5a2 2 0 0 0 4 0" }],
]);

export const Cloche = icon("Cloche", [
  ["circle", { cx: "12", cy: "6.2", r: "1.4" }],
  ["path", { d: "M4.5 16a7.5 7.5 0 0 1 15 0" }],
  ["path", { d: "M2.8 16h18.4v2.6H2.8z" }],
]);

export const GearOutline = icon("GearOutline", [
  ["path", { d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" }],
]);

export const ExhibitionBooth = icon("ExhibitionBooth", [
  ["path", { d: "M3 3.5h18v3H3z" }],
  ["path", { d: "M5 6.5v14M19 6.5v14" }],
  ["path", { d: "M3 20.5h18" }],
  ["path", { d: "M5 14.5h14M10 14.5v6M14 14.5v6" }],
  ["circle", { cx: "8.8", cy: "10", r: "1.3" }],
  ["circle", { cx: "15.2", cy: "10", r: "1.3" }],
  ["path", { d: "M12 8.5v3.5" }],
]);

export const ToteBag = icon("ToteBag", [
  ["path", { d: "M5.5 8.5h13l1.3 13H4.2z" }],
  ["path", { d: "M8.8 11V6a3.2 3.2 0 0 1 6.4 0v5" }],
]);

export const HangingSign = icon("HangingSign", [
  ["circle", { cx: "12", cy: "3", r: "0.9" }],
  ["path", { d: "M4 8.5 12 3.9l8 4.6" }],
  ["path", { d: "M2.5 8.5h19" }],
  ["path", { d: "M6 8.5V11M18 8.5V11" }],
  ["rect", { x: "4.5", y: "11", width: "15", height: "10", rx: "1" }],
  ["rect", { x: "7", y: "13.5", width: "10", height: "5", rx: "0.6" }],
]);

export const FactoryOutline = icon("FactoryOutline", [
  ["path", { d: "M1 22.5h22" }],
  ["path", { d: "M2 22.5v-9L5 9l3.5 4L12 9l4 4h.8l.6-9h3.2l.6 9h.8v9.5" }],
  ["rect", { x: "16.8", y: "2", width: "4.4", height: "2", rx: "1" }],
  ["rect", { x: "4.5", y: "16", width: "3", height: "3", rx: "0.4" }],
  ["rect", { x: "17", y: "16", width: "2.8", height: "3", rx: "0.4" }],
  ["path", { d: "M10.5 22.5v-5a1 1 0 0 1 1-1H13a1 1 0 0 1 1 1v5" }],
  ["path", { d: "M10.5 14.5H14" }],
]);

export const Lotus = icon("Lotus", [
  ["path", { d: "M12 2.2c2.9 2.9 4.2 6.3 4.2 9.6 0 3.8-1.9 6.9-4.2 9-2.3-2.1-4.2-5.2-4.2-9C7.8 8.5 9.1 5.1 12 2.2z" }],
  ["path", { d: "M8 8C6.2 7.1 4.3 6.6 2.9 6.7c-.1 3.9.7 7.8 3.1 10.5 1.7 1.9 3.9 3 6 3.6" }],
  ["path", { d: "M16 8c1.8-.9 3.7-1.4 5.1-1.3.1 3.9-.7 7.8-3.1 10.5-1.7 1.9-3.9 3-6 3.6" }],
  ["path", { d: "M3 11.8c-1 .2-1.7.6-2.5 1.1 1.1 3.1 3.2 5.6 6 6.7 1.9.8 3.7 1.1 5.5 1.2" }],
  ["path", { d: "M21 11.8c1 .2 1.7.6 2.5 1.1-1.1 3.1-3.2 5.6-6 6.7-1.9.8-3.7 1.1-5.5 1.2" }],
]);

export const OfficeTowers = icon("OfficeTowers", [
  ["path", { d: "M3 21h18" }],
  ["path", { d: "M5 21V8c2.8 0 6-1.8 7-5v18" }],
  ["path", { d: "M12 9h4.5A2.5 2.5 0 0 1 19 11.5V21" }],
  ["path", { d: "M8 10.5h2M8 14h2M8 17.5h2M15 13h1.5M15 16.5h1.5" }],
]);
