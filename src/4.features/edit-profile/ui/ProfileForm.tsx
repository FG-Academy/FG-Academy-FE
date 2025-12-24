"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import dayjs from "dayjs";
import {
  User as UserIcon,
  Mail,
  Phone,
  Calendar,
  Building2,
  Users,
  Briefcase,
  Clock,
  Church,
  Shield,
} from "lucide-react";

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  toast,
} from "@/6.shared/ui";
import { User, departments, positions } from "@/5.entities/user";
import {
  ProfileUpdateFormSchema,
  ProfileUpdateFormValues,
} from "../model/profile.schema";
import { useUpdateProfileMutation } from "../api/use-update-profile-mutation";
import { cn } from "@/6.shared/lib";

interface Props {
  userInfo: User;
}

export function ProfileForm({ userInfo }: Props) {
  const { update } = useSession();

  const form = useForm<ProfileUpdateFormValues>({
    resolver: zodResolver(ProfileUpdateFormSchema),
    mode: "onChange",
    defaultValues: {
      ...userInfo,
      birthDate: dayjs(userInfo.birthDate).format("YYYY-MM-DD"),
    },
  });

  const {
    formState: { dirtyFields, isSubmitting },
  } = form;

  const { mutate } = useUpdateProfileMutation();

  const onSubmit = async (data: ProfileUpdateFormValues) => {
    const updatedData: Partial<ProfileUpdateFormValues> = {};

    (Object.keys(dirtyFields) as Array<keyof ProfileUpdateFormValues>).forEach(
      (key) => {
        if (dirtyFields[key] && data[key] !== undefined) {
          (updatedData as Record<string, unknown>)[key] = data[key];
        }
      }
    );

    if (Object.keys(updatedData).length > 0) {
      const updatePayload: Record<string, unknown> = {};
      if (data.name !== undefined) {
        updatePayload.name = data.name;
      }
      if (data.level !== undefined) {
        updatePayload.level = data.level;
      }
      if (data.departmentName !== undefined) {
        updatePayload.department = data.departmentName;
      }

      update(updatePayload);
      mutate(updatedData);
    } else {
      toast({
        title: "수정된 정보가 없습니다.",
        description: "정보를 수정 후 다시 시도해주세요.",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        autoComplete="off"
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-2xl mx-auto"
      >
        {/* 기본 정보 섹션 */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <UserIcon className="w-4 h-4 text-primary-blue" />
              기본 정보
            </h3>
          </div>

          <div className="p-6 space-y-5">
            {/* 이름 */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                    <UserIcon className="w-3.5 h-3.5 text-gray-400" />
                    이름 <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      placeholder="이름을 입력해주세요"
                      className="h-11 rounded-xl border-gray-200 focus:border-primary-blue focus:ring-primary-blue/20"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 레벨 */}
            <FormField
              control={form.control}
              name="level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-gray-400" />
                    레벨
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled
                      autoComplete="off"
                      readOnly
                      className="h-11 rounded-xl bg-gray-50 border-gray-200 text-gray-500 cursor-not-allowed"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 생년월일 */}
            <FormField
              control={form.control}
              name="birthDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    생년월일 <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      className="h-11 rounded-xl border-gray-200 focus:border-primary-blue focus:ring-primary-blue/20"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </section>

        {/* 연락처 섹션 */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary-blue" />
              연락처
            </h3>
          </div>

          <div className="p-6 space-y-5">
            {/* 이메일 */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-gray-400" />
                    이메일 <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="이메일을 입력해주세요"
                      className="h-11 rounded-xl border-gray-200 focus:border-primary-blue focus:ring-primary-blue/20"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 핸드폰 번호 */}
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-gray-400" />
                    핸드폰 번호 <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="010-0000-0000"
                      className="h-11 rounded-xl border-gray-200 focus:border-primary-blue focus:ring-primary-blue/20"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </section>

        {/* 교회 정보 섹션 */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <Church className="w-4 h-4 text-primary-blue" />
              교회 정보
            </h3>
          </div>

          <div className="p-6 space-y-5">
            {/* 교회명 */}
            <FormField
              control={form.control}
              name="churchName"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-gray-400" />
                    교회명 <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={userInfo.churchName}
                      className="flex gap-4"
                    >
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem
                            value="fg"
                            className="border-gray-300 text-primary-blue"
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal text-gray-700 cursor-pointer">
                          꽃동산 교회
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem
                            value="others"
                            className="border-gray-300 text-primary-blue"
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal text-gray-700 cursor-pointer">
                          타교회
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 부서명 */}
            <FormField
              control={form.control}
              name="departmentName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-gray-400" />
                    부서명 <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select
                    name={field.name}
                    onValueChange={field.onChange}
                    defaultValue={userInfo.departmentName}
                  >
                    <SelectTrigger className="h-11 rounded-xl border-gray-200 focus:border-primary-blue focus:ring-primary-blue/20">
                      <SelectValue
                        onBlur={field.onBlur}
                        ref={field.ref}
                        placeholder="부서를 선택해주세요"
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

            {/* 직분 */}
            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-gray-400" />
                    직분 <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select
                    name={field.name}
                    onValueChange={field.onChange}
                    defaultValue={userInfo.position}
                  >
                    <SelectTrigger className="h-11 rounded-xl border-gray-200 focus:border-primary-blue focus:ring-primary-blue/20">
                      <SelectValue
                        onBlur={field.onBlur}
                        ref={field.ref}
                        placeholder="직분을 선택해주세요"
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

            {/* 교사 근속년수 */}
            <FormField
              control={form.control}
              name="yearsOfService"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    교사 근속년수 <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="number"
                        min={0}
                        placeholder="0"
                        className="h-11 rounded-xl border-gray-200 focus:border-primary-blue focus:ring-primary-blue/20 pr-10"
                        {...field}
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                        년
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </section>

        {/* 제출 버튼 */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            "w-full h-12 rounded-xl text-base font-semibold transition-all",
            "bg-primary-blue hover:bg-primary-blue/90",
            "shadow-lg shadow-primary-blue/25 hover:shadow-xl hover:shadow-primary-blue/30",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        >
          {isSubmitting ? "수정 중..." : "회원정보 수정하기"}
        </Button>
      </form>
    </Form>
  );
}
