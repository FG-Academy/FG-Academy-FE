import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../lib/getAllUsers";
import { getOneUser } from "../lib/getOneUser";
import { IUser } from "@/model/user";
import getAdminSubmittedQuizList from "../lib/getAdminSubmittedQuizList";
import { IQuizAnswer } from "@/model/quiz";

interface Quiz {
  quizId: number;
  quizAnswers: IQuizAnswer[];
  quizType: string;
  question: string;
  answer: number[];
  submitCount: number;
  correctCount: number;
  answerType: string;
}
interface Lecture {
  lectureNumber: number;
  lectureId: number;
  lectureTitle: string;
  quizzes: Quiz[];
  quizTotalCount: number;
  correctQuizCount: number;
}
interface Enrollment {
  enrollmentId: number;
  courseId: number;
  courseTitle: string;
  totalLecturesCount: number;
  completedLecturesCount: number;
  totalQuizCount: number;
  userSubmittedQuizCount: number;
  userCorrectQuizCount: number;
  lectures: Lecture[];
}

interface UserProfileResponse extends IUser {
  enrollments: Enrollment[];
}

export interface User extends IUser {
  departmentLabel: string;
  positionLabel: string;
}
/** [관리자 화면 - 유저, 객관식 퀴즈] 전체 유저 가져오기 */
export const useFetchAllUserListQuery = (
  accessToken: string,
  options?: {
    enabled?: boolean;
  }
) => {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => getAllUsers(accessToken),
    enabled: !!accessToken,
  });
};

/** [관리자 화면 - 유저] 한 유저 프로필 가져오기*/
export const useFetchUserProfileByIdQuery = (
  accessToken: string,
  userId: number,
  options?: {
    enabled?: boolean;
  }
) => {
  return useQuery<UserProfileResponse>({
    queryKey: ["users", userId],
    queryFn: () => getOneUser(accessToken, userId),
    enabled: !!accessToken,
  });
};

interface AnswerItem {
  itemIndex: number;
  item: string;
}
interface MainQuiz {
  quizId: number;
  question: string;
  submittedAnswer: number[];
  submittedAnswersContents: string[];
  isAnswer: boolean;
  lectureTitle: string;
  courseTitle: string;
  correctAnswers: AnswerItem[];
  feedback?: string;
}
export const useFetchAdminQuizListQuery = (
  accessToken: string,
  userId: number,
  options?: { enabled?: boolean }
) => {
  return useQuery<MainQuiz[]>({
    queryKey: ["quizzes", accessToken],
    queryFn: () => getAdminSubmittedQuizList(accessToken, userId),
    enabled: !!accessToken,
  });
};
