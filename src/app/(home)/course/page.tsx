"use client";

import Image from "next/image";
import CourseCard from "./components/CourseCard";

export default function CoursesPage() {
  return (
    <div>
      <div
        id="header"
        className="relative flex flex-col justify-center top-0 left-0 right-0 w-full"
      >
        <Image
          src="/images/courseBackground.jpeg"
          width={0}
          height={0}
          style={{ width: "100%", height: "240px", objectFit: "cover" }}
          alt="강의 목록 배경"
        />
        <h2 className="absolute left-16 text-4xl text-start font-sans font-medium text-white z-20">
          강의목록
        </h2>
      </div>
      <section
        id="body"
        className="flex justify-center w-full mx-auto h-max p-10"
      >
        <CourseCard />
      </section>
    </div>
  );
}
