export interface IEnrollment {
  id: number;
  completedNumber: number;
  status: string; // nullable이므로 optional로 표시
  createdAt: Date;
  updatedAt: Date;
}
