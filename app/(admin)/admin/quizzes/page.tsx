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
        <div className="flex flex-col p-8 items-center justify-center space-y-2">
          <div className="w-full flex flex-col max-w-xl text-center items-center justify-center rounded-lg border px-8 text-lg  text-black shadow transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 disabled:pointer-events-none disabled:opacity-50 dark:bg-blue-400 dark:hover:bg-blue-400 dark:focus-visible:ring-blue-300">
            채점 관리 화면
            <div className="flex flex-row space-x-2 w-full p-4">
              <Link
                href={"/admin/quizzes/descriptive"}
                className=" w-full max-w-xl p-10 items-center justify-center rounded-lg bg-orange-200 px-8 text-2xl  text-black shadow transition-colors hover:bg-orange-600 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 disabled:pointer-events-none disabled:opacity-50 dark:bg-blue-400 dark:hover:bg-blue-400 dark:focus-visible:ring-blue-300"
              >
                퀴즈 관리
              </Link>
            </div>
          </div>

          <Link
            href={"/admin/quizzes/register"}
            className="inline-flex h-52 w-full max-w-xl items-center justify-center rounded-lg bg-green-200 px-8 text-2xl text-black shadow transition-colors hover:bg-green-600 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 disabled:pointer-events-none disabled:opacity-50 dark:bg-green-400 dark:hover:bg-green-400 dark:focus-visible:ring-green-300"
          >
            퀴즈 등록 화면
          </Link>
        </div>
      </div>
    </div>
  );
}
