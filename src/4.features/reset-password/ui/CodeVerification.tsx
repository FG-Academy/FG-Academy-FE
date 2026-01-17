"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
} from "@/6.shared/ui";
import { useResetPasswordStore } from "../model/reset-password.store";
import { sendVerificationCode } from "../api/reset-password";

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

const formSchema = z.object({
  verificationCode: z
    .string()
    .length(6, { message: "인증 코드는 6자리입니다." }),
});

export function CodeVerification() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      verificationCode: "",
    },
    mode: "onChange",
  });

  const [isTimeout, setIsTimeout] = useState(false);
  const [count, setCount] = useState(180);
  const [isFetch, setFetch] = useState(false);
  const [isVerifiedCode, setVerifiedCode] = useState(false);

  const { email, verificationCode, setUiState, setVerificationCode } =
    useResetPasswordStore();

  useEffect(() => {
    const id = setInterval(() => {
      setCount((count) => count - 1);
    }, 1000);

    if (isVerifiedCode || count === 0) {
      clearInterval(id);
      if (isVerifiedCode) {
        setIsTimeout(false);
      } else {
        setIsTimeout(true);
      }
    }
    return () => clearInterval(id);
  }, [count, isVerifiedCode]);

  useEffect(() => {
    if (isFetch) {
      setCount(180);
      form.setValue("verificationCode", "");
    }
  }, [isFetch, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (values.verificationCode === verificationCode) {
      setVerifiedCode(true);
    } else {
      form.setError("verificationCode", {
        type: "manual",
        message: "인증 코드가 일치하지 않습니다.",
      });
    }
  };

  const fetchSendEmail = async () => {
    try {
      const result = await sendVerificationCode(email);
      setVerificationCode(result.code.toString());
      setFetch(true);
    } catch (error) {
      console.error("Failed to resend email:", error);
    }
  };

  const handleResetPassword = async () => {
    setUiState("resetPassword");
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex-row justify-between w-full space-x-2 space-y-6"
        >
          <FormField
            control={form.control}
            name="verificationCode"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    disabled={count === 0 || isVerifiedCode}
                    className="py-6"
                    placeholder="인증코드 6자리"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center flex-row justify-between">
            <div
              className={`text-sm ${
                count === 0 ? "text-red-400" : "text-blue-400"
              }`}
            >
              {formatTime(count)}
            </div>
            <Button
              disabled={isVerifiedCode || isTimeout}
              className="items-center justify-center bg-blue-400 hover:bg-blue-500"
              type="submit"
            >
              {isVerifiedCode ? "확인완료" : "확인"}
            </Button>
          </div>
        </form>
      </Form>
      <div className="flex flex-row mt-10 space-x-2 text-sm text-gray-400">
        <p>이메일을 받지 못하셨나요?</p>
        <p
          onClick={fetchSendEmail}
          className="text-gray-500 underline cursor-pointer"
        >
          이메일 재전송하기
        </p>
      </div>
      <Button
        onClick={handleResetPassword}
        disabled={!isVerifiedCode || isTimeout}
        className={`mt-10 w-full p-6 text-lg bg-blue-400 hover:bg-blue-500`}
      >
        비밀번호 재설정
      </Button>
    </>
  );
}
