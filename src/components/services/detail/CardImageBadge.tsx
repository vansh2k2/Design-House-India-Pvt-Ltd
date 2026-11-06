import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

/* For a card photo without the badge drawn into it: a white wave over the photo's bottom, edged in orange, with the
   icon (or anything else, such as a step number) in a circle on it, as the designed card images have. The photo's
   box must be relative. */
const CardImageBadge = ({
  icon: Icon,
  children,
  color = "#F98A0C",
  circleClassName,
}: {
  icon?: LucideIcon;
  children?: ReactNode;
  color?: string; // the wave's edge, and the circle's border and icon when circleClassName isn't given
  circleClassName?: string;
}) => (
  <>
    <svg aria-hidden="true" viewBox="0 0 300 60" preserveAspectRatio="none" className="absolute -inset-x-px -bottom-px h-[calc(22%+2px)] w-[calc(100%+2px)]">
      <path d="M0 26C60 36 105 10 150 10S240 34 300 18V60H0Z" fill="#fff" />
      <path d="M0 26C60 36 105 10 150 10S240 34 300 18" fill="none" stroke={color} strokeWidth="3" vectorEffect="non-scaling-stroke" />
    </svg>
    <span
      className={`absolute bottom-[3%] left-1/2 flex aspect-square h-[31%] -translate-x-1/2 items-center justify-center rounded-full ${circleClassName ?? "border-2 bg-white"}`}
      style={circleClassName ? undefined : { borderColor: color }}
    >
      {Icon ? <Icon className="h-1/2 w-1/2" style={{ color }} strokeWidth={1.6} /> : children}
    </span>
  </>
);

export default CardImageBadge;
