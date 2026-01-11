import { Suspense } from "react";
import Image from "next/image";
import { AnnouncementBanner } from "@/5.entities/announcement";
import { CourseList } from "@/5.entities/course";
import MainBanner from "@public/images/main-banner.jpeg";
import { QueryErrorBoundary, Skeleton, Spinner } from "@/6.shared/ui";

/**
 * 메인 페이지 컨텐츠 컴포넌트
 */
const MainPageContent = () => {
  return (
    <main className="flex flex-col">
      {/* 히어로 배너 섹션 */}
      <section className="relative w-full h-[50vh] min-h-[360px] max-h-[540px] overflow-hidden">
        <Image
          className="object-cover"
          src={MainBanner}
          alt="메인 배너 이미지"
          fill
          priority
        />
        {/* 그라디언트 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        {/* 환영 텍스트 */}
        <div className="absolute left-0 right-0 px-6 bottom-10 md:px-8">
          <div className="max-w-[1500px] mx-auto">
            <h1 className="mb-2 text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
              꽃동산 아카데미
            </h1>
            <p className="text-base font-medium md:text-lg text-white/85">
              믿음으로 성장하는 배움의 여정
            </p>
          </div>
        </div>
      </section>

      {/* 메인 콘텐츠 영역 */}
      <QueryErrorBoundary>
        <div className="flex flex-col items-center w-full">
          <div className="w-full max-w-[1500px] px-6 md:px-8 py-10 md:py-14 space-y-10 md:space-y-14">
            {/* 공지사항 배너 */}
            <Suspense
              fallback={<Skeleton className="w-full h-14 rounded-xl" />}
            >
              <AnnouncementBanner />
            </Suspense>

            {/* 강의 목록 */}
            <Suspense
              fallback={
                <div className="flex items-center justify-center w-full py-20">
                  <Spinner />
                </div>
              }
            >
              <CourseList />
            </Suspense>
          </div>
        </div>
      </QueryErrorBoundary>
    </main>
  );
};

export { MainPageContent };
