import Image from "next/image";
import React from "react";

interface Course {
  courseId: number;
  thumbnail: string;
  title: string;
}

const CourseCard: React.FC<{ course: Course }> = ({ course }) => (
  <div
    id="courseInfo1"
    className="w-full md:w-1/4 p-2 mx-4 rounded-2xl shadow-xl"
  >
    <Image className="rounded-md" src={course.thumbnail} alt="강의 썸네일" />
    <div className="p-4 text-lg">{course.title}</div>
    <button className="bg-white text-blue-600 border border-blue-600 w-full py-2 px-4 rounded-xl transition-colors duration-150 hover:bg-blue-600 hover:text-white">
      강의 들으러 가기
    </button>
  </div>
);

export default CourseCard;
