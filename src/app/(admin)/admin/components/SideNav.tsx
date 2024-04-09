import { Users } from "lucide-react";
import { Video } from "lucide-react";
import { MessageCircleQuestion } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function SideNav() {
  return (
    <div className="w-auto flex-1 h-screen">
      <div className="w-[300px] h-full bg-gray-100 flex flex-col items-center">
        <Link
          href="/"
          className="h-[100px] items-center justify-center flex border-b-2 border-gray-300 mb-4 w-full"
        >
          <Image
            alt="logo"
            src="/images/logo_black.png"
            width={180}
            height={180}
            priority={true}
          />
        </Link>
        <nav className="flex flex-col items-start justify-center w-full">
          <Link
            href="/admin/users"
            className="flex flex-row w-full p-4 py-6 space-x-2 hover:bg-gray-200"
          >
            <Users />
            <div>유저 관리</div>
          </Link>

          <Link
            href="/admin/videos"
            className="flex flex-row w-full p-4 py-6 space-x-2 hover:bg-gray-200"
          >
            <Video />
            <div>강의 관리</div>
          </Link>
          <Link
            href="/admin/quizzes"
            className="flex flex-row w-full p-4 py-6 space-x-2 hover:bg-gray-200"
          >
            <MessageCircleQuestion />
            <div>퀴즈 관리</div>
          </Link>
        </nav>
      </div>
    </div>
  );
}
