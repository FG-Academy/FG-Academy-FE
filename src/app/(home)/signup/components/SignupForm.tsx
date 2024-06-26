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
import { departments, positions } from "../../../types/type";
import { UserFormWithEmailSchema } from "../lib/UserFormSchema";
import { useUserCreateMutation } from "../hook/useCreateUserMutation";
import { ClockLoader } from "react-spinners";
import { useEmailVerifyMutation } from "../hook/useEmailVerifyMutation";
import EmailVerification from "./EmailVerification";
import useEmailVerifyStore from "@/store/useEmailVerifyStore";
import { toast } from "@/components/ui/use-toast";

export function InputForm() {
  const { isVerificationSent, setLoading, isLoading } = useEmailVerifyStore(
    (state) => state
  );

  const form = useForm<z.infer<typeof UserFormWithEmailSchema>>({
    resolver: zodResolver(UserFormWithEmailSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      birthDate: "",
      password: "",
      passwordVerify: "",
      phoneNumber: "",
      churchName: "fg",
      yearsOfService: 0,
      isEmailValid: false,
    },
  });

  const { mutate } = useUserCreateMutation();
  const { mutate: emailMutate } = useEmailVerifyMutation(form);

  const handleEmailVerification = () => {
    setLoading(true);
    const inputEmail = form.getValues("email");
    emailMutate(inputEmail);
  };

  const onSubmit = async (data: z.infer<typeof UserFormWithEmailSchema>) => {
    // if (!form.getValues("isEmailValid")) {
    //   toast({
    //     title: "이메일 인증을 완료해주세요.",
    //     variant: "destructive",
    //     duration: 3000,
    //   });
    //   return;
    // }
    mutate({ data });
  };

  return (
    <Form {...form}>
      <form
        autoComplete="off"
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-10/12 md:w-2/5 space-y-6"
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
                <Input
                  // autoComplete="off"
                  placeholder="이메일을 입력해주세요."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="button"
          onClick={handleEmailVerification}
          disabled={isVerificationSent}
          className={`mt-2 w-full py-6 text-base bg-blue-500 hover:bg-blue-600`}
        >
          {isLoading ? (
            <ClockLoader size={30} className="mx-auto" color="#ffffff" />
          ) : (
            <div className="mx-auto">
              {isVerificationSent ? "인증 코드 확인 완료" : "이메일 인증하기"}
            </div>
          )}
        </Button>
        {isVerificationSent && (
          <EmailVerification email={form.getValues("email")} />
        )}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-bold">
                비밀번호 <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input autoComplete="new-password" type="password" {...field} />
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
                <Input type="password" {...field} />
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
        <FormField
          control={form.control}
          name="departmentName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-bold">
                부서명 <span className="text-red-500">*</span>
              </FormLabel>
              <Select
                value={field.value}
                name={field.name}
                onValueChange={field.onChange}
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
                value={field.value}
                name={field.name}
                onValueChange={field.onChange}
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
        <FormField
          control={form.control}
          name="isEmailValid"
          render={({ field }) => (
            <FormItem>
              <FormMessage>
                {!field.value && "이메일 인증을 완료해주세요."}
              </FormMessage>
            </FormItem>
          )}
        />

        <Button className="w-full" type="submit">
          회원가입
        </Button>
      </form>
    </Form>
  );
}
