"use client";

import { AvatarFallback, Avatar } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import Loading from "@/app/(lecture)/course/[courseId]/lecture/[lectureId]/loading";
import { useEffect, useState } from "react";
import {
  CourseDetail,
  useFetchDashboardQuery,
} from "@/app/(home)/myDashboard/hooks/useDashboard";
import CourseList from "./CourseList";
import QuizList from "./QuizList";

export default function MainDashBoard() {
  const [mode, setMode] = useState("course");
  const [completedCourses, setCompletedCourses] = useState<CourseDetail[]>([]);
  const [remainingCourses, setRemainingCourses] = useState<CourseDetail[]>([]);

  const modeClassName = (currentMode: string) => {
    return `text-black p-2 rounded-md cursor-pointer ${
      mode === currentMode ? "bg-blue-400" : "bg-blue-200"
    }`;
  };

  const { data: session } = useSession();
  const accessToken = session?.user.accessToken as string;
  const userName = session?.user.name;

  const { data: dashboardCourses } = useFetchDashboardQuery(accessToken);

  useEffect(() => {
    if (dashboardCourses) {
      const completedCourses = dashboardCourses.courseDetail.filter(
        (course) =>
          course.totalCourseLength !== 0 &&
          course.totalCourseLength === course.completedLectures
      );
      const remainingCourses = dashboardCourses.courseDetail.filter(
        (course) => course.totalCourseLength !== course.completedLectures
      );
      setCompletedCourses(completedCourses);
      setRemainingCourses(remainingCourses);
    }
  }, [dashboardCourses]);

  if (!dashboardCourses || !session) return <Loading />;

  return (
    <div className="sm:p-16 p-6">
      <div className="flex flex-col md:flex-row justify-start space-x-2">
        <Avatar>
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
          className="w-full md:w-1/6 space-y-4 bg-slate-100 text-black p-4 rounded-md border-r-2 shadow-lg"
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
            completedCourses={completedCourses}
            remainingCourses={remainingCourses}
          />
        )}
        {mode === "quiz" && <QuizList />}
      </div>
    </div>
  );
}
