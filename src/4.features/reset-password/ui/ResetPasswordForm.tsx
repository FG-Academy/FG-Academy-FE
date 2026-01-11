"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  toast,
} from "@/6.shared/ui";
import { useResetPasswordStore } from "../model/reset-password.store";
import { resetPassword } from "../api/reset-password";

const formSchema = z
  .object({
    password: z.string().min(8, {
      message: "비밀번호는 영문, 숫자를 포함하여 8자 이상이어야 합니다.",
    }),
    passwordVerify: z.string(),
  })
  .refine(({ password, passwordVerify }) => password === passwordVerify, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordVerify"],
  });

export function ResetPasswordForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      passwordVerify: "",
    },
    mode: "onChange",
  });

  const router = useRouter();
  const { email, reset } = useResetPasswordStore();

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await resetPassword(email, data.password);
      toast({
        title: "비밀번호 변경 성공",
        description: "새로운 비밀번호로 로그인해주세요.",
      });
      reset();
      router.replace("/login");
    } catch {
      toast({
        variant: "destructive",
        title: "비밀번호 변경에 실패했습니다.",
        description: "잠시 후 다시 시도해주세요.",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="새 비밀번호"
                  autoComplete="new-password"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="passwordVerify"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="새 비밀번호 확인"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className={`mt-10 w-full p-6 text-lg bg-blue-400 hover:bg-blue-500`}
        >
          비밀번호 변경하기
        </Button>
      </form>
    </Form>
  );
}
