import { Button } from "@/components/ui/button";
import { QuizList } from "@/model/dashboard";

interface QuizDetailProps {
  data: QuizList;
}

export default function QuizDetail({ data }: QuizDetailProps) {
  console.log(data);
  return (
    <div className="flex justify-center items-center py-4">
      <div className="bg-white shadow-xl rounded-lg p-4 w-full">
        <h2 className="mt-2 text-center text-2xl font-semibold text-gray-900">
          코스제목
        </h2>
        <p className="mt-2 text-center text-lg text-gray-700">강의 제목</p>
        <div className="mt-5 text-start space-y-2">
          <p className="text-lg text-black">퀴즈 내용</p>
        </div>
        <div className="mt-4">
          <p className="text-gray-500">제출한 답안: </p>
        </div>
        <div className="mt-4 flex space-x-4">
          <p>정답: </p>
        </div>
      </div>
    </div>
  );
}
