import { useQuery } from "@tanstack/react-query";
import { ICourse } from "@/model/course";
import { ILecture } from "@/model/lecture";
import { IEnrollment } from "@/model/enrollment";

export interface AdminCoursesResponse extends ICourse {
  enrollments: IEnrollment[];
  enrollmentCount: number;
  multipleCount: number;
  descriptiveCount: number;
}

export interface AdminCourseReponse extends ICourse {
  lectures: ILecture[];
}

export interface ICategory {
  categoryId: number;
  name: string;
  order: number;
}

/** [관리자 화면 - 카테고리] 모든 카테고리 가져오기 */
export const useFetchAllCategoriesQuery = (
  accessToken: string,
  options?: { enabled?: boolean }
) => {
  return useQuery<ICategory[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/categories`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      return response.json();
    },
    enabled: !!accessToken,
  });
};
