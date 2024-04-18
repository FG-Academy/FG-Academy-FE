"use client";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import useResetPasswordStore from "@/store/resetPasswordStore";
import { formatTime } from "../lib/formatTime";
import { useMutation } from "@tanstack/react-query";

const formSchema = z.object({
  verificationCode: z
    .string()
    .length(6, { message: "인증 코드는 6자리입니다." }),
  // .refine((count) => count > 0, { message: "시간이 초과되었습니다." })
});

export default function EmailVerification() {
  // const mutation = useMutation({
  //   mutationFn: async (formData: FormData) => {
  //     await new Promise((resolve) => {
  //       // 10초 후에 resolve 함수를 호출하여 Promise가 완료되었음을 알림
  //       setTimeout(() => {
  //         console.log("데이터 처리 완료");
  //         resolve("데이터 준비 완료");
  //       }, 3000); // 3초 대기
  //     });
  //     return fetch("http://localhost:3000/upload", {
  //       method: "POST",
  //       credentials: "include",
  //       body: formData,
  //     });
  //   },
  //   onSuccess(response, variable) {

  //   },
  //   onError() {
  //     toast({
  //       variant: "destructive",
  //       title: "요청에 실패하였습니다.",
  //       description: "입력하신 정보를 확인 후 다시 한 번 시도해주세요.",
  //       // action: <ToastAction altText="Try again">Try again</ToastAction>,
  //     });
  //   },
  // });

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
    useResetPasswordStore((state) => state);

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
    // console.log(values.verificationCode, verificationCode);
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
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/email?email=${email}`
    );

    if (!response.ok) {
      throw new Error("Failed to save duration");
    }

    const result = await response.json();
    setVerificationCode(result.code.toString());
    setFetch(true);
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
              className={`text-sm text-blue-400 ${
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
        {"비밀번호 재설정"}
      </Button>
    </>
  );
}
