import Image from "next/image";
import MainBanner from "../../../public/images/main-banner02.jpg";
import CourseCard from "./course/[courseId]/components/course-card";

export default function Home() {
  return (
    <main className="flex flex-col h-full">
      <section className="relative w-full h-full">
        <Image src={MainBanner} alt="메인 배너 이미지" />
      </section>
      <section
        id="infoPart"
        className="flex justify-center w-full mx-auto h-max mt-28"
      >
        {/* 나중에 이 부분을 react Query를 통해 서버에서 데이터로 가져와서 map형식으로 뿌려줄 수 있도록 하자. */}
        <div
          id="div3"
          className="grid grid-cols-1 gap-6 p-3 mx-20 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3"
        >
          <CourseCard />
        </div>
      </section>
    </main>
  );
}

{
  /* <div
            id="courseInfo1"
            className="w-full px-2 shadow-lg md:w-1/3 rounded-2xl"
          >
            <Image
              className="rounded-md"
              src={testCoureThumbnail}
              alt="강의 썸네일"
            />
            <div className="p-4 text-lg">교사기초양육1 : 교리 및 기본신앙</div>
            <button className="w-full px-4 py-2 text-blue-600 transition-colors duration-150 bg-white border border-blue-600 rounded-xl hover:bg-blue-600 hover:text-white">
              강의 들으러 가기
            </button>
          </div> */
}

// <section id="infoPart" className="md:container">
//         <div id="div1" className="flex flex-col items-center w-full ">
//           <div id="div2" className="py-6 font-sans text-4xl font-medium">
//             강의 목록
//           </div>
//         </div>
//         <div
//           id="div3"
//           className="flex flex-row justify-start w-full h-full mt-4"
//         >
//           <CourseCard />
//         </div>
//       </section>
