export interface ILecture {
  lectureId: number;
  courseId: number;
  lectureNumber: number;
  title: string;
  videoLink: string;
  attachmentFile?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface ILectureTimeRecord {
  userId: number;
  lectureId: number;
  playTime: number;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}
