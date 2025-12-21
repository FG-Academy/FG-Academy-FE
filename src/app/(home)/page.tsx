import Image from "next/image";
import MainBanner from "@public/images/main-banner.jpeg";
import MainCourseCard from "@/app/(home)/_components/MainCourseCard";
import { AnnouncementList } from "./_components/AnnouncementBanner";

export default async function Home() {
  return (
    <main className="flex flex-col">
      <section className="w-full h-full">
        <Image
          priority
          src={MainBanner}
          alt="메인 배너 이미지"
          className="w-full h-auto object-cover"
        />
      </section>
      <section id="notificationPart">
        <AnnouncementList />
      </section>
      <section id="infoPart" className="flex justify-center w-full sm:p-10">
        <MainCourseCard />
      </section>
    </main>
  );
}
