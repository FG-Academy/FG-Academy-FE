import Image from "next/image";
// import testCoureThumbnail from "../../../public/images/testCoureThumbnail.jpeg";
// import CourseCard from "../../../components/ui/course-card"; // 강의 코스 목록을 가져올 경우 사용할 커스텀 컴포넌트

export default function CoursesPage() {
  //reactQuery로 데이터 fetch해서 가져온 후 강의목록 뿌리기

  return (
    <section id="infoPart" className="flex mx-auto w-full h-max mt-28 ">
      {/* 나중에 이 부분을 react Query를 통해 서버에서 데이터로 가져와서 map형식으로 뿌려줄 수 있도록 하자. */}
      <div
        id="div3"
        className="flex flex-row mx-20 justify-start w-full h-full p-3"
      >
        <div
          id="courseInfo1"
          className=" w-full md:w-1/4 px-2 ml-6 rounded-2xl shadow-lg"
        >
          <Image
            width={100}
            height={100}
            className="rounded-md"
            src="/images/testCoureThumbnail.jpeg"
            alt="강의 썸네일"
          />
          <div className="p-4 text-lg">교사기초양육1 : 교리 및 기본신앙</div>
          <button className="bg-white text-blue-600 border border-blue-600 w-full py-2 px-4 rounded-xl transition-colors duration-150 hover:bg-blue-600 hover:text-white">
            강의 들으러 가기
          </button>
        </div>
      </div>
    </section>
  );
}
