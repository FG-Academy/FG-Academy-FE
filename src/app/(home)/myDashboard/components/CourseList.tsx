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
import { courseDetail } from "@/model/dashboard";

type Props = {
  remainingCourses: courseDetail[];
  completedCourses: courseDetail[];
  // cardclassName: string;
};

export default function CourseList({
  remainingCourses,
  completedCourses,
}: // cardclassName,
Props) {
  const [isSelectedComplete, setIsSelectedComplete] = useState(false);
  const [cardclassName, setCardClassName] = useState("basis-auto");

  useEffect(() => {
    if (remainingCourses.length > 2 || completedCourses.length > 2) {
      setCardClassName(`basis-full sm:basis-full md:basis-1/3`);
    }
  }, [remainingCourses, completedCourses]);

  const remainingCoursesLength = remainingCourses.length;
  const completedCoursesLength = completedCourses.length;
  return (
    <div className="flex-1 px-4">
      <div className="mb-8 mt-4 ">
        <h3 className="text-2xl font-semibold">전체 강의</h3>
        <div className="flex space-x-2 mt-4">
          <Button
            className={`text-blue-500 border-blue-300 ${
              !isSelectedComplete ? `bg-blue-300 text-black` : `none`
            }`}
            variant="outline"
            onClick={() => {
              setIsSelectedComplete(false);
            }}
          >
            수강 중 ({remainingCoursesLength})
          </Button>
          <Button
            className={`text-blue-500 border-blue-300 ${
              isSelectedComplete ? `bg-blue-300 text-black` : `none`
            }`}
            variant="outline"
            onClick={() => {
              setIsSelectedComplete(true);
            }}
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
            {/* 화면 크기에 따라 CarouselItem의 너비를 조정합니다. */}
            {/* 컴포넌트가 3개 이하면 basis 클래스는 제외하도록 구성해야함 */}

            {isSelectedComplete
              ? completedCoursesRender(completedCourses, cardclassName)
              : remainingCourses.map((ele: courseDetail, index: number) => (
                  <CarouselItem key={index} className={`pl-2 ${cardclassName}`}>
                    <CourseCardDashboard data={ele} />
                  </CarouselItem>
                ))}
          </CarouselContent>
          <CarouselNext className="right-0" />
          <CarouselPrevious className="left-0" />
        </Carousel>
      </div>
    </div>
  );
}

function completedCoursesRender(
  completedCourses: courseDetail[],
  cardclassName: string
) {
  if (completedCourses?.length === 0) {
    return <p className="mx-10">😅 수강 완료한 코스가 없습니다.</p>;
  } else {
    return completedCourses.map((ele, index) => (
      <CarouselItem key={index} className={`pl-2 ${cardclassName}`}>
        <CourseCardDashboard data={ele} />
      </CarouselItem>
    ));
  }
}
