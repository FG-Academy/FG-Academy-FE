import { Course } from "./course";
import { User } from "./user";

export interface IEnrollment {
  id: number;
  completedNumber: number;
  status?: string; // nullable이므로 optional로 표시
  createdAt: Date;
  updatedAt: Date;
  course?: Course;
  user?: User;
}
