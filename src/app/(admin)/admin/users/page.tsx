"use client";

import Loading from "@/app/(lecture)/course/[courseId]/lecture/[lectureId]/loading";
import { DataTable } from "./components/DataTable";
import { columns } from "./components/columns";
import { useSession } from "next-auth/react";
import { useFetchAllUserListQuery } from "../hooks/useUserQuery";

export default function Page() {
  const { data: session } = useSession();
  const accessToken = session?.user.accessToken as string;

  const { data: allUsers } = useFetchAllUserListQuery(accessToken);

  if (!allUsers) {
    return <Loading />;
  }

  return (
    <div className="w-full p-4 px-10">
      <div className="text-2xl mb-4">유저 관리</div>
      <div className="flex flex-col p-2 h-[646px]">
        <DataTable columns={columns} data={allUsers} />
      </div>
    </div>
  );
}
