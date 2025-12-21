"use client";

import { AvatarFallback, Avatar } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

import { cn } from "@/6.shared/lib";
import { Typography } from "@/6.shared/ui";

import { MyCourseList } from "@/5.entities/course";
import { MyQuizList } from "@/5.entities/quiz";

const MyCoursePage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "course";

  const { data: session } = useSession();
  const userName = session?.user.name;

  const updateTab = (newTab: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("tab", newTab);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex w-full">
      <div className="flex flex-col w-full h-full mx-auto max-w-[1200px] gap-4 p-8">
        <div className="flex flex-col md:flex-row gap-2">
          <nav className="flex flex-col min-w-[174px] gap-4">
            <div className="flex items-center gap-1">
              <Avatar>
                <AvatarFallback>{userName?.charAt(0)}</AvatarFallback>
              </Avatar>
              <Typography name="body1" className="flex items-center gap-2">
                {userName} 선생님
              </Typography>
            </div>
            <div className="flex flex-col">
              <div
                className={cn(
                  "py-2 px-4 rounded-md cursor-pointer hover:bg-gray-100",
                  {
                    "bg-blue-100 text-primary-blue hover:bg-blue-200":
                      tab === "course",
                  }
                )}
                onClick={() => {
                  updateTab("course");
                }}
              >
                강의 목록
              </div>
              <div
                className={cn(
                  "py-2 px-4 rounded-md cursor-pointer hover:bg-gray-100",
                  {
                    "bg-blue-100 text-primary-blue hover:bg-blue-200":
                      tab === "quiz",
                  }
                )}
                onClick={() => {
                  updateTab("quiz");
                }}
              >
                퀴즈 피드백
              </div>
            </div>
          </nav>
          <section className="flex flex-col w-full min-w-0">
            {tab === "course" && <MyCourseList />}
            {tab === "quiz" && <MyQuizList />}
          </section>
        </div>
      </div>
    </div>
  );
};

export { MyCoursePage };
