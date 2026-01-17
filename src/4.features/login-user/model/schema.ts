import { z } from "zod";

export const LoginSchema = z.object({
  nameBirthId: z.string().min(1, {
    message: "아이디를 입력해주세요.",
  }),
  password: z.string().min(1, {
    message: "비밀번호는 영문, 숫자를 포함하여 8자 이상이어야 합니다.",
  }),
});

export type LoginFormData = z.infer<typeof LoginSchema>;
