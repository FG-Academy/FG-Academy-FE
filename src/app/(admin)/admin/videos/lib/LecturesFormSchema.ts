import { z } from "zod";

export const LectureFormSchema = z.object({
  lectures: z.array(
    z.object({
      lectureId: z.number().optional(),
      title: z.string().min(1, {
        message: "강의 제목은 1글자 이상이어야 합니다.",
      }),
      videoLink: z.string().optional(), // 설명은 선택적으로 입력 가능하게 설정
      lectureNumber: z.number().optional(),
    })
  ),
});
