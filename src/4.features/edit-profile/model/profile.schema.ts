import { z } from "zod";
import { Department, Position } from "@/5.entities/user";

function getValues<T extends Record<string, unknown>>(obj: T) {
  return Object.values(obj) as [(typeof obj)[keyof T]];
}

export const ProfileUpdateFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "이름은 2글자 이상이어야 합니다." })
    .optional(),
  level: z.string().optional(),
  email: z
    .string()
    .min(1, { message: "필수 입력 항목입니다." })
    .email({ message: "이메일 형식이 올바르지 않습니다." })
    .optional(),
  birthDate: z
    .string()
    .min(8, { message: "올바른 생년월일 8자를 입력해주세요." })
    .optional(),
  phoneNumber: z
    .string()
    .min(10, { message: "핸드폰 번호 11자리를 입력해주세요." })
    .optional(),
  churchName: z.enum(["fg", "others"]).optional(),
  departmentName: z
    .enum(getValues(Department), {
      errorMap: () => ({ message: "부서명을 선택해주세요." }),
    })
    .optional(),
  position: z
    .enum(getValues(Position), {
      errorMap: () => ({ message: "직분을 선택해주세요." }),
    })
    .optional(),
  yearsOfService: z.coerce
    .number({ invalid_type_error: "숫자 형식의 값을 적어주세요." })
    .nonnegative("0 이상의 값을 적어주세요.")
    .lte(100, "100 이하의 값을 적어주세요.")
    .optional(),
});

export type ProfileUpdateFormValues = z.infer<typeof ProfileUpdateFormSchema>;
