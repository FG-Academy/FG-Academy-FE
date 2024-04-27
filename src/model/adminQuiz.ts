export interface IAdminQuizData {
  userId: number;
  name: string;
  department: string;
  position: string;
  level: string;
  quizzes: AdminQuizDetail[];
  totalSubmissions: number;
  correctSubmissions: number;
  correctedRate: string;
}

interface AdminQuizDetail {
  quizId: number;
  courseTitle: string;
  lectureTitle: string;
  quizTitle: string;
  quizContents: string[];
  quizType: string;
  answer: number[];
  answerContent: string;
  corrected: boolean | null;
  feedback: string | null;
  submittedDate: string;
  submittedAnswer?: string | null;
}

export interface AdminQuizInfo {
  data: IAdminQuizData[];
}

export interface ILectureInfo {}
