import Image from "next/image";
import MainBanner from "../../../public/images/main-banner02.jpg";
import CourseCard from "@/components/CourseCard2";

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
      <section id="infoPart" className="flex justify-center w-full p-10">
        <CourseCard />
      </section>
    </main>
  );
}
