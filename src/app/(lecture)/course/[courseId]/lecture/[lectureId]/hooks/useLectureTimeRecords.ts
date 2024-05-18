import { useQuery } from "@tanstack/react-query";
import { getLectuereTimeRecord } from "../lib/getLectureTimeRecord";

interface LectureTimeRecordsResponse {
  userId: number;
  lectureId: number;
  playTime: number;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

/** [강의 수강 화면] 수강 시간 가져오기 */
export const useLectureTimeRecordsQuery = (
  lectureId: number,
  accessToken: string,
  options?: { enabled?: boolean }
) => {
  return useQuery<LectureTimeRecordsResponse>({
    queryKey: ["lectureTimeRecord", lectureId, accessToken],
    queryFn: () => getLectuereTimeRecord(accessToken, lectureId),
    enabled: !!accessToken,
  });
};
