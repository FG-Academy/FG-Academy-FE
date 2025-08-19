import { apiClient } from "@/6.shared/api";
import { CourseEnrollment } from "../model/enrollment.type";

export async function getEnrollmentByCourse(courseId: number) {
  const data = await apiClient.get<CourseEnrollment>(
    `/courses/${courseId}/enrollment`
  );

  return data;
}
