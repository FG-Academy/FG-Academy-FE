"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "@/6.shared/ui";
import { updateLectureCompleted } from "./update-lecture-completed";

interface UseCompleteLectureMutationProps {
  lectureId: number;
  courseId: number;
  onSuccess?: () => void;
}

/** 강의 완료 처리 mutation hook */
export function useCompleteLectureMutation({
  lectureId,
  courseId,
  onSuccess,
}: UseCompleteLectureMutationProps) {
  return useMutation({
    mutationKey: ["completeLecture", lectureId, courseId],
    retry: 3,
    mutationFn: () => updateLectureCompleted(lectureId, courseId),
    onSuccess: () => {
      onSuccess?.();
    },
    onError: (error: { status?: number; message?: string }) => {
      toast({
        variant: "destructive",
        title: "강의 완료 처리 실패",
        description: error.message || "잠시 후 다시 시도해주세요.",
      });
      console.error("Complete lecture error:", error.message);
    },
  });
}
