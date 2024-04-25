"use client";

import {
  ProfileFormSchema,
  ProfileUpdateFormSchema,
} from "@/app/(home)/userInfo/lib/profileFormSchema";
import {
  departments,
  positions,
  userLevelOptions,
} from "@/app/(home)/userInfo/types/type";
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
import { dateFormat } from "@/lib/dateFormat";
import { UserProfile } from "@/model/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useUserMutationFromAdmin } from "../hook/useUserMutationFromAdmin";
import { useSession } from "next-auth/react";
import { transformDate } from "@/lib/utils";

type Props = {
  userProfile: UserProfile;
  userId: number;
};

export default function UserForm({ userProfile, userId }: Props) {
  const { data: session } = useSession();
  const accessToken = session?.user.accessToken;

  const form = useForm<z.infer<typeof ProfileFormSchema>>({
    resolver: zodResolver(ProfileFormSchema),
    mode: "onChange",
    defaultValues: {
      ...userProfile,
      birthDate: dateFormat(new Date(userProfile.birthDate)),
    },
  });
  const {
    handleSubmit,
    formState: { dirtyFields },
  } = form;

  const onSubmit = async (data: z.infer<typeof ProfileUpdateFormSchema>) => {
    // console.log(data);
    type UserData = z.infer<typeof ProfileUpdateFormSchema>;
    type UpdateData = { [K in keyof UserData]: UserData[K] };
    const updatedData: any = {};

    Object.keys(dirtyFields).forEach((key) => {
      const fieldKey = key as keyof UserData; // 'key'를 'UserData'의 키로 타입 단언
      if (dirtyFields[fieldKey] && data[fieldKey] !== undefined) {
        updatedData[fieldKey] = data[fieldKey];
      }
    });

    if (Object.keys(updatedData).length > 0) {
      mutate({ accessToken, data: updatedData, userId });
    } else {
      console.log("No fields have been changed.");
    }
    // mutate({ accessToken, data, userId });
  };

  const { mutate } = useUserMutationFromAdmin();

  return (
    <Form {...form}>
      <form
        id="userInfoDialog"
        autoComplete="off"
        autoFocus={false}
        onSubmit={form.handleSubmit(onSubmit)}
        className="items-start w-full space-y-6"
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
                  // defaultValue={userProfile.name}
                  {...field}
                  // value={field.value ?? data.name}
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
                유저 상태 <span className="text-red-500">*</span>
              </FormLabel>
              <Select
                // value={field.value ?? data.departmentName}
                name={field.name}
                onValueChange={field.onChange}
                defaultValue={userProfile.level}
              >
                <SelectTrigger>
                  <SelectValue
                    onBlur={field.onBlur}
                    ref={field.ref}
                    placeholder="유저 상태 선택"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {/* <SelectLabel>부서명</SelectLabel> */}
                    {userLevelOptions.map((option) => (
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
          name="birthDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-bold">
                생년월일 <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input type="date" {...field} onChange={field.onChange} />
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
                  // defaultValue={userProfile.email}
                  {...field}
                  // value={field.value ?? data.email}
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
                <Input
                  {...field}
                  // defaultValue={userProfile.phoneNumber}
                  // value={field.value ?? data.phoneNumber}
                />
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
                  defaultValue={userProfile.churchName}
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
                // value={field.value ?? data.departmentName}
                name={field.name}
                onValueChange={field.onChange}
                defaultValue={userProfile.departmentName}
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
                // value={field.value ?? data.position}
                name={field.name}
                onValueChange={field.onChange}
                defaultValue={userProfile.position}
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
                  // defaultValue={userProfile.yearsOfService}
                  {...field}
                  // value={field.value ?? data.yearsOfService}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
