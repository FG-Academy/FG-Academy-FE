import { useQuery } from "@tanstack/react-query";
import { getDashboard } from "./lib/getDashboard";

interface DashBoardResponse {
  message: string;
  courseDetail: CourseDetail[];
}

interface CourseDetail {
  courseId: number;
  title: string;
  curriculum: string;
  thumbnailPath: string | null;
  totalCourseLength: number;
  completedLectures: number;
  lastStudyLectureId: number;
}

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
