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

/** 강의 시간 기록 */
export interface LectureTimeRecord {
  userId: number;
  lectureId: number;
  playTime: number;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}
