import Image from "next/image";
import CourseBackground from "../../../public/images/courseBackground.jpeg";

export default function CoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="relative flex flex-col justify-center top-0 left-0 right-0 w-full h-[240px]">
        <Image
          src={CourseBackground}
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
      {children}
    </div>
  );
}
