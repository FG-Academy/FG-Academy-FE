"use client";

import { useState } from "react";
import { Label } from "@/6.shared/ui/shadcn/ui/label";
import { Textarea } from "@/6.shared/ui/shadcn/ui/textarea";
import { Input } from "@/6.shared/ui/shadcn/ui/input";
import { Button } from "@/6.shared/ui/shadcn/ui/button";
import { Badge } from "@/6.shared/ui/shadcn/ui/badge";
import { Separator } from "@/6.shared/ui/shadcn/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/6.shared/ui/shadcn/ui/select";
import {
  Check,
  Minus,
  Plus,
  HelpCircle,
  Save,
  Loader2,
  ListChecks,
  AlignLeft,
} from "lucide-react";
import type { AdminLectureQuiz, QuizChoiceItem } from "@/5.entities/admin/quiz";
import {
  useCreateQuizMutation,
  useUpdateQuizMutation,
} from "../api/quiz.mutations";
import { cn } from "@/6.shared/lib/utils";

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
    })) ?? [
      { item: "", isAnswer: false },
      { item: "", isAnswer: false },
    ]
  );

  const createMutation = useCreateQuizMutation(onSuccess);
  const updateMutation = useUpdateQuizMutation(onSuccess);

  const addChoice = () => {
    setChoices([...choices, { item: "", isAnswer: false }]);
  };

  const removeChoice = (index: number) => {
    if (choices.length <= 2) return;
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
    } else if (choices.length === 0) {
      setChoices([
        { item: "", isAnswer: false },
        { item: "", isAnswer: false },
      ]);
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
    <div className="flex flex-col h-full bg-background">
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <div className="flex items-center gap-2">
          <div
            className={cn(
              "p-2 rounded-lg",
              isEdit
                ? "bg-amber-100 text-amber-600"
                : "bg-blue-100 text-blue-600"
            )}
          >
            {isEdit ? (
              <Save className="w-5 h-5" />
            ) : (
              <Plus className="w-5 h-5" />
            )}
          </div>
          <div>
            <h1 className="text-lg font-bold leading-none">
              {isEdit ? "퀴즈 수정하기" : "새 퀴즈 등록"}
            </h1>
            <p className="text-xs text-muted-foreground mt-1">
              {isEdit
                ? "기존 퀴즈 정보를 수정합니다."
                : "강의에 새로운 퀴즈를 추가합니다."}
            </p>
          </div>
        </div>
        <Badge variant="outline" className="px-3 py-1 bg-muted/50">
          {quizType === "multiple" ? "객관식" : "주관식"}
        </Badge>
      </div>

      <div className="flex-1 overflow-y-auto">
        <form id="quiz-form" className="p-6 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-3">
            <Label
              htmlFor="question"
              className="text-base font-medium flex items-center gap-2"
            >
              <HelpCircle className="w-4 h-4 text-primary" />
              퀴즈 질문
            </Label>
            <div className="relative">
              <Textarea
                id="question"
                placeholder="학습자에게 질문할 내용을 구체적으로 작성해주세요."
                className="min-h-[120px] resize-y text-base p-4 shadow-sm border-muted-foreground/20 focus-visible:ring-primary/20 transition-all"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="type" className="text-base font-medium">
                퀴즈 유형
              </Label>
              <Select value={quizType} onValueChange={handleQuizTypeChange}>
                <SelectTrigger className="w-full h-11 border-muted-foreground/20 shadow-sm">
                  <SelectValue placeholder="유형을 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="multiple">
                    <div className="flex items-center gap-2">
                      <ListChecks className="w-4 h-4 text-blue-500" />
                      <span>객관식 (선택형)</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="descriptive">
                    <div className="flex items-center gap-2">
                      <AlignLeft className="w-4 h-4 text-orange-500" />
                      <span>주관식 (서술형)</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="bg-muted/30 rounded-lg p-4 text-sm text-muted-foreground border border-dashed flex items-center">
              {quizType === "multiple" ? (
                <p>
                  <span className="font-semibold text-foreground">객관식:</span>{" "}
                  여러 선택지 중 정답을 고르는 방식입니다. 자동 채점이
                  가능합니다.
                </p>
              ) : (
                <p>
                  <span className="font-semibold text-foreground">주관식:</span>{" "}
                  학습자가 직접 답안을 작성하는 방식입니다. 강사가 직접 채점해야
                  합니다.
                </p>
              )}
            </div>
          </div>

          {quizType === "multiple" && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="choices"
                  className="text-base font-medium flex items-center gap-2"
                >
                  <ListChecks className="w-4 h-4 text-primary" />
                  선택지 관리
                </Label>
                <div className="text-xs text-muted-foreground flex items-center gap-1 bg-amber-50 text-amber-700 px-2 py-1 rounded-md border border-amber-100">
                  <Check className="w-3 h-3" />
                  정답 항목의 체크박스를 선택해주세요
                </div>
              </div>

              <div className="space-y-3">
                {choices.map((choice, index) => (
                  <div
                    key={index}
                    className={cn(
                      "group flex items-center gap-3 p-2 rounded-lg border-2 transition-all duration-200",
                      choice.isAnswer
                        ? "border-green-500/30 bg-green-50/30"
                        : "border-transparent bg-muted/30 hover:bg-muted/50"
                    )}
                  >
                    <div className="flex items-center justify-center w-8 h-8 shrink-0">
                      <span className="text-xs font-mono text-muted-foreground">
                        {index + 1}
                      </span>
                    </div>

                    <div className="flex-1">
                      <Input
                        id={`choice-${index + 1}`}
                        placeholder={`선택지 ${index + 1} 내용을 입력하세요`}
                        value={choice.item}
                        onChange={(e) =>
                          updateChoiceText(index, e.target.value)
                        }
                        className="bg-transparent border-0 shadow-none focus-visible:ring-0 px-0 h-9 font-medium"
                      />
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        className={cn(
                          "flex items-center gap-1.5 px-2 py-1.5 rounded-md transition-colors select-none",
                          choice.isAnswer
                            ? "bg-green-100 text-green-700"
                            : "bg-transparent text-muted-foreground hover:bg-muted"
                        )}
                        onClick={() => toggleCorrectAnswer(index)}
                      >
                        <div
                          className={cn(
                            "w-4 h-4 rounded border-2 flex items-center justify-center transition-colors",
                            choice.isAnswer
                              ? "bg-green-600 border-green-600"
                              : "border-muted-foreground/40"
                          )}
                        >
                          {choice.isAnswer && (
                            <Check className="w-3 h-3 text-white" />
                          )}
                        </div>
                        <span className="text-xs font-medium">정답</span>
                      </button>

                      <Button
                        size="icon"
                        variant="ghost"
                        type="button"
                        onClick={() => removeChoice(index)}
                        disabled={choices.length <= 2}
                        className={cn(
                          "h-8 w-8 text-muted-foreground hover:text-red-600 hover:bg-red-50",
                          choices.length <= 2 && "opacity-30 cursor-not-allowed"
                        )}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                variant="outline"
                type="button"
                onClick={addChoice}
                className="w-full border-dashed border-2 py-6 hover:border-primary/50 hover:bg-primary/5 text-muted-foreground hover:text-primary transition-all"
              >
                <Plus className="h-4 w-4 mr-2" />
                새로운 선택지 추가하기
              </Button>
            </div>
          )}
        </form>
      </div>

      <div className="p-4 border-t bg-muted/10 flex justify-end gap-3">
        <Button
          className={cn(
            "min-w-[120px] transition-all",
            isLoading ? "opacity-80" : "hover:shadow-md"
          )}
          type="submit"
          form="quiz-form"
          disabled={isLoading || !question.trim()}
          size="lg"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              저장 중...
            </>
          ) : isEdit ? (
            <>
              <Save className="mr-2 h-4 w-4" />
              변경사항 저장
            </>
          ) : (
            <>
              <Plus className="mr-2 h-4 w-4" />
              퀴즈 등록하기
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
