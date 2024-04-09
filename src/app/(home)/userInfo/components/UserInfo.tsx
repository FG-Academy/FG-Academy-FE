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
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Department, Position, UserProfile } from "../types/type";
import { ToastAction } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Loading from "@/app/(lecture)/course/[courseId]/lecture/[lectureId]/loading";
import { dateFormat } from "@/lib/dateFormat";

function getValues<T extends Record<string, any>>(obj: T) {
  return Object.values(obj) as [(typeof obj)[keyof T]];
}

const departments = [
  { value: Department.FETAL, label: "태아부" },
  { value: Department.INFANT, label: "영아부" },
  { value: Department.TODDLER, label: "유아부" },
  { value: Department.KINDERGARTEN, label: "유치부" },
  { value: Department.ELEMENTARYYOUNG, label: "유년부" },
  { value: Department.ELEMENTARY, label: "초등부" },
  { value: Department.JUNIOR, label: "소년부" },
  { value: Department.MIDDLE, label: "중등부" },
  { value: Department.MIDDLEHIGH, label: "중고등부" },
  { value: Department.HIGH, label: "고등부" },
  { value: Department.GONGREUNGYOUNGKINDER, label: "공릉영유치부" },
  { value: Department.GONGREUNGELEMENTARYYOUNG, label: "공릉유년부" },
  { value: Department.GONGREUNGELEMENTARY, label: "공릉초등부" },
  { value: Department.GONGREUNGMIDDLE, label: "공릉중등부" },
  { value: Department.GONGREUNGHIGH, label: "공릉고등부" },
  { value: Department.ENGLISHYOUNGKINDER, label: "영어영유치부" },
  { value: Department.ENGLISHELEMENTARYYOUNG, label: "영어유년부" },
  { value: Department.ENGLISHELEMENTARY, label: "영어초등부" },
  { value: Department.ENGLISHMIDDLEHIGH, label: "영어중고등부" },
  { value: Department.LOVE, label: "사랑부" },
  { value: Department.YOUTH, label: "청년부" },
  { value: Department.ETC, label: "기타" },
];

const positions = [
  { value: Position.PASTOR, label: "목사" },
  { value: Position.EVANGELIST, label: "전도사" },
  { value: Position.ELDER, label: "장로" },
  { value: Position.TEACHER, label: "교사" },
  { value: Position.ETC, label: "기타" },
];
type Department = (typeof Department)[keyof typeof Department];
type Position = (typeof Position)[keyof typeof Position];

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "이름은 2글자 이상이어야 합니다.",
  }),
  email: z.string().min(1, { message: "필수 입력 항목입니다." }).email({
    message: "이메일 형식이 올바르지 않습니다.",
  }),
  birthDate: z.string().min(8, {
    message: "올바른 생년월일 8자를 입력해주세요.",
  }),
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
});

type ChurchName = "fg" | "others";

interface User {
  userId: number;
  name: string;
  birthDate: string;
  email: string;
  phoneNumber: string;
  churchName: string;
  departmentName: string;
  position: string;
  yearsOfService: number;
}

type Props = {
  userInfo: User;
};

function useImportUserProfile(accessToken: string) {
  const { isPending, error, data } = useQuery<UserProfile>({
    queryKey: ["userInfo"],
    queryFn: () =>
      fetch("http://localhost:3000/users/profile", {
        headers: { Authorization: `Bearer ${accessToken}` },
      }).then((res) => res.json()),
    enabled: !!accessToken,
  });

  return { isPending, error, data };
}

