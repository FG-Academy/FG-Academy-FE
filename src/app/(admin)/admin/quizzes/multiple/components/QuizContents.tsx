import { Separator } from "@/components/ui/separator";
import { Course } from "@/model/course";
import { Circle, X } from "lucide-react";

type Props = {
  course: Course;
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
    <div className="w-full space-y-2 flex flex-col p-4 rounded-lg border-blue-400 border">
      <div className="text-lg justify-between">
        <div>
          <span>코스 이름: </span>
          <span className="font-bold">{course.title}</span>
        </div>
        <div className="text-sm text-gray-500">
          {submittedQuizzes}/{totalQuizzes} (정답률: {answerRate}%)
        </div>
      </div>
      <div className="border border-gray-400 rounded-md p-2 space-y-2">
        {course.lectures.map((lecture) => {
          return (
            <div key={lecture.lectureId} className="p-2">
              <div>강의 제목: {lecture.title}</div>
              {lecture.quizzes.map(
                (quiz) =>
                  quiz.quizType === "multiple" && (
                    <div
                      key={quiz.quizId}
                      className="flex justify-between items-center my-1 border p-2"
                    >
                      <div>{quiz.question}</div>
                      {quiz.quizSubmits.length > 0 ? (
                        quiz.quizSubmits[0].status === 2 ? (
                          <Circle color="green" /> // 정답 아이콘
                        ) : (
                          <X color="red" /> // 오답 아이콘
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
