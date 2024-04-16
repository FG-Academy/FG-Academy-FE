import Image from "next/image";
import MainBanner from "../../../public/images/main-banner02.jpg";
import CourseCard from "../../components/CourseCard";

export default function Home() {
  return (
    <main className="flex flex-col h-full">
      <section className="w-full h-full">
        <Image src={MainBanner} alt="메인 배너 이미지" />
      </section>
      <section id="infoPart" className="flex w-full mx-auto p-10">
        <CourseCard />
      </section>
    </main>
  );
}