export function UserInfo({ userInfo }: Props) {
  const router = useRouter();
  const { data: session } = useSession();
  const accessToken = session?.user.accessToken;
  // const { isPending, error, data } = useImportUserProfile(accessToken);
  // console.log(data);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
    defaultValues: {
      name: userInfo.name,
      email: userInfo.email,
      birthDate: dateFormat(new Date(userInfo.birthDate as string)),
      phoneNumber: userInfo.phoneNumber,
      churchName: userInfo.churchName as ChurchName,
      departmentName: userInfo.departmentName as Department,
      position: userInfo.position as Position,
      yearsOfService: userInfo.yearsOfService,
      // name: "",
      // email: "",
      // birthDate: "",
      // phoneNumber: "",
      // churchName: "fg",
      // // departmentName: Department.ETC,
      // // position: Position.ETC,
      // yearsOfService: 0,
    },
  });

  // useEffect(() => {
  //   if (data) {
  //     // 생년월일 형식 변경
  //     // console.log(data.birthDate);
  //     // const birthDate = new Date(data.birthDate).toISOString().split("T")[0];

  //     form.reset({
  //       ...form.getValues(), // 현재 폼의 값을 유지하면서
  //       name: data.name,
  //       email: data.email,
  //       birthDate: dateFormat(new Date(data.birthDate)),
  //       phoneNumber: data.phoneNumber,
  //       churchName: data.churchName,
  //       yearsOfService: data.yearsOfService,
  //     });
  //   }
  // }, [data, form]);

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      console.log(JSON.stringify(data));
      const response = await fetch("http://localhost:3000/users/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        if (response.status === 422) {
          // 409 Conflict 에러 처리
          toast({
            variant: "destructive",
            title: "이미 존재하는 이메일입니다.",
            description: "다른 이메일 주소를 사용해주세요.",
          });
        } else {
          // 그 외의 오류 처리
          toast({
            variant: "destructive",
            title: "오류가 발생했습니다.",
            description: "입력하신 정보를 확인 후 다시 한 번 시도해주세요.",
          });
        }
      } else {
        const data = await response.json();
        toast({
          title: "회원정보 변경 성공",
          description: "회원정보 변경에 성공했습니다.",
        });
        router.push("/userInfo");
      }
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
      toast({
        variant: "destructive",
        title: "네트워크 오류가 발생했습니다.",
        description: "잠시 후 다시 시도해주세요.",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        autoComplete="off"
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-2/5 space-y-6"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-bold">
                이름 <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  autoComplete="off"
                  placeholder="이름을 입력해주세요."
                  // defaultValue={data.name}
                  {...field}
                />
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
                <Input
                  placeholder="ex) 19901216"
                  // defaultValue={data.birthDate}
                  {...field}
                  value={field.value}
                  onChange={(e) => {
                    const cleanInput = e.target.value.replace(/\D/g, ""); // 숫자가 아닌 문자 제거
                    let formattedInput;

                    if (cleanInput.length <= 4) {
                      // 연도 입력 중
                      formattedInput = cleanInput;
                    } else if (cleanInput.length <= 6) {
                      // 월 입력 중
                      formattedInput = `${cleanInput.slice(
                        0,
                        4
                      )}-${cleanInput.slice(4)}`;
                    } else {
                      // 일 입력 중
                      formattedInput = `${cleanInput.slice(
                        0,
                        4
                      )}-${cleanInput.slice(4, 6)}-${cleanInput.slice(6, 8)}`;
                    }

                    field.onChange(formattedInput); // 업데이트된 값을 form 필드에 설정
                  }}
                />
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
                <Input
                  // autoComplete="off"
                  placeholder="이메일을 입력해주세요."
                  // defaultValue={data.email}
                  {...field}
                />
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
              <FormLabel className="text-base font-bold text-black">
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
              <FormLabel className="text-base font-bold">
                교회명 <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={userInfo.churchName}
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
        <FormField
          control={form.control}
          name="departmentName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-bold">
                부서명 <span className="text-red-500">*</span>
              </FormLabel>
              <Select
                // value={field.value}
                name={field.name}
                onValueChange={field.onChange}
                defaultValue={userInfo.departmentName}
              >
                <SelectTrigger>
                  <SelectValue
                    onBlur={field.onBlur}
                    ref={field.ref}
                    placeholder="부서명 선택"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {/* <SelectLabel>부서명</SelectLabel> */}
                    {departments.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-bold">
                직분 <span className="text-red-500">*</span>
              </FormLabel>
              <Select
                // value={field.value}
                name={field.name}
                onValueChange={field.onChange}
                defaultValue={userInfo.position}
              >
                <SelectTrigger>
                  <SelectValue
                    onBlur={field.onBlur}
                    ref={field.ref}
                    placeholder="직분 선택"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {/* <SelectLabel>부서명</SelectLabel> */}
                    {positions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="yearsOfService"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-bold">
                교사 근속년수 <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="근속년수를 입력해주세요."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" type="submit">
          회원정보 수정하기
        </Button>
      </form>
    </Form>
  );
}
