"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { updateCourse } from "./update-course";

export function useUpdateCourseMutation(courseId: number) {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationKey: ["admin", "courses", "update", courseId],
    mutationFn: (formData: FormData) => updateCourse(courseId, formData),
    onSuccess: () => {
      toast({
        title: "강의 수정 성공",
        description: "강의 수정에 성공하였습니다.",
      });
      queryClient.invalidateQueries({ queryKey: ["admin", "courses"] });
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      queryClient.invalidateQueries({ queryKey: ["lectures"] });
      queryClient.invalidateQueries({ queryKey: ["enrollment"] });
      router.push("/admin/courses");
    },
    onError: (error: Error & { status?: number }) => {
      if (error.status === 413) {
        toast({
          variant: "destructive",
          title: "파일 용량이 너무 큽니다.",
          description: "파일 용량을 줄여주세요.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "강의 수정 실패",
          description: error.message || "다시 시도해주세요.",
        });
      }
    },
  });
}
