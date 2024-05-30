"use client";

import { useSession } from "next-auth/react";
import { useFetchOnePostQuery } from "../hooks/usePostsQuery";
import Loading from "@/app/(lecture)/course/[courseId]/lecture/[lectureId]/loading";
import { dateFormat } from "@/lib/dateFormat";
import { Button } from "@/components/ui/button";
import { usePostDeleteMutation } from "../hooks/usePostDeleteMutation";
import { toast } from "@/components/ui/use-toast";

type Props = {
  params: { announcementId: string };
};

export default function Page({ params }: Props) {
  const { data: session } = useSession();
  const accessToken = session?.user.accessToken;

  const announcementId = parseInt(params.announcementId);

  const { data: post, isError } = useFetchOnePostQuery(
    accessToken,
    announcementId
  );
  const { mutate } = usePostDeleteMutation(accessToken);

  const handleButton = async () => {
    if (confirm("정말로 삭제하시겠습니까?")) {
      try {
        mutate([announcementId]);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "요청이 불안정합니다..",
          description: "잠시 후 다시 시도해주세요.",
        });
        console.error("Failed to delete courses:", error);
      }
    } else {
      // User clicked 'Cancel'
      console.log("Deletion cancelled.");
    }
  };

  if (isError) {
    return <div>error</div>;
  }

  if (!post) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-10">
      <div className="flex flex-row justify-between w-full p-2 px-6 bg-gray-100 border-gray-300 border-y-2">
        <div className="text-xl font-bold">{post.title}</div>
        <div>{dateFormat(new Date(post.createdAt))}</div>
      </div>
      <div className="w-full p-2 px-4 border-b-2 border-gray-300">관리자</div>
      <div className="w-full p-8 border-b-2 border-gray-300">
        <div
          dangerouslySetInnerHTML={{
            __html: post.content.replace(/\n/g, "<br />"),
          }}
        />
      </div>
      <div className="flex flex-row justify-between w-full p-2">
        {/* <Button className="hidden">수정</Button> */}
        {session?.user.level === "admin" && (
          <Button onClick={handleButton} className="bg-red-500">
            삭제
          </Button>
        )}
      </div>
    </div>
  );
}
