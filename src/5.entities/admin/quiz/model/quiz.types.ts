import { Course } from "@/5.entities/course";
import { Lecture, LectureTimeRecord } from "@/5.entities/lecture";
import { Quiz, QuizAnswer, QuizSubmit } from "@/5.entities/quiz";
import { User } from "@/5.entities/user";

// ============ Quiz Submission Types (for grading) ============

/** Quiz with lecture info */
export interface AdminQuizWithLecture extends Quiz {
  quizAnswers: QuizAnswer[];
  lecture: AdminLectureWithCourse;
}

/** Lecture with course info */
export interface AdminLectureWithCourse extends Lecture {
  course: Course;
}

/** Quiz filter for admin submission list */
export interface AdminQuizFilter {
  name: string;
  position: string;
  departmentName: string;
  courseTitle: string;
  quizType: string;
  answerStatus: string;
}

/** Quiz submission response item */
export interface AdminQuizSubmission {
  id: number;
  name: string;
  userId: number;
  quizId: number;
  quizType: string;
  position: string;
  departmentName: string;
  departmentLabel: string;
  positionLabel: string;
  lectureTitle: string;
  courseTitle: string;
  answerType: string;
  status: number;
  user: User;
  quiz: AdminQuizWithLecture;
}

/** Paginated response for quiz submissions */
export interface AdminQuizSubmissionListResult {
  currentPage: number;
  totalPages: number;
  totalElements: number;
  size: number;
  content: AdminQuizSubmission[];
}

export interface AdminQuizSubmissionListResponse {
  result: AdminQuizSubmissionListResult;
}

// ============ Descriptive Quiz Detail Types ============

/** Descriptive quiz detail response */
export interface AdminDescriptiveQuizDetail {
  id: number;
  userId: number;
  multipleAnswer: number;
  answer: string;
  submittedAnswer: string | null;
  feedbackComment: string | null;
  status: number;
  createdAt: string;
  updatedAt: string;
  user: User;
  quiz: AdminQuizWithLecture;
}

// ============ Lecture Quiz Types (for registration) ============

/** Quiz with answers and submissions for a lecture */
export interface AdminLectureQuiz extends Quiz {
  quizAnswers: QuizAnswer[];
  quizSubmits: QuizSubmit[];
}

/** Quiz in lecture with full quiz info */
interface AdminQuizInLecture extends Quiz {
  quizAnswers: QuizAnswer[];
  quizSubmits: QuizSubmit[];
}

/** Lecture with quizzes for user courses */
interface AdminLectureWithQuizzes extends Lecture {
  quizzes: AdminQuizInLecture[];
  LectureTimeRecords: LectureTimeRecord[];
}

/** Course with lectures for quiz management */
export interface AdminCourseWithLectures extends Course {
  lectures: AdminLectureWithQuizzes[];
}

// ============ Quiz Feedback Types ============

/** Request body for quiz feedback */
export interface AdminQuizFeedbackRequest {
  feedbackComment: string;
  corrected: boolean;
}

// ============ Quiz Registration/Edit Types ============

/** Quiz choice item for registration */
export interface QuizChoiceItem {
  item: string;
  isAnswer: boolean;
}

/** Request body for quiz creation/update */
export interface AdminQuizFormRequest {
  question: string;
  quizType: "multiple" | "descriptive";
  quizInfo: QuizChoiceItem[];
}

// ============ Lecture for Quiz Registration ============

/** Lecture with quiz counts for quiz registration table */
export interface AdminLectureForQuiz extends Lecture {
  multipleChoiceCount: number;
  descriptiveCount: number;
}

// ============ Constants ============

export const QUIZ_ANSWER_STATUS = {
  ALL: "",
  UNGRADED: "0",
  CORRECT: "1",
  INCORRECT: "2",
} as const;

export const QUIZ_TYPE_OPTIONS = [
  { label: "전체", value: "" },
  { label: "객관식", value: "multiple" },
  { label: "주관식", value: "descriptive" },
] as const;

export const ANSWER_STATUS_OPTIONS = [
  { label: "전체", value: "" },
  { label: "미채점", value: "0" },
  { label: "정답", value: "1" },
  { label: "오답", value: "2" },
] as const;
