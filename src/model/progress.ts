interface IProgress {
  lectureId: number;
  lectureNumber: number;
  completed: string;
  progress: number;
}

export interface IProgressResult {
  lectureProgresses: IProgress[];
  completedCount: number;
}
