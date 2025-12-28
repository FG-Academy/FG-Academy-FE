import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/6.shared/ui";
import { updateUser } from "./update-user";
import useOpenDialogStore from "@/store/useOpenDialogStore";

interface UpdateUserData {
  name?: string;
  email?: string;
  phoneNumber?: string;
  churchName?: string;
  departmentName?: string;
  position?: string;
  yearsOfService?: number;
  level?: string;
  birthDate?: string;
}

interface UpdateUserParams {
  userId: number;
  data: UpdateUserData;
}

export function useUpdateUserMutation() {
  const queryClient = useQueryClient();
  const { setOpen } = useOpenDialogStore((state) => state);

  return useMutation({
    mutationKey: ["admin", "updateUser"],
    mutationFn: ({ userId, data }: UpdateUserParams) => updateUser(userId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin", "users"],
      });
      setOpen(false);
      toast({
        title: "회원정보 변경 성공",
        description: "회원정보 변경에 성공했습니다.",
      });
    },
    onError: (error: { status?: number; message?: string }) => {
      if (error.status === 409) {
        toast({
          variant: "destructive",
          title: "이미 존재하는 이메일입니다.",
          description: "다른 이메일 주소를 사용해주세요.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "네트워크 오류가 발생했습니다.",
          description: "잠시 후 다시 시도해주세요.",
        });
      }
      console.error("User update failed:", error.message);
    },
  });
}
