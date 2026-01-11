import type { Enrollment } from "@/5.entities/enrollment";
import type { Lecture } from "@/5.entities/lecture";

export interface Category {
  categoryId?: number;
  name: string;
  order: number;
}

export interface AdminCourse {
  courseId: number;
  title: string;
  description: string;
  thumbnailImagePath: string;
  openDate: string;
  finishDate: string;
  level: string;
  status: "active" | "inactive" | "temp";
  createdAt: string;
  updatedAt: string;
  category: Category;
  enrollments: Enrollment[];
  enrollmentCount: number;
  multipleCount: number;
  descriptiveCount: number;
}

export interface AdminCourseDetail {
  courseId: number;
  title: string;
  description: string;
  thumbnailImagePath: string;
  openDate: string;
  finishDate: string;
  level: string;
  status: "active" | "inactive" | "temp";
  createdAt: string;
  updatedAt: string;
  category: Category;
  lectures: Lecture[];
}

export interface LectureInput {
  lectureId?: number;
  title: string;
  videoLink?: string;
  lectureNumber?: number;
}

export interface LecturesFormData {
  lectures: LectureInput[];
}
