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
import { useState } from "react";
import { courseDetail } from "@/model/dashboard";

type Props = {
  remainingCourses: courseDetail[];
  completedCourses: courseDetail[];
  cardclassName: string;
};

export default function CourseList({
  remainingCourses,
  completedCourses,
  cardclassName,
}: Props) {
  const [isSelectedComplete, setIsSelectedComplete] = useState(false);

  return (
    <div className=" w-full p-6 space-y-4 justify-center bg-blue-50 items-center">
      <div className="space-y-2 p-2 w-full">
        <h3 className="text-2xl font-semibold">전체 강의</h3>
        <div className="space-x-2">
          <Button
            className={`text-blue-500 border-blue-300 ${
              !isSelectedComplete ? `bg-blue-300 text-black` : `none`
            }`}
            variant="outline"
            onClick={() => {
              setIsSelectedComplete(false);
            }}
          >
            수강 중 ({remainingCourses?.length})
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
            수강 완료({completedCourses?.length})
          </Button>
        </div>
      </div>

      <div className="bg-yellow-50 p-6">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full bg-emerald-50 flex flex-row justify-center"
        >
          <CarouselContent className="bg-red-50 p-10 w-full">
            {isSelectedComplete
              ? completedCoursesRender(completedCourses, cardclassName)
              : remainingCourses?.map((ele, index) => (
                  <CarouselItem
                    key={index}
                    className={`basis-1/2 -ml-2 ${cardclassName}`}
                  >
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
