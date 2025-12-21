import { Suspense } from "react";
import Image from "next/image";
import { AnnouncementBanner } from "@/5.entities/announcement";
import { CourseList } from "@/5.entities/course";
import MainBanner from "@public/images/main-banner.jpeg";
import { Skeleton, Spinner } from "@/6.shared/ui";

/**
 * 메인 페이지 컨텐츠 컴포넌트
 * SSR에서 HydrationBoundary로 감싸서 사용
 */
const MainPageContent = () => {
  return (
    <main className="flex flex-col">
      <section className="w-full h-full">
        <Image
          className="object-cover w-full h-auto"
          src={MainBanner}
          alt="메인 배너 이미지"
          priority
        />
      </section>
      <div className="flex flex-col w-full items-center justify-center gap-8 p-8">
        <div className="flex flex-col w-full max-w-[1500px] gap-8">
          <Suspense fallback={<Skeleton className="w-full h-12" />}>
            <AnnouncementBanner />
          </Suspense>
          <Suspense
            fallback={
              <div className="flex w-full items-center justify-center">
                <Spinner />
              </div>
            }
          >
            <CourseList />
          </Suspense>
        </div>
      </div>
    </main>
  );
};

/** @deprecated Use MainPageContent instead */
const MainPage = MainPageContent;

export { MainPageContent, MainPage };
