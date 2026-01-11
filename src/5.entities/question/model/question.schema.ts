import { z } from "zod";

export const QuestionFormSchema = z.object({
  title: z.string().min(1, { message: "제목은 1글자 이상이어야 합니다." }),
  content: z.string().min(1, { message: "내용은 1글자 이상이어야 합니다." }),
});

export const QuestionPatchFormSchema = z.object({
  title: z
    .string()
    .min(1, { message: "제목은 1글자 이상이어야 합니다." })
    .optional(),
  content: z
    .string()
    .min(1, { message: "내용은 1글자 이상이어야 합니다." })
    .optional(),
});

export const AnswerFormSchema = z.object({
  content: z.string().min(1, { message: "내용은 1글자 이상이어야 합니다." }),
});

export type QuestionFormValues = z.infer<typeof QuestionFormSchema>;
export type QuestionPatchFormValues = z.infer<typeof QuestionPatchFormSchema>;
export type AnswerFormValues = z.infer<typeof AnswerFormSchema>;
