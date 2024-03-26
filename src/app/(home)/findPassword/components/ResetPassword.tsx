"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useResetPasswordStore from "@/store/resetPasswordStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

export default function ResetPassword() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      passwordVerify: "",
    },
    mode: "onChange",
  });
  const router = useRouter();

  const { email, setUiState } = useResetPasswordStore((state) => state);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const response = await fetch("http://localhost:3000/users/password", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password: data.password,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to save duration");
    }
    router.replace("/login");
    setUiState("emailVerification");
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
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
            // onClick={handleEmailVerification}
            // disabled={!isEmailValid}
            className={`mt-10 w-full p-6 text-lg bg-blue-400 hover:bg-blue-500`}
          >
            비밀번호 변경하기
          </Button>
        </form>
      </Form>
    </>
  );
}
