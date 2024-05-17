import { useQuery } from "@tanstack/react-query";
import { getEnrollment } from "../lib/getEnrollment";

export interface EnrollmentResponse {
  isTaking: boolean | null;
  message: string;
  totalCount: number;
  completedLectures: number;
  lastStudyLecture: number;
}

/** [강의 상세 화면] 수강 신청 정보 가져오기*/
export const useFetchEnrollmentQuery = (
  accessToken: string,
  courseId: number,
  options?: { enabled?: boolean }
) => {
  return useQuery<EnrollmentResponse>({
    queryKey: ["enrollment", courseId],
    queryFn: () => getEnrollment(accessToken, courseId),
    enabled: !!accessToken,
  });
};
