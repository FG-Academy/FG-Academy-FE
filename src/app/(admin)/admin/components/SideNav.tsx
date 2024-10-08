"use client";

import { Users } from "lucide-react";
import { Video } from "lucide-react";
import { MessageCircleQuestion } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideNav() {
  const { data: session } = useSession();
  const userLevel = session?.user.level;

  const pathname = usePathname();
  const linkClassName = (linkType: string) => {
    const isActivePage = pathname.includes(linkType);
    return `flex flex-row w-full p-4 py-6 space-x-2 ${
      isActivePage
        ? "bg-white text-blue-700"
        : "hover:bg-white hover:text-blue-700"
    }`;
  };

  const sublinkClassName = (linkType: string) => {
    const isActivePage = pathname.includes(linkType);
    return `flex flex-row w-full px-4 p-2 ${
      isActivePage
        ? "bg-white text-blue-700"
        : "hover:bg-white hover:text-blue-700"
    }`;
  };

  return (
    // h-screen 뺌
    <div className="w-auto">
      <div className="w-[300px] h-full bg-blue-700 text-white flex flex-col items-center">
        <Link
          href="/"
          className="h-[100px] items-center bg-blue-50 justify-center flex border-b-2 border-gray-300 mb-4 w-full"
        >
          <Image
            alt="logo"
            src="/images/logo_black.png"
            width={180}
            height={180}
            style={{
              width: "80%", // Make the width responsive
              height: "auto", // Auto-adjust the height based on the width to maintain aspect ratio
            }}
            priority={true}
          />
        </Link>
        <nav className="flex flex-col items-start justify-center w-full">
          {userLevel === "tutor" ? (
            <Link
              href="/admin/quizzes"
              className={`flex flex-col ${linkClassName("quizzes")}`}
            >
              <div className="flex flex-row space-x-2">
                <MessageCircleQuestion />
                <div>퀴즈 관리</div>
              </div>
            </Link>
          ) : (
            <>
              {userLevel === "admin" && (
                <Link href="/admin/users" className={linkClassName("users")}>
                  <Users />
                  <div>유저 관리</div>
                </Link>
              )}
              <Link href="/admin/videos" className={linkClassName("videos")}>
                <Video />
                <div>강의 관리</div>
              </Link>
              <Link
                href="/admin/videos/category"
                className={linkClassName("category")}
              >
                <Video />
                <div>카테고리 관리</div>
              </Link>
              <Link
                href="/admin/quizzes"
                className={`flex flex-col ${linkClassName("quizzes")}`}
              >
                <div className="flex flex-row space-x-2">
                  <MessageCircleQuestion />
                  <div>퀴즈 관리</div>
                </div>
              </Link>
              <div className="w-full flex flex-col px-4 mt-2">
                <ul className="list-disc pl-5">
                  {/* <li>
                    <Link
                      className={`${sublinkClassName("quizzes/multiple")}`}
                      href="/admin/quizzes/multiple"
                    >
                      객관식 퀴즈 현황
                    </Link>
                  </li> */}

                  {userLevel === "admin" && (
                    <li>
                      <Link
                        className={`${sublinkClassName("quizzes/descriptive")}`}
                        href="/admin/quizzes/descriptive"
                      >
                        퀴즈 관리
                      </Link>
                    </li>
                  )}

                  <li>
                    <Link
                      className={`${sublinkClassName("quizzes/register")}`}
                      href="/admin/quizzes/register"
                    >
                      퀴즈 등록
                    </Link>
                  </li>
                </ul>
              </div>
            </>
          )}
        </nav>
      </div>
    </div>
  );
}
