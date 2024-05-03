import { IEnrollment } from "./enrollment";
import { Lecture } from "./lecture";

export interface Course {
  courseId: number;
  title: string;
  thumbnailImagePath: string;
  description: string;
  curriculum: string;
  status?: string;
  level: string;
  openDate: string;
  finishDate: string;
  createdAt: Date;
  updatedAt: Date;
  lecture: Lecture[];
}

export interface AdminCourse {
  courseId: number;
  title: string;
  thumbnailImagePath: string;
  description: string;
  curriculum: string;
  status: "active" | "inactive";
  level: string;
  openDate: string;
  finishDate: string;
  createdAt?: Date;
  updatedAt?: Date;
  enrollments?: IEnrollment[];
  enrollmentCount?: number;
  lectures: Lecture[];
}

export interface CourseQuiz {
  courseId: number;
  lectures: Lecture[];
}
