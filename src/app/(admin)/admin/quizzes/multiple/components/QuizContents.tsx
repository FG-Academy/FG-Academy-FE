import { Separator } from "@/components/ui/separator";
import { ICourse } from "@/model/course";
import { Circle, X } from "lucide-react";
import { MyCourseResponse } from "../../hooks/useQuizQuery";

type Props = {
  course: MyCourseResponse;
  submittedQuizzes: number;
  totalQuizzes: number;
  answerRate: number;
};

export default function QuizContents({
  course,
  submittedQuizzes,
  totalQuizzes,
  answerRate,
}: Props) {
  return (
    <div className="flex flex-col w-full p-4 space-y-2 border border-blue-400 rounded-lg">
      <div className="justify-between text-lg">
        <div>
          <span>코스 이름: </span>
          <span className="font-bold">{course.title}</span>
        </div>
        <div className="text-sm text-gray-500">
          {submittedQuizzes}/{totalQuizzes} (정답률: {answerRate}%)
        </div>
      </div>
      <div className="p-2 space-y-2 border border-gray-400 rounded-md">
        {course.lectures.map((lecture) => {
          return (
            <div key={lecture.lectureId} className="p-2">
              <div>강의 제목: {lecture.title}</div>
              {lecture.quizzes.map(
                (quiz) =>
                  quiz.quizType === "multiple" && (
                    <div
                      key={quiz.quizId}
                      className="flex items-center justify-between p-2 my-1 border"
                    >
                      <div>{quiz.question}</div>
                      {quiz.quizSubmits.length > 0 ? (
                        quiz.quizSubmits[0].status === 2 ? (
                          <X color="red" /> // 오답 아이콘
                        ) : (
                          <Circle color="green" /> // 정답 아이콘
                        )
                      ) : (
                        <span>미제출</span> // 퀴즈 미제출
                      )}
                    </div>
                  )
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
