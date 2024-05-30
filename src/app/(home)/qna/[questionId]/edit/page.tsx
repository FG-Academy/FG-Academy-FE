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
import { Textarea } from "@/components/ui/textarea";
import { useFetchOneQnAQuery } from "../../hooks/useQnaPostsQuery";
import Loading from "@/app/(lecture)/course/[courseId]/lecture/[lectureId]/loading";
import { useQnaPatchMutation } from "../../hooks/useQnaPatchMutation";
import { PostPatchFormSchema } from "../../lib/PostFormSchema";
import { toast } from "@/components/ui/use-toast";

type Props = {
  params: { questionId: string };
};

export default function Page({ params }: Props) {
  const { data: session } = useSession();
  const accessToken = session?.user.accessToken;

  const questionId = parseInt(params.questionId);

  const { data: post, isError } = useFetchOneQnAQuery(accessToken, questionId);

  const form = useForm<z.infer<typeof PostPatchFormSchema>>({
    resolver: zodResolver(PostPatchFormSchema),
    mode: "onChange",
    defaultValues: {
      title: post?.title,
      content: post?.content,
    },
  });

  const {
    formState: { dirtyFields },
  } = form;

  const { mutate } = useQnaPatchMutation(accessToken, questionId);

  const onSubmit = async (data: z.infer<typeof PostPatchFormSchema>) => {
    // Check if there are any dirty fields before calling mutate
    if (Object.keys(dirtyFields).length > 0) {
      mutate({ data });
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

  if (!post) {
    return <Loading />;
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
