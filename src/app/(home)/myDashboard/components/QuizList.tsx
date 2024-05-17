import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSession } from "next-auth/react";
import { useMemo, useState } from "react";
import QuizDetailContents from "./QuizDetailContents";
import Loading from "@/app/(lecture)/course/[courseId]/lecture/[lectureId]/loading";
import { useFetchDashboardQuizzesQuery } from "../hooks/useQuizQuery";

export default function QuizList({}) {
  let maxPageNumberLimit = 5;
  let minPageNumberLimit = 0;
  const quizzesPerPage = 5;

  const [currentPage, setCurrentPage] = useState(1);

  const { data: session } = useSession();
  const accessToken = session?.user.accessToken;

  const { data: quizzes } = useFetchDashboardQuizzesQuery(accessToken);

  const currentQuizzes = useMemo(() => {
    if (quizzes) {
      const indexOfLastQuiz = currentPage * quizzesPerPage;
      const indexOfFirstQuiz = indexOfLastQuiz - quizzesPerPage;

      return quizzes.slice(indexOfFirstQuiz, indexOfLastQuiz);
    }
  }, [currentPage, quizzes]);

  const totalPageLength = useMemo(() => {
    if (quizzes) {
      return Math.ceil(quizzes.length / quizzesPerPage);
    }
  }, [quizzes]);

  const pages = useMemo(() => {
    if (totalPageLength) {
      let pages = [];
      for (let i = 1; i <= totalPageLength; i++) {
        pages.push(i);
      }
      return pages;
    }
  }, [totalPageLength]);

  const handleNextBtn = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault(); // 기본 동작을 막습니다.
    setCurrentPage((prevPage) => prevPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      maxPageNumberLimit += 1;
      minPageNumberLimit += 1;
    }
  };

  const handlePrevBtn = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault(); // 기본 동작을 막습니다.
    setCurrentPage((prevPage) => prevPage - 1);

    if ((currentPage - 1) % 5 === 0) {
      maxPageNumberLimit -= 1;
      minPageNumberLimit -= 1;
    }
  };

  if (!quizzes) {
    return <Loading />;
  }

  return (
    <div className="flex-1 p-4">
      <div className="mb-4">
        <h3 className="text-2xl font-semibold">퀴즈 피드백</h3>
        <div className="mt-4 text-gray-500 font-light">
          내가 제출한 퀴즈와 채점 현황을 확인해보세요
        </div>
        <div className="flex space-x-2 mt-4 border-b-2 rounded-md"></div>
      </div>

      <div className="flex w-full flex-col">
        {quizzes.length !== 0 ? (
          currentQuizzes?.map((ele, index) => (
            <div key={index}>
              <QuizDetailContents data={ele} />
            </div>
          ))
        ) : (
          <div className="p-4">답변을 제출한 퀴즈가 없습니다😅</div>
        )}
        <Pagination>
          <PaginationContent>
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationPrevious onClick={handlePrevBtn} href="#" />
              </PaginationItem>
            )}

            {pages?.map((number) => {
              if (
                number < maxPageNumberLimit + 1 &&
                number > minPageNumberLimit
              ) {
                return (
                  <PaginationItem
                    key={number}
                    className={`${
                      currentPage === number ? `bg-gray-100` : `none`
                    } rounded-lg`}
                  >
                    <PaginationLink
                      onClick={(event) => {
                        event.preventDefault(); // 기본 동작을 막습니다.
                        setCurrentPage(number);
                      }}
                      href="#"
                    >
                      {number}
                    </PaginationLink>
                  </PaginationItem>
                );
              } else {
                return null;
              }
            })}

            {totalPageLength && currentPage < totalPageLength && (
              <PaginationItem>
                <PaginationNext onClick={handleNextBtn} href="#" />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
