import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/6.shared/ui";
import { updateCategories } from "./update-categories";
import type { ICategory } from "@/5.entities/admin/category";

export function useUpdateCategoriesMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["admin", "updateCategories"],
    mutationFn: (categories: ICategory[]) => updateCategories(categories),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin", "categories"],
      });
      queryClient.invalidateQueries({
        queryKey: ["courses"],
        refetchType: "inactive",
      });
      toast({
        title: "카테고리 저장 성공",
        description: "카테고리가 성공적으로 저장되었습니다.",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "저장 실패",
        description: "잠시 후 다시 시도해주세요.",
      });
      console.error("Category update failed:", error.message);
    },
  });
}
