"use client";

import { useEffect, useState, useCallback } from "react";
import { useIsMobile } from "@/6.shared/lib";
import type { MyCourseDetail } from "@/5.entities/enrollment";

interface UseLectureNavParams {
  sidebar: MyCourseDetail;
  lectureId: number;
}

interface UseLectureNavReturn {
  isNavOpen: boolean;
  openAccordionItems: string[];
  toggleNav: () => void;
  closeNav: () => void;
  openNav: () => void;
  setOpenAccordionItems: (items: string[]) => void;
}

export function useLectureNav({
  sidebar,
  lectureId,
}: UseLectureNavParams): UseLectureNavReturn {
  const isMobile = useIsMobile();
  const [isNavOpen, setIsNavOpen] = useState(!isMobile);
  const [openAccordionItems, setOpenAccordionItems] = useState<string[]>([]);

  useEffect(() => {
    setIsNavOpen(!isMobile);
  }, [isMobile]);

  useEffect(() => {
    if (!sidebar) return;

    const currentLecture = sidebar.lectures.find(
      (lecture) => lecture.lectureId === lectureId
    );

    if (currentLecture) {
      setOpenAccordionItems((prev) => {
        const value = currentLecture.lectureNumber.toString();
        if (!prev.includes(value)) {
          return [...prev, value];
        }
        return prev;
      });
    }
  }, [sidebar, lectureId]);

  const toggleNav = useCallback(() => setIsNavOpen((prev) => !prev), []);
  const closeNav = useCallback(() => setIsNavOpen(false), []);
  const openNav = useCallback(() => setIsNavOpen(true), []);

  return {
    isNavOpen,
    openAccordionItems,
    toggleNav,
    closeNav,
    openNav,
    setOpenAccordionItems,
  };
}
