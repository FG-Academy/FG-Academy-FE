"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ClockLoader } from "react-spinners";

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
import { checkEmailExists, sendVerificationCode } from "../api/reset-password";

const formSchema = z.object({
  email: z.string().min(1, { message: "필수 입력 항목입니다." }).email({
    message: "이메일 형식이 올바르지 않습니다.",
  }),
});

export function EmailForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
    mode: "onChange",
  });

  const [isEmailValid, setEmailValid] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const { setEmail, setUiState, setVerificationCode } = useResetPasswordStore();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const isEmailExists = await checkEmailExists(values.email);
      if (isEmailExists) {
        setEmail(values.email);
        setEmailValid(true);
      } else {
        toast({
          title: "해당 이메일로 가입된 계정이 존재하지 않습니다.",
          variant: "destructive",
          duration: 3000,
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-white p-4">
              <code className="text-black">{values.email}</code>
            </pre>
          ),
        });
        form.setValue("email", "");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "네트워크 오류가 발생했습니다.",
        description: "잠시 후 다시 시도해주세요.",
      });
    }
  };

  const handleEmailVerification = async () => {
    setLoading(true);
    try {
      const email = form.getValues("email");
      const result = await sendVerificationCode(email);
      setVerificationCode(result.code.toString());
      setUiState("enterCode");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "이메일 전송에 실패했습니다.",
        description: "잠시 후 다시 시도해주세요.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex-row w-full space-y-6"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input className="py-6" placeholder="이메일" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={isEmailValid}
            className="items-center justify-center bg-blue-400 hover:bg-blue-500"
            type="submit"
          >
            {isEmailValid ? "확인완료" : "확인"}
          </Button>
        </form>
      </Form>
      <Button
        onClick={handleEmailVerification}
        disabled={!isEmailValid}
        className={`mt-10 w-full p-6 text-lg bg-blue-400 hover:bg-blue-500`}
      >
        {isLoading ? (
          <ClockLoader size={30} className="mx-auto" color="#ffffff" />
        ) : (
          <div className="mx-auto">이메일 인증 코드 받기</div>
        )}
      </Button>
    </>
  );
}
