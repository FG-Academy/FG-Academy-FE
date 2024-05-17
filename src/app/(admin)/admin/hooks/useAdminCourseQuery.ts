import { useQuery } from "@tanstack/react-query";
import { getAllAdminCourses } from "../lib/getAllAdminCourses";
import { getOneAdminCourses } from "../lib/getOneAdminCourses";
import { ICourse } from "@/model/course";
import { ILecture } from "@/model/lecture";
import { IEnrollment } from "@/model/enrollment";

export interface AdminCoursesResponse extends ICourse {
  enrollments: IEnrollment[];
  enrollmentCount: number;
}

export interface AdminCourseReponse extends ICourse {
  lectures: ILecture[];
}

/** [관리자 화면 - 강의] 모든 강의 가져오기*/
export const useFetchAllAdminCourseListQuery = (
  accessToken: string,
  options?: { enabled?: boolean }
) => {
  return useQuery<AdminCoursesResponse[]>({
    queryKey: ["courses", "admin"],
    queryFn: () => getAllAdminCourses(accessToken),
    enabled: !!accessToken,
  });
};

export const useFetchOneAdminCourseListQuery = (
  accessToken: string,
  courseId: number,
  options?: { enabled?: boolean }
) => {
  return useQuery<AdminCourseReponse>({
    queryKey: ["course", "admin", courseId],
    queryFn: () => getOneAdminCourses(accessToken, courseId),
    enabled: !!accessToken,
  });
};
