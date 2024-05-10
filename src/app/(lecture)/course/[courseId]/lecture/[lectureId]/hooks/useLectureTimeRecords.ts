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

export const useLectureTimeRecordsQuery = (
  courseId: number,
  lectureId: number,
  accessToken: string,
  options?: { enabled?: boolean }
) => {
  return useQuery<LectureTimeRecordsResponse>({
    queryKey: ["lectureTimeRecord", courseId, lectureId],
    queryFn: () => getLectuereTimeRecord(accessToken, lectureId),
    enabled: !!accessToken,
  });
};
