export interface Lecture {
  lectureId: number;
  courseId: number;
  lectureNumber: number;
  title: string;
  videoLink: string;
  attachmentFile: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface CourseLecture extends Lecture {
  multipleChoiceCount: number;
  descriptiveCount: number;
}
