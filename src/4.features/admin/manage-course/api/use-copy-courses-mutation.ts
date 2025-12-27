"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { copyCourses } from "./copy-courses";

export function useCopyCoursesMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["admin", "courses", "copy"],
    mutationFn: (courseIds: number[]) => copyCourses(courseIds),
    onSuccess: () => {
      toast({
        title: "강의 복사 성공",
        description: "강의 복사에 성공하였습니다.",
      });
      queryClient.invalidateQueries({ queryKey: ["admin", "courses"] });
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      queryClient.invalidateQueries({ queryKey: ["lectures"] });
      queryClient.invalidateQueries({ queryKey: ["enrollment"] });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "강의 복사 실패",
        description: error.message || "잠시 후 다시 시도해주세요.",
      });
    },
  });
}
