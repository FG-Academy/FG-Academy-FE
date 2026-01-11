"use client";

import { Search } from "lucide-react";
import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/6.shared/lib";

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, containerClassName, ...props }, ref) => {
    return (
      <div className={cn("relative", containerClassName)}>
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          ref={ref}
          type="search"
          className={cn(
            "h-9 w-full rounded-lg border border-gray-200 bg-white pl-9 pr-4 text-sm",
            "placeholder:text-gray-400",
            "focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent",
            "transition-shadow duration-200",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

SearchInput.displayName = "SearchInput";
