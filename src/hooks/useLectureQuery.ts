import { useQuery } from "@tanstack/react-query";
import { getAllLectures } from "./lib/getAllLectures";
import { ILecture } from "@/model/lecture";

export interface AllLecturesResponse extends ILecture {
  multipleChoiceCount: number;
  descriptiveCount: number;
}

/** [퀴즈 등록 화면 | 강의 상세 화면] 코스에 달린 강의리스트 가져오기*/
export const useFetchAllLectureListQuery = (
  accessToken: string,
  courseId: number | null,
  options?: { enabled?: boolean }
) => {
  return useQuery<AllLecturesResponse[]>({
    queryKey: ["lectures", courseId],
    queryFn: () => getAllLectures(courseId, accessToken),
    enabled: !!accessToken && !!courseId,
  });
};
