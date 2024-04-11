"use client";

import { Lecture } from "@/model/lecture";
import useDurationStore from "@/store/useDurationStore";
import { useSecondsStore } from "@/store/useTimerStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import YouTube, { YouTubeProps } from "react-youtube";
import { getLectures } from "../lib/getLectures";
import { saveSeconds } from "../lib/saveSeconds";
import { IProgressResult } from "@/model/progress";
import { getProgress } from "../lib/getProgress";
import Loading from "../loading";
import { updateCompleted } from "../lib/updateCompleted";
import { useSession } from "next-auth/react";

type Props = {
  courseId: number;
  lectureId: number;
};

export default function LectureVideo({ courseId, lectureId }: Props) {
  const { data: session } = useSession();
  const accessToken = session?.user.accessToken as string;

  const {
    isPending,
    error,
    data: lectures,
  } = useQuery<Lecture[]>({
    queryKey: ["lectures", courseId],
    queryFn: () => getLectures(courseId, accessToken),
    enabled: !!accessToken,
  });
  const { data: progress } = useQuery<IProgressResult>({
    queryKey: ["progress", courseId],
    queryFn: () => getProgress(courseId, accessToken),
    enabled: !!accessToken,
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
      setSeconds(progress?.lectureProgresses[lectureId - 1].progress);
    }
  }, [progress, lectureId, setSeconds]);

  // TODO: 얘는 탭 닫을 때 경고창 뜨는 건데 이때 PATCH 보내도록 하는 방식 고려 중

  // useEffect(() => {
  //   const handleBeforeUnload = (event) => {
  //     // 여기에 페이지를 떠나기 전에 실행하고 싶은 코드를 작성하세요.
  //     // 예: "정말 페이지를 떠나시겠습니까?"와 같은 확인 메시지를 보여줄 수 있습니다.

  //     // 기본 동작을 방지하고 사용자에게 확인 메시지를 보여주려면 event.preventDefault()를 호출하고
  //     // event.returnValue를 설정해야 합니다. (일부 브라우저에서는 필요)
  //     event.preventDefault();
  //   };

  //   // 이벤트 리스너 등록
  //   window.addEventListener("beforeunload", handleBeforeUnload);

  //   // 컴포넌트가 언마운트 될 때 이벤트 리스너를 제거합니다.
  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, []); // 빈 의존성 배열을 사용하여 컴포넌트 마운트 시에만

  // TODO:  탭 이동 혹은 가시성 변화 시 PATCH
  // useEffect(() => {
  //   const handleVisibilityChange = () => {
  //     if (document.visibilityState === "hidden") {
  //       // Perform PATCH with current `startMinutes`
  //       saveSeconds(seconds, 1, actualLecture?.lectureId as number);
  //     }
  //   };

  //   window.addEventListener("blur", handleVisibilityChange);
  //   document.addEventListener("visibilitychange", handleVisibilityChange);

  //   return () => {
  //     window.removeEventListener("blur", handleVisibilityChange);
  //     document.removeEventListener("visibilitychange", handleVisibilityChange);
  //   };
  // }, [seconds]);

  if (!lectures || !progress) {
    return <Loading />;
  }

  const actualLecture = lectures.find(
    (lecture) => lecture.lectureNumber === +lectureId
  );

  // 타이머 시작
  const startTimer = () => {
    // console.log("타이머 시작");

    if (!intervalRef.current && seconds < duration) {
      intervalRef.current = setInterval(() => {
        increaseSeconds();
        // console.log("increase");
        const currentSeconds = useSecondsStore.getState().seconds;
        if (currentSeconds >= duration - 1) {
          updateCompleted(actualLecture?.lectureId as number, accessToken);
          saveSeconds(
            currentSeconds,
            actualLecture?.lectureId as number,
            accessToken
          );
          // queryClient.invalidateQueries({ queryKey: ["progress", courseId] });
        }
        if (currentSeconds % 60 === 0 && !(seconds > duration)) {
          // console.log("1분 경과");
          saveSeconds(
            currentSeconds,
            actualLecture?.lectureId as number,
            accessToken
          );
        }
      }, 1 * 1000);
    }
  };

  // const startTimer = () => {
  //   stopTimer(); // Ensure any existing timer is cleared

  //   // Immediate logic to handle any remaining time less than a minute
  //   if (remainingTime < 60 * 1000) {
  //     intervalRef.current = setTimeout(() => {
  //       updateProgress(); // Define this function to handle progress update and DB save
  //       setRemainingTime(60 * 1000); // Reset remaining time
  //       startTimer(); // Restart timer for regular 1-minute intervals
  //     }, remainingTime);
  //   } else {
  //     // Standard interval for every minute
  //     intervalRef.current = setInterval(updateProgress, 60 * 1000);
  //   }
  // };

  // // Extracted logic to update progress
  // const updateProgress = () => {
  //   const actualLecture = data?.find(
  //     (lecture) => lecture.lectureNumber === +lectureId
  //   );
  //   if (!actualLecture) {
  //     console.error("Actual lecture not found");
  //     return;
  //   }
  //   useTimerStore.setState((state) => {
  //     const newMinutes = state.minutes + 1;
  //     state.setMinutes(newMinutes);
  //     saveMinutesToDB(newMinutes, 1, actualLecture.lectureId);
  //     return { ...state, minutes: newMinutes };
  //   });
  // };

  // 타이머 멈춤

  const stopTimer = () => {
    // console.log("stop", intervalRef);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Adjust stopTimer to cancel correctly and calculate remaining time
  // const stopTimer = () => {
  //   if (intervalRef.current) {
  //     clearTimeout(intervalRef.current); // Clear both timeout and interval with the same call
  //     intervalRef.current = null;

  //     // Calculate and set the remaining time until the next minute mark
  //     const currentTime = Date.now();
  //     const elapsedTime = currentTime % (60 * 1000); // Time elapsed in the current minute
  //     setRemainingTime(60 * 1000 - elapsedTime); // Time until the next minute
  //   }
  // };

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    event.target.unMute();
    event.target.pauseVideo();
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
      videoId={lectures[lectureId - 1]?.videoLink}
      opts={opts}
      onReady={onPlayerReady}
      onPlay={startTimer}
      onPause={stopTimer}
      onEnd={onPlayerEnd}
    />
  );
}
