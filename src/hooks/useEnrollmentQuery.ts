import { useQuery } from "@tanstack/react-query";
import { getEnrollment } from "./lib/getEnrollment";

export interface enrollmentResponse {
  isTaking: boolean | null;
  message: string;
  totalCount: number;
  completedLectures: number;
  lastStudyLecture: number;
}

export const useFetchEnrollmentQuery = (
  accessToken: string,
  courseId: number,
  options?: { enabled?: boolean }
) => {
  return useQuery<enrollmentResponse>({
    queryKey: ["enrollment", courseId],
    queryFn: () => getEnrollment(accessToken, courseId),
    enabled: !!accessToken,
  });
};
