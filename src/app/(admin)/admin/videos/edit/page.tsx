"use client";

import Loading from "@/app/(lecture)/course/[courseId]/lecture/[lectureId]/loading";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import CourseEdit from "./components/CourseEdit";
import { useFetchOneAdminCourseListQuery } from "../../hooks/useAdminCourseQuery";

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
