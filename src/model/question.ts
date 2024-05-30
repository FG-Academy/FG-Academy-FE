import { IAnswer } from "./answer";
import { IUser } from "./user";

export interface IQuestion {
  questionId: number;
  title: string;
  content: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  answers: IAnswer[];
  user: IUser;
}
