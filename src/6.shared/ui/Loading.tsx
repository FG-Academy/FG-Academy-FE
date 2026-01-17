"use client";

import styles from "./Loading.module.css";

interface LoadingProps {
  size?: number;
  className?: string;
}

export function Loading({ size = 40, className = "" }: LoadingProps) {
  return (
    <div
      className={`flex w-full h-full justify-center items-center ${className}`}
    >
      <svg
        className={styles.loader}
        height="100%"
        viewBox="0 0 32 32"
        width={size}
      >
        <circle
          cx="16"
          cy="16"
          fill="none"
          r="14"
          strokeWidth="4"
          style={{ stroke: "rgb(29, 155, 240)", opacity: 0.2 }}
        />
        <circle
          cx="16"
          cy="16"
          fill="none"
          r="14"
          strokeWidth="4"
          style={{
            stroke: "rgb(29, 155, 240)",
            strokeDasharray: 80,
            strokeDashoffset: 60,
          }}
        />
      </svg>
    </div>
  );
}
