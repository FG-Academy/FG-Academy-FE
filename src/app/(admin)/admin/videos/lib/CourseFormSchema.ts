import { z } from "zod";

const MAX_FILE_SIZE = 1024 * 1024 * 500;
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const ACCEPTED_IMAGE_TYPES = ["jpeg", "jpg", "png", "webp"];

export const CourseFormSchema = z.object({
  title: z.string().min(1, {
    message: "코스 이름은 1글자 이상이어야 합니다.",
  }),
  description: z.string().min(1, {
    message: "코스 이름은 1글자 이상이어야 합니다.",
  }),
  curriculum: z.string().min(1, { message: "필수 입력 항목입니다." }),
  openDate: z.string().min(8, {
    message: "올바른 시작일자 8자를 입력해주세요.",
  }),
  finishDate: z.string().min(8, {
    message: "올바른 마감일자 8자를 입력해주세요.",
  }),
  level: z.string().min(1, {
    message: "코스 이름은 1글자 이상이어야 합니다.",
  }),
  thumbnailImage: z.any(),
});

export const AdminCourseFormSchema = z.object({
  title: z.string().min(1, {
    message: "코스 이름은 1글자 이상이어야 합니다.",
  }),
  description: z.string().min(1, {
    message: "코스 이름은 1글자 이상이어야 합니다.",
  }),
  curriculum: z.string().min(1, { message: "필수 입력 항목입니다." }),
  openDate: z.string().min(10, {
    message: "올바른 시작일자 8자를 입력해주세요.",
  }),
  finishDate: z.string().min(10, {
    message: "올바른 마감일자 8자를 입력해주세요.",
  }),
  level: z.string().min(1, {
    message: "코스 이름은 1글자 이상이어야 합니다.",
  }),
  thumbnailImage: z.any(),
  // .refine((files) => {
  //   return files?.[0]?.size <= MAX_FILE_SIZE;
  // }, `Max image size is 5MB.`)
  // .refine(
  //   (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
  //   "Only .jpg, .jpeg, .png and .webp formats are supported."
  // ),
  lectures: z.array(
    z.object({
      lectureId: z.number().optional(),
      title: z.string().min(1, {
        message: "강의 제목은 1글자 이상이어야 합니다.",
      }),
      videoLink: z.string().optional(), // 설명은 선택적으로 입력 가능하게 설정
      lectureNumber: z.number().optional(),
    })
  ),
});
