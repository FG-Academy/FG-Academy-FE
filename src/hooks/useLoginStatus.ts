"use client";
import { useState, useEffect } from "react";
import { cookies } from "next/headers";
import { getCookies, setCookie, deleteCookie, getCookie } from "cookies-next";

export const useLoginStatus = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const accessToken = getCookies();
    console.log(accessToken);
    const refreshToken = "ss"; //getCookies("refreshToken");

    /**액세스 토큰과 리프레시 토큰이 모두 존재하는지 확인하여 로그인 상태 설정 */
    if (accessToken && refreshToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // Cookies.remove('accessToken');
  // Cookies.remove('refreshToken');
  // setIsLoggedIn(false);

  return { isLoggedIn };
};
