import { apiClient } from "@/6.shared/api";

export interface CreateCourseDto {
  title: string;
  description: string;
  curriculum: string;
  openDate: string;
  finishDate: string;
  level: string;
  thumbnailImagePath?: string;
}

export async function createCourse(data: CreateCourseDto): Promise<void> {
  return apiClient.post("/admin/courses", data);
}
