import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { IQuizSubmit } from "@/model/quiz";
import { useForm } from "react-hook-form";
import { AnswerFormSchema } from "../lib/AnswerFornSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useSubmitDescriptiveAnswerMutation } from "../hooks/useSubmitDescriptiveAnswerMutation";
import { toast } from "@/components/ui/use-toast";

type Props = {
  quizId: number;
  question: string;
  submittedQuiz: IQuizSubmit;
};

export default function SubmittedDescriptiveQuiz({
  quizId,
  question,
  submittedQuiz,
}: Props) {
  const { data: session } = useSession();
  const accessToken = session?.user.accessToken as string;

  const [retry, setRetry] = useState(false);

  const form = useForm<z.infer<typeof AnswerFormSchema>>({
    resolver: zodResolver(AnswerFormSchema),
    mode: "onSubmit",
    defaultValues: {
      descriptiveAnswer: submittedQuiz.answer as string,
    },
  });
  const {
    formState: { dirtyFields },
  } = form;

  const { mutate } = useSubmitDescriptiveAnswerMutation(accessToken, quizId);

  const onSubmit = async (data: z.infer<typeof AnswerFormSchema>) => {
    if (!dirtyFields["descriptiveAnswer"]) {
      toast({
        title: "제출한 정답이 수정되지 않았습니다.",
        variant: "destructive",
        description: "정답을 수정하고 다시 시도해주세요.",
      });
      return;
    }

    mutate(data);
    setRetry(false);
  };

  return (
    <Form {...form}>
      <form
        autoComplete="off"
        autoFocus={false}
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex border shadow-sm flex-col w-full p-10 overflow-y-auto"
      >
        <div className="flex flex-col p-1 justify-between space-y-2 overflow-y-auto w-full">
          <FormField
            control={form.control}
            name="descriptiveAnswer"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold text-lg">
                  {question} <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea disabled={!retry} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {submittedQuiz.feedbackComment && (
          <div
            className={`mt-8
              ${submittedQuiz.status === 1 ? "text-blue-500" : "text-red-500"}`}
          >
            {" "}
            피드백 내용: {submittedQuiz.feedbackComment}
          </div>
        )}
        {retry ? (
          <Button
            disabled={submittedQuiz.status === 1 || submittedQuiz.status === 0}
            className="w-full mt-10"
            type="submit"
          >
            제출하기
          </Button>
        ) : (
          <div
            className={`rounded-md text-center flex justify-center items-center mt-10 p-2 ${
              submittedQuiz.status === 2
                ? "bg-blue-500 cursor-pointer"
                : "bg-gray-500 cursor-not-allowed"
            } text-white`}
            aria-disabled={!retry}
            onClick={() => {
              if (submittedQuiz.status === 2) {
                setRetry(true);
              }
            }}
          >
            {submittedQuiz.status === 0
              ? "미채점"
              : submittedQuiz.status === 1
              ? "채점 완료(정답)"
              : submittedQuiz.status === 2
              ? "다시 풀기"
              : ""}
          </div>
        )}
      </form>
    </Form>
  );
}
