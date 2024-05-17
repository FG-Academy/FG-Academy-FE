"use client";

import Loading from "@/app/(lecture)/course/[courseId]/lecture/[lectureId]/loading";
import { useFetchEnrollmentQuery } from "@/app/(home)/course/[courseId]/hook/useEnrollmentQuery";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import LectureList from "@/app/(home)/course/[courseId]/components/LectureList";
import { createMarkup } from "../lib/createMarkup";
import { Progress } from "@/components/ui/progress";
import EnrollButton from "./EnrollButton";
import { useFetchCourseByIdQuery } from "@/app/(home)/_hooks/useCourseQuery";
import { useFetchAllLectureListQuery } from "@/hooks/useLectureQuery";

type Props = {
  courseId: number;
};

export default function CourseDetail({ courseId }: Props) {
  const { data: session } = useSession();
  const accessToken = session?.user.accessToken;

  const { data: course } = useFetchCourseByIdQuery(accessToken, courseId);
  const { data: lectures } = useFetchAllLectureListQuery(accessToken, courseId);
  const { data: enrollment } = useFetchEnrollmentQuery(accessToken, courseId);

  const [displayNumber, setDisplayNumber] = useState<number>(1);

  if (!course || !lectures || !enrollment) return <Loading />;

  return (
    <div className="flex flex-col w-full h-auto">
      <header className="flex flex-col p-6 border-b-2 border-gray-200 space-y-2">
        <div className="text-2xl font-bold font-Pretendard">{course.title}</div>
        <div className="text-sm font-semibold text-slate-400 font-Pretendard">
          카테고리: {course.curriculum}
        </div>
      </header>
      <main className="flex flex-row p-4 mt-6 h-fit">
        <div className="flex flex-col items-center w-full space-y-4 p-4">
          <Image
            className="rounded justify-center"
            width={700}
            height={700}
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${course.thumbnailImagePath}`}
            alt="썸네일 이미지"
            priority
            style={{
              objectFit: "contain",
              width: "100%",
              height: "auto",
            }}
          />
          <div className="flex flex-col w-full justify-center  rounded-sm">
            <nav className="flex flex-wrap p-3 list-none border-b-2 border-gray-200">
              <li className="mx-2 font-Pretendard text-[#41454f] hover:text-blue-600">
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    setDisplayNumber(1);
                  }}
                >
                  강의 정보
                </div>
              </li>
              <li className="mx-2 font-Pretendard text-[#41454f] hover:text-blue-600">
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    setDisplayNumber(2);
                  }}
                >
                  공지사항
                </div>
              </li>
              <li className="mx-2 font-Pretendard text-[#41454f] hover:text-blue-600 ">
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    setDisplayNumber(3);
                  }}
                >
                  첨부파일
                </div>
              </li>
            </nav>

            {displayNumber === 1 && (
              <div className="p-3">
                <h1 className="font-mono text-2xl">코스 소개</h1>
                <br />
                <p
                  className="text-base leading-7 font-Pretendard"
                  dangerouslySetInnerHTML={createMarkup(course.description)}
                ></p>
              </div>
            )}

            {displayNumber === 2 && (
              <div className="p-3">
                <h1 className="font-mono text-2xl">공지사항</h1>
                <br />
                <p className="text-base font-Pretendard">
                  {/* 공지사항입니다. 많이 많이 공지사항이 필요한 상황입니다. */}
                </p>
              </div>
            )}

            {displayNumber === 3 && (
              // 공지사항 컴포넌트를 만들어서 뿌릴 수 있도록 해야겠다.
              <div className="p-3">
                <h1 className="font-mono text-2xl ">첨부파일</h1>
                <br />

                <p className="text-base font-Pretendard">
                  {/* 첨부파일은 어떻게 표현해야할까요..? */}
                </p>
              </div>
            )}
          </div>

          <div className="p-3">
            <h1 className="font-mono text-2xl font-bold">강의 목록</h1>
          </div>
          <div className="w-full h-auto mt-4">
            <LectureList lectures={lectures} isTaking={enrollment.isTaking} />
          </div>
        </div>
        <div className="flex flex-col w-2/5 p-4 h-fit space-y-4 bg-blue-100 border-2 rounded-lg">
          <h1 className="font-mono text-2xl font-bold text-center">
            강의 진행
          </h1>
          <div className="flex flex-row justify-between">
            <div className="justify-start w-fit">
              {enrollment.completedLectures}/{enrollment.totalCount}
            </div>
            <div className="justify-end w-fit">
              {enrollment.totalCount === 0
                ? 0
                : Math.floor(
                    (enrollment.completedLectures / enrollment.totalCount) * 100
                  )}
              %
            </div>
          </div>
          <Progress
            indicatorColor="bg-blue-400"
            className="border-gray-400 shadow-md border-1"
            value={Math.floor(
              (enrollment.completedLectures / enrollment.totalCount) * 100
            )}
          />
          <EnrollButton enrollment={enrollment} courseId={courseId} />
        </div>
      </main>
    </div>
  );
}
