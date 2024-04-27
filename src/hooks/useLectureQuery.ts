import { useQuery } from "@tanstack/react-query";
import { getAllLectures } from "./lib/getAllLectures";
import { Quiz } from "@/model/quiz";
import { LectureTimeRecord } from "@/model/lecture";

interface AllLecturesResponse {
  lectureId: number;
  courseId: number;
  lectureNumber: number;
  title: string;
  videoLink: string;
  attachmentFile: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  quizzes: Quiz[];
  lectureTimeRecords: LectureTimeRecord[];
}

export const useFetchAllLectureListQuery = (
  accessToken: string,
  courseId: number | null,
  options?: { enabled?: boolean }
) => {
  return useQuery<AllLecturesResponse[]>({
    queryKey: ["lectures", courseId],
    queryFn: () => getAllLectures(courseId, accessToken),
    enabled: !!accessToken && courseId !== null,
  });
};

// export const useFetchAllAdminCourseListQuery = (
//   accessToken: string,
//   options?: { enabled?: boolean }
// ) => {
//   return useQuery({
//     queryKey: ["courses", "admin"],
//     queryFn: () => getAllAdminCourses(accessToken),
//     enabled: !!accessToken,
//   });
// };

// export const useFetchOneAdminCourseListQuery = (
//   accessToken: string,
//   courseId: number,
//   options?: { enabled?: boolean }
// ) => {
//   return useQuery({
//     queryKey: ["course", "admin", courseId],
//     queryFn: () => getOneAdminCourses(accessToken, courseId),
//     enabled: !!accessToken,
//   });
// };
