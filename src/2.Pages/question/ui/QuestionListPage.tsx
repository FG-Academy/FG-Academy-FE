"use client";

import Link from "next/link";
import { useSuspenseQuery } from "@tanstack/react-query";
import { questionQueries } from "@/5.entities/question";
import { QuestionDataTable } from "./QuestionDataTable";
import { questionColumns } from "./columns";
import { QuestionPagination } from "./QuestionPagination";

type Props = {
  page: number;
};

/**
 * 질문 게시판 목록 페이지 컨텐츠 (클라이언트 컴포넌트)
 * SSR에서 HydrationBoundary로 감싸서 사용
 * 인증은 미들웨어에서 처리됨
 */
export function QuestionListPageContent({ page }: Props) {
  const { data: posts } = useSuspenseQuery(questionQueries.list(page));

  const totalPages = posts.totalPages || 1;

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen p-2 md:p-10 space-y-4">
      <h1 className="text-xl font-bold">질문 게시판</h1>
      <div className="w-full p-8">
        <QuestionDataTable columns={questionColumns} data={posts.list || []} />
      </div>
      <Link
        className="p-4 text-white bg-blue-500 border hover:bg-blue-700"
        href="/qna/create"
      >
        글쓰기
      </Link>
      <QuestionPagination totalPages={totalPages} />
    </div>
  );
}
