import { FC } from "react";

interface FilterOption {
  label: string;
  value: string;
}

interface FilterProps {
  label: string;
  value: string;
  options: FilterOption[];
  onChange: (value: string) => void;
}

export const Filter: FC<FilterProps> = ({ label, value, options, onChange }) => {
  return (
    <div className="flex flex-col h-full w-32">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-2 py-1 border border-gray-300 rounded"
      >
        <option value="">{label}(전체)</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
