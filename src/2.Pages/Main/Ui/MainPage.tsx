import Image from "next/image";
import MainBanner from "../../../../public/images/main-banner.jpeg";
import { Suspense } from "react";
import { CourseList } from "@/5.Entities/Course/Ui";
import { AnnouncementBanner } from "@/5.Entities/Announcement/Ui";

const MainPage = () => {
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
          <Suspense fallback={<div>Loading announcements...</div>}>
            <AnnouncementBanner />
          </Suspense>
          <Suspense fallback={<div>Loading courses...</div>}>
            <CourseList />
          </Suspense>
        </div>
      </div>
    </main>
  );
};

export { MainPage };
