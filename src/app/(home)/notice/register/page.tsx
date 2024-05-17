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
import { useSession } from "next-auth/react";
import { PostFormSchema } from "../lib/PostFormSchema";
import { useQnaPostsMutation } from "../hooks/useQnaPostsMutation";
import { Textarea } from "@/components/ui/textarea";

export default function Page() {
  const { data: session } = useSession();
  const accessToken = session?.user.accessToken;

  const form = useForm<z.infer<typeof PostFormSchema>>({
    resolver: zodResolver(PostFormSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const { mutate } = useQnaPostsMutation(accessToken);

  const onSubmit = async (data: z.infer<typeof PostFormSchema>) => {
    mutate(data);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-10">
      <div className="text-2xl font-bold">공지사항 작성</div>
      <div className="w-1/2">
        <Form {...form}>
          <form
            autoComplete="off"
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col w-full h-full p-10 space-y-6"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-bold">
                    제목 <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      placeholder="제목을 입력해주세요."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-bold">
                    제목 <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="h-[400px] resize-none"
                      autoComplete="off"
                      placeholder="내용을 입력해주세요."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full" type="submit">
              등록하기
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
