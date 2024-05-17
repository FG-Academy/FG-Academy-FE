"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSession } from "next-auth/react";
import { dateFormat } from "@/lib/dateFormat";
import { useUserMutation } from "../hook/useUserMutation";
import { ProfileUpdateFormSchema } from "../lib/profileFormSchema";
import { departments, positions } from "../../../types/type";
import { toast } from "@/components/ui/use-toast";
import { IUser } from "@/model/user";

type Props = {
  userInfo: IUser;
};

export function UserInfo({ userInfo }: Props) {
  const { data: session, update } = useSession();
  const accessToken = session?.user.accessToken;

  const form = useForm<z.infer<typeof ProfileUpdateFormSchema>>({
    resolver: zodResolver(ProfileUpdateFormSchema),
    mode: "onChange",
    defaultValues: {
      ...userInfo,
      birthDate: dateFormat(new Date(userInfo.birthDate as string)),
    },
  });
  const {
    formState: { dirtyFields },
  } = form;

  const { mutate } = useUserMutation();

  const onSubmit = async (data: z.infer<typeof ProfileUpdateFormSchema>) => {
    type UserData = z.infer<typeof ProfileUpdateFormSchema>;
    const updatedData: any = {};

    Object.keys(dirtyFields).forEach((key) => {
      const fieldKey = key as keyof UserData; // 'key'를 'UserData'의 키로 타입 단언
      if (dirtyFields[fieldKey] && data[fieldKey] !== undefined) {
        updatedData[fieldKey] = data[fieldKey];
      }
    });

    if (Object.keys(updatedData).length > 0) {
      const updatePayload: any = {};
      if (data.name !== undefined) {
        updatePayload.name = data.name;
      }
      if (data.level !== undefined) {
        updatePayload.level = data.level;
      }

      update(updatePayload);
      mutate({ accessToken, data: updatedData });
    } else {
      toast({
        title: "수정된 정보가 없습니다.",
        description: "정보를 수정 후 다시 시도해주세요.",
      });
      console.log("No fields have been changed.");
    }
  };

  return (
    <Form {...form}>
      <form
        autoComplete="off"
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-7/12 md:w-2/5 space-y-6"
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
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="level"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-bold">
                레벨 <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input disabled autoComplete="off" readOnly {...field} />
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
                <Input type="date" {...field} />
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
