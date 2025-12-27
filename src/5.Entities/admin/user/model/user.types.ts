import { IUser } from "@/model/user";
import { IQuizAnswer } from "@/model/quiz";
import { IEnrollment } from "@/model/enrollment";

export interface UserFilter {
  name: string;
  level: string;
  position: string;
  department: string;
  church: string;
}

export interface User extends IUser {
  departmentLabel: string;
  positionLabel: string;
}

export interface UserListResult {
  currentPage: number;
  totalPages: number;
  totalElements: number;
  size: number;
  content: User[];
}

export interface UserListResponse {
  result: UserListResult;
}

interface Quiz {
  quizId: number;
  quizAnswers: IQuizAnswer[];
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

export interface UserProfileResponse extends IUser {
  enrollments: UserEnrollment[];
}

export interface UserEnrollmentResponse extends IEnrollment {
  course: {
    courseId: number;
    title: string;
    totalLectureLength: number;
  };
}
