export interface Quiz {
  quizId: number;
  quizType: string;
  quizIndex: number;
  question: string;
  status: "active" | "inactive";
  createdAt: Date;
  updatedAt: Date;
  lectureId: number;
}

export interface QuizAnswer {
  id: number;
  itemIndex: number;
  quizId: number;
  isAnswer: 1 | 0;
  status: "active" | "inactive";
  createdAt: Date;
  updatedAt: Date;
  item: string;
}

export interface QuizSubmit {
  id: number;
  userId: number;
  multipleAnswer: 1 | 0;
  submittedAnswer: null;
  feedbackComment: string | null;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
  quizId: number;
  answer: string;
}

/** 퀴즈 상세 정보 (답변, 제출 정보 포함) */
export interface QuizWithDetails extends Quiz {
  quizAnswers: QuizAnswer[];
  quizSubmits: QuizSubmit[];
}

export const STATUS = {
  미채점: 0,
  정답: 1,
  오답: 2,
} as const;

export const QUIZ_TYPE = {
  객관식: "multiple",
  주관식: "descriptive",
} as const;

export const FILTER_TYPE = {
  전체: "all",
  정답: "correct",
  오답: "incorrect",
  피드백: "feedback",
} as const;

// 타입 추출
export type Status = (typeof STATUS)[keyof typeof STATUS];
export type QuizType = (typeof QUIZ_TYPE)[keyof typeof QUIZ_TYPE];
export type FilterType = (typeof FILTER_TYPE)[keyof typeof FILTER_TYPE];

// 강의 정보 타입
export interface Lecture {
  lectureId: number;
  lectureTitle: string;
  quizzes: LectureQuiz[];
}

// 강의별 퀴즈 타입 (Quiz 타입 확장)
export interface LectureQuiz
  extends Pick<Quiz, "quizId" | "quizType" | "quizIndex" | "question"> {
  quizSubmits: Pick<
    QuizSubmit,
    | "multipleAnswer"
    | "answer"
    | "feedbackComment"
    | "status"
    | "createdAt"
    | "updatedAt"
  >[];
  quizAnswers: Pick<QuizAnswer, "id" | "itemIndex" | "isAnswer" | "item">[];
}

// 코스 정보를 포함한 최상위 응답 타입
export interface MyQuizResponse {
  courseId: number;
  courseTitle: string;
  lectures: Lecture[];
}

export interface LectureForQuiz {
  courseId: number;
  lectureId: number;
  lectureTitle: string;
  submittedQuizCount: number;
  correctQuizCount: number;
  correctRatio: number;
}

export interface CourseForQuiz {
  courseId: number;
  courseTitle: string;
  lectureCount: number;
  completedNumber: number;
  averageCorrectRatio: number;
  lectures: LectureForQuiz[];
}
