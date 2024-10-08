import { z } from "zod";
import { QueryCache, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { CategoryFormSchema } from "../lib/CategoryFormSchema";
import { useFetchAllCourseListQuery } from "@/app/(home)/_hooks/useCourseQuery";

export function useCategoryMutation(accessToken: string) {
  const queryClient = useQueryClient();
  const { refetch } = useFetchAllCourseListQuery();
  const queryCache = new QueryCache();

  return useMutation({
    mutationKey: ["updateOrAddCategories"],
    mutationFn: async (
      categories: z.infer<typeof CategoryFormSchema>["categories"]
    ) => {
      // 기존 카테고리 업데이트

      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/categories`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ categories }),
      });

      return;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
      queryCache.clear();
      queryClient.invalidateQueries({
        queryKey: ["courses"],
        refetchType: "inactive",
      });
      // refetch();
      toast({
        title: "카테고리 저장 성공",
        description: "카테고리가 성공적으로 저장되었습니다.",
      });
      // router.push("/admin/categories");
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "저장 실패",
        description: "잠시 후 다시 시도해주세요.",
      });
      console.error(
        "There was a problem with your fetch operation:",
        error.message
      );
    },
  });
}
