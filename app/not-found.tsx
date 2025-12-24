import { HomeIcon, VideoIcon } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-white">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating petals */}
        <div className="absolute top-[10%] left-[10%] w-6 h-6 bg-gradient-to-br from-pink-200 to-pink-300 rounded-[50%_0_50%_50%] opacity-50 animate-float" />
        <div className="absolute top-[20%] right-[15%] w-4 h-4 bg-gradient-to-br from-pink-200 to-pink-300 rounded-[50%_0_50%_50%] opacity-50 animate-float [animation-delay:-3s]" />
        <div className="absolute bottom-[30%] left-[20%] w-5 h-5 bg-gradient-to-br from-pink-200 to-pink-300 rounded-[50%_0_50%_50%] opacity-50 animate-float [animation-delay:-6s]" />
        <div className="absolute bottom-[15%] right-[25%] w-7 h-7 bg-gradient-to-br from-pink-200 to-pink-300 rounded-[50%_0_50%_50%] opacity-50 animate-float [animation-delay:-9s]" />
        <div className="absolute top-[50%] left-[5%] w-[18px] h-[18px] bg-gradient-to-br from-pink-200 to-pink-300 rounded-[50%_0_50%_50%] opacity-50 animate-float [animation-delay:-12s]" />

        {/* Subtle gradient orbs */}
        <div className="absolute w-[500px] h-[500px] bg-gradient-to-br from-pink-100 to-purple-100 rounded-full blur-[100px] opacity-60 -top-[150px] -right-[150px] animate-pulse-slow" />
        <div className="absolute w-[400px] h-[400px] bg-gradient-to-br from-pink-50 to-pink-100 rounded-full blur-[100px] opacity-60 -bottom-[100px] -left-[100px] animate-pulse-slow [animation-direction:reverse] [animation-duration:10s]" />
      </div>

      {/* Main content */}
      <main className="relative z-10 flex flex-col items-center px-6 py-8 max-w-[600px] text-center">
        {/* 404 Display */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <span className="text-7xl sm:text-8xl md:text-9xl font-black bg-gradient-to-br from-pink-700 to-purple-600 bg-clip-text text-transparent leading-none drop-shadow-lg">
            4
          </span>
          <div className="w-16 sm:w-20 md:w-28 h-16 sm:h-20 md:h-28 animate-bloom drop-shadow-lg">
            <svg
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              {/* Center */}
              <circle cx="50" cy="50" r="12" fill="#FBBF24" />
              {/* Petals */}
              <ellipse cx="50" cy="25" rx="12" ry="20" fill="#F472B6" />
              <ellipse cx="50" cy="75" rx="12" ry="20" fill="#F472B6" />
              <ellipse cx="25" cy="50" rx="20" ry="12" fill="#F472B6" />
              <ellipse cx="75" cy="50" rx="20" ry="12" fill="#F472B6" />
              <ellipse
                cx="32"
                cy="32"
                rx="12"
                ry="18"
                fill="#FB7185"
                transform="rotate(-45 32 32)"
              />
              <ellipse
                cx="68"
                cy="32"
                rx="12"
                ry="18"
                fill="#FB7185"
                transform="rotate(45 68 32)"
              />
              <ellipse
                cx="32"
                cy="68"
                rx="12"
                ry="18"
                fill="#FB7185"
                transform="rotate(45 32 68)"
              />
              <ellipse
                cx="68"
                cy="68"
                rx="12"
                ry="18"
                fill="#FB7185"
                transform="rotate(-45 68 68)"
              />
            </svg>
          </div>
          <span className="text-7xl sm:text-8xl md:text-9xl font-black bg-gradient-to-br from-pink-700 to-purple-600 bg-clip-text text-transparent leading-none drop-shadow-lg">
            4
          </span>
        </div>

        {/* Message */}
        <div className="mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 tracking-tight">
            페이지를 찾을 수 없습니다
          </h1>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
            <br />
            꽃동산 아카데미와 함께 새로운 길을 찾아보세요.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 w-full sm:w-auto">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold rounded-full bg-gradient-to-br from-pink-600 to-purple-600 text-white shadow-lg shadow-pink-500/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-pink-500/40"
          >
            <HomeIcon size={20} />
            홈으로 돌아가기
          </Link>
          <Link
            href="/course"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold rounded-full bg-gray-100 text-gray-700 border border-gray-200 transition-all duration-300 hover:bg-gray-200 hover:border-gray-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gray-200/50"
          >
            <VideoIcon size={20} />
            강의 둘러보기
          </Link>
        </div>

        {/* Decorative verse */}
        <blockquote className="text-sm text-gray-500 italic leading-relaxed max-w-[400px] p-6 bg-gray-50 rounded-2xl border border-gray-100">
          &ldquo;내가 진실로 진실로 너희에게 이르노니 한 알의 밀이 땅에 떨어져
          죽지 아니하면 한 알 그대로 있고 죽으면 많은 열매를 맺느니라&rdquo;
          <cite className="block mt-3 text-sm not-italic font-semibold text-gray-600">
            - 요한복음 12:24
          </cite>
        </blockquote>
      </main>
    </div>
  );
}
