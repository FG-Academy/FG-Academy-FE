import { groupBy } from "es-toolkit";
import { apiClient } from "@/6.shared/api";
import type { CategorizedCourse, CoursesResponse } from "../model/course.type";

export async function getCourses(): Promise<CategorizedCourse[]> {
  const courses = await apiClient.get<CoursesResponse[]>("/courses");

  if (!courses || courses.length === 0) return [];

  // 먼저 courses를 category order로 정렬
  const sortedCourses = [...courses].sort((a, b) => {
    const orderA = a.category?.order ?? 999;
    const orderB = b.category?.order ?? 999;
    return orderA - orderB;
  });

  const grouped = groupBy(
    sortedCourses,
    (course) => course.category?.name || "기타"
  );

  return Object.entries(grouped).map(([categoryName, courseList]) => ({
    name: categoryName,
    order: courseList[0]?.category?.order ?? 999,
    courses: courseList,
  }));
}
