"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";

import {
  questionQueries,
  QuestionPatchFormSchema,
  type QuestionPatchFormValues,
} from "@/5.entities/question";
import { useEditQuestionMutation } from "@/4.features/edit-question";
import {
  Button,
  Input,
  Textarea,
  Spinner,
  toast,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/6.shared/ui";

type Props = {
  questionId: number;
};

export function QuestionEditPage({ questionId }: Props) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const accessToken = session?.user?.accessToken;

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const { data: post, isError, isLoading } = useQuery({
    ...questionQueries.detail(questionId),
    enabled: !!accessToken,
  });

  const form = useForm<QuestionPatchFormValues>({
    resolver: zodResolver(QuestionPatchFormSchema),
    mode: "onChange",
    defaultValues: {
      title: post?.title,
      content: post?.content,
    },
  });

  const {
    formState: { dirtyFields },
  } = form;

  const { mutate } = useEditQuestionMutation(questionId);

  const onSubmit = async (data: QuestionPatchFormValues) => {
    // Check if there are any dirty fields before calling mutate
    if (Object.keys(dirtyFields).length > 0) {
      mutate(data);
    } else {
      toast({
        title: "수정한 정보가 없습니다.",
        description: "정보를 수정하고 다시 시도해주세요.",
      });
    }
  };

  if (isError) {
    return <div>error</div>;
  }

  if (status === "loading" || isLoading || !post) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen">
        <Spinner size="large" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-3 md:p-10">
      <div className="text-2xl font-bold">질문 게시글 수정</div>
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
              수정하기
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
