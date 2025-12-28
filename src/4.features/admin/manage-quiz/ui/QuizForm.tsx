"use client";

import { useState } from "react";
import { Label } from "@/6.shared/ui/shadcn/ui/label";
import { Textarea } from "@/6.shared/ui/shadcn/ui/textarea";
import { Input } from "@/6.shared/ui/shadcn/ui/input";
import { Button } from "@/6.shared/ui/shadcn/ui/button";
import { Checkbox } from "@/6.shared/ui/shadcn/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/6.shared/ui/shadcn/ui/select";
import { Check, Minus, Plus } from "lucide-react";
import type { AdminLectureQuiz, QuizChoiceItem } from "@/5.entities/admin/quiz";
import {
  useCreateQuizMutation,
  useUpdateQuizMutation,
} from "../api/quiz.mutations";

interface QuizFormProps {
  mode: "create" | "edit";
  lectureId?: number;
  quizId?: number;
  initialData?: AdminLectureQuiz;
  onSuccess?: () => void;
}

export function QuizForm({
  mode,
  lectureId,
  quizId,
  initialData,
  onSuccess,
}: QuizFormProps) {
  const isEdit = mode === "edit";

  const [question, setQuestion] = useState(initialData?.question ?? "");
  const [quizType, setQuizType] = useState<"multiple" | "descriptive">(
    (initialData?.quizType as "multiple" | "descriptive") ?? "multiple"
  );
  const [choices, setChoices] = useState<QuizChoiceItem[]>(
    initialData?.quizAnswers.map((answer) => ({
      item: answer.item,
      isAnswer: !!answer.isAnswer,
    })) ?? []
  );

  const createMutation = useCreateQuizMutation(onSuccess);
  const updateMutation = useUpdateQuizMutation(onSuccess);

  const addChoice = () => {
    setChoices([...choices, { item: "", isAnswer: false }]);
  };

  const removeChoice = (index: number) => {
    const newChoices = choices.filter((_, i) => i !== index);
    setChoices(newChoices);
  };

  const toggleCorrectAnswer = (index: number) => {
    const updatedChoices = choices.map((choice, i) => {
      if (i === index) {
        return { ...choice, isAnswer: !choice.isAnswer };
      }
      return choice;
    });
    setChoices(updatedChoices);
  };

  const updateChoiceText = (index: number, text: string) => {
    const newChoices = [...choices];
    newChoices[index] = { ...newChoices[index], item: text };
    setChoices(newChoices);
  };

  const handleQuizTypeChange = (newType: "multiple" | "descriptive") => {
    setQuizType(newType);
    if (newType === "descriptive") {
      setChoices([]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const quizInfo =
      quizType === "multiple"
        ? choices.map((choice, index) => ({
            itemIndex: index + 1,
            item: choice.item,
            isAnswer: choice.isAnswer,
          }))
        : [];

    const data = { question, quizType, quizInfo };

    if (isEdit && quizId) {
      updateMutation.mutate({ quizId, data });
    } else if (lectureId) {
      createMutation.mutate({ lectureId, data });
    }
  };

  const isLoading = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="flex-1 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          {isEdit ? "퀴즈 수정하기" : "퀴즈 등록하기"}
        </h1>
      </div>
      <form className="grid gap-4" onSubmit={handleSubmit}>
        {/* Quiz Question */}
        <div className="grid gap-1">
          <Label htmlFor="question">퀴즈 내용</Label>
          <Textarea
            id="question"
            placeholder="퀴즈 내용을 입력해주세요..."
            rows={3}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>

        {/* Quiz Type */}
        <div className="grid gap-1">
          <Label htmlFor="type">퀴즈 유형</Label>
          <Select value={quizType} onValueChange={handleQuizTypeChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="유형을 선택하세요" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="multiple">객관식</SelectItem>
              <SelectItem value="descriptive">주관식</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Multiple Choice Options */}
        {quizType === "multiple" && (
          <div className="grid gap-4">
            <div>
              <Label htmlFor="choices">객관식 문항</Label>
              <div className="grid gap-2 mt-2">
                {choices.map((choice, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Checkbox
                      checked={choice.isAnswer}
                      onCheckedChange={() => toggleCorrectAnswer(index)}
                    />
                    <Input
                      id={`choice-${index + 1}`}
                      placeholder={`선택지 ${index + 1}`}
                      value={choice.item}
                      onChange={(e) => updateChoiceText(index, e.target.value)}
                    />
                    {index > 0 && (
                      <Button
                        size="icon"
                        variant="outline"
                        type="button"
                        onClick={() => removeChoice(index)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button variant="secondary" type="button" onClick={addChoice}>
                  <Plus className="h-4 w-4 mr-2" />
                  선택지 추가
                </Button>
              </div>
              <div className="flex mt-2 flex-row items-center text-muted-foreground">
                <Check className="w-5 h-5" />
                <p className="text-sm ml-2">
                  정답으로 설정할 선택지에 체크해주세요!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <Button
          className="bg-blue-500 hover:bg-blue-600"
          type="submit"
          disabled={isLoading}
        >
          {isLoading
            ? "처리중..."
            : isEdit
            ? "퀴즈 수정"
            : "퀴즈 등록"}
        </Button>
      </form>
    </div>
  );
}
