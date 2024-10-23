"use client";

import useDurationStore from "@/store/useDurationStore";
import { useSecondsStore } from "@/store/useTimerStore";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import YouTube, { YouTubeProps } from "react-youtube";
import { saveSeconds } from "../lib/saveSeconds";
import Loading from "../loading";
import { useSession } from "next-auth/react";
import { toast } from "@/components/ui/use-toast";
import { useLectureTimeRecordsQuery } from "../hooks/useLectureTimeRecords";
import { useMyCoursesQuery } from "../hooks/useMyCoursesQuery";
import { useProgressQuery } from "../hooks/useProgressQuery";
import { useCompleteMutations } from "../lib/updateCompleted";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  courseId: number;
  lectureId: number;
};

export default function LectureVideo({ courseId, lectureId }: Props) {
  const { data: session } = useSession();
  const accessToken = session?.user.accessToken as string;

  const { data: course } = useMyCoursesQuery(accessToken, courseId);
  const { data: progress, refetch: refetchProgress } = useProgressQuery(
    accessToken,
    courseId
  );
  const { mutate } = useCompleteMutations({
    accessToken,
    lectureId,
    courseId,
    refetchProgress,
  });

  // const { data: lectureTimeRecord } = useLectureTimeRecordsQuery(
  //   lectureId,
  //   accessToken
  // );

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { duration, setDuration } = useDurationStore((state) => state);
  const { seconds, increaseSeconds, setSeconds } = useSecondsStore(
    (state) => state
  );

  // 페이지 나가면 타이머 정지
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (progress) {
      setSeconds(
        progress.lectureProgresses.find((lp) => lp.lectureId === lectureId)
          ?.progress as number
      );
    }
  }, [progress, lectureId, setSeconds]);

  // TODO: 얘는 탭 닫을 때 경고창 뜨는 건데 이때 PATCH 보내도록 하는 방식 고려 중

  if (!course || !progress) {
    return <Skeleton className="w-full h-full bg-gray-200 rounded-lg" />;
  }

  const actualLecture = course.lectures.find(
    (lecture) => lecture.lectureId === lectureId
  );

  // 타이머 시작
  const startTimer = () => {
    if (
      !intervalRef.current &&
      seconds < duration &&
      !progress.lectureProgresses.find((lp) => lp.lectureId === lectureId)
        ?.completed
      // !lectureTimeRecord.status
    ) {
      intervalRef.current = setInterval(() => {
        increaseSeconds();
        const currentSeconds = useSecondsStore.getState().seconds;
        if (currentSeconds === duration - 3) {
          try {
            saveSeconds(
              currentSeconds + 3,
              actualLecture?.lectureId as number,
              accessToken
            );
            mutate();
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
            }
          } catch {
            toast({
              variant: "destructive",
              title: "오류가 발생했습니다.",
              duration: 3000,
            });
          }
        }
        if (!(currentSeconds > duration) && currentSeconds % 60 === 0) {
          saveSeconds(
            currentSeconds,
            actualLecture?.lectureId as number,
            accessToken
          );
        }
      }, 1 * 1000);
    }
  };

  // 타이머 멈춤

  const stopTimer = () => {
    // console.log("stop", intervalRef);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    // console.log("ready");
    event.target.unMute();
    event.target.pauseVideo();
    event.target.setVolume(50);
    const videoDuration = parseInt(event.target.getDuration());
    // 쿠키에 저장되는 문제가 있어서 정상적으로 작동하지 않을 때도 있음(쿠키 삭제하셈)
    event.target.seekTo(seconds);
    setDuration(videoDuration);
  };

  const onPlayerEnd: YouTubeProps["onEnd"] = (event) => {
    event.target.pauseVideo();
    stopTimer();
  };

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      host: "https://www.youtube-nocookie.com",
      rel: 0,
      // controls: 0,
      // iv_load_policy: 3,
      // modestbranding: 1,
      // autoplay: 1,
      // start: 60 * minutes,
    },
  };

  return (
    <YouTube
      className="h-screen"
      videoId={actualLecture?.videoLink}
      opts={opts}
      onReady={onPlayerReady}
      onPlay={startTimer}
      onPause={stopTimer}
      onEnd={onPlayerEnd}
    />
  );
}
