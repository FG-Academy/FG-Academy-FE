"use client";

import { useState, useEffect } from "react";

/**
 * 모바일 기기 여부를 감지하는 훅
 * @param breakpoint - 모바일로 판단할 최대 너비 (기본값: 768px)
 */
export function useIsMobile(breakpoint: number = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= breakpoint);
    };

    handleResize(); // 초기 화면 크기 확인
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isMobile;
}
