import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "@/6.shared/ui";
import { Announcement } from "@/5.entities/announcement";
import { createAnnouncement } from "./create-announcement";

const useCreateAnnouncementMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationKey: ["createAnnouncement"],
    mutationFn: (data: Partial<Announcement>) => createAnnouncement(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["announcement"],
      });
      toast({
        title: "공지사항 등록 성공",
        description: "공지사항 등록을 성공했습니다.",
      });
      router.push("/announcement?page=1");
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

export { useCreateAnnouncementMutation };
