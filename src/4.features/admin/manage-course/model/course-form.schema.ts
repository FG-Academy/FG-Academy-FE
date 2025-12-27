import { z } from "zod";

export const CourseFormSchema = z.object({
  title: z.string().min(1, {
    message: "코스 이름은 1글자 이상이어야 합니다.",
  }),
  description: z.string().min(1, {
    message: "코스 설명은 1글자 이상이어야 합니다.",
  }),
  curriculum: z.string().min(1, { message: "필수 입력 항목입니다." }),
  openDate: z.string().min(8, {
    message: "올바른 시작일자 8자를 입력해주세요.",
  }),
  finishDate: z.string().min(8, {
    message: "올바른 마감일자 8자를 입력해주세요.",
  }),
  level: z.string().min(1, {
    message: "최소 수강 레벨을 선택해주세요.",
  }),
  thumbnailImage: z.any(),
});

export const AdminCourseFormSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: "코스 이름은 1글자 이상이어야 합니다.",
    })
    .optional(),
  status: z.string(),
  description: z
    .string()
    .min(1, {
      message: "코스 설명은 1글자 이상이어야 합니다.",
    })
    .optional(),
  curriculum: z
    .string()
    .min(1, { message: "필수 입력 항목입니다." })
    .optional(),
  categoryId: z
    .number()
    .min(1, { message: "필수 입력 항목입니다." })
    .optional(),
  openDate: z
    .string()
    .min(10, {
      message: "올바른 시작일자를 입력해주세요.",
    })
    .optional(),
  finishDate: z
    .string()
    .min(10, {
      message: "올바른 마감일자를 입력해주세요.",
    })
    .optional(),
  level: z
    .string()
    .min(1, {
      message: "최소 수강 레벨을 선택해주세요.",
    })
    .optional(),
  thumbnailImage: z.any().optional(),
});

export const LectureFormSchema = z.object({
  lectures: z.array(
    z.object({
      lectureId: z.number().optional(),
      title: z.string().min(1, {
        message: "강의 제목은 1글자 이상이어야 합니다.",
      }),
      videoLink: z.string().optional(),
      lectureNumber: z.number().optional(),
    })
  ),
});

export type CourseFormValues = z.infer<typeof CourseFormSchema>;
export type AdminCourseFormValues = z.infer<typeof AdminCourseFormSchema>;
export type LectureFormValues = z.infer<typeof LectureFormSchema>;
