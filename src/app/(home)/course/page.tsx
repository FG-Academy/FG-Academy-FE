"use client";
import Image from "next/image";
// import testCoureThumbnail from "../../../public/images/testCourseThumbnail.jpeg";
// import CourseCard from "../../../components/ui/course-card"; // 강의 코스 목록을 가져올 경우 사용할 커스텀 컴포넌트
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import CourseCard from "../../../components/ui/course-card";

export default function CoursesPage() {
  //reactQuery로 데이터 fetch해서 가져온 후 강의목록 뿌리기
  // const { data, error, isLoading } = useImagePathQuery();

  return (
    // 헤더 부분
    <div>
      <div className="relative flex flex-col justify-center top-0 left-0 right-0 w-full h-[240px]">
        <Image
          src="/images/courseBackground.jpeg"
          width={0}
          height={0}
          style={{ width: "100%", height: "240px", objectFit: "cover" }}
          alt="강의 목록 배경"
        />

        <div
          id="div2"
          className="absolute top-0 left-0 right-0 w-full h-[240px] z-10"
        ></div>
        <h2 className="absolute m-8 left-[12.5%] text-4xl text-start font-sans font-medium mb-4 text-white z-20">
          강의목록
        </h2>
      </div>
      {/* body 부분 */}
      <section
        id="infoPart"
        className="flex justify-center w-full mx-auto h-max mt-28"
      >
        {/* 나중에 이 부분을 react Query를 통해 서버에서 데이터로 가져와서 map형식으로 뿌려줄 수 있도록 하자. */}
        <div
          id="div3"
          // className="flex flex-row justify-start w-full h-full p-3 mx-20"
          // className="grid grid-cols-1 gap-8 p-3 mx-20 md:grid-cols-3"
          // className="grid grid-cols-1 gap-6 p-3 mx-20 sm:grid-cols-2 lg:grid-cols-3"
          // className="grid grid-cols-1 gap-6 p-3 mx-20 sm:grid-cols-2 md:grid-cols-3"
          className="grid grid-cols-1 gap-6 p-3 mx-20 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3"
        >
          <CourseCard />
        </div>
      </section>
    </div>
  );
}
