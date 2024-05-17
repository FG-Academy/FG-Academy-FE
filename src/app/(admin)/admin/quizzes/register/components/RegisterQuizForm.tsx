"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  CheckIcon,
  MinusIcon,
  PlusIcon,
} from "@/app/(home)/myDashboard/components/svg";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { useSession } from "next-auth/react";
import { useQuizMutation } from "../hook/useQuizMutation";
import { LectureQuizResponse } from "../../hooks/useQuizQuery";

interface Props {
  isEdit: boolean;
  lectureId?: number;
  quizId?: number;
  quizData?: LectureQuizResponse;
}

export default function RegisterQuizForm({
  isEdit,
  quizId,
  lectureId,
  quizData,
}: Props) {
  const { data: session } = useSession();
  const accessToken = session?.user.accessToken;

  const [question, setQuestion] = useState(
    isEdit && quizData ? quizData.question : ""
  );
  const [quizType, setQuizType] = useState(
    isEdit && quizData ? quizData.quizType : "multiple"
  );
  const [choices, setChoices] = useState<{ item: string; isAnswer: boolean }[]>(
    isEdit && quizData
      ? quizData?.quizAnswers.map((info) => ({
          item: info.item,
          isAnswer: info.isAnswer,
        }))
      : []
  );

  const [correctAnswers, setCorrectAnswers] = useState<Array<any>>(
    isEdit && quizData
      ? quizData?.quizAnswers
          .filter((info) => info.isAnswer)
          .map((info) => info.itemIndex - 1)
      : []
  );

  const { mutate } = useQuizMutation(accessToken, isEdit, lectureId, quizId);

  const addChoice = () => {
    setChoices([...choices, { item: "", isAnswer: false }]);
  };

  const removeChoice = (index: number) => {
    const newChoices = [...choices];
    newChoices.splice(index, 1);
    setChoices(newChoices);

    const newCorrectAnswers = correctAnswers.filter(
      (answerIndex) => answerIndex !== index
    );
    setCorrectAnswers(newCorrectAnswers);
  };

  const toggleCorrectAnswer = (index: number) => {
    const updatedChoices = choices.map((choice, i) => {
      if (i === index) {
        return { ...choice, isAnswer: !choice.isAnswer };
      }
      return choice;
    });
    setChoices(updatedChoices);

    if (choices[index].isAnswer) {
      setCorrectAnswers(
        correctAnswers.filter((answerIndex) => answerIndex !== index)
      );
    } else {
      setCorrectAnswers([...correctAnswers, index]);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    let quizInfo: Array<any> = [];
    if (quizType === "multiple") {
      quizInfo = choices.map((choice, index) => ({
        itemIndex: index + 1,
        item: choice.item,
        isAnswer: choice.isAnswer,
      }));
    }
    // const quizData = { lectureId, question, quizType, quizInfo };

    mutate({ question, quizType, quizInfo });
  };

  const handleQuizTypeChange = (newType: string) => {
    setQuizType(newType);
    if (newType === "descriptive") {
      setChoices([]);
      setCorrectAnswers([]);
    }
  };

  return (
    <div className="flex-1 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">퀴즈 등록하기</h1>
      </div>
      <form className="grid gap-4" onSubmit={handleSubmit}>
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
        <div className="grid gap-1">
          <Label htmlFor="type">퀴즈 유형</Label>
          <Select
            value={quizType}
            onValueChange={(e) => handleQuizTypeChange(e)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="multiple">객관식</SelectItem>
              <SelectItem value="descriptive">주관식</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div
          className={`grid gap-4 ${quizType === "multiple" ? "" : "hidden"}`}
          id="multiple-choice"
        >
          <div>
            <Label htmlFor="choices">객관식 문항</Label>
            <div className="grid gap-2">
              {choices.map((choice, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Checkbox
                    checked={choice.isAnswer}
                    onCheckedChange={() => toggleCorrectAnswer(index)}
                  />
                  <Input
                    id={`choice-${index + 1}`}
                    placeholder={`Choice ${index + 1}`}
                    value={choice.item}
                    onChange={(e) => {
                      const newChoices = [...choices];
                      newChoices[index] = {
                        ...newChoices[index],
                        item: e.target.value,
                      };
                      setChoices(newChoices);
                    }}
                  />

                  {index > 0 && (
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={(e) => {
                        e.preventDefault();
                        removeChoice(index);
                      }}
                    >
                      <MinusIcon className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                variant="secondary"
                onClick={(e) => {
                  e.preventDefault();
                  addChoice();
                }}
              >
                <PlusIcon className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex mt-2 flex-row">
              <CheckIcon className="w-6 h-6" />
              <p className="text-base ml-2">
                정답으로 설정할 선택지에 체크해주세요!
              </p>
            </div>
          </div>
        </div>
        <Button className="bg-blue-300 hover:bg-blue-500" type="submit">
          퀴즈 등록
        </Button>
      </form>
    </div>
  );
}
