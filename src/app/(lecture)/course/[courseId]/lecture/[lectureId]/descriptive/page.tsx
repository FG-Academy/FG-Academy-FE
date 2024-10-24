"use client";

import { useSearchParams } from "next/navigation";
import { useOneQuizQuery } from "../hooks/useQuizQuery";
import DescriptiveQuizForm from "./components/DescriptiveQuizForm";
import { useSession } from "next-auth/react";
import Loading from "../loading";
import SubmittedDescriptiveQuiz from "./components/SubmittedDescriptiveQuiz";

export default function Descriptive() {
  const searchParams = useSearchParams();
  const currentQuizId = parseInt(searchParams.get("quizId") as string);

  const { data: session } = useSession();
  const accessToken = session?.user.accessToken as string;

  // const { data: quizzes } = useQuizQuery(lectureId, accessToken);
  const { data: quiz } = useOneQuizQuery(currentQuizId, accessToken);

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
