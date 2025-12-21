"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useSuspenseQuery } from "@tanstack/react-query";
import { announcementQueries } from "@/5.entities/announcement/api/announcement.queries";
import { ChevronRightIcon } from "lucide-react";

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
  Typography,
} from "@/6.shared/ui";
import { useRouter } from "next/navigation";

dayjs.extend(customParseFormat);
dayjs.locale("ko");

interface Props {
  page: number;
}

const AnnouncementPage = ({ page }: Props) => {
  const router = useRouter();

  const currentPage = Number.isFinite(page) && page > 0 ? page : 1;

  const { data: announcements } = useSuspenseQuery(
    announcementQueries.list(currentPage)
  );

  console.log("client", announcements);

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
    <div className="flex flex-col items-center justify-center w-full p-4 md:p-8 md:px-12">
      <div className="flex flex-col w-full max-w-[800px] gap-4">
        <Typography name="h3" className="text-center">
          공지 사항
        </Typography>
        <div className="flex w-full justify-end">
          <Button onClick={() => router.push("/announcement/create")}>
            글쓰기
          </Button>
        </div>
        <div className="flex flex-col w-full justify-center items-center">
          {announcements.posts.map((announcement) => (
            <Link
              key={announcement.announcementId}
              href={`/announcement/${announcement.announcementId}`}
              className="flex w-full p-4 md:p-5 border-b"
            >
              <div className="flex flex-col flex-1 gap-2">
                <Typography name="body2" className="line-clamp-2">
                  {announcement.title}
                </Typography>
                <div className="flex gap-2 items-center">
                  <Typography name="small">관리자</Typography>
                  <Typography name="muted">|</Typography>
                  <Typography name="muted">
                    {dayjs(announcement.createdAt).format(
                      "YY. MM. DD. A hh:mm"
                    )}
                  </Typography>
                </div>
              </div>
              <div className="flex items-center">
                <ChevronRightIcon className="h-5 w-5 md:h-6 md:w-6" />
              </div>
            </Link>
          ))}
        </div>

        {totalPages > 1 && (
          <Pagination className="mt-4">
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
        )}
      </div>
    </div>
  );
};

export { AnnouncementPage };
