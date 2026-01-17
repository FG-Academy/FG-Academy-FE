"use client";

import { ReactNode } from "react";
import { cn } from "@/6.shared/lib";

interface AdminCardProps {
  children: ReactNode;
  className?: string;
  noPadding?: boolean;
}

export function AdminCard({ children, className, noPadding }: AdminCardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-lg border border-gray-200 shadow-sm",
        !noPadding && "p-6",
        className
      )}
    >
      {children}
    </div>
  );
}

interface AdminCardHeaderProps {
  children: ReactNode;
  className?: string;
}

export function AdminCardHeader({ children, className }: AdminCardHeaderProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between pb-4 border-b border-gray-100",
        className
      )}
    >
      {children}
    </div>
  );
}

interface AdminCardContentProps {
  children: ReactNode;
  className?: string;
}

export function AdminCardContent({ children, className }: AdminCardContentProps) {
  return <div className={cn("pt-4", className)}>{children}</div>;
}
