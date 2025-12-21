import * as React from "react";

import { cn } from "@/lib/utils";

type TypographyName =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "p"
  | "body1"
  | "body2"
  | "body3"
  | "body4"
  | "blockquote"
  | "table"
  | "list"
  | "inlineCode"
  | "lead"
  | "large"
  | "small"
  | "muted";

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  name: TypographyName;
  className?: string;
  children?: React.ReactNode;
}

/**
 * Typography component
 * - name: selects which styled element to render
 * - className: additional tailwind classes to merge
 * - children: content inside the element
 */
export function Typography({
  name,
  className,
  children,
  ...rest
}: TypographyProps) {
  switch (name) {
    case "h1":
      return (
        <h1
          className={cn(
            "scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance",
            className
          )}
          {...rest}
        >
          {children}
        </h1>
      );
    case "h2":
      return (
        <h2
          className={cn(
            "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
            className
          )}
          {...rest}
        >
          {children}
        </h2>
      );
    case "h3":
      return (
        <h3
          className={cn(
            "scroll-m-20 text-2xl font-semibold tracking-tight",
            className
          )}
          {...rest}
        >
          {children}
        </h3>
      );
    case "h4":
      return (
        <h4 className={cn("text-xl font-semibold", className)} {...rest}>
          {children}
        </h4>
      );
    case "p":
      return (
        <p
          className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
          {...rest}
        >
          {children}
        </p>
      );
    case "body1":
      return (
        <p className={cn("m-0 text-lg", className)} {...rest}>
          {children}
        </p>
      );
    case "body2":
      return (
        <p className={cn("m-0 text-base", className)} {...rest}>
          {children}
        </p>
      );
    case "body3":
      return (
        <p className={cn("m-0 text-sm", className)} {...rest}>
          {children}
        </p>
      );
    case "body4":
      return (
        <p className={cn("m-0 text-xs", className)} {...rest}>
          {children}
        </p>
      );
    case "blockquote":
      return (
        <blockquote
          className={cn("mt-6 border-l-2 pl-6 italic", className)}
          {...rest}
        >
          {children}
        </blockquote>
      );
    case "table":
      // For table, we wrap a table in a scrollable container. Children should contain thead/tbody markup.
      return (
        <div className={cn("my-6 w-full overflow-y-auto", className)} {...rest}>
          <table className={cn("w-full")}>{children}</table>
        </div>
      );
    case "list":
      return (
        <ul
          className={cn("my-6 ml-6 list-disc [&>li]:mt-2", className)}
          {...rest}
        >
          {children}
        </ul>
      );
    case "inlineCode":
      return (
        <code
          className={cn(
            "bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
            className
          )}
          {...rest}
        >
          {children}
        </code>
      );
    case "lead":
      return (
        <p className={cn("text-muted-foreground text-xl", className)} {...rest}>
          {children}
        </p>
      );
    case "large":
      return (
        <div className={cn("text-lg font-semibold", className)} {...rest}>
          {children}
        </div>
      );
    case "small":
      return (
        <small
          className={cn("text-sm leading-none font-medium", className)}
          {...rest}
        >
          {children}
        </small>
      );
    case "muted":
      return (
        <p className={cn("text-muted-foreground text-sm", className)} {...rest}>
          {children}
        </p>
      );
    default:
      return (
        <p
          className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
          {...rest}
        >
          {children}
        </p>
      );
  }
}
