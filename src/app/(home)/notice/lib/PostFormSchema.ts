import { z } from "zod";

export const PostFormSchema = z.object({
  title: z.string().min(1, {
    message: "제목은 1글자 이상이어야 합니다.",
  }),
  content: z.string().min(1, {
    message: "내용은 1글자 이상이어야 합니다.",
  }),
  // email: z.string().min(1, { message: "필수 입력 항목입니다." }).email({
  //   message: "이메일 형식이 올바르지 않습니다.",
  // }),
});
