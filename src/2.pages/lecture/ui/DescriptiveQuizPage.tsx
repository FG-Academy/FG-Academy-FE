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
    <div className="w-full h-full bg-zinc-50 overflow-y-auto">
      <div className="max-w-3xl mx-auto my-12 p-8 bg-white rounded-xl shadow-sm border border-zinc-200">
        <div className="space-y-6 mb-8 text-center">
          <span className="inline-block px-3 py-1 text-sm font-semibold text-blue-600 bg-blue-50 rounded-full">
            주관식 퀴즈
          </span>
          <h1 className="text-2xl font-bold text-zinc-900 leading-relaxed">
            강의 내용에 대한 문제를<br /> 
            정확한 용어와 표현을 사용하여 설명해보세요.
          </h1>
        </div>
        
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
    </div>
  );
}
