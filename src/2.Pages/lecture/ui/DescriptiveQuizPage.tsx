"use client";

import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { quizQueries, type QuizWithDetails } from "@/5.entities/quiz";
import { Loading } from "@/6.shared/ui";
import {
  DescriptiveQuizForm,
  SubmittedDescriptiveQuiz,
} from "@/4.features/submit-quiz-answer";

export function DescriptiveQuizPage() {
  const searchParams = useSearchParams();
  const currentQuizId = parseInt(searchParams.get("quizId") as string);

  const { data: quiz } = useQuery<QuizWithDetails>(
    quizQueries.detail(currentQuizId)
  );

  if (!quiz) {
    return <Loading />;
  }

  return (
    <div className="w-full h-full space-y-2 justify-center items-center p-10 overflow-y-auto">
      <h1 className="text-xl text-center">[실행과제]</h1>
      <h2 className="text-lg text-center">
        강의 내용에 대한 문제를 정확한 용어와 표현을 사용하여 설명해보세요.
      </h2>
      {quiz.quizSubmits.length > 0 ? (
        <SubmittedDescriptiveQuiz
          quizId={quiz.quizId}
          question={quiz.question}
          submittedQuiz={quiz.quizSubmits[0]}
        />
      ) : (
        <DescriptiveQuizForm quizId={quiz.quizId} question={quiz.question} />
      )}
    </div>
  );
}
