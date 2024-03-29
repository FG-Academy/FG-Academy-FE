"use client";
import Image from "next/image";
import testCoureThumbnail from "../../../../../public/images/testCourseThumbnail.jpeg";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Progress } from "@/components/ui/progress";
import LectureList from "@/app/(home)/course/[courseId]/components/lecture-list";
import { getLectures } from "../../../(lecture)/course/[courseId]/lecture/[lectureId]/lib/getLectures";
import { Lecture } from "@/model/lecture";
import { useSession } from "next-auth/react";
import Loading from "@/app/(lecture)/course/[courseId]/lecture/[lectureId]/loading";

function createMarkup(text: string) {
  const paragraphs = text.split("\n\n");
  return {
    __html: paragraphs
      .map((paragraph) => `<p>${paragraph.replace(/\n/g, "<br />")}</p>`)
      .join(""),
  };
}

export default function CourseDetailPage({
  params: { courseId },
}: {
  params: { courseId: number };
}) {
  // console.log(courseId);

  const [isShown, setIsShown] = useState<number>(1);
  const [isTaking, setIsTaking] = useState<boolean>(true);
  const { data: session } = useSession();
  const accessToken = session?.user.accessToken;

  // nav 바 메뉴 클릭시 작동 여부
  const handleClick = (ele: number) => {
    setIsShown(ele);
  };

  const { isPending, error, data } = useQuery({
    queryKey: ["ImagePath"],
    queryFn: () =>
      fetch("http://localhost:3000/courses").then((res) => {
        return res.json();
      }),
  });

  // const lectures = useQuery<Lecture[]>({
  //   queryKey: ["lectures", courseId],
  //   queryFn: () => getLectures(courseId, accessToken),
  //   enabled: !!accessToken,
  // });

  const { data: lectures } = useQuery<Lecture[]>({
    queryKey: ["lectures", courseId],
    queryFn: () => getLectures(courseId, accessToken),
    enabled: !!accessToken,
  });

  console.log("data");
  console.log(data);
  console.log("lectures");
  console.log(lectures);

  if (isPending) return <Loading />;

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="w-full pt-20 h-fit px-52 ">
      <div className="flex flex-col w-full h-auto ">
        <div className="flex justify-start w-full p-6 h-fit ">
          <div className="w-full h-full p-4 mt-4 border-b-2 border-gray-200 ">
            <div className="mt-1 text-2xl font-bold font-Pretendard">
              {data[3].title}
            </div>
            <div className="mt-3 text-sm font-semibold text-slate-400 font-Pretendard">
              카테고리: {data[3].curriculum}
            </div>
          </div>
        </div>
        <div className="flex flex-row p-4 mt-6 h-fit ">
          <div className="flex flex-col w-full h-auto ">
            <div className="flex w-11/12 p-4 h-fit">
              <Image
                className="rounded"
                // width={500}
                // height={300}
                src={testCoureThumbnail}
                alt="썸네일 이미지"
                style={{
                  objectFit: "contain",
                }}
              />
            </div>

            <div className="flex flex-col w-full h-auto">
              <div className="flex flex-row w-full h-auto mt-8 border-b-2 border-gray-200 rounded-sm">
                <nav className="flex flex-wrap p-3 list-none ">
                  <li className="mx-2 font-Pretendard text-[#41454f] hover:text-blue-600">
                    <a
                      href="javascript:void(0);"
                      onClick={() => {
                        handleClick(1);
                      }}
                    >
                      강의 정보
                    </a>
                  </li>
                  <li className="mx-2 font-Pretendard text-[#41454f] hover:text-blue-600">
                    <a
                      href="javascript:void(0);"
                      onClick={() => {
                        handleClick(2);
                      }}
                    >
                      공지사항
                    </a>
                  </li>
                  <li className="mx-2 font-Pretendard text-[#41454f] hover:text-blue-600 ">
                    <a
                      href="javascript:void(0);"
                      onClick={() => {
                        handleClick(3);
                      }}
                    >
                      첨부파일
                    </a>
                  </li>
                </nav>
              </div>
              {isShown === 1 && (
                <div className="p-3">
                  <h1 className="font-mono text-2xl">코스 소개</h1>
                  <br />
                  <p
                    className="text-base leading-7 font-Pretendard"
                    dangerouslySetInnerHTML={createMarkup(data[3].description)}
                  ></p>
                </div>
              )}
              {isShown === 2 && (
                <div className="p-3">
                  <h1 className="font-mono text-2xl">공지사항</h1>
                  <br />
                  <p className="text-base font-Pretendard">
                    공지사항입니다. 많이 많이 공지사항이 필요한 상황입니다.
                  </p>
                </div>
              )}
              {isShown === 3 && (
                // 공지사항 컴포넌트를 만들어서 뿌릴 수 있도록 해야겠다.
                <div className="p-3">
                  <h1 className="font-mono text-2xl ">첨부파일</h1>
                  <br />

                  <p className="text-base font-Pretendard">
                    첨부파일은 어떻게 표현해야할까요..?
                  </p>
                </div>
              )}
            </div>

            <div className="p-3">
              <h1 className="font-mono text-2xl font-bold">강의 목록</h1>
            </div>
            <div className="w-full h-auto mt-4 ">
              <LectureList lectures={lectures} />
            </div>
          </div>
          <div className="flex items-start flex-auto w-5/12 p-6 ">
            <div className="flex-row w-full p-4 bg-blue-100 border-2 border-gray-200 rounded-lg h-fit">
              <h1 className="font-mono text-2xl font-bold text-center">
                강의 진행
              </h1>
              <div className="flex flex-row justify-between mt-4">
                <div className="justify-start w-fit">0/11</div>
                <div className="justify-end w-fit">0%</div>
              </div>
              <div className="mt-2">
                <Progress
                  indicatorColor={"blue"}
                  className="border-gray-400 shadow-md border-1"
                />
                <div className="w-full mt-3 h-1/3">
                  {isTaking ? (
                    <button
                      className="w-full px-4 py-2 text-white transition-colors duration-150 bg-blue-400 rounded-xl hover:bg-blue-600 hover:text-white"
                      onClick={() => {
                        // 현재 사용자가 수강 중인 강좌로 이동
                        // router.push(`/course/${ele.courseId}`);
                      }}
                    >
                      이어듣기
                    </button>
                  ) : (
                    <button
                      className="w-full px-4 py-2 text-white transition-colors duration-150 bg-blue-400 rounded-xl hover:bg-blue-600 hover:text-white"
                      onClick={() => {
                        // 사용자가 수강신청하는 API 수행
                        // 해당 코스 강좌(1강)으로 이동
                      }}
                    >
                      수강 신청하기
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
