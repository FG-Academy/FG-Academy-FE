import z from "zod";

export const MultipleAnswerSchema = z.object({
  items: z
    .array(z.number())
    .min(1, { message: "한 개 이상의 답안을 선택 후 제출해주세요." }),
});

export type MultipleAnswerFormValues = z.infer<typeof MultipleAnswerSchema>;
