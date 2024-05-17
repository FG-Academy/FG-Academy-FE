import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../lib/getAllUsers";
import { getOneUser } from "../lib/getOneUser";
import { IUser } from "@/model/user";
import getAdminSubmittedQuizList from "../lib/getAdminSubmittedQuizList";

interface Course {
  courseId: number;
  title: string;
}

interface Enrollment {
  id: number;
  completedNumber: number;
  course: Course;
}

interface UserProfileResponse extends IUser {
  enrollments: Enrollment[];
}

/** [관리자 화면 - 유저, 객관식 퀴즈] 전체 유저 가져오기 */
export const useFetchAllUserListQuery = (
  accessToken: string,
  options?: {
    enabled?: boolean;
  }
) => {
  return useQuery<IUser[]>({
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