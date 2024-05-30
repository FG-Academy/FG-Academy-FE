import { useQuery } from "@tanstack/react-query";
import { getQuestionList } from "../lib/getQuestionList";
import { IUser } from "@/model/user";
import { IQuestion } from "@/model/question";
import { getOneQuestion } from "../lib/getOneQuestion";

interface QnAListsResponse {
  message: string;
  list: QuestionList[];
  totalPages: number;
}

export interface QuestionList {
  questionId: number;
  title: string;
  content: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

/** [질문과 게시판 화면] 게시판 전체 조회 */
export const useQnaPostsQuery = (
  accessToken: string,
  page: number,
  options?: { enabled?: boolean }
) => {
  return useQuery<QnAListsResponse>({
    queryKey: ["qna", "list", page],
    queryFn: () => getQuestionList(accessToken, page),
    enabled: !!accessToken,
  });
};

export const useFetchOneQnAQuery = (
  accessToken: string,
  questionId: number,
  options?: { enabled?: boolean }
) => {
  return useQuery<IQuestion>({
    queryKey: ["qna", questionId],
    queryFn: () => getOneQuestion(accessToken, questionId),
    enabled: !!accessToken,
  });
};
