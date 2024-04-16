"use client";

import Loading from "@/app/(lecture)/course/[courseId]/lecture/[lectureId]/loading";
import { useFetchOneAdminCourseListQuery } from "@/hooks/useCourseQuery";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AdminCourseFormSchema } from "../lib/CourseFormSchema";
import CourseEdit from "./components/CourseEdit";
import { AdminCourse } from "@/model/course";

export default function Page() {
  const { data: session } = useSession();
  const accessToken = session?.user.accessToken as string;

  const searchParams = useSearchParams();
  const courseId = parseInt(searchParams.get("cid") as string);

  // const

  const [userInfo, setUserInfo] = useState<AdminCourse>({
    courseId: 0,
    title: "",
    description: "",
    curriculum: "",
    openDate: "",
    finishDate: "",
    level: "",
    thumbnailImagePath: "",
    lectures: [],
  });

  const { data: course } = useFetchOneAdminCourseListQuery(
    accessToken,
    courseId
  );

  if (!course) {
    return <Loading />;
  }

  return (
    <div className="w-full">
      <CourseEdit courseInfo={course} />
    </div>
  );
}
