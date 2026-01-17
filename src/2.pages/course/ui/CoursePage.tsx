import { Suspense } from "react";
import Image from "next/image";
import { CoursePageContent } from "./CoursePageContent";
import { Spinner } from "@/6.shared/ui";
import CourseBackground from "@public/images/courseBackground.jpeg";

/**
 * 강의 목록 페이지 레이아웃 컴포넌트
 * SSR에서 HydrationBoundary로 감싸서 사용
 */
export const CoursePage = () => {
  return (
    <div>
      <div className="relative flex flex-col justify-center top-0 left-0 right-0 w-full">
        <Image
          src={CourseBackground}
          width={0}
          height={0}
          style={{ width: "100%", height: "240px", objectFit: "cover" }}
          alt="강의 목록 배경"
        />
        <h2 className="absolute left-16 text-4xl text-start font-sans font-medium text-white z-20">
          강의목록
        </h2>
      </div>
      <section className="flex justify-center w-full mx-auto h-max p-10">
        <Suspense
          fallback={
            <div className="flex w-full items-center justify-center py-20">
              <Spinner size="large" />
            </div>
          }
        >
          <CoursePageContent />
        </Suspense>
      </section>
    </div>
  );
};
