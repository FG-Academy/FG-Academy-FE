import { FC } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/6.shared/lib";

interface FilterOption {
  label: string;
  value: string;
}

interface FilterProps {
  label: string;
  value: string;
  options: FilterOption[];
  onChange: (value: string) => void;
  className?: string;
}

export const Filter: FC<FilterProps> = ({
  label,
  value,
  options,
  onChange,
  className,
}) => {
  return (
    <div className={cn("relative", className)}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "h-9 appearance-none rounded-lg border border-gray-200 bg-white pl-3 pr-8 text-sm",
          "text-gray-700 cursor-pointer",
          "focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent",
          "transition-shadow duration-200",
          "hover:border-gray-300"
        )}
      >
        <option value="">{label} (전체)</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
    </div>
  );
};
