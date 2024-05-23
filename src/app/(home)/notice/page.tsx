"use client";

import { useSession } from "next-auth/react";
import { useFetchQnaPostsQuery } from "./hooks/useQnaPostsQuery";
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

  const { data: posts } = useFetchQnaPostsQuery(accessToken, currentPage);

  if (!posts) {
    return <Loading />;
  }

  const totalPages = posts.totalPages || 1;

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen p-10 space-y-4">
      <h1 className="text-xl font-bold">공지사항</h1>
      <div className="w-full p-8">
        <DataTable columns={columns} data={posts.posts || []} />
      </div>
      {(session?.user.level === "admin" ||
        session?.user.level === "manager") && (
        <Link
          className="p-4 text-white bg-blue-500 border hover:bg-blue-700"
          href="/notice/register"
        >
          글쓰기
        </Link>
      )}
      <PaginationMenu totalPages={totalPages} />
    </div>
  );
}
