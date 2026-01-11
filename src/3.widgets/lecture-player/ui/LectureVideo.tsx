"use client";

import useDurationStore from "@/store/useDurationStore";
import { useSecondsStore } from "@/store/useTimerStore";
import { useEffect, useRef, useState } from "react";
import YouTube, { YouTubeProps } from "react-youtube";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/6.shared/ui";
import { enrollmentQueries } from "@/5.entities/enrollment";
import { saveLectureProgress } from "@/4.features/save-lecture-progress";
import { useCompleteLectureMutation } from "@/4.features/complete-lecture";
import { CompleteModal } from "./CompleteModal";

interface LectureVideoProps {
  courseId: number;
  lectureId: number;
}

export function LectureVideo({ courseId, lectureId }: LectureVideoProps) {
  const [completed, setCompleted] = useState<boolean>(false);
  const [nextUrl, setNextUrl] = useState<string | null>(null);

  const { data: course } = useQuery(
    enrollmentQueries.myCourseLectures(courseId)
  );
  const { data: progress, refetch: refetchProgress } = useQuery(
    enrollmentQueries.lectureProgress(courseId)
  );

  const { mutate } = useCompleteLectureMutation({
    lectureId,
    courseId,
    onSuccess: refetchProgress,
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
      !intervalRef.current &&
      seconds < duration &&
      !progress.lectureProgresses.find((lp) => lp.lectureId === lectureId)
        ?.completed
    ) {
      intervalRef.current = setInterval(() => {
        increaseSeconds();
        const currentSeconds = useSecondsStore.getState().seconds;
        if (!(currentSeconds > duration) && currentSeconds % 60 === 0) {
          saveLectureProgress(currentSeconds, lectureId);
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
    event.target.seekTo(seconds);
    setDuration(videoDuration);
  };

  const onPlayerEnd: YouTubeProps["onEnd"] = (event) => {
    if (
      seconds >= duration * 0.9 &&
      !progress.lectureProgresses.find((lp) => lp.lectureId === lectureId)
        ?.completed
    ) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      saveLectureProgress(0, lectureId);
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
    },
  };

  return (
      <div className="relative w-full h-full flex flex-col items-center justify-center bg-zinc-950">
        <CompleteModal open={completed} nextUrl={nextUrl} />
        <div className="w-full h-full max-w-[1920px] aspect-video">
          <YouTube
            className="w-full h-full"
            videoId={actualLecture?.videoLink}
            opts={opts}
            onReady={onPlayerReady}
            onPlay={startTimer}
            onPause={stopTimer}
            onEnd={onPlayerEnd}
          />
        </div>
      </div>
  );
}
