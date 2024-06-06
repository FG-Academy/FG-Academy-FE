"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { IoMenu } from "react-icons/io5";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import useOpenMenuStore from "@/store/useHeaderMenuStore";

export default function Header() {
  // const [isOpen, setIsOpen] = useState(false);

  const { isOpen, setIsOpen } = useOpenMenuStore((state) => state);

  const { data: session, status } = useSession();

  const queryClient = useQueryClient();

  const router = useRouter();

  useEffect(() => {
    if (session && session.user.error === "RefreshAccessTokenError") {
      console.log("세션 만료.");
      router.refresh();
      router.push("/");
      // location.reload();
      // queryClient.invalidateQueries();
      signOut({ redirect: false });
    }
  }, [session]);

  return (
    <header className="sticky inset-x-0 top-0 left-0 z-50 text-gray-700 bg-white border-b border-gray-200 font-Pretendard">
      {status !== "loading" && (
        <div className="container relative flex flex-row flex-wrap items-center justify-between p-5 mx-auto md:flex-row">
          <div className="flex items-center mb-4 font-medium text-gray-900 title-font md:mb-0">
            <Link
              href="/"
              onClick={() => {
                setIsOpen(false);
              }}
            >
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
              <IoMenu size={24} />
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
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    아카데미 소개
                  </Link>
                  <Link
                    className="w-full text-left hover:text-blue-900"
                    href="/course"
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    강의 목록
                  </Link>
                  {session &&
                    (session.user.level === "admin" ||
                      session.user.level === "tutor" ||
                      session.user.level === "manager") && (
                      <Link
                        className="w-full text-left hover:text-blue-900"
                        href="/admin/users"
                        onClick={() => {
                          setIsOpen(false);
                        }}
                      >
                        관리자 페이지
                      </Link>
                    )}
                  {session ? (
                    <>
                      <Link
                        className="w-full text-left hover:text-blue-900"
                        href="/myDashboard"
                        onClick={() => {
                          setIsOpen(false);
                        }}
                      >
                        내 강의실
                      </Link>
                      <Link
                        className="w-full text-left hover:text-blue-900"
                        href={`/notice?page=1`}
                        onClick={() => {
                          setIsOpen(false);
                        }}
                      >
                        공지사항
                      </Link>
                      <Link
                        className="w-full text-left hover:text-blue-900"
                        href={`/qna`}
                      >
                        질문게시판
                      </Link>
                      <Link
                        className="w-full text-left hover:text-blue-900"
                        href="/"
                        onClick={() => {
                          // location.reload();
                          router.refresh();
                          router.push("/");
                          setIsOpen(false);
                          signOut({ redirect: false });
                        }}
                      >
                        로그아웃
                      </Link>
                      <Link
                        className="w-full text-left hover:text-blue-900"
                        href="/userInfo"
                        onClick={() => {
                          setIsOpen(false);
                        }}
                      >
                        회원정보
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        className="mr-5 hover:text-blue-900"
                        href="/login"
                        onClick={() => {
                          setIsOpen(false);
                        }}
                      >
                        로그인
                      </Link>
                      <Link
                        className="mr-5 hover:text-blue-900"
                        href="/signup"
                        onClick={() => {
                          setIsOpen(false);
                        }}
                      >
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
              강의 목록
            </Link>
            <Link
              className="mr-5 hover:text-blue-900"
              href={`/notice?page=1`}
              onClick={() => {
                setIsOpen(false);
              }}
            >
              공지사항
            </Link>
            {session &&
              (session.user.level === "admin" ||
                session.user.level === "tutor" ||
                session.user.level === "manager") && (
                <Link className="mr-5 hover:text-blue-900" href="/admin/users">
                  관리자 페이지
                </Link>
              )}
            {session ? (
              <>
                <Link className="mr-5 hover:text-blue-900" href="/myDashboard">
                  내 강의실
                </Link>
                {/* <Link
                  className="mr-5 hover:text-blue-900"
                  href={`/notice?page=1`}
                >
                  공지사항
                </Link> */}
                <Link className="mr-5 hover:text-blue-900" href={`/qna`}>
                  질문게시판
                </Link>
                <Link
                  className="mr-5 hover:text-blue-900"
                  href="/"
                  onClick={() => {
                    // location.reload();
                    router.refresh();
                    router.push("/");
                    signOut({ redirect: false });
                  }}
                >
                  로그아웃
                </Link>
                <Link className="mr-5 hover:text-blue-900" href="/userInfo">
                  회원정보
                </Link>
              </>
            ) : (
              <>
                <Link className="mr-5 hover:text-blue-900" href="/login">
                  로그인
                </Link>
                <Link className="mr-5 hover:text-blue-900" href="/signup">
                  회원가입
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
