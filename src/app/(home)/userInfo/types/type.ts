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
  ETC: "etc",
} as const;

type DepartmentNames = (typeof Department)[keyof typeof Department];
type PositionNames = (typeof Position)[keyof typeof Position];
type ChurchName = "fg" | "others";

export interface UserProfile {
  userId: number;
  birthDate: string;
  name: string;
  email: string;
  phoneNumber: string;
  churchName: ChurchName;
  departmentName: DepartmentNames;
  position: PositionNames;
  yearsOfService: number;
  level: null | string | number; // Adjust according to what `level` can be
  nameBirthId: string;
  status: "active"; // Assuming status can only be 'active', adjust if there are more options
}
