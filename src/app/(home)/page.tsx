import Image from "next/image";
import MainBanner from "../../../public/images/main-banner02.jpg";
import MainCourseCard from "@/app/(home)/components/MainCourseCard";

export default function Home() {
  return (
    <main className="flex flex-col h-full">
      <section className="w-full h-full">
        <Image
          priority
          src={MainBanner}
          style={{ width: "100%" }}
          alt="메인 배너 이미지"
        />
      </section>
      <section id="infoPart" className="flex justify-center w-full sm:p-10">
        <MainCourseCard />
      </section>
    </main>
  );
}
