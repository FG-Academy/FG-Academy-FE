import { useQuery } from "@tanstack/react-query";
import { getAllCourses } from "../_lib/getAllCourses";
import { getOneCourse } from "../_lib/getOneCourse";

export interface MainCoursesResponse {
  courseId: number;
  thumbnailImagePath: string;
  title: string;
  level: string;
  description: string;
  curriculum: string;
  openDate: string;
  finishDate: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

/** [홈화면, 강의 목록 화면] 모든 코스 가져오기 (active) */
export const useFetchAllCourseListQuery = (options?: { enabled?: boolean }) => {
  return useQuery<MainCoursesResponse[]>({
    queryKey: ["courses"],
    queryFn: () => getAllCourses(),
  });
};

/** [강의 상세 화면] 강의 ID로 강의 조회 */
export const useFetchCourseByIdQuery = (
  accessToken: string,
  courseId: number,
  options?: { enabled?: boolean }
) => {
  return useQuery<MainCoursesResponse>({
    queryKey: ["courses", courseId],
    queryFn: () => getOneCourse(accessToken, courseId),
    enabled: !!accessToken,
  });
};
