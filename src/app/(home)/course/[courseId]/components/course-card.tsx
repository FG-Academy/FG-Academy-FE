"use clinet";
import Image from "next/image";
import React, { useEffect } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

import { useRouter } from "next/navigation";

interface Course {
  courseId: number;
  thumbnailImagePath: string;
  title: string;
  level: string;
  curriculum: string;
  description: string;
  openDate: Date;
  finishDate: Date;
  createdAt: Date;
  updatedAt: Date;
  status: string;
}

import testCoureThumbnail from "../../../../../../public/images/testCourseThumbnail.jpeg";

const CourseCard: React.FC = ({}) => {
  const router = useRouter();
  const { isPending, error, data } = useQuery({
    queryKey: ["ImagePath"],
    queryFn: () =>
      fetch("http://localhost:3000/courses").then((res) => {
        return res.json();
      }),
  });

  if (isPending) return "로딩 중...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      {data.map((ele: Course) => (
        <div
          key={ele.courseId}
          id="courseInfo1"
          // className="p-2 mx-4 shadow-xl  w-[410px] rounded-2xl"
          // className="shadow-xl rounded-2xl max-w-[410px] w-full mx-auto"
          className="min-w-0 flex-shrink-0 shadow-xl rounded-2xl max-w-[410px] w-full mx-auto"
        >
          <Image
            className="rounded-md"
            // width={500}
            // height={500}
            // 후에 썸네일 이미지 경로로 수정
            src={testCoureThumbnail}
            alt="강의 썸네일"
            priority
          />
          <div className="p-4 text-lg ">{ele.title}</div>

          <button
            className="w-full px-4 py-2 text-blue-600 transition-colors duration-150 bg-white border border-blue-600 rounded-xl hover:bg-blue-600 hover:text-white"
            onClick={() => {
              router.push(`/course/${ele.courseId}`);
            }}
          >
            강의 들으러 가기
          </button>
        </div>
      ))}
    </>
  );
};

export default CourseCard;
