import { User as BaseUser } from "@/5.entities/user";
import { QuizAnswer } from "@/5.entities/quiz";
import { Enrollment } from "@/5.entities/enrollment";

export interface UserFilter {
  name: string;
  level: string;
  position: string;
  department: string;
  church: string;
}

export interface AdminUser extends BaseUser {
  departmentLabel: string;
  positionLabel: string;
}

export interface UserListResult {
  currentPage: number;
  totalPages: number;
  totalElements: number;
  size: number;
  content: AdminUser[];
}

export interface UserListResponse {
  result: UserListResult;
}

interface Quiz {
  quizId: number;
  quizAnswers: QuizAnswer[];
  quizType: string;
  question: string;
  answer: number[] | string;
  submitCount: number;
  correctCount: number;
  answerType: string;
}

export interface UserLecture {
  lectureNumber: number;
  lectureId: number;
  lectureTitle: string;
  quizzes: Quiz[];
  quizTotalCount: number;
  correctQuizCount: number;
}

interface UserEnrollment {
  enrollmentId: number;
  courseId: number;
  courseTitle: string;
  totalLecturesCount: number;
  completedLecturesCount: number;
  totalQuizCount: number;
  userSubmittedQuizCount: number;
  userCorrectQuizCount: number;
  lectures: UserLecture[];
}

export interface UserProfileResponse extends BaseUser {
  enrollments: UserEnrollment[];
}

export interface UserEnrollmentResponse extends Enrollment {
  completedNumber: number;
  course: {
    courseId: number;
    title: string;
    totalLectureLength: number;
  };
}
