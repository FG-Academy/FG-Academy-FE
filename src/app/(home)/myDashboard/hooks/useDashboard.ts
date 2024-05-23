import { useQuery } from "@tanstack/react-query";
import { getDashboard } from "../lib/getDashboard";

interface DashBoardResponse {
  message: string;
  courseDetail: CourseDetail[];
}

export interface CourseDetail {
  courseId: number;
  status: string;
  title: string;
  curriculum: string;
  thumbnailPath: string | null;
  totalCourseLength: number;
  completedLectures: number;
  lastStudyLectureId: number;
}

/** [내 강의실 화면] 수강 신청한 강의 가져오기 */
export const useFetchDashboardQuery = (
  accessToken: string,
  options?: { enabled?: boolean }
) => {
  return useQuery<DashBoardResponse>({
    queryKey: ["dashboard", accessToken],
    queryFn: () => getDashboard(accessToken),
    enabled: !!accessToken,
  });
};
