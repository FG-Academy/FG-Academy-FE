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
  lectureTimeRecords: LectureTimeRecord[];
  quizzes: Quiz[];
}

interface LecturesObject {
  [lectureId: number]: Lecture;
}

export interface ILecture {
  lectures: LecturesObject;
  length: number;
}

export interface LectureTimeRecord {
  userId: number;
  lectureId: number;
  playTime: number;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}
