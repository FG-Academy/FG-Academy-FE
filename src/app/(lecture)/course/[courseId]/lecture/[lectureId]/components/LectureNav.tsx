"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/LectureAccordion";
import { formatDate } from "@/lib/utils";
import {
  MessageCircleQuestion,
  PlaySquare,
  X,
  ChevronLeft,
} from "lucide-react";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import { FaCircleCheck } from "react-icons/fa6";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "../loading";
import { useSession } from "next-auth/react";
import { toast } from "@/components/ui/use-toast";
import { useMyCoursesQuery } from "../hooks/useMyCoursesQuery";
import { useProgressQuery } from "../hooks/useProgressQuery";
import { useIsMobile } from "../hooks/useIsMobile";

type Props = {
  courseId: number;
  lectureId: number;
};

export default function LectureNav({ courseId, lectureId }: Props) {
  const { data: session } = useSession();
  const accessToken = session?.user.accessToken;
  const userLevel = session?.user.level;

  const searchParams = useSearchParams();
  const currentQuizIndex = parseInt(searchParams.get("quizIndex") as string);
  const pathname = usePathname();
  const isMobile = useIsMobile();

  const { data: progress } = useProgressQuery(accessToken, courseId);
  const { data: myCourse } = useMyCoursesQuery(accessToken, courseId);

  const [isActiveNavbar, changeActiveNavbar] = useState(!isMobile);
  useEffect(() => {
    changeActiveNavbar(!isMobile);
  }, [isMobile]);

  if (!progress || !myCourse) {
    return <Loading />;
  }

  const currentLecture = myCourse.lectures.find(
    (lecture) => lecture.lectureId === lectureId
  );

  // 완료한 마지막 강의 번호를 찾습니다.
  const lastCompletedLectureIndex =
    progress.lectureProgresses
      .filter((lp) => lp.completed)
      .reduce(
        (maxIndex, current, currentIndex) =>
          current.completed && currentIndex > maxIndex
            ? currentIndex
            : maxIndex,
        -1
      ) + 1;

  if (!isActiveNavbar) {
    return (
      <div
        onClick={() => changeActiveNavbar(!isActiveNavbar)}
        className="md:duration-200 flex justify-center items-center w-[48px] hover:bg-black hover:bg-opacity-20"
      >
        <ChevronLeft className=" rounded-full" />
      </div>
    );
  }

  return (
    <div
      id="nav"
      className="duration-0 md:duration-200 flex flex-col w-full md:w-[480px] absolute right-0 md:relative bg-white h-screen overflow-y-auto "
    >
      <div
        id="nav-header"
        className="flex-col items-start justify-center p-6 space-y-4"
      >
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-2xl font-bold">커리큘럼</h2>
          <X
            onClick={() => changeActiveNavbar(!isActiveNavbar)}
            className=" hover:bg-black hover:bg-opacity-20 rounded-full"
          />
        </div>
        <div className="text-lg">
          {myCourse.title.replace(/\(\d+\)\s*/, "")}
        </div>
        <div className="flex flex-col space-y-2 text-gray-500">
          <p>
            수강 기한 : {formatDate(new Date(myCourse.openDate))} ~{" "}
            {formatDate(new Date(myCourse.finishDate))}
          </p>
          <p>
            진도율 : {progress.completedCount}강/{myCourse.lectures.length}강 (
            {Math.floor(
              (progress.completedCount / myCourse.lectures.length) * 100
            )}
            %)
          </p>
          <Progress
            value={(progress.completedCount / myCourse.lectures.length) * 100}
            indicatorColor="bg-blue-500"
          />
          <p className="text-black text-xs mt-2">
            ❗️영상을 재생해야 진행도가 올라갑니다.
          </p>
        </div>
      </div>

      <Accordion
        className="flex flex-col justify-center bg-gray-100 border-y-2"
        type="single"
        defaultValue={currentLecture?.title}
        collapsible
      >
        {myCourse.lectures.map((lecture, index) => {
          // 현재 강의가 완료되었거나, 완료한 마지막 강의의 바로 다음 강의이거나, 첫 번째 강의인 경우에만 클릭 가능
          // const lectureIds = progress.lectureProgresses.map((lp) => {
          //   if (lp.completed === true) {
          //     return lp.lectureId;
          //   }
          // });
          const isClickable =
            myCourse.curriculum === "1세미나" ||
            userLevel === "admin" ||
            userLevel === "manager" ||
            userLevel === "tutor" ||
            lecture.lectureNumber === 1 ||
            lecture.lectureNumber <= progress.completedCount + 1 || // 완료한 강의 + 1까지 클릭 가능하게 함
            index === 0;

          return (
            <AccordionItem
              disabled={!isClickable}
              key={lecture.lectureId}
              value={lecture.lectureNumber.toString()}
            >
              <AccordionTrigger className="text-start break-all whitespace-normal">
                {lecture.lectureNumber}강: {lecture.title}
              </AccordionTrigger>
              <AccordionContent>
                <div className={`flex flex-col bg-white`}>
                  <Link
                    href={`/course/${lecture.courseId}/lecture/${lecture.lectureId}`}
                    className={`p-4 px-6 cursor-pointer grow flex flex-row items-center justify-start space-x-2 hover:text-blue-500 ${
                      !(
                        pathname.includes("multiple") ||
                        pathname.includes("descriptive")
                      ) && lectureId === lecture.lectureId
                        ? "bg-blue-100 font-semibold"
                        : ""
                    }`}
                  >
                    <div className="flex flex-row items-center space-x-2">
                      <div className="w-[24px]">
                        <PlaySquare size={24} className="w-[24px]" />
                      </div>
                      <div className="w-auto">{`${lecture.lectureNumber}강: 강의 영상`}</div>
                    </div>
                    <div className="flex flex-row grow justify-end space-x-2">
                      <FaCircleCheck
                        size={24}
                        className={`${
                          progress.lectureProgresses.find(
                            (lp) => lp.lectureId === lecture.lectureId
                          )?.completed
                            ? "text-blue-500"
                            : "text-gray-300"
                        }`}
                      />
                    </div>
                  </Link>
                  {lecture.quizzes.length > 0 &&
                    lecture.quizzes.map((quiz) => {
                      return (
                        <Link
                          key={quiz.quizId}
                          href={`/course/${lecture.courseId}/lecture/${
                            lecture.lectureId
                          }/${
                            quiz.quizType === "multiple"
                              ? "multiple"
                              : "descriptive"
                          }?quizIndex=${quiz.quizIndex}`}
                          className={`p-4 px-6 cursor-pointer flex flex-row items-center justify-start space-x-2 hover:text-blue-500 ${
                            ((quiz.quizType === "multiple" &&
                              currentQuizIndex === quiz.quizIndex) ||
                              (currentQuizIndex === quiz.quizIndex &&
                                pathname.includes("descriptive"))) &&
                            lectureId === lecture.lectureId
                              ? "bg-blue-100 font-semibold"
                              : ""
                          }`}
                          onClick={(e) => {
                            if (
                              !progress.lectureProgresses.find(
                                (lp) => lp.lectureId === lecture.lectureId
                              )?.completed &&
                              !(
                                userLevel === "admin" ||
                                userLevel === "manager" ||
                                userLevel === "tutor"
                              )
                            ) {
                              e.preventDefault();
                              toast({
                                title: "먼저 강의를 수강완료해주세요",
                                variant: "destructive",
                                duration: 2000,
                              });

                              return false;
                            }
                          }}
                        >
                          <div className="w-[24px]">
                            <MessageCircleQuestion size={24} />
                          </div>
                          <div>
                            {quiz.quizType === "multiple"
                              ? `${lecture.lectureNumber}-${quiz.quizIndex}번 객관식 퀴즈`
                              : `${lecture.lectureNumber}-${quiz.quizIndex}번 주관식 퀴즈`}
                          </div>
                          <div className="flex flex-row grow justify-end space-x-2">
                            <FaCircleCheck
                              size={24}
                              className={`${
                                (quiz.quizType === "descriptive" &&
                                  quiz.quizSubmits.length > 0) ||
                                (quiz.quizType === "multiple" &&
                                  quiz.quizSubmits.length > 0 &&
                                  quiz.quizSubmits.some((submit) => {
                                    return submit.status === 1;
                                  })) ||
                                quiz.quizSubmits.length >= 3
                                  ? "text-blue-500"
                                  : "text-gray-300"
                              }`}
                            />
                          </div>
                        </Link>
                      );
                    })}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
