"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "@/6.shared/ui/shadcn/ui/use-toast";
import { createCourse, CreateCourseDto } from "./create-course";

export function useCreateCourseMutation() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationKey: ["admin", "courses", "create"],
    mutationFn: (data: CreateCourseDto) => createCourse(data),
    onSuccess: async () => {
      toast({
        title: "코스 등록 성공",
        description: "코스 등록에 성공하였습니다.",
      });
      await queryClient.invalidateQueries({ queryKey: ["admin", "courses"] });
      router.push("/admin/courses");
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "코스 등록 실패",
        description: error.message || "다시 시도해주세요.",
      });
    },
  });
}
