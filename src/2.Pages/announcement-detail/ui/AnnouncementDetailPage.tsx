"use client";

import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon, PencilIcon } from "lucide-react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { announcementQueries } from "@/5.entities/announcement/api/announcement.queries";
import dayjs from "dayjs";
import { Typography } from "@/6.shared/ui";
import { DeleteAnnouncementCta } from "@/4.features/delete-announcement/ui/DeleteAnnouncementCta";

type Props = {
  announcementId: number;
};

const AnnouncementDetailPage = ({ announcementId }: Props) => {
  const router = useRouter();

  const { data: session } = useSession();

  const { data: announcement } = useSuspenseQuery(
    announcementQueries.detail(announcementId)
  );

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-10">
      <div className="flex flex-col w-full max-w-[800px] gap-6">
        <Typography name="h3">공지 사항</Typography>
        <div>
          <Button
            className="flex gap-2 items-center"
            variant="outline"
            onClick={() => router.push("/announcement")}
          >
            <ArrowLeftIcon size={18} />
            목록으로
          </Button>
        </div>
        <div className="flex flex-col w-full gap-2">
          <div className="flex flex-col gap-2 justify-between w-full p-2 px-6 bg-gray-100 border-gray-300 border-y">
            <Typography name="large">{announcement.title}</Typography>
            <div className="flex gap-3 items-center">
              <Typography name="muted">관리자</Typography>
              <Typography name="muted">|</Typography>
              <Typography name="muted">
                {dayjs(announcement.createdAt).format("YYYY-MM-DD")}
              </Typography>
            </div>
          </div>
        </div>
        <div
          className="flex items-start w-full p-4 pb-24 border-b border-gray-300"
          dangerouslySetInnerHTML={{
            __html: announcement.content.replace(/\n/g, "<br />"),
          }}
        ></div>
        {(session?.user.level === "admin" ||
          session?.user.level === "manager") && (
          <div className="flex flex-row justify-between w-full p-2">
            <Button
              variant="outline"
              onClick={() => {
                router.push(`/announcement/${announcementId}/edit`);
              }}
              className="flex justify-center items-center gap-2"
            >
              <PencilIcon size={18} />
              수정
            </Button>
            <DeleteAnnouncementCta announcementId={announcementId} />
          </div>
        )}
      </div>
    </div>
  );
};

export { AnnouncementDetailPage };
