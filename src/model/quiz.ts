export interface IQuizAnswer {
  id: number;
  itemIndex: number;
  quizId: number;
  item: string;
  isAnswer: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface IQuizSubmit {
  id: number;
  userId: number;
  multipleAnswer: number | null;
  submittedAnswer: string | null;
  feedbackComment: string | null;
  answer: string;
  status: number;
  createdAt: string;
  updatedAt: string;
}

export interface IQuiz {
  quizId: number;
  quizType: string;
  quizIndex: number;
  question: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}
