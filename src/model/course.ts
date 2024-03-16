import { Lecture } from "./lecture";

export interface Course {
  courseId: number;
  title: string;
  thumbnail: string;
  description: string;
  curriculum: string;
  status: string;
  level: string;
  openDate: string;
  finishDate: string;
  lecture: Lecture[];
}

export interface CourseQuiz {
  courseId: number;
  lectures: Lecture[];
}
