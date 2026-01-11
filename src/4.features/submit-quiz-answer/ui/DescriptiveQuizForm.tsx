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

  const { mutate, isPending } = useSubmitDescriptiveMutation({ quizId });

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
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col w-full"
      >
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="descriptiveAnswer"
            render={({ field }) => (
              <FormItem className="space-y-4">
                <div className="bg-zinc-50 p-6 rounded-lg border border-zinc-100">
                  <FormLabel className="text-lg font-bold text-zinc-800 whitespace-pre-line leading-relaxed block">
                    Q. {question} <span className="text-red-500">*</span>
                  </FormLabel>
                </div>
                
                <FormControl>
                  <Textarea
                    placeholder="내용을 입력해주세요 (최소 10자 이상)"
                    className="min-h-[240px] p-4 text-base resize-none focus-visible:ring-blue-500 bg-white border-zinc-200"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        </div>
        
        <div className="mt-8">
          <Button 
            className="w-full h-12 text-base font-bold bg-blue-600 hover:bg-blue-700 transition-all shadow-md" 
            type="submit"
            disabled={isPending}
          >
            {isPending ? "제출 중..." : "정답 제출하기"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
