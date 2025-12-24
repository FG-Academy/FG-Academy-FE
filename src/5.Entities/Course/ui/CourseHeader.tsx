import Image from "next/image";
import { Folder } from "lucide-react";
import type { CourseWithCategory } from "../model/course.type";

interface Props {
  course: CourseWithCategory;
}

const CourseHeader = ({ course }: Props) => {
  return (
    <header className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
      {/* 배경 패턴 */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start">
          {/* 텍스트 정보 */}
          <div className="flex-1 flex flex-col gap-4 order-2 md:order-1">
            {/* 카테고리 뱃지 */}
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-sm text-white/90">
                <Folder className="w-3.5 h-3.5" />
                {course.category.name}
              </span>
            </div>

            {/* 강의 제목 */}
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
              {course.title.replace(/\(\d+\)\s*/, "")}
            </h1>

            {/* 강의 요약 정보 */}
            <div className="flex flex-wrap items-center gap-3 text-sm text-white/60 mt-2">
              <span className="flex items-center gap-1">
                {course.description}
              </span>
            </div>
          </div>

          {/* 썸네일 이미지 */}
          <div className="relative w-full md:w-[340px] lg:w-[400px] shrink-0 order-1 md:order-2">
            <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10">
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${course.thumbnailImagePath}`}
                alt={`${course.title} 썸네일 이미지`}
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export { CourseHeader };
