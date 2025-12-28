export const Department = {
  FETAL: "fetal",
  INFANT: "infant",
  TODDLER: "toddler",
  KINDERGARTEN: "kindergarten",
  ELEMENTARYYOUNG: "elementaryYoung",
  ELEMENTARY: "elementary",
  JUNIOR: "junior",
  MIDDLE: "middle",
  MIDDLEHIGH: "middleHigh",
  HIGH: "high",
  GONGREUNGYOUNGKINDER: "gongreungYoungKinder",
  GONGREUNGELEMENTARYYOUNG: "gongreungElementaryYoung",
  GONGREUNGELEMENTARY: "gongreungElementary",
  GONGREUNGMIDDLE: "gongreungMiddle",
  GONGREUNGHIGH: "gongreungHigh",
  ENGLISHYOUNGKINDER: "englishYoungKinder",
  ENGLISHELEMENTARYYOUNG: "englishElementaryYoung",
  ENGLISHELEMENTARY: "englishElementary",
  ENGLISHMIDDLEHIGH: "englishMiddleHigh",
  LOVE: "love",
  YOUTH: "youth",
  ETC: "etc",
} as const;

export const Position = {
  PASTOR: "pastor",
  EVANGELIST: "evangelist",
  ELDER: "elder",
  TEACHER: "teacher",
  PREACHER: "preacher",
  ETC: "etc",
} as const;

export type TDepartment = (typeof Department)[keyof typeof Department];
export type TPosition = (typeof Position)[keyof typeof Position];
export type TChurchName = "fg" | "others";

export const departments = [
  { value: Department.FETAL, label: "태아부" },
  { value: Department.INFANT, label: "영아부" },
  { value: Department.TODDLER, label: "유아부" },
  { value: Department.KINDERGARTEN, label: "유치부" },
  { value: Department.ELEMENTARYYOUNG, label: "유년부" },
  { value: Department.ELEMENTARY, label: "초등부" },
  { value: Department.JUNIOR, label: "소년부" },
  { value: Department.MIDDLE, label: "중등부" },
  { value: Department.MIDDLEHIGH, label: "중고등부" },
  { value: Department.HIGH, label: "고등부" },
  { value: Department.GONGREUNGYOUNGKINDER, label: "공릉영유치부" },
  { value: Department.GONGREUNGELEMENTARYYOUNG, label: "공릉유년부" },
  { value: Department.GONGREUNGELEMENTARY, label: "공릉초등부" },
  { value: Department.GONGREUNGMIDDLE, label: "공릉중고등부" },
  { value: Department.ENGLISHYOUNGKINDER, label: "영어영유치부" },
  { value: Department.ENGLISHELEMENTARYYOUNG, label: "영어유년부" },
  { value: Department.ENGLISHELEMENTARY, label: "영어초등부" },
  { value: Department.ENGLISHMIDDLEHIGH, label: "영어중고등부" },
  { value: Department.LOVE, label: "사랑부" },
  { value: Department.YOUTH, label: "청년부" },
  { value: Department.ETC, label: "기타" },
];

export const positions = [
  { value: Position.PASTOR, label: "목사" },
  { value: Position.EVANGELIST, label: "전도사" },
  { value: Position.PREACHER, label: "강도사" },
  { value: Position.ELDER, label: "장로" },
  { value: Position.TEACHER, label: "교사" },
  { value: Position.ETC, label: "기타" },
];

export const userLevelOptions = [
  { value: "admin", label: "관리자" },
  { value: "deleted", label: "활동 정지" },
  { value: "L0", label: "L0" },
  { value: "L1", label: "L1" },
  { value: "L2", label: "L2" },
  { value: "tutor", label: "강사" },
  { value: "manager", label: "매니저" },
];

export const userLevelSettingOptions = [
  { value: "L0", label: "L0" },
  { value: "L1", label: "L1" },
  { value: "L2", label: "L2" },
];

export const courseCurriculumOptions = [
  { value: "필수과정" },
  { value: "심화과정" },
  { value: "기초과정" },
  { value: "리더과정" },
  { value: "1세미나" },
];

export interface User {
  userId: number;
  birthDate: string;
  name: string;
  email: string;
  phoneNumber: string;
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
