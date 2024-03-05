"use client";
import { refreshToken } from "@/lib/refreshToken";
import Image from "next/image";
import { useEffect, useState } from "react";

import MainBanner from "../../public/images/main-banner02.jpg";
import testCoureThumbnail from "../../public/images/testCoureThumbnail.jpeg";

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
      response = await fetch("http://localhost:3000/users", {
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
    <main className="flex h-full flex-col  ">
      <section className="w-full h-full relative">
        <Image src={MainBanner} alt="메인 배너 이미지" />
      </section>
      <section id="infoPart" className="md:container">
        <div id="div1" className=" flex flex-col w-full items-center ">
          <div id="div2" className="text-4xl font-sans font-medium py-6">
            강의 목록
          </div>
        </div>
        <div
          id="div3"
          className="flex flex-row justify-start w-full h-full mt-4"
        >
          <div
            id="courseInfo1"
            className=" w-full md:w-1/3 px-2 rounded-2xl shadow-lg"
          >
            <Image
              className="rounded-md"
              src={testCoureThumbnail}
              alt="강의 썸네일"
            />
            <div className="p-4 text-lg">교사기초양육1 : 교리 및 기본신앙</div>
            <button className="bg-white text-blue-600 border border-blue-600 w-full py-2 px-4 rounded-xl transition-colors duration-150 hover:bg-blue-600 hover:text-white">
              강의 들으러 가기
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
