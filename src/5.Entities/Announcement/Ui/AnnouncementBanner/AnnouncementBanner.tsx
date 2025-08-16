"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import Link from "next/link";
import { announcementQueries } from "../../Api";
import { useEffect, useState } from "react";
import { Typography } from "@/6.Shared/Ui";

const DEFAULT_PAGE = 1;

const AnnouncementBanner = () => {
  const [index, setIndex] = useState(0);

  const { data } = useSuspenseQuery(announcementQueries.list(DEFAULT_PAGE));

  useEffect(() => {
    if (data.posts.length === 0) return;

    const announcements = data.posts;
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % announcements.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [data.posts]);

  if (data.posts.length === 0) return null;

  const { posts: announcements } = data;

  return (
    <div className="flex w-full justify-center items-center gap-4 rounded-lg bg-blue-100">
      <Typography
        name="p"
        className="font-bold text-nowrap rounded-lg p-2 bg-blue-200"
      >
        공지사항
      </Typography>
      <section className="relative overflow-hidden h-10 w-full">
        <div
          className="absolute whitespace-nowrap transition-transform duration-1000 ease-in-out"
          style={{ transform: `translateY(-${index * 2.5}rem)` }}
        >
          {announcements.map((announcement, idx) => (
            <div key={idx} className="h-10 flex items-center">
              <Link
                className="mr-5 hover:text-blue-900 hover:underline text-sm md:text-base"
                href={`/notice/${announcement.announcementId}`}
              >
                {announcement.title}
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export { AnnouncementBanner };
