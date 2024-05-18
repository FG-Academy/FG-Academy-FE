import { useQuery } from "@tanstack/react-query";
import { getProgress } from "../lib/getProgress";

interface IProgress {
  lectureId: number;
  lectureNumber: number;
  completed: boolean;
  progress: number;
}

export interface IProgressResult {
  lectureProgresses: IProgress[];
  completedCount: number;
}

/** [강의 수강 화면] 진도 현황 가져오기 */
export const useProgressQuery = (
  accessToken: string,
  courseId: number,
  options?: { enabled?: boolean }
) => {
  return useQuery<IProgressResult>({
    queryKey: ["progress", courseId, accessToken],
    queryFn: () => getProgress(courseId, accessToken),
    enabled: !!accessToken,
  });
};
