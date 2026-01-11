import { apiClient } from "@/6.shared/api";

export interface UpdateCourseDto {
  title?: string;
  description?: string;
  curriculum?: string;
  openDate?: string;
  finishDate?: string;
  level?: string;
  status?: string;
  thumbnailImagePath?: string;
}

export async function updateCourse(
  courseId: number,
  data: UpdateCourseDto
): Promise<void> {
  return apiClient.patch(`/admin/courses/${courseId}`, data);
}
