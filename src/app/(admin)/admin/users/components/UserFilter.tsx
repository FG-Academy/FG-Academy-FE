import { FC } from "react";

interface FilterProps {
  label: string; // 필터의 라벨 (예: Level, Position)
  value: string; // 선택된 필터 값
  options: { label: string; value: string }[]; // 드롭다운에 표시될 옵션 목록
  onChange: (value: string) => void; // 값이 변경될 때 호출되는 핸들러
}

const Filter: FC<FilterProps> = ({ label, value, options, onChange }) => {
  return (
    <div className="flex flex-col h-full w-32">
      {/* <label className="text-sm font-medium mb-1">{label}</label> */}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-2 py-1 border border-gray-300 rounded"
      >
        <option value="">{label}(전체)</option> {/* 기본값으로 전체 표시 */}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
