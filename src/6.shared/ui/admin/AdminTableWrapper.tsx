"use client";

import { ReactNode } from "react";
import { cn } from "@/6.shared/lib";

interface AdminTableWrapperProps {
  children: ReactNode;
  className?: string;
}

export function AdminTableWrapper({ children, className }: AdminTableWrapperProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg border border-gray-200",
        className
      )}
    >
      {children}
    </div>
  );
}

interface AdminTableToolbarProps {
  children: ReactNode;
  className?: string;
}

export function AdminTableToolbar({ children, className }: AdminTableToolbarProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 p-4 bg-white border-b border-gray-100",
        className
      )}
    >
      {children}
    </div>
  );
}
