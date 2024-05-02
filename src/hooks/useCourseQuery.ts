import { useQuery } from "@tanstack/react-query";
import { getAllAdminCourses } from "./lib/getAllAdminCourses";
import { getAllCourses } from "./lib/getAllCourses";
import { getOneAdminCourses } from "./lib/getOneAdminCourses";
import { getOneCourse } from "./lib/getOneCourse";
import { AdminCourse } from "@/model/course";

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

// 홈 화면 코스 리스트
export const useFetchAllCourseListQuery = (options?: { enabled?: boolean }) => {
  return useQuery<MainCoursesResponse[]>({
    queryKey: ["courses"],
    queryFn: () => getAllCourses(),
  });
};

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

export const useFetchAllAdminCourseListQuery = (
  accessToken: string,
  options?: { enabled?: boolean }
) => {
  return useQuery<MainCoursesResponse[]>({
    queryKey: ["courses"],
    queryFn: () => getAllAdminCourses(accessToken),
    enabled: !!accessToken,
  });
};

export const useFetchOneAdminCourseListQuery = (
  accessToken: string,
  courseId: number,
  options?: { enabled?: boolean }
) => {
  return useQuery<AdminCourse>({
    queryKey: ["course", "admin", courseId],
    queryFn: () => getOneAdminCourses(accessToken, courseId),
    enabled: !!accessToken,
  });
};

// export const useFetchUserProfileQuery = (
//   accessToken: string,
//   options?: {
//     enabled?: boolean;
//   }
// ) => {
//   // const session = await auth();
//   // const accessToken = session?.accessToken as string;

//   return useQuery<UserProfile>({
//     queryKey: ["userProfile"],
//     queryFn: () => getUserProfile(accessToken),
//     enabled: !!accessToken,
//   });
// };
