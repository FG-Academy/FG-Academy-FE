"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { QuestionFormSchema, type QuestionFormValues } from "@/5.entities/question";
import { useCreateQuestionMutation } from "@/4.features/create-question";
import {
  Button,
  Input,
  Textarea,
  Spinner,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/6.shared/ui";

export function QuestionCreatePage() {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const form = useForm<QuestionFormValues>({
    resolver: zodResolver(QuestionFormSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const { mutate } = useCreateQuestionMutation();

  const onSubmit = async (data: QuestionFormValues) => {
    mutate(data);
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center w-full min-h-screen">
        <Spinner size="large" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-3 md:p-10">
      <div className="text-2xl font-bold">질문 게시글 작성</div>
      <div className=" w-full md:w-1/2">
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
                    내용 <span className="text-red-500">*</span>
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
