import { IUser } from "./user";

export interface IAnswer {
  answerId: number;
  content: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  user: IUser;
}
