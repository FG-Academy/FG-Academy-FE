"use client";

import { Button } from "@/app/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import { toast } from "@/app/components/ui/use-toast";
import { useAuthStore } from "@/store/useAuthStore";
// import { setCookie } from "@/util/cookieUtil";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { setCookie } from "cookies-next";

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
  // const { accessToken, setAccessToken, setAuthentication } = useAuthStore(
  //   (state) => state
  // );

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onSubmit",
    defaultValues: {
      nameBirthId: "",
      password: "",
    },
  });

  async function login(data: z.infer<typeof FormSchema>) {
    const response = await fetch("http://localhost:3000/auth/sign-in", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response;
  }

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const response = await login(data);

      if (!response.ok) {
        toast({
          variant: "destructive",
          title: "아이디나 비밀번호가 틀립니다.",
          description: "정보를 다시 한 번 확인해주세요.",
        });
      } else {
        const data = await response.json();
        console.log(data);
        localStorage.setItem("accessToken", data.accessToken);
        // setAccessToken(data.accessToken);
        // setCookie("refreshToken", data.refreshToken);
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
    <div className="w-4/5 flex flex-col justify-center items-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/5 space-y-6"
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
