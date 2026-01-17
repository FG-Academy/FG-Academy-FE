import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "@/6.shared/ui";
import { editAnnouncement } from "./edit-announcement";
import { Announcement } from "@/5.entities/announcement";

const useEditAnnouncementMutation = (announcementId: number) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationKey: ["editAnnouncement"],
    mutationFn: (data: Partial<Announcement>) =>
      editAnnouncement(announcementId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["announcement"],
      });
      toast({
        title: "공지사항 수정 성공",
        description: "공지사항 수정을 성공했습니다.",
      });
      router.push(`/announcement/${announcementId}`);
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "네트워크 오류가 발생했습니다.",
        description: "잠시 후 다시 시도해주세요.",
      });

      console.error(
        "There was a problem with your fetch operation:",
        error.message
      );
    },
  });
};

export { useEditAnnouncementMutation };
