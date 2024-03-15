import { Course } from "./course";
import { Quiz } from "./quiz";

export interface Lecture {
  lectureId: number;
  courseId: number;
  lectureNumber: number;
  title: string;
  videoLink: string;
  attachmentFile?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  // isComplete: boolean;
  // course: Course;
  quizzes: Quiz[];
}

interface LecturesObject {
  [lectureId: number]: Lecture;
}

export interface ILecture {
  lectures: LecturesObject;
  length: number;
}
