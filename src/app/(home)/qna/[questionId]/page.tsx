"use client";

import { useSession } from "next-auth/react";
import { useFetchOneQnAQuery } from "../hooks/useQnaPostsQuery";
import Loading from "@/app/(lecture)/course/[courseId]/lecture/[lectureId]/loading";
import { dateAgoFormat, dateFormat } from "@/lib/dateFormat";
import { Button } from "@/components/ui/button";
import {
  useCommentDeleteMutation,
  useQnaDeleteMutation,
} from "../hooks/useQnaDeleteMutation";
import { toast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { CommentFormSchema } from "../lib/CommentFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useCommentMuation } from "../hooks/useQnaMutation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
  params: { questionId: string };
};

export default function Page({ params }: Props) {
  const { data: session } = useSession();
  const accessToken = session?.user.accessToken;

  const questionId = parseInt(params.questionId);

  const router = useRouter();

  const { data: post, isError } = useFetchOneQnAQuery(accessToken, questionId);
  const { mutate } = useQnaDeleteMutation(accessToken);
  const { mutate: commentMutate } = useCommentMuation(accessToken);
  const { mutate: commentDeleteMutate } = useCommentDeleteMutation(accessToken);

  const form = useForm<z.infer<typeof CommentFormSchema>>({
    resolver: zodResolver(CommentFormSchema),
    mode: "onChange",
    defaultValues: {
      content: "",
    },
  });

  const handleButton = async () => {
    if (confirm("정말로 삭제하시겠습니까?")) {
      try {
        mutate(questionId);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "요청이 불안정합니다..",
          description: "잠시 후 다시 시도해주세요.",
        });
        console.error("Failed to delete courses:", error);
      }
    } else {
      // User clicked 'Cancel'
      console.log("Deletion cancelled.");
    }
  };

  const deleteComment = async (answerId: number) => {
    if (confirm("정말로 삭제하시겠습니까?")) {
      // try {
      commentDeleteMutate(answerId);
      // } catch (error) {
      //   toast({
      //     variant: "destructive",
      //     title: "요청이 불안정합니다..",
      //     description: "잠시 후 다시 시도해주세요.",
      //   });
      //   console.error("Failed to delete courses:", error);
      // }
    } else {
      // User clicked 'Cancel'
      console.log("Deletion cancelled.");
    }
  };

  const onSubmit = async (data: z.infer<typeof CommentFormSchema>) => {
    commentMutate({ data, questionId });
    form.setValue("content", "");
  };

  if (isError) {
    return <div>error</div>;
  }

  if (!post) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-10">
      <div className="font-bold text-2xl mb-4">질문 게시판</div>
      <div className="flex flex-row justify-between w-full p-2 px-6 bg-gray-100 border-gray-300 border-y-2">
        <div className="text-xl font-bold">{post.title}</div>
        <div>{dateFormat(new Date(post.createdAt))}</div>
      </div>
      <div className="w-full p-2 px-4 border-b-2 border-gray-300">관리자</div>
      <div className="w-full p-8 border-b-2 border-gray-300">
        <div
          dangerouslySetInnerHTML={{
            __html: post.content.replace(/\n/g, "<br />"),
          }}
        />
      </div>

      {(session?.user.level === "admin" ||
        session?.user.level === "manager") && (
        <div className="flex flex-row justify-between w-full p-2">
          {session.user.id === post.user.userId && (
            <Button
              className="bg-blue-400"
              onClick={() => {
                router.push(`/qna/${questionId}/edit`);
              }}
            >
              수정
            </Button>
          )}
          <Button onClick={handleButton} className="bg-red-500">
            삭제
          </Button>
        </div>
      )}
      {/* 댓글이 보여지는 곳 */}
      <div className="h-[1px] w-full border-b-2 border-blue-900"></div>
      {/* <Separator color="blue" /> */}
      {post.answers.map((ele) => (
        <div
          key={ele.answerId}
          className="flex w-full items-start justify-start my-4"
        >
          <div className="flex justify-between w-full items-start space-x-4">
            <div className="flex space-x-2">
              <Avatar className="h-10 w-10 shrink-0">
                <AvatarFallback>{ele.user.name[0]}</AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <h3
                    className={`${
                      ele.user.level === "manager"
                        ? "text-blue-500"
                        : ele.user.level === "admin"
                        ? "text-red-500"
                        : null
                    }  font-medium`}
                  >
                    {ele.user.name}
                  </h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {dateAgoFormat(ele.createdAt.toString())}
                  </span>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  {ele.content}
                </p>
              </div>
            </div>

            <Trash2
              className="cursor-pointer hover:opacity-60"
              color="red"
              onClick={() => {
                deleteComment(ele.answerId);
              }}
            />
          </div>
        </div>
      ))}

      {/* 답변 등록하는 곳 */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-4 mt-4"
        >
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-bold">답변</FormLabel>
                <FormControl>
                  <Textarea
                    className="w-full rounded-md border border-gray-300 dark:border-gray-700 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400"
                    placeholder="답변을 남겨주세요"
                    rows={3}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="w-full">답변 등록</Button>
        </form>
      </Form>
    </div>
  );
}
