"use client";

import { Lecture } from "@/model/lecture";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { getLectures } from "../lib/getLectures";
import useDurationStore from "@/store/useDurationStore";
import { useSecondsStore } from "@/store/useTimerStore";
import { IProgressResult } from "@/model/progress";
import { getProgress } from "../lib/getProgress";
import { usePathname } from "next/navigation";
import Loading from "../loading";
import { useSession } from "next-auth/react";

type Props = {
  courseId: number;
  lectureId: number;
};
export default function MainHeader({ courseId, lectureId }: Props) {
  const { data: session } = useSession();
  const accessToken = session?.user.accessToken;

  const lectures = useQuery<Lecture[]>({
    queryKey: ["lectures", courseId],
    queryFn: () => getLectures(courseId, accessToken),
    enabled: !!accessToken,
  });
  const progress = useQuery<IProgressResult>({
    queryKey: ["progress", courseId],
    queryFn: () => getProgress(courseId, accessToken),
    enabled: !!accessToken,
  });

  const pathname = usePathname();

  const { duration } = useDurationStore((state) => state);
  const seconds = useSecondsStore((state) => state.seconds);

  if (!lectures.data || !progress.data) {
    return <Loading />;
  }

  return (
    <div
      id="header"
      className="relative flex flex-row items-center space-x-4 justify-start bg-blue-500 text-white"
    >
      <Link
        href="/course"
        className="flex flex-row rounded-r-lg space-x-2 p-4 justify-start bg-blue-700"
      >
        <ChevronLeft />
        <div>강의 대시보드</div>
      </Link>
      <div>
        {lectureId}강: {lectures.data[lectureId - 1].title}
      </div>
      {!(pathname.includes("multiple") || pathname.includes("descriptive")) && (
        <div className="absolute right-4">
          {Math.round(seconds / 60)}분/
          {Math.round(duration / 60)}분(
          {`${Math.floor((seconds / 60 / (duration / 60)) * 100)}%`})
          {/* {`${(Math.floor(seconds / 60) / Math.round(duration / 60)) * 100}%`}) */}
        </div>
      )}
    </div>
  );
}
