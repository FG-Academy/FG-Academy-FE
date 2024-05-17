import { z } from "zod";
import { getValues } from "../../userInfo/lib/getValues";
import { Department, Position } from "../../../types/type";

export const UserFormSchema = z
  .object({
    name: z.string().min(2, {
      message: "이름은 2글자 이상이어야 합니다.",
    }),
    email: z.string().min(1, { message: "필수 입력 항목입니다." }).email({
      message: "이메일 형식이 올바르지 않습니다.",
    }),
    birthDate: z.string().min(8, {
      message: "올바른 생년월일 8자를 입력해주세요.",
    }),
    // birthDate: z.string().pipe(z.coerce.date()),
    password: z.string().min(8, {
      message: "비밀번호는 영문, 숫자를 포함하여 8자 이상이어야 합니다.",
    }),
    passwordVerify: z.string(),
    phoneNumber: z.string().min(10, {
      message: "핸드폰 번호 11자리를 입력해주세요.",
    }),
    churchName: z.enum(["fg", "others"]),
    departmentName: z.enum(getValues(Department), {
      errorMap: () => ({
        message: "부서명을 선택해주세요.",
      }),
    }),
    position: z.enum(getValues(Position), {
      errorMap: () => ({
        message: "직분을 선택해주세요.",
      }),
    }),
    yearsOfService: z.coerce
      .number({ invalid_type_error: "숫자 형식의 값을 적어주세요." })
      .nonnegative("0 이상의 값을 적어주세요.")
      .lte(100, "100 이하의 값을 적어주세요."),
  })
  .refine(({ password, passwordVerify }) => password === passwordVerify, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordVerify"],
  });
