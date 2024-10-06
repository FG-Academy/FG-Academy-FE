import { useState, useEffect } from "react";

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // 모바일 크기의 기준을 설정 (예: 768px 이하)
    };

    handleResize(); // 초기 화면 크기 확인
    window.addEventListener("resize", handleResize); // 화면 크기 변화에 따른 업데이트

    return () => window.removeEventListener("resize", handleResize); // 클린업
  }, []);

  return isMobile;
};
