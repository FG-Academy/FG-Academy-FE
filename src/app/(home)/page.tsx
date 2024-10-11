import Image from "next/image";
import MainBanner from "../../../public/images/main-banner.jpeg";
import MainCourseCard from "@/app/(home)/_components/MainCourseCard";
import { AnnouncementList } from "./_components/AnnouncementBanner";

export default async function Home() {
  return (
    <main className="flex flex-col w-screen h-full">
      <section className="w-full h-full">
        <Image
          priority
          src={MainBanner}
          style={{ width: "100%" }}
          alt="메인 배너 이미지"
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
