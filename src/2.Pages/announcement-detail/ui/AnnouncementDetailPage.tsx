"use client";

import { useSession } from "next-auth/react";
import { Button } from "@/6.shared/ui/shadcn/ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeft, Pencil, Calendar, User } from "lucide-react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { announcementQueries } from "@/5.entities/announcement/api/announcement.queries";
import dayjs from "dayjs";
import { DeleteAnnouncementCta } from "@/4.features/delete-announcement/ui/DeleteAnnouncementCta";

type Props = {
  announcementId: number;
};

const AnnouncementDetailPage = ({ announcementId }: Props) => {
  const router = useRouter();

  const { data: session } = useSession();

  const { data: announcement } = useSuspenseQuery(
    announcementQueries.detail(announcementId)
  );

  const isAdmin =
    session?.user.level === "admin" || session?.user.level === "manager";

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-gray-50/50">
      <div className="w-full max-w-[860px] px-5 md:px-8 py-8 md:py-12">
        {/* 상단 네비게이션 */}
        <button
          onClick={() => router.push("/announcement")}
          className="inline-flex items-center gap-2 text-sm text-gray-500 
                     hover:text-primary-blue transition-colors mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          목록으로 돌아가기
        </button>

        {/* 메인 카드 */}
        <article className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {/* 헤더 영역 */}
          <header className="px-6 md:px-8 pt-8 pb-6 border-b border-gray-100">
            {/* 카테고리 뱃지 */}
            <div className="flex items-center gap-2 mb-4">
              <span
                className="inline-flex items-center px-3 py-1 rounded-full 
                              text-xs font-medium bg-primary-blue/10 text-primary-blue"
              >
                공지사항
              </span>
            </div>

            {/* 제목 */}
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 leading-snug mb-5">
              {announcement.title}
            </h1>

            {/* 메타 정보 */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                <span>관리자</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <time dateTime={announcement.createdAt}>
                  {dayjs(announcement.createdAt).format("YYYY년 M월 D일")}
                </time>
              </div>
            </div>
          </header>

          {/* 본문 영역 */}
          <div className="px-6 md:px-8 py-8 md:py-10">
            <div
              className="prose prose-gray max-w-none text-gray-700 leading-relaxed
                         [&>p]:mb-4 [&>br]:mb-2"
              dangerouslySetInnerHTML={{
                __html: announcement.content.replace(/\n/g, "<br />"),
              }}
            />
          </div>

          {/* 관리자 액션 영역 */}
          {isAdmin && (
            <footer className="px-6 md:px-8 py-5 bg-gray-50/80 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    router.push(`/announcement/${announcementId}/edit`)
                  }
                  className="gap-2 text-gray-600 hover:text-primary-blue hover:border-primary-blue"
                >
                  <Pencil className="w-4 h-4" />
                  수정하기
                </Button>
                <DeleteAnnouncementCta announcementId={announcementId} />
              </div>
            </footer>
          )}
        </article>
      </div>
    </div>
  );
};

export { AnnouncementDetailPage };
