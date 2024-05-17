import { ILectureTimeRecord } from "./../../../../../model/lecture";
import { useQuery } from "@tanstack/react-query";
import getLectureQuizList from "../lib/getLectureQuizList";
import { IQuiz, IQuizAnswer, IQuizSubmit } from "@/model/quiz";
import { getMyDescriptiveQuiz } from "../lib/getMyDescriptiveQuiz";
import { IUser } from "@/model/user";
import { ILecture } from "@/model/lecture";
import { ICourse } from "@/model/course";
import { getMyCoursesQuiz } from "../lib/getMyCoursesQuiz";

export interface LectureQuizResponse extends IQuiz {
  quizAnswers: IQuizAnswer[];
  quizSubmits: IQuizSubmit[];
}
export const useFetchAdminLectureQuizList = (
  accessToken: string,
  lectureId: number,
  options?: { enabled?: boolean }
) => {
  return useQuery<LectureQuizResponse[]>({
    queryKey: ["adminQuizzes", lectureId],
    queryFn: () => getLectureQuizList(accessToken, lectureId),
    enabled: !!accessToken,
  });
};

interface Quiz extends IQuiz {
  lecture: Lecture;
}
interface Lecture extends ILecture {
  course: ICourse;
}
interface DescriptiveQuizResponse {
  id: number;
  userId: number;
  multipleAnswer: number;
  answer: string;
  submittedAnswer: string | null;
  feedbackComment: string | null;
  status: number;
  createdAt: string;
  updatedAt: string;
  user: IUser;
  quiz: Quiz;
}
export const useMyDescriptiveQuizQuery = (
  accessToken: string,
  userId: number,
  quizId: number,
  options?: { enabled?: boolean }
) => {
  return useQuery<DescriptiveQuizResponse>({
    queryKey: ["quizzes", quizId, userId],
    queryFn: () => getMyDescriptiveQuiz(accessToken, userId, quizId),
    enabled: !!accessToken,
  });
};

interface TQuiz extends IQuiz {
  quizAnswers: IQuizAnswer[];
  quizSubmits: IQuizSubmit[];
}
interface Lecture extends ILecture {
  quizzes: TQuiz[];
  LectureTimeRecords: ILectureTimeRecord[];
}
interface MyCourseResponse extends ICourse {
  lectures: Lecture[];
}
export const useMyCoursesQuizQuery = (
  accessToken: string,
  userId: number,
  options?: { enabled?: boolean }
) => {
  return useQuery<MyCourseResponse[]>({
    queryKey: ["myCourses", userId],
    queryFn: () => getMyCoursesQuiz(accessToken, userId),
    enabled: !!accessToken,
  });
};
