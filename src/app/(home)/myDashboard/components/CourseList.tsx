"use client";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CourseCardDashboard from "./CourseCardDashboard";
import { useEffect, useState } from "react";
import { CourseDetail } from "../hooks/useDashboard";

type Props = {
  remainingCourses: CourseDetail[];
  completedCourses: CourseDetail[];
};

export default function CourseList({
  remainingCourses,
  completedCourses,
}: Props) {
  const [isSelectedComplete, setIsSelectedComplete] = useState(false);
  const [cardClassName, setCardClassName] = useState("basis-auto");

  useEffect(() => {
    const updateCardClass = () => {
      if (window.innerWidth < 640) {
        setCardClassName("basis-full");
      } else if (window.innerWidth < 768) {
        setCardClassName("basis-1/2");
      } else {
        setCardClassName("basis-1/3");
      }
    };

    updateCardClass();
    window.addEventListener("resize", updateCardClass);

    return () => window.removeEventListener("resize", updateCardClass);
  }, []);

  const remainingCoursesLength = remainingCourses.length;
  const completedCoursesLength = completedCourses.length;

  return (
    <div className="flex-1 px-4">
      <div className="mb-8 mt-4">
        <h3 className="text-2xl font-semibold">전체 강의</h3>
        <div className="flex space-x-2 mt-4">
          <Button
            className={`text-blue-500 border-blue-300 ${
              !isSelectedComplete ? `bg-blue-300 text-black` : `none`
            }`}
            variant="outline"
            onClick={() => setIsSelectedComplete(false)}
          >
            수강 중 ({remainingCoursesLength})
          </Button>
          <Button
            className={`text-blue-500 border-blue-300 ${
              isSelectedComplete ? `bg-blue-300 text-black` : `none`
            }`}
            variant="outline"
            onClick={() => setIsSelectedComplete(true)}
          >
            수강 완료({completedCoursesLength})
          </Button>
        </div>
      </div>

      <div id="carousel" className="flex w-full">
        <Carousel
          opts={{
            align: "start",
            dragFree: true,
          }}
          className="w-full px-10 flex flex-row"
        >
          <CarouselContent className="-ml-2 p-2 flex w-full">
            {isSelectedComplete ? (
              completedCourses.length === 0 ? (
                <p className="mx-10">😅 수강 완료한 코스가 없습니다.</p>
              ) : (
                completedCourses.map((ele, index) => (
                  <CarouselItem key={index} className={cardClassName}>
                    <CourseCardDashboard data={ele} />
                  </CarouselItem>
                ))
              )
            ) : (
              remainingCourses.map((ele, index) => (
                <CarouselItem key={index} className={cardClassName}>
                  <CourseCardDashboard data={ele} />
                </CarouselItem>
              ))
            )}
          </CarouselContent>
          <CarouselNext className="right-0" />
          <CarouselPrevious className="left-0" />
        </Carousel>
      </div>
    </div>
  );
}
