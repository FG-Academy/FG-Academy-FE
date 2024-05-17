"use client";

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
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signIn, useSession } from "next-auth/react";

const FormSchema = z.object({
  nameBirthId: z.string().min(1, {
    message: "아이디를 입력해주세요.",
  }),
  password: z.string().min(1, {
    message: "비밀번호는 영문, 숫자를 포함하여 8자 이상이어야 합니다.",
  }),
});

export default function LoginForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onSubmit",
    defaultValues: {
      nameBirthId: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const response = await signIn("credentials", {
        nameBirthId: data.nameBirthId,
        password: data.password,
        // redirect: false,
        redirect: false,
        // callbackUrl: `/`,
      });
      if (response?.error) {
        toast({
          variant: "destructive",
          title: "아이디와 비밀번호가 일치하지 않습니다.",
          description: "아이디와 비밀번호를 다시 한 번 확인해주세요.",
        });
      } else {
        router.push("/");
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
    <div className="flex flex-col items-center justify-center w-full px-1">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
          <FormField
            control={form.control}
            name="nameBirthId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-bold">
                  아이디 <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="아이디는 자신의 '이름+생일4자리'입니다. ex)꽃동산1225"
                    {...field}
                  />
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
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="w-full" type="submit">
            로그인
          </Button>
        </form>
      </Form>
    </div>
  );
}
