import z from "zod";

export const AnnouncementSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: "제목은 1글자 이상이어야 합니다.",
    })
    .optional(),
  content: z
    .string()
    .min(1, {
      message: "내용은 1글자 이상이어야 합니다.",
    })
    .optional(),
});
