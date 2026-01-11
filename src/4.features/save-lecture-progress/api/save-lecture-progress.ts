import { apiClient } from "@/6.shared/api";

interface SaveLectureProgressParams {
  minutes: number;
  lectureId: number;
}

/** 강의 재생 시간 저장 API */
export async function saveLectureProgress(
  seconds: number,
  lectureId: number
): Promise<void> {
  return apiClient.post<void, SaveLectureProgressParams>(
    "/users/save-lecture-record",
    {
      minutes: seconds,
      lectureId,
    }
  );
}
