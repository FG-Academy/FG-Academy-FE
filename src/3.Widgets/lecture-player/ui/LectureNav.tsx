"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/6.shared/ui/shadcn/ui/LectureAccordion";
import { formatDate } from "@/6.shared/lib";
import { Progress, Skeleton, toast } from "@/6.shared/ui";
import { useIsMobile } from "@/6.shared/lib";
import {
  MessageCircleQuestion,
  PlaySquare,
  X,
  ChevronLeft,
} from "lucide-react";
import Link from "next/link";
import { FaCircleCheck } from "react-icons/fa6";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { enrollmentQueries } from "@/5.entities/enrollment";

interface LectureNavProps {
  courseId: number;
  lectureId: number;
}

export function LectureNav({ courseId, lectureId }: LectureNavProps) {
  const { data: session } = useSession();
  const userLevel = session?.user.level;

  const searchParams = useSearchParams();
  const currentQuizId = parseInt(searchParams.get("quizId") as string);
  const pathname = usePathname();
  const isMobile = useIsMobile();

  const { data: progress } = useQuery(
    enrollmentQueries.lectureProgress(courseId)
  );
  const { data: sidebar } = useQuery(
    enrollmentQueries.myCourseLectures(courseId)
  );

  const [isActiveNavbar, changeActiveNavbar] = useState(!isMobile);
  const [openAccordionItems, setOpenAccordionItems] = useState<string[]>([]);

  useEffect(() => {
    changeActiveNavbar(!isMobile);
  }, [isMobile]);

  // 현재 강의에 해당하는 아코디언 자동 열기
  useEffect(() => {
    if (sidebar) {
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
    }
  }, [sidebar, lectureId]);

  if (!progress || !sidebar) {
    return <Skeleton className="w-[400px] h-screen bg-gray-200 rounded-lg" />;
  }

  if (!isActiveNavbar) {
    return (
      <div
        onClick={() => changeActiveNavbar(!isActiveNavbar)}
        className="md:duration-200 flex justify-center items-center w-[48px] hover:bg-black hover:bg-opacity-20"
      >
        <ChevronLeft className="rounded-full" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen overflow-y-auto">
      <div
        id="nav"
        className="duration-0 md:duration-200 flex flex-col w-screen md:w-[480px] absolute right-0 md:relative bg-white h-full"
      >
        <div
          id="nav-header"
          className="flex-col items-start justify-center p-6 space-y-4"
        >
          <div className="flex flex-row justify-between items-center">
            <h2 className="text-2xl font-bold">커리큘럼</h2>
            <X
              onClick={() => changeActiveNavbar(!isActiveNavbar)}
              className="hover:bg-black hover:bg-opacity-20 rounded-full"
            />
          </div>
          <div className="text-lg">
            {sidebar.title.replace(/\(\d+\)\s*/, "")}
          </div>
          <div className="flex flex-col space-y-2 text-gray-500">
            <p>
              수강 기한 : {formatDate(new Date(sidebar.openDate))} ~{" "}
              {formatDate(new Date(sidebar.finishDate))}
            </p>
            <p>
              진도율 : {progress.completedCount}강/{sidebar.lectures.length}강 (
              {Math.floor(
                (progress.completedCount / sidebar.lectures.length) * 100
              )}
              %)
            </p>
            <Progress
              value={(progress.completedCount / sidebar.lectures.length) * 100}
              indicatorColor="bg-blue-500"
            />
            <p className="text-black text-xs mt-2">
              영상을 재생해야 진행도가 올라갑니다.
            </p>
          </div>
        </div>

        <Accordion
          className="flex flex-col justify-center bg-gray-100 border-y-2"
          type="multiple"
          value={openAccordionItems}
          onValueChange={setOpenAccordionItems}
        >
          {sidebar.lectures.map((lecture, index) => {
            const isClickable =
              sidebar.category.name === "세미나" ||
              userLevel === "admin" ||
              userLevel === "manager" ||
              userLevel === "tutor" ||
              lecture.lectureNumber === 1 ||
              lecture.lectureNumber < progress.completedCount + 1 ||
              index === 0 ||
              (lecture.lectureNumber === progress.completedCount + 1 &&
                (sidebar.lectures.find(
                  (lec) => lec.lectureNumber === progress.completedCount
                )?.quizzes.length === 0 ||
                  sidebar.lectures
                    .find(
                      (lec) => lec.lectureNumber === progress.completedCount
                    )
                    ?.quizzes.at(-1)?.submitted));

            return (
              <AccordionItem
                disabled={!isClickable}
                key={lecture.lectureId}
                value={lecture.lectureNumber.toString()}
              >
                <AccordionTrigger className="text-start break-all whitespace-normal">
                  {lecture.lectureNumber}강: {lecture.lectureTitle}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col bg-white">
                    <Link
                      href={`/course/${courseId}/lecture/${lecture.lectureId}`}
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
                      lecture.quizzes.map((quiz, quizIdx) => {
                        return (
                          <Link
                            key={quiz.quizId}
                            href={`/course/${courseId}/lecture/${
                              lecture.lectureId
                            }/${
                              quiz.quizType === "multiple"
                                ? "multiple"
                                : "descriptive"
                            }?quizId=${quiz.quizId}`}
                            className={`p-4 px-6 cursor-pointer flex flex-row items-center justify-start space-x-2 hover:text-blue-500 ${
                              ((quiz.quizType === "multiple" &&
                                currentQuizId === quiz.quizId) ||
                                (currentQuizId === quiz.quizId &&
                                  pathname.includes("descriptive"))) &&
                              lectureId === lecture.lectureId
                                ? "bg-blue-100 font-semibold"
                                : ""
                            }`}
                            onClick={(e) => {
                              // 이전 퀴즈가 제출되지 않은 경우 막기
                              if (
                                quizIdx > 0 &&
                                !lecture.quizzes[quizIdx - 1].submitted &&
                                !(
                                  userLevel === "admin" ||
                                  userLevel === "manager" ||
                                  userLevel === "tutor"
                                )
                              ) {
                                e.preventDefault();
                                toast({
                                  title: "이전 퀴즈를 먼저 풀어주세요",
                                  variant: "destructive",
                                  duration: 2000,
                                });
                                return false;
                              }

                              // 강의 미수강 상태일 때 막기
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
                                ? `${lecture.lectureNumber}-${
                                    quizIdx + 1
                                  }번 객관식 퀴즈`
                                : `${lecture.lectureNumber}-${
                                    quizIdx + 1
                                  }번 주관식 퀴즈`}
                            </div>
                            <div className="flex flex-row grow justify-end space-x-2">
                              <FaCircleCheck
                                size={24}
                                className={`${
                                  (quiz.quizType === "descriptive" &&
                                    quiz.submitted) ||
                                  (quiz.quizType === "multiple" &&
                                    quiz.submitted)
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
    </div>
  );
}
