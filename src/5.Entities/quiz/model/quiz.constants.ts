import { FilterType, FILTER_TYPE } from "./quiz.type";

/** 색상 타입 */
export type ColorVariant = "blue" | "green" | "red" | "purple" | "gray";

/** 통계 카드 색상 클래스 */
export const STAT_CARD_COLORS: Record<ColorVariant, string> = {
  blue: "bg-blue-50 text-blue-600 border-blue-100",
  green: "bg-green-50 text-green-600 border-green-100",
  red: "bg-red-50 text-red-600 border-red-100",
  purple: "bg-purple-50 text-purple-600 border-purple-100",
  gray: "bg-gray-50 text-gray-600 border-gray-100",
} as const;

/** 필터 탭 색상 클래스 */
export const FILTER_TAB_COLORS: Record<
  ColorVariant,
  { active: string; inactive: string }
> = {
  gray: {
    active: "bg-gray-900 text-white",
    inactive: "bg-white text-gray-600 hover:bg-gray-100",
  },
  green: {
    active: "bg-green-600 text-white",
    inactive: "bg-white text-gray-600 hover:bg-green-50",
  },
  red: {
    active: "bg-red-500 text-white",
    inactive: "bg-white text-gray-600 hover:bg-red-50",
  },
  purple: {
    active: "bg-purple-600 text-white",
    inactive: "bg-white text-gray-600 hover:bg-purple-50",
  },
  blue: {
    active: "bg-blue-600 text-white",
    inactive: "bg-white text-gray-600 hover:bg-blue-50",
  },
} as const;

/** 필터 타입별 색상 매핑 */
export const FILTER_COLOR_MAP: Record<FilterType, ColorVariant> = {
  [FILTER_TYPE.전체]: "gray",
  [FILTER_TYPE.정답]: "green",
  [FILTER_TYPE.오답]: "red",
  [FILTER_TYPE.피드백]: "purple",
} as const;

/** 필터 타입별 라벨 */
export const FILTER_LABELS: Record<FilterType, string> = {
  [FILTER_TYPE.전체]: "전체",
  [FILTER_TYPE.정답]: "정답",
  [FILTER_TYPE.오답]: "오답",
  [FILTER_TYPE.피드백]: "피드백",
} as const;
