import type {
  LectureProgressResult,
  MyCourseLecture,
} from "@/5.entities/enrollment";

type UserLevel = "admin" | "manager" | "tutor" | "user" | string | undefined;

export type LectureAccessDeniedReason =
  | "NEED_PREV_LECTURE"
  | "NEED_PREV_QUIZ"
  | "NOT_AUTHORIZED";

export type QuizAccessDeniedReason =
  | "NEED_LECTURE_COMPLETE"
  | "NEED_PREV_QUIZ"
  | "NOT_AUTHORIZED";

export type LectureAccessResult =
  | { allowed: true }
  | { allowed: false; reason: LectureAccessDeniedReason };

export type QuizAccessResult =
  | { allowed: true }
  | { allowed: false; reason: QuizAccessDeniedReason };

interface LectureAccessParams {
  lecture: MyCourseLecture;
  lectureIndex: number;
  categoryName: string;
  userLevel: UserLevel;
  progress: LectureProgressResult;
  lectures: MyCourseLecture[];
}

interface QuizAccessParams {
  lecture: MyCourseLecture;
  quizIndex: number;
  userLevel: UserLevel;
  progress: LectureProgressResult;
}

function isPrivilegedUser(userLevel: UserLevel): boolean {
  return ["admin", "manager", "tutor"].includes(userLevel || "");
}

export function getLectureAccess({
  lecture,
  lectureIndex,
  categoryName,
  userLevel,
  progress,
  lectures,
}: LectureAccessParams): LectureAccessResult {
  if (categoryName === "세미나") {
    return { allowed: true };
  }

  if (isPrivilegedUser(userLevel)) {
    return { allowed: true };
  }

  if (lecture.lectureNumber === 1 || lectureIndex === 0) {
    return { allowed: true };
  }

  if (lecture.lectureNumber < progress.completedCount + 1) {
    return { allowed: true };
  }

  if (lecture.lectureNumber === progress.completedCount + 1) {
    const previousLecture = lectures.find(
      (lec) => lec.lectureNumber === progress.completedCount
    );

    if (!previousLecture || previousLecture.quizzes.length === 0) {
      return { allowed: true };
    }

    const lastQuiz = previousLecture.quizzes.at(-1);
    if (lastQuiz?.submitted) {
      return { allowed: true };
    }

    return { allowed: false, reason: "NEED_PREV_QUIZ" };
  }

  return { allowed: false, reason: "NEED_PREV_LECTURE" };
}

export function canAccessLecture(params: LectureAccessParams): boolean {
  return getLectureAccess(params).allowed;
}

export function getQuizAccess({
  lecture,
  quizIndex,
  userLevel,
  progress,
}: QuizAccessParams): QuizAccessResult {
  if (isPrivilegedUser(userLevel)) {
    return { allowed: true };
  }

  const lectureProgress = progress.lectureProgresses.find(
    (lp) => lp.lectureId === lecture.lectureId
  );

  if (!lectureProgress?.completed) {
    return { allowed: false, reason: "NEED_LECTURE_COMPLETE" };
  }

  if (quizIndex > 0) {
    const previousQuiz = lecture.quizzes[quizIndex - 1];
    if (!previousQuiz?.submitted) {
      return { allowed: false, reason: "NEED_PREV_QUIZ" };
    }
  }

  return { allowed: true };
}

export function canAccessQuiz(params: QuizAccessParams): boolean {
  return getQuizAccess(params).allowed;
}

const QUIZ_ACCESS_DENIED_MESSAGES: Record<QuizAccessDeniedReason, string> = {
  NEED_LECTURE_COMPLETE: "먼저 강의를 수강완료해주세요",
  NEED_PREV_QUIZ: "이전 퀴즈를 먼저 풀어주세요",
  NOT_AUTHORIZED: "접근 권한이 없습니다",
};

export function getQuizAccessDeniedMessage(
  reason: QuizAccessDeniedReason
): string {
  return QUIZ_ACCESS_DENIED_MESSAGES[reason];
}

export function calcProgressPercent(
  completedCount: number,
  totalLectures: number
): number {
  if (totalLectures === 0) return 0;
  return Math.floor((completedCount / totalLectures) * 100);
}

export function isLectureCompleted(
  lectureId: number,
  progress: LectureProgressResult
): boolean {
  return (
    progress.lectureProgresses.find((lp) => lp.lectureId === lectureId)
      ?.completed ?? false
  );
}
