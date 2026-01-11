import { cn } from "@/6.shared/lib";
import { ColorVariant, FILTER_TAB_COLORS } from "@/5.entities/quiz";

interface FilterTabProps {
  active: boolean;
  onClick: () => void;
  count: number;
  color: ColorVariant;
  children: React.ReactNode;
}

const FilterTab = ({
  active,
  onClick,
  count,
  color,
  children,
}: FilterTabProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all border whitespace-nowrap shrink-0",
        active ? "border-transparent shadow-sm" : "border-gray-200",
        active
          ? FILTER_TAB_COLORS[color].active
          : FILTER_TAB_COLORS[color].inactive
      )}
    >
      {children}
      <span
        className={cn(
          "text-xs px-1.5 py-0.5 rounded-full shrink-0",
          active ? "bg-white/20" : "bg-gray-100"
        )}
      >
        {count}
      </span>
    </button>
  );
};

export { FilterTab };
export type { FilterTabProps };
