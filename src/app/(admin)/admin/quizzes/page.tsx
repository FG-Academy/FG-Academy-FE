import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AdminQuizPage() {
  return (
    <div className="w-full flex justify-center ">
      <div className="flex flex-col justify-center ">
        <h1 className="text-3xl font-bold text-center">
          관리할 페이지를 선택하세요
        </h1>
        <p className="mt-6 text-center text-gray-600 dark:text-gray-400">
          채점 관리 화면: 사용자들이 제출한 퀴즈 현황을 볼 수 있고, 주관식
          퀴즈에 대한 피드백을 작성할 수 있습니다. <br />
          퀴즈 등록 화면: 강의별 사용자들이 풀 퀴즈들을 등록할 수 있습니다.
        </p>
        <div className="flex flex-col p-8 items-center justify-center">
          <Link
            href={"/admin/quizzes/grade"}
            className="mb-4 inline-flex h-52 w-full max-w-xl items-center justify-center rounded-lg bg-blue-300 px-8 text-2xl  text-black shadow transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 disabled:pointer-events-none disabled:opacity-50 dark:bg-blue-500 dark:hover:bg-blue-400 dark:focus-visible:ring-blue-300"
          >
            채점 관리 화면
          </Link>
          <Link
            href={"/admin/quizzes/register"}
            className="inline-flex h-52 w-full max-w-xl items-center justify-center rounded-lg bg-green-300 px-8 text-2xl text-black shadow transition-colors hover:bg-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 disabled:pointer-events-none disabled:opacity-50 dark:bg-green-500 dark:hover:bg-green-400 dark:focus-visible:ring-green-300"
          >
            퀴즈 등록 화면
          </Link>
        </div>
      </div>
    </div>
  );
}

{
  /* <div className="flex-1">
      <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12 bg-gray-100 dark:bg-gray-800">
        <h1 className="text-3xl font-bold text-center">
          관리할 페이지를 선택하세요
        </h1>
        <p className="mt-2 text-center text-gray-600 dark:text-gray-400">
          채점 관리 화면: 사용자들이 제출한 퀴즈 현황을 볼 수 있고, 주관식
          퀴즈에 대한 피드백을 작성할 수 있습니다. <br />
          퀴즈 등록 화면: 강의별 사용자들이 풀 퀴즈들을 등록할 수 있습니다.
        </p>
        <div className="mt-6 w-full flex flex-col items-center justify-center">
          <Button className="mb-4 inline-flex h-20 w-full max-w-xl items-center justify-center rounded-lg bg-blue-300 px-8 text-base font-bold text-black shadow transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 disabled:pointer-events-none disabled:opacity-50 dark:bg-blue-500 dark:hover:bg-blue-400 dark:focus-visible:ring-blue-300">
            채점 관리 화면
          </Button>
          <Button className="inline-flex h-20 w-full max-w-xl items-center justify-center rounded-lg bg-green-300 px-8 text-base font-bold text-black shadow transition-colors hover:bg-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 disabled:pointer-events-none disabled:opacity-50 dark:bg-green-500 dark:hover:bg-green-400 dark:focus-visible:ring-green-300">
            퀴즈 등록 화면
          </Button>
        </div>
      </div>
    </div> */
}
