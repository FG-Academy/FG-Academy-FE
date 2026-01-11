import React from "react";
import { cn } from "@/6.shared/lib"; // cn 함수 import

interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  direction?: "row" | "column";
  justifyContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly";
  alignItems?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
}

const Flex: React.FC<FlexProps> = ({
  children,
  direction = "row",
  justifyContent = "flex-start",
  alignItems = "flex-start",
  className = "",
  ...props
}) => {
  // direction 매핑
  const directionClass = direction === "column" ? "flex-col" : "flex-row";

  // justifyContent 매핑
  const justifyContentClass = {
    "flex-start": "justify-start",
    "flex-end": "justify-end",
    center: "justify-center",
    "space-between": "justify-between",
    "space-around": "justify-around",
    "space-evenly": "justify-evenly",
  }[justifyContent];

  // alignItems 매핑
  const alignItemsClass = {
    "flex-start": "items-start",
    "flex-end": "items-end",
    center: "items-center",
    stretch: "items-stretch",
    baseline: "items-baseline",
  }[alignItems];

  const classes = cn(
    "flex",
    directionClass,
    justifyContentClass,
    alignItemsClass,
    className
  );

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export default Flex;
