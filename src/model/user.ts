import { TChurchName, TDepartment, TPosition } from "@/app/types/type";

export interface IUser {
  userId: number;
  birthDate: string; // ISO 8601 날짜 포맷을 사용하는 문자열
  name: string;
  email: string;
  phoneNumber: string; // 숫자가 아닌 문자열로 표현되어 있으므로 string 타입
  churchName: TChurchName;
  departmentName: TDepartment;
  position: TPosition;
  yearsOfService: number;
  level: string;
  nameBirthId: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
