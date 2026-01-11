import { apiClient } from "@/6.shared/api";

export interface AddEnrollmentResponse {
  message: string;
}

export async function addEnrollment(
  courseId: number
): Promise<AddEnrollmentResponse> {
  const data = await apiClient.post<
    AddEnrollmentResponse,
    Record<string, never>
  >(`/courses/${courseId}/enrollment`);
  return data;
}
