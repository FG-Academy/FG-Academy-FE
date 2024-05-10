import z from "zod";

export const AnswerFormSchema = z.object({
  descriptiveAnswer: z.string().min(1, {
    message: "주관식 정답은 1글자 이상이어야 합니다.",
  }),
});
