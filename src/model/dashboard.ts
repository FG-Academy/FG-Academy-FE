export interface courseDetail {
  courseId: number;
  title: string;
  curriculum: string;
  thumbnailPath: string | null;
  totalCourseLength: number;
  completedLectures: number;
  lastStudyLectureId: number;
}

export interface Dashboard {
  message: string;
  courseDetail: courseDetail[];
}

export interface Answers {
  itemIndex: number;
  item: string;
}

export interface QuizList {
  correctAnswers: Answers[];
  quizId: number;
  question: string;
  submittedAnswer: number[];
  submittedAnswersContents: string[];
  isAnswer: boolean;
  lectureTitle: string;
  courseTitle: string;
}
