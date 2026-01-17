import z from "zod";

export const DescriptiveAnswerSchema = z.object({
  descriptiveAnswer: z.string().min(1, {
    message: "주관식 정답은 1글자 이상이어야 합니다.",
  }),
});

export type DescriptiveAnswerFormValues = z.infer<typeof DescriptiveAnswerSchema>;
