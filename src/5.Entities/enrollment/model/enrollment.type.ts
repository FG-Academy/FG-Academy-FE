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

// 강의 진도 정보
export interface LectureProgressItem {
  lectureId: number;
  lectureNumber: number;
  completed: boolean;
  progress: number;
}

export interface LectureProgressResult {
  lectureProgresses: LectureProgressItem[];
  completedCount: number;
}

// 수강 중인 코스의 퀴즈 정보
export interface MyCourseLectureQuiz {
  quizId: number;
  quizType: string;
  submitted: boolean;
}

// 수강 중인 코스의 강의 정보 (사이드바용)
export interface MyCourseLecture {
  lectureId: number;
  lectureNumber: number;
  lectureTitle: string;
  quizzes: MyCourseLectureQuiz[];
}

// 수강 중인 코스 상세 정보
export interface MyCourseDetail {
  courseId: number;
  title: string;
  thumbnailImagePath: string;
  description: string;
  curriculum: string;
  status: string;
  level: string;
  openDate: string;
  finishDate: string;
  createdAt: string;
  updatedAt: string;
  lectures: MyCourseLecture[];
  category: {
    name: string;
  };
}
