export interface Course {
  courseId: number;
  title: string;
  thumbnailImagePath: string;
  description: string;
  curriculum: string;
  status: string;
  level: string;
  openDate: string;
  finishDate: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  name: string;
  order: number;
}

export interface CourseWithCategory extends Course {
  category: Category;
}

export interface CategorizedCourse {
  name: string;
  order: number;
  courses: CoursesResponse[];
}

export interface CourseDetail {
  courseId: number;
  category: Category;
  status: string;
  title: string;
  curriculum: string;
  thumbnailPath: string | null;
  totalCourseLength: number;
  completedLectures: number;
  lastStudyLectureId: number;
}

/** API RESPONSE */
export interface CoursesResponse extends Course {
  category: Category;
}

export interface MyCoursesResponse {
  message: string;
  courseDetail: CourseDetail[];
}
