"use client";

import Loading from "@/app/(lecture)/course/[courseId]/lecture/[lectureId]/loading";
import { useFetchOneAdminCourseListQuery } from "@/hooks/useCourseQuery";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AdminCourseFormSchema } from "../lib/CourseFormSchema";
import CourseEdit from "./components/CourseEdit";
import { AdminCourse } from "@/model/course";

export default function Page() {
  const searchParams = useSearchParams();
  const courseId = parseInt(searchParams.get("cid") as string);

  const { data: session } = useSession();
  const accessToken = session?.user.accessToken;

  const { data: courseInfo } = useFetchOneAdminCourseListQuery(
    accessToken,
    courseId
  );

  if (!courseInfo) {
    return <Loading />;
  }

  return (
    <div className="w-full h-screen">
      {/* <Suspense> */}
      <CourseEdit courseInfo={courseInfo} />
      {/* </Suspense> */}
    </div>
  );
}
