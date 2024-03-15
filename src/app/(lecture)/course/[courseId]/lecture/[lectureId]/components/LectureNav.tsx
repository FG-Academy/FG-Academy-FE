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
import { getLectures } from "../lib/getLectures";
import { Lecture } from "@/model/lecture";
import { useQuery } from "@tanstack/react-query";
import { Progress } from "@/components/ui/progress";
import { getProgress } from "../lib/getProgress";
import { IProgressResult } from "@/model/progress";
import { FaCircleCheck } from "react-icons/fa6";
import { getCourses } from "../lib/getCourses";
import { Course } from "@/model/course";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Loading from "../loading";

type Props = {
  courseId: number;
  lectureId: number;
};

export default function LectureNav({ courseId, lectureId }: Props) {
  const { data: progress } = useQuery<IProgressResult>({
    queryKey: ["progress", courseId],
    queryFn: () => getProgress(courseId),
  });
  const { data: course } = useQuery<Course>({
    queryKey: ["courses", courseId],
    queryFn: () => getCourses(courseId),
  });
  const { data: lectures } = useQuery<Lecture[]>({
    queryKey: ["lectures", courseId],
    queryFn: () => getLectures(courseId),
  });
  // const { data: quizzes } = useQuery<Lecture[]>({
  //   queryKey: ["quizzes", courseId],
  //   queryFn: () => getQuiz(courseId),
  // });

  const [isActiveNavbar, changeActiveNavbar] = useState(true);

  const pathname = usePathname();

  if (!lectures || !progress || !course) {
    return <Loading />;
  }

  // 완료한 마지막 강의 번호를 찾습니다.
  const lastCompletedLectureIndex = progress.lectureProgresses
    .filter((lp) => lp.completed)
    .reduce(
      (maxIndex, current, currentIndex) =>
        current.completed && currentIndex > maxIndex ? currentIndex : maxIndex,
      -1
    );

  if (!isActiveNavbar) {
    return (
      <div
        onClick={() => changeActiveNavbar(!isActiveNavbar)}
        className="duration-200 flex justify-center items-center w-[48px] hover:bg-black hover:bg-opacity-20"
      >
        <ChevronLeft className=" rounded-full" />
      </div>
    );
  }

  return (
    <div
      id="nav"
      className="duration-200 flex flex-col w-[480px] h-screen overflow-y-auto "
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
        <div className="text-lg">{course.title}</div>
        <div className="flex flex-col space-y-2 text-gray-500">
          <p>
            수강 기한 : {formatDate(new Date(course.openDate))} ~{" "}
            {formatDate(new Date(course.finishDate))}
          </p>
          <p>
            진도율 : {progress.completedCount}강/{lectures.length}강 (
            {(progress.completedCount / lectures.length) * 100}%)
          </p>
          <Progress
            value={(progress.completedCount / lectures.length) * 100}
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
        defaultValue={lectures[lectureId - 1].title}
        collapsible
      >
        {lectures.map((lecture, index) => {
          // 현재 강의가 완료되었거나, 완료한 마지막 강의의 바로 다음 강의이거나, 첫 번째 강의인 경우에만 클릭 가능
          const isClickable =
            progress.lectureProgresses[index].completed ||
            index === lastCompletedLectureIndex + 1 ||
            index === 0;
          return (
            <AccordionItem
              disabled={!isClickable}
              key={lecture.lectureId}
              value={lecture.title}
            >
              <AccordionTrigger>
                {lecture.lectureNumber}강: {lecture.title}
              </AccordionTrigger>
              <AccordionContent>
                <div className={`flex flex-col bg-white`}>
                  <Link
                    href={`/course/${lecture.courseId}/lecture/${lecture.lectureNumber}`}
                    className={`p-4 px-6 cursor-pointer grow flex flex-row items-center justify-start space-x-2 hover:text-blue-500 ${
                      !(
                        pathname.includes("multiple") ||
                        pathname.includes("descriptive")
                      ) && +lectureId === index + 1
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
                      {/* <div>한영상 전체 길이</div> */}
                      <FaCircleCheck
                        size={24}
                        className={`${
                          progress.lectureProgresses[index].completed
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
                            lecture.lectureNumber
                          }/${
                            quiz.quizType === "multiple"
                              ? "multiple"
                              : "descriptive"
                          }`}
                          className={`p-4 px-6 cursor-pointer flex flex-row items-center justify-start space-x-2 hover:text-blue-500 ${
                            ((quiz.quizType === "multiple" &&
                              pathname.includes("multiple")) ||
                              (quiz.quizType === "descriptive" &&
                                pathname.includes("descriptive"))) &&
                            +lectureId === index + 1
                              ? "bg-blue-100 font-semibold"
                              : ""
                          }`}
                        >
                          <div className="w-[24px]">
                            <MessageCircleQuestion size={24} />
                          </div>
                          <div>
                            {quiz.quizType === "multiple"
                              ? "꼼꼼 Check! 헷갈리는 부분이 없는지 확인해보아요."
                              : "[실행과제] 강의 내용에 대한 문제를 정확한 용어와 표현을 사용하여 설명해보세요."}
                          </div>
                          <div className="flex flex-row grow justify-end space-x-2">
                            <FaCircleCheck
                              size={24}
                              // TODO: 퀴즈용으로 바꾸기
                              className={`${
                                progress.lectureProgresses[index].completed
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
