import type { IEnrollment } from "@/model/enrollment";
import type { ILecture } from "@/model/lecture";

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
  enrollments: IEnrollment[];
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
  lectures: ILecture[];
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
