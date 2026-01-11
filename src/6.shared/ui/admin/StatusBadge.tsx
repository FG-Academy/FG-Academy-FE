"use client";

import { cn } from "@/6.shared/lib";

type StatusVariant = "success" | "warning" | "error" | "default" | "info";

interface StatusBadgeProps {
  variant?: StatusVariant;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<StatusVariant, string> = {
  success: "bg-emerald-50 text-emerald-700 border-emerald-200",
  warning: "bg-amber-50 text-amber-700 border-amber-200",
  error: "bg-red-50 text-red-700 border-red-200",
  info: "bg-blue-50 text-blue-700 border-blue-200",
  default: "bg-gray-50 text-gray-700 border-gray-200",
};

export function StatusBadge({
  variant = "default",
  children,
  className,
}: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

// 자주 사용되는 상태 매핑 헬퍼
export function getCourseStatusVariant(
  status: string
): StatusVariant {
  switch (status) {
    case "active":
      return "success";
    case "inactive":
      return "default";
    case "temp":
      return "warning";
    default:
      return "default";
  }
}

export function getQuizAnswerStatusVariant(
  status: string
): StatusVariant {
  switch (status) {
    case "정답":
      return "success";
    case "오답":
      return "error";
    case "미채점":
      return "warning";
    default:
      return "default";
  }
}
