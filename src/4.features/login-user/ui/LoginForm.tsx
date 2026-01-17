"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/6.shared/ui";
import { LoginFormData, LoginSchema } from "../model/schema";
import { loginUser } from "../api/login-user";

export const LoginForm = () => {
  const router = useRouter();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    mode: "onSubmit",
    defaultValues: {
      nameBirthId: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    const result = await loginUser(data);

    if (result.success) {
      router.push("/");
      router.refresh();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="nameBirthId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-bold">
                  아이디 <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="아이디는 자신의 '이름+생일4자리'입니다. ex)꽃동산1225"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-bold">
                  비밀번호 <span className="text-red-500">*</span>{" "}
                  <span className="text-sm font-light">
                    (초기 비밀번호는 생일4자리 입니다. - ex.0605)
                  </span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="비밀번호를 입력해주세요."
                    type="password"
                    autoComplete="current-password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="text-red-500">
            <span className="text-red-500">*</span> 보안을 위해 로그인 이후
            회원정보 페이지에서 반드시 비밀번호를 수정해주세요.
          </div>

          <Button className="w-full py-6 text-lg" type="submit">
            로그인
          </Button>
        </form>
      </Form>
    </div>
  );
};
