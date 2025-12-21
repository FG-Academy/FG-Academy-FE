"use client";

import { defaultTo } from "es-toolkit/compat";
import { cn } from "@/6.shared/lib";
import {
  AspectRatio,
  Button,
  ImageWithFallback,
  Progress,
  Typography,
} from "@/6.shared/ui";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { courseQueries } from "../api/course.queries";
import { CourseDetail } from "../model/course.type";
import { Play } from "lucide-react";
import Link from "next/link";

const MyCourseList = () => {
  const [isStudying, setIsStudying] = useState(true);

  const { data: myCourses } = useSuspenseQuery(courseQueries.myCourses());

  const studyingCourses = myCourses.courseDetail.filter(
    (course) => course.totalCourseLength !== course.completedLectures
  );
  const completedCourses = myCourses.courseDetail.filter(
    (course) =>
      course.totalCourseLength !== 0 &&
      course.totalCourseLength === course.completedLectures
  );

  const filteredCourses = isStudying ? studyingCourses : completedCourses;

  return (
    <div className="flex flex-col w-full gap-6 px-6">
      <header className="flex flex-col gap-4">
        <Typography name="h3">내 강의</Typography>
        <div id="button-group" className="flex gap-2">
          <Button
            className={cn("text-primary-blue", isStudying && "bg-blue-100")}
            variant="outline"
            onClick={() => setIsStudying(true)}
          >
            수강 중 ({studyingCourses.length})
          </Button>
          <Button
            className={cn(
              "text-primary-blue border-blue-300",
              !isStudying && "bg-blue-100 text-black"
            )}
            variant="outline"
            onClick={() => setIsStudying(false)}
          >
            수강 완료 ({completedCourses.length})
          </Button>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCourses.map((course) => (
          <CourseCard key={course.courseId} course={course} />
        ))}
      </section>
    </div>
  );
};

interface CourseCardProps {
  course: CourseDetail;
}

const CourseCard = ({ course }: CourseCardProps) => {
  const progress = parseFloat(
    (
      (course.completedLectures / defaultTo(course.totalCourseLength, 1)) *
      100
    ).toFixed(1)
  );

  return (
    <div className="flex flex-col gap-2 rounded-md">
      <AspectRatio ratio={16 / 9}>
        {/* TODO: URL 변경(lecture) */}
        <Link href={`/course/${course.courseId}`}>
          <div className="relative h-full w-full rounded-2xl overflow-hidden transform transition-transform duration-200 ease-out hover:-translate-y-1">
            <ImageWithFallback
              className="object-cover h-full w-full rounded-2xl border"
              alt={`${course.title} 썸네일`}
              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${course.thumbnailPath}`}
              width={500}
              height={100}
              priority
            />
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="flex items-center justify-center p-2 pl-3 w-10 h-10 rounded-full bg-black">
                <Play fill="white" strokeWidth={0} />
              </div>
            </div>
          </div>
        </Link>
      </AspectRatio>
      <Typography name="h4">{course.title}</Typography>
      <Progress
        indicatorColor="bg-primary-blue"
        className="border-gray-400 shadow-md border-1"
        value={progress}
      />
      <Typography name="body2" className="text-gray-500">
        {course.completedLectures} / {course.totalCourseLength}강 ({progress}%)
      </Typography>
    </div>
  );
};

export { MyCourseList };
