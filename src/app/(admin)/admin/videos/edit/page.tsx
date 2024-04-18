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
  return (
    <div className="w-full">
      <Suspense fallback={<Loading />}>
        <CourseEdit />
      </Suspense>
    </div>
  );
}
