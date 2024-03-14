"use client";
import Image from "next/image";
// import logo from "../../../public/images/logo_black.png";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useLoginStatus } from "@/hooks/useLoginStatus";

import { IoMenu } from "react-icons/io5";
import Link from "next/link";

export default function Header() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  // accessToken 초기화
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setAccessToken(token);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 left-0 z-50 text-gray-700 bg-white border-b border-gray-200 font-Pretendard">
      <div className="container relative flex flex-row flex-wrap items-center justify-between p-5 mx-auto md:flex-row">
        <div className="flex items-center mb-4 font-medium text-gray-900 title-font md:mb-0">
          <Link href="/">
            <Image
              alt="logo"
              src="/images/logo_black.png"
              className="-mr-1"
              width={180}
              height={180}
              priority={true}
            />
          </Link>
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            <IoMenu />
          </button>
          {isOpen && (
            <div
              id="mobile-menu"
              className="absolute w-full top-full left-0 right-0 bg-[#eeeeee]"
            >
              <div className="flex flex-col items-start p-5 space-y-4">
                <Link
                  className="w-full text-left hover:text-blue-900"
                  href="/introduce"
                >
                  아카데미 소개
                </Link>
                <Link
                  className="w-full text-left hover:text-blue-900"
                  href="/course"
                >
                  강의 목록
                </Link>
                {accessToken ? (
                  <>
                    <Link
                      className="w-full text-left hover:text-blue-900"
                      href="#"
                    >
                      내 강의실
                    </Link>
                    <Link
                      className="w-full text-left hover:text-blue-900"
                      href="#"
                    >
                      질문과 답변
                    </Link>
                    <Link
                      className="w-full text-left hover:text-blue-900"
                      href="#"
                    >
                      로그아웃
                    </Link>
                    <Link
                      className="w-full text-left hover:text-blue-900"
                      href="#"
                    >
                      회원정보
                    </Link>
                  </>
                ) : (
                  <>
                    <Link className="mr-5 hover:text-blue-900" href="#">
                      로그인
                    </Link>
                    <Link className="mr-5 hover:text-blue-900" href="#">
                      회원가입
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
        <nav className="flex-wrap items-center justify-center hidden text-base md:flex md:ml-auto">
          <Link className="mr-5 hover:text-blue-900" href="/introduce">
            아카데미 소개
          </Link>
          <Link className="mr-5 hover:text-blue-900" href="/course">
            강의목록
          </Link>
          {accessToken ? (
            <>
              <Link className="mr-5 hover:text-blue-900" href="#">
                내 강의실
              </Link>
              <Link className="mr-5 hover:text-blue-900" href="#">
                질문과 답변
              </Link>
              <Link className="mr-5 hover:text-blue-900" href="#">
                로그아웃
              </Link>
              <Link className="mr-5 hover:text-blue-900" href="#">
                회원정보
              </Link>
            </>
          ) : (
            <>
              <Link className="mr-5 hover:text-blue-900" href="#">
                로그인
              </Link>
              <Link className="mr-5 hover:text-blue-900" href="#">
                회원가입
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
