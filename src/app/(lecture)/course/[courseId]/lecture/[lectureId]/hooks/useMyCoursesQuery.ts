import { useQuery } from "@tanstack/react-query";
import { getMyCourses } from "../lib/getMyCourses";
import { ICourse } from "@/model/course";
import { ILecture, ILectureTimeRecord } from "@/model/lecture";
import { IQuiz, IQuizAnswer, IQuizSubmit } from "@/model/quiz";
import { Category } from "@/app/(admin)/admin/hooks/useAdminCourseQuery";

interface Quiz extends IQuiz {
  quizAnswers: IQuizAnswer[];
  quizSubmits: IQuizSubmit[];
}
interface Lecture extends ILecture {
  quizzes: Quiz[];
  // lectureTimeRecords: ILectureTimeRecord[];
}
interface MyCourseResponse extends ICourse {
  lectures: Lecture[];
  category: Category;
}

/** [강의 수강 화면] 한 코스에 달린 강의, 퀴즈, 제출현황 전부 가져오기 */
export const useMyCoursesQuery = (
  accessToken: string,
  courseId: number,
  options?: { enabled?: boolean }
) => {
  return useQuery<MyCourseResponse>({
    queryKey: ["myCourse", courseId, accessToken],
    queryFn: () => getMyCourses(courseId, accessToken),
    enabled: !!accessToken,
  });
};
