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
        <h4
          className={cn(
            "scroll-m-20 text-xl font-semibold tracking-tight",
            className
          )}
          {...rest}
        >
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

// Demo components matching the provided examples
export function TypographyH1() {
  return (
    <h1 className="text-4xl font-extrabold tracking-tight text-center scroll-m-20 text-balance">
      Taxing Laughter: The Joke Tax Chronicles
    </h1>
  );
}

export function TypographyH2() {
  return (
    <h2 className="pb-2 text-3xl font-semibold tracking-tight border-b scroll-m-20 first:mt-0">
      The People of the Kingdom
    </h2>
  );
}

export function TypographyH3() {
  return (
    <h3 className="text-2xl font-semibold tracking-tight scroll-m-20">
      The Joke Tax
    </h3>
  );
}

export function TypographyH4() {
  return (
    <h4 className="text-xl font-semibold tracking-tight scroll-m-20">
      People stopped telling jokes
    </h4>
  );
}

export function TypographyP() {
  return (
    <p className="leading-7 [&:not(:first-child)]:mt-6">
      The king, seeing how much happier his subjects were, realized the error of
      his ways and repealed the joke tax.
    </p>
  );
}

export function TypographyBlockquote() {
  return (
    <blockquote className="pl-6 mt-6 italic border-l-2">
      &quot;After all,&quot; he said, &quot;everyone enjoys a good joke, so
      it&apos;s only fair that they should pay for the privilege.&quot;
    </blockquote>
  );
}

export function TypographyTable() {
  return (
    <div className="w-full my-6 overflow-y-auto">
      <table className="w-full">
        <thead>
          <tr className="p-0 m-0 border-t even:bg-muted">
            <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
              King&apos;s Treasury
            </th>
            <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
              People&apos;s happiness
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="p-0 m-0 border-t even:bg-muted">
            <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
              Empty
            </td>
            <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
              Overflowing
            </td>
          </tr>
          <tr className="p-0 m-0 border-t even:bg-muted">
            <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
              Modest
            </td>
            <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
              Satisfied
            </td>
          </tr>
          <tr className="p-0 m-0 border-t even:bg-muted">
            <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
              Full
            </td>
            <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
              Ecstatic
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export function TypographyList() {
  return (
    <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
      <li>1st level of puns: 5 gold coins</li>
      <li>2nd level of jokes: 10 gold coins</li>
      <li>3rd level of one-liners : 20 gold coins</li>
    </ul>
  );
}

export function TypographyInlineCode() {
  return (
    <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
      @radix-ui/react-alert-dialog
    </code>
  );
}

export function TypographyLead() {
  return (
    <p className="text-xl text-muted-foreground">
      A modal dialog that interrupts the user with important content and expects
      a response.
    </p>
  );
}

export function TypographyLarge() {
  return <div className="text-lg font-semibold">Are you absolutely sure?</div>;
}

export function TypographySmall() {
  return (
    <small className="text-sm font-medium leading-none">Email address</small>
  );
}

export function TypographyMuted() {
  return (
    <p className="text-sm text-muted-foreground">Enter your email address.</p>
  );
}
