"use client";

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Textarea,
} from "@/6.shared/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import {
  DescriptiveAnswerSchema,
  type DescriptiveAnswerFormValues,
} from "../model/descriptive-answer.schema";
import { useSubmitDescriptiveMutation } from "../api/use-submit-descriptive-mutation";

interface DescriptiveQuizFormProps {
  quizId: number;
  question: string;
}

export function DescriptiveQuizForm({
  quizId,
  question,
}: DescriptiveQuizFormProps) {
  const form = useForm<DescriptiveAnswerFormValues>({
    resolver: zodResolver(DescriptiveAnswerSchema),
    mode: "onSubmit",
    defaultValues: {
      descriptiveAnswer: "",
    },
  });

  const { mutate } = useSubmitDescriptiveMutation({ quizId });

  const onSubmit = async (data: DescriptiveAnswerFormValues) => {
    mutate(data);
  };

  useEffect(() => {
    form.reset();
  }, [quizId, form]);

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
