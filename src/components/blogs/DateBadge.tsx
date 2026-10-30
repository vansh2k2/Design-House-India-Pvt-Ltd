import { dateBadge } from "./utils";

/* White date tile shown on the top-left of a blog photo: big day, small "OCT 2026" under it. */
const DateBadge = ({ date, size = "md" }: { date: Date; size?: "md" | "lg" }) => {
  const { day, monthYear } = dateBadge(date);
  return (
    <span
      className={`absolute top-3 left-3 rounded-[4px] bg-white text-center shadow-[0_4px_12px_rgba(0,0,0,0.15)] ${
        size === "lg" ? "px-3 py-2" : "px-2.5 py-1.5"
      }`}
    >
      <span className={`block font-bold text-[#0A2B5E] leading-none ${size === "lg" ? "text-[24px]" : "text-[18px]"}`}>{day}</span>
      <span className="block text-[8.5px] font-semibold text-[#46658C] tracking-wide mt-1">{monthYear}</span>
    </span>
  );
};

export default DateBadge;
