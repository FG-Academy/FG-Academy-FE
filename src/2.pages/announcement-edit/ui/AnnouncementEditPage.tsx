"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { announcementQueries } from "@/5.entities/announcement/api/announcement.queries";
import { AnnouncementSchema } from "@/5.entities/announcement";
import { AnnouncementForm } from "@/4.features/create-announcement";
import { useEditAnnouncementMutation } from "@/4.features/edit-announcement";

interface Props {
  announcementId: number;
}

const AnnouncementEditPage = ({ announcementId }: Props) => {
  const { data: announcement } = useSuspenseQuery(
    announcementQueries.detail(announcementId)
  );

  const { mutate, isPending } = useEditAnnouncementMutation(announcementId);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-3 md:p-10">
      <div className="text-2xl font-bold">공지사항 수정</div>
      <div className="w-full md:w-1/2">
        <AnnouncementForm
          initialValues={{
            title: announcement?.title ?? "",
            content: announcement?.content ?? "",
          }}
          submitLabel="수정하기"
          className="p-10"
          onSubmit={(data) => mutate(data)}
          schema={AnnouncementSchema}
          requireDirty
          isPending={isPending}
        />
      </div>
    </div>
  );
};

export { AnnouncementEditPage };
