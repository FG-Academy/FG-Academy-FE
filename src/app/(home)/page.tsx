"use client";
import { refreshToken } from "@/lib/refreshToken";
import Image from "next/image";
import { useEffect, useState } from "react";

import MainBanner from "../../../public/images/main-banner02.jpg";
import testCoureThumbnail from "../../../public/images/testCourseThumbnail.jpeg";
import CourseCard from "./course/[courseId]/components/course-card";

interface UserInfo {
  id: string;
  name: string;
  email: string;
}

export default function Home() {
  const [userInfo, setUserInfo] = useState<any>();
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // 사용자 정보 요청 함수 (토큰 만료 시 갱신 로직 포함)
  async function fetchUserInfo() {
    if (!accessToken) return; // accessToken이 없으면 함수 실행 중지

    let response;
    for (let attempt = 0; attempt < 2; attempt++) {
      response = await fetch("http://localhost:3000/users/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserInfo(data);
        return;
      } else if (response.status === 401) {
        const newAccessToken = await refreshToken();
        if (newAccessToken) {
          setAccessToken(newAccessToken);
          continue; // 새로운 accessToken으로 다시 시도
        } else {
          // 갱신 실패 시 처리
          return;
        }
      } else {
        // 401이 아닌 다른 오류 처리
        break;
      }
    }
  }

  // accessToken 초기화
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setAccessToken(token);
  }, []);

  // accessToken이 변경될 때마다 fetchUserInfo 호출
  useEffect(() => {
    if (accessToken) {
      fetchUserInfo().catch(console.error);
    }
  }, [accessToken]);

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
