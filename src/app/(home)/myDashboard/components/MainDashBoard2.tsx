"use client";

import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import Loading from "@/app/(lecture)/course/[courseId]/lecture/[lectureId]/loading";
import { useEffect, useMemo, useState } from "react";
import { courseDetail } from "@/model/dashboard";
import { useFetchDashboardQuery } from "@/hooks/useDashboard";
import { useFetchQuizListQuery } from "@/hooks/useQuizeQuery";
import CourseList from "./CourseList";
import QuizList from "./QuizList";

export default function MainDashBoard() {
  const [cardclassName, setCardClassName] = useState("basis-auto");
  const [mode, setMode] = useState("course");
  const [completedCourses, setCompletedCourses] = useState<courseDetail[]>([]);
  const [remainingCourses, setRemainingCourses] = useState<courseDetail[]>([]);

  const modeClassName = (currentMode: string) => {
    return `text-black p-2 rounded-md cursor-pointer ${
      mode === currentMode ? "bg-blue-400" : "bg-blue-200"
    }`;
  };

  const { data: session } = useSession();
  const accessToken = session?.user.accessToken as string;
  const userName = session?.user.name;

  const { data: dashboardInfo } = useFetchDashboardQuery(accessToken);
  const { data: submittedQuizList } = useFetchQuizListQuery(accessToken);

  useEffect(() => {
    if (!dashboardInfo || !submittedQuizList || submittedQuizList.length === 0)
      return;

    const completedCourses = dashboardInfo.courseDetail.filter(
      (course) => course.totalCourseLength === course.completedLectures
    );
    const remainingCourses = dashboardInfo.courseDetail.filter(
      (course) => course.totalCourseLength !== course.completedLectures
    );

    setCompletedCourses(completedCourses);
    setRemainingCourses(remainingCourses);

    // if (remainingCourses.length > 2) {
    //   setCardClassName(`basis-full sm:basis-1/2 md:basis-1/3`);
    // }
  }, [dashboardInfo, submittedQuizList]);

  // console.log(dashboardInfo);

  if (!dashboardInfo || !submittedQuizList) return <Loading />;

  return (
    <div className="p-16">
      <div className="flex flex-row justify-start space-x-2">
        <Avatar>
          {/* <AvatarImage
            alt="User Avatar"
            src="/placeholder.svg?height=40&width=40"
          /> */}
          <AvatarFallback>{userName?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="ml-4">
          <h1 className="text-xl font-semibold">안녕하세요,</h1>
          <h2 className="text-xl font-semibold text-blue-600">
            {userName} 선생님
          </h2>
        </div>
      </div>
      <div className="flex flex-col md:flex-row mt-8">
        <div
          id="navbar"
          className="w-[200px] md:w-1/6 space-y-4 bg-slate-100 text-black p-4 rounded-md border-r-2 shadow-lg"
        >
          <div
            className={modeClassName("course")}
            onClick={() => {
              setMode("course");
            }}
          >
            강의 목록
          </div>
          <div
            className={modeClassName("quiz")}
            onClick={() => {
              setMode("quiz");
            }}
          >
            퀴즈 피드백
          </div>
        </div>
        {mode === "course" && (
          <CourseList
            cardclassName={cardclassName}
            completedCourses={completedCourses}
            remainingCourses={remainingCourses}
          />
        )}
        {mode === "quiz" && <QuizList />}
      </div>
    </div>
  );
}
