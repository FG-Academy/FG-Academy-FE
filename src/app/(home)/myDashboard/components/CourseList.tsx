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
import { cn } from "@/6.shared/lib";

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
    <div className="flex flex-col px-6 gap-4 bg-red-50">
      <div className="flex flex-col gap-4">
        <h3 className="text-2xl font-semibold">내 강의</h3>
        <div className="flex gap-2">
          <Button
            className={cn(
              "text-primary-blue",
              !isSelectedComplete && "bg-blue-100"
            )}
            variant="outline"
            onClick={() => setIsSelectedComplete(false)}
          >
            수강 중 ({remainingCoursesLength})
          </Button>
          <Button
            className={cn(
              "text-primary-blue border-blue-300",
              isSelectedComplete && "bg-blue-100 text-black"
            )}
            variant="outline"
            onClick={() => setIsSelectedComplete(true)}
          >
            수강 완료({completedCoursesLength})
          </Button>
        </div>
      </div>

      <div className="flex w-full h-full">
        <Carousel
          opts={{
            align: "start",
            dragFree: true,
          }}
          className="w-full px-10 flex bg-yellow-50"
        >
          <CarouselContent className="-ml-2 p-2 flex w-full h-full bg-blue-50">
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
