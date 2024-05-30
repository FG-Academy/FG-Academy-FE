"use client";

import { useSession } from "next-auth/react";
import { useQnaPostsQuery } from "./hooks/useQnaPostsQuery";
import Loading from "@/app/(lecture)/course/[courseId]/lecture/[lectureId]/loading";
import Link from "next/link";
import { DataTable } from "./components/DataTable";
import { columns } from "./components/columns";
import PaginationMenu from "./components/Pagination";

export default function Page({
  searchParams,
}: {
  searchParams?: {
    page?: string;
  };
}) {
  const { data: session } = useSession();
  const accessToken = session?.user.accessToken;

  const currentPage = Number(searchParams?.page) || 1;

  const { data: posts } = useQnaPostsQuery(accessToken, currentPage);

  if (!posts) {
    return <Loading />;
  }

  const totalPages = posts.totalPages || 1;

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen p-2 md:p-10 space-y-4">
      <h1 className="text-xl font-bold">질문 게시판</h1>
      <div className="w-full p-8">
        <DataTable columns={columns} data={posts.list || []} />
      </div>
      <Link
        className="p-4 text-white bg-blue-500 border hover:bg-blue-700"
        href="/qna/register"
      >
        글쓰기
      </Link>
      <PaginationMenu totalPages={totalPages} />
    </div>
  );
}
