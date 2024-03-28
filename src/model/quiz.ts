interface QuizAnswer {
  id: number;
  itemIndex: number;
  quizId: number;
  item: string;
  isAnswer: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface QuizSubmit {
  id: number;
  userId: number;
  multipleAnswer: number;
  submittedAnswer: string | null;
  feedbackComment: string | null;
  status: number;
  createdAt: string;
  updatedAt: string;
}

export interface Quiz {
  quizId: number;
  quizType: string;
  quizIndex: number;
  quizAnswers: QuizAnswer[];
  question: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  quizSubmits: QuizSubmit[];
}
