import { queryOptions } from "@tanstack/react-query";
import { getQuestions } from "./get-questions";
import { getQuestionDetail } from "./get-question-detail";

export const questionQueries = {
  all: () => ["qna"],
  lists: () => [...questionQueries.all(), "list"],
  list: (page: number) =>
    queryOptions({
      queryKey: [...questionQueries.lists(), page],
      queryFn: () => getQuestions(page),
    }),
  detail: (questionId: number) =>
    queryOptions({
      queryKey: [...questionQueries.all(), "detail", questionId],
      queryFn: () => getQuestionDetail(questionId),
    }),
};
