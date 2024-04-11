"use client";

import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import CourseCardDashboard from "./courseCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { getDashboard } from "@/app/(lecture)/course/[courseId]/lecture/[lectureId]/lib/getDashboard";
import Loading from "@/app/(lecture)/course/[courseId]/lecture/[lectureId]/loading";
import { useState } from "react";
import { Dashboard, QuizList, courseDetail } from "@/model/dashboard";
import QuizContents from "./quizContents";
import getSubmittedQuizList from "@/app/(lecture)/course/[courseId]/lecture/[lectureId]/lib/getSubmittedQuizList";

export default function MainDashBoard() {
  const [cardclassName, setCardClassName] = useState("basis-auto");
  const [mode, setMode] = useState("course");
  const [currentPage, setCurrentPage] = useState(1);
  const [isSelectedComplete, setIsSelectedComplete] = useState(false);

  const { data: session } = useSession();
  const accessToken = session?.user.accessToken as string;

  // 유저 정보를 가져오는 React Query
  const userName = session?.user.name;

  // 유저가 수강 중인 정보를 가져오는 React Query
  // TODO: 아래 데이터 중, 유저가 완강한 코스는 제외하고 따로 분리하자.
  const { data: dashboardInfo } = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => getDashboard(accessToken),
    enabled: !!accessToken,
  });

  // TODO: 유저가 수강 완료한 코스는 따로 쿼리를 통해 불러오고 대시보드에서 수강완료한 항목을 보려고 할 때 이 데이터를 렌더링해주자.

  // 유저가 제출한 퀴즈 정보를 가져오는 React Query(추후 추가 예정)
  const { data: submittedQuizList } = useQuery({
    queryKey: ["quiz"],
    queryFn: () => getSubmittedQuizList(accessToken),
    enabled: !!accessToken,
  });

  if (!dashboardInfo || !submittedQuizList) return <Loading />;

  // 완강한 코스 정보만 담은 배열
  const completedCourses = dashboardInfo.courseDetail.filter(
    (course: courseDetail) =>
      course.totalCourseLength === course.completedLectures
  );

  // 완강하지 않은 코스 정보만 담은 배열
  const remainingCourses = dashboardInfo.courseDetail.filter(
    (course: courseDetail) =>
      course.totalCourseLength !== course.completedLectures
  );

  console.log(completedCourses);
  console.log(typeof completedCourses);
  if (!completedCourses) {
    console.log("뭘봐 이새끼야!!!!!!!!!!!!");
  }

  const quizzesPerPage = 5;

  // 전체 페이지 수 계산
  const totalPageLength = Math.ceil(submittedQuizList.length / quizzesPerPage);

  // 현재 페이지의 퀴즈 데이터 추출
  const indexOfLastQuiz = currentPage * quizzesPerPage;
  const indexOfFirstQuiz = indexOfLastQuiz - quizzesPerPage;
  const currentQuizzes = submittedQuizList.slice(
    indexOfFirstQuiz,
    indexOfLastQuiz
  );

  // 페이지 번호를 위한 로직
  let maxPageNumberLimit = 5;
  let minPageNumberLimit = 0;

  const handleNextBtn = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault(); // 기본 동작을 막습니다.
    setCurrentPage((prevPage) => prevPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      maxPageNumberLimit += 1;
      minPageNumberLimit += 1;
    }
  };

  const handlePrevBtn = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault(); // 기본 동작을 막습니다.
    setCurrentPage((prevPage) => prevPage - 1);

    if ((currentPage - 1) % 5 === 0) {
      maxPageNumberLimit -= 1;
      minPageNumberLimit -= 1;
    }
  };

  const pages = [];
  for (let i = 1; i <= totalPageLength; i++) {
    pages.push(i);
  }

  const courseLength = remainingCourses.length;
  const completedLength = completedCourses.length;

  if (courseLength > 2) {
    setCardClassName(`basis-full sm:basis-1/2 md:basis-1/3`);
  }
  // const cardClassName = `basis-full sm:basis-1/2 md:basis-1/3`;
  return (
    <div className="mx-10 mt-10">
      <div className="w-full my-8 p-4 ">
        <div className="flex justify-between items-start border-b-4 p-4">
          <div className="flex">
            <Avatar>
              <AvatarImage
                alt="User Avatar"
                src="/placeholder.svg?height=40&width=40"
              />
              <AvatarFallback>{userName?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="ml-4">
              <h1 className="text-xl font-semibold">안녕하세요,</h1>
              <h2 className="text-xl font-semibold text-blue-600">
                {userName} 선생님
              </h2>
            </div>
          </div>
        </div>
        <div id="sideBar" className="flex flex-col md:flex-row mt-8 gap-4">
          <div
            id="navbar"
            className="w-full md:w-1/6 bg-slate-100 text-black p-4 rounded-md border-r-2 shadow-lg"
          >
            <nav className="space-y-4">
              <div
                className={`  text-black p-2 rounded-md ${
                  mode === "course" ? "bg-blue-400" : "bg-blue-200"
                }`}
                onClick={() => {
                  setMode("course");
                }}
              >
                <Link className="block" href="#">
                  강의 목록
                </Link>
              </div>
              <div
                className={`  text-black p-2 rounded-md ${
                  mode === "quiz" ? "bg-blue-400" : "bg-blue-200"
                }`}
                onClick={() => {
                  setMode("quiz");
                }}
              >
                <Link className="block" href="#">
                  퀴즈 피드백
                </Link>
              </div>
            </nav>
          </div>
          {mode === "course" && (
            <div className="flex-1">
              <div className="mb-8">
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
                    수강 중 ({courseLength})
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
                    수강 완료({completedLength})
                  </Button>
                </div>
              </div>

              <div id="carousel" className="flex w-full">
                <Carousel
                  opts={{
                    align: "start",
                  }}
                  className="w-full px-10 flex flex-row"
                >
                  <CarouselContent className="-ml-2">
                    {/* 화면 크기에 따라 CarouselItem의 너비를 조정합니다. */}
                    {/* 컴포넌트가 3개 이하면 basis 클래스는 제외하도록 구성해야함 */}

                    {/* {isSelectedComplete ? () : {dashboardInfo.courseDetail.map(
                      (ele: courseDetail, index: number) => (
                        <CarouselItem
                          key={index}
                          className={`pl-2 ${cardclassName}`}
                        >
                          <CourseCardDashboard data={ele} />
                        </CarouselItem>
                      )
                    )} } */}

                    {isSelectedComplete
                      ? completedCoursesRender(completedCourses, cardclassName)
                      : remainingCourses.map(
                          (ele: courseDetail, index: number) => (
                            <CarouselItem
                              key={index}
                              className={`pl-2 ${cardclassName}`}
                            >
                              <CourseCardDashboard data={ele} />
                            </CarouselItem>
                          )
                        )}
                  </CarouselContent>
                  <CarouselNext className="right-0" />
                  <CarouselPrevious className="left-0" />
                </Carousel>
              </div>
            </div>
          )}

          {mode === "quiz" && (
            <div className="flex-1">
              <div className="mb-4">
                <h3 className="text-2xl font-semibold">퀴즈 피드백</h3>
                <p className="mt-4 text-gray-500 font-light">
                  내가 제출한 퀴즈와 채점 현황을 확인해보세요
                </p>
                <div className="flex space-x-2 mt-4 border-b-2 rounded-md"></div>
              </div>

              <div className="flex w-full flex-col">
                {/* {submittedQuizList.map((ele: QuizList, index: number) => (
                  <div key={index}>
                    <QuizContents data={ele} />
                  </div>
                ))} */}
                {currentQuizzes.map((ele: QuizList, index: number) => (
                  <div key={index}>
                    <QuizContents data={ele} />
                  </div>
                ))}
                <Pagination>
                  <PaginationContent>
                    {currentPage > 1 && (
                      <PaginationItem>
                        <PaginationPrevious onClick={handlePrevBtn} href="#" />
                      </PaginationItem>
                    )}

                    {pages.map((number) => {
                      if (
                        number < maxPageNumberLimit + 1 &&
                        number > minPageNumberLimit
                      ) {
                        return (
                          <PaginationItem
                            key={number}
                            className={`${
                              currentPage === number ? `bg-gray-100` : `none`
                            } rounded-lg`}
                          >
                            <PaginationLink
                              onClick={(event) => {
                                event.preventDefault(); // 기본 동작을 막습니다.
                                setCurrentPage(number);
                              }}
                              href="#"
                            >
                              {number}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      } else {
                        return null;
                      }
                    })}

                    {currentPage < totalPageLength && (
                      <PaginationItem>
                        <PaginationNext onClick={handleNextBtn} href="#" />
                      </PaginationItem>
                    )}
                  </PaginationContent>
                </Pagination>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function completedCoursesRender(completedCourses: any, cardclassName: string) {
  console.log(completedCourses);

  if (completedCourses?.length === 0) {
    return <p className="mx-10">😅 수강 완료한 코스가 없습니다.</p>;
  } else {
    return completedCourses?.map((ele: courseDetail, index: number) => (
      <CarouselItem key={index} className={`pl-2 ${cardclassName}`}>
        <CourseCardDashboard data={ele} />
      </CarouselItem>
    ));
  }
}
