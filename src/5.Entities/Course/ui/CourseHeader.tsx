import { Typography } from "@/6.shared/ui";
import Image from "next/image";
import type { CourseWithCategory } from "../model/course.type";

interface Props {
  course: CourseWithCategory;
}

const CourseHeader = ({ course }: Props) => {
  return (
    <header className="flex gap-4 p-8 text-white bg-gray-950">
      <div className="flex flex-col flex-1 gap-2">
        <Typography name="muted" className="text-gray-400">
          카테고리: {course.category.name}
        </Typography>
        <Typography name="h3">
          {course.title.replace(/\(\d+\)\s*/, "")}
        </Typography>
      </div>
      <div className="relative w-[368px] h-[207px]">
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${course.thumbnailImagePath}`}
          alt={`${course.title} 썸네일 이미지`}
          fill
          sizes="(max-width: 768px) 100vw, 368px"
          className="object-cover rounded"
          priority
        />
      </div>
    </header>
  );
};

export { CourseHeader };
