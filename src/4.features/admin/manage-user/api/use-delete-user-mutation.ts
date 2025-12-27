import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/6.shared/ui";
import { deleteUser } from "./delete-user";
import useOpenDialogStore from "@/store/useOpenDialogStore";

export function useDeleteUserMutation() {
  const queryClient = useQueryClient();
  const { setOpen } = useOpenDialogStore((state) => state);

  return useMutation({
    mutationKey: ["admin", "deleteUser"],
    mutationFn: (userId: number) => deleteUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin", "users"],
      });
      setOpen(false);
      toast({
        title: "유저 삭제 성공",
        description: "유저가 삭제되었습니다.",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "네트워크 오류가 발생했습니다.",
        description: error.message,
      });
    },
  });
}
