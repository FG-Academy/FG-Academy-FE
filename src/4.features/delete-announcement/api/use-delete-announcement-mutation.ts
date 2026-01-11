import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { deleteAnnouncement } from "./delete-announcement";
import { toast } from "@/6.shared/ui";

const useDeleteAnnouncementMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationKey: ["deleteAnnouncement"],
    mutationFn: (announcementIds: number[]) =>
      deleteAnnouncement(announcementIds),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["announcement"],
      });
      toast({
        title: "공지사항 삭제 성공",
        description: "공지사항 삭제에 성공했습니다.",
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

export { useDeleteAnnouncementMutation };
