"use client";

import useDurationStore from "@/store/useDurationStore";
import { useSecondsStore } from "@/store/useTimerStore";
import { useEffect, useRef, useState } from "react";
import YouTube, { YouTubeProps } from "react-youtube";
import { saveSeconds } from "../lib/saveSeconds";
import { useSession } from "next-auth/react";
import { toast } from "@/components/ui/use-toast";
import { useMyCoursesQuery } from "../hooks/useMyCoursesQuery";
import { useProgressQuery } from "../hooks/useProgressQuery";
import { useCompleteMutations } from "../lib/updateCompleted";
import { Skeleton } from "@/components/ui/skeleton";
import CompleteModal from "./CompleteModal";

type Props = {
  courseId: number;
  lectureId: number;
};

export default function LectureVideo({ courseId, lectureId }: Props) {
  const { data: session } = useSession();
  const accessToken = session?.user.accessToken as string;

  const [completed, setCompleted] = useState<boolean>(false);
  const [nextUrl, setNextUrl] = useState<string | null>(null);

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

  // 다음 URL 설정
  useEffect(() => {
    if (course && lectureId) {
      const actualLectureIndex = course.lectures.findIndex(
        (lecture) => lecture.lectureId === lectureId
      );

      if (actualLectureIndex !== -1) {
        const actualLecture = course.lectures[actualLectureIndex];

        if (actualLecture.quizzes?.length > 0) {
          const quiz = actualLecture.quizzes[0];
          setNextUrl(
            `/course/${courseId}/lecture/${lectureId}/${
              quiz.quizType === "multiple" ? "multiple" : "descriptive"
            }?quizId=${quiz.quizId}`
          );
        } else {
          const nextLecture = course.lectures[actualLectureIndex + 1];
          if (nextLecture) {
            setNextUrl(`/course/${courseId}/lecture/${nextLecture.lectureId}`);
          } else {
            setNextUrl(null);
          }
        }
      }
    }
  }, [course, courseId, lectureId]);

  if (!course || !progress) {
    return <Skeleton className="w-full h-full bg-gray-200 rounded-lg" />;
  }

  const actualLecture = course.lectures.find(
    (lecture) => lecture.lectureId === lectureId
  );

  // 타이머 시작
  const startTimer = () => {
    if (
      !intervalRef.current && // 새 타이머이면서
      seconds < duration && // 현재 재생 시간이 영상 시간보다 작고
      !progress.lectureProgresses.find((lp) => lp.lectureId === lectureId) // 수강한 강의가 아닐 때
        ?.completed
    ) {
      intervalRef.current = setInterval(() => {
        increaseSeconds();
        const currentSeconds = useSecondsStore.getState().seconds;
        if (!(currentSeconds > duration) && currentSeconds % 60 === 0) {
          saveSeconds(currentSeconds, lectureId, accessToken);
        }
      }, 1 * 1000);
    }
  };

  // 타이머 멈춤
  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    event.target.unMute();
    event.target.pauseVideo();
    event.target.setVolume(50);
    const videoDuration = parseInt(event.target.getDuration());
    // 쿠키에 저장되는 문제가 있어서 정상적으로 작동하지 않을 때도 있음(쿠키 삭제하셈)
    event.target.seekTo(seconds);
    setDuration(videoDuration);
  };

  const onPlayerEnd: YouTubeProps["onEnd"] = (event) => {
    if (
      seconds >= duration * 0.9 && // 90% 이상이면서
      !progress.lectureProgresses.find((lp) => lp.lectureId === lectureId) // 수강한 강의가 아닐 때
        ?.completed
    ) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      saveSeconds(0, lectureId, accessToken);
      mutate();
      setCompleted(true);
    }
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
    <>
      <CompleteModal open={completed} nextUrl={nextUrl} />
      <YouTube
        className="h-screen"
        videoId={actualLecture?.videoLink}
        opts={opts}
        onReady={onPlayerReady}
        onPlay={startTimer}
        onPause={stopTimer}
        onEnd={onPlayerEnd}
      />
    </>
  );
}
