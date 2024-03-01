"use client";
import { refreshToken } from "@/lib/refreshToken";
import { useEffect, useState } from "react";

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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      userIfno
      {JSON.stringify(userInfo)}
    </main>
  );
}
