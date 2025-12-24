"use client";

import Link from "next/link";
import { useSuspenseQuery } from "@tanstack/react-query";
import { announcementQueries } from "@/5.entities/announcement/api/announcement.queries";
import { ChevronRight, Plus, Bell } from "lucide-react";

import dayjs from "dayjs";
import "dayjs/locale/ko";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {
  Button,
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/6.shared/ui";
import { useRouter } from "next/navigation";

dayjs.extend(customParseFormat);
dayjs.locale("ko");

interface Props {
  page: number;
}

/**
 * 공지사항 목록 페이지 컨텐츠 (클라이언트 컴포넌트)
 * SSR에서 HydrationBoundary로 감싸서 사용
 */
const AnnouncementPageContent = ({ page }: Props) => {
  const router = useRouter();

  const currentPage = Number.isFinite(page) && page > 0 ? page : 1;

  const { data: announcements } = useSuspenseQuery(
    announcementQueries.list(currentPage)
  );

  const totalPages = announcements.totalPages ?? 1;

  // Build pagination model with ellipsis around the current page
  const getPageNumbers = (total: number, current: number, delta = 1) => {
    const range: number[] = [];
    const rangeWithDots: (number | "...")[] = [];
    const left = Math.max(2, current - delta);
    const right = Math.min(total - 1, current + delta);

    for (let i = left; i <= right; i++) range.push(i);

    if (total >= 1) {
      const pages = [1, ...range, total];
      let prev: number | undefined;
      for (const p of pages) {
        if (prev) {
          if (p - prev === 2) {
            rangeWithDots.push(prev + 1);
          } else if (p - prev > 2) {
            rangeWithDots.push("...");
          }
        }
        rangeWithDots.push(p);
        prev = p;
      }
    }
    return rangeWithDots;
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-gray-50/50">
      <div className="w-full max-w-[860px] px-5 md:px-8 py-8 md:py-12">
        {/* 페이지 헤더 */}
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary-blue/10">
              <Bell className="w-5 h-5 text-primary-blue" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                공지사항
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">
                꽃동산 아카데미의 소식을 전해드립니다
              </p>
            </div>
          </div>
          <Button
            onClick={() => router.push("/announcement/create")}
            size="sm"
            className="gap-1.5 bg-primary-blue hover:bg-primary-blue/90"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">글쓰기</span>
          </Button>
        </header>

        {/* 공지사항 목록 */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {announcements.posts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-gray-400">
              <Bell className="w-10 h-10 mb-3 opacity-50" />
              <p>등록된 공지사항이 없습니다</p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {announcements.posts.map((announcement, index) => (
                <li key={announcement.announcementId}>
                  <Link
                    href={`/announcement/${announcement.announcementId}`}
                    className="flex items-center gap-4 px-5 md:px-6 py-4 md:py-5 
                               hover:bg-gray-50/80 transition-colors group"
                  >
                    {/* 번호 */}
                    <span
                      className="hidden sm:flex items-center justify-center 
                                    w-8 h-8 rounded-lg bg-gray-100 text-sm font-medium text-gray-500
                                    group-hover:bg-primary-blue/10 group-hover:text-primary-blue 
                                    transition-colors shrink-0"
                    >
                      {index + 1}
                    </span>

                    {/* 콘텐츠 */}
                    <div className="flex-1 min-w-0">
                      <h3
                        className="text-base font-medium text-gray-800 
                                      line-clamp-1 group-hover:text-primary-blue transition-colors"
                      >
                        {announcement.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1.5 text-sm text-gray-400">
                        <span>관리자</span>
                        <span className="w-px h-3 bg-gray-200" />
                        <time dateTime={announcement.createdAt}>
                          {dayjs(announcement.createdAt).format(
                            "YYYY. M. D. (dd)"
                          )}
                        </time>
                      </div>
                    </div>

                    {/* 화살표 */}
                    <ChevronRight
                      className="w-5 h-5 text-gray-300 shrink-0
                                            group-hover:text-primary-blue group-hover:translate-x-0.5 
                                            transition-all"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href={`/announcement?page=${Math.max(1, currentPage - 1)}`}
                    className={
                      currentPage === 1 ? "pointer-events-none opacity-50" : ""
                    }
                  />
                </PaginationItem>

                {getPageNumbers(totalPages, currentPage, 1).map((item, idx) => (
                  <PaginationItem key={`${item}-${idx}`}>
                    {item === "..." ? (
                      <PaginationEllipsis />
                    ) : (
                      <PaginationLink
                        href={`/announcement?page=${item}`}
                        isActive={item === currentPage}
                      >
                        {item}
                      </PaginationLink>
                    )}
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    href={`/announcement?page=${Math.min(
                      totalPages,
                      currentPage + 1
                    )}`}
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  );
};

export { AnnouncementPageContent };
