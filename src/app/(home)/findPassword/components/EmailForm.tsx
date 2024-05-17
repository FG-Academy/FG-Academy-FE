"use client";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useState } from "react";
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
import { ClockLoader } from "react-spinners";

const formSchema = z.object({
  email: z.string().min(1, { message: "필수 입력 항목입니다." }).email({
    message: "이메일 형식이 올바르지 않습니다.",
  }),
});

export default function EmailForm2() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
    mode: "onChange",
  });

  const [isEmailValid, setEmailValid] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const { email, setEmail } = useResetPasswordStore((state) => state);
  const { setUiState, setVerificationCode } = useResetPasswordStore(
    (state) => state
  );

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setEmail(values.email);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/email`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to save duration");
    }

    const isEmailExists = await response.json();
    if (isEmailExists) {
      setEmailValid(true);
    } else {
      toast({
        title: "해당 이메일로 가입된 계정이 존재하지 않습니다.",
        variant: "destructive",
        duration: 3000,
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-white p-4">
            <code className="text-black">
              {/* {JSON.stringify(values, null, 2)} */}
              {values.email}
            </code>
          </pre>
        ),
      });
      form.setValue("email", "");
    }
  };

  const handleEmailVerification = async () => {
    setLoading(true);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/email?email=${email}`
    );

    if (!response.ok) {
      throw new Error("Failed to save duration");
    }

    const result = await response.json();

    setVerificationCode(result.code.toString());
    setLoading(false);
    setUiState("enterCode");
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
                  <Input className="py-6 " placeholder="이메일" {...field} />
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
