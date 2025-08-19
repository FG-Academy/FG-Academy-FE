export interface Enrollment {
  id: number;
  completeNumber: number;
  status: string | null;
  createdAt: string;
  updatedAt: string;
  courseId: number;
  userId: number;
}

export interface CourseEnrollment {
  isTaking: boolean;
  message: string;
  totalCount: number;
  completedLectures: number;
  lastStudyLecture: number;
}
