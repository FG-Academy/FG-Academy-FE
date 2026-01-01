"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "@/6.shared/ui/shadcn/ui/use-toast";
import { updateCourse, UpdateCourseDto } from "./update-course";

export function useUpdateCourseMutation(courseId: number) {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationKey: ["admin", "courses", "update", courseId],
    mutationFn: (data: UpdateCourseDto) => updateCourse(courseId, data),
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
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "강의 수정 실패",
        description: error.message || "다시 시도해주세요.",
      });
    },
  });
}
