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
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { AnswerFormSchema } from "../lib/AnswerFornSchema";
import { useSubmitDescriptiveAnswerMutation } from "../hooks/useSubmitDescriptiveAnswerMutation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

type Props = {
  quizId: number;
  question: string;
};

export default function DescriptiveQuizForm({ quizId, question }: Props) {
  const { data: session } = useSession();
  const accessToken = session?.user.accessToken as string;

  const form = useForm<z.infer<typeof AnswerFormSchema>>({
    resolver: zodResolver(AnswerFormSchema),
    mode: "onSubmit",
    defaultValues: {
      descriptiveAnswer: "",
    },
  });

  const { mutate } = useSubmitDescriptiveAnswerMutation(accessToken, quizId);

  const onSubmit = async (data: z.infer<typeof AnswerFormSchema>) => {
    mutate(data);
  };
  // console.log(quizId);

  useEffect(() => {
    form.reset();
  }, [quizId]);

  return (
    <Form {...form}>
      <form
        autoComplete="off"
        autoFocus={false}
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex border shadow-sm flex-col w-full p-10 overflow-y-auto"
      >
        <div className="flex flex-col justify-between p-2 space-y-2 overflow-y-auto w-full">
          <FormField
            control={form.control}
            name="descriptiveAnswer"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-bold whitespace-pre-line">
                  {question} <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="주관식 정답을 입력해주세요."
                    className="resize-none h-[200px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className="w-full mt-10" type="submit">
          정답 제출
        </Button>
      </form>
    </Form>
  );
}
