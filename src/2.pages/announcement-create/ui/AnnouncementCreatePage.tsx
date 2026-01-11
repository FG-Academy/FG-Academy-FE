"use client";

import { AnnouncementSchema } from "@/5.entities/announcement";
import AnnouncementForm from "@/4.features/create-announcement/ui/AnnouncementForm";
import { useCreateAnnouncementMutation } from "@/4.features/create-announcement";

const AnnouncementCreatePage = () => {
  const { isPending, mutate } = useCreateAnnouncementMutation();

  const initialValues = {
    title: "",
    content: "",
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-10">
      <div className="text-2xl font-bold">공지사항 작성</div>
      <div className="w-1/2">
        <AnnouncementForm
          initialValues={initialValues}
          submitLabel="등록하기"
          onSubmit={(data) => mutate(data)}
          schema={AnnouncementSchema}
          isPending={isPending}
        />
      </div>
    </div>
  );
};

export { AnnouncementCreatePage };
