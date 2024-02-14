import Image from "next/image";
import logo from "../../../public/images/logo_black.png";

export default function Header() {
  return (
    <header className="font-Pretendard font-bold fixed inset-x-0 top-0 left-0 z-50 text-gray-700 bg-white border-b border-gray-200">
      <div className="container flex flex-col flex-wrap items-center p-5 mx-auto md:flex-row">
        <div className="flex items-center mb-4 font-medium text-gray-900 title-font md:mb-0">
          <Image
            alt="logo"
            src={logo}
            className="-mr-1"
            width={180}
            height={180}
          />
        </div>
        <nav className="flex flex-wrap items-center justify-center text-base md:ml-auto">
          <div className="mr-5 hover:text-gray-900">아카데미 소개</div>
          <div className="mr-5 hover:text-gray-900">강의목록</div>
          <div className="mr-5 hover:text-gray-900">로그인</div>
          <div className="mr-5 hover:text-gray-900">회원가입</div>
        </nav>
      </div>
    </header>
  );
}
