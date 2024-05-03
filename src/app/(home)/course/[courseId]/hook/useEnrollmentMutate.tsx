import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

// type EnrollmentPatchRequest = {
//   accessToken: string;
// };

export function useEnrollmentMutate(courseId: number, accessToken: string) {
  const queryClient = useQueryClient();
  const router = useRouter(); // router 사용 설정

  return useMutation({
    mutationKey: ["registerEnrollment"],
    mutationFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/courses/${courseId}/enrollment`,
        {
          // next: {
          //   tags: ["enrollment"],
          // },
          method: "POST",
          headers: { authorization: `Bearer ${accessToken}` },
          credentials: "include",
        }
      );
      if (!response.ok) {
        const errorData = await response.json(); // 에러 메시지를 포함할 수 있는 응답의 본문
        throw {
          status: response.status,
          message: errorData.message ?? "에러가 발생했습니다.",
        };
      }

      return response.json(); // 성공 응답 데이터 반환
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["enrollment"],
      });
      toast({
        title: data.message,
        duration: 10000,
        description: (
          <div className="flex justify-end mt-2 w-[340px] rounded-md p-4">
            <Button
              className="shadow-md bg-blue-500 text-white hover:bg-slate-50 hover:text-black"
              onClick={() => {
                router.push(`/course/${courseId}/lecture/1`);
              }}
            >
              강의 수강하기
            </Button>
          </div>
        ),
      });
    },
    onError: (error: any) => {
      toast({
        title: error.message,
        variant: "destructive",
        duration: 3000,
      });
    },
  });
}
