"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import { Bell, ChevronRight } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem } from "@/6.shared/ui";
import { announcementQueries } from "../api/announcement.queries";

const DEFAULT_PAGE = 1;

const AnnouncementBanner = () => {
  const { data } = useSuspenseQuery(announcementQueries.list(DEFAULT_PAGE));

  if (data.posts.length === 0) return null;

  const { posts: announcements } = data;

  return (
    <div
      className="flex w-full items-center gap-4 px-4 md:px-5 py-3 rounded-xl 
                    bg-white border border-gray-100 shadow-sm
                    hover:shadow-md hover:border-gray-200 transition-all duration-200"
    >
      {/* 좌측 액센트 바 + 라벨 */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="w-1 h-7 bg-primary-blue rounded-full" />
        <div className="flex items-center gap-1.5">
          <Bell className="w-4 h-4 text-primary-blue" />
          <span className="font-semibold text-sm text-primary-blue hidden sm:inline">
            공지
          </span>
        </div>
      </div>

      {/* 캐러셀 */}
      <Carousel
        orientation="vertical"
        opts={{
          loop: true,
          align: "start",
        }}
        plugins={[
          Autoplay({
            delay: 3000,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
          }),
        ]}
        className="flex-1 min-w-0"
      >
        <CarouselContent className="h-10 -mt-0">
          {announcements.map((announcement) => (
            <CarouselItem
              key={announcement.announcementId}
              className="h-10 pt-0 flex items-center"
            >
              <Link
                className="text-sm md:text-base text-gray-700 hover:text-primary-blue 
                           transition-colors truncate"
                href={`/announcement/${announcement.announcementId}`}
              >
                {announcement.title}
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* 우측 화살표 */}
      <Link
        href="/announcement?page=1"
        className="shrink-0 p-1 rounded-full hover:bg-gray-100 transition-colors"
      >
        <ChevronRight className="w-5 h-5 text-gray-400" />
      </Link>
    </div>
  );
};

export { AnnouncementBanner };
