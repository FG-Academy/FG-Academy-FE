import { useQuery } from "@tanstack/react-query";
import { getMyCourses } from "../lib/getMyCourses";
import { ICourse } from "@/model/course";

interface Quiz {
  quizId: number;
  quizType: string; // "multiple"와 같은 타입이 들어가므로, 문자열로 처리합니다.
  submitted: boolean;
}

interface Lecture {
  lectureId: number;
  lectureNumber: number;
  lectureTitle: string;
  quizzes: Quiz[];
}

interface SidebarResponse extends ICourse {
  lectures: Lecture[];
  category: { name: string };
}

/** [강의 수강 화면] 한 코스에 달린 강의, 퀴즈, 제출현황 전부 가져오기 */
export const useSidebarQuery = (
  accessToken: string,
  courseId: number,
  options?: { enabled?: boolean }
) => {
  return useQuery<SidebarResponse>({
    queryKey: ["myCourse", courseId, accessToken],
    queryFn: () => getMyCourses(courseId, accessToken),
    enabled: !!accessToken,
  });
};
