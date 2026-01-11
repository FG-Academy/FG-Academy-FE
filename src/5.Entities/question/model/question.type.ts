import type { User } from "@/5.entities/user";

export interface Answer {
  answerId: number;
  content: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  user: User;
}

export interface Question {
  questionId: number;
  title: string;
  content: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  answers: Answer[];
  user: User;
}

export interface QuestionListItem {
  questionId: number;
  title: string;
  content: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface QuestionsResponse {
  message: string;
  list: QuestionListItem[];
  totalPages: number;
}
