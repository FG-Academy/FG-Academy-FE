"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";

const FormSchema = z
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
    password: z.string().min(8, {
      message: "비밀번호는 영문, 숫자를 포함하여 8자 이상이어야 합니다.",
    }),
    passwordVerify: z.string(),
    phoneNumber: z.string().min(10, {
      message: "핸드폰 번호 11자리를 입력해주세요.",
    }),
    churchName: z.enum(["fg", "others"]),
    departmentName: z.string().min(10, {
      message: "핸드폰 번호 11자리를 입력해주세요.",
    }),
    position: z.string().min(10, {
      message: "핸드폰 번호 11자리를 입력해주세요.",
    }),
    yearsOfService: z.string().min(10, {
      message: "핸드폰 번호 11자리를 입력해주세요.",
    }),
  })
  .refine((data) => data.password === data.passwordVerify, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordVerify"],
  });

type ChurchName = "fg" | "others";

export function InputForm() {
  const [input, setInput] = useState<ChurchName>("fg");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      birthDate: "",
      password: "",
      passwordVerify: "",
      phoneNumber: "",
      churchName: "fg",
      departmentName: "",
      position: "",
      yearsOfService: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(JSON.stringify(data, null, 2));
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  const onSubmitSignup = (data: z.infer<typeof FormSchema>) => {
    console.log(JSON.stringify(data, null, 2));
    console.log(input);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/5 space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-bold">
                이름 <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="이름을 입력해주세요." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="birthDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-bold">
                생년월일 <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="ex) 20001216" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-bold">
                이메일 <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="이메일을 입력해주세요." {...field} />
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
                비밀번호 <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input {...field} />
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
              <FormLabel className="text-base font-bold">
                비밀번호 확인 <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black text-base font-bold">
                핸드폰 번호 <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="churchName"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-base font-bold">교회명</FormLabel>
              <FormControl>
                <RadioGroup
                  // onValueChange={(value: ChurchName) => {
                  //   setInput(value);
                  // }}
                  onValueChange={field.onChange}
                  defaultValue="fg"
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="fg" />
                    </FormControl>
                    <FormLabel className="text-base">꽃동산 교회</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="others" />
                    </FormControl>
                    <FormLabel className="text-base">타교회</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          // onSubmit={}
          // onClick={form.handleSubmit(onSubmit)}
        >
          회원가입
        </Button>
      </form>
    </Form>
  );
}
