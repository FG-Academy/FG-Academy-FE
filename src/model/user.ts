export interface IUser {
  userId: number;
  birthDate: string; // ISO 8601 날짜 포맷을 사용하는 문자열
  name: string;
  email: string;
  phoneNumber: string; // 숫자가 아닌 문자열로 표현되어 있으므로 string 타입
  churchName: string;
  departmentName: string;
  position: string;
  yearsOfService: number;
  level: null | string; // null 또는 문자열이 될 수 있음
  nameBirthId: string;
  status: "active" | "inactive"; // 여기서는 'active'만 보이지만, 일반적으로 'inactive' 등 다른 상태도 가능할 것으로 예상
  createdAt: Date; // ISO 8601 날짜 포맷을 사용하는 문자열
  updatedAt: Date; // ISO 8601 날짜 포맷을 사용하는 문자열
}

export interface User {
  users: IUser[];
  count: number;
}
