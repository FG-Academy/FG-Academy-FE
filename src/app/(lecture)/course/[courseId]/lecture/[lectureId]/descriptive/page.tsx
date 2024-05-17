"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useQuizQuery } from "../hooks/useQuizQuery";
import DescriptiveQuizForm from "./components/DescriptiveQuizForm";
import { useSession } from "next-auth/react";
import Loading from "../loading";
import SubmittedDescriptiveQuiz from "./components/SubmittedDescriptiveQuiz";

export default function Descriptive() {
  const params = useParams();
  const searchParams = useSearchParams();
  const lectureId = +params.lectureId;

  const { data: session } = useSession();
  const accessToken = session?.user.accessToken as string;

  const { data: quizzes } = useQuizQuery(lectureId, accessToken);
  const search = parseInt(searchParams.get("quizIndex") as string);

  if (!quizzes) {
    return <Loading />;
  }

  return (
    <div className="w-full h-full space-y-2 justify-center items-center p-10">
      <h1 className="text-xl text-center">[실행과제]</h1>
      <h2 className="text-lg text-center">
        강의 내용에 대한 문제를 정확한 용어와 표현을 사용하여 설명해보세요.
      </h2>
      {quizzes[search - 1].quizSubmits.length > 0 ? (
        <SubmittedDescriptiveQuiz
          quizId={quizzes[search - 1].quizId}
          question={quizzes[search - 1].question}
          submittedQuiz={quizzes[search - 1].quizSubmits[0]}
        />
      ) : (
        <DescriptiveQuizForm
          quizId={quizzes[search - 1].quizId}
          question={quizzes[search - 1].question}
        />
      )}
    </div>
  );
}
