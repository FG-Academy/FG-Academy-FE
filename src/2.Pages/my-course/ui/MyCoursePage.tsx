"use client";

import { AvatarFallback, Avatar } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { BookOpen, ClipboardList } from "lucide-react";

import { cn } from "@/6.shared/lib";
import { Spinner } from "@/6.shared/ui";

import { MyCourseList } from "@/5.entities/course";
import { MyQuizWidget } from "@/3.widgets/my-quiz";

/**
 * 내 강의 페이지 컨텐츠 (클라이언트 컴포넌트)
 * SSR에서 HydrationBoundary로 감싸서 사용
 * 인증은 미들웨어에서 처리됨
 */
const MyCoursePageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "course";

  const { data: session } = useSession();
  const userName = session?.user.name;

  const updateTab = (newTab: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("tab", newTab);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex w-full min-h-screen bg-gray-50/50">
      <div className="flex flex-col w-full h-full mx-auto max-w-[1400px]">
        {/* 상단 헤더 영역 */}
        <header className="bg-white border-b border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-6 md:px-8 py-6">
            {/* 사용자 정보 */}
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12 border-2 border-primary-blue/20">
                <AvatarFallback className="bg-primary-blue/10 text-primary-blue font-bold text-lg">
                  {userName?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-lg font-bold text-gray-900">
                  {userName} 선생님
                </p>
                <p className="text-sm text-gray-500">학습 현황을 확인하세요</p>
              </div>
            </div>

            {/* 탭 네비게이션 */}
            <nav className="flex gap-2">
              <button
                className={cn(
                  "flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all",
                  tab === "course"
                    ? "bg-primary-blue text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                )}
                onClick={() => updateTab("course")}
              >
                <BookOpen className="w-4 h-4" />
                내 강의
              </button>
              <button
                className={cn(
                  "flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all",
                  tab === "quiz"
                    ? "bg-primary-blue text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                )}
                onClick={() => updateTab("quiz")}
              >
                <ClipboardList className="w-4 h-4" />
                퀴즈 피드백
              </button>
            </nav>
          </div>
        </header>

        {/* 메인 콘텐츠 영역 */}
        <main className="flex-1">
          <Suspense
            fallback={
              <div className="flex items-center justify-center min-h-[400px]">
                <Spinner />
              </div>
            }
          >
            {tab === "course" && (
              <div className="p-6 md:p-8">
                <MyCourseList />
              </div>
            )}
            {tab === "quiz" && <MyQuizWidget />}
          </Suspense>
        </main>
      </div>
    </div>
  );
};

export { MyCoursePageContent };
